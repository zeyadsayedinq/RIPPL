import { createFileRoute } from "@tanstack/react-router";
import { PlatformDashboard, fmt, type PlatformConfig } from "@/components/PlatformDashboard";
import { Music4, Radio, Video, TrendingUp, ArrowUpRight } from "lucide-react";

/* RIPPL workplan §3: TikTok dashboard — sound-first metrics are the
   platform-specific feature called out explicitly in the spec. */

const cfg: PlatformConfig = {
  name: "TikTok",
  icon: Music4,
  accent: "oklch(0.72 0.2 200)",
  paidLabel: "Spark Ads",
  panelTitle: "Sound Performance",
  panelIcon: Radio,
  subtitle: "Sound-first campaign intelligence — creations, velocity and Spark Ads.",
  stats: (r, views) => [
    { icon: Video, label: "Creations with sound", value: fmt(Math.round(800 + r() * 8200)), hint: "videos using the campaign audio" },
    { icon: TrendingUp, label: "Sound velocity", value: `${Math.round(4 + r() * 90)}/hr`, hint: "new creations per hour" },
    { icon: ArrowUpRight, label: "Auditory reach", value: fmt(Math.round(views * (1.6 + r() * 0.9))), hint: "unique listeners (est.)" },
  ],
};

export const Route = createFileRoute("/dashboard_/tiktok")({
  head: () => ({ meta: [{ title: "TikTok · RIPPL 360" }, { name: "description", content: "TikTok campaign command." }] }),
  component: () => <PlatformDashboard cfg={cfg} />,
});
