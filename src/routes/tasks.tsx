import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useCampaigns } from "@/lib/campaign-store";
import { EmptyState } from "@/components/EmptyState";
import { Check } from "lucide-react";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "Tasks · RIPPL" }, { name: "description", content: "Release checklist." }] }),
  component: TasksPage,
});

function TasksPage() {
  const { active, activeChecklist, activeTemplate, isTaskDone, toggleTask, taskProgress } = useCampaigns();

  if (!active || activeChecklist.length === 0) {
    return (
      <AppShell>
        <EmptyState
          title={active ? "No checklist for this campaign" : "No campaign yet"}
          note={active ? "This campaign was created from a blank template. Create a new one from a template to seed a release checklist." : "Create a campaign to work its release checklist."}
        />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">Release Checklist · {active.artist}</div>
          <h1 className="mt-1 font-display text-3xl font-bold">Campaign <span className="text-gradient-neon">Tasks</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">{activeTemplate ? `${activeTemplate.name} template · ${activeTemplate.source}` : "Rollout checklist"} · progress saves automatically.</p>
        </div>
        <div className="glass grid place-items-center rounded-2xl px-6 py-4 text-center">
          <div className="font-display text-4xl font-bold text-gradient-neon">{taskProgress}%</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Complete</div>
        </div>
      </header>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)] transition-all duration-500" style={{ width: `${taskProgress}%` }} />
      </div>

      <section className="mt-6 grid grid-cols-12 gap-4">
        {activeChecklist.map((phase) => {
          const done = phase.items.filter((i) => isTaskDone(i.id)).length;
          return (
            <SpotlightCard key={phase.phase} className="col-span-12 md:col-span-6 xl:col-span-4 p-5" spotlight={false}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Phase {phase.phase}</div>
                <span className="font-mono text-xs text-muted-foreground">{done}/{phase.items.length}</span>
              </div>
              <div className="mt-4 space-y-1.5">
                {phase.items.map((item) => {
                  const checked = isTaskDone(item.id);
                  return (
                    <button key={item.id} onClick={() => toggleTask(item.id)} className="flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-white/[0.03]">
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${checked ? "border-[oklch(0.7_0.28_328)] bg-[oklch(0.7_0.28_328)]" : "border-white/20"}`}>
                        {checked && <Check className="h-3.5 w-3.5 text-white" />}
                      </span>
                      <span className={`text-sm leading-snug ${checked ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </SpotlightCard>
          );
        })}
      </section>
    </AppShell>
  );
}
