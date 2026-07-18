import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Marquee } from "@/components/Marquee";
import { MagneticButton } from "@/components/MagneticButton";
import {
  campaignKpis,
  platformMetrics,
  platformColors,
  paidVsOrganic,
  funnel,
  attribution,
  channelMix,
  paidCampaigns,
  budget,
  rolloutPhases,
  activityFeed,
  type Kpi,
  type Platform,
  type PaidCampaign,
} from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import { useCampaigns } from "@/lib/campaign-store";
import { NewCampaignModal, ModalShell } from "@/components/NewCampaignModal";
import { SharedBadge } from "@/components/SharedBadge";
import { EmptyState } from "@/components/EmptyState";
import {
  TrendingUp, TrendingDown, Sparkles, ArrowUpRight, CheckCircle2,
  LayoutGrid, DollarSign, Radio, Filter, Wallet,
  Music2, Instagram, Facebook, Youtube, Linkedin, Ghost, AtSign, Hash,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, ComposedChart,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "RIPPL · 360° Campaign Command" },
      { name: "description", content: "Full-funnel, all-platform, paid + organic marketing command center." },
    ],
  }),
  component: Dashboard,
});

/* ── helpers ─────────────────────────────────────────────── */
const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` :
  n >= 1_000 ? `${(n / 1_000).toFixed(0)}K` : `${n}`;
const money = (n: number) =>
  n >= 1_000_000 ? `EGP ${(n / 1_000_000).toFixed(2)}M` :
  n >= 1_000 ? `EGP ${(n / 1_000).toFixed(0)}K` : `EGP ${n}`;

const platformIcon: Record<Platform, any> = {
  TikTok: Music2, Instagram, Facebook, YouTube: Youtube, X: Hash,
  LinkedIn: Linkedin, Snapchat: Ghost, Threads: AtSign, Pinterest: Radio,
};

const tooltipStyle = {
  background: "rgba(15,5,25,0.92)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  backdropFilter: "blur(20px)",
} as const;

type TabKey = "overview" | "paid" | "organic" | "funnel" | "budget";
const TABS: { key: TabKey; label: string; icon: any }[] = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "paid", label: "Paid Media", icon: DollarSign },
  { key: "organic", label: "Organic & Social", icon: Radio },
  { key: "funnel", label: "Funnel & Attribution", icon: Filter },
  { key: "budget", label: "Budget", icon: Wallet },
];

/* ── page ────────────────────────────────────────────────── */
function Dashboard() {
  const [tab, setTab] = useState<TabKey>("overview");
  const { active } = useCampaigns();

  // No campaign / no metric data yet → clean empty state.
  if (!active || campaignKpis.length === 0) {
    return (
      <AppShell>
        <Header />
        <EmptyState
          title={active ? "No metrics yet" : "No campaign yet"}
          note={
            active
              ? "This campaign has no performance data yet. Connect your channels or add data to populate the 360° command center."
              : "Create your first campaign to start tracking reach, spend, funnel and attribution across every channel."
          }
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Header />

      <div className="mt-6 flex gap-1.5 overflow-x-auto rounded-2xl glass p-1.5">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${active ? "text-white" : "text-muted-foreground hover:text-white"}`}
            >
              {active && (
                <motion.div
                  layoutId="tab-active"
                  className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <t.icon className="relative h-4 w-4" />
              <span className="relative whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {tab === "overview" && <OverviewTab />}
          {tab === "paid" && <PaidTab />}
          {tab === "organic" && <OrganicTab />}
          {tab === "funnel" && <FunnelTab />}
          {tab === "budget" && <BudgetTab />}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}

/* ── header ──────────────────────────────────────────────── */
function Header() {
  const [modal, setModal] = useState<null | "new" | "export">(null);
  const { active, activeIsShared, activeEditable } = useCampaigns();
  return (
    <header className="glass flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl p-5">
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">360° Command{active ? ` · ${active.status} · Live` : ""}</div>
        <h1 className="mt-1 flex flex-wrap items-center gap-3 font-display text-3xl font-bold tracking-tight">
          {active ? <>{active.artist} / <span className="text-gradient-neon">{active.title}</span></> : <span className="text-gradient-neon">Campaign HQ</span>}
          {activeIsShared && <SharedBadge editable={activeEditable} className="!text-[10px]" />}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{active ? `${active.subtitle} · ${active.platforms.length} channels · full-funnel attribution` : "No active campaign — create one to begin."}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <MagneticButton variant="ghost" onClick={() => setModal("export")}>Export report</MagneticButton>
        <MagneticButton onClick={() => setModal("new")}>+ New campaign</MagneticButton>
      </div>

      <AnimatePresence>
        {modal === "new" && <NewCampaignModal onClose={() => setModal(null)} />}
        {modal === "export" && <ExportModal onClose={() => setModal(null)} />}
      </AnimatePresence>
    </header>
  );
}

function ExportModal({ onClose }: { onClose: () => void }) {
  const [downloaded, setDownloaded] = useState(false);
  const doExport = () => {
    const lines = [
      "RIPPL — 360° Campaign Report",
      "Campaign HQ / Q3 2026",
      "",
      ...campaignKpis.map((k) => `${k.label}: ${k.value} (${k.delta >= 0 ? "+" : ""}${k.delta}%)`),
      "",
      "Channel Mix:",
      ...channelMix.map((c) => `  ${c.channel}: spend ${money(c.spend)}, revenue ${money(c.revenue)}, ROAS ${c.roas}x`),
    ].join("\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rippl-campaign-report-q3-2026.txt";
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };
  return (
    <ModalShell eyebrow="Export report" title="Campaign report" onClose={onClose}>
      <p className="text-sm text-muted-foreground">
        Generate a snapshot of the current 360° view — top-line KPIs and channel mix. Downloads a report file you can share with clients.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {campaignKpis.slice(0, 4).map((k) => (
          <div key={k.key} className="glass rounded-xl p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.label}</div>
            <div className="mt-1 font-display text-lg font-bold">{k.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-end gap-2">
        {downloaded && <span className="mr-auto inline-flex items-center gap-1.5 text-xs text-[oklch(0.85_0.18_150)]"><CheckCircle2 className="h-4 w-4" /> Report downloaded</span>}
        <button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white">Close</button>
        <MagneticButton onClick={doExport}>Download report</MagneticButton>
      </div>
    </ModalShell>
  );
}

/* ── shared bits ─────────────────────────────────────────── */
function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{eyebrow}</div>
        <h2 className="mt-1 font-display text-2xl font-bold">{title}</h2>
      </div>
      {action && (
        <MagneticButton variant="ghost">
          <ArrowUpRight className="h-4 w-4" /> {action}
        </MagneticButton>
      )}
    </div>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  const { canSeePrice } = useRole();
  const up = kpi.delta >= 0;
  const hidden = kpi.format === "money" && !canSeePrice && (kpi.key === "spend" || kpi.key === "revenue");
  return (
    <SpotlightCard className="col-span-6 md:col-span-3 xl:col-span-3 p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{kpi.label}</div>
        <span className={`flex items-center gap-1 font-mono text-[11px] ${up ? "text-[oklch(0.85_0.18_150)]" : "text-[oklch(0.7_0.2_20)]"}`}>
          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {up ? "+" : ""}{kpi.delta}%
        </span>
      </div>
      <div className="mt-3 font-display text-3xl font-bold">{hidden ? "•••••" : kpi.value}</div>
      <div className="mt-1 text-[11px] text-muted-foreground/70">{kpi.hint}</div>
    </SpotlightCard>
  );
}

/* ── TAB: Overview ───────────────────────────────────────── */
function OverviewTab() {
  return (
    <>
      <section className="mt-6 grid grid-cols-12 gap-4">
        {campaignKpis.map((k) => <KpiCard key={k.key} kpi={k} />)}
      </section>

      <div className="mt-6"><Marquee items={activityFeed} /></div>

      <section className="mt-6 grid grid-cols-12 gap-4">
        <SpotlightCard className="col-span-12 xl:col-span-7 p-6">
          <SectionTitle eyebrow="Reach · Last 8 weeks" title="Paid vs. Organic" action="Full report" />
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={paidVsOrganic}>
                <defs>
                  <linearGradient id="gOrg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.28 328)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="oklch(0.7 0.28 328)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gPaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.16 200)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="oklch(0.72 0.16 200)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={fmt} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#fff" }} formatter={(v: number) => fmt(v)} />
                <Area type="monotone" name="Organic" dataKey="organic" stroke="oklch(0.7 0.28 328)" strokeWidth={2} fill="url(#gOrg)" />
                <Area type="monotone" name="Paid" dataKey="paid" stroke="oklch(0.72 0.16 200)" strokeWidth={2} fill="url(#gPaid)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>

        <SpotlightCard className="col-span-12 xl:col-span-5 p-6">
          <SectionTitle eyebrow="Channel Mix" title="Spend → Revenue" />
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={channelMix} layout="vertical" margin={{ left: 24 }}>
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={money} />
                <YAxis type="category" dataKey="channel" stroke="rgba(255,255,255,0.4)" fontSize={10} width={110} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => money(v)} />
                <Bar dataKey="spend" name="Spend" fill="oklch(0.55 0.3 300)" radius={[0, 4, 4, 0]} barSize={9} />
                <Bar dataKey="revenue" name="Revenue" fill="oklch(0.72 0.16 200)" radius={[0, 4, 4, 0]} barSize={9} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>
      </section>

      <PhaseTracker />
    </>
  );
}

/* ── TAB: Paid Media ─────────────────────────────────────── */
function PaidTab() {
  const { canSeePrice } = useRole();
  const spendByPlatform = platformMetrics.filter((p) => p.spend > 0).map((p) => ({ name: p.name, spend: p.spend, roas: p.roas }));
  return (
    <>
      <section className="mt-6 grid grid-cols-12 gap-4">
        <SpotlightCard className="col-span-12 lg:col-span-7 p-6">
          <SectionTitle eyebrow="Paid Media" title="Spend by Platform" />
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendByPlatform}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.35)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={money} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n) => (n === "spend" ? money(v) : `${v}x`)} />
                <Bar dataKey="spend" radius={[6, 6, 0, 0]} barSize={34}>
                  {spendByPlatform.map((p) => <Cell key={p.name} fill={platformColors[p.name as Platform]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>

        <SpotlightCard className="col-span-12 lg:col-span-5 p-6">
          <SectionTitle eyebrow="Efficiency" title="ROAS by Platform" />
          <div className="mt-6 space-y-3">
            {[...spendByPlatform].sort((a, b) => b.roas - a.roas).map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-xs text-muted-foreground">{p.name}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full" style={{ width: `${(p.roas / 6) * 100}%`, background: platformColors[p.name as Platform] }} />
                </div>
                <span className="w-10 text-right font-mono text-xs text-foreground">{p.roas}x</span>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </section>

      <section className="mt-6">
        <SpotlightCard className="p-6" spotlight={false}>
          <SectionTitle eyebrow="Active Buys" title="Campaign Manager" />
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="pb-3 font-medium">Campaign</th>
                  <th className="pb-3 font-medium">Platform</th>
                  <th className="pb-3 font-medium">Objective</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Spend</th>
                  <th className="pb-3 text-right font-medium">Impr.</th>
                  <th className="pb-3 text-right font-medium">CTR</th>
                  <th className="pb-3 text-right font-medium">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {paidCampaigns.map((c) => <CampaignRow key={c.id} c={c} canSeePrice={canSeePrice} />)}
              </tbody>
            </table>
          </div>
        </SpotlightCard>
      </section>
    </>
  );
}

function CampaignRow({ c, canSeePrice }: { c: PaidCampaign; canSeePrice: boolean }) {
  const Icon = platformIcon[c.platform];
  const statusColor: Record<string, string> = {
    Active: "oklch(0.85 0.18 150)", Paused: "oklch(0.8 0.16 80)",
    Scheduled: "oklch(0.72 0.16 250)", Ended: "oklch(0.6 0.02 260)",
  };
  const pct = c.budget ? Math.round((c.spend / c.budget) * 100) : 0;
  return (
    <tr className="border-t border-white/[0.06] transition-colors hover:bg-white/[0.02]">
      <td className="py-3">
        <div className="font-medium">{c.name}</div>
        <div className="mt-1 h-1 w-28 overflow-hidden rounded-full bg-white/5">
          <div className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)]" style={{ width: `${pct}%` }} />
        </div>
      </td>
      <td className="py-3"><span className="inline-flex items-center gap-1.5" style={{ color: platformColors[c.platform] }}><Icon className="h-3.5 w-3.5" />{c.platform}</span></td>
      <td className="py-3 text-muted-foreground">{c.objective}</td>
      <td className="py-3"><span className="inline-flex items-center gap-1.5 text-xs" style={{ color: statusColor[c.status] }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: statusColor[c.status] }} />{c.status}</span></td>
      <td className="py-3 text-right font-mono">{canSeePrice ? money(c.spend) : "•••"}</td>
      <td className="py-3 text-right font-mono text-muted-foreground">{fmt(c.impressions)}</td>
      <td className="py-3 text-right font-mono text-muted-foreground">{c.ctr}%</td>
      <td className="py-3 text-right font-mono" style={{ color: c.roas >= 4 ? "oklch(0.85 0.18 150)" : "inherit" }}>{c.roas ? `${c.roas}x` : "—"}</td>
    </tr>
  );
}

