import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import {
  platformColors,
  type Creator,
  type Platform,
  type Tier,
  type Status,
} from "@/lib/mock-data";
import { useCampaigns } from "@/lib/campaign-store";
import { useOS, uid } from "@/lib/os-store";
import { cloudEnabled, uploadToBucket, signedUrl } from "@/lib/cloud";
import { Portal } from "@/components/Portal";
import { DeviceFramePreview, supportsDeviceFrame } from "@/components/DeviceFramePreview";
import { LiveEmbedCard } from "@/components/LiveEmbedCard";
import { exportCreatorsCsv } from "@/lib/csv-export";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Instagram,
  Music2,
  X,
  Heart,
  Eye,
  Users,
  Check,
  Plus,
  Link2,
  Upload,
  Send,
  ExternalLink,
  Loader2,
  Trash2,
  Download,
  BarChart2,
  Zap,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Star,
  Activity,
  RefreshCw,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const AUDIT_API = (import.meta.env.VITE_AUDIT_API_URL as string | undefined) ?? "http://localhost:8000";

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      { title: "Creators · RIPPL" },
      {
        name: "description",
        content: "Creator roster for your active campaign.",
      },
    ],
  }),
  component: CreatorsPage,
});

const platforms: (Platform | "All")[] = ["All", "TikTok", "Instagram"];
const addPlatforms: Platform[] = [
  "TikTok",
  "Instagram",
  "Facebook",
  "YouTube",
  "X",
  "LinkedIn",
  "Snapchat",
  "Threads",
  "Pinterest",
];
const tiers: (Tier | "All")[] = [
  "All",
  "Featured",
  "Mega",
  "Macro",
  "Mid",
  "Micro",
];
const addTiers: Tier[] = ["Featured", "Mega", "Macro", "Mid", "Micro"];
const statuses: (Status | "All")[] = [
  "All",
  "Confirmed",
  "Pending",
  "Priced",
  "Rejected",
];

