import { createFileRoute } from "@tanstack/react-router";
import { PlatformDashboard, fmt, type PlatformConfig } from "@/components/PlatformDashboard";
import { Instagram, Clapperboard, Timer, Bookmark, Share2, MousePointerClick, BadgeCheck } from "lucide-react";

/* RIPPL workplan §3: Instagram — Reels performance (watch time / saves /
   shares), story swipe-up rate, sponsored-label compliance. */

const cfg: PlatformConfig = {
  name: "Instagram",
  icon: Instagram,
  accent: "oklch(0.75 0.2 350)",
  paidLabel: "Boosted",
  panelTitle: "Reels Performance",
  panelIcon: Clapperboard,
  subtitle: "Reels-led growth — watch time, saves, story swipe-ups and #ad compliance.",
  stats: (r, views) => {
    const compliance = Math.round(82 + r() * 18);
    return [
      { icon: Timer, label: "Avg watch time", value: `${(6 + r() * 16).toFixed(1)}s`, hint: "per Reel view" },
      { icon: Bookmark, label: "Saves", value: fmt(Math.round(views * (0.008 + r() * 0.02))), hint: "strongest ranking signal" },
      { icon: Share2, label: "Shares", value: fmt(Math.round(views * (0.006 + r() * 0.015))), hint: "DM + story reshares" },
      { icon: MousePointerClick, label: "Story swipe-up rate", value: `${(0.8 + r() * 2.6).toFixed(1)}%`, hint: "link taps / story views" },
      { icon: BadgeCheck, label: "#ad compliance", value: `${compliance}%`, hint: compliance < 100 ? "some posts missing #ad / #sponsored" : "all sponsored posts labeled" },
    ];
  },
};

export const Route = createFileRoute("/dashboard_/instagram")({
  head: () => ({ meta: [{ title: "Instagram · RIPPL 360" }, { name: "description", content: "Instagram campaign command." }] }),
  component: () => <PlatformDashboard cfg={cfg} />,
});
