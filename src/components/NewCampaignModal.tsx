import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { Portal } from "@/components/Portal";
import { useCampaigns } from "@/lib/campaign-store";

const PLATFORMS = ["TikTok", "Instagram", "YouTube", "Facebook", "X", "Anghami", "Spotify", "Radio", "TV"];
const field = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-[oklch(0.7_0.28_328)]/40";

export function ModalShell({ title, eyebrow, onClose, children }: { title: string; eyebrow: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 text-left"
        >
          <button onClick={onClose} className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-white">✕</button>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</div>
          <h3 className="mt-1 font-display text-2xl font-bold">{title}</h3>
          <div className="mt-5">{children}</div>
        </motion.div>
      </motion.div>
    </Portal>
  );
}

export function NewCampaignModal({ onClose }: { onClose: () => void }) {
  const { addCampaign, allTemplates } = useCampaigns();
  const campaignTemplates = allTemplates;
  const [saved, setSaved] = useState<null | string>(null);
  const [picked, setPicked] = useState<string[]>(["TikTok", "Instagram", "YouTube"]);
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [goal, setGoal] = useState("Streams & chart performance");
  const [templateId, setTemplateId] = useState("single-release");
  const toggle = (p: string) => setPicked((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));
  const chosenTemplate = campaignTemplates.find((t) => t.id === templateId);

  if (saved) {
    return (
      <ModalShell eyebrow="Campaign created" title="You're all set" onClose={onClose}>
        <div className="flex items-start gap-3 rounded-xl border border-[oklch(0.85_0.18_150)]/30 bg-[oklch(0.85_0.18_150)]/10 p-4 text-sm">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.85_0.18_150)]" />
          <span><b>{saved}</b> is now your active campaign across {picked.length} platform{picked.length !== 1 ? "s" : ""}. It’s saved and will persist after refresh. Open the Tasks tab to work the release checklist.</span>
        </div>
        <div className="mt-5 flex justify-end"><MagneticButton onClick={onClose}>Done</MagneticButton></div>
      </ModalShell>
    );
  }

  return (
    <ModalShell eyebrow="New campaign" title="Launch a 360 campaign" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const b = Number(budget) || 0;
          addCampaign({
            artist: artist || "Untitled Artist",
            title: title || "New Campaign",
            subtitle: `${goal} · ${picked.length} platforms`,
            status: "Planning",
            budget: b, spent: 0,
            startDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
            endDate: "TBC",
            platforms: picked,
            goal,
            reach: "—",
            templateId,
          });
          setSaved(`${artist || "Untitled Artist"} — ${title || "New Campaign"}`);
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">Artist / Brand</label>
            <input required value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="e.g. Latifa" className={field} />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">Campaign name</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Lead single rollout" className={field} />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">Total budget (EGP)</label>
            <input required type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="250000" className={field} />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">Primary goal</label>
            <select className={field} value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option className="bg-[#140a1e]">Streams & chart performance</option>
              <option className="bg-[#140a1e]">Followers & audience growth</option>
              <option className="bg-[#140a1e]">Playlist & editorial reach</option>
              <option className="bg-[#140a1e]">Press & critical acclaim</option>
              <option className="bg-[#140a1e]">Conversions & sales</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">Start from template</label>
          <select className={field} value={templateId} onChange={(e) => setTemplateId(e.target.value)}>
            {campaignTemplates.map((t) => (
              <option key={t.id} value={t.id} className="bg-[#140a1e]">{t.name}</option>
            ))}
          </select>
          {chosenTemplate && (
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground/80">
              {chosenTemplate.description}
              {chosenTemplate.checklist.length > 0 && ` · seeds ${chosenTemplate.checklist.reduce((n, p) => n + p.items.length, 0)} checklist tasks`}
            </p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">Target channels</label>
          <div className="flex flex-wrap gap-1.5">
            {PLATFORMS.map((p) => {
              const on = picked.includes(p);
              return (
                <button type="button" key={p} onClick={() => toggle(p)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${on ? "border-[oklch(0.7_0.28_328)] bg-[oklch(0.7_0.28_328)]/20 text-white" : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-white"}`}>
                  {p}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white">Cancel</button>
          <MagneticButton>Create campaign</MagneticButton>
        </div>
      </form>
    </ModalShell>
  );
}
