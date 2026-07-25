import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MoodboardCanvas } from "@/components/MoodboardCanvas";
import { useOS, uid } from "@/lib/os-store";
import {
  HOOKS,
  ANGLES,
  pickHooks,
  batchCommand,
  creatorBrief,
  type Hook,
  type HookAngle,
} from "@/lib/ugc-hooks";
import {
  PenLine,
  LayoutGrid,
  TrendingUp,
  Plus,
  Heading1,
  List,
  Image as ImageIcon,
  Copy,
  Check,
  Clapperboard,
  Terminal,
  Shuffle,
} from "lucide-react";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio · RIPPL OS" },
      { name: "description", content: "Creative studio & marketing." },
    ],
  }),
  // The Moodboard tab embeds Excalidraw, a canvas library that touches
  // `window` at import time — TanStack Start's docs call this out by name
  // ("When the route component depends on browser-only APIs, e.g. canvas").
  // Without this, every route's component (this one included) gets bundled
  // into the single shared SSR entry that runs on every request, so loading
  // "/" was enough to evaluate Excalidraw's module and crash with
  // "window is not defined" — even though "/" never renders this route.
  // ssr: false code-splits /studio out of that shared server bundle entirely.
  ssr: false,
  component: StudioPage,
});

type Tab = "scratchpad" | "moodboard" | "ugc" | "tracker";

function StudioPage() {
  const [tab, setTab] = useState<Tab>("scratchpad");
  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "scratchpad", label: "Scratchpad", icon: PenLine },
    { key: "moodboard", label: "Moodboard", icon: LayoutGrid },
    { key: "ugc", label: "UGC Engine", icon: Clapperboard },
    { key: "tracker", label: "Campaign Tracker", icon: TrendingUp },
  ];
  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
          Creative · Studio
        </div>
        <h1 className="mt-1 font-display text-3xl font-bold">
          Creative <span className="text-gradient-neon">Studio</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Write narratives, collect references, and track paid creative.
        </p>
      </header>
      <div className="mt-6 flex gap-1.5 overflow-x-auto rounded-2xl glass p-1.5">
        {tabs.map((t) => {
          const on = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${on ? "text-white" : "text-muted-foreground hover:text-white"}`}
            >
              {on && (
                <motion.div
                  layoutId="studio-tab"
                  className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <t.icon className="relative h-4 w-4" />
              <span className="relative whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-6">
        {tab === "scratchpad" && <Scratchpad />}
        {tab === "moodboard" && <MoodboardCanvas />}
        {tab === "ugc" && <UgcEngine />}
        {tab === "tracker" && <Tracker />}
      </div>
    </AppShell>
  );
}

/* ── Scratchpad with slash-style commands ───────────────────── */
function Scratchpad() {
  const { notes, update } = useOS();
  const [activeId, setActiveId] = useState<string | null>(notes[0]?.id ?? null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const active = notes.find((n) => n.id === activeId) ?? notes[0] ?? null;

  function newNote() {
    const n = {
      id: uid("n"),
      title: "Untitled",
      body: "",
      updatedAt: "just now",
    };
    update("notes", (all) => [n, ...all]);
    setActiveId(n.id);
  }
  function edit(patch: Partial<{ title: string; body: string }>) {
    if (!active) return;
    update("notes", (all) =>
      all.map((n) =>
        n.id === active.id ? { ...n, ...patch, updatedAt: "just now" } : n,
      ),
    );
  }
  function insert(snippet: string) {
    if (!active) return;
    const ta = taRef.current;
    const pos = ta?.selectionStart ?? active.body.length;
    const body = active.body.slice(0, pos) + snippet + active.body.slice(pos);
    edit({ body });
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <SpotlightCard
        className="col-span-12 md:col-span-4 p-4"
        spotlight={false}
      >
        <button
          onClick={newNote}
          className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-2 text-sm font-medium text-black"
        >
          <Plus className="h-4 w-4" /> New note
        </button>
        <div className="space-y-1">
          {notes.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveId(n.id)}
              className={`w-full truncate rounded-lg px-3 py-2 text-left text-sm ${active?.id === n.id ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"}`}
            >
              <div className="truncate">{n.title || "Untitled"}</div>
              <div className="truncate text-[11px] text-muted-foreground">
                {n.updatedAt}
              </div>
            </button>
          ))}
          {notes.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-muted-foreground">
              No notes.
            </div>
          )}
        </div>
      </SpotlightCard>

      <SpotlightCard
        className="col-span-12 md:col-span-8 p-5"
        spotlight={false}
      >
        {active ? (
          <>
            <input
              value={active.title}
              onChange={(e) => edit({ title: e.target.value })}
              placeholder="Title"
              className="w-full bg-transparent font-display text-2xl font-bold outline-none placeholder:text-muted-foreground"
            />
            <div className="mt-3 flex gap-1.5">
              <button
                onClick={() => insert("\n# Heading\n")}
                title="/h1"
                className="glass inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs hover:bg-white/5"
              >
                <Heading1 className="h-3.5 w-3.5" /> /h1
              </button>
              <button
                onClick={() => insert("\n- Bullet\n")}
                title="/bullet"
                className="glass inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs hover:bg-white/5"
              >
                <List className="h-3.5 w-3.5" /> /bullet
              </button>
              <button
                onClick={() => insert("\n![caption](https://image-url)\n")}
                title="/image"
                className="glass inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs hover:bg-white/5"
              >
                <ImageIcon className="h-3.5 w-3.5" /> /image
              </button>
            </div>
            <textarea
              ref={taRef}
              value={active.body}
              onChange={(e) => edit({ body: e.target.value })}
              placeholder="Type / for commands, or write freely…  (# heading, - bullet, ![](url))"
              className="mt-3 min-h-[280px] w-full resize-y bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
            />
          </>
        ) : (
          <div className="py-12 text-center text-sm text-muted-foreground">
            Create a note to start.
          </div>
        )}
      </SpotlightCard>
    </div>
  );
}

