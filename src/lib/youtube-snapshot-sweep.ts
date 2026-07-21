import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* Deliberately has ZERO dependency on @tanstack/react-start. This module is
   imported both by youtube-deep-analytics.ts (inside the TanStack Start app,
   wrapped in createServerFn for the manual "Refresh views" button) AND
   directly by api/cron/youtube-snapshot.ts — a plain Vercel Node serverless
   function that lives outside TanStack Router entirely. Keeping this file
   framework-agnostic means the cron route never has to import anything that
   assumes it's running inside a TanStack Start request. */

const YT_BASE = "https://www.googleapis.com/youtube/v3";

export function ytApiKey(): string | undefined {
  return (
    (typeof import.meta !== "undefined"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any -- import.meta.env's Vite-injected shape isn't statically typed here
        (import.meta as any).env?.VITE_YOUTUBE_API_KEY
      : undefined) || process.env.VITE_YOUTUBE_API_KEY
  );
}

export async function ytGet(
  path: string,
  params: Record<string, string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- raw YouTube Data API JSON, shape varies per `part`
): Promise<any> {
  const key = ytApiKey();
  if (!key) throw new Error("VITE_YOUTUBE_API_KEY isn't set.");
  const qs = new URLSearchParams({ ...params, key });
  const res = await fetch(`${YT_BASE}/${path}?${qs.toString()}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(
      body?.error?.message || `YouTube API error (${res.status})`,
    );
  }
  return res.json();
}

export function serviceClient(): SupabaseClient | null {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export interface SnapshotStats {
  viewCount: number;
  likeCount: number | null;
  commentCount: number;
}

/** Upserts today's (UTC) snapshot row for one tracked_videos.id — updates
 *  in place if this video already got a snapshot today (idempotent re-run
 *  safe), inserts otherwise. */
export async function upsertTodaySnapshot(
  admin: SupabaseClient,
  trackedId: string,
  stats: SnapshotStats,
) {
  const dayStart = new Date();
  dayStart.setUTCHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

  const { data: existing } = await admin
    .from("video_snapshots")
    .select("id")
    .eq("video_id", trackedId)
    .gte("recorded_at", dayStart.toISOString())
    .lt("recorded_at", dayEnd.toISOString())
    .maybeSingle();

  const row = {
    view_count: stats.viewCount,
    like_count: stats.likeCount,
    comment_count: stats.commentCount,
  };
  if (existing) {
    await admin
      .from("video_snapshots")
      .update({ ...row, recorded_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await admin.from("video_snapshots").insert({ video_id: trackedId, ...row });
  }
}

/** The daily sweep: re-fetches live stats (in batches of 50 — the YouTube
 *  Data API's max per videos.list call) for every video anyone has ever
 *  run through the analyzer, and snapshots them. This is what turns a
 *  single "paste a link" analysis into an actual growth curve over time. */
export async function runSnapshotSweep(): Promise<{
  updated: number;
  failed: number;
  total: number;
}> {
  const admin = serviceClient();
  if (!admin)
    throw new Error(
      "Supabase service credentials aren't configured (VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    );
  if (!ytApiKey()) throw new Error("VITE_YOUTUBE_API_KEY isn't set.");

  const { data: videos, error } = await admin
    .from("tracked_videos")
    .select("id,youtube_video_id");
  if (error) throw new Error(error.message);
  if (!videos || videos.length === 0)
    return { updated: 0, failed: 0, total: 0 };

  let updated = 0;
  let failed = 0;
  for (let i = 0; i < videos.length; i += 50) {
    const batch = videos.slice(i, i + 50);
    try {
      const data = await ytGet("videos", {
        part: "statistics",
        id: batch.map((v) => v.youtube_video_id).join(","),
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- raw YouTube Data API item shape
      const byId = new Map<string, any>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- raw YouTube Data API item shape
        (data.items ?? []).map((it: any) => [it.id, it.statistics]),
      );
      for (const v of batch) {
        const stats = byId.get(v.youtube_video_id);
        if (!stats) {
          failed++;
          continue;
        }
        try {
          await upsertTodaySnapshot(admin, v.id, {
            viewCount: Number(stats.viewCount ?? 0),
            likeCount:
              stats.likeCount === undefined ? null : Number(stats.likeCount),
            commentCount: Number(stats.commentCount ?? 0),
          });
          updated++;
        } catch {
          failed++;
        }
      }
    } catch {
      failed += batch.length;
    }
  }
  return { updated, failed, total: videos.length };
}
