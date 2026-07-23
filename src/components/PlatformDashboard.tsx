import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { SharedBadge } from "@/components/SharedBadge";
import { useCampaigns, type UploadedAsset } from "@/lib/campaign-store";
import { useRole } from "@/lib/role-context";
import { campaignBriefPdf } from "@/lib/pdf";
import { useOS } from "@/lib/os-store";
import {
  Flame,
  Clapperboard,
  FileDown,
  Video,
  Link2,
  PlugZap,
} from "lucide-react";

/* Platform-specific dashboards — one shared shell, each route supplies a
   PlatformConfig (display-only: name/icon/colors) plus a `panel` describing
   whatever real data it managed to fetch. This used to run entirely on a
   seeded PRNG (deterministic fake numbers dressed up as "campaign
   analytics") — reset per the plan to make this real: no source, no
   number. Each route now does its own live fetch (YouTube Data API,
   Soundcharts, Meta Graph API — see platform-live.ts / youtube-api.ts) and
   passes the result in; this component only renders it. */

type IconT = ComponentType<{ className?: string }>;

export interface PlatformStat {
  icon: IconT;
  label: string;
  value: string;
  hint: string;
  priceGated?: boolean;
}
export interface PlatformConfig {
  name: string; // "TikTok"
  icon: IconT;
  accent: string; // oklch color for eyebrow/organic line
  paidLabel: string; // "Spark Ads" / "Boosted" / "Paid" — kept for copy, no fake numbers attached
  panelTitle: string; // "Sound Performance" / "Reels Performance" …
  panelIcon: IconT;
  subtitle: string;
}

/** What a route's live-data fetch produced. `views`, when present, drives
 *  the "progress toward goal" bar with a REAL number for this platform. */
export interface PlatformPanelState {
  loading: boolean;
  connected: boolean;
  /** why it's not connected — shown verbatim in the "connect" card */
  reason?: string;
  stats?: PlatformStat[];
  views?: number;
  /** a source page to link to from the "connect" card, if any (e.g. Settings) */
  helpHref?: string;
}

/** Lets HQ paste/change the campaign's link for this platform (e.g. the
 *  YouTube video URL or TikTok sound URL) directly inside the panel, right
 *  where the "not connected" message is — not bolted on elsewhere on the
 *  page where it's easy to miss. */
export interface PlatformLinkEditor {
  value: string;
  placeholder: string;
  onSave: (value: string) => void;
}

export const fmt = (n: number) =>
  n >= 1e6
    ? `${(n / 1e6).toFixed(1)}M`
    : n >= 1e3
      ? `${(n / 1e3).toFixed(1)}K`
      : `${Math.round(n)}`;

