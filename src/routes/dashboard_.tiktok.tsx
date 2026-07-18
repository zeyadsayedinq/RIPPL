import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { SharedBadge } from "@/components/SharedBadge";
import { useCampaigns, type UploadedAsset } from "@/lib/campaign-store";
import { useRole } from "@/lib/role-context";
import {
  Music4, Flame, Radio, Clapperboard, TrendingUp, Rocket, CheckCircle2, UploadCloud,
  FileDown, BadgeCheck, Wallet, ArrowUpRight, Video, Check,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

/* RIPPL workplan §3: "TikTok Dashboard — build first". Campaign status,
   TikTok-only Sound Performance, creatives grid from the asset pipeline,
   organic vs Spark Ads analytics, and role-based actions.
   Numbers are deterministic per campaign (seeded PRNG) until a real
   TikTok/Chartmetric feed is wired in — same approach as market-data.ts. */

export const Route = createFileRoute("/dashboard_/tiktok")({
  head: () => ({ meta: [{ title: "TikTok · RIPPL 360" }, { name: "description", content: "TikTok campaign command." }] }),
  component: TikTokDashboard,
});

/* Deterministic pseudo-random stream from a string seed (mulberry32). */
function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const fmt = (n: number) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : `${Math.round(n)}`);

function TikTokDashboard() {
  const { active, activeIsShared, activeEditable, activeAssets, taskProgress, setAssetStatus } = useCampaigns();
  const { role, canSeePrice } = useRole();
  const [queued, setQueued] = useState<string | null>(null);

  const stats = useMemo(() => {
    const r = rng(active?.id ?? "no-campaign");
    const goal = 10_000_000;
    const views = Math.round(goal * (0.15 + r() * 0.65));
    const spent = active ? Math.min(active.spent || Math.round((active.budget || 50000) * (0.2 + r() * 0.5)), active.budget || Infinity) : 0;
    const cpm = views ? (spent / views) * 1000 : 0;
    const engagements = Math.round(views * (0.05 + r() * 0.07));
    const cpe = engagements ? spent / engagements : 0;
    const creations = Math.round(800 + r() * 8200);
    const velocity = Math.round(4 + r() * 90);
    const reach = Math.round(views * (1.6 + r() * 0.9));
    const series = Array.from({ length: 14 }, (_, i) => {
      const day = new Date(Date.now() - (13 - i) * 86400000);
      const organic = Math.round((views / 24) * (0.4 + r()) );
      const paid = Math.round((views / 30) * (0.3 + r()));
      return {
        d: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        organic, paid,
        eng: +( (4 + r() * 6).toFixed(1) ),
      };
    });
    return { goal, views, spent, cpm, cpe, creations, velocity, reach, series };
  }, [active]);

  const progress = Math.min(100, Math.round((stats.views / stats.goal) * 100));
  const creatives = activeAssets.filter((a) => a.type === "Video" || a.type === "Art" || a.type === "Other");

  function act(label: string) { setQueued(label); setTimeout(() => setQueued(null), 1800); }
  const actions: { label: string; icon: typeof Rocket; primary?: boolean }[] =
    role === "Marketing Manager"
      ? [{ label: "Push to Spark Ads", icon: Rocket, primary: true }, { label: "Approve Content", icon: CheckCircle2 }, { label: "Request Revision", icon: UploadCloud }]
      : role === "Team Member"
        ? [{ label: "Submit New Draft", icon: UploadCloud, primary: true }, { label: "Download Brief", icon: FileDown }]
        : [{ label: "Approve Contract Amendment", icon: BadgeCheck, primary: true }, { label: "Verify Payout", icon: Wallet }];

  const statusColor: Record<UploadedAsset["status"], string> = {
    "Draft": "oklch(0.75 0.02 260)",
    "Under Review": "oklch(0.82 0.16 90)",
    "Approved": "oklch(0.82 0.18 150)",
    "Needs Revision": "oklch(0.7 0.2 20)",
  };

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[oklch(0.72_0.2_200)]"><Music4 className="h-3.5 w-3.5" /> Platform · TikTok</div>
          <h1 className="mt-1 flex flex-wrap items-center gap-3 font-display text-3xl font-bold">
            {active ? <>{active.artist} / <span className="text-gradient-neon">{active.title}</span></> : <span className="text-gradient-neon">TikTok Command</span>}
            {activeIsShared && <SharedBadge editable={activeEditable} className="!text-[10px]" />}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{active ? "Sound-first campaign intelligence — creations, velocity and Spark Ads." : "Create a campaign to activate TikTok tracking."}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {actions.map((a) => (
            <MagneticButton key={a.label} variant={a.primary ? undefined : "ghost"} onClick={() => act(a.label)}>
              {queued === a.label ? <Check className="h-4 w-4" /> : <a.icon className="h-4 w-4" />} {queued === a.label ? "Queued ✓" : a.label}
            </MagneticButton>
          ))}
        </div>
      </header>

      {/* Campaign status */}
      <section className="mt-6 grid grid-cols-12 gap-4">
        <SpotlightCard className="col-span-12 p-5 xl:col-span-5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Campaign Status</div>
            <Flame className="h-4 w-4 text-white/40" />
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <div className="font-display text-3xl font-bold">{fmt(stats.views)} <span className="text-base font-normal text-muted-foreground">/ {fmt(stats.goal)} views</span></div>
              <div className="mt-1 text-[11px] text-muted-foreground">{active?.goal || "Goal: 10M views"} · checklist {taskProgress}% done</div>
            </div>
            <div className="text-right">
              {canSeePrice && <div className="font-display text-xl font-bold">${fmt(stats.spent)}</div>}
              {canSeePrice && <div className="text-[10px] uppercase tracking-wider text-muted-foreground">spent</div>}
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full rounded-full bg-gradient-to-r from-[oklch(0.72_0.2_200)] to-[oklch(0.85_0.25_328)]" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {canSeePrice && <Metric label="CPM (live)" value={`$${stats.cpm.toFixed(2)}`} />}
            {canSeePrice && <Metric label="CPE (live)" value={`$${stats.cpe.toFixed(3)}`} />}
            <Metric label="Progress" value={`${progress}%`} />
            <Metric label="Engagement rate" value={`${stats.series.at(-1)?.eng ?? 0}%`} />
          </div>
        </SpotlightCard>

        {/* Sound performance — TikTok-specific */}
        <SpotlightCard className="col-span-12 p-5 xl:col-span-7">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Sound Performance</div>
            <Radio className="h-4 w-4 text-white/40" />
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SoundStat icon={Video} label="Creations with sound" value={fmt(stats.creations)} hint="videos using the campaign audio" />
            <SoundStat icon={TrendingUp} label="Sound velocity" value={`${stats.velocity}/hr`} hint="new creations per hour" />
            <SoundStat icon={ArrowUpRight} label="Auditory reach" value={fmt(stats.reach)} hint="unique listeners (est.)" />
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground/70">Deterministic placeholder metrics — wire the TikTok / Chartmetric feed in <code className="text-[10px]">market-data.ts</code> to go live.</p>
        </SpotlightCard>
      </section>

      {/* Analytics */}
      <SpotlightCard className="mt-4 p-5" spotlight={false}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Analytics · last 14 days</div>
            <h2 className="mt-1 font-display text-xl font-bold">Organic vs Spark Ads</h2>
          </div>
        </div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.series} margin={{ top: 4, right: 8, left: -14, bottom: 0 }}>
              <defs>
                <linearGradient id="tkOrganic" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.2 200)" stopOpacity={0.5} /><stop offset="100%" stopColor="oklch(0.72 0.2 200)" stopOpacity={0} /></linearGradient>
                <linearGradient id="tkPaid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.85 0.25 328)" stopOpacity={0.5} /><stop offset="100%" stopColor="oklch(0.85 0.25 328)" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="d" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => fmt(v)} />
              <Tooltip contentStyle={{ background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }} formatter={(v: number, name: string) => [fmt(v), name === "organic" ? "Organic views" : "Spark Ads views"]} />
              <Legend formatter={(v: string) => <span className="text-xs text-muted-foreground">{v === "organic" ? "Organic" : "Spark Ads"}</span>} />
              <Area type="monotone" dataKey="organic" stroke="oklch(0.72 0.2 200)" fill="url(#tkOrganic)" strokeWidth={2} />
              <Area type="monotone" dataKey="paid" stroke="oklch(0.85 0.25 328)" fill="url(#tkPaid)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SpotlightCard>

      {/* Creatives & assets */}
      <SpotlightCard className="mt-4 p-5" spotlight={false}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Creatives & Assets</div>
            <h2 className="mt-1 font-display text-xl font-bold">Drafted content</h2>
          </div>
          <Link to="/assets" className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5"><Clapperboard className="h-3.5 w-3.5" /> Asset pipeline</Link>
        </div>
        {creatives.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-muted-foreground">
            No drafted content on this campaign yet — upload drafts in <Link to="/assets" className="text-white underline underline-offset-2">Assets</Link> and they'll appear here with their approval status.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {creatives.map((a) => (
              <div key={a.id} className="glass overflow-hidden rounded-xl">
                <div className="relative grid aspect-video place-items-center bg-white/[0.03]">
                  {a.previewUrl ? <img src={a.previewUrl} alt={a.name} className="h-full w-full object-cover" /> : <Video className="h-6 w-6 text-white/25" />}
                  <span className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider" style={{ color: statusColor[a.status], background: "rgba(0,0,0,0.55)", border: `1px solid ${statusColor[a.status]}` }}>{a.status}</span>
                </div>
                <div className="p-3">
                  <div className="truncate text-xs font-medium">{a.name}</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">{a.type} · {a.addedAt}</div>
                  {role === "Marketing Manager" && a.status !== "Approved" && (
                    <div className="mt-2 flex gap-1.5">
                      <button onClick={() => setAssetStatus(a.id, "Approved")} className="rounded-full border border-[oklch(0.82_0.18_150)]/40 px-2 py-0.5 text-[10px] text-[oklch(0.82_0.18_150)] hover:bg-[oklch(0.82_0.18_150)]/10">Approve</button>
                      <button onClick={() => setAssetStatus(a.id, "Needs Revision")} className="rounded-full border border-[oklch(0.7_0.2_20)]/40 px-2 py-0.5 text-[10px] text-[oklch(0.8_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10">Revise</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </SpotlightCard>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-lg font-bold">{value}</div>
    </div>
  );
}

function SoundStat({ icon: Icon, label, value, hint }: { icon: typeof Video; label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground"><Icon className="h-3.5 w-3.5" /> {label}</div>
      <div className="mt-2 font-display text-2xl font-bold">{value}</div>
      <div className="mt-0.5 text-[10px] text-muted-foreground/70">{hint}</div>
    </div>
  );
}
