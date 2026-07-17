/* Cross-platform artist performance data (RIPPL v3.0 plan: "Live DSP Data
   Feeds" + "Chartmetric / Soundcharts Aggregation").

   IMPORTANT — read before wiring up keys:
   Spotify and Apple do not publish a public API for streaming trends,
   playlist placements, or listener demographics — that data only lives
   inside each DSP's own private dashboard (Spotify for Artists / Apple
   Music for Artists have no external API). The Spotify Web API only
   exposes catalog data (search, top tracks, follower counts), not the
   analytics the plan describes.

   Chartmetric and Soundcharts *are* real third-party APIs built exactly
   for this — unified cross-platform metrics (Spotify/Anghami/TikTok/
   YouTube) is their whole product; still needs a paid key, checked
   server-side (see market-config.ts).

   YouTube is the one source we actually have a working key for — real,
   live subscriber/view counts, no placeholder needed. See youtube-api.ts. */

import { getMarketConfig } from "./market-config";
import { getArtistYoutubeStats, youtubeConfigured, formatCount, type ChannelStats } from "./youtube-api";

export interface MarketSource {
  id: "chartmetric" | "soundcharts" | "spotify" | "apple" | "youtube";
  label: string;
  configured: boolean;
  note: string;
}

export interface MarketSnapshot {
  artist: string;
  sources: MarketSource[];
  youtube: ChannelStats | null;
  youtubeError: string | null;
}

export async function getMarketSnapshot(artist: string): Promise<MarketSnapshot> {
  const [config, youtubeResult] = await Promise.all([
    getMarketConfig().catch(() => ({ chartmetric: false, soundcharts: false, spotify: false, apple: false })),
    youtubeConfigured
      ? getArtistYoutubeStats(artist).then((stats) => ({ stats, error: null as string | null })).catch((e) => ({ stats: null, error: e?.message || String(e) }))
      : Promise.resolve({ stats: null, error: null as string | null }),
  ]);

  const sources: MarketSource[] = [
    {
      id: "youtube",
      label: "YouTube",
      configured: youtubeConfigured,
      note: youtubeConfigured ? "Live subscriber & view counts via the YouTube Data API." : "Add VITE_YOUTUBE_API_KEY to activate.",
    },
    {
      id: "chartmetric",
      label: "Chartmetric",
      configured: config.chartmetric,
      note: "Unified Spotify/Anghami/TikTok/YouTube metrics — the real path to cross-platform data.",
    },
    {
      id: "soundcharts",
      label: "Soundcharts",
      configured: config.soundcharts,
      note: "Alternative to Chartmetric, same category of data.",
    },
    {
      id: "spotify",
      label: "Spotify Web API",
      configured: config.spotify,
      note: "Catalog data only (search, top tracks, follower counts) — NOT streaming trends or demographics; Spotify doesn't publish that publicly.",
    },
    {
      id: "apple",
      label: "Apple Music API",
      configured: config.apple,
      note: "Catalog data only, same limitation as Spotify.",
    },
  ];

  return { artist, sources, youtube: youtubeResult.stats, youtubeError: youtubeResult.error };
}

export { formatCount };
