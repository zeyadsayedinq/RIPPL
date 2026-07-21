import { createServerFn } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";
import { parseYoutubeVideoId } from "./youtube-api";
import {
  ytGet,
  serviceClient,
  upsertTodaySnapshot,
  runSnapshotSweep,
} from "./youtube-snapshot-sweep";

/* ═══════════════════════════════════════════════════════════
   YouTube Video Intel — vidIQ/TubeBuddy-style SEO panel, built entirely
   from the YouTube Data API v3 (tags, description, stats — real, live,
   the same key already used elsewhere in RIPPL) plus a deterministic local
   SEO-score formula. No AI/LLM API of any kind — nothing here calls out to
   Claude, OpenAI, or anyone else, and no key for one is required.

   YouTube exposes no historical view-count endpoint for third-party
   videos, so the velocity curve is built by RIPPL itself: every analyze
   call snapshots today's view/like/comment counts into video_snapshots
   (supabase/migrations/0002_youtube_deep_analytics.sql), and
   runSnapshotSweep() (called by the daily cron in
   api/cron/youtube-snapshot.ts, and reusable as a manual "Refresh" button)
   re-snapshots every tracked video once a day.

   Auth pattern matches admin-actions.ts / invite-member.ts: the browser
   passes its own Supabase access token, verified server-side via the
   service-role client — never trust a client-sent user id. If Supabase
   isn't configured (local password-gate mode), analysis still runs and
   returns results, it just isn't persisted (no velocity history). */

const YT_KEY =
  (import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined) ||
  process.env.VITE_YOUTUBE_API_KEY;

export interface DeepAnalytics {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  description: string;
  tags: string[];
  viewCount: number;
  likeCount: number | null;
  commentCount: number;
  seoScore: number;
  seoRecommendations: string[];
  tracked: boolean; // persisted to Supabase (false if signed out / Supabase not configured)
}

export interface Result<T> {
  ok: boolean;
  data?: T;
  reason?: string;
}

/* ── Config check (exposed to the client as a boolean only, same pattern
   as getMarketConfig in market-config.ts) ─────────────────────────── */
export const getYoutubeDeepConfig = createServerFn({ method: "GET" }).handler(
  async () => {
    return {
      youtube: Boolean(YT_KEY),
      supabase: Boolean(
        process.env.VITE_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
      ),
    };
  },
);

/* ── YouTube Data API helpers (ytGet itself lives in youtube-snapshot-sweep.ts,
   shared with the cron sweep) ─────────────────────────────────────── */

interface VideoMeta {
  title: string;
  description: string;
  tags: string[];
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number | null;
  commentCount: number;
}

async function fetchVideoMeta(videoId: string): Promise<VideoMeta> {
  const data = await ytGet("videos", {
    part: "snippet,statistics",
    id: videoId,
  });
  const item = data.items?.[0];
  if (!item) throw new Error("Video not found — check the link.");
  return {
    title: item.snippet.title,
    description: item.snippet.description || "",
    tags: item.snippet.tags || [],
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    viewCount: Number(item.statistics.viewCount ?? 0),
    likeCount:
      item.statistics.likeCount === undefined
        ? null
        : Number(item.statistics.likeCount),
    commentCount: Number(item.statistics.commentCount ?? 0),
  };
}

/* ── Local SEO score — a deterministic formula computed from real fields
   (tag count, title length, description length, tag/title keyword
   overlap). No AI involved; same numbers every time for the same inputs. */
function heuristicSeoScore(meta: VideoMeta): {
  score: number;
  recommendations: string[];
} {
  const recs: string[] = [];
  let score = 0;

  const tagCount = meta.tags.length;
  score += Math.min(30, tagCount * 3);
  if (tagCount < 8)
    recs.push(
      `Only ${tagCount} tags — YouTube allows up to ~500 characters of tags; aim for 10-15 specific ones.`,
    );

  const titleLen = meta.title.length;
  if (titleLen >= 40 && titleLen <= 70) score += 20;
  else
    recs.push(
      titleLen < 40
        ? "Title is short — titles 40-70 characters tend to balance clarity and keyword coverage."
        : "Title is long and may get truncated in search/suggested — consider tightening it.",
    );

  if (meta.description.length >= 200) score += 20;
  else
    recs.push(
      "Description is under 200 characters — a fuller description (with keywords in the first 2 lines) helps search ranking.",
    );

  const titleWords = new Set(
    meta.title.toLowerCase().match(/[a-z0-9]+/g) || [],
  );
  const overlap = meta.tags.filter((t) =>
    [...titleWords].some((w) => t.toLowerCase().includes(w)),
  ).length;
  score += Math.min(30, overlap * 5);
  if (overlap === 0 && tagCount > 0)
    recs.push(
      "None of your tags share a keyword with the title — align at least a few tags to your main title keywords.",
    );

  return { score: Math.round(Math.min(100, score)), recommendations: recs };
}

/* ── Supabase persistence (service-role, user verified via access token —
   same pattern as admin-actions.ts / setMemberPassword) ─────────────── */

async function resolveUserId(
  admin: SupabaseClient,
  accessToken: string | undefined,
): Promise<string | null> {
  if (!accessToken) return null;
  const { data, error } = await admin.auth.getUser(accessToken);
  if (error || !data?.user) return null;
  return data.user.id;
}

