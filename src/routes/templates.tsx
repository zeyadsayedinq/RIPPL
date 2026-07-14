import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { ModalShell } from "@/components/NewCampaignModal";
import { campaignTemplates, type CampaignTemplate } from "@/lib/campaign-templates";
import { FileText, ListChecks, CalendarClock, Radio } from "lucide-react";

export const Route = createFileRoute("/templates")({
  head: () => ({ meta: [{ title: "Templates · RIPPL" }, { name: "description", content: "Campaign templates from proven marketing plans." }] }),
  component: TemplatesPage,
});

function TemplatesPage() {
  const [preview, setPreview] = useState<CampaignTemplate | null>(null);

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">Knowledge Library</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Campaign <span className="text-gradient-neon">Templates</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Reusable rollout playbooks extracted from real marketing plans. Pick one when you create a campaign to seed its checklist, timeline and channel plan.</p>
      </header>

      <section className="mt-6 grid grid-cols-12 gap-4">
        {campaignTemplates.filter((t) => t.id !== "blank").map((t) => {
          const tasks = t.checklist.reduce((n, p) => n + p.items.length, 0);
          const chans = t.channels.social.length + t.channels.paid.length + t.channels.playlists.length + t.channels.press.length + t.channels.radio.length;
          return (
            <SpotlightCard key={t.id} className="col-span-12 md:col-span-6 xl:col-span-4 p-5">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-[oklch(0.7_0.28_328)]/15">
                  <FileText className="h-4 w-4 text-[oklch(0.8_0.25_328)]" />
                </div>
                <div className="font-display text-lg font-bold">{t.name}</div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1"><ListChecks className="h-3 w-3" /> {tasks} tasks</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1"><CalendarClock className="h-3 w-3" /> {t.timeline.length} milestones</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1"><Radio className="h-3 w-3" /> {chans} channels</span>
              </div>
              <div className="mt-3 text-[11px] text-muted-foreground/70">Source: {t.source}</div>
              <div className="mt-4">
                <MagneticButton variant="ghost" onClick={() => setPreview(t)}>Preview template</MagneticButton>
              </div>
            </SpotlightCard>
          );
        })}
      </section>

      <AnimatePresence>
        {preview && (
          <ModalShell eyebrow={`Template · ${preview.source}`} title={preview.name} onClose={() => setPreview(null)}>
            <p className="text-sm text-muted-foreground">{preview.description}</p>
            <p className="mt-2 text-xs text-muted-foreground/70"><b>Best for:</b> {preview.bestFor}</p>

            {preview.checklist.length > 0 && (
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Checklist</div>
                <div className="mt-2 space-y-3">
                  {preview.checklist.map((ph) => (
                    <div key={ph.phase}>
                      <div className="text-xs font-semibold">{ph.phase}</div>
                      <ul className="mt-1 space-y-0.5">
                        {ph.items.map((it) => (
                          <li key={it.id} className="text-[13px] text-muted-foreground">• {it.label}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {preview.timeline.length > 0 && (
              <div className="mt-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Timeline</div>
                <ul className="mt-2 space-y-1">
                  {preview.timeline.map((t, i) => (
                    <li key={i} className="text-[13px] text-muted-foreground"><span className="font-mono text-[oklch(0.85_0.25_328)]">{t.date}</span> — {t.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </ModalShell>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
