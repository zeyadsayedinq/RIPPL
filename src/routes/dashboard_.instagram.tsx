import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlatformDashboard, fmt, type PlatformConfig, type PlatformPanelState } from "@/components/PlatformDashboard";
import { getInstagramStats } from "@/lib/platform-live";
import { Instagram, Clapperboard, Users, TrendingUp } from "lucide-react";

/* Instagram — real follower count + reach via the Meta Graph API (same
   token/app as Facebook, plus instagram_manage_insights and the IG
   Business account's ID). See platform-live.ts for setup details. */

const cfg: PlatformConfig = {
  name: "Instagram",
  icon: Instagram,
  accent: "oklch(0.75 0.2 350)",
  paidLabel: "Boosted",
  panelTitle: "Account Performance",
  panelIcon: Clapperboard,
  subtitle: "Real follower count and reach via the Meta Graph API.",
};

function InstagramDashboard() {
  const [panel, setPanel] = useState<PlatformPanelState>({ loading: true, connected: false });

  useEffect(() => {
    getInstagramStats().then((res) => {
      if (!res.ok || !res.data) { setPanel({ loading: false, connected: false, reason: res.reason, helpHref: "/settings" }); return; }
      const d = res.data;
      setPanel({
        loading: false, connected: true, views: d.reachLifetime ?? undefined,
        stats: [
          { icon: Users, label: "Followers", value: fmt(d.followerCount), hint: "IG Business account" },
          { icon: TrendingUp, label: "Reach (28d)", value: d.reachLifetime === null ? "—" : fmt(d.reachLifetime), hint: "accounts reached" },
        ],
      });
    }).catch((e) => setPanel({ loading: false, connected: false, reason: e?.message || String(e) }));
  }, []);

  return <PlatformDashboard cfg={cfg} panel={panel} />;
}

export const Route = createFileRoute("/dashboard_/instagram")({
  head: () => ({ meta: [{ title: "Instagram · RIPPL 360" }, { name: "description", content: "Instagram campaign command." }] }),
  component: InstagramDashboard,
});
