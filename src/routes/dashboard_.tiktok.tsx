import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlatformDashboard, fmt, type PlatformConfig, type PlatformPanelState } from "@/components/PlatformDashboard";
import { useCampaigns } from "@/lib/campaign-store";
import { getTikTokSoundStats } from "@/lib/platform-live";
import { Music4, Radio, Video, Heart, Eye, MessageCircle, Share2 } from "lucide-react";

/* TikTok sound scanner — real creations/likes/views/comments/shares for the
   campaign's linked sound, via Soundcharts (see platform-live.ts for why
   Soundcharts rather than TikTok's own API, and for the caveat that the
   exact response shape there is best-effort pending live verification). */

const cfg: PlatformConfig = {
  name: "TikTok",
  icon: Music4,
  accent: "oklch(0.72 0.2 200)",
  paidLabel: "Spark Ads",
  panelTitle: "Sound Performance",
  panelIcon: Radio,
  subtitle: "Real sound-usage counts for the linked TikTok sound.",
};

function TikTokDashboard() {
  const { active, updateActiveLinks } = useCampaigns();
  const [panel, setPanel] = useState<PlatformPanelState>({ loading: false, connected: false });

  useEffect(() => {
    const url = active?.links?.tiktokSound;
    if (!url) { setPanel({ loading: false, connected: false, reason: "No TikTok sound linked yet. Paste the sound's TikTok URL below to scan it." }); return; }
    setPanel({ loading: true, connected: false });
    getTikTokSoundStats({ data: { tiktokSoundUrl: url } }).then((res) => {
      if (!res.ok || !res.data) { setPanel({ loading: false, connected: false, reason: res.reason, helpHref: "/settings" }); return; }
      const d = res.data;
      setPanel({
        loading: false, connected: true, views: d.viewCount,
        stats: [
          { icon: Video, label: "Creations with sound", value: fmt(d.videoCount), hint: "videos using this sound (Soundcharts, updates daily)" },
          { icon: Heart, label: "Likes", value: fmt(d.likeCount), hint: "across tracked videos" },
          { icon: Eye, label: "Views", value: fmt(d.viewCount), hint: "across tracked videos" },
          { icon: MessageCircle, label: "Comments", value: fmt(d.commentCount), hint: "across tracked videos" },
          { icon: Share2, label: "Shares", value: fmt(d.shareCount), hint: "across tracked videos" },
        ],
      });
    }).catch((e) => setPanel({ loading: false, connected: false, reason: e?.message || String(e) }));
  }, [active?.id, active?.links?.tiktokSound]);

  return (
    <PlatformDashboard
      cfg={cfg} panel={panel}
      linkEditor={{
        value: active?.links?.tiktokSound ?? "",
        placeholder: "Paste the TikTok sound URL (e.g. tiktok.com/music/...)",
        onSave: (v) => updateActiveLinks({ tiktokSound: v || undefined }),
      }}
    />
  );
}

export const Route = createFileRoute("/dashboard_/tiktok")({
  head: () => ({ meta: [{ title: "TikTok · RIPPL 360" }, { name: "description", content: "TikTok campaign command." }] }),
  component: TikTokDashboard,
});
