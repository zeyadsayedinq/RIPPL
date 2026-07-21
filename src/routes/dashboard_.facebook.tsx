import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlatformDashboard, fmt, type PlatformConfig, type PlatformPanelState } from "@/components/PlatformDashboard";
import { getFacebookPageStats } from "@/lib/platform-live";
import { Facebook, Megaphone, Users, TrendingUp, Activity } from "lucide-react";

/* Facebook — real Page fan count + reach/engaged-users via the Meta Graph
   API (see platform-live.ts). Needs a Meta App + long-lived Page Access
   Token with pages_read_engagement + read_insights, set as
   META_PAGE_ACCESS_TOKEN + META_PAGE_ID. Page Insights only populate once
   the Page has 100+ likes, and tokens need refreshing every ~60 days. */

const cfg: PlatformConfig = {
  name: "Facebook",
  icon: Facebook,
  accent: "oklch(0.65 0.18 255)",
  paidLabel: "Boosted",
  panelTitle: "Page Performance",
  panelIcon: Megaphone,
  subtitle: "Real Page reach, engagement and fan count via the Meta Graph API.",
};

function FacebookDashboard() {
  const [panel, setPanel] = useState<PlatformPanelState>({ loading: true, connected: false });

  useEffect(() => {
    getFacebookPageStats().then((res) => {
      if (!res.ok || !res.data) { setPanel({ loading: false, connected: false, reason: res.reason, helpHref: "/settings" }); return; }
      const d = res.data;
      setPanel({
        loading: false, connected: true, views: d.reachLifetime ?? undefined,
        stats: [
          { icon: Users, label: "Page fans", value: fmt(d.fanCount), hint: "total Page likes" },
          { icon: TrendingUp, label: "Reach (28d)", value: d.reachLifetime === null ? "—" : fmt(d.reachLifetime), hint: "page_impressions" },
          { icon: Activity, label: "Engaged users (28d)", value: d.engagedUsersLifetime === null ? "—" : fmt(d.engagedUsersLifetime), hint: "page_engaged_users" },
        ],
      });
    }).catch((e) => setPanel({ loading: false, connected: false, reason: e?.message || String(e) }));
  }, []);

  return <PlatformDashboard cfg={cfg} panel={panel} />;
}

export const Route = createFileRoute("/dashboard_/facebook")({
  head: () => ({ meta: [{ title: "Facebook · RIPPL 360" }, { name: "description", content: "Facebook campaign command." }] }),
  component: FacebookDashboard,
});
