import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { ModalShell } from "@/components/NewCampaignModal";
import { useOS, uid, type SprintCol } from "@/lib/os-store";
import { Rocket, Copy, Check, ChevronDown, Plus, Sparkles, Shuffle, Save } from "lucide-react";

export const Route = createFileRoute("/techlab")({
  head: () => ({ meta: [{ title: "Tech Lab · RIPPL OS" }, { name: "description", content: "AI & SaaS project ops." }] }),
  component: TechLab,
});

const COLS: SprintCol[] = ["Backlog", "In Progress", "Done"];
const deployColor: Record<string, string> = { Building: "oklch(0.82 0.16 90)", Ready: "oklch(0.82 0.18 150)", Error: "oklch(0.65 0.24 20)" };

function TechLab() {
  const { projects, prompts, update } = useOS();
  const [drag, setDrag] = useState<{ pid: string; tid: string } | null>(null);
  const [enhancer, setEnhancer] = useState(false);

  function move(pid: string, tid: string, col: SprintCol) {
    update("projects", (all) => all.map((p) => p.id === pid ? { ...p, tasks: p.tasks.map((t) => t.id === tid ? { ...t, col } : t) } : p));
  }
  function addTask(pid: string) {
    const title = prompt("New task"); if (!title) return;
    update("projects", (all) => all.map((p) => p.id === pid ? { ...p, tasks: [...p.tasks, { id: uid("t"), title, col: "Backlog" as SprintCol }] } : p));
  }
  function cycleDeploy(pid: string) {
    update("projects", (all) => all.map((p) => p.id === pid ? { ...p, deploy: p.deploy === "Ready" ? "Building" : p.deploy === "Building" ? "Error" : "Ready" } : p));
  }

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">AI · Tech Lab</div>
        <h1 className="mt-1 font-display text-3xl font-bold">AI & <span className="text-gradient-neon">Tech Lab</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Ship your SaaS. Sprint boards + a library of proven AI prompts.</p>
      </header>

      {projects.map((p) => (
        <section key={p.id} className="mt-6">
          <SpotlightCard className="p-6" spotlight={false}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Rocket className="h-5 w-5 text-white/50" />
                <h2 className="font-display text-xl font-bold">{p.name}</h2>
                <button onClick={() => cycleDeploy(p.id)} title="Toggle deploy status (Vercel)" className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]" style={{ color: deployColor[p.deploy], background: deployColor[p.deploy] + "1a" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: deployColor[p.deploy] }} />{p.deploy}
                </button>
              </div>
              <button onClick={() => addTask(p.id)} className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5"><Plus className="h-3.5 w-3.5" /> Task</button>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
              {COLS.map((col) => (
                <div key={col} onDragOver={(e) => e.preventDefault()} onDrop={() => drag && move(drag.pid, drag.tid, col)} className="rounded-xl border border-white/8 bg-white/[0.01] p-3">
                  <div className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{col}</div>
                  <div className="space-y-2">
                    {p.tasks.filter((t) => t.col === col).map((t) => (
                      <div key={t.id} draggable onDragStart={() => setDrag({ pid: p.id, tid: t.id })} className="glass cursor-grab rounded-lg p-2.5 text-sm active:cursor-grabbing">{t.title}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </section>
      ))}

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Prompt Library</div>
          <MagneticButton onClick={() => setEnhancer(true)}><Sparkles className="h-4 w-4" /> Enhance a prompt</MagneticButton>
        </div>
        <div className="space-y-2">
          {prompts.length === 0 && <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">No prompts yet. Use “Enhance a prompt” to build one.</div>}
          {prompts.map((p) => <PromptRow key={p.id} title={p.title} category={p.category} body={p.body} />)}
        </div>
      </section>

      <AnimatePresence>{enhancer && <PromptEnhancer onClose={() => setEnhancer(false)} />}</AnimatePresence>
    </AppShell>
  );
}

/* ── Prompt Enhancer (no API — keyword-driven) ──────────────── */
const BANKS: Record<string, { suffix: string; groups: { label: string; options: string[] }[] }> = {
  "Music / Suno": {
    suffix: "Radio-ready, high-fidelity master, emotive and dynamic.",
    groups: [
      { label: "Genre", options: ["Arabic pop", "Khaleeji", "Shaabi", "Trap", "Afrobeats", "R&B", "Amapiano", "Cinematic", "Lo-fi"] },
      { label: "Mood", options: ["emotional", "euphoric", "dark", "nostalgic", "romantic", "energetic", "melancholic"] },
      { label: "Tempo", options: ["70 BPM ballad", "90 BPM", "110 BPM", "128 BPM dance"] },
      { label: "Instruments", options: ["oud", "qanun", "808s", "live strings", "piano", "synth pads", "hand percussion", "nay"] },
      { label: "Vocals", options: ["powerful female lead", "male croon", "layered harmonies", "whispered", "ad-lib heavy"] },
      { label: "Production", options: ["spacious reverb", "warm analog", "punchy mix", "Dolby Atmos", "vintage tape"] },
    ],
  },
  "AI Artist Identity": {
    suffix: "Deliver as a cohesive artist bible: persona, palette, sonic signature.",
    groups: [
      { label: "Origin", options: ["Cairo streets", "Gulf heritage", "diaspora", "Mediterranean", "Nubian roots"] },
      { label: "Aesthetic", options: ["high-fashion editorial", "retro-futurist", "minimalist", "neon maximalist", "desert cinematic"] },
      { label: "Sonic signature", options: ["signature ad-lib", "recurring motif", "unique vocal texture", "trademark drop"] },
      { label: "Persona", options: ["mysterious", "rebellious", "romantic", "regal", "playful"] },
    ],
  },
  "Video / Reel Script": {
    suffix: "Keep it native to the platform, first 2 seconds must hook.",
    groups: [
      { label: "Hook", options: ["bold statement", "question", "pattern interrupt", "POV", "before/after"] },
      { label: "Format", options: ["talking head", "b-roll montage", "text-on-screen", "duet", "tutorial"] },
      { label: "Tone", options: ["raw & real", "aspirational", "funny", "dramatic"] },
      { label: "CTA", options: ["pre-save link", "follow for more", "comment below", "use this sound"] },
    ],
  },
  "Marketing Copy": {
    suffix: "Concise, on-brand, conversion-focused.",
    groups: [
      { label: "Angle", options: ["FOMO", "social proof", "transformation", "exclusivity", "problem-solution"] },
      { label: "Emotion", options: ["excitement", "trust", "urgency", "belonging"] },
      { label: "Format", options: ["3 headlines", "caption + hashtags", "ad primary text", "email subject lines"] },
      { label: "CTA", options: ["shop now", "learn more", "join the drop", "pre-save"] },
    ],
  },
};
const rand = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

function PromptEnhancer({ onClose }: { onClose: () => void }) {
  const { update } = useOS();
  const [category, setCategory] = useState<string>("Music / Suno");
  const [idea, setIdea] = useState("");
  const [picked, setPicked] = useState<Record<string, string[]>>({});
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const bank = BANKS[category];

  const toggle = (opt: string) => setPicked((s) => {
    const cur = s[category] ?? [];
    return { ...s, [category]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] };
  });
  function surprise() {
    const sel: string[] = [];
    bank.groups.forEach((g) => { sel.push(rand(g.options)); if (Math.random() > 0.6) sel.push(rand(g.options)); });
    setPicked((s) => ({ ...s, [category]: Array.from(new Set(sel)) }));
    if (!idea.trim()) setIdea(category === "Music / Suno" ? "a song about the last goodbye" : "");
  }

  const enhanced = useMemo(() => {
    const chips = picked[category] ?? [];
    const base = idea.trim() || `${category} concept`;
    const kw = chips.length ? ` — ${chips.join(", ")}` : "";
    return `${base}${kw}. ${bank.suffix}`;
  }, [idea, picked, category, bank]);

  if (saved) {
    return (
      <ModalShell eyebrow="Prompt enhancer" title="Saved to library" onClose={onClose}>
        <p className="text-sm text-muted-foreground">Your enhanced prompt is in the Prompt Library and synced to Supabase.</p>
        <div className="mt-5 flex justify-end"><MagneticButton onClick={onClose}>Done</MagneticButton></div>
      </ModalShell>
    );
  }

  return (
    <ModalShell eyebrow="No-API enhancer" title="Enhance a prompt" onClose={onClose}>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(BANKS).map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${category === c ? "border-white bg-white text-black" : "border-white/15 text-muted-foreground hover:text-white"}`}>{c}</button>
          ))}
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground">Your idea</label>
          <textarea value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="e.g. a heartbreak anthem for the last track of the album" className="min-h-16 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-white/40" />
        </div>

        <div className="space-y-3">
          {bank.groups.map((g) => (
            <div key={g.label}>
              <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">{g.label}</div>
              <div className="flex flex-wrap gap-1.5">
                {g.options.map((o) => {
                  const on = (picked[category] ?? []).includes(o);
                  return <button key={o} onClick={() => toggle(o)} className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${on ? "border-white bg-white/10 text-white" : "border-white/10 text-muted-foreground hover:text-white"}`}>{o}</button>;
                })}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground">Enhanced prompt</label>
            <button onClick={surprise} className="inline-flex items-center gap-1 text-xs text-white/60 hover:text-white"><Shuffle className="h-3.5 w-3.5" /> Surprise me</button>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-foreground/90">{enhanced}</div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 pt-1">
          <button onClick={() => { navigator.clipboard?.writeText(enhanced).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); }} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/5">
            {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Copy</>}
          </button>
          <MagneticButton onClick={() => { update("prompts", (p) => [{ id: uid("pr"), title: (idea.trim() || category).slice(0, 40), category, body: enhanced }, ...p]); setSaved(true); }}>
            <Save className="h-4 w-4" /> Save to library
          </MagneticButton>
        </div>
      </div>
    </ModalShell>
  );
}

function PromptRow({ title, category, body }: { title: string; category: string; body: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  return (
    <SpotlightCard className="p-0 overflow-hidden" spotlight={false}>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between p-4 text-left">
        <div><div className="font-medium">{title}</div><div className="text-[11px] uppercase tracking-wider text-muted-foreground">{category}</div></div>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-white/[0.06] p-4">
          <pre className="whitespace-pre-wrap font-mono text-xs text-muted-foreground">{body}</pre>
          <button onClick={() => { navigator.clipboard?.writeText(body).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); }} className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black">
            {copied ? <><Check className="h-3.5 w-3.5" /> Copied</> : <><Copy className="h-3.5 w-3.5" /> Copy Prompt</>}
          </button>
        </div>
      )}
    </SpotlightCard>
  );
}
