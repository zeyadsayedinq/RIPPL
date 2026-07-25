import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { EmptyState } from "@/components/EmptyState";
import { useOS, uid, type Gig, type GigStatus } from "@/lib/os-store";
import { useRole } from "@/lib/role-context";
import {
  Ticket,
  Plus,
  Trash2,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   LIVE & TICKETING
   Derived from lucpod/ticketless — an AWS/serverless workshop that builds a
   gig + ticket-sales business (gigs, gig pages, purchase flow, background
   workers). RIPPL doesn't need the serverless plumbing, but it was missing the
   *domain* entirely: shows, capacity, break-even, sell-through, settlement.

   Run-book: knowledge/checklists/LIVE_SHOW_ADVANCE_CHECKLIST.md
   Maths:    knowledge/finance/UNIT_ECONOMICS.md
═══════════════════════════════════════════════════════════ */

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Live · RIPPL OS" },
      {
        name: "description",
        content: "Gigs, ticketing, break-even and settlement.",
      },
    ],
  }),
  component: LivePage,
});

const STATUSES: GigStatus[] = [
  "Enquiry",
  "Held",
  "Confirmed",
  "Announced",
  "On Sale",
  "Played",
  "Settled",
  "Cancelled",
];

export function gigEconomics(g: Gig) {
  const doorRevenue = g.ticketsSold * g.ticketPrice * g.doorSplit;
  const gross = doorRevenue + g.guarantee;
  const net = gross - g.costs;
  const perTicket = g.ticketPrice * g.doorSplit;
  const breakeven =
    perTicket > 0
      ? Math.ceil(Math.max(g.costs - g.guarantee, 0) / perTicket)
      : null;
  const sellThrough = g.capacity > 0 ? g.ticketsSold / g.capacity : 0;
  return { doorRevenue, gross, net, breakeven, sellThrough };
}

const EMPTY = {
  artist: "",
  venue: "",
  city: "",
  date: "",
  capacity: "",
  ticketPrice: "",
  guarantee: "",
  doorSplit: "0.7",
  costs: "",
};

