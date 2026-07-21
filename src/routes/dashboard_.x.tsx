import { createFileRoute } from "@tanstack/react-router";
import { PlatformDashboard, type PlatformConfig, type PlatformPanelState } from "@/components/PlatformDashboard";
import { Twitter, MessagesSquare } from "lucide-react";

/* X (Twitter) — no live data here, and that's a deliberate, honest choice:
   X discontinued its free API tier in Feb 2026. It's now pure pay-per-call
   (reading a post costs money, no free reads at all), with legacy
   subscription tiers closed to new signups and Enterprise starting around
   $42k/month. There's no "wire an env var and it's free" path like YouTube;
   turning this on means giving X a paid account and burning credits per
   read. Not scaffolding a live call here since that would silently start
   charging money the moment it runs — flagging it instead so the decision
   to pay for it is explicit and yours. */

const cfg: PlatformConfig = {
  name: "X",
  icon: Twitter,
  accent: "oklch(0.85 0.02 260)",
  paidLabel: "Promoted",
  panelTitle: "Impressions & Threads",
  panelIcon: MessagesSquare,
  subtitle: "No live data source — see the note on this page.",
};

const panel: PlatformPanelState = {
  loading: false,
  connected: false,
  reason: "X shut down free API access in Feb 2026 — it's pay-per-call now (~$5 per 1,000 reads, no free tier), so there's nothing to wire up for free. If you want this live, it means an X developer account funded with paid credits; ask and I'll build the integration once that's in place.",
};

function XDashboard() {
  return <PlatformDashboard cfg={cfg} panel={panel} />;
}

export const Route = createFileRoute("/dashboard_/x")({
  head: () => ({ meta: [{ title: "X · RIPPL 360" }, { name: "description", content: "X campaign command." }] }),
  component: XDashboard,
});
