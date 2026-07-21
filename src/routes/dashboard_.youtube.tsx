import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlatformDashboard, fmt, type PlatformConfig, type PlatformPanelState } from "@/components/PlatformDashboard";
import { useCampaigns } from "@/lib/campaign-store";
import { getVideoStats, youtubeConfigured } from "@/lib/youtube-api";
import { Youtube, PlaySquare, Eye, ThumbsUp, MessageCircle } from "lucide-react";

/* YouTube — real, live view/like/comment counts for the campaign's linked
   video via the Data API v3 (already working elsewhere in the app — see
   youtube-api.ts). Retention/completion-rate/est.-revenue (the old fake
   panel) need YouTube Analytics OAuth on the channel owner's account, not
   just an API key, so they're out of scope here — this panel only shows
   numbers the public API can actually give us. */

const cfg: PlatformConfig = {
  name: "YouTube",
  icon: Youtube,
  accent: "oklch(0.65 0.24 20)",
  paidLabel: "Paid",
  panelTitle: "Video Performance",
  panelIcon: PlaySquare,
  subtitle: "Real view/like/comment counts for the linked video.",
};

function YoutubeDashboard() {
  const { active, updateActiveLinks } = useCampaigns();
  const [panel, setPanel] = useState<PlatformPanelState>({ loading: false, connected: false });

  useEffect(() => {
    const url = active?.links?.youtube;
    if (!youtubeConfigured) { setPanel({ loading: false, connected: false, reason: "VITE_YOUTUBE_API_KEY isn't set. Add it in Vercel env vars, then redeploy.", helpHref: "/settings" }); return; }
    if (!url) { setPanel({ loading: false, connected: false, reason: "No YouTube video linked yet. Paste the video URL below." }); return; }
    setPanel({ loading: true, connected: false });
    getVideoStats(url).then((stats) => {
      if (!stats) { setPanel({ loading: false, connected: false, reason: "Video not found — check the link." }); return; }
      setPanel({
        loading: false, connected: true, views: stats.viewCount,
        stats: [
          { icon: Eye, label: "Views", value: fmt(stats.viewCount), hint: stats.title },
          { icon: ThumbsUp, label: "Likes", value: stats.likeCount === null ? "hidden" : fmt(stats.likeCount), hint: "public like count" },
          { icon: MessageCircle, label: "Comments", value: fmt(stats.commentCount), hint: "top-level comments" },
        ],
      });
    }).catch((e) => setPanel({ loading: false, connected: false, reason: e?.message || String(e) }));
  }, [active?.id, active?.links?.youtube]);

  return (
    <PlatformDashboard
      cfg={cfg} panel={panel}
      linkEditor={{
        value: active?.links?.youtube ?? "",
        placeholder: "Paste the YouTube video URL",
        onSave: (v) => updateActiveLinks({ youtube: v || undefined }),
      }}
    />
  );
}

export const Route = createFileRoute("/dashboard_/youtube")({
  head: () => ({ meta: [{ title: "YouTube · RIPPL 360" }, { name: "description", content: "YouTube campaign command." }] }),
  component: YoutubeDashboard,
});
