import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlatformDashboard, fmt, type PlatformConfig, type PlatformPanelState } from "@/components/PlatformDashboard";
import { useCampaigns } from "@/lib/campaign-store";
import { getVideoStats, youtubeConfigured } from "@/lib/youtube-api";
import { Youtube, PlaySquare, Eye, ThumbsUp, MessageCircle, Link2 } from "lucide-react";

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
  const { active, activeEditable, updateActiveLinks } = useCampaigns();
  const [linkInput, setLinkInput] = useState(active?.links?.youtube ?? "");
  const [panel, setPanel] = useState<PlatformPanelState>({ loading: false, connected: false });

  useEffect(() => setLinkInput(active?.links?.youtube ?? ""), [active?.id]);

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
    <>
      <PlatformDashboard cfg={cfg} panel={panel} />
      {active && activeEditable && (
        <div className="glass mx-auto mt-4 flex max-w-3xl flex-wrap items-center gap-2 rounded-2xl p-4">
          <Link2 className="h-4 w-4 shrink-0 text-white/40" />
          <input
            value={linkInput} onChange={(e) => setLinkInput(e.target.value)}
            placeholder="Paste the YouTube video URL"
            className="min-w-[240px] flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
          />
          <button onClick={() => updateActiveLinks({ youtube: linkInput.trim() || undefined })} className="glass rounded-full px-4 py-2 text-sm hover:bg-white/5">Save link</button>
        </div>
      )}
    </>
  );
}

export const Route = createFileRoute("/dashboard_/youtube")({
  head: () => ({ meta: [{ title: "YouTube · RIPPL 360" }, { name: "description", content: "YouTube campaign command." }] }),
  component: YoutubeDashboard,
});
