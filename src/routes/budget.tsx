import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useCampaigns } from "@/lib/campaign-store";
import { EmptyState } from "@/components/EmptyState";
import { useRole } from "@/lib/role-context";
import { budgetLines } from "@/lib/campaign-data";
import { Wallet, DollarSign, CheckCircle2, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts";

export const Route = createFileRoute("/budget")({
  head: () => ({ meta: [{ title: "Budget · RIPPL" }, { name: "description", content: "Campaign budget & spend." }] }),
  component: BudgetPage,
});

const money = (n: number) => (n >= 1_000_000 ? `EGP ${(n / 1_000_000).toFixed(2)}M` : `EGP ${(n / 1_000).toFixed(0)}K`);
const tip = { background: "rgba(15,5,25,0.92)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 } as const;

function BudgetPage() {
  const { active } = useCampaigns();
  const { canSeePrice } = useRole();
  const mask = (v: string) => (canSeePrice ? v : "•••••");

  if (!active) {
    return (
      <AppShell>
        <EmptyState title="No campaign yet" note="Create a campaign to set its budget and track spend by channel." />
      </AppShell>
    );
  }

  const totalPlanned = active.budget || budgetLines.reduce((s, b) => s + b.planned, 0);
  const totalSpent = active.spent || budgetLines.reduce((s, b) => s + b.spent, 0);
  const remaining = totalPlanned - totalSpent;
  const pct = totalPlanned ? Math.round((totalSpent / totalPlanned) * 100) : 0;

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">Budget · {active.artist}</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Campaign <span className="text-gradient-neon">Budget</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">{active.title} · spend by channel, grounded in the marketing plan</p>
      </header>

      <section className="mt-6 grid grid-cols-12 gap-4">
        <Stat label="Total Budget" value={mask(money(totalPlanned))} icon={Wallet} accent="oklch(0.55 0.3 300)" />
        <Stat label="Spent" value={mask(money(totalSpent))} sub={`${pct}% used`} icon={DollarSign} accent="oklch(0.7 0.28 328)" />
        <Stat label="Remaining" value={mask(money(remaining))} icon={CheckCircle2} accent="oklch(0.85 0.18 150)" />
        <Stat label="Pacing" value={pct < 80 ? "On track" : "Watch"} icon={TrendingUp} accent="oklch(0.85 0.18 200)" />
      </section>

      {budgetLines.length === 0 ? (
        <SpotlightCard className="mt-6 p-10 text-center" spotlight={false}>
          <p className="text-sm text-muted-foreground">No budget line items yet. Add spend categories to see allocation and pacing here.</p>
        </SpotlightCard>
      ) : (
      <section className="mt-6 grid grid-cols-12 gap-4">
        <SpotlightCard className="col-span-12 xl:col-span-7 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Allocation</div>
          <h2 className="mt-1 font-display text-2xl font-bold">Planned vs. Spent by Line</h2>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetLines} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={money} />
                <YAxis type="category" dataKey="category" stroke="rgba(255,255,255,0.4)" fontSize={9} width={150} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tip} formatter={(v: number) => money(v)} />
                <Bar dataKey="planned" name="Planned" fill="oklch(0.35 0.1 300)" radius={[0, 4, 4, 0]} barSize={7} />
                <Bar dataKey="spent" name="Spent" fill="oklch(0.7 0.28 328)" radius={[0, 4, 4, 0]} barSize={7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>

        <SpotlightCard className="col-span-12 xl:col-span-5 p-6" spotlight={false}>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Line Items</div>
          <h2 className="mt-1 font-display text-2xl font-bold">Spend Detail</h2>
          <div className="mt-5 space-y-3">
            {budgetLines.map((b, i) => {
              const p = b.planned ? Math.round((b.spent / b.planned) * 100) : 0;
              return (
                <div key={b.category}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{b.category}</span>
                    <span className="font-mono">{canSeePrice ? `${money(b.spent)} / ${money(b.planned)}` : "•••"}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(p, 100)}%`, background: `oklch(0.7 0.28 ${328 - i * 14})` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </SpotlightCard>
      </section>
      )}
    </AppShell>
  );
}

function Stat({ label, value, sub, icon: Icon, accent }: { label: string; value: string; sub?: string; icon: any; accent: string }) {
  return (
    <SpotlightCard className="col-span-6 md:col-span-3 p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
        <Icon className="h-4 w-4" style={{ color: accent }} />
      </div>
      <div className="mt-3 font-display text-2xl font-bold">{value}</div>
      {sub && <div className="mt-1 text-[11px] text-muted-foreground/70">{sub}</div>}
      <div className="mt-2 h-0.5 w-8 rounded" style={{ background: accent }} />
    </SpotlightCard>
  );
}
