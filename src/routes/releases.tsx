import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { ModalShell } from "@/components/NewCampaignModal";
import { useOS, uid, type ContentId, type Release } from "@/lib/os-store";
import { useCampaigns } from "@/lib/campaign-store";
import { releaseOnePagerPdf } from "@/lib/pdf";
import { Disc3, Check, Music, Image as ImageIcon, ListChecks, SlidersHorizontal, FileDown, Pencil, Trash2, Link2 } from "lucide-react";
import { SharedBadge } from "@/components/SharedBadge";

export const Route = createFileRoute("/releases")({
  head: () => ({ meta: [{ title: "Releases · RIPPL OS" }, { name: "description", content: "Distribution & label operations." }] }),
  component: ReleasesPage,
});

const field = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-white/40";
const lbl = "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground";
const cidColor: Record<ContentId, string> = { red: "oklch(0.65 0.24 20)", yellow: "oklch(0.82 0.16 90)", green: "oklch(0.82 0.18 150)" };

function ReleasesPage() {
  const { releases, update, isShared, canEdit } = useOS();
  const { campaigns } = useCampaigns();
  const [wizard, setWizard] = useState(false);
  const [editing, setEditing] = useState<Release | null>(null);
  const campaignName = (id?: string) => campaigns.find((c) => c.id === id)?.title;

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Distribution · The Engine</div>
          <h1 className="mt-1 font-display text-3xl font-bold">Releases <span className="text-gradient-neon">Catalog</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">{releases.length} releases · {releases.filter((r) => r.status === "Live").length} live</p>
        </div>
        <MagneticButton onClick={() => setWizard(true)}><Disc3 className="h-4 w-4" /> New Release</MagneticButton>
      </header>

      <SpotlightCard className="mt-6 p-6" spotlight={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead><tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <th className="pb-3">Title</th><th className="pb-3">Artist</th><th className="pb-3">ISRC</th><th className="pb-3">Release</th><th className="pb-3">DSPs</th><th className="pb-3">Content ID</th><th className="pb-3">Campaign</th><th className="pb-3 text-right">Action</th>
            </tr></thead>
            <tbody>
              {releases.map((r) => (
                <tr key={r.id} onClick={() => canEdit(r.id) && setEditing(r)} className="cursor-pointer border-t border-white/[0.06] hover:bg-white/[0.02]">
                  <td className="py-3 font-medium">
                    <span className="inline-flex items-center gap-2">{r.title}{isShared(r.id) && <SharedBadge editable={canEdit(r.id)} />}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">{r.artist}</td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{r.isrc}</td>
                  <td className="py-3 text-muted-foreground">{r.releaseDate}</td>
                  <td className="py-3 text-xs text-muted-foreground">{[r.dsp.spotify && "Spotify", r.dsp.anghami && "Anghami", r.dsp.youtube && "YouTube"].filter(Boolean).join(", ") || "—"}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] capitalize" style={{ color: cidColor[r.contentId], background: cidColor[r.contentId] + "1a" }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: cidColor[r.contentId] }} />{r.contentId}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground">
                    {campaignName(r.campaignId) ? <span className="inline-flex items-center gap-1"><Link2 className="h-3 w-3" /> {campaignName(r.campaignId)}</span> : "—"}
                  </td>
                  <td className="py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="inline-flex items-center gap-1.5">
                      <button onClick={() => releaseOnePagerPdf(r)} title="Download one-pager PDF" className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5"><FileDown className="h-3.5 w-3.5" /> One-pager</button>
                      {canEdit(r.id) && (
                        <>
                          <button onClick={() => setEditing(r)} title="Edit release" className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                          <button
                            onClick={() => update("releases", (all) => all.map((x) => x.id === r.id ? { ...x, contentId: (x.contentId === "green" ? "yellow" : x.contentId === "yellow" ? "red" : "green") as ContentId } : x))}
                            className="glass rounded-full px-3 py-1.5 text-xs hover:bg-white/5"
                          >
                            Takedown
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {releases.length === 0 && <tr><td colSpan={8} className="py-8 text-center text-muted-foreground">No releases yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </SpotlightCard>

      <AnimatePresence>{wizard && <ReleaseWizard onClose={() => setWizard(false)} onCreate={(r) => update("releases", (all) => [r, ...all])} />}</AnimatePresence>
      <AnimatePresence>
        {editing && (
          <ReleaseEditModal
            release={editing}
            onClose={() => setEditing(null)}
            onSave={(r) => { update("releases", (all) => all.map((x) => (x.id === r.id ? r : x))); setEditing(null); }}
            onDelete={(id) => { update("releases", (all) => all.filter((x) => x.id !== id)); setEditing(null); }}
          />
        )}
      </AnimatePresence>
    </AppShell>
  );
}

/* ── Edit an existing release: full field edit + link/unlink a campaign ── */
function ReleaseEditModal({ release, onClose, onSave, onDelete }: { release: Release; onClose: () => void; onSave: (r: Release) => void; onDelete: (id: string) => void }) {
  const { campaigns } = useCampaigns();
  const [r, setR] = useState<Release>(release);
  const set = <K extends keyof Release>(k: K, v: Release[K]) => setR((s) => ({ ...s, [k]: v }));

  return (
    <ModalShell eyebrow="Distribution" title={`Edit — ${release.title}`} onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lbl}>Title</label><input className={field} value={r.title} onChange={(e) => set("title", e.target.value)} /></div>
          <div><label className={lbl}>Artist</label><input className={field} value={r.artist} onChange={(e) => set("artist", e.target.value)} /></div>
          <div><label className={lbl}>ISRC</label><input className={field} value={r.isrc} onChange={(e) => set("isrc", e.target.value)} /></div>
          <div><label className={lbl}>UPC</label><input className={field} value={r.upc} onChange={(e) => set("upc", e.target.value)} /></div>
          <div><label className={lbl}>Release date</label><input type="date" className={field} value={r.releaseDate === "TBC" ? "" : r.releaseDate} onChange={(e) => set("releaseDate", e.target.value)} /></div>
          <div>
            <label className={lbl}>Status</label>
            <select className={field} value={r.status} onChange={(e) => set("status", e.target.value as Release["status"])}>
              {(["Draft", "Scheduled", "Live"] as const).map((s) => <option key={s} className="bg-[#0a0a0c]">{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={lbl}>Content ID</label>
          <select className={field} value={r.contentId} onChange={(e) => set("contentId", e.target.value as ContentId)}>
            {(["green", "yellow", "red"] as const).map((c) => <option key={c} className="bg-[#0a0a0c] capitalize">{c}</option>)}
          </select>
        </div>

        <div>
          <label className={lbl}>Linked campaign</label>
          <select className={field} value={r.campaignId ?? ""} onChange={(e) => set("campaignId", e.target.value || undefined)}>
            <option value="" className="bg-[#0a0a0c]">— No campaign —</option>
            {campaigns.map((c) => <option key={c.id} value={c.id} className="bg-[#0a0a0c]">{c.artist} — {c.title}</option>)}
          </select>
        </div>

        <div>
          <label className={lbl}>DSPs</label>
          <div className="flex flex-wrap gap-2">
            {([["spotify", "Spotify"], ["anghami", "Anghami"], ["youtube", "YouTube"]] as const).map(([k, label]) => (
              <label key={k} className="glass flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-xs">
                <input type="checkbox" checked={r.dsp[k]} onChange={(e) => set("dsp", { ...r.dsp, [k]: e.target.checked })} className="h-3.5 w-3.5 accent-white" /> {label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={lbl}>Audio QA</label>
          <div className="flex flex-wrap gap-2">
            {([["atmos", "Dolby Atmos"], ["eq", "Master EQ"]] as const).map(([k, label]) => (
              <label key={k} className="glass flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-xs">
                <input type="checkbox" checked={r.qa[k]} onChange={(e) => set("qa", { ...r.qa, [k]: e.target.checked })} className="h-3.5 w-3.5 accent-white" /> {label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={() => onDelete(release.id)} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10"><Trash2 className="h-4 w-4" /> Delete</button>
        <div className="flex gap-2">
          <button onClick={onClose} className="rounded-full px-4 py-2.5 text-sm text-muted-foreground hover:text-white">Cancel</button>
          <MagneticButton onClick={() => onSave(r)}>Save changes</MagneticButton>
        </div>
      </div>
    </ModalShell>
  );
}

/* ── Release Wizard (4 steps) ───────────────────────────────── */
function ReleaseWizard({ onClose, onCreate }: { onClose: () => void; onCreate: (r: Release) => void }) {
  const { campaigns } = useCampaigns();
  const [step, setStep] = useState(1);
  const [f, setF] = useState<Record<string, string>>({});
  const [dsp, setDsp] = useState({ spotify: true, anghami: true, youtube: false });
  const [qa, setQa] = useState({ atmos: false, eq: false });
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  const steps = [
    { n: 1, label: "Audio & Metadata", icon: Music },
    { n: 2, label: "Assets", icon: ImageIcon },
    { n: 3, label: "DSP Pitching", icon: ListChecks },
    { n: 4, label: "Audio QA", icon: SlidersHorizontal },
  ];

  function finish() {
    onCreate({
      id: uid("r"), title: f.title || "Untitled", artist: f.primary || "—",
      isrc: f.isrc || "—", upc: f.upc || "—", releaseDate: f.date || "TBC",
      contentId: "yellow", status: "Draft", dsp, qa,
      campaignId: f.campaignId || undefined,
    });
    onClose();
  }

  return (
    <ModalShell eyebrow="Distribution" title="Release Wizard" onClose={onClose}>
      {/* stepper */}
      <div className="mb-5 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.n} className="flex flex-1 items-center gap-2">
            <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs ${step >= s.n ? "border-white bg-white text-black" : "border-white/20 text-muted-foreground"}`}>
              {step > s.n ? <Check className="h-4 w-4" /> : s.n}
            </div>
            {i < steps.length - 1 && <div className={`h-px flex-1 ${step > s.n ? "bg-white/60" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>
      <div className="mb-4 text-sm font-semibold">{steps[step - 1].label}</div>

      {step === 1 && (
        <div className="space-y-4">
          <div><label className={lbl}>Audio file (WAV/MP3)</label><input type="file" accept="audio/*" className={field} onChange={(e) => set("audio", e.target.files?.[0]?.name || "")} />{f.audio && <div className="mt-1 text-[11px] text-muted-foreground">{f.audio}</div>}</div>
          <div><label className={lbl}>Track title</label><input className={field} value={f.title || ""} onChange={(e) => set("title", e.target.value)} placeholder="Sorry" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>ISRC</label><input className={field} value={f.isrc || ""} onChange={(e) => set("isrc", e.target.value)} placeholder="EGA0125..." /></div>
            <div><label className={lbl}>UPC</label><input className={field} value={f.upc || ""} onChange={(e) => set("upc", e.target.value)} placeholder="197..." /></div>
            <div><label className={lbl}>Primary artist</label><input className={field} value={f.primary || ""} onChange={(e) => set("primary", e.target.value)} placeholder="Latifa" /></div>
            <div><label className={lbl}>Secondary artist(s)</label><input className={field} value={f.secondary || ""} onChange={(e) => set("secondary", e.target.value)} placeholder="feat. …" /></div>
          </div>
          <div><label className={lbl}>Release date</label><input type="date" className={field} value={f.date || ""} onChange={(e) => set("date", e.target.value)} /></div>
          <div>
            <label className={lbl}>Link to campaign (optional)</label>
            <select className={field} value={f.campaignId || ""} onChange={(e) => set("campaignId", e.target.value)}>
              <option value="" className="bg-[#0a0a0c]">— No campaign —</option>
              {campaigns.map((c) => <option key={c.id} value={c.id} className="bg-[#0a0a0c]">{c.artist} — {c.title}</option>)}
            </select>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <div><label className={lbl}>Cover art (3000×3000)</label><input type="file" accept="image/*" className={field} onChange={(e) => set("cover", e.target.files?.[0]?.name || "")} />{f.cover && <div className="mt-1 text-[11px] text-muted-foreground">{f.cover}</div>}</div>
          <div><label className={lbl}>Canvas (looping video)</label><input type="file" accept="video/*" className={field} onChange={(e) => set("canvas", e.target.files?.[0]?.name || "")} />{f.canvas && <div className="mt-1 text-[11px] text-muted-foreground">{f.canvas}</div>}</div>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Pitch to DSP editorial teams:</div>
          {([["spotify", "Spotify"], ["anghami", "Anghami"], ["youtube", "YouTube"]] as const).map(([k, label]) => (
            <label key={k} className="glass flex cursor-pointer items-center justify-between rounded-xl p-3">
              <span className="text-sm">{label}</span>
              <input type="checkbox" checked={dsp[k]} onChange={(e) => setDsp((s) => ({ ...s, [k]: e.target.checked }))} className="h-4 w-4 accent-white" />
            </label>
          ))}
        </div>
      )}
      {step === 4 && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Audio supervision sign-off:</div>
          {([["atmos", "Dolby Atmos Mix approved"], ["eq", "Master EQ checked"]] as const).map(([k, label]) => (
            <label key={k} className="glass flex cursor-pointer items-center justify-between rounded-xl p-3">
              <span className="text-sm">{label}</span>
              <button type="button" onClick={() => setQa((s) => ({ ...s, [k]: !s[k] }))} className={`relative h-6 w-11 rounded-full transition-colors ${qa[k] ? "bg-[oklch(0.82_0.18_150)]" : "bg-white/15"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${qa[k] ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </label>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button onClick={() => (step === 1 ? onClose() : setStep((s) => s - 1))} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white">{step === 1 ? "Cancel" : "Back"}</button>
        {step < 4 ? <MagneticButton onClick={() => setStep((s) => s + 1)}>Next</MagneticButton> : <MagneticButton onClick={finish}>Create release</MagneticButton>}
      </div>
    </ModalShell>
  );
}
