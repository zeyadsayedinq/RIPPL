import { createServerFn } from "@tanstack/react-start";

/* Whether Chartmetric/Soundcharts/Spotify/Apple keys are configured — checked
   SERVER-SIDE only. These are real secrets (unlike the YouTube key, which
   Google's own API-key model expects to run client-side behind an HTTP
   referrer restriction), so the browser is only ever told a boolean, never
   the key itself. */
export const getMarketConfig = createServerFn({ method: "GET" }).handler(async () => {
  return {
    chartmetric: Boolean(process.env.CHARTMETRIC_API_KEY),
    soundcharts: Boolean(process.env.SOUNDCHARTS_API_KEY),
    spotify: Boolean(process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET),
    apple: Boolean(process.env.APPLE_MUSIC_TOKEN),
  };
});
