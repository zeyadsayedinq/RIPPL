import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { NewCampaignModal, ModalShell } from "@/components/NewCampaignModal";
import { EmptyState } from "@/components/EmptyState";
import { useCampaigns } from "@/lib/campaign-store";
import { useRole } from "@/lib/role-context";
import type { Campaign } from "@/lib/campaign-data";
import { Check, Circle, DollarSign, Pencil, Trash2, Lock } from "lucide-react";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns · RIPPL" },
      { name: "description", content: "All marketing campaigns." },
    ],
  }),
  component: CampaignsPage,
});

const money = (n: number) =>
  n >= 1_000_000
    ? `EGP ${(n / 1_000_000).toFixed(2)}M`
    : `EGP ${(n / 1_000).toFixed(0)}K`;
const statusColor: Record<string, string> = {
  Active: "oklch(0.85 0.18 150)",
  Planning: "oklch(0.8 0.16 80)",
  Wrapped: "oklch(0.6 0.02 260)",
};
const PLATFORMS = [
  "TikTok",
  "Instagram",
  "YouTube",
  "Facebook",
  "X",
  "Anghami",
  "Spotify",
  "Radio",
  "TV",
];
const STATUSES: Campaign["status"][] = ["Planning", "Active", "Wrapped"];
const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-[oklch(0.7_0.28_328)]/40";

