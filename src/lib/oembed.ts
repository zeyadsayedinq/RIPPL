import { createServerFn } from "@tanstack/react-start";

/* ═══════════════════════════════════════════════════════════
   Live post embeds — once a creator's video is actually posted and public,
   paste that live URL (Creator.livePostUrl, distinct from deliverableUrl)
   to pull a real oEmbed preview instead of the uploaded-file preview, so HQ
   can compare "what we approved" vs "what actually went out."

   TikTok: https://www.tiktok.com/oembed is genuinely public, no API key,
   no auth — confirmed against TikTok's own oEmbed docs. Runs server-side
   here anyway (not fetched directly from the browser) to avoid depending on
   TikTok's CORS behavior holding steady, and to match the pattern every
   other live-data call in this app already uses (server fn → typed
   LiveResult, see platform-live.ts).

   Instagram: NOT actually key-less the way TikTok's is, despite how that
   might read at a glance — Meta locked oEmbed down in 2020 to require a
   Graph API access token (graph.facebook.com/v21.0/instagram_oembed).
   A "Client Access Token" (format `${META_APP_ID}|${META_CLIENT_TOKEN}`,
   generated in the Meta App dashboard → Settings → Advanced) is the
   documented safe-for-this-purpose option, OR any valid Page/User token
   already works — reusing META_PAGE_ACCESS_TOKEN (already wired up for the
   Facebook/Instagram dashboards, see platform-live.ts) avoids asking for a
   second credential for the same Meta App. Reason surfaced honestly if
   neither is configured, same "no source, no number" rule as everywhere
   else in this app. */

export interface OEmbedResult {
  html: string;
  thumbnailUrl?: string;
  authorName?: string;
  title?: string;
  providerName: string;
}
export interface LiveEmbedOutcome {
  ok: boolean;
  data?: OEmbedResult;
  reason?: string;
}

function detectPlatform(url: string): "tiktok" | "instagram" | null {
  const host = (() => {
    try {
      return new URL(url).hostname.toLowerCase();
    } catch {
      return "";
    }
  })();
  if (host.includes("tiktok.com")) return "tiktok";
  if (host.includes("instagram.com")) return "instagram";
  return null;
}

async function fetchTikTokOEmbed(url: string): Promise<OEmbedResult> {
  const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error(`TikTok oEmbed error (${res.status}) — check the link is a public, live TikTok video URL.`);
  const body = await res.json();
  return {
    html: body.html,
    thumbnailUrl: body.thumbnail_url,
    authorName: body.author_name,
    title: body.title,
    providerName: "TikTok",
  };
}

async function fetchInstagramOEmbed(url: string): Promise<OEmbedResult> {
  const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
  const appToken =
    process.env.META_APP_ID && process.env.META_CLIENT_TOKEN
      ? `${process.env.META_APP_ID}|${process.env.META_CLIENT_TOKEN}`
      : undefined;
  const token = pageToken || appToken;
  if (!token) {
    throw new Error(
      "Instagram oEmbed needs a Meta access token (Meta locked this down in 2020 — it's no longer key-less). Reuse META_PAGE_ACCESS_TOKEN (already used for the Instagram dashboard), or set META_APP_ID + META_CLIENT_TOKEN from your Meta App → Settings → Advanced.",
    );
  }
  const res = await fetch(
    `https://graph.facebook.com/v21.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=${token}`,
  );
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || `Instagram oEmbed error (${res.status}) — check the link is a public, live Instagram post/reel URL.`);
  }
  const body = await res.json();
  return {
    html: body.html,
    thumbnailUrl: body.thumbnail_url,
    authorName: body.author_name,
    title: body.title,
    providerName: "Instagram",
  };
}

export const getLiveEmbed = createServerFn({ method: "POST" })
  .validator((d: { url: string }) => d)
  .handler(async ({ data }): Promise<LiveEmbedOutcome> => {
    const platform = detectPlatform(data.url);
    if (!platform)
      return { ok: false, reason: "That doesn't look like a TikTok or Instagram URL — paste the public post/reel link once it's live." };
    try {
      const result = platform === "tiktok" ? await fetchTikTokOEmbed(data.url) : await fetchInstagramOEmbed(data.url);
      return { ok: true, data: result };
    } catch (e: unknown) {
      return { ok: false, reason: e instanceof Error ? e.message : String(e) };
    }
  });
