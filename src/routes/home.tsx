import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useOS } from "@/lib/os-store";
import { TrendingUp, FileSignature, Disc3, Cpu, Check, Clock, UserPlus } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({ meta: [{ title: "Home · RIPPL OS" }, { name: "description", content: "Your 360 command center." }] }),
  component: Home,
});

function Home() {
  const { deals, contracts, releases, projects, todos, update } = useOS();

  const pendingSignatures = deals.filter((d) => d.status === "Contracting").length + contracts.length;
  const upcoming = releases.filter((r) => r.status === "Scheduled").length;
  const pipelines = projects.filter((p) => p.deploy !== "Error").length;

  const metrics = [
    { label: "Blended ROAS", value: "—", hint: "Connect a live campaign", icon: TrendingUp },
    { label: "Pending Signatures", value: `${pendingSignatures}`, hint: "Deals + contracts", icon: FileSignature },
    { label: "Upcoming Releases", value: `${upcoming}`, hint: "Next 7 days", icon: Disc3 },
    { label: "Active AI Pipelines", value: `${pipelines}`, hint: "SaaS + AI projects", icon: Cpu },
  ];

  function toggleTodo(id: string) { update("todos", (t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x))); }
  function snooze(id: string) { update("todos", (t) => t.map((x) => (x.id === id ? { ...x, snoozed: !x.snoozed } : x))); }
  function delegate(id: string) { update("todos", (t) => t.map((x) => (x.id === id ? { ...x, delegated: !x.delegated } : x))); }

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Command Center</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Good to see you, <span className="text-gradient-neon">Zeyad</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Your whole universe — A&R, releases, deals and tech — in one view. Press <kbd className="rounded border border-white/15 px-1 text-[10px]">⌘K</kbd> to search anything.</p>
      </header>

      <section className="mt-6 grid grid-cols-12 gap-4">
        {metrics.map((m) => (
          <SpotlightCard key={m.label} className="col-span-6 xl:col-span-3 p-5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{m.label}</div>
              <m.icon className="h-4 w-4 text-white/40" />
            </div>
            <div className="mt-3 font-display text-3xl font-bold">{m.value}</div>
            <div className="mt-1 text-[11px] text-muted-foreground/70">{m.hint}</div>
          </SpotlightCard>
        ))}
      </section>

      <section className="mt-6 grid grid-cols-12 gap-4">
        {/* Calendar widget */}
        <SpotlightCard className="col-span-12 xl:col-span-7 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Schedule</div>
          <h2 className="mt-1 font-display text-2xl font-bold">This Month</h2>
          <MonthCalendar releaseCount={releases.length} dealCount={deals.length} />
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/80" /> Release date</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[oklch(0.8_0.16_80)]" /> Deal milestone</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[oklch(0.72_0.16_200)]" /> Social post</span>
          </div>
        </SpotlightCard>

        {/* Action center */}
        <SpotlightCard className="col-span-12 xl:col-span-5 p-6" spotlight={false}>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Action Center</div>
          <h2 className="mt-1 font-display text-2xl font-bold">Today's To-Dos</h2>
          <div className="mt-5 space-y-2">
            {todos.map((t) => (
              <div key={t.id} className={`glass flex items-center gap-3 rounded-xl p-3 ${t.snoozed ? "opacity-50" : ""}`}>
                <button onClick={() => toggleTodo(t.id)} className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${t.done ? "border-white bg-white" : "border-white/25"}`}>
                  {t.done && <Check className="h-3.5 w-3.5 text-black" />}
                </button>
                <span className={`flex-1 text-sm ${t.done ? "text-muted-foreground line-through" : ""}`}>
                  {t.label}
                  {t.delegated && <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-white/60">Delegated</span>}
                </span>
                <button onClick={() => snooze(t.id)} title="Snooze" className="text-muted-foreground hover:text-white"><Clock className="h-4 w-4" /></button>
                <button onClick={() => delegate(t.id)} title="Delegate" className="text-muted-foreground hover:text-white"><UserPlus className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </section>
    </AppShell>
  );
}

function MonthCalendar({ releaseCount, dealCount }: { releaseCount: number; dealCount: number }) {
  const now = new Date();
  const year = now.getFullYear(); const month = now.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  // deterministic event days from data counts
  const releaseDays = new Set([7, 21].slice(0, Math.min(2, releaseCount)));
  const dealDays = new Set([12].slice(0, Math.min(1, dealCount)));
  const socialDays = new Set([4, 15, 26]);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => <div key={i}>{d}</div>)}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <div key={i} className={`relative grid h-11 place-items-center rounded-lg text-sm ${d === today ? "bg-white text-black font-bold" : d ? "bg-white/[0.02] text-foreground" : ""}`}>
            {d}
            {d && (
              <div className="absolute bottom-1 flex gap-0.5">
                {releaseDays.has(d) && <span className="h-1 w-1 rounded-full bg-white/80" />}
                {dealDays.has(d) && <span className="h-1 w-1 rounded-full bg-[oklch(0.8_0.16_80)]" />}
                {socialDays.has(d) && <span className="h-1 w-1 rounded-full bg-[oklch(0.72_0.16_200)]" />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
