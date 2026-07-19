import { createFileRoute } from "@tanstack/react-router";
import { PlatformDashboard, fmt, type PlatformConfig } from "@/components/PlatformDashboard";
import { Facebook, Users, Megaphone, Wallet, PlayCircle } from "lucide-react";

/* RIPPL workplan §3: Facebook — reach vs engagement (organic reach is
   usually much lower — call it out), boost spend, video completion. */

const cfg: PlatformConfig = {
  name: "Facebook",
  icon: Facebook,
  accent: "oklch(0.65 0.18 255)",
  paidLabel: "Boosted",
  panelTitle: "Reach & Completion",
  panelIcon: Megaphone,
  subtitle: "Reach vs engagement, boost spend and video completion.",
  stats: (r, views, spent) => [
    { icon: Users, label: "Organic reach", value: `${(2 + r() * 6).toFixed(1)}%`, hint: "of page audience — FB organic runs low" },
    { icon: Megaphone, label: "Engagement rate", value: `${(1.5 + r() * 4).toFixed(1)}%`, hint: "reactions + comments + shares / reach" },
    { icon: PlayCircle, label: "Video completion", value: `${Math.round(8 + r() * 22)}%`, hint: "FB watches skew short — hook early" },
    { icon: Wallet, label: "Boost spend", value: `$${fmt(Math.round(spent * (0.2 + r() * 0.5)))}`, hint: "of campaign spend on boosts", priceGated: true },
  ],
};

export const Route = createFileRoute("/dashboard_/facebook")({
  head: () => ({ meta: [{ title: "Facebook · RIPPL 360" }, { name: "description", content: "Facebook campaign command." }] }),
  component: () => <PlatformDashboard cfg={cfg} />,
});
