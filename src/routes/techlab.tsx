import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useOS, uid, type SprintCol } from "@/lib/os-store";
import { Rocket, Copy, Check, ChevronDown, Plus } from "lucide-react";

export const Route = createFileRoute("/techlab")({
  head: () => ({ meta: [{ title: "Tech Lab · RIPPL OS" }, { name: "description", content: "AI & SaaS project ops." }] }),
  component: TechLab,
});

const COLS: SprintCol[] = ["Backlog", "In Progress", "Done"];
const deployColor: Record<string, string> = { Building: "oklch(0.82 0.16 90)", Ready: "oklch(0.82 0.18 150)", Error: "oklch(0.65 0.24 20)" };

function TechLab() {
  const { projects, prompts, update } = useOS();
  const [drag, setDrag] = useState<{ pid: string; tid: string } | null>(null);

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
        <div className="mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">Prompt Library</div>
        <div className="space-y-2">
          {prompts.map((p) => <PromptRow key={p.id} title={p.title} category={p.category} body={p.body} />)}
        </div>
      </section>
    </AppShell>
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
