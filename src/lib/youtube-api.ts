/* YouTube Data API v3 client — the one live, real data source we actually
   have credentials for. Uses a plain API key (not OAuth), which is Google's
   own model for client-side use: protect it with an HTTP referrer
   restriction in Google Cloud Console, not by hiding the key (see
   .env.example). Not tested against the live API in this environment
   (the sandbox's network allowlist blocks googleapis.com) — verify once
   deployed. */

const KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;
const BASE = "https://www.googleapis.com/youtube/v3";

export const youtubeConfigured = Boolean(KEY);

export interface ChannelStats {
  channelId: string;
  title: string;
  thumbnail: string;
  subscriberCount: number | null; // null if the channel hides its sub count
  viewCount: number;
  videoCount: number;
}

export interface TrendingVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  viewCount: number;
  publishedAt: string;
}

export interface VideoStats {
  id: string;
  title: string;
  viewCount: number;
  likeCount: number | null; // null if the uploader hides likes
  commentCount: number;
  publishedAt: string;
}

/** Accepts a full YouTube URL (watch/shorts/youtu.be) or a bare video ID. */
export function parseYoutubeVideoId(input: string): string | null {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s; // already a bare 11-char video ID
  try {
    const u = new URL(s);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1) || null;
    if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] || null;
    const v = u.searchParams.get("v");
    if (v) return v;
    return null;
  } catch {
    return null;
  }
}

/** Real, live stats for one specific video — exactly what Data API v3 CAN
 *  give us (unlike watch-through/retention/RPM, which need YouTube Analytics
 *  OAuth on the channel owner's account and aren't available from a plain
 *  API key). Use this to replace fabricated per-video numbers. */
export async function getVideoStats(videoIdOrUrl: string): Promise<VideoStats | null> {
  const id = parseYoutubeVideoId(videoIdOrUrl);
  if (!id) throw new Error("Couldn't parse a YouTube video ID from that link.");
  const data = await get("videos", { part: "snippet,statistics", id });
  const item = data.items?.[0];
  if (!item) return null;
  return {
    id,
    title: item.snippet.title,
    viewCount: Number(item.statistics.viewCount ?? 0),
    likeCount: item.statistics.likeCount === undefined ? null : Number(item.statistics.likeCount),
    commentCount: Number(item.statistics.commentCount ?? 0),
    publishedAt: item.snippet.publishedAt,
  };
}

async function get(path: string, params: Record<string, string>): Promise<any> {
  if (!KEY) throw new Error("VITE_YOUTUBE_API_KEY isn't set.");
  const qs = new URLSearchParams({ ...params, key: KEY });
  const res = await fetch(`${BASE}/${path}?${qs.toString()}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || `YouTube API error (${res.status})`);
  }
  return res.json();
}

/** Best-effort channel lookup by artist/act name. */
export async function findChannel(query: string): Promise<{ channelId: string; title: string; thumbnail: string } | null> {
  const data = await get("search", { part: "snippet", type: "channel", maxResults: "1", q: query });
  const item = data.items?.[0];
  if (!item) return null;
  return {
    channelId: item.snippet.channelId ?? item.id.channelId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.default?.url ?? "",
  };
}

export async function getChannelStats(channelId: string): Promise<ChannelStats | null> {
  const data = await get("channels", { part: "snippet,statistics", id: channelId });
  const item = data.items?.[0];
  if (!item) return null;
  return {
    channelId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.default?.url ?? "",
    subscriberCount: item.statistics.hiddenSubscriberCount ? null : Number(item.statistics.subscriberCount ?? 0),
    viewCount: Number(item.statistics.viewCount ?? 0),
    videoCount: Number(item.statistics.videoCount ?? 0),
  };
}

/** Search for a channel by artist name, then fetch its live stats in one call. */
export async function getArtistYoutubeStats(artistName: string): Promise<ChannelStats | null> {
  const channel = await findChannel(`${artistName} official`);
  if (!channel) return null;
  return getChannelStats(channel.channelId);
}

/** Trending music videos for a region — useful for A&R scouting (spot what's
   rising before it charts). videoCategoryId 10 = Music. */
export async function trendingMusic(regionCode: "EG" | "SA" | "AE", maxResults = 6): Promise<TrendingVideo[]> {
  const data = await get("videos", {
    part: "snippet,statistics",
    chart: "mostPopular",
    videoCategoryId: "10",
    regionCode,
    maxResults: String(maxResults),
  });
  return (data.items ?? []).map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? "",
    viewCount: Number(item.statistics?.viewCount ?? 0),
    publishedAt: item.snippet.publishedAt,
  }));
}

export function formatCount(n: number | null): string {
  if (n === null) return "hidden";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
