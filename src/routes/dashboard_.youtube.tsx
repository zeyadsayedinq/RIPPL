import { createFileRoute } from "@tanstack/react-router";
import { PlatformDashboard, fmt, type PlatformConfig } from "@/components/PlatformDashboard";
import { Youtube, PlaySquare, Timer, UserPlus, DollarSign } from "lucide-react";

/* RIPPL workplan §3: YouTube — view duration, subscribe conversion,
   revenue estimate (price-gated). */

const cfg: PlatformConfig = {
  name: "YouTube",
  icon: Youtube,
  accent: "oklch(0.65 0.24 20)",
  paidLabel: "Paid",
  panelTitle: "Retention & Revenue",
  panelIcon: PlaySquare,
  subtitle: "Watch-through, subscriber conversion and monetization.",
  stats: (r, views) => [
    { icon: Timer, label: "Avg view duration", value: `${Math.floor(1 + r() * 3)}:${String(Math.floor(r() * 60)).padStart(2, "0")}`, hint: "biggest drop-off at the first hook" },
    { icon: PlaySquare, label: "Completion rate", value: `${Math.round(28 + r() * 40)}%`, hint: "viewers reaching the end" },
    { icon: UserPlus, label: "Subscribe conversion", value: `${(0.3 + r() * 1.4).toFixed(2)}%`, hint: "subs gained / campaign views" },
    { icon: DollarSign, label: "Est. revenue", value: `$${fmt(Math.round(views * (0.9 + r() * 2.4) / 1000))}`, hint: "if monetized (est. RPM)", priceGated: true },
  ],
};

export const Route = createFileRoute("/dashboard_/youtube")({
  head: () => ({ meta: [{ title: "YouTube · RIPPL 360" }, { name: "description", content: "YouTube campaign command." }] }),
  component: () => <PlatformDashboard cfg={cfg} />,
});
