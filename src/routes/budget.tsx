import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { EmptyState } from "@/components/EmptyState";
import { useCampaigns } from "@/lib/campaign-store";
import { useRole } from "@/lib/role-context";
import { Wallet, DollarSign, CheckCircle2, TrendingUp, Plus, Trash2, Minus } from "lucide-react";

export const Route = createFileRoute("/budget")({
  head: () => ({ meta: [{ title: "Budget · RIPPL" }, { name: "description", content: "Campaign budget, expenses & payments." }] }),
  component: BudgetPage,
});

const money = (n: number) => (n >= 1_000_000 ? `EGP ${(n / 1_000_000).toFixed(2)}M` : n >= 1000 ? `EGP ${(n / 1_000).toFixed(1)}K` : `EGP ${n}`);
const KINDS = ["Budget", "Expense", "Payment"] as const;

function BudgetPage() {
  const { active, activeBudgetLines, addBudgetLine, updateBudgetLine, removeBudgetLine } = useCampaigns();
  const { canSeePrice } = useRole();
  const mask = (v: string) => (canSeePrice ? v : "•••••");
  const [form, setForm] = useState({ category: "", planned: "", spent: "", kind: "Budget" as (typeof KINDS)[number] });

  if (!active) {
    return <AppShell><EmptyState title="No campaign yet" note="Create a campaign to set its budget and log expenses & payments." /></AppShell>;
  }

  const totalPlanned = activeBudgetLines.reduce((s, b) => s + b.planned, 0) || active.budget || 0;
  const totalSpent = activeBudgetLines.reduce((s, b) => s + b.spent, 0);
  const remaining = totalPlanned - totalSpent;
  const pct = totalPlanned ? Math.round((totalSpent / totalPlanned) * 100) : 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.category.trim()) return;
    addBudgetLine({ category: form.category, planned: Number(form.planned) || 0, spent: Number(form.spent) || 0, kind: form.kind });
    setForm({ category: "", planned: "", spent: "", kind: form.kind });
  }

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Budget · {active.artist}</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Campaign <span className="text-gradient-neon">Budget</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">{active.title} · add budgets, expenses & payments below</p>
      </header>

      <section className="mt-6 grid grid-cols-12 gap-4">
        <Stat label="Total Budget" value={mask(money(totalPlanned))} icon={Wallet} accent="oklch(0.7 0.02 260)" />
        <Stat label="Spent" value={mask(money(totalSpent))} sub={`${pct}% used`} icon={DollarSign} accent="oklch(0.85 0.02 260)" />
        <Stat label="Remaining" value={mask(money(remaining))} icon={CheckCircle2} accent="oklch(0.82 0.18 150)" />
        <Stat label="Pacing" value={pct <= 100 ? "On track" : "Over"} icon={TrendingUp} accent={pct <= 100 ? "oklch(0.82 0.18 150)" : "oklch(0.7 0.2 20)"} />
      </section>

      {/* Add line — single consistent form */}
      <SpotlightCard className="mt-6 p-5" spotlight={false}>
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Add a line</div>
        <form onSubmit={submit} className="mt-3 grid grid-cols-12 items-end gap-3">
          <div className="col-span-12 sm:col-span-4">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Category</label>
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. TikTok Spark Ads" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-white/40" />
          </div>
          <div className="col-span-4 sm:col-span-2">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Type</label>
            <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as any })} className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none">
              {KINDS.map((k) => <option key={k} className="bg-[#0a0a0c]">{k}</option>)}
            </select>
          </div>
          <div className="col-span-4 sm:col-span-2">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Planned (EGP)</label>
            <input type="number" value={form.planned} onChange={(e) => setForm({ ...form, planned: e.target.value })} placeholder="0" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-white/40" />
          </div>
          <div className="col-span-4 sm:col-span-2">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Spent (EGP)</label>
            <input type="number" value={form.spent} onChange={(e) => setForm({ ...form, spent: e.target.value })} placeholder="0" className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-white/40" />
          </div>
          <div className="col-span-12 sm:col-span-2">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-medium text-black"><Plus className="h-4 w-4" /> Add</button>
          </div>
        </form>
      </SpotlightCard>

      {/* Lines */}
      <SpotlightCard className="mt-4 p-5" spotlight={false}>
        {activeBudgetLines.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">No line items yet. Add a budget, expense or payment above.</div>
        ) : (
          <div className="space-y-2">
            {activeBudgetLines.map((b) => {
              const p = b.planned ? Math.round((b.spent / b.planned) * 100) : 0;
              return (
                <div key={b.id} className="glass flex flex-wrap items-center gap-3 rounded-xl p-3">
                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{b.kind}</span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{b.category}</span>
                  {/* quick spent -/+ */}
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateBudgetLine(b.id, { spent: Math.max(0, b.spent - 1000) })} className="grid h-6 w-6 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-white"><Minus className="h-3 w-3" /></button>
                    <span className="w-24 text-center font-mono text-xs">{canSeePrice ? money(b.spent) : "•••"}</span>
                    <button onClick={() => updateBudgetLine(b.id, { spent: b.spent + 1000 })} className="grid h-6 w-6 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-white"><Plus className="h-3 w-3" /></button>
                  </div>
                  <span className="w-24 text-right font-mono text-xs text-muted-foreground">/ {canSeePrice ? money(b.planned) : "•••"}</span>
                  <div className="hidden h-1.5 w-20 overflow-hidden rounded-full bg-white/5 sm:block"><div className="h-full rounded-full bg-white/70" style={{ width: `${Math.min(p, 100)}%` }} /></div>
                  <button onClick={() => removeBudgetLine(b.id)} className="text-muted-foreground hover:text-[oklch(0.7_0.2_20)]"><Trash2 className="h-4 w-4" /></button>
                </div>
              );
            })}
          </div>
        )}
      </SpotlightCard>
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
