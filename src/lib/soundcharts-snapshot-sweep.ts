import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* Deliberately has ZERO dependency on @tanstack/react-start — same reason
   as youtube-snapshot-sweep.ts: this is imported both by platform-live.ts
   (inside the TanStack Start app, via getTikTokSoundStats) AND directly by
   api/cron/soundcharts-snapshot.ts, a plain Vercel Node serverless function
   that lives outside TanStack Router entirely.

   Soundcharts has no historical view for "video count over time" any more
   than YouTube's Data API has one for third-party view counts — see
   platform-live.ts for the full rundown of what Soundcharts actually
   exposes for TikTok (video count only, nothing else). This file is RIPPL's
   own answer to that: snapshot on every real fetch (manual panel load), and
   again daily via the cron, into sound_snapshots
   (supabase/migrations/0003_soundcharts_digest_shares.sql). */

const SOUNDCHARTS_TOKEN_URL = "https://account.soundcharts.com/oauth/token";
const SOUNDCHARTS_API_BASE = "https://customer.api.soundcharts.com/api/v2";
const UUID_RE = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

export function soundchartsConfiguredEnv(): boolean {
  return Boolean(
    process.env.SOUNDCHARTS_CLIENT_ID && process.env.SOUNDCHARTS_CLIENT_SECRET,
  );
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function soundchartsToken(): Promise<string> {
  const id = process.env.SOUNDCHARTS_CLIENT_ID;
  const secret = process.env.SOUNDCHARTS_CLIENT_SECRET;
  if (!id || !secret)
    throw new Error("SOUNDCHARTS_CLIENT_ID / SOUNDCHARTS_CLIENT_SECRET aren't set.");
  if (cachedToken && cachedToken.expiresAt > Date.now() + 5_000)
    return cachedToken.value;

  const res = await fetch(SOUNDCHARTS_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok)
    throw new Error(`Soundcharts token request failed (${res.status}) — check SOUNDCHARTS_CLIENT_ID/SECRET.`);
  const body = await res.json();
  cachedToken = {
    value: body.access_token,
    expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000,
  };
  return cachedToken.value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- raw Soundcharts API JSON, shape varies per endpoint
export async function soundchartsGet(path: string): Promise<any> {
  const token = await soundchartsToken();
  const res = await fetch(`${SOUNDCHARTS_API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.errors?.[0]?.message || `Soundcharts API error (${res.status})`);
  }
  return res.json();
}

/** Same resolver as platform-live.ts's private copy — duplicated here (not
 *  imported) so this file stays free of any @tanstack/react-start import,
 *  matching how youtube-snapshot-sweep.ts / youtube-deep-analytics.ts split
 *  their shared pieces. */
export async function resolveSoundchartsSongUuid(platformUrl: string): Promise<string> {
  const body = await soundchartsGet(`/search/external/url?platformUrl=${encodeURIComponent(platformUrl)}`);
  const type = body?.type ?? body?.object?.type;
  if (type && type !== "song") {
    throw new Error(`That link resolved to a Soundcharts "${type}", not a song — paste the TikTok sound/music page link for the track itself.`);
  }
  const candidate: string | undefined = body?.object?.uuid ?? body?.uuid ?? body?.object?.url ?? body?.url;
  const uuid = candidate && UUID_RE.test(candidate) ? candidate.match(UUID_RE)![0] : undefined;
  if (!uuid) throw new Error("Soundcharts didn't recognize that TikTok sound link — try pasting the exact URL from the TikTok sound/music page.");
  return uuid;
}

export async function getTikTokVideoCountByUuid(
  uuid: string,
): Promise<{ videoCount: number; asOf?: string }> {
  const body = await soundchartsGet(`/song/${uuid}/audience/tiktok`);
  const items = body?.items ?? body?.object?.items ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Soundcharts has no TikTok video-count data for this song yet.");
  }
  const latest = items[items.length - 1];
  const videoCount = Number(latest?.value ?? latest?.count ?? latest?.plots?.value ?? 0);
  return { videoCount, asOf: latest?.date };
}

export function serviceClient(): SupabaseClient | null {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Upserts today's (UTC) snapshot row for one tracked_sounds.id — same
 *  idempotent-per-day pattern as upsertTodaySnapshot() for YouTube. */
export async function upsertTodaySoundSnapshot(
  admin: SupabaseClient,
  trackedId: string,
  videoCount: number,
) {
  const dayStart = new Date();
  dayStart.setUTCHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

  const { data: existing } = await admin
    .from("sound_snapshots")
    .select("id")
    .eq("sound_id", trackedId)
    .gte("recorded_at", dayStart.toISOString())
    .lt("recorded_at", dayEnd.toISOString())
    .maybeSingle();

  if (existing) {
    await admin
      .from("sound_snapshots")
      .update({ video_count: videoCount, recorded_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await admin
      .from("sound_snapshots")
      .insert({ sound_id: trackedId, video_count: videoCount });
  }
  await admin
    .from("tracked_sounds")
    .update({ last_video_count: videoCount, last_fetched_at: new Date().toISOString() })
    .eq("id", trackedId);
}

/** Upserts (and returns the id of) the tracked_sounds row for one TikTok
 *  sound URL — resolving to a Soundcharts UUID first if it isn't cached. */
export async function upsertTrackedSound(
  admin: SupabaseClient,
  userId: string,
  tiktokSoundUrl: string,
  campaignId: string | undefined,
): Promise<{ id: string; uuid: string } | null> {
  const { data: existing } = await admin
    .from("tracked_sounds")
    .select("id,soundcharts_uuid")
    .eq("user_id", userId)
    .eq("tiktok_sound_url", tiktokSoundUrl)
    .maybeSingle();

  const uuid = existing?.soundcharts_uuid || (await resolveSoundchartsSongUuid(tiktokSoundUrl));

  const { data, error } = await admin
    .from("tracked_sounds")
    .upsert(
      {
        user_id: userId,
        campaign_id: campaignId || null,
        tiktok_sound_url: tiktokSoundUrl,
        soundcharts_uuid: uuid,
      },
      { onConflict: "user_id,tiktok_sound_url" },
    )
    .select("id")
    .single();
  if (error || !data) return null;
  return { id: data.id, uuid };
}

/** The daily sweep: re-fetches Soundcharts' current TikTok video count for
 *  every sound anyone has ever run through the TikTok dashboard's sound
 *  scanner, and snapshots it — the same "build our own velocity curve"
 *  approach as runSnapshotSweep() for YouTube. */
export async function runSoundSnapshotSweep(): Promise<{
  updated: number;
  failed: number;
  total: number;
}> {
  const admin = serviceClient();
  if (!admin)
    throw new Error(
      "Supabase service credentials aren't configured (VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    );
  if (!soundchartsConfiguredEnv())
    throw new Error("SOUNDCHARTS_CLIENT_ID / SOUNDCHARTS_CLIENT_SECRET aren't set.");

  const { data: sounds, error } = await admin
    .from("tracked_sounds")
    .select("id,soundcharts_uuid,tiktok_sound_url");
  if (error) throw new Error(error.message);
  if (!sounds || sounds.length === 0) return { updated: 0, failed: 0, total: 0 };

  let updated = 0;
  let failed = 0;
  // Soundcharts has no batch endpoint for this (unlike YouTube's videos.list
  // up to 50 ids) — each sound is its own request, one at a time to stay
  // well under rate limits on a free/base plan.
  for (const s of sounds) {
    try {
      const uuid = s.soundcharts_uuid || (await resolveSoundchartsSongUuid(s.tiktok_sound_url));
      const { videoCount } = await getTikTokVideoCountByUuid(uuid);
      await upsertTodaySoundSnapshot(admin, s.id, videoCount);
      updated++;
    } catch {
      failed++;
    }
  }
  return { updated, failed, total: sounds.length };
}
