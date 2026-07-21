import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlatformDashboard, fmt, type PlatformConfig, type PlatformPanelState } from "@/components/PlatformDashboard";
import { useCampaigns } from "@/lib/campaign-store";
import { getTikTokSoundStats } from "@/lib/platform-live";
import { Music4, Radio, Video } from "lucide-react";

/* TikTok sound scanner — real "creations using this sound" count for the
   campaign's linked sound, via Soundcharts (see platform-live.ts for why
   Soundcharts rather than TikTok's own API). Video count is the ONLY
   per-sound TikTok metric Soundcharts tracks — no likes/views/comments/
   shares breakdown exists for TikTok on their platform, confirmed against
   their live docs, so this panel only ever shows the one real number. */

const cfg: PlatformConfig = {
  name: "TikTok",
  icon: Music4,
  accent: "oklch(0.72 0.2 200)",
  paidLabel: "Spark Ads",
  panelTitle: "Sound Performance",
  panelIcon: Radio,
  subtitle: "Real sound-usage count for the linked TikTok sound.",
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
        loading: false, connected: true, views: d.videoCount,
        stats: [
          { icon: Video, label: "Creations with sound", value: fmt(d.videoCount), hint: d.asOf ? `as of ${d.asOf} · Soundcharts` : "Soundcharts video count" },
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