/* ── TAB: Organic & Social ───────────────────────────────── */
function OrganicTab() {
  return (
    <>
      <section className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
        {platformMetrics.map((p) => {
          const Icon = platformIcon[p.name];
          const color = platformColors[p.name];
          const paidPct = p.reach ? Math.round((p.paidReach / p.reach) * 100) : 0;
          return (
            <SpotlightCard key={p.name} className="p-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-medium"><Icon className="h-4 w-4" style={{ color }} />{p.name}</span>
                <span className="font-mono text-xs text-[oklch(0.85_0.18_150)]">+{p.growth}%</span>
              </div>
              <div className="mt-3 font-display text-2xl font-bold">{fmt(p.reach)}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Reach · {p.followers} followers</div>
              <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full" style={{ width: `${100 - paidPct}%`, background: color, opacity: 0.9 }} />
                <div className="h-full" style={{ width: `${paidPct}%`, background: color, opacity: 0.35 }} />
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
                <span>Organic {100 - paidPct}%</span>
                <span>ER {p.engagementRate}%</span>
                <span>Paid {paidPct}%</span>
              </div>
            </SpotlightCard>
          );
        })}
      </section>

      <section className="mt-6">
        <SpotlightCard className="p-6">
          <SectionTitle eyebrow="Organic Health" title="Engagement Rate by Platform" />
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...platformMetrics].sort((a, b) => b.engagementRate - a.engagementRate)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.35)" fontSize={10} tickLine={false} axisLine={false} interval={0} angle={-18} textAnchor="end" height={50} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="engagementRate" radius={[6, 6, 0, 0]} barSize={30}>
                  {platformMetrics.map((p) => <Cell key={p.name} fill={platformColors[p.name]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>
      </section>
    </>
  );
}

/* ── TAB: Funnel & Attribution ───────────────────────────── */
function FunnelTab() {
  const max = funnel[0].value;
  return (
    <>
      <section className="mt-6 grid grid-cols-12 gap-4">
        <SpotlightCard className="col-span-12 xl:col-span-6 p-6">
          <SectionTitle eyebrow="Awareness → Conversion" title="Marketing Funnel" />
          <div className="mt-6 space-y-2.5">
            {funnel.map((s, i) => (
              <div key={s.stage}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{s.stage}</span>
                  <span className="font-mono text-foreground">{fmt(s.value)} {i > 0 && <span className="text-muted-foreground/60">· {s.rate}%</span>}</span>
                </div>
                <div className="mt-1.5 h-8 overflow-hidden rounded-lg bg-white/[0.03]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(s.value / max) * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-lg"
                    style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}55)` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard className="col-span-12 xl:col-span-6 p-6">
          <SectionTitle eyebrow="Multi-Touch" title="Attribution by Channel" />
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attribution} layout="vertical" margin={{ left: 32 }}>
                <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="channel" stroke="rgba(255,255,255,0.4)" fontSize={10} width={120} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="firstTouch" name="First-touch" stackId="a" fill="oklch(0.72 0.16 200)" barSize={16} />
                <Bar dataKey="lastTouch" name="Last-touch" stackId="a" fill="oklch(0.6 0.26 300)" barSize={16} />
                <Bar dataKey="linear" name="Linear" stackId="a" fill="oklch(0.7 0.28 328)" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>
      </section>

      <section className="mt-6">
        <SpotlightCard className="p-6" spotlight={false}>
          <SectionTitle eyebrow="Assisted Conversions" title="Channel Contribution" />
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {attribution.map((a) => (
              <div key={a.channel} className="glass rounded-xl p-4">
                <div className="text-[11px] text-muted-foreground">{a.channel}</div>
                <div className="mt-2 font-display text-xl font-bold">{fmt(a.assisted)}</div>
                <div className="mt-1 font-mono text-[11px] text-[oklch(0.85_0.18_150)]">{a.roas}x ROAS</div>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </section>
    </>
  );
}

/* ── TAB: Budget ─────────────────────────────────────────── */
function BudgetTab() {
  const { canSeePrice } = useRole();
  const pctSpent = Math.round((budget.spent / budget.total) * 100);
  const mask = (v: string) => (canSeePrice ? v : "•••••");
  return (
    <>
      <section className="mt-6 grid grid-cols-12 gap-4">
        <BudgetStat label="Total Budget" value={mask(money(budget.total))} accent="oklch(0.55 0.3 300)" icon={Wallet} />
        <BudgetStat label="Spent" value={mask(money(budget.spent))} accent="oklch(0.7 0.28 328)" icon={DollarSign} sub={`${pctSpent}% of budget`} />
        <BudgetStat label="Committed" value={mask(money(budget.committed))} accent="oklch(0.8 0.16 80)" icon={CheckCircle2} />
        <BudgetStat label="Remaining" value={mask(money(budget.remaining))} accent="oklch(0.85 0.18 150)" icon={Sparkles} />
      </section>

      <section className="mt-6 grid grid-cols-12 gap-4">
        <SpotlightCard className="col-span-12 xl:col-span-7 p-6">
          <SectionTitle eyebrow="Pacing · 8 weeks" title="Budget Burndown" />
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={budget.burndown}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="week" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={money} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => money(v)} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="planned" name="Planned" stroke="oklch(0.6 0.02 260)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="oklch(0.7 0.28 328)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>

        <SpotlightCard className="col-span-12 xl:col-span-5 p-6">
          <SectionTitle eyebrow="Allocation" title="Spend by Channel" />
          <div className="mt-6 space-y-3">
            {channelMix.map((c, i) => (
              <div key={c.channel}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{c.channel}</span>
                  <span className="font-mono">{canSeePrice ? money(c.spend) : "•••"} · {c.share}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full" style={{ width: `${c.share}%`, background: `oklch(0.7 0.28 ${328 - i * 18})` }} />
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </section>
    </>
  );
}

function BudgetStat({ label, value, accent, icon: Icon, sub }: { label: string; value: string; accent: string; icon: any; sub?: string }) {
  return (
    <SpotlightCard className="col-span-6 md:col-span-3 p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
        <Icon className="h-4 w-4" style={{ color: accent }} />
      </div>
      <div className="mt-3 font-display text-3xl font-bold">{value}</div>
      {sub && <div className="mt-1 text-[11px] text-muted-foreground/70">{sub}</div>}
      <div className="mt-2 h-0.5 w-8 rounded" style={{ background: accent }} />
    </SpotlightCard>
  );
}

/* ── shared: phase tracker (reused on overview) ──────────── */
function PhaseTracker() {
  return (
    <section className="mt-6 grid grid-cols-12 gap-4">
      <SpotlightCard className="col-span-12 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Campaign Timeline</div>
            <h2 className="mt-1 font-display text-2xl font-bold">Phase Tracker</h2>
          </div>
          <div className="glass hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.28_328)] animate-pulse" />
            <span className="text-muted-foreground">Live sync</span>
          </div>
        </div>
        <div className="mt-8 relative">
          <div className="absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {rolloutPhases.map((p) => (
              <div key={p.name} className="relative">
                <div className="flex flex-col items-start">
                  <div className={`relative grid h-12 w-12 place-items-center rounded-full border-2 ${p.status === "complete" ? "border-[oklch(0.7_0.28_328)] bg-[oklch(0.7_0.28_328)]/20" : p.status === "active" ? "border-[oklch(0.85_0.18_200)] bg-[oklch(0.85_0.18_200)]/10" : "border-white/15 bg-white/[0.03]"}`}>
                    {p.status === "complete" ? <CheckCircle2 className="h-5 w-5 text-[oklch(0.85_0.25_328)]" /> : <span className="font-mono text-xs text-foreground">{p.progress}%</span>}
                    {p.status === "active" && <div className="absolute inset-0 rounded-full bg-[oklch(0.85_0.18_200)]/30 blur-md animate-pulse -z-10" />}
                  </div>
                  <div className="mt-3 text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.date}</div>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)]" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </section>
  );
}
