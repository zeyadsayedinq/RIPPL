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
   YouTube) is their whole product. That's the actual path to this
   feature; it needs a paid API key from one of them, which isn't
   available in this environment. This module wires up the client +
   config detection so it activates the moment a key is added. */

export interface MarketSource {
  id: "chartmetric" | "soundcharts" | "spotify" | "apple";
  label: string;
  configured: boolean;
  note: string;
}

function has(name: string): boolean {
  const v = (import.meta.env as Record<string, string | undefined>)[name];
  return !!v && v.trim().length > 0;
}

export function marketSources(): MarketSource[] {
  return [
    {
      id: "chartmetric",
      label: "Chartmetric",
      configured: has("VITE_CHARTMETRIC_API_KEY"),
      note: "Unified Spotify/Anghami/TikTok/YouTube metrics — the real path to cross-platform data.",
    },
    {
      id: "soundcharts",
      label: "Soundcharts",
      configured: has("VITE_SOUNDCHARTS_API_KEY"),
      note: "Alternative to Chartmetric, same category of data.",
    },
    {
      id: "spotify",
      label: "Spotify Web API",
      configured: has("VITE_SPOTIFY_CLIENT_ID") && has("VITE_SPOTIFY_CLIENT_SECRET"),
      note: "Catalog data only (search, top tracks, follower counts) — NOT streaming trends or demographics; Spotify doesn't publish that publicly.",
    },
    {
      id: "apple",
      label: "Apple Music API",
      configured: has("VITE_APPLE_MUSIC_TOKEN"),
      note: "Catalog data only, same limitation as Spotify.",
    },
  ];
}

export interface MarketSnapshot {
  artist: string;
  hasLiveSource: boolean;
  sources: MarketSource[];
}

/* No client-side fetch implementation yet — Chartmetric/Soundcharts keys
   are secret and must never be called directly from the browser. Once a
   key is added, route this through a small server proxy (a Vercel
   serverless function under /api) rather than calling the vendor
   directly from here. */
export function getMarketSnapshot(artist: string): MarketSnapshot {
  const sources = marketSources();
  return { artist, hasLiveSource: sources.some((s) => s.configured && (s.id === "chartmetric" || s.id === "soundcharts")), sources };
}
