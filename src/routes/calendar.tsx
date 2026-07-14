import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { EmptyState } from "@/components/EmptyState";
import { useCampaigns } from "@/lib/campaign-store";
import { Music, Video, Repeat2, Megaphone, Disc3, CalendarClock } from "lucide-react";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar · RIPPL" }, { name: "description", content: "Release timeline and rollout." }] }),
  component: CalendarPage,
});

const typeIcon: Record<string, any> = { Single: Music, Video, Remix: Repeat2, Announce: Megaphone, Album: Disc3, Event: CalendarClock };

function CalendarPage() {
  const { active, activeTemplate } = useCampaigns();

  if (!active) {
    return (
      <AppShell>
        <EmptyState title="No campaign yet" note="Create a campaign to plan its release calendar and rollout timeline." />
      </AppShell>
    );
  }

  const timeline = activeTemplate?.timeline ?? [];

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">Rollout · {active.artist}</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Release <span className="text-gradient-neon">Calendar</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">{active.title}{activeTemplate ? ` · ${activeTemplate.name} template` : ""} · {active.startDate} → {active.endDate}</p>
      </header>

      {timeline.length === 0 ? (
        <SpotlightCard className="mt-6 p-10 text-center" spotlight={false}>
          <p className="text-sm text-muted-foreground">No timeline for this campaign. Create one from a template to seed a rollout schedule.</p>
        </SpotlightCard>
      ) : (
        <section className="mt-6">
          <SpotlightCard className="p-6">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Release Timeline</div>
            <h2 className="mt-1 font-display text-2xl font-bold">Rollout Schedule</h2>
            <div className="relative mt-6 pl-6">
              <div className="absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-[oklch(0.7_0.28_328)]/60 via-white/15 to-transparent" />
              <div className="space-y-5">
                {timeline.map((t, i) => {
                  const Icon = typeIcon[t.type] ?? Music;
                  return (
                    <div key={i} className="relative">
                      <div className="absolute -left-[1.35rem] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-[oklch(0.7_0.28_328)]/60 bg-transparent" />
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
      )}
    </AppShell>
  );
}
