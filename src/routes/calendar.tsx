import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, type View } from "react-big-calendar";
import withDragAndDrop, { type withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import { format, parse, startOfWeek, getDay, addDays, addWeeks } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { EmptyState } from "@/components/EmptyState";
import { useCampaigns, type CalendarPlatform } from "@/lib/campaign-store";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar · RIPPL" }, { name: "description", content: "Release timeline and rollout." }] }),
  component: CalendarPage,
});

const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales: { "en-US": enUS } });
const DnDCalendar = withDragAndDrop<RBCEvent>(Calendar);

const PLATFORMS: CalendarPlatform[] = ["TikTok", "Instagram", "YouTube", "Facebook", "X", "Other"];
const platformColor: Record<CalendarPlatform, string> = {
  TikTok: "oklch(0.7 0.24 20)",
  Instagram: "oklch(0.68 0.24 340)",
  YouTube: "oklch(0.65 0.24 25)",
  Facebook: "oklch(0.6 0.2 255)",
  X: "oklch(0.85 0 0)",
  Other: "oklch(0.7 0.02 270)",
};
const milestoneColor = "oklch(0.7 0.28 328 / 0.75)";

/* Template timeline dates are relative labels ("Week -4", "Day 0", "Wk 3",
   "Finale"…) — anchor them to the campaign's start date so they can be
   plotted on a real calendar grid. Approximate by design: once a campaign
   is live, the concrete dates that matter are the custom posts below,
   which are fully real, draggable, and persisted. */
function resolveMilestoneDate(label: string, anchor: Date): Date {
  const s = label.trim();
  let m: RegExpExecArray | null;
  if ((m = /^Week\s*([+-]?\d+)$/i.exec(s)) || (m = /^Wk\s*([+-]?\d+)$/i.exec(s))) return addWeeks(anchor, parseInt(m[1], 10));
  if ((m = /^Day\s*([+-]?\d+)$/i.exec(s))) return addDays(anchor, parseInt(m[1], 10));
  if ((m = /^Days\s*(\d+)\s*[–-]\s*\d+$/i.exec(s))) return addDays(anchor, parseInt(m[1], 10) - 1);
  if (/finale/i.test(s)) return addWeeks(anchor, 16);
  return anchor;
}

interface RBCEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: true;
  color: string;
  editable: boolean;
  platform?: CalendarPlatform;
}

function CalendarPage() {
  const { active, activeTemplate, activeEvents, addEvent, moveEvent, removeEvent } = useCampaigns();
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());
  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState<RBCEvent | null>(null);
  const [form, setForm] = useState({ title: "", platform: "TikTok" as CalendarPlatform, date: new Date().toISOString().slice(0, 10) });

  // Hooks must run unconditionally on every render (Rules of Hooks) — the
  // "no active campaign" early return has to come AFTER all hooks, not
  // before, or React throws "rendered fewer/more hooks than expected" the
  // moment a campaign gets created and this component re-renders past it.
  const anchor = useMemo(() => {
    const d = new Date(active?.startDate ?? "");
    return isNaN(d.getTime()) ? new Date() : d;
  }, [active?.startDate]);

  const milestoneEvents: RBCEvent[] = useMemo(
    () =>
      (activeTemplate?.timeline ?? []).map((t, i) => {
        const d = resolveMilestoneDate(t.date, anchor);
        return { id: `m-${i}`, title: `${t.title} · ${t.channel}`, start: d, end: d, allDay: true, color: milestoneColor, editable: false };
      }),
    [activeTemplate, anchor],
  );

  const postEvents: RBCEvent[] = useMemo(
    () =>
      activeEvents.map((e) => {
        const d = new Date(e.date);
        return { id: e.id, title: `${e.platform} · ${e.title}`, start: d, end: d, allDay: true, color: platformColor[e.platform], editable: true, platform: e.platform };
      }),
    [activeEvents],
  );

  const events = [...milestoneEvents, ...postEvents];

  if (!active) {
    return (
      <AppShell>
        <EmptyState title="No campaign yet" note="Create a campaign to plan its content calendar and rollout timeline." />
      </AppShell>
    );
  }

  const onEventDrop: withDragAndDropProps<RBCEvent>["onEventDrop"] = ({ event, start }) => {
    if (!event.editable) return; // milestones are reference-only, not draggable
    moveEvent(event.id, (start as Date).toISOString().slice(0, 10));
  };

  function submitAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    addEvent({ title: form.title.trim(), platform: form.platform, date: form.date });
    setForm({ title: "", platform: "TikTok", date: form.date });
    setAdding(false);
  }

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">Rollout · {active.artist}</div>
          <h1 className="mt-1 font-display text-3xl font-bold">Content <span className="text-gradient-neon">Calendar</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">{active.title}{activeTemplate ? ` · ${activeTemplate.name} template` : ""} — drag any platform post to reschedule it.</p>
        </div>
        <button onClick={() => setAdding((a) => !a)} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black"><Plus className="h-4 w-4" /> Add post</button>
      </header>

      {adding && (
        <SpotlightCard className="mt-4 p-4" spotlight={false}>
          <form onSubmit={submitAdd} className="grid grid-cols-12 items-end gap-3">
            <div className="col-span-12 sm:col-span-5">
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">What's posting</label>
              <input autoFocus value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Teaser clip, BTS reel…" className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40" />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Platform</label>
              <select value={form.platform} onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value as CalendarPlatform }))} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none">
                {PLATFORMS.map((p) => <option key={p} className="bg-[#0a0a0c]">{p}</option>)}
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40" />
            </div>
            <div className="col-span-12 sm:col-span-1">
              <button type="submit" className="w-full rounded-full bg-white py-2 text-sm font-semibold text-black">Add</button>
            </div>
          </form>
        </SpotlightCard>
      )}

      <SpotlightCard className="mt-6 p-4 sm:p-6" spotlight={false}>
        <div className="mb-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: milestoneColor }} /> Rollout milestone (reference)</span>
          {PLATFORMS.map((p) => (
            <span key={p} className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: platformColor[p] }} /> {p}</span>
          ))}
        </div>
        <div style={{ height: 640 }}>
          <DnDCalendar
            className="rippl-calendar"
            localizer={localizer}
            events={events}
            date={date}
            onNavigate={setDate}
            view={view}
            onView={setView}
            views={["month", "week", "agenda"]}
            popup
            draggableAccessor={(e) => e.editable}
            resizable={false}
            onEventDrop={onEventDrop}
            onSelectEvent={(e) => setSelected(e)}
            eventPropGetter={(e) => ({ style: { background: e.color, color: "#000", opacity: e.editable ? 1 : 0.85 } })}
          />
        </div>
      </SpotlightCard>

      {selected && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4" onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()} className="glass-strong w-full max-w-sm rounded-2xl p-5">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{selected.editable ? selected.platform : "Rollout milestone"}</div>
            <div className="mt-1 text-lg font-semibold">{selected.title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{format(selected.start, "EEEE, MMM d, yyyy")}</div>
            <div className="mt-4 flex justify-end gap-2">
              {selected.editable && (
                <button onClick={() => { removeEvent(selected.id); setSelected(null); }} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
              )}
              <button onClick={() => setSelected(null)} className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">Close</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