function CreatorsPage() {
  const [pageTab, setPageTab] = useState<"roster" | "audit">("roster");
  const [q, setQ] = useState("");
  const [platform, setPlatform] = useState<Platform | "All">("All");
  const [tier, setTier] = useState<Tier | "All">("All");
  const [status, setStatus] = useState<Status | "All">("All");
  // Default to campaign-scoped: whenever a campaign is active, the page
  // opens showing only the creators already assigned to IT, not the whole
  // roster. Toggle off to browse/add from the full directory.
  const [assignedOnly, setAssignedOnly] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const {
    active,
    assignedIds,
    isAssigned,
    sharedCreators,
    isSharedCreator,
    canEditSharedCreator,
    pushCreatorEdit,
  } = useCampaigns();
  const { creators: ownCreators, update } = useOS();

  // Merge in creators shared via HQ-assigned campaigns. HQ's copy wins for
  // any id both accounts happen to have (the seeded roster starts with the
  // same ids everywhere) — otherwise a member would see their own stale
  // local copy instead of the deliverable/status HQ actually set.
  const creators = useMemo(() => {
    const sharedIds = new Set(sharedCreators.map((c) => c.id));
    return [
      ...ownCreators.filter((c) => !sharedIds.has(c.id)),
      ...sharedCreators,
    ];
  }, [ownCreators, sharedCreators]);

  // Without an active campaign "assigned only" has nothing to scope to, so
  // fall back to the full directory rather than showing an empty list.
  const scoping = assignedOnly && !!active;

  const filtered = useMemo(
    () =>
      creators.filter((c) => {
        if (
          q &&
          !`${c.name} ${c.handle} ${c.city}`
            .toLowerCase()
            .includes(q.toLowerCase())
        )
          return false;
        if (platform !== "All" && c.platform !== platform) return false;
        if (tier !== "All" && c.tier !== tier) return false;
        if (status !== "All" && c.status !== status) return false;
        if (scoping && !isAssigned(c.id)) return false;
        return true;
      }),
    [creators, q, platform, tier, status, scoping, assignedIds],
  );

  const assignedList = creators.filter((c) => assignedIds.includes(c.id));
  const selected = selectedId
    ? (creators.find((c) => c.id === selectedId) ?? null)
    : null;

  // Creators shared in via an HQ-assigned campaign live in HQ's account, not
  // this one — edits have to go back through pushCreatorEdit (server-side
  // campaign-edit-access check), not the local update("creators", ...).
  function patchCreator(id: string, patch: Partial<Creator>) {
    if (isSharedCreator(id)) {
      if (!canEditSharedCreator(id)) return; // view-only, mirrors updateActiveLinks
      const current = creators.find((c) => c.id === id);
      if (!current) return;
      pushCreatorEdit({ ...current, ...patch });
      return;
    }
    update("creators", (cur) =>
      cur.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  }

  function addCreator(input: Omit<Creator, "id" | "status">) {
    const created: Creator = { ...input, id: uid("cr"), status: "Pending" };
    update("creators", (cur) => [created, ...cur]);
    setAddOpen(false);
    setSelectedId(created.id);
  }

  function removeCreator(id: string) {
    if (isSharedCreator(id)) return; // HQ-owned record — remove from HQ's own account instead
    update("creators", (cur) => cur.filter((c) => c.id !== id));
    setSelectedId(null);
  }

  return (
    <AppShell>
      {/* ── Page header ─────────────────────────────────────── */}
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
            Creators · {pageTab === "roster" ? "Directory & List Builder" : "Sound Audit"}
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold">
            {pageTab === "roster" ? (
              <>Build your <span className="text-gradient-neon">campaign list</span></>
            ) : (
              <>Sound <span className="text-gradient-neon">audit</span></>
            )}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {pageTab === "roster"
              ? scoping
                ? `Showing ${filtered.length} creator${filtered.length !== 1 ? "s" : ""} assigned to ${active ? active.artist + " — " + active.title : "this campaign"}.`
                : `${filtered.length} shown · pick creators for ${active ? active.artist : "your campaign"} using the checkboxes.`
              : "Paste a TikTok sound URL to audit every creator who used it."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tab switcher */}
          <div className="glass flex rounded-full p-1">
            {(["roster", "audit"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setPageTab(tab)}
                className={`relative flex items-center gap-1.5 rounded-full px-4 py-2 text-xs capitalize transition-colors ${pageTab === tab ? "text-white" : "text-muted-foreground hover:text-white"}`}
              >
                {pageTab === tab && (
                  <motion.div
                    layoutId="page-tab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)]/40 to-[oklch(0.5_0.3_300)]/40 border border-[oklch(0.7_0.28_328)]/40"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  {tab === "roster" ? <Users className="h-3.5 w-3.5" /> : <BarChart2 className="h-3.5 w-3.5" />}
                  {tab === "roster" ? "Roster" : "Sound Audit"}
                </span>
              </button>
            ))}
          </div>

          {pageTab === "roster" && (
            <>
              <div className="glass rounded-2xl px-5 py-3 text-center">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  On {active ? active.title : "campaign"}
                </div>
                <div className="font-display text-2xl font-bold">{assignedList.length}</div>
                <div className="text-[11px] text-muted-foreground">creators</div>
              </div>
              <MagneticButton variant="ghost" onClick={() => exportCreatorsCsv(filtered, assignedIds, active?.title)}>
                <Download className="h-4 w-4" /> Export CSV
              </MagneticButton>
              <MagneticButton onClick={() => setAddOpen(true)}>
                <Plus className="h-4 w-4" /> Add creator
              </MagneticButton>
            </>
          )}
        </div>
      </header>

      {/* ── Roster tab ──────────────────────────────────────── */}
      {pageTab === "roster" && (
        <>
          <SpotlightCard className="mt-6 p-5" spotlight={false}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search creators, handles, cities…"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-white/40"
                />
              </div>
              <FilterGroup
                label="Platform"
                value={platform}
                options={platforms}
                onChange={(v) => setPlatform(v as Platform | "All")}
              />
              <button
                onClick={() => setAssignedOnly((o) => !o)}
                disabled={!active}
                title={!active ? "Create/select a campaign to scope this list" : undefined}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${scoping ? "border-white bg-white text-black" : "border-white/15 text-muted-foreground hover:text-white"}`}
              >
                {scoping ? "Showing assigned only · Browse full directory" : "Browsing full directory"}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <FilterGroup label="Tier" value={tier} options={tiers} onChange={(v) => setTier(v as Tier | "All")} />
              <FilterGroup label="Status" value={status} options={statuses} onChange={(v) => setStatus(v as Status | "All")} />
            </div>
          </SpotlightCard>

          {filtered.length === 0 ? (
            <SpotlightCard className="mt-6 p-10 text-center" spotlight={false}>
              <div className="text-sm text-muted-foreground">
                {scoping ? "No creators assigned to this campaign yet." : "No creators match these filters."}
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {scoping && (
                  <MagneticButton variant="ghost" onClick={() => setAssignedOnly(false)}>
                    Browse full directory
                  </MagneticButton>
                )}
                <MagneticButton variant="ghost" onClick={() => setAddOpen(true)}>
                  <Plus className="h-4 w-4" /> Add a creator
                </MagneticButton>
              </div>
            </SpotlightCard>
          ) : (
            <CreatorsList filtered={filtered} onSelect={setSelectedId} />
          )}

          {!scoping && assignedList.length > 0 && (
            <SpotlightCard className="mt-4 p-5" spotlight={false}>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Campaign List · {active?.artist}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {assignedList.map((c) => (
                  <span key={c.id} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs">
                    {c.name} · {c.handle}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          )}
        </>
      )}

      {/* ── Sound Audit tab ─────────────────────────────────── */}
      {pageTab === "audit" && (
        <SoundAuditTab addCreator={addCreator} />
      )}

      <AnimatePresence>
        {selected && (
          <CreatorModal
            creator={selected}
            shared={isSharedCreator(selected.id)}
            readOnly={isSharedCreator(selected.id) && !canEditSharedCreator(selected.id)}
            onClose={() => setSelectedId(null)}
            onUpdate={(patch) => patchCreator(selected.id, patch)}
            onRemove={isSharedCreator(selected.id) ? undefined : () => removeCreator(selected.id)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {addOpen && (
          <AddCreatorModal onClose={() => setAddOpen(false)} onSave={addCreator} />
        )}
      </AnimatePresence>
    </AppShell>
  );
}

function CreatorsList({
  filtered,
  onSelect,
}: {
  filtered: Creator[];
  onSelect: (id: string) => void;
}) {
  const { isAssigned, toggleAssignment, active } = useCampaigns();
  return (
    <div className="mt-6 grid grid-cols-1 gap-3">
      <div className="hidden lg:grid grid-cols-[auto_2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <div>Add</div>
        <div>Creator</div>
        <div>Platform</div>
        <div>Tier</div>
        <div>Followers</div>
        <div>Engagement</div>
        <div>Status</div>
      </div>
      {filtered.map((c, i) => {
        const on = isAssigned(c.id);
        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`glass grid grid-cols-[auto_1fr] lg:grid-cols-[auto_2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 rounded-2xl p-4 text-left transition-colors ${on ? "border-[oklch(0.82_0.18_150)]/40" : "hover:border-white/25"}`}
          >
            <button
              onClick={() => toggleAssignment(c.id)}
              disabled={!active}
              title={
                !active
                  ? "Create/select a campaign first"
                  : on
                    ? "Remove from campaign list"
                    : "Add to campaign list"
              }
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${on ? "border-[oklch(0.82_0.18_150)] bg-[oklch(0.82_0.18_150)]" : "border-white/25 hover:border-white"}`}
            >
              {on && <Check className="h-4 w-4 text-black" />}
            </button>
            <button
              onClick={() => onSelect(c.id)}
              className="col-span-1 lg:col-span-1 flex items-center gap-3 min-w-0 text-left"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.28_328)]/60 to-[oklch(0.5_0.3_300)]/60 font-display font-bold">
                {c.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-medium">{c.name}</span>
                  {on && (
                    <span
                      title="Assigned to active campaign"
                      className="shrink-0 rounded-full bg-[oklch(0.85_0.18_150)]/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[oklch(0.85_0.18_150)]"
                    >
                      On campaign
                    </span>
                  )}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {c.handle} · {c.city}
                </div>
              </div>
            </button>
            <PlatformBadge platform={c.platform} />
            <TierBadge tier={c.tier} />
            <div className="font-mono text-sm">{formatK(c.followers)}</div>
            <div className="font-mono text-sm text-[oklch(0.85_0.18_200)]">
              {c.engagement}%
            </div>
            <StatusPill status={c.status} />
          </motion.div>
        );
      })}
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="glass flex rounded-full p-1">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`relative rounded-full px-3 py-1 text-xs transition-colors ${value === o ? "text-white" : "text-muted-foreground hover:text-white"}`}
          >
            {value === o && (
              <motion.div
                layoutId={`f-${label}`}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)]/40 to-[oklch(0.5_0.3_300)]/40 border border-[oklch(0.7_0.28_328)]/40"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
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
  const { icon: Icon, color } = map[platform] ?? {
    icon: Music2,
    color: platformColors[platform],
  };
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
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${map[tier]}`}
    >
      {tier}
    </span>
  );
}

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Confirmed: "bg-[oklch(0.85_0.18_200)]/15 text-[oklch(0.85_0.18_200)]",
    Pending: "bg-white/5 text-muted-foreground",
    Priced: "bg-[oklch(0.7_0.28_328)]/15 text-[oklch(0.85_0.25_328)]",
    Rejected: "bg-destructive/15 text-destructive",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${map[status]}`}
    >
      {status}
    </span>
  );
}

