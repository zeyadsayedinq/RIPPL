import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useCampaigns } from "@/lib/campaign-store";
import { releaseTimeline, narrativeArcs, latifaTracks } from "@/lib/campaign-data";
import { Music, Video, Repeat2, Megaphone, Disc3, CalendarClock } from "lucide-react";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar · RIPPL" }, { name: "description", content: "Release timeline and rollout." }] }),
  component: CalendarPage,
});

const typeIcon: Record<string, any> = { Single: Music, Video, Remix: Repeat2, Announce: Megaphone, Album: Disc3, Event: CalendarClock };
const statusColor: Record<string, string> = { done: "oklch(0.85 0.18 150)", active: "oklch(0.85 0.18 200)", upcoming: "oklch(0.6 0.02 260)" };

function CalendarPage() {
  const { active } = useCampaigns();
  const isLatifa = active.id === "latifa-story-of-us";

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">Rollout · {active.artist}</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Release <span className="text-gradient-neon">Calendar</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">{active.title} · one commercial single every ~3 weeks, then full album</p>
      </header>

      {/* Narrative arcs (album story) */}
      {isLatifa && (
        <section className="mt-6">
          <SpotlightCard className="p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Album Story Arc</div>
            <h2 className="mt-1 font-display text-2xl font-bold">The Story of Us — من أولها لآخرها</h2>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {narrativeArcs.map((a) => (
                <div key={a.name} className="glass rounded-xl p-3">
                  <div className="h-1 w-8 rounded" style={{ background: a.color }} />
                  <div className="mt-2 text-sm font-semibold">{a.name}</div>
                  <div className="text-[11px] text-muted-foreground">Tracks {a.tracks}</div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* Timeline */}
      <section className="mt-6">
        <SpotlightCard className="p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Release Timeline</div>
          <h2 className="mt-1 font-display text-2xl font-bold">Rollout Schedule</h2>
          <div className="relative mt-6 pl-6">
            <div className="absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-[oklch(0.7_0.28_328)]/60 via-white/15 to-transparent" />
            <div className="space-y-5">
              {(isLatifa ? releaseTimeline : genericTimeline(active.startDate, active.endDate)).map((t, i) => {
                const Icon = typeIcon[t.type] ?? Music;
                return (
                  <div key={i} className="relative">
                    <div className="absolute -left-[1.35rem] top-1 grid h-4 w-4 place-items-center rounded-full border-2" style={{ borderColor: statusColor[t.status], background: t.status === "done" ? statusColor[t.status] : "transparent" }} />
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-xs text-[oklch(0.85_0.25_328)]">{t.date}</span>
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-semibold">{t.title}</span>
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{t.type}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{t.channel}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* Track list (Latifa) */}
      {isLatifa && (
        <section className="mt-6">
          <SpotlightCard className="p-6" spotlight={false}>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">12 Tracks · 2 Phases</div>
            <h2 className="mt-1 font-display text-2xl font-bold">Track-by-Track Plan</h2>
            <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2">
              {latifaTracks.map((t) => (
                <div key={t.n} className="glass flex items-start gap-3 rounded-xl p-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold" style={{ background: t.phase === 1 ? "oklch(0.7 0.28 328 / 0.2)" : "oklch(0.55 0.3 300 / 0.2)" }}>{t.n}</div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">{t.title}</span>
                      <span className="text-xs text-muted-foreground" dir="rtl">{t.titleAr}</span>
                      <span className="rounded-full px-2 py-0.5 text-[10px]" style={{ background: t.phase === 1 ? "oklch(0.7 0.28 328 / 0.15)" : "oklch(0.55 0.3 300 / 0.15)", color: t.phase === 1 ? "oklch(0.85 0.2 328)" : "oklch(0.75 0.2 300)" }}>{t.tag}</span>
                    </div>
                    <div className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{t.focus.join(" · ")}</div>
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </section>
      )}
    </AppShell>
  );
}

/* fallback timeline for non-Latifa campaigns */
function genericTimeline(start: string, end: string) {
  return [
    { date: start, title: "Campaign kickoff — announce + teaser", type: "Announce", status: "done", channel: "All platforms" },
    { date: "+3 wks", title: "Lead single + music video", type: "Single", status: "active", channel: "TikTok · YouTube" },
    { date: "+6 wks", title: "Paid amplification + playlist push", type: "Single", status: "upcoming", channel: "Paid · Spotify" },
    { date: "+9 wks", title: "Press & radio wave", type: "Event", status: "upcoming", channel: "PR · Radio" },
    { date: end, title: "Campaign wrap + recap report", type: "Album", status: "upcoming", channel: "Reporting" },
  ] as const;
}