/* ── UGC Engine ─────────────────────────────────────────────
   Adapted from vishnuhimself/UGCVidGen: a hook library + b-roll + endcard +
   music bed, rendered in batch. Pick a batch here, copy the command, render
   with scripts/ugc_reel_gen.py. Doctrine lives in
   knowledge/marketing/UGC_CONTENT_ENGINE.md — rank on 3s retention, never views. */
function UgcEngine() {
  const { update } = useOS();
  const [campaign, setCampaign] = useState("");
  const [artist, setArtist] = useState("");
  const [count, setCount] = useState(12);
  const [angle, setAngle] = useState<HookAngle | "all">("all");
  const [batch, setBatch] = useState<Hook[]>(() => pickHooks(12));
  const [copied, setCopied] = useState<string | null>(null);

  const filtered =
    angle === "all" ? HOOKS : HOOKS.filter((h) => h.angle === angle);

  function reroll() {
    setBatch(pickHooks(count, angle === "all" ? undefined : angle));
  }

  function copy(key: string, text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  function saveBatchToNotes() {
    const body = batch.map((h) => `${h.id}. [${h.angle}] ${h.text}`).join("\n");
    update("notes", (all) => [
      {
        id: uid("n"),
        title: `UGC batch — ${campaign || "untitled campaign"}`,
        body: `${batchCommand(campaign || "campaign", count, angle === "all" ? undefined : angle)}\n\n${body}`,
        updatedAt: "just now",
      },
      ...all,
    ]);
    update("usage", (all) => [
      {
        id: uid("u"),
        feature: "ugc_batch",
        credits: 5,
        at: new Date().toISOString(),
      },
      ...all,
    ]);
  }

  const cmd = batchCommand(
    campaign || "campaign",
    count,
    angle === "all" ? undefined : angle,
  );

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Batch builder */}
      <SpotlightCard
        className="col-span-12 p-5 lg:col-span-7"
        spotlight={false}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Batch builder
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold">
              Build a hook batch
            </h2>
          </div>
          <button
            onClick={reroll}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm hover:bg-white/5"
          >
            <Shuffle className="h-4 w-4" /> Reroll
          </button>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-3">
          <div className="col-span-12 sm:col-span-4">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">
              Campaign
            </label>
            <input
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="night-drive"
              className="glass w-full rounded-xl px-3 py-2 text-sm outline-none"
            />
          </div>
          <div className="col-span-12 sm:col-span-4">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">
              Artist / track
            </label>
            <input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Marwan H. — Night Drive"
              className="glass w-full rounded-xl px-3 py-2 text-sm outline-none"
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">
              Count
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={count}
              onChange={(e) => setCount(Number(e.target.value) || 1)}
              className="glass w-full rounded-xl px-3 py-2 text-sm outline-none"
            />
          </div>
          <div className="col-span-6 sm:col-span-2">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">
              Angle
            </label>
            <select
              value={angle}
              onChange={(e) => setAngle(e.target.value as HookAngle | "all")}
              className="glass w-full rounded-xl bg-transparent px-3 py-2 text-sm outline-none"
            >
              <option value="all" className="bg-black">
                All
              </option>
              {ANGLES.map((a) => (
                <option key={a.key} value={a.key} className="bg-black">
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          {batch.map((h) => (
            <div
              key={h.id}
              className="glass flex items-center gap-3 rounded-xl px-3 py-2"
            >
              <span className="w-6 shrink-0 text-center font-mono text-[10px] text-muted-foreground">
                {h.id}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm">{h.text}</span>
              <span className="shrink-0 rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-muted-foreground">
                {h.angle}
              </span>
              <button
                onClick={() =>
                  copy(
                    `brief-${h.id}`,
                    creatorBrief({
                      track: artist || "the track",
                      artist: artist || "—",
                      hook: h.text,
                    }),
                  )
                }
                title="Copy creator brief"
                className="shrink-0 text-muted-foreground hover:text-white"
              >
                {copied === `brief-${h.id}` ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={saveBatchToNotes}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
          >
            <Plus className="h-4 w-4" /> Save batch to Scratchpad
          </button>
          <button
            onClick={() => copy("cmd", cmd)}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/5"
          >
            {copied === "cmd" ? (
              <Check className="h-4 w-4" />
            ) : (
              <Terminal className="h-4 w-4" />
            )}{" "}
            Copy render command
          </button>
        </div>

        <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 font-mono text-[11px] text-white/70">
          {cmd}
        </pre>
        <p className="mt-2 text-[11px] text-muted-foreground/70">
          Put b-roll in <span className="font-mono">media/hook_videos/</span>,
          endcards in <span className="font-mono">media/cta_videos/</span>, then
          run the command. Output and a{" "}
          <span className="font-mono">manifest.json</span> (hook id → file) land
          in <span className="font-mono">out/ugc/</span>.
        </p>
      </SpotlightCard>

      {/* Library + angles */}
      <div className="col-span-12 lg:col-span-5">
        <SpotlightCard className="p-5" spotlight={false}>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Why the angles work
          </div>
          <div className="mt-3 space-y-2">
            {ANGLES.map((a) => (
              <button
                key={a.key}
                onClick={() => setAngle(a.key)}
                className={`w-full rounded-xl px-3 py-2 text-left transition-colors ${angle === a.key ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"}`}
              >
                <div className="text-sm font-medium">{a.label}</div>
                <div className="text-[11px] text-muted-foreground">{a.why}</div>
              </button>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard className="mt-4 p-5" spotlight={false}>
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Hook library · {filtered.length}
            </div>
            <button
              onClick={() =>
                copy(
                  "all",
                  filtered
                    .map((h) => `${h.id},${h.text},${h.angle}`)
                    .join("\n"),
                )
              }
              className="text-[11px] text-muted-foreground hover:text-white"
            >
              {copied === "all" ? "Copied" : "Copy as CSV"}
            </button>
          </div>
          <div className="mt-3 max-h-72 space-y-1 overflow-y-auto pr-1">
            {filtered.map((h) => (
              <div
                key={h.id}
                className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-[12px] hover:bg-white/[0.03]"
              >
                <span className="w-5 shrink-0 text-right font-mono text-[10px] text-muted-foreground">
                  {h.id}
                </span>
                <span className="min-w-0 flex-1">{h.text}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground/70">
            Same 60 hooks as <span className="font-mono">data/hooks.csv</span>.
            Rank results on 3-second retention.
          </p>
        </SpotlightCard>
      </div>
    </div>
  );
}

/* ── TikTok / Meta campaign tracker ─────────────────────────── */
function Tracker() {
  const [copied, setCopied] = useState(false);
  const rows = [
    {
      platform: "TikTok Spark Ads",
      spend: "EGP 84K",
      roas: "5.1x",
      cpm: "EGP 12",
    },
    { platform: "Meta (FB/IG)", spend: "EGP 62K", roas: "4.3x", cpm: "EGP 21" },
  ];
  function copyBrief() {
    const brief = `CREATOR BRIEF\n\nCampaign: Lead single push\nHook: First 2 seconds — bold statement, native to the platform.\nDeliverables: 1× 15s vertical, 3× story frames.\nDo: use the campaign sound, tag @artist, on-screen captions.\nDon't: over-produce; keep it raw and trend-native.\nCTA: pre-save link in bio.`;
    navigator.clipboard?.writeText(brief).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <SpotlightCard className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Paid Creative
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold">
            TikTok / Meta Tracker
          </h2>
        </div>
        <button
          onClick={copyBrief}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy Creator Brief
            </>
          )}
        </button>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <th className="pb-3">Platform</th>
              <th className="pb-3 text-right">Spend</th>
              <th className="pb-3 text-right">ROAS</th>
              <th className="pb-3 text-right">CPM</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.platform} className="border-t border-white/[0.06]">
                <td className="py-3 font-medium">{r.platform}</td>
                <td className="py-3 text-right font-mono">{r.spend}</td>
                <td className="py-3 text-right font-mono text-[oklch(0.85_0.18_150)]">
                  {r.roas}
                </td>
                <td className="py-3 text-right font-mono text-muted-foreground">
                  {r.cpm}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground/70">
        Illustrative — connect a live ad account to populate real ROAS.
      </p>
    </SpotlightCard>
  );
}