function LivePage() {
  const { gigs, update } = useOS();
  const { canSeePrice } = useRole();
  const mask = (v: string) => (canSeePrice ? v : "•••••");
  const [form, setForm] = useState(EMPTY);
  const [open, setOpen] = useState(false);

  const totals = useMemo(() => {
    const e = gigs.map(gigEconomics);
    return {
      upcoming: gigs.filter(
        (g) => !["Played", "Settled", "Cancelled"].includes(g.status),
      ).length,
      tickets: gigs.reduce((s, g) => s + g.ticketsSold, 0),
      net: e.reduce((s, x) => s + x.net, 0),
      atRisk: gigs.filter((g, i) => {
        const be = e[i].breakeven;
        return (
          be !== null &&
          g.ticketsSold < be &&
          !["Played", "Settled", "Cancelled"].includes(g.status)
        );
      }).length,
    };
  }, [gigs]);

  function addGig(e: React.FormEvent) {
    e.preventDefault();
    if (!form.venue.trim() || !form.artist.trim()) return;
    const g: Gig = {
      id: uid("gig"),
      artist: form.artist.trim(),
      venue: form.venue.trim(),
      city: form.city.trim(),
      date: form.date,
      status: "Enquiry",
      capacity: Number(form.capacity) || 0,
      currency: "EGP",
      ticketPrice: Number(form.ticketPrice) || 0,
      guarantee: Number(form.guarantee) || 0,
      doorSplit: Number(form.doorSplit) || 0,
      costs: Number(form.costs) || 0,
      ticketsSold: 0,
      advanceComplete: false,
    };
    update("gigs", (all) => [g, ...all]);
    setForm(EMPTY);
    setOpen(false);
  }

  function patch(id: string, p: Partial<Gig>) {
    update("gigs", (all) => all.map((g) => (g.id === id ? { ...g, ...p } : g)));
  }

  return (
    <AppShell>
      <header className="glass flex flex-wrap items-start justify-between gap-3 rounded-2xl p-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
            Live · Touring
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold">
            Gigs &amp; <span className="text-gradient-neon">Ticketing</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Break-even before you confirm. Sell-through before you panic.
          </p>
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
        >
          <Plus className="h-4 w-4" /> New show
        </button>
      </header>

      <section className="mt-6 grid grid-cols-12 gap-4">
        <Stat
          label="Upcoming shows"
          value={String(totals.upcoming)}
          icon={Ticket}
          accent="oklch(0.7 0.02 260)"
        />
        <Stat
          label="Tickets sold"
          value={totals.tickets.toLocaleString()}
          icon={TrendingUp}
          accent="oklch(0.85 0.02 260)"
        />
        <Stat
          label="Net (all shows)"
          value={mask(`EGP ${Math.round(totals.net).toLocaleString()}`)}
          icon={CheckCircle2}
          accent={
            totals.net >= 0 ? "oklch(0.82 0.18 150)" : "oklch(0.7 0.2 20)"
          }
        />
        <Stat
          label="Below break-even"
          value={String(totals.atRisk)}
          icon={AlertTriangle}
          accent={totals.atRisk ? "oklch(0.7 0.2 20)" : "oklch(0.82 0.18 150)"}
        />
      </section>

      {open && (
        <SpotlightCard className="mt-6 p-5" spotlight={false}>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Add a show
          </div>
          <form
            onSubmit={addGig}
            className="mt-3 grid grid-cols-12 items-end gap-3"
          >
            <Field
              className="col-span-12 sm:col-span-3"
              label="Artist"
              value={form.artist}
              onChange={(v) => setForm({ ...form, artist: v })}
            />
            <Field
              className="col-span-12 sm:col-span-3"
              label="Venue"
              value={form.venue}
              onChange={(v) => setForm({ ...form, venue: v })}
            />
            <Field
              className="col-span-6 sm:col-span-2"
              label="City"
              value={form.city}
              onChange={(v) => setForm({ ...form, city: v })}
            />
            <Field
              className="col-span-6 sm:col-span-2"
              label="Date"
              type="date"
              value={form.date}
              onChange={(v) => setForm({ ...form, date: v })}
            />
            <Field
              className="col-span-6 sm:col-span-2"
              label="Capacity"
              type="number"
              value={form.capacity}
              onChange={(v) => setForm({ ...form, capacity: v })}
            />
            <Field
              className="col-span-6 sm:col-span-2"
              label="Ticket price"
              type="number"
              value={form.ticketPrice}
              onChange={(v) => setForm({ ...form, ticketPrice: v })}
            />
            <Field
              className="col-span-6 sm:col-span-2"
              label="Guarantee"
              type="number"
              value={form.guarantee}
              onChange={(v) => setForm({ ...form, guarantee: v })}
            />
            <Field
              className="col-span-6 sm:col-span-2"
              label="Door split (0–1)"
              type="number"
              value={form.doorSplit}
              onChange={(v) => setForm({ ...form, doorSplit: v })}
            />
            <Field
              className="col-span-6 sm:col-span-2"
              label="Costs"
              type="number"
              value={form.costs}
              onChange={(v) => setForm({ ...form, costs: v })}
            />
            <div className="col-span-12 sm:col-span-4">
              <button className="w-full rounded-xl bg-white py-2 text-sm font-medium text-black">
                Add show
              </button>
            </div>
          </form>
          <p className="mt-3 text-[11px] text-muted-foreground/70">
            Break-even is computed for you. If you can&apos;t state it,
            don&apos;t confirm the date.
          </p>
        </SpotlightCard>
      )}

      {gigs.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No shows yet"
            note="Add a show to see its break-even ticket count and sell-through."
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-12 gap-4">
          {gigs.map((g) => {
            const e = gigEconomics(g);
            const short = e.breakeven !== null && g.ticketsSold < e.breakeven;
            return (
              <SpotlightCard
                key={g.id}
                className="col-span-12 p-5 lg:col-span-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-display text-xl font-bold">
                      {g.venue}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{g.city || "—"}</span>
                      <span>·</span>
                      <span>{g.date || "date TBC"}</span>
                    </div>
                    <div className="mt-1 text-sm">{g.artist}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <select
                      value={g.status}
                      onChange={(ev) =>
                        patch(g.id, { status: ev.target.value as GigStatus })
                      }
                      className="glass rounded-lg bg-transparent px-2 py-1.5 text-xs outline-none"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-black">
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        update("gigs", (all) =>
                          all.filter((x) => x.id !== g.id),
                        )
                      }
                      className="text-muted-foreground hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between text-xs">
                  <span className="text-muted-foreground">
                    {g.ticketsSold} / {g.capacity || "?"} sold
                    {e.breakeven !== null && (
                      <>
                        {" "}
                        · break-even{" "}
                        <span className="font-mono text-white/80">
                          {e.breakeven}
                        </span>
                      </>
                    )}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      color: short
                        ? "oklch(0.7 0.2 20)"
                        : "oklch(0.82 0.18 150)",
                    }}
                  >
                    {(e.sellThrough * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="relative mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(e.sellThrough * 100, 100)}%`,
                      background: short
                        ? "oklch(0.7 0.2 20)"
                        : "oklch(0.82 0.18 150)",
                    }}
                  />
                  {e.breakeven !== null && g.capacity > 0 && (
                    <div
                      className="absolute top-0 h-full w-px bg-white/60"
                      style={{
                        left: `${Math.min((e.breakeven / g.capacity) * 100, 100)}%`,
                      }}
                    />
                  )}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <Mini
                    label="Gross"
                    value={mask(
                      `${g.currency} ${Math.round(e.gross).toLocaleString()}`,
                    )}
                  />
                  <Mini
                    label="Costs"
                    value={mask(
                      `${g.currency} ${Math.round(g.costs).toLocaleString()}`,
                    )}
                  />
                  <Mini
                    label="Net"
                    value={mask(
                      `${g.currency} ${Math.round(e.net).toLocaleString()}`,
                    )}
                    color={
                      e.net >= 0 ? "oklch(0.82 0.18 150)" : "oklch(0.7 0.2 20)"
                    }
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Tickets sold
                  </label>
                  <input
                    type="number"
                    value={g.ticketsSold}
                    onChange={(ev) =>
                      patch(g.id, { ticketsSold: Number(ev.target.value) || 0 })
                    }
                    className="glass w-24 rounded-lg px-2 py-1 text-right font-mono text-xs outline-none"
                  />
                  <button
                    onClick={() =>
                      patch(g.id, { advanceComplete: !g.advanceComplete })
                    }
                    className={`ml-auto glass rounded-full px-3 py-1.5 text-[11px] ${g.advanceComplete ? "text-[oklch(0.82_0.18_150)]" : "text-muted-foreground"}`}
                  >
                    {g.advanceComplete
                      ? "✓ Advance complete"
                      : "Advance pending"}
                  </button>
                </div>

                {short &&
                  !["Played", "Settled", "Cancelled"].includes(g.status) && (
                    <div className="mt-3 rounded-xl border border-[oklch(0.7_0.2_20/0.3)] bg-[oklch(0.7_0.2_20/0.06)] px-3 py-2 text-[11px] text-[oklch(0.8_0.15_20)]">
                      {e.breakeven! - g.ticketsSold} tickets short of
                      break-even. Escalation plan lives in the live show advance
                      checklist.
                    </div>
                  )}
              </SpotlightCard>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: any;
  accent: string;
}) {
  return (
    <SpotlightCard className="col-span-6 p-4 lg:col-span-3">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </div>
        <Icon className="h-4 w-4" style={{ color: accent }} />
      </div>
      <div
        className="mt-2 font-display text-2xl font-bold"
        style={{ color: accent }}
      >
        {value}
      </div>
    </SpotlightCard>
  );
}

function Mini({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="glass rounded-xl px-2 py-2">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div
        className="mt-0.5 font-mono text-xs"
        style={color ? { color } : undefined}
      >
        {value}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="glass w-full rounded-xl px-3 py-2 text-sm outline-none"
      />
    </div>
  );
}
