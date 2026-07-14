import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { creators, platformColors, type Creator, type Platform, type Tier, type Status } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import { useCampaigns } from "@/lib/campaign-store";
import { useMemo, useState } from "react";
import { Search, Instagram, Music2, X, Heart, Eye, Users, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      { title: "Creators · RIPPL" },
      { name: "description", content: "Creator roster for your active campaign." },
    ],
  }),
  component: CreatorsPage,
});

const platforms: (Platform | "All")[] = ["All", "TikTok", "Instagram"];
const tiers: (Tier | "All")[] = ["All", "Featured", "Mega", "Macro", "Mid", "Micro"];
const statuses: (Status | "All")[] = ["All", "Confirmed", "Pending", "Priced", "Rejected"];

function CreatorsPage() {
  const [q, setQ] = useState("");
  const [platform, setPlatform] = useState<Platform | "All">("All");
  const [tier, setTier] = useState<Tier | "All">("All");
  const [status, setStatus] = useState<Status | "All">("All");
  const [selected, setSelected] = useState<Creator | null>(null);

  const filtered = useMemo(() => creators.filter((c) => {
    if (q && !`${c.name} ${c.handle} ${c.city}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (platform !== "All" && c.platform !== platform) return false;
    if (tier !== "All" && c.tier !== tier) return false;
    if (status !== "All" && c.status !== status) return false;
    return true;
  }), [q, platform, tier, status]);

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">Directory</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Creator Roster · <span className="text-gradient-neon">Active Campaign</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">{filtered.length} creators matched · 97 total in pipeline</p>
      </header>

      <SpotlightCard className="mt-6 p-5" spotlight={false}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search creators, handles, cities…"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-[oklch(0.7_0.28_328)]/40"
            />
          </div>
          <FilterGroup label="Platform" value={platform} options={platforms} onChange={(v) => setPlatform(v as Platform | "All")} />
        </div>
        <div className="mt-3 flex flex-wrap gap-3">
          <FilterGroup label="Tier" value={tier} options={tiers} onChange={(v) => setTier(v as Tier | "All")} />
          <FilterGroup label="Status" value={status} options={statuses} onChange={(v) => setStatus(v as Status | "All")} />
        </div>
      </SpotlightCard>

      <CreatorsList filtered={filtered} selected={selected} onSelectChange={setSelected} />

      <AnimatePresence>
        {selected && <CreatorModal creator={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </AppShell>
  );
}

function CreatorsList({ filtered, selected, onSelectChange }: { filtered: Creator[]; selected: Creator | null; onSelectChange: (c: Creator | null) => void }) {
  const { canSeePrice } = useRole();
  const { isAssigned } = useCampaigns();
  return (
    <div className="mt-6 grid grid-cols-1 gap-3">
      <div className="hidden lg:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <div>Creator</div>
        <div>Platform</div>
        <div>Tier</div>
        <div>Followers</div>
        <div>Engagement</div>
        <div>{canSeePrice ? "Price" : "Tier Rate"}</div>
        <div>Status</div>
      </div>
      {filtered.map((c, i) => (
        <motion.button
          key={c.id}
          onClick={() => onSelectChange(c)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          className="glass grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 rounded-2xl p-4 text-left transition-colors hover:border-[oklch(0.7_0.28_328)]/40"
        >
          <div className="col-span-2 lg:col-span-1 flex items-center gap-3 min-w-0">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.28_328)]/60 to-[oklch(0.5_0.3_300)]/60 font-display font-bold">
              {c.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate font-medium">{c.name}</span>
                {isAssigned(c.id) && <span title="Assigned to active campaign" className="shrink-0 rounded-full bg-[oklch(0.85_0.18_150)]/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[oklch(0.85_0.18_150)]">On campaign</span>}
              </div>
              <div className="truncate text-xs text-muted-foreground">{c.handle} · {c.city}</div>
            </div>
          </div>
          <PlatformBadge platform={c.platform} />
          <TierBadge tier={c.tier} />
          <div className="font-mono text-sm">{formatK(c.followers)}</div>
          <div className="font-mono text-sm text-[oklch(0.85_0.18_200)]">{c.engagement}%</div>
          <div className="font-mono text-sm">
            {canSeePrice ? `EGP ${c.price.toLocaleString()}` : "•••••"}
          </div>
          <StatusPill status={c.status} />
        </motion.button>
      ))}
    </div>
  );
}

function FilterGroup<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: T[]; onChange: (v: T) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <div className="glass flex rounded-full p-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`relative rounded-full px-3 py-1 text-xs transition-colors ${value === o ? "text-white" : "text-muted-foreground hover:text-white"}`}
          >
            {value === o && (
              <motion.div layoutId={`f-${label}`} className="absolute inset-0 rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)]/40 to-[oklch(0.5_0.3_300)]/40 border border-[oklch(0.7_0.28_328)]/40" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
            )}
            <span className="relative">{o}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PlatformBadge({ platform }: { platform: Platform }) {
  const map: Partial<Record<Platform, { icon: any; color: string }>> = {
    TikTok: { icon: Music2, color: platformColors.TikTok },
    Instagram: { icon: Instagram, color: platformColors.Instagram },
    Facebook: { icon: Music2, color: platformColors.Facebook },
    YouTube: { icon: Music2, color: platformColors.YouTube },
  };
  const { icon: Icon, color } = map[platform] ?? { icon: Music2, color: platformColors[platform] };
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <Icon className="h-3.5 w-3.5" style={{ color }} />
      <span className="text-muted-foreground">{platform}</span>
    </div>
  );
}

function TierBadge({ tier }: { tier: Tier }) {
  const map: Record<Tier, string> = {
    Featured: "border-[oklch(0.7_0.28_328)]/50 text-[oklch(0.85_0.25_328)]",
    Mega: "border-[oklch(0.55_0.3_300)]/50 text-[oklch(0.7_0.28_300)]",
    Macro: "border-[oklch(0.85_0.18_200)]/40 text-[oklch(0.85_0.18_200)]",
    Mid: "border-white/15 text-foreground",
    Micro: "border-white/10 text-muted-foreground",
  };
  return <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${map[tier]}`}>{tier}</span>;
}

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Confirmed: "bg-[oklch(0.85_0.18_200)]/15 text-[oklch(0.85_0.18_200)]",
    Pending: "bg-white/5 text-muted-foreground",
    Priced: "bg-[oklch(0.7_0.28_328)]/15 text-[oklch(0.85_0.25_328)]",
    Rejected: "bg-destructive/15 text-destructive",
  };
  return <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${map[status]}`}>{status}</span>;
}

function formatK(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return `${n}`;
}

function CreatorModal({ creator, onClose }: { creator: Creator; onClose: () => void }) {
  const { canSeePrice } = useRole();
  const { active, isAssigned, toggleAssignment } = useCampaigns();
  const assigned = isAssigned(creator.id);
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-stretch justify-end p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="glass-strong relative flex w-full max-w-md flex-col gap-6 overflow-y-auto rounded-2xl p-6"
      >
        <button onClick={onClose} className="glass absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full">
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)] font-display text-2xl font-bold shadow-[0_0_32px_rgba(232,121,249,0.5)]">
            {creator.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="font-display text-xl font-bold">{creator.name}</div>
            <div className="text-sm text-muted-foreground">{creator.handle} · {creator.city}</div>
            <div className="mt-1"><TierBadge tier={creator.tier} /></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Stat icon={Users} label="Followers" value={formatK(creator.followers)} />
          <Stat icon={Eye} label="Avg Views" value={formatK(creator.avgViews)} />
          <Stat icon={Heart} label="Engagement" value={`${creator.engagement}%`} />
        </div>

        <div className="glass rounded-xl p-4">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Deliverable Preview</div>
          <div className="mt-3 aspect-[9/16] w-40 mx-auto rounded-lg bg-gradient-to-br from-[oklch(0.15_0.05_320)] to-black relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <Music2 className="h-8 w-8 mx-auto text-[oklch(0.7_0.28_328)]" />
                <div className="mt-2 text-xs text-muted-foreground">{creator.platform} spec ·<br/>15s vertical</div>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/60">{creator.handle}</div>
          </div>
        </div>

        {canSeePrice && (
          <div className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Negotiated Rate</div>
              <div className="mt-1 font-display text-2xl font-bold text-gradient-neon">EGP {creator.price.toLocaleString()}</div>
            </div>
            <TrendingUp className="h-6 w-6 text-[oklch(0.85_0.18_200)]" />
          </div>
        )}

        <div className="glass rounded-xl p-4">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Campaign assignment</div>
          <div className="mt-1 text-sm text-muted-foreground">{active ? <>Active: <span className="text-foreground">{active.artist} — {active.title}</span></> : "No active campaign. Create one first."}</div>
          <button
            disabled={!active}
            onClick={() => toggleAssignment(creator.id)}
            className={`mt-3 w-full rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 ${assigned ? "bg-[oklch(0.85_0.18_150)]/20 text-[oklch(0.85_0.18_150)]" : "bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)] text-white"}`}
          >
            {assigned ? "✓ Assigned — remove from campaign" : "+ Assign to active campaign"}
          </button>
        </div>

        <div className="flex gap-3">
          <MagneticButton variant="primary">Approve</MagneticButton>
          <MagneticButton variant="danger">Reject</MagneticButton>
          <MagneticButton variant="ghost">Message</MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-3">
      <Icon className="h-3.5 w-3.5 text-[oklch(0.7_0.28_328)]" />
      <div className="mt-2 font-display text-lg font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