export function PlatformDashboard({
  cfg,
  panel,
  linkEditor,
  extra,
}: {
  cfg: PlatformConfig;
  panel: PlatformPanelState;
  linkEditor?: PlatformLinkEditor;
  extra?: ReactNode;
}) {
  const {
    active,
    activeIsShared,
    activeEditable,
    activeAssets,
    taskProgress,
    setAssetStatus,
    activeChecklist,
    assignedIds,
  } = useCampaigns();
  const { role, canSeePrice } = useRole();
  const { creators: allCreators } = useOS();
  const [linkInput, setLinkInput] = useState(linkEditor?.value ?? "");
  useEffect(
    () => setLinkInput(linkEditor?.value ?? ""),
    [linkEditor?.value, active?.id],
  );

  const spent = active?.spent ?? 0;
  const budget = active?.budget ?? 0;
  // No synthetic progress bar: `goal` is free-text (e.g. "10M views") and there's
  // no real numeric target field to measure real `panel.views` against.
  const creatives = activeAssets.filter(
    (a) => a.type === "Video" || a.type === "Art" || a.type === "Other",
  );

  function downloadBrief() {
    if (!active) return;
    const names = allCreators
      .filter((c) => assignedIds.includes(c.id))
      .map((c) => c.name);
    campaignBriefPdf(active, activeChecklist, names);
  }
  const actions: {
    label: string;
    icon: IconT;
    primary?: boolean;
    onClick?: () => void;
  }[] =
    role === "Marketing Manager"
      ? [
          {
            label: "Download Brief",
            icon: FileDown,
            primary: true,
            onClick: downloadBrief,
          },
        ]
      : role === "Team Member"
        ? [
            {
              label: "Download Brief",
              icon: FileDown,
              primary: true,
              onClick: downloadBrief,
            },
          ]
        : [{ label: "Download Brief", icon: FileDown, onClick: downloadBrief }];

  const statusColor: Record<UploadedAsset["status"], string> = {
    Draft: "oklch(0.75 0.02 260)",
    "Under Review": "oklch(0.82 0.16 90)",
    Approved: "oklch(0.82 0.18 150)",
    "Needs Revision": "oklch(0.7 0.2 20)",
  };
  const CfgIcon = cfg.icon;
  const PanelIcon = cfg.panelIcon;

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em]"
            style={{ color: cfg.accent }}
          >
            <CfgIcon className="h-3.5 w-3.5" /> Platform · {cfg.name}
          </div>
          <h1 className="mt-1 flex flex-wrap items-center gap-3 font-display text-3xl font-bold">
            {active ? (
              <>
                {active.artist} /{" "}
                <span className="text-gradient-neon">{active.title}</span>
              </>
            ) : (
              <span className="text-gradient-neon">{cfg.name} Command</span>
            )}
            {activeIsShared && (
              <SharedBadge editable={activeEditable} className="!text-[10px]" />
            )}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {active ? cfg.subtitle : "Create a campaign to activate tracking."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {actions.map((a) => (
            <MagneticButton
              key={a.label}
              variant={a.primary ? undefined : "ghost"}
              onClick={a.onClick}
            >
              <a.icon className="h-4 w-4" /> {a.label}
            </MagneticButton>
          ))}
        </div>
      </header>

      {/* Campaign status — real fields only (budget/spent are what HQ entered in Budget; no fabricated view counts). */}
      <section className="mt-6 grid grid-cols-12 gap-4">
        <SpotlightCard className="col-span-12 p-5 xl:col-span-5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Campaign Status
            </div>
            <Flame className="h-4 w-4 text-white/40" />
          </div>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <div className="font-display text-3xl font-bold">
                {panel.views !== undefined ? fmt(panel.views) : "—"}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  {cfg.name} views{" "}
                  {panel.views === undefined && "(connect a source below)"}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                {active?.goal || "No goal set"} · checklist {taskProgress}% done
              </div>
            </div>
            {canSeePrice && (
              <div className="text-right">
                <div className="font-display text-xl font-bold">
                  ${fmt(spent)}
                  {budget ? ` / $${fmt(budget)}` : ""}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  spent (from Budget)
                </div>
              </div>
            )}
          </div>
        </SpotlightCard>

        {/* Platform-specific panel — real data if connected, honest "connect" card otherwise. */}
        <SpotlightCard className="col-span-12 p-5 xl:col-span-7">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {cfg.panelTitle}
            </div>
            <PanelIcon className="h-4 w-4 text-white/40" />
          </div>
          {panel.loading ? (
            <div className="mt-4 grid place-items-center rounded-xl border border-dashed border-white/10 p-8 text-sm text-muted-foreground">
              Loading live data…
            </div>
          ) : panel.connected && panel.stats ? (
            <div
              className={`mt-3 grid grid-cols-1 gap-3 ${panel.stats.length >= 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-3"}`}
            >
              {panel.stats
                .filter((s) => !s.priceGated || canSeePrice)
                .map((s) => (
                  <SoundStat
                    key={s.label}
                    icon={s.icon}
                    label={s.label}
                    value={s.value}
                    hint={s.hint}
                  />
                ))}
            </div>
          ) : (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5">
              <PlugZap className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
              <div className="text-sm">
                <div className="font-medium text-white/80">Not connected</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {panel.reason ||
                    `Wire a real ${cfg.name} data source to activate this panel.`}
                </p>
                {panel.helpHref && (
                  <Link
                    to={panel.helpHref}
                    className="mt-2 inline-flex items-center gap-1 text-xs text-white underline underline-offset-2"
                  >
                    <Link2 className="h-3 w-3" /> Set it up
                  </Link>
                )}
              </div>
            </div>
          )}

          {linkEditor && active && activeEditable && (
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <Link2 className="h-4 w-4 shrink-0 text-white/40" />
              <input
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder={linkEditor.placeholder}
                className="min-w-[200px] flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
              />
              <button
                onClick={() => linkEditor.onSave(linkInput.trim())}
                className="glass shrink-0 rounded-full px-4 py-2 text-sm hover:bg-white/5"
              >
                {linkEditor.value ? "Update link" : "Save link"}
              </button>
            </div>
          )}
        </SpotlightCard>
      </section>

      {/* Creatives & assets */}
      <SpotlightCard className="mt-4 p-5" spotlight={false}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Creatives & Assets
            </div>
            <h2 className="mt-1 font-display text-xl font-bold">
              Drafted content
            </h2>
          </div>
          <Link
            to="/assets"
            className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5"
          >
            <Clapperboard className="h-3.5 w-3.5" /> Asset pipeline
          </Link>
        </div>
        {creatives.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-muted-foreground">
            No drafted content on this campaign yet — upload drafts in{" "}
            <Link
              to="/assets"
              className="text-white underline underline-offset-2"
            >
              Assets
            </Link>{" "}
            and they'll appear here with their approval status.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
            {creatives.map((a) => (
              <div key={a.id} className="glass overflow-hidden rounded-xl">
                <div className="relative grid aspect-video place-items-center bg-white/[0.03]">
                  {a.previewUrl ? (
                    <img
                      src={a.previewUrl}
                      alt={a.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Video className="h-6 w-6 text-white/25" />
                  )}
                  <span
                    className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider"
                    style={{
                      color: statusColor[a.status],
                      background: "rgba(0,0,0,0.55)",
                      border: `1px solid ${statusColor[a.status]}`,
                    }}
                  >
                    {a.status}
                  </span>
                </div>
                <div className="p-3">
                  <div className="truncate text-xs font-medium">{a.name}</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    {a.type} · {a.addedAt}
                  </div>
                  {role === "Marketing Manager" && a.status !== "Approved" && (
                    <div className="mt-2 flex gap-1.5">
                      <button
                        onClick={() => setAssetStatus(a.id, "Approved")}
                        className="rounded-full border border-[oklch(0.82_0.18_150)]/40 px-2 py-0.5 text-[10px] text-[oklch(0.82_0.18_150)] hover:bg-[oklch(0.82_0.18_150)]/10"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setAssetStatus(a.id, "Needs Revision")}
                        className="rounded-full border border-[oklch(0.7_0.2_20)]/40 px-2 py-0.5 text-[10px] text-[oklch(0.8_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10"
                      >
                        Revise
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </SpotlightCard>

      {extra}
    </AppShell>
  );
}

export function SoundStat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: IconT;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-2 font-display text-2xl font-bold">{value}</div>
      <div className="mt-0.5 text-[10px] text-muted-foreground/70">{hint}</div>
    </div>
  );
}