async function upsertTrackedVideo(
  admin: SupabaseClient,
  userId: string,
  videoId: string,
  campaignId: string | undefined,
  meta: VideoMeta,
  analytics: Omit<
    DeepAnalytics,
    "videoId" | "tracked" | "viewCount" | "likeCount" | "commentCount"
  >,
): Promise<string | null> {
  const { data, error } = await admin
    .from("tracked_videos")
    .upsert(
      {
        user_id: userId,
        campaign_id: campaignId || null,
        youtube_video_id: videoId,
        title: meta.title,
        channel_title: meta.channelTitle,
        tags: meta.tags,
        seo_score: analytics.seoScore,
        seo_score_is_heuristic: true,
        seo_recommendations: analytics.seoRecommendations,
        last_analyzed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,youtube_video_id" },
    )
    .select("id")
    .single();
  if (error) return null;
  return data?.id ?? null;
}

/* ── The main entry point: paste a URL, get tags/SEO/stats back, and
   (if signed in with Supabase configured) start tracking it for the
   velocity chart. No external AI call of any kind. ──────────────────── */
export const analyzeYoutubeVideo = createServerFn({ method: "POST" })
  .validator(
    (d: { videoUrl: string; accessToken?: string; campaignId?: string }) => d,
  )
  .handler(async ({ data }): Promise<Result<DeepAnalytics>> => {
    const videoId = parseYoutubeVideoId(data.videoUrl);
    if (!videoId)
      return {
        ok: false,
        reason: "Couldn't parse a YouTube video ID from that link.",
      };
    if (!YT_KEY) {
      return {
        ok: false,
        reason:
          "VITE_YOUTUBE_API_KEY isn't set — add it in Vercel env vars, then redeploy (see .env.example).",
      };
    }

    let meta: VideoMeta;
    try {
      meta = await fetchVideoMeta(videoId);
    } catch (e: unknown) {
      return { ok: false, reason: e instanceof Error ? e.message : String(e) };
    }

    const heuristic = heuristicSeoScore(meta);
    const analytics: Omit<
      DeepAnalytics,
      "videoId" | "tracked" | "viewCount" | "likeCount" | "commentCount"
    > = {
      title: meta.title,
      channelTitle: meta.channelTitle,
      publishedAt: meta.publishedAt,
      description: meta.description,
      tags: meta.tags,
      seoScore: heuristic.score,
      seoRecommendations: heuristic.recommendations,
    };

    // Best-effort persistence — never lets a Supabase hiccup fail the analysis itself.
    let tracked = false;
    try {
      const admin = serviceClient();
      if (admin) {
        const userId = await resolveUserId(admin, data.accessToken);
        if (userId) {
          const trackedId = await upsertTrackedVideo(
            admin,
            userId,
            videoId,
            data.campaignId,
            meta,
            analytics,
          );
          if (trackedId) {
            await upsertTodaySnapshot(admin, trackedId, {
              viewCount: meta.viewCount,
              likeCount: meta.likeCount,
              commentCount: meta.commentCount,
            });
            tracked = true;
          }
        }
      }
    } catch {
      /* velocity history is a bonus, not a blocker */
    }

    return {
      ok: true,
      data: {
        videoId,
        viewCount: meta.viewCount,
        likeCount: meta.likeCount,
        commentCount: meta.commentCount,
        tracked,
        ...analytics,
      },
    };
  });

/* ── Velocity curve — reads back the snapshot history for one tracked
   video (requires sign-in + Supabase; returns an honest reason otherwise,
   same as everywhere else in this file). ────────────────────────────── */
export interface VelocityPoint {
  date: string;
  views: number;
  likes: number | null;
  comments: number;
  dailyViewGain: number | null;
}

export const getVideoVelocity = createServerFn({ method: "POST" })
  .validator((d: { youtubeVideoId: string; accessToken?: string }) => d)
  .handler(async ({ data }): Promise<Result<VelocityPoint[]>> => {
    const admin = serviceClient();
    if (!admin)
      return {
        ok: false,
        reason:
          "Supabase isn't configured on this deployment — no velocity history without it.",
      };
    const userId = await resolveUserId(admin, data.accessToken);
    if (!userId)
      return {
        ok: false,
        reason: "Sign in to see this video's tracked history.",
      };

    const { data: tracked, error: trackedErr } = await admin
      .from("tracked_videos")
      .select("id")
      .eq("user_id", userId)
      .eq("youtube_video_id", data.youtubeVideoId)
      .maybeSingle();
    if (trackedErr || !tracked)
      return {
        ok: false,
        reason:
          "This video hasn't been analyzed yet — analyze it once to start tracking.",
      };

    const { data: rows, error } = await admin
      .from("video_snapshots")
      .select("view_count,like_count,comment_count,recorded_at")
      .eq("video_id", tracked.id)
      .order("recorded_at", { ascending: true });
    if (error) return { ok: false, reason: error.message };
    if (!rows || rows.length === 0)
      return {
        ok: false,
        reason: "No snapshots yet — check back after the next daily refresh.",
      };

    const points: VelocityPoint[] = rows.map((r, i) => ({
      date: r.recorded_at,
      views: Number(r.view_count),
      likes: r.like_count === null ? null : Number(r.like_count),
      comments: Number(r.comment_count),
      dailyViewGain:
        i === 0 ? null : Number(r.view_count) - Number(rows[i - 1].view_count),
    }));
    return { ok: true, data: points };
  });

/* ── Daily snapshot sweep — runSnapshotSweep() itself lives in
   youtube-snapshot-sweep.ts (framework-agnostic, no @tanstack import) so
   the Vercel Cron route (api/cron/youtube-snapshot.ts) can call it
   directly without pulling in TanStack Start. This just wraps the same
   function as a createServerFn for a manual "Refresh views" button. ── */
export const refreshTrackedVideoSnapshots = createServerFn({
  method: "POST",
}).handler(
  async (): Promise<
    Result<{ updated: number; failed: number; total: number }>
  > => {
    try {
      const result = await runSnapshotSweep();
      return { ok: true, data: result };
    } catch (e: unknown) {
      return { ok: false, reason: e instanceof Error ? e.message : String(e) };
    }
  },
);
