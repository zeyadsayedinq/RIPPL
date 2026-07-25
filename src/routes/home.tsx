import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SharedBadge } from "@/components/SharedBadge";
import { useOS } from "@/lib/os-store";
import { useAuthEmail, useIsHQ } from "@/lib/use-auth";
import {
  TrendingUp,
  FileSignature,
  Disc3,
  Cpu,
  Check,
  Clock,
  UserPlus,
  Megaphone,
  Music2,
  FileText,
  Inbox,
  Receipt,
  Ticket,
  Share2,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";
import { invoiceTotals } from "@/lib/invoice";
import { KNOWLEDGE } from "@/lib/knowledge-index";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home · RIPPL OS" },
      { name: "description", content: "Your 360 command center." },
    ],
  }),
  component: Home,
});

function Home() {
  const {
    deals,
    contracts,
    releases,
    projects,
    todos,
    update,
    shared,
    canEdit,
    invoices,
    commissions,
    gigs,
    affiliates,
    hitScores,
  } = useOS();
  const isHQ = useIsHQ();
  const email = useAuthEmail();
  const firstName = isHQ ? "Zeyad" : (email?.split("@")[0] ?? "there");

  // Real signature-request status (Dropbox Sign, see lib/esignature.ts) once a
  // contract's actually been sent — contracts never sent for signature don't
  // count as "pending" (they used to just count every contract, regardless).
  const pendingSignatures =
    deals.filter((d) => d.status === "Contracting").length +
    contracts.filter((c) => c.signatureStatus === "sent").length;
  const upcoming = releases.filter((r) => r.status === "Scheduled").length;
  const pipelines = projects.filter((p) => p.deploy !== "Error").length;

  const metrics = [
    {
      label: "Blended ROAS",
      value: "—",
      hint: "Connect a live campaign",
      icon: TrendingUp,
    },
    {
      label: "Pending Signatures",
      value: `${pendingSignatures}`,
      hint: "Deals contracting + contracts awaiting signature",
      icon: FileSignature,
    },
    {
      label: "Upcoming Releases",
      value: `${upcoming}`,
      hint: "Next 7 days",
      icon: Disc3,
    },
    {
      label: "Active AI Pipelines",
      value: `${pipelines}`,
      hint: "SaaS + AI projects",
      icon: Cpu,
    },
  ];

  /* ── Money & momentum, from the growth modules ── */
  const open = invoices.filter(
    (i) => i.status !== "Paid" && i.status !== "Void",
  );
  const outstanding = open.reduce(
    (s, i) => s + invoiceTotals({ ...i, paid: i.paid }).balance,
    0,
  );
  const overdueCount = open.filter((i) => {
    if (!i.dueDate) return false;
    return new Date(i.dueDate).getTime() < Date.now();
  }).length;
  const activeCommissions = commissions.filter(
    (c) => !["Paid", "Cancelled"].includes(c.phase),
  ).length;
  const upcomingShows = gigs.filter(
    (g) => !["Played", "Settled", "Cancelled"].includes(g.status),
  );
  const showsAtRisk = upcomingShows.filter((g) => {
    const perTicket = g.ticketPrice * g.doorSplit;
    if (perTicket <= 0) return false;
    return (
      g.ticketsSold < Math.ceil(Math.max(g.costs - g.guarantee, 0) / perTicket)
    );
  }).length;
  const commissionOwed = affiliates.reduce(
    (s, a) => s + a.revenue * a.commissionRate,
    0,
  );

  const money = [
    {
      label: "Outstanding",
      value: `EGP ${Math.round(outstanding).toLocaleString()}`,
      hint: `${open.length} open · ${overdueCount} overdue`,
      icon: Receipt,
      to: "/invoices" as const,
      warn: overdueCount > 0,
    },
    {
      label: "Commissions",
      value: `${activeCommissions}`,
      hint: "In the client-work pipeline",
      icon: FileText,
      to: "/invoices" as const,
      warn: false,
    },
    {
      label: "Upcoming Shows",
      value: `${upcomingShows.length}`,
      hint: showsAtRisk
        ? `${showsAtRisk} below break-even`
        : "All tracking to break-even",
      icon: Ticket,
      to: "/live" as const,
      warn: showsAtRisk > 0,
    },
    {
      label: "Affiliate Owed",
      value: `$${Math.round(commissionOwed).toLocaleString()}`,
      hint: `${affiliates.length} partner${affiliates.length === 1 ? "" : "s"}`,
      icon: Share2,
      to: "/affiliates" as const,
      warn: false,
    },
  ];

  const jumps = [
    {
      to: "/hitlab" as const,
      label: "Hit Lab",
      desc: `${hitScores.length} track${hitScores.length === 1 ? "" : "s"} scored`,
      icon: Sparkles,
    },
    {
      to: "/knowledge" as const,
      label: "Knowledge Hub",
      desc: `${KNOWLEDGE.length} playbooks & checklists`,
      icon: BookOpen,
    },
    {
      to: "/live" as const,
      label: "Live & Tickets",
      desc: "Break-even before you confirm",
      icon: Ticket,
    },
    {
      to: "/billing" as const,
      label: "Plans & Credits",
      desc: "Usage this month",
      icon: TrendingUp,
    },
  ];

  function toggleTodo(id: string) {
    update("todos", (t) =>
      t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)),
    );
  }
  function snooze(id: string) {
    update("todos", (t) =>
      t.map((x) => (x.id === id ? { ...x, snoozed: !x.snoozed } : x)),
    );
  }
  function delegate(id: string) {
    update("todos", (t) =>
      t.map((x) => (x.id === id ? { ...x, delegated: !x.delegated } : x)),
    );
  }

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
          Command Center
        </div>
        <h1 className="mt-1 font-display text-3xl font-bold">
          Good to see you,{" "}
          <span className="text-gradient-neon">{firstName}</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your whole universe — A&R, releases, deals and tech — in one view.
          Press{" "}
          <kbd className="rounded border border-white/15 px-1 text-[10px]">
            ⌘K
          </kbd>{" "}
          to search anything.
        </p>
      </header>

      {/* Member portal — what HQ assigned to this account */}
      {!isHQ && shared && (
        <SpotlightCard className="mt-6 p-6" spotlight={false}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Your workspace
                {shared.role !== "None" ? ` · ${shared.role}` : ""}
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold">
                Assigned to <span className="text-gradient-neon">you</span>
              </h2>
            </div>
          </div>
          {shared.campaigns.length +
            shared.releases.length +
            shared.tracks.length +
            shared.contracts.length ===
          0 ? (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
              <Inbox className="h-4 w-4 shrink-0" /> Nothing assigned to you yet
              — anything you create here is your own, and HQ can assign
              campaigns, releases, audio or contracts to this account at any
              time.
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-12 gap-3">
              {(
                [
                  {
                    label: "Campaigns",
                    icon: Megaphone,
                    to: "/dashboard",
                    items: shared.campaigns.map((c) => ({
                      id: c.id,
                      text: `${c.artist} — ${c.title}`,
                    })),
                  },
                  {
                    label: "Releases",
                    icon: Disc3,
                    to: "/releases",
                    items: shared.releases.map((r) => ({
                      id: r.id,
                      text: `${r.title} · ${r.artist}`,
                    })),
                  },
                  {
                    label: "Audio",
                    icon: Music2,
                    to: "/audio",
                    items: shared.tracks.map((t) => ({
                      id: t.id,
                      text: t.title,
                    })),
                  },
                  {
                    label: "Contracts",
                    icon: FileText,
                    to: "/vault",
                    items: shared.contracts.map((c) => ({
                      id: c.id,
                      text: c.name,
                    })),
                  },
                ] as const
              )
                .filter((g) => g.items.length > 0)
                .map((g) => (
                  <Link
                    key={g.label}
                    to={g.to}
                    className="col-span-12 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04] sm:col-span-6 xl:col-span-3"
                  >
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      <g.icon className="h-3.5 w-3.5" /> {g.label} (
                      {g.items.length})
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {g.items.slice(0, 4).map((it) => (
                        <li
                          key={it.id}
                          className="flex items-center justify-between gap-2 text-sm"
                        >
                          <span className="truncate">{it.text}</span>
                          <SharedBadge editable={canEdit(it.id)} />
                        </li>
                      ))}
                      {g.items.length > 4 && (
                        <li className="text-[11px] text-muted-foreground">
                          + {g.items.length - 4} more…
                        </li>
                      )}
                    </ul>
                  </Link>
                ))}
            </div>
          )}
        </SpotlightCard>
      )}

      <section className="mt-6 grid grid-cols-12 gap-4">
        {metrics.map((m) => (
          <SpotlightCard key={m.label} className="col-span-6 xl:col-span-3 p-5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {m.label}
              </div>
              <m.icon className="h-4 w-4 text-white/40" />
            </div>
            <div className="mt-3 font-display text-3xl font-bold">
              {m.value}
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground/70">
              {m.hint}
            </div>
          </SpotlightCard>
        ))}
      </section>

      {/* Money & momentum — the growth modules at a glance */}
      <section className="mt-4 grid grid-cols-12 gap-4">
        {money.map((m) => (
          <Link key={m.label} to={m.to} className="col-span-6 xl:col-span-3">
            <SpotlightCard className="h-full p-5">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {m.label}
                </div>
                <m.icon
                  className="h-4 w-4"
                  style={{
                    color: m.warn
                      ? "oklch(0.7 0.2 20)"
                      : "rgba(255,255,255,0.4)",
                  }}
                />
              </div>
              <div className="mt-3 font-display text-3xl font-bold">
                {m.value}
              </div>
              <div
                className="mt-1 flex items-center gap-1 text-[11px]"
                style={{
                  color: m.warn
                    ? "oklch(0.8 0.15 20)"
                    : "rgba(255,255,255,0.45)",
                }}
              >
                {m.warn && <AlertTriangle className="h-3 w-3" />}
                {m.hint}
              </div>
            </SpotlightCard>
          </Link>
        ))}
      </section>

      {/* Jump to */}
      <section className="mt-4 grid grid-cols-12 gap-3">
        {jumps.map((j) => (
          <Link
            key={j.to}
            to={j.to}
            className="glass col-span-12 flex items-center gap-3 rounded-xl p-4 transition-colors hover:bg-white/[0.05] sm:col-span-6 xl:col-span-3"
          >
            <j.icon className="h-4 w-4 shrink-0 text-white/50" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">
                {j.label}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">
                {j.desc}
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30" />
          </Link>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-12 gap-4">
        {/* Calendar widget */}
        <SpotlightCard className="col-span-12 xl:col-span-7 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Schedule
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold">This Month</h2>
          <MonthCalendar
            releaseCount={releases.length}
            dealCount={deals.length}
          />
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/80" /> Release date
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[oklch(0.8_0.16_80)]" />{" "}
              Deal milestone
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[oklch(0.72_0.16_200)]" />{" "}
              Social post
            </span>
          </div>
        </SpotlightCard>

        {/* Action center */}
        <SpotlightCard
          className="col-span-12 xl:col-span-5 p-6"
          spotlight={false}
        >
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Action Center
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold">
            Today's To-Dos
          </h2>
          <div className="mt-5 space-y-2">
            {todos.map((t) => (
              <div
                key={t.id}
                className={`glass flex items-center gap-3 rounded-xl p-3 ${t.snoozed ? "opacity-50" : ""}`}
              >
                <button
                  onClick={() => toggleTodo(t.id)}
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${t.done ? "border-white bg-white" : "border-white/25"}`}
                >
                  {t.done && <Check className="h-3.5 w-3.5 text-black" />}
                </button>
                <span
                  className={`flex-1 text-sm ${t.done ? "text-muted-foreground line-through" : ""}`}
                >
                  {t.label}
                  {t.delegated && (
                    <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-white/60">
                      Delegated
                    </span>
                  )}
                </span>
                <button
                  onClick={() => snooze(t.id)}
                  title="Snooze"
                  className="text-muted-foreground hover:text-white"
                >
                  <Clock className="h-4 w-4" />
                </button>
                <button
                  onClick={() => delegate(t.id)}
                  title="Delegate"
                  className="text-muted-foreground hover:text-white"
                >
                  <UserPlus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </section>
    </AppShell>
  );
}

function MonthCalendar({
  releaseCount,
  dealCount,
}: {
  releaseCount: number;
  dealCount: number;
}) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const cells: (number | null)[] = [
    ...Array(first).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  // deterministic event days from data counts
  const releaseDays = new Set([7, 21].slice(0, Math.min(2, releaseCount)));
  const dealDays = new Set([12].slice(0, Math.min(1, dealCount)));
  const socialDays = new Set([4, 15, 26]);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <div
            key={i}
            className={`relative grid h-11 place-items-center rounded-lg text-sm ${d === today ? "bg-white text-black font-bold" : d ? "bg-white/[0.02] text-foreground" : ""}`}
          >
            {d}
            {d && (
              <div className="absolute bottom-1 flex gap-0.5">
                {releaseDays.has(d) && (
                  <span className="h-1 w-1 rounded-full bg-white/80" />
                )}
                {dealDays.has(d) && (
                  <span className="h-1 w-1 rounded-full bg-[oklch(0.8_0.16_80)]" />
                )}
                {socialDays.has(d) && (
                  <span className="h-1 w-1 rounded-full bg-[oklch(0.72_0.16_200)]" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
