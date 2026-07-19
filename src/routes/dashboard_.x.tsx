import { createFileRoute } from "@tanstack/react-router";
import { PlatformDashboard, fmt, type PlatformConfig } from "@/components/PlatformDashboard";
import { Twitter, Eye, MessagesSquare, Hash } from "lucide-react";

/* RIPPL workplan §3: X — impressions vs engagement, thread performance,
   trending hashtag tracking. */

const HASHTAGS = ["#NewMusic", "#RIPPL", "#NowPlaying", "#Viral", "#FYP"];

const cfg: PlatformConfig = {
  name: "X",
  icon: Twitter,
  accent: "oklch(0.85 0.02 260)",
  paidLabel: "Promoted",
  panelTitle: "Impressions & Threads",
  panelIcon: MessagesSquare,
  subtitle: "Impressions, thread performance and hashtag momentum.",
  stats: (r, views) => [
    { icon: Eye, label: "Impressions", value: fmt(Math.round(views * (1.2 + r() * 1.5))), hint: "timeline + search + profile" },
    { icon: MessagesSquare, label: "Thread performance", value: `${(1 + r() * 5).toFixed(1)}%`, hint: "engagement on creator threads" },
    { icon: Hash, label: "Trending hashtag", value: HASHTAGS[Math.floor(r() * HASHTAGS.length)], hint: `peaked #${Math.ceil(r() * 30)} in Music` },
  ],
};

export const Route = createFileRoute("/dashboard_/x")({
  head: () => ({ meta: [{ title: "X · RIPPL 360" }, { name: "description", content: "X campaign command." }] }),
  component: () => <PlatformDashboard cfg={cfg} />,
});