function formatK(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return `${n}`;
}

function CreatorModal({
  creator,
  shared,
  readOnly,
  onClose,
  onUpdate,
  onRemove,
}: {
  creator: Creator;
  /** assigned in via an HQ campaign, not owned by this account */
  shared?: boolean;
  /** shared, and this account has no edit access to the campaign it's on */
  readOnly?: boolean;
  onClose: () => void;
  onUpdate: (patch: Partial<Creator>) => void;
  onRemove?: () => void;
}) {
  const { active, isAssigned, toggleAssignment } = useCampaigns();
  const assigned = isAssigned(creator.id);

  const [linkDraft, setLinkDraft] = useState(creator.deliverableUrl ?? "");
  const [livePostDraft, setLivePostDraft] = useState(creator.livePostUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [msgDraft, setMsgDraft] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Keep the draft fields in sync if the selected creator changes.
  useEffect(() => {
    setLinkDraft(creator.deliverableUrl ?? "");
    setLivePostDraft(creator.livePostUrl ?? "");
    setUploadError(null);
  }, [creator.id]);

  // Resolve an actual playable preview URL for an uploaded deliverable
  // (Storage paths aren't directly viewable — they need a signed URL).
  // Re-runs whenever a new file finishes uploading, since onUpdate() swaps
  // in a fresh deliverablePath and re-renders this modal with it.
  useEffect(() => {
    let cancelled = false;
    if (!creator.deliverablePath) {
      setPreviewUrl(null);
      return;
    }
    setPreviewLoading(true);
    signedUrl("art", creator.deliverablePath)
      .then((url) => {
        if (!cancelled) setPreviewUrl(url);
      })
      .catch(() => {
        if (!cancelled) setPreviewUrl(null);
      })
      .finally(() => {
        if (!cancelled) setPreviewLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [creator.deliverablePath]);

  const linkDirty = linkDraft.trim() !== (creator.deliverableUrl ?? "");
  const livePostDirty = livePostDraft.trim() !== (creator.livePostUrl ?? "");

  async function saveLink() {
    onUpdate({ deliverableUrl: linkDraft.trim() || undefined });
  }
  async function saveLivePost() {
    onUpdate({ livePostUrl: livePostDraft.trim() || undefined });
  }

  async function onPickFile(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!cloudEnabled) {
      setUploadError(
        "Connect Supabase (Settings) to upload files — paste the video's link above instead.",
      );
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const path = await uploadToBucket("art", file);
      if (!path) {
        setUploadError("Upload failed — sign in and try again.");
        return;
      }
      onUpdate({ deliverablePath: path, deliverableFileName: file.name });
    } catch (e: unknown) {
      setUploadError(e instanceof Error ? e.message : String(e));
    } finally {
      setUploading(false);
    }
  }

  async function openUploaded() {
    if (!creator.deliverablePath) return;
    setPreviewing(true);
    try {
      const url = await signedUrl("art", creator.deliverablePath);
      if (url) window.open(url, "_blank", "noopener,noreferrer");
      else setUploadError("Couldn't generate a preview link.");
    } finally {
      setPreviewing(false);
    }
  }

  function sendMessage() {
    const text = msgDraft.trim();
    if (!text) return;
    onUpdate({
      messages: [
        ...(creator.messages ?? []),
        {
          id: uid("msg"),
          from: "manager" as const,
          text,
          time: new Date().toLocaleString([], {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    });
    setMsgDraft("");
  }

  return (
    <Portal>
      <motion.div
        className="fixed inset-0 z-[100] flex items-stretch justify-end p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="glass-strong relative flex w-full max-w-md flex-col gap-6 overflow-y-auto rounded-2xl p-6"
        >
          <button
            onClick={onClose}
            className="glass absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)] font-display text-2xl font-bold shadow-[0_0_32px_rgba(232,121,249,0.5)]">
              {creator.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="font-display text-xl font-bold">
                {creator.name}
              </div>
              <div className="text-sm text-muted-foreground">
                {creator.handle} · {creator.city}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <TierBadge tier={creator.tier} />
                <StatusPill status={creator.status} />
                {shared && (
                  <span
                    title={
                      readOnly
                        ? "Assigned by HQ — you have view-only access"
                        : "Assigned by HQ — you can edit this"
                    }
                    className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] uppercase tracking-widest text-muted-foreground"
                  >
                    {readOnly ? "View only" : "Shared · editable"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Stat
              icon={Users}
              label="Followers"
              value={formatK(creator.followers)}
            />
            <Stat
              icon={Eye}
              label="Avg Views"
              value={formatK(creator.avgViews)}
            />
            <Stat
              icon={Heart}
              label="Engagement"
              value={`${creator.engagement}%`}
            />
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Deliverable
              </div>
              {creator.deliverableFileName && (
                <span className="truncate text-[10px] text-muted-foreground">
                  {creator.deliverableFileName}
                </span>
              )}
            </div>

            <div className="mt-3">
              {supportsDeviceFrame(creator.platform) ? (
                <DeviceFramePreview
                  platform={creator.platform}
                  previewUrl={previewUrl}
                  name={creator.name}
                  handle={creator.handle}
                  loading={uploading || previewLoading}
                />
              ) : (
                <div className="aspect-[9/16] w-40 mx-auto rounded-lg bg-gradient-to-br from-[oklch(0.15_0.05_320)] to-black relative overflow-hidden border border-white/10">
                  {previewUrl ? (
                    <video
                      key={previewUrl}
                      src={previewUrl}
                      controls
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="text-center">
                          {uploading || previewLoading ? (
                            <Loader2 className="h-8 w-8 mx-auto animate-spin text-[oklch(0.7_0.28_328)]" />
                          ) : (
                            <Music2 className="h-8 w-8 mx-auto text-[oklch(0.7_0.28_328)]" />
                          )}
                          <div className="mt-2 text-xs text-muted-foreground">
                            {uploading ? (
                              "Uploading…"
                            ) : previewLoading ? (
                              "Loading preview…"
                            ) : (
                              <>
                                {creator.platform} spec ·<br />
                                15s vertical
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 text-[10px] text-white/60">
                        {creator.handle}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={linkDraft}
                onChange={(e) => setLinkDraft(e.target.value)}
                placeholder="Paste the TikTok/Instagram video link"
                disabled={readOnly}
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs outline-none focus:border-white/40 disabled:opacity-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveLink();
                }}
              />
              <button
                onClick={saveLink}
                disabled={!linkDirty || readOnly}
                className="shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black disabled:opacity-30"
              >
                Save
              </button>
            </div>

            {creator.deliverableUrl && (
              <a
                href={creator.deliverableUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1.5 text-xs text-[oklch(0.85_0.18_200)] hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Open linked video
              </a>
            )}

            <div className="mt-3 flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="video/*,.mp4,.mov"
                className="hidden"
                onChange={(e) => {
                  onPickFile(e.target.files);
                  e.target.value = "";
                }}
              />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading || readOnly}
                className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] hover:bg-white/5 disabled:opacity-50"
              >
                {uploading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Upload className="h-3.5 w-3.5" />
                )}
                {uploading ? "Uploading…" : "Upload video file"}
              </button>
              {creator.deliverablePath && (
                <button
                  onClick={openUploaded}
                  disabled={previewing}
                  className="text-[11px] text-[oklch(0.85_0.18_200)] hover:underline disabled:opacity-50"
                >
                  {previewing ? "Opening…" : "Open full-screen ↗"}
                </button>
              )}
            </div>
            {uploadError && (
              <div className="mt-2 text-[11px] text-destructive">
                {uploadError}
              </div>
            )}
            {!cloudEnabled && (
              <div className="mt-2 text-[11px] text-muted-foreground">
                File uploads need Supabase configured — the link field above
                always works.
              </div>
            )}
          </div>

          <div className="glass rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Live post — approved vs. actually posted
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Once this is live and public, paste the real TikTok/Instagram
              post URL to pull a real embedded preview here — compare it
              against what was approved above.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Link2 className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={livePostDraft}
                onChange={(e) => setLivePostDraft(e.target.value)}
                placeholder="Paste the LIVE TikTok/Instagram post URL"
                disabled={readOnly}
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs outline-none focus:border-white/40 disabled:opacity-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveLivePost();
                }}
              />
              <button
                onClick={saveLivePost}
                disabled={!livePostDirty || readOnly}
                className="shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black disabled:opacity-30"
              >
                Save
              </button>
            </div>
            {creator.livePostUrl && (
              <div className="mt-3">
                <LiveEmbedCard url={creator.livePostUrl} />
              </div>
            )}
          </div>

          <div className="glass rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Campaign assignment
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {active ? (
                <>
                  Active:{" "}
                  <span className="text-foreground">
                    {active.artist} — {active.title}
                  </span>
                </>
              ) : (
                "No active campaign. Create one first."
              )}
            </div>
            <button
              disabled={!active}
              onClick={() => toggleAssignment(creator.id)}
              className={`mt-3 w-full rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 ${assigned ? "bg-[oklch(0.85_0.18_150)]/20 text-[oklch(0.85_0.18_150)]" : "bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)] text-white"}`}
            >
              {assigned
                ? "✓ Assigned — remove from campaign"
                : "+ Assign to active campaign"}
            </button>
          </div>

          <div className="flex gap-3">
            <MagneticButton
              variant="primary"
              onClick={() => onUpdate({ status: "Confirmed" })}
              className={readOnly ? "pointer-events-none opacity-40" : ""}
            >
              Approve
            </MagneticButton>
            <MagneticButton
              variant="danger"
              onClick={() => onUpdate({ status: "Rejected" })}
              className={readOnly ? "pointer-events-none opacity-40" : ""}
            >
              Reject
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => setShowComposer((v) => !v)}
            >
              Message
            </MagneticButton>
          </div>

          {showComposer && (
            <div className="glass rounded-xl p-4">
              {creator.messages && creator.messages.length > 0 && (
                <div className="mb-3 max-h-40 space-y-2 overflow-y-auto pr-1">
                  {creator.messages.map((m) => (
                    <div
                      key={m.id}
                      className="rounded-lg bg-white/[0.04] px-3 py-2"
                    >
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>
                          {m.from === "manager" ? "You" : creator.name}
                        </span>
                        <span>{m.time}</span>
                      </div>
                      <div className="mt-1 text-xs text-foreground/90">
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <input
                  value={msgDraft}
                  onChange={(e) => setMsgDraft(e.target.value)}
                  placeholder={`Message ${creator.name}…`}
                  disabled={readOnly}
                  className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs outline-none focus:border-white/40 disabled:opacity-50"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!msgDraft.trim() || readOnly}
                  className="shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black disabled:opacity-30"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-1.5 text-[10px] text-muted-foreground">
                Saved to this creator's record — not sent off-platform yet.
              </div>
            </div>
          )}

          {onRemove ? (
            <button
              onClick={onRemove}
              className="flex items-center justify-center gap-1.5 rounded-full border border-destructive/30 px-4 py-2 text-xs text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" /> Remove creator
            </button>
          ) : (
            <div className="text-center text-[11px] text-muted-foreground">
              This creator record belongs to HQ's account — remove it from
              there.
            </div>
          )}
        </motion.div>
      </motion.div>
    </Portal>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="glass rounded-xl p-3">
      <Icon className="h-3.5 w-3.5 text-[oklch(0.7_0.28_328)]" />
      <div className="mt-2 font-display text-lg font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function AddCreatorModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (c: Omit<Creator, "id" | "status">) => void;
}) {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState<Platform>("TikTok");
  const [tier, setTier] = useState<Tier>("Micro");
  const [city, setCity] = useState("Cairo");
  const [followers, setFollowers] = useState("");
  const [avgViews, setAvgViews] = useState("");
  const [engagement, setEngagement] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit() {
    if (!name.trim() || !handle.trim()) {
      setError("Name and handle are required.");
      return;
    }
    onSave({
      name: name.trim(),
      handle: handle.trim().startsWith("@")
        ? handle.trim()
        : `@${handle.trim()}`,
      platform,
      tier,
      city: city.trim() || "Cairo",
      followers: Number(followers) || 0,
      avgViews: Number(avgViews) || 0,
      engagement: Number(engagement) || 0,
      price: 0,
    });
  }

  return (
    <Portal>
      <motion.div
        className="fixed inset-0 z-[110] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong w-full max-w-lg rounded-2xl p-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Add a creator</h2>
            <button
              onClick={onClose}
              className="glass grid h-8 w-8 place-items-center rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field
              label="Name"
              value={name}
              onChange={setName}
              placeholder="Creator name"
            />
            <Field
              label="Handle"
              value={handle}
              onChange={setHandle}
              placeholder="@handle"
            />
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
              >
                {addPlatforms.map((p) => (
                  <option key={p} value={p} className="bg-[#0a0a0c]">
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Tier
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as Tier)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
              >
                {addTiers.map((t) => (
                  <option key={t} value={t} className="bg-[#0a0a0c]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="City"
              value={city}
              onChange={setCity}
              placeholder="Cairo"
            />
            <Field
              label="Followers"
              value={followers}
              onChange={setFollowers}
              placeholder="0"
              numeric
            />
            <Field
              label="Avg views"
              value={avgViews}
              onChange={setAvgViews}
              placeholder="0"
              numeric
            />
            <Field
              label="Engagement %"
              value={engagement}
              onChange={setEngagement}
              placeholder="0"
              numeric
            />
          </div>

          {error && (
            <div className="mt-3 text-xs text-destructive">{error}</div>
          )}

          <div className="mt-5 flex justify-end gap-3">
            <MagneticButton variant="ghost" onClick={onClose}>
              Cancel
            </MagneticButton>
            <MagneticButton variant="primary" onClick={submit}>
              Add creator
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </Portal>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  numeric,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  numeric?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={numeric ? "numeric" : undefined}
        className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
      />
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface AuditRecord {
  video_id: string;
  username: string;
  nickname: string;
  followers: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  video_url: string;
  posted_at: string;
}

interface AuditResult {
  total_scraped: number;
  qualified: AuditRecord[];
  got_views: AuditRecord[];
  good_views: AuditRecord[];
  low_views: AuditRecord[];
  no_views: AuditRecord[];
  next_campaign: AuditRecord[];
}

type AuditSegment = "all" | "got_views" | "good_views" | "low_views" | "no_views" | "next_campaign";

type AuditState =
  | { phase: "idle" }
  | { phase: "running"; scroll: number; captured: number; message: string }
  | { phase: "done"; result: AuditResult }
  | { phase: "error"; message: string };

// ── SoundAuditTab ─────────────────────────────────────────────────────────────

function SoundAuditTab({ addCreator }: { addCreator: (c: Omit<Creator, "id" | "status">) => void }) {
  const [soundUrl, setSoundUrl] = useState("");
  const [auditState, setAuditState] = useState<AuditState>({ phase: "idle" });
  const [segment, setSegment] = useState<AuditSegment>("all");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const esRef = useRef<EventSource | null>(null);

  function runAudit() {
    if (!soundUrl.trim()) return;
    if (esRef.current) {
      esRef.current.close();
    }

    setAuditState({ phase: "running", scroll: 0, captured: 0, message: "Connecting to scraper…" });
    setAddedIds(new Set());
    setSegment("all");

    const url = `${AUDIT_API}/audit/stream?url=${encodeURIComponent(soundUrl.trim())}`;
    const es = new EventSource(url);
    esRef.current = es;

    es.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data) as
          | { type: "progress"; scroll: number; captured: number; message: string }
          | { type: "done"; data: AuditResult }
          | { type: "error"; message: string };

        if (event.type === "progress") {
          setAuditState({ phase: "running", scroll: event.scroll, captured: event.captured, message: event.message });
        } else if (event.type === "done") {
          setAuditState({ phase: "done", result: event.data });
          es.close();
        } else if (event.type === "error") {
          setAuditState({ phase: "error", message: event.message });
          es.close();
        }
      } catch {
        // ignore parse errors
      }
    };

    es.onerror = () => {
      if (auditState.phase === "running") {
        setAuditState({ phase: "error", message: "Lost connection to the audit API. Is the server running?" });
      }
      es.close();
    };
  }

  function stopAudit() {
    esRef.current?.close();
    setAuditState({ phase: "idle" });
  }

  useEffect(() => () => { esRef.current?.close(); }, []);

  function handleAddToRoster(rec: AuditRecord) {
    const tier: Tier =
      rec.followers >= 1_000_000 ? "Mega"
      : rec.followers >= 500_000  ? "Macro"
      : rec.followers >= 100_000  ? "Mid"
      : "Micro";

    addCreator({
      name: rec.nickname || rec.username,
      handle: `@${rec.username}`,
      platform: "TikTok",
      tier,
      city: "",
      followers: rec.followers,
      avgViews: rec.views,
      engagement: rec.views > 0 && rec.followers > 0
        ? Math.round((rec.likes / rec.views) * 100 * 10) / 10
        : 0,
      price: 0,
      deliverableUrl: rec.video_url || undefined,
    });
    setAddedIds((s) => new Set([...s, rec.video_id]));
  }

  const segmentTabs: { key: AuditSegment; label: string; icon: any; color: string }[] = [
    { key: "all",           label: "All Qualified", icon: Users,        color: "text-white" },
    { key: "got_views",     label: "Got Views",     icon: Zap,          color: "text-emerald-400" },
    { key: "good_views",    label: "Good Views",    icon: TrendingUp,   color: "text-green-400" },
    { key: "low_views",     label: "Low Views",     icon: TrendingDown, color: "text-yellow-400" },
    { key: "no_views",      label: "No Views",      icon: AlertCircle,  color: "text-red-400" },
    { key: "next_campaign", label: "Next Campaign", icon: Star,         color: "text-[oklch(0.85_0.25_328)]" },
  ];

  function getRecords(result: AuditResult): AuditRecord[] {
    if (segment === "all") return result.qualified;
    return result[segment];
  }

  return (
    <div className="mt-6 space-y-5">
      {/* URL input card */}
      <SpotlightCard className="p-5" spotlight={false}>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
          TikTok Sound URL
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Music2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={soundUrl}
              onChange={(e) => setSoundUrl(e.target.value)}
              placeholder="https://www.tiktok.com/music/original-sound-..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-white/40"
              onKeyDown={(e) => { if (e.key === "Enter") runAudit(); }}
              disabled={auditState.phase === "running"}
            />
          </div>
          {auditState.phase === "running" ? (
            <MagneticButton variant="danger" onClick={stopAudit}>
              <X className="h-4 w-4" /> Stop
            </MagneticButton>
          ) : (
            <MagneticButton
              variant="primary"
              onClick={runAudit}
              className={!soundUrl.trim() ? "opacity-40 pointer-events-none" : ""}
            >
              <Activity className="h-4 w-4" /> Run Audit
            </MagneticButton>
          )}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Make sure the audit API is running locally:{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px]">
            bash ~/rippl-audit-api/start.sh
          </code>
        </p>
      </SpotlightCard>

      {/* Running state */}
      {auditState.phase === "running" && (
        <SpotlightCard className="p-6" spotlight={false}>
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0">
              <RefreshCw className="h-12 w-12 animate-spin text-[oklch(0.7_0.28_328)] opacity-20" />
              <Activity className="absolute inset-0 m-auto h-5 w-5 text-[oklch(0.7_0.28_328)]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{auditState.message}</div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)]"
                  initial={{ width: "5%" }}
                  animate={{ width: `${Math.min(5 + auditState.scroll * 1.2, 90)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="mt-1 flex gap-4 text-[11px] text-muted-foreground">
                <span>Scroll #{auditState.scroll}</span>
                <span>{auditState.captured.toLocaleString()} videos captured</span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      )}

      {/* Error state */}
      {auditState.phase === "error" && (
        <SpotlightCard className="p-5 border-red-500/20" spotlight={false}>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
            <div>
              <div className="font-medium text-sm text-red-400">Audit failed</div>
              <div className="mt-1 text-xs text-muted-foreground">{auditState.message}</div>
              <button
                onClick={() => setAuditState({ phase: "idle" })}
                className="mt-3 text-xs text-white/60 hover:text-white underline"
              >
                Try again
              </button>
            </div>
          </div>
        </SpotlightCard>
      )}

      {/* Results */}
      {auditState.phase === "done" && (
        <>
          {/* Stat tiles */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { label: "Scraped",      value: auditState.result.total_scraped,         color: "from-white/5 to-white/10",                        textColor: "text-white" },
              { label: "100k+",        value: auditState.result.qualified.length,       color: "from-white/5 to-white/10",                        textColor: "text-white" },
              { label: "Got Views",    value: auditState.result.got_views.length,       color: "from-emerald-500/10 to-emerald-500/5",            textColor: "text-emerald-400" },
              { label: "Good Views",   value: auditState.result.good_views.length,      color: "from-green-500/10 to-green-500/5",                textColor: "text-green-400" },
              { label: "No Views",     value: auditState.result.no_views.length,        color: "from-red-500/10 to-red-500/5",                    textColor: "text-red-400" },
              { label: "Next Campaign",value: auditState.result.next_campaign.length,   color: "from-[oklch(0.7_0.28_328)]/15 to-[oklch(0.7_0.28_328)]/5", textColor: "text-[oklch(0.85_0.25_328)]" },
            ].map(({ label, value, color, textColor }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`glass rounded-2xl bg-gradient-to-br ${color} p-4`}
              >
                <div className={`font-display text-2xl font-bold ${textColor}`}>
                  {value.toLocaleString()}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Segment tabs */}
          <div className="glass flex flex-wrap gap-1 rounded-2xl p-1.5">
            {segmentTabs.map(({ key, label, icon: Icon, color }) => {
              const count = key === "all"
                ? auditState.result.qualified.length
                : auditState.result[key].length;
              return (
                <button
                  key={key}
                  onClick={() => setSegment(key)}
                  className={`relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs transition-colors ${segment === key ? "text-white" : "text-muted-foreground hover:text-white"}`}
                >
                  {segment === key && (
                    <motion.div
                      layoutId="audit-seg"
                      className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/15"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`relative h-3.5 w-3.5 ${color}`} />
                  <span className="relative">{label}</span>
                  <span className={`relative rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-mono ${color}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Creator table */}
          <AuditTable
            records={getRecords(auditState.result)}
            segment={segment}
            addedIds={addedIds}
            onAdd={handleAddToRoster}
          />
        </>
      )}

      {/* Idle — no audit yet */}
      {auditState.phase === "idle" && (
        <SpotlightCard className="p-12 text-center" spotlight={false}>
          <BarChart2 className="mx-auto h-10 w-10 text-white/10" />
          <div className="mt-4 text-sm text-muted-foreground">
            Paste a TikTok sound URL above and hit <strong className="text-white">Run Audit</strong> to see every creator who used that sound — filtered to 100k+ followers and segmented by performance.
          </div>
        </SpotlightCard>
      )}
    </div>
  );
}

function AuditTable({
  records,
  segment,
  addedIds,
  onAdd,
}: {
  records: AuditRecord[];
  segment: AuditSegment;
  addedIds: Set<string>;
  onAdd: (r: AuditRecord) => void;
}) {
  const segmentColor: Record<AuditSegment, string> = {
    all:           "text-white",
    got_views:     "text-emerald-400",
    good_views:    "text-green-400",
    low_views:     "text-yellow-400",
    no_views:      "text-red-400",
    next_campaign: "text-[oklch(0.85_0.25_328)]",
  };
  const segmentBg: Record<AuditSegment, string> = {
    all:           "",
    got_views:     "bg-emerald-500/[0.04]",
    good_views:    "bg-green-500/[0.04]",
    low_views:     "bg-yellow-500/[0.04]",
    no_views:      "bg-red-500/[0.04]",
    next_campaign: "bg-[oklch(0.7_0.28_328)]/[0.04]",
  };

  if (records.length === 0) {
    return (
      <SpotlightCard className="p-10 text-center" spotlight={false}>
        <div className="text-sm text-muted-foreground">No creators in this segment.</div>
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard className={`overflow-hidden p-0 ${segmentBg[segment]}`} spotlight={false}>
      {/* Table header */}
      <div className="hidden lg:grid grid-cols-[2rem_2fr_1.2fr_1.2fr_1fr_1fr_1fr_8rem] items-center gap-3 border-b border-white/[0.06] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <div>#</div>
        <div>Creator</div>
        <div>Followers</div>
        <div>Views</div>
        <div>Likes</div>
        <div>Posted</div>
        <div>Status</div>
        <div />
      </div>

      <div className="divide-y divide-white/[0.04]">
        {records.map((rec, i) => {
          const statusLabel =
            rec.views >= 100_000  ? { text: "Got Views",  cls: "bg-emerald-500/15 text-emerald-400" }
            : rec.views >= 10_000 ? { text: "Good Views", cls: "bg-green-500/15 text-green-400" }
            : rec.views >= 1_000  ? { text: "Low Views",  cls: "bg-yellow-500/15 text-yellow-400" }
            : rec.views > 0       ? { text: "Minimal",    cls: "bg-orange-500/15 text-orange-400" }
            :                       { text: "No Views",   cls: "bg-red-500/15 text-red-400" };

          const added = addedIds.has(rec.video_id);

          return (
            <motion.div
              key={rec.video_id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.015, 0.3) }}
              className="grid grid-cols-[2rem_1fr_auto] lg:grid-cols-[2rem_2fr_1.2fr_1.2fr_1fr_1fr_1fr_8rem] items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="font-mono text-[11px] text-muted-foreground">{i + 1}</div>

              <div className="flex items-center gap-3 min-w-0">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.28_328)]/50 to-[oklch(0.5_0.3_300)]/50 font-display font-bold text-sm">
                  {(rec.nickname || rec.username).charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{rec.nickname || rec.username}</div>
                  <a
                    href={rec.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-white transition-colors"
                  >
                    @{rec.username}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="font-mono text-sm">{formatK(rec.followers)}</div>
              <div className={`font-mono text-sm font-medium ${segmentColor[segment]}`}>{formatK(rec.views)}</div>
              <div className="font-mono text-sm text-muted-foreground">{formatK(rec.likes)}</div>
              <div className="text-xs text-muted-foreground">{rec.posted_at}</div>

              <span className={`hidden lg:inline-block rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium ${statusLabel.cls}`}>
                {statusLabel.text}
              </span>

              <button
                onClick={() => !added && onAdd(rec)}
                disabled={added}
                className={`flex items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all ${
                  added
                    ? "bg-[oklch(0.85_0.18_150)]/15 text-[oklch(0.85_0.18_150)] cursor-default"
                    : "bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)] text-white hover:opacity-90"
                }`}
              >
                {added ? (
                  <><Check className="h-3 w-3" /> Added</>
                ) : (
                  <><Plus className="h-3 w-3" /> Roster</>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </SpotlightCard>
  );
}
