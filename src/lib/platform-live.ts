import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  serviceClient as soundServiceClient,
  upsertTrackedSound,
  upsertTodaySoundSnapshot,
} from "./soundcharts-snapshot-sweep";

/* ═══════════════════════════════════════════════════════════
   Live platform data — TikTok (via Soundcharts) & Meta (FB/IG).

   These replace the seeded-random placeholder numbers that used to fill
   the platform-command dashboards (dashboard_.tiktok.tsx etc). Both run
   server-side only (real secrets, never sent to the browser) and return
   a typed { ok: false, reason } shape instead of throwing when a source
   isn't configured yet — dashboards render an honest "not connected" card
   from that reason rather than fabricated numbers.

   TikTok: there is no public TikTok developer API that exposes "how many
   videos use this sound" for an arbitrary sound — the closest official
   surface (hashtag/content APIs) requires app review and, per TikTok's own
   for-developers docs, isn't free for commercial use. Soundcharts (and
   Chartmetric) get this via their own platform partnerships/licensing and
   expose it as a straightforward API — that's the realistic path.

   Verified against Soundcharts' actual docs (developers.soundcharts.com,
   incl. their openapi.json) on 2026-07-21:
   - Auth: POST https://account.soundcharts.com/oauth/token, HTTP Basic
     client_id:client_secret, body grant_type=client_credentials — confirmed
     correct, this was already implemented right.
   - Resolving a pasted TikTok link to a Soundcharts song: GET
     /api/v2/search/external/url?platformUrl=<encoded> ("Get Soundcharts URL
     from platform URL"). Confirmed exact path; exact JSON key for the
     returned identifier is unverified (their reference pages don't render
     schema definitions outside the interactive Try-it-out widget), so the
     resolver below tries the couple of shapes their docs style implies.
   - IMPORTANT — TikTok only has ONE tracked metric on Soundcharts: video
     count. Per their own "Get audience" docs table (song/{uuid}/audience/
     {platform}), the value tracked per platform is: Spotify → streams,
     YouTube → views, YouTube Shorts → shorts count, Instagram → reel count,
     TikTok → video count. There is no likes/views/comments/shares breakdown
     for TikTok — Soundcharts genuinely does not track those per-sound. The
     previous version of this file promised all five and was wrong; fixed
     to only ever surface videoCount. Also note: several of the relevant
     endpoints (song current/stats, song audience, TikTok chart) are flagged
     "restricted to specific plans" in their docs — a free/base Soundcharts
     plan may 403 on these even with valid credentials.

   Meta (Facebook Page / Instagram Business): real and well-documented, but
   needs a Meta App + a long-lived Page Access Token (60-day expiry, must be
   refreshed) with pages_read_engagement + read_insights (+
   instagram_manage_insights for IG) — and, for scopes beyond your own
   admin account, Meta App Review. This module calls the Graph API directly;
   getting the token itself happens in Meta's dashboard, not in code. */

const SOUNDCHARTS_TOKEN_URL = "https://account.soundcharts.com/oauth/token";
const SOUNDCHARTS_API_BASE = "https://customer.api.soundcharts.com/api/v2";
const META_GRAPH_BASE = "https://graph.facebook.com/v21.0";

export interface LiveResult<T> {
  ok: boolean;
  data?: T;
  reason?: string; // shown in the "not connected" card when !ok
}

/* ── Soundcharts (TikTok sound scanner) ──────────────────────── */