function CampaignsPage() {
  const { campaigns, active, setActive, deleteCampaign, isCampaignShared } =
    useCampaigns();
  const { canSeePrice } = useRole();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Campaign | null>(null);

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">
            Portfolio
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold">
            All <span className="text-gradient-neon">Campaigns</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {campaigns.length} campaigns ·{" "}
            {campaigns.filter((c) => c.status === "Active").length} active
          </p>
        </div>
        <MagneticButton onClick={() => setModal(true)}>
          + New campaign
        </MagneticButton>
      </header>

      {campaigns.length === 0 && (
        <EmptyState
          title="No campaigns yet"
          note="Create your first campaign to start planning channels, tasks and budget."
        />
      )}

      <section className="mt-6 grid grid-cols-12 gap-4">
        {campaigns.map((c) => {
          const isActive = c.id === active?.id;
          const shared = isCampaignShared(c.id);
          const pct = c.budget ? Math.round((c.spent / c.budget) * 100) : 0;
          return (
            <SpotlightCard
              key={c.id}
              className={`col-span-12 md:col-span-6 xl:col-span-4 p-5 ${isActive ? "ring-1 ring-[oklch(0.7_0.28_328)]/50" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <div className="font-display text-lg font-bold">
                    {c.artist}
                  </div>
                  <div className="truncate text-sm text-muted-foreground">
                    {c.title}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]"
                    style={{
                      color: statusColor[c.status],
                      background: statusColor[c.status] + "1a",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: statusColor[c.status] }}
                    />
                    {c.status}
                  </span>
                  {shared ? (
                    <span
                      title="Assigned by HQ — edit/delete from their account"
                      className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground"
                    >
                      <Lock className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditing(c)}
                        title="Edit campaign"
                        className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(c)}
                        title="Delete campaign"
                        className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground/80">
                {c.subtitle}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <Stat label="Reach" value={c.reach} />
                <Stat label="Goal" value={c.goal} small />
                <Stat
                  label="Window"
                  value={`${c.startDate} → ${c.endDate}`}
                  small
                />
                <Stat
                  label="Budget"
                  value={canSeePrice ? money(c.budget) : "•••"}
                />
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <DollarSign className="h-3 w-3" /> Spend
                  </span>
                  <span>
                    {canSeePrice
                      ? `${money(c.spent)} / ${money(c.budget)}`
                      : "•••"}{" "}
                    · {pct}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {c.platforms.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setActive(c.id)}
                className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? "bg-white/10 text-white" : "glass text-foreground hover:bg-white/5"}`}
              >
                {isActive ? (
                  <>
                    <Check className="h-4 w-4" /> Active
                  </>
                ) : (
                  <>
                    <Circle className="h-4 w-4" /> Set active
                  </>
                )}
              </button>
            </SpotlightCard>
          );
        })}
      </section>

      <AnimatePresence>
        {modal && <NewCampaignModal onClose={() => setModal(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {editing && (
          <EditCampaignModal
            campaign={editing}
            onClose={() => setEditing(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {confirmDelete && (
          <ModalShell
            eyebrow="Delete campaign"
            title={`Delete "${confirmDelete.title}"?`}
            onClose={() => setConfirmDelete(null)}
          >
            <p className="text-sm text-muted-foreground">
              This removes{" "}
              <b className="text-foreground">
                {confirmDelete.artist} — {confirmDelete.title}
              </b>{" "}
              and everything scoped to it: tasks, assigned creators, assets,
              budget lines and calendar posts. This can't be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white"
              >
                Cancel
              </button>
              <MagneticButton
                variant="danger"
                onClick={() => {
                  deleteCampaign(confirmDelete.id);
                  setConfirmDelete(null);
                }}
              >
                <Trash2 className="h-4 w-4" /> Delete campaign
              </MagneticButton>
            </div>
          </ModalShell>
        )}
      </AnimatePresence>
    </AppShell>
  );
}

function EditCampaignModal({
  campaign,
  onClose,
}: {
  campaign: Campaign;
  onClose: () => void;
}) {
  const { updateCampaign } = useCampaigns();
  const [artist, setArtist] = useState(campaign.artist);
  const [title, setTitle] = useState(campaign.title);
  const [status, setStatus] = useState<Campaign["status"]>(campaign.status);
  const [budget, setBudget] = useState(String(campaign.budget));
  const [spent, setSpent] = useState(String(campaign.spent));
  const [goal, setGoal] = useState(campaign.goal);
  const [reach, setReach] = useState(campaign.reach);
  const [startDate, setStartDate] = useState(campaign.startDate);
  const [endDate, setEndDate] = useState(campaign.endDate);
  const [picked, setPicked] = useState<string[]>(campaign.platforms);
  const toggle = (p: string) =>
    setPicked((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));

  return (
    <ModalShell
      eyebrow="Edit campaign"
      title={`${campaign.artist} — ${campaign.title}`}
      onClose={onClose}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCampaign(campaign.id, {
            artist: artist || campaign.artist,
            title: title || campaign.title,
            status,
            budget: Number(budget) || 0,
            spent: Number(spent) || 0,
            goal,
            reach: reach || "—",
            startDate,
            endDate,
            platforms: picked,
            subtitle: `${goal} · ${picked.length} platform${picked.length !== 1 ? "s" : ""}`,
          });
          onClose();
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
              Artist / Brand
            </label>
            <input
              required
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
              Campaign name
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
              Status
            </label>
            <select
              className={field}
              value={status}
              onChange={(e) => setStatus(e.target.value as Campaign["status"])}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s} className="bg-[#140a1e]">
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
              Reach (real number or —)
            </label>
            <input
              value={reach}
              onChange={(e) => setReach(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
              Total budget (EGP)
            </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
              Spent so far (EGP)
            </label>
            <input
              type="number"
              value={spent}
              onChange={(e) => setSpent(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
              Start date
            </label>
            <input
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
              End date
            </label>
            <input
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={field}
            />
          </div>
          <div className="col-span-2">
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
              Primary goal
            </label>
            <select
              className={field}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option className="bg-[#140a1e]">
                Streams & chart performance
              </option>
              <option className="bg-[#140a1e]">
                Followers & audience growth
              </option>
              <option className="bg-[#140a1e]">
                Playlist & editorial reach
              </option>
              <option className="bg-[#140a1e]">Press & critical acclaim</option>
              <option className="bg-[#140a1e]">Conversions & sales</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Target channels
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PLATFORMS.map((p) => {
              const on = picked.includes(p);
              return (
                <button
                  type="button"
                  key={p}
                  onClick={() => toggle(p)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${on ? "border-[oklch(0.7_0.28_328)] bg-[oklch(0.7_0.28_328)]/20 text-white" : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-white"}`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white"
          >
            Cancel
          </button>
          <MagneticButton>Save changes</MagneticButton>
        </div>
      </form>
    </ModalShell>
  );
}

function Stat({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="glass rounded-lg p-2.5">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div
        className={`mt-0.5 font-semibold ${small ? "text-[11px] leading-tight" : "text-sm"}`}
      >
        {value}
      </div>
    </div>
  );
}
