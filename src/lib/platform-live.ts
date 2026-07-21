import { createServerFn } from "@tanstack/react-start";

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
   expose it as a straightforward API — that's the realistic path, and
   .env.example already anticipates it (SOUNDCHARTS_API_KEY). This module
   implements Soundcharts' documented OAuth2 client-credentials flow
   (developers.soundcharts.com/api/authorization). NOTE: I could not render
   Soundcharts' JS-based API reference pages to confirm the exact response
   field names for the song "current stats" endpoint, so treat the shape
   below as best-effort — verify against your account's live reference
   once SOUNDCHARTS_CLIENT_ID/SECRET are set, and adjust the field mapping
   in `mapSoundStats` if it doesn't match.

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
  videoCount: number;    // "creations with sound"
  likeCount: number;
  viewCount: number;
  commentCount: number;
  shareCount: number;
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

/** Best-effort mapping — see module note above about unverified field names. */
function mapSoundStats(body: any): TikTokSoundStats {
  const s = body?.object ?? body ?? {};
  return {
    videoCount: Number(s.videoCount ?? s.video_count ?? 0),
    likeCount: Number(s.likeCount ?? s.like_count ?? 0),
    viewCount: Number(s.viewCount ?? s.view_count ?? s.playCount ?? s.play_count ?? 0),
    commentCount: Number(s.commentCount ?? s.comment_count ?? 0),
    shareCount: Number(s.shareCount ?? s.share_count ?? 0),
  };
}

/** Resolves a public platform URL (e.g. the TikTok sound page link you'd
 *  paste from the app) to Soundcharts' own song UUID. Best-effort — this is
 *  documented on their site as "Get Soundcharts URL from platform URL" but
 *  I couldn't render the exact request/response shape, so this is the one
 *  spot most likely to need a fix once you have real credentials to test
 *  against (check developers.soundcharts.com/api/reference/search). */
async function resolveSoundchartsSongUuid(platformUrl: string): Promise<string> {
  const body = await soundchartsGet(`/song/by-platform-url?url=${encodeURIComponent(platformUrl)}`);
  const uuid = body?.object?.uuid ?? body?.uuid;
  if (!uuid) throw new Error("Soundcharts didn't recognize that TikTok sound link — try pasting the exact URL from the TikTok sound/music page.");
  return uuid;
}

/** `tiktokSoundUrl` is whatever you pasted into the campaign's TikTok sound
 *  link (Campaign.links.tiktokSound). Resolves it to a Soundcharts song and
 *  returns its current TikTok video/like/view/comment/share counts. */
export const getTikTokSoundStats = createServerFn({ method: "POST" })
  .validator((d: { tiktokSoundUrl: string }) => d)
  .handler(async ({ data }): Promise<LiveResult<TikTokSoundStats>> => {
    if (!process.env.SOUNDCHARTS_CLIENT_ID || !process.env.SOUNDCHARTS_CLIENT_SECRET) {
      return { ok: false, reason: "Soundcharts isn't connected. Add SOUNDCHARTS_CLIENT_ID + SOUNDCHARTS_CLIENT_SECRET (from your Soundcharts dashboard → Credentials) in Vercel env vars, then redeploy." };
    }
    try {
      const uuid = await resolveSoundchartsSongUuid(data.tiktokSoundUrl);
      const body = await soundchartsGet(`/song/${uuid}/current/stats`);
      return { ok: true, data: mapSoundStats(body) };
    } catch (e: any) {
      return { ok: false, reason: e?.message || String(e) };
    }
  });

export const soundchartsConfigured = createServerFn({ method: "GET" }).handler(async () => {
  return Boolean(process.env.SOUNDCHARTS_CLIENT_ID && process.env.SOUNDCHARTS_CLIENT_SECRET);
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
