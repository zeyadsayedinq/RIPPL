import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { ModalShell } from "@/components/NewCampaignModal";
import { useCampaigns } from "@/lib/campaign-store";
import { type CampaignTemplate } from "@/lib/campaign-templates";
import { FileText, ListChecks, CalendarClock, Radio, Pencil, Copy, Trash2, Plus, X } from "lucide-react";

export const Route = createFileRoute("/templates")({
  head: () => ({ meta: [{ title: "Templates · RIPPL" }, { name: "description", content: "Customizable campaign templates." }] }),
  component: TemplatesPage,
});

const uid = () => `custom-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
function blankTemplate(): CampaignTemplate {
  return { id: uid(), name: "New Template", source: "Custom", description: "Your custom playbook.", bestFor: "—", checklist: [{ phase: "Phase 1", items: [] }], timeline: [], channels: { social: [], paid: [], playlists: [], press: [], radio: [] } };
}
function duplicate(t: CampaignTemplate): CampaignTemplate {
  return { ...structuredClone(t), id: uid(), name: `${t.name} (copy)`, source: "Custom" };
}

function TemplatesPage() {
  const { allTemplates, customTemplates, saveTemplate, deleteTemplate } = useCampaigns();
  const [editing, setEditing] = useState<CampaignTemplate | null>(null);
  const isCustom = (id: string) => customTemplates.some((t) => t.id === id);

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Knowledge Library</div>
          <h1 className="mt-1 font-display text-3xl font-bold">Campaign <span className="text-gradient-neon">Templates</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">Reusable infrastructure, checklists & ideas — duplicate, edit, remove items, or build your own.</p>
        </div>
        <MagneticButton onClick={() => setEditing(blankTemplate())}><Plus className="h-4 w-4" /> New template</MagneticButton>
      </header>

      <section className="mt-6 grid grid-cols-12 gap-4">
        {allTemplates.filter((t) => t.id !== "blank").map((t) => {
          const tasks = t.checklist.reduce((n, p) => n + p.items.length, 0);
          const chans = t.channels.social.length + t.channels.paid.length + t.channels.playlists.length + t.channels.press.length + t.channels.radio.length;
          const custom = isCustom(t.id);
          return (
            <SpotlightCard key={t.id} className="col-span-12 md:col-span-6 xl:col-span-4 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"><FileText className="h-4 w-4 text-white/60" /></div>
                  <div className="font-display text-lg font-bold">{t.name}</div>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider" style={{ background: custom ? "oklch(0.82 0.18 150 / 0.15)" : "rgba(255,255,255,0.06)", color: custom ? "oklch(0.85 0.18 150)" : "rgba(255,255,255,0.5)" }}>{custom ? "Custom" : "Built-in"}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1"><ListChecks className="h-3 w-3" /> {tasks} tasks</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1"><CalendarClock className="h-3 w-3" /> {t.timeline.length} milestones</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1"><Radio className="h-3 w-3" /> {chans} channels</span>
              </div>
              <div className="mt-4 flex gap-2">
                {custom ? (
                  <>
                    <button onClick={() => setEditing(structuredClone(t))} className="glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs hover:bg-white/5"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                    <button onClick={() => { if (confirm(`Delete "${t.name}"?`)) deleteTemplate(t.id); }} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[oklch(0.7_0.2_20)]/40 px-3 py-2 text-xs text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10"><Trash2 className="h-3.5 w-3.5" /></button>
                  </>
                ) : (
                  <button onClick={() => saveTemplate(duplicate(t))} className="glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs hover:bg-white/5"><Copy className="h-3.5 w-3.5" /> Duplicate & edit</button>
                )}
              </div>
            </SpotlightCard>
          );
        })}
      </section>

      <AnimatePresence>
        {editing && <TemplateEditor draft={editing} onClose={() => setEditing(null)} onSave={(t) => { saveTemplate(t); setEditing(null); }} />}
      </AnimatePresence>
    </AppShell>
  );
}

const inp = "w-full rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-sm outline-none focus:border-white/40";

function TemplateEditor({ draft, onClose, onSave }: { draft: CampaignTemplate; onClose: () => void; onSave: (t: CampaignTemplate) => void }) {
  const [t, setT] = useState<CampaignTemplate>(draft);
  const patch = (p: Partial<CampaignTemplate>) => setT((s) => ({ ...s, ...p }));

  // checklist helpers
  const addPhase = () => patch({ checklist: [...t.checklist, { phase: `Phase ${t.checklist.length + 1}`, items: [] }] });
  const removePhase = (pi: number) => patch({ checklist: t.checklist.filter((_, i) => i !== pi) });
  const renamePhase = (pi: number, v: string) => patch({ checklist: t.checklist.map((ph, i) => i === pi ? { ...ph, phase: v } : ph) });
  const addItem = (pi: number, label: string) => patch({ checklist: t.checklist.map((ph, i) => i === pi ? { ...ph, items: [...ph.items, { id: uid(), label, done: false }] } : ph) });
  const removeItem = (pi: number, id: string) => patch({ checklist: t.checklist.map((ph, i) => i === pi ? { ...ph, items: ph.items.filter((x) => x.id !== id) } : ph) });

  // timeline
  const addMilestone = (date: string, title: string) => patch({ timeline: [...t.timeline, { date, title, type: "Event", channel: "—" }] });
  const removeMilestone = (idx: number) => patch({ timeline: t.timeline.filter((_, i) => i !== idx) });

  return (
    <ModalShell eyebrow={draft.source === "Custom" ? "Edit template" : "Template"} title="Template editor" onClose={onClose}>
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3">
          <div><label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Name</label><input className={inp} value={t.name} onChange={(e) => patch({ name: e.target.value })} /></div>
          <div><label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Description</label><input className={inp} value={t.description} onChange={(e) => patch({ description: e.target.value })} /></div>
        </div>

        {/* Checklist */}
        <div>
          <div className="flex items-center justify-between"><div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Checklist</div><button onClick={addPhase} className="text-xs text-white/60 hover:text-white">+ phase</button></div>
          <div className="mt-2 space-y-3">
            {t.checklist.map((ph, pi) => (
              <div key={pi} className="rounded-xl border border-white/8 p-3">
                <div className="flex items-center gap-2">
                  <input className={`${inp} font-semibold`} value={ph.phase} onChange={(e) => renamePhase(pi, e.target.value)} />
                  <button onClick={() => removePhase(pi)} className="text-muted-foreground hover:text-[oklch(0.7_0.2_20)]"><Trash2 className="h-4 w-4" /></button>
                </div>
                <ul className="mt-2 space-y-1">
                  {ph.items.map((it) => (
                    <li key={it.id} className="flex items-center gap-2 text-sm">
                      <span className="flex-1 text-muted-foreground">{it.label}</span>
                      <button onClick={() => removeItem(pi, it.id)} className="text-muted-foreground hover:text-[oklch(0.7_0.2_20)]"><X className="h-3.5 w-3.5" /></button>
                    </li>
                  ))}
                </ul>
                <AddInline placeholder="Add task…" onAdd={(v) => addItem(pi, v)} />
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Timeline</div>
          <ul className="mt-2 space-y-1">
            {t.timeline.map((m, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="font-mono text-[oklch(0.85_0.25_328)]">{m.date}</span>
                <span className="flex-1 text-muted-foreground">{m.title}</span>
                <button onClick={() => removeMilestone(i)} className="text-muted-foreground hover:text-[oklch(0.7_0.2_20)]"><X className="h-3.5 w-3.5" /></button>
              </li>
            ))}
          </ul>
          <AddMilestone onAdd={addMilestone} />
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button onClick={onClose} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white">Cancel</button>
          <MagneticButton onClick={() => onSave(t)}>Save template</MagneticButton>
        </div>
      </div>
    </ModalShell>
  );
}

function AddInline({ placeholder, onAdd }: { placeholder: string; onAdd: (v: string) => void }) {
  const [v, setV] = useState("");
  return (
    <div className="mt-2 flex gap-2">
      <input className={inp} value={v} placeholder={placeholder} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && v.trim()) { onAdd(v.trim()); setV(""); } }} />
      <button onClick={() => { if (v.trim()) { onAdd(v.trim()); setV(""); } }} className="glass grid h-8 w-8 shrink-0 place-items-center rounded-lg hover:bg-white/5"><Plus className="h-4 w-4" /></button>
    </div>
  );
}
function AddMilestone({ onAdd }: { onAdd: (date: string, title: string) => void }) {
  const [d, setD] = useState(""); const [ti, setTi] = useState("");
  return (
    <div className="mt-2 flex gap-2">
      <input className={`${inp} w-24 shrink-0`} value={d} placeholder="Wk 0" onChange={(e) => setD(e.target.value)} />
      <input className={inp} value={ti} placeholder="Milestone…" onChange={(e) => setTi(e.target.value)} />
      <button onClick={() => { if (ti.trim()) { onAdd(d.trim() || "—", ti.trim()); setD(""); setTi(""); } }} className="glass grid h-8 w-8 shrink-0 place-items-center rounded-lg hover:bg-white/5"><Plus className="h-4 w-4" /></button>
    </div>
  );
}
