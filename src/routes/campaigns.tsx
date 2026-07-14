import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { NewCampaignModal } from "@/components/NewCampaignModal";
import { useCampaigns } from "@/lib/campaign-store";
import { useRole } from "@/lib/role-context";
import { Check, Circle, DollarSign } from "lucide-react";

export const Route = createFileRoute("/campaigns")({
  head: () => ({ meta: [{ title: "Campaigns · RIPPL" }, { name: "description", content: "All marketing campaigns." }] }),
  component: CampaignsPage,
});

const money = (n: number) => (n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${(n / 1_000).toFixed(0)}K`);
const statusColor: Record<string, string> = { Active: "oklch(0.85 0.18 150)", Planning: "oklch(0.8 0.16 80)", Wrapped: "oklch(0.6 0.02 260)" };

function CampaignsPage() {
  const { campaigns, active, setActive } = useCampaigns();
  const { canSeePrice } = useRole();
  const [modal, setModal] = useState(false);

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">Portfolio</div>
          <h1 className="mt-1 font-display text-3xl font-bold">All <span className="text-gradient-neon">Campaigns</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">{campaigns.length} campaigns · {campaigns.filter((c) => c.status === "Active").length} active</p>
        </div>
        <MagneticButton onClick={() => setModal(true)}>+ New campaign</MagneticButton>
      </header>

      <section className="mt-6 grid grid-cols-12 gap-4">
        {campaigns.map((c) => {
          const isActive = c.id === active.id;
          const pct = c.budget ? Math.round((c.spent / c.budget) * 100) : 0;
          return (
            <SpotlightCard key={c.id} className={`col-span-12 md:col-span-6 xl:col-span-4 p-5 ${isActive ? "ring-1 ring-[oklch(0.7_0.28_328)]/50" : ""}`}>
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <div className="font-display text-lg font-bold">{c.artist}</div>
                  <div className="truncate text-sm text-muted-foreground">{c.title}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]" style={{ color: statusColor[c.status], background: statusColor[c.status] + "1a" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusColor[c.status] }} />{c.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground/80">{c.subtitle}</p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <Stat label="Reach" value={c.reach} />
                <Stat label="Goal" value={c.goal} small />
                <Stat label="Window" value={`${c.startDate} → ${c.endDate}`} small />
                <Stat label="Budget" value={canSeePrice ? money(c.budget) : "•••"} />
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><DollarSign className="h-3 w-3" /> Spend</span>
                  <span>{canSeePrice ? `${money(c.spent)} / ${money(c.budget)}` : "•••"} · {pct}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)]" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {c.platforms.map((p) => <span key={p} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground">{p}</span>)}
              </div>

              <button
                onClick={() => setActive(c.id)}
                className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? "bg-white/10 text-white" : "glass text-foreground hover:bg-white/5"}`}
              >
                {isActive ? <><Check className="h-4 w-4" /> Active</> : <><Circle className="h-4 w-4" /> Set active</>}
              </button>
            </SpotlightCard>
          );
        })}
      </section>

      <AnimatePresence>{modal && <NewCampaignModal onClose={() => setModal(false)} />}</AnimatePresence>
    </AppShell>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="glass rounded-lg p-2.5">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-0.5 font-semibold ${small ? "text-[11px] leading-tight" : "text-sm"}`}>{value}</div>
    </div>
  );
}