export interface TikTokSoundStats {
  videoCount: number;    // "creations using this sound" — the only metric Soundcharts tracks for TikTok
  asOf?: string;         // date of the latest data point, if Soundcharts returned one
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function soundchartsToken(): Promise<string> {
  const id = process.env.SOUNDCHARTS_CLIENT_ID;
  const secret = process.env.SOUNDCHARTS_CLIENT_SECRET;
  if (!id || !secret) throw new Error("SOUNDCHARTS_CLIENT_ID / SOUNDCHARTS_CLIENT_SECRET aren't set.");
  if (cachedToken && cachedToken.expiresAt > Date.now() + 5_000) return cachedToken.value;

  const res = await fetch(SOUNDCHARTS_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`Soundcharts token request failed (${res.status}) — check SOUNDCHARTS_CLIENT_ID/SECRET.`);
  const body = await res.json();
  cachedToken = { value: body.access_token, expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 };
  return cachedToken.value;
}

async function soundchartsGet(path: string): Promise<any> {
  const token = await soundchartsToken();
  const res = await fetch(`${SOUNDCHARTS_API_BASE}${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.errors?.[0]?.message || `Soundcharts API error (${res.status})`);
  }
  return res.json();
}

const UUID_RE = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

/** Resolves a public platform URL (e.g. the TikTok sound page link you'd
 *  paste from the app) to Soundcharts' own song UUID via the confirmed
 *  endpoint GET /api/v2/search/external/url?platformUrl=. Soundcharts'
 *  reference page confirms the path and describes the response as "the
 *  Soundcharts URL and the type" for that entity, but doesn't render the
 *  exact JSON key names — so this checks the couple of shapes that phrasing
 *  implies (a bare `uuid`, or a `url` with the uuid as its last segment). */
async function resolveSoundchartsSongUuid(platformUrl: string): Promise<string> {
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

/** GET /api/v2/song/{uuid}/audience/tiktok — the only TikTok metric
 *  Soundcharts tracks per song is video count (see module note). This is a
 *  time-series endpoint (default window: last 30 days); we take the most
 *  recent point. Exact item field names are unverified (same reference-page
 *  limitation as above) so this checks a couple of likely shapes. */
async function getTikTokVideoCount(uuid: string): Promise<TikTokSoundStats> {
  const body = await soundchartsGet(`/song/${uuid}/audience/tiktok`);
  const items = body?.items ?? body?.object?.items ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Soundcharts has no TikTok video-count data for this song yet — it may need a moment after being added, or your plan may not include this endpoint.");
  }
  const latest = items[items.length - 1];
  const videoCount = Number(latest?.value ?? latest?.count ?? latest?.plots?.value ?? 0);
  return { videoCount, asOf: latest?.date };
}

async function resolveUserId(
  admin: SupabaseClient,
  accessToken: string | undefined,
): Promise<string | null> {
  if (!accessToken) return null;
  const { data, error } = await admin.auth.getUser(accessToken);
  if (error || !data?.user) return null;
  return data.user.id;
}

/** `tiktokSoundUrl` is whatever you pasted into the campaign's TikTok sound
 *  link (Campaign.links.tiktokSound). Resolves it to a Soundcharts song and
 *  returns the current TikTok video count for it — the only per-sound
 *  metric Soundcharts actually tracks for TikTok.
 *
 *  Same "best-effort persistence" pattern as analyzeYoutubeVideo (see
 *  youtube-deep-analytics.ts): when signed in with Supabase configured,
 *  every successful fetch also upserts a tracked_sounds row and snapshots
 *  today's video count into sound_snapshots — that's what feeds the growth
 *  chart on the TikTok dashboard (getSoundVelocity below) and the daily
 *  cron (api/cron/soundcharts-snapshot.ts). A Supabase hiccup here never
 *  fails the panel itself, it just means no velocity history yet. */
export const getTikTokSoundStats = createServerFn({ method: "POST" })
  .validator((d: { tiktokSoundUrl: string; accessToken?: string; campaignId?: string }) => d)
  .handler(async ({ data }): Promise<LiveResult<TikTokSoundStats>> => {
    if (!process.env.SOUNDCHARTS_CLIENT_ID || !process.env.SOUNDCHARTS_CLIENT_SECRET) {
      return { ok: false, reason: "Soundcharts isn't connected. Add SOUNDCHARTS_CLIENT_ID + SOUNDCHARTS_CLIENT_SECRET (from your Soundcharts dashboard → Credentials) in Vercel env vars, then redeploy." };
    }
    try {
      const uuid = await resolveSoundchartsSongUuid(data.tiktokSoundUrl);
      const stats = await getTikTokVideoCount(uuid);

      try {
        const admin = soundServiceClient();
        if (admin) {
          const userId = await resolveUserId(admin, data.accessToken);
          if (userId) {
            const tracked = await upsertTrackedSound(admin, userId, data.tiktokSoundUrl, data.campaignId);
            if (tracked) await upsertTodaySoundSnapshot(admin, tracked.id, stats.videoCount);
          }
        }
      } catch {
        /* velocity history is a bonus, not a blocker — same as YouTube's analyzer */
      }

      return { ok: true, data: stats };
    } catch (e: any) {
      return { ok: false, reason: e?.message || String(e) };
    }
  });

export const soundchartsConfigured = createServerFn({ method: "GET" }).handler(async () => {
  return Boolean(process.env.SOUNDCHARTS_CLIENT_ID && process.env.SOUNDCHARTS_CLIENT_SECRET);
});

/* ── TikTok sound velocity curve — same idea as getVideoVelocity for
   YouTube (youtube-deep-analytics.ts): reads back the snapshot history for
   one tracked sound. Requires sign-in + Supabase. ───────────────────── */
export interface SoundVelocityPoint {
  date: string;
  videoCount: number;
  dailyGain: number | null;
}

export const getSoundVelocity = createServerFn({ method: "POST" })
  .validator((d: { tiktokSoundUrl: string; accessToken?: string }) => d)
  .handler(async ({ data }): Promise<LiveResult<SoundVelocityPoint[]>> => {
    const admin = soundServiceClient();
    if (!admin)
      return { ok: false, reason: "Supabase isn't configured on this deployment — no velocity history without it." };
    const userId = await resolveUserId(admin, data.accessToken);
    if (!userId) return { ok: false, reason: "Sign in to see this sound's tracked history." };

    const { data: tracked, error: trackedErr } = await admin
      .from("tracked_sounds")
      .select("id")
      .eq("user_id", userId)
      .eq("tiktok_sound_url", data.tiktokSoundUrl)
      .maybeSingle();
    if (trackedErr || !tracked)
      return { ok: false, reason: "This sound hasn't been scanned yet — the sound panel above tracks it automatically once it loads." };

    const { data: rows, error } = await admin
      .from("sound_snapshots")
      .select("video_count,recorded_at")
      .eq("sound_id", tracked.id)
      .order("recorded_at", { ascending: true });
    if (error) return { ok: false, reason: error.message };
    if (!rows || rows.length === 0)
      return { ok: false, reason: "No snapshots yet — check back after the next daily refresh." };

    const points: SoundVelocityPoint[] = rows.map((r, i) => ({
      date: r.recorded_at,
      videoCount: Number(r.video_count),
      dailyGain: i === 0 ? null : Number(r.video_count) - Number(rows[i - 1].video_count),
    }));
    return { ok: true, data: points };
  });

/* ── Meta Graph API (Facebook Page / Instagram Business) ─────── */

export interface FacebookPageStats {
  fanCount: number;
  reachLifetime: number | null;
  engagedUsersLifetime: number | null;
}
export interface InstagramStats {
  followerCount: number;
  reachLifetime: number | null;
}

function metaConfigured(): boolean {
  return Boolean(process.env.META_PAGE_ACCESS_TOKEN && process.env.META_PAGE_ID);
}

export const getFacebookPageStats = createServerFn({ method: "GET" }).handler(async (): Promise<LiveResult<FacebookPageStats>> => {
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  const pageId = process.env.META_PAGE_ID;
  if (!token || !pageId) {
    return { ok: false, reason: "Facebook isn't connected. Create a Meta App, generate a long-lived Page Access Token (pages_read_engagement + read_insights), and set META_PAGE_ACCESS_TOKEN + META_PAGE_ID in Vercel env vars. Note: Page Insights only populate once the Page has 100+ likes, and the token needs refreshing every 60 days." };
  }
  try {
    const [pageRes, insightsRes] = await Promise.all([
      fetch(`${META_GRAPH_BASE}/${pageId}?fields=fan_count&access_token=${token}`),
      fetch(`${META_GRAPH_BASE}/${pageId}/insights?metric=page_impressions,page_engaged_users&period=days_28&access_token=${token}`),
    ]);
    if (!pageRes.ok) { const b = await pageRes.json().catch(() => null); throw new Error(b?.error?.message || `Graph API error (${pageRes.status})`); }
    const page = await pageRes.json();
    const insights = insightsRes.ok ? await insightsRes.json() : null;
    const metric = (name: string) => insights?.data?.find((d: any) => d.name === name)?.values?.at(-1)?.value ?? null;
    return { ok: true, data: { fanCount: Number(page.fan_count ?? 0), reachLifetime: metric("page_impressions"), engagedUsersLifetime: metric("page_engaged_users") } };
  } catch (e: any) {
    return { ok: false, reason: e?.message || String(e) };
  }
});

export const getInstagramStats = createServerFn({ method: "GET" }).handler(async (): Promise<LiveResult<InstagramStats>> => {
  const token = process.env.META_PAGE_ACCESS_TOKEN;
  const igId = process.env.META_IG_BUSINESS_ID;
  if (!token || !igId) {
    return { ok: false, reason: "Instagram isn't connected. Needs the same Meta App/token as Facebook, plus instagram_manage_insights scope and your IG Business account's ID (META_IG_BUSINESS_ID) — found via Graph API Explorer or your Page's connected Instagram account settings." };
  }
  try {
    const [acctRes, insightsRes] = await Promise.all([
      fetch(`${META_GRAPH_BASE}/${igId}?fields=followers_count&access_token=${token}`),
      fetch(`${META_GRAPH_BASE}/${igId}/insights?metric=reach&period=days_28&access_token=${token}`),
    ]);
    if (!acctRes.ok) { const b = await acctRes.json().catch(() => null); throw new Error(b?.error?.message || `Graph API error (${acctRes.status})`); }
    const acct = await acctRes.json();
    const insights = insightsRes.ok ? await insightsRes.json() : null;
    const reach = insights?.data?.find((d: any) => d.name === "reach")?.values?.at(-1)?.value ?? null;
    return { ok: true, data: { followerCount: Number(acct.followers_count ?? 0), reachLifetime: reach } };
  } catch (e: any) {
    return { ok: false, reason: e?.message || String(e) };
  }
});

export const getMetaConfig = createServerFn({ method: "GET" }).handler(async () => {
  return { facebook: metaConfigured(), instagram: Boolean(process.env.META_PAGE_ACCESS_TOKEN && process.env.META_IG_BUSINESS_ID) };
});
