import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import {
  KNOWLEDGE,
  SECTIONS,
  searchKnowledge,
  type KnowledgeSection,
} from "@/lib/knowledge-index";
import {
  BookOpen,
  Search,
  ArrowUpRight,
  Copy,
  Check,
  GitFork,
  Compass,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   KNOWLEDGE HUB
   The operating manual behind the dashboard. RIPPL tells you what is
   happening; the hub tells you what to do about it.

   Structure adapted from parrsi01/Music — a repo that is simultaneously a
   business book, an operating system, a playbook and a research resource.
   Files live in knowledge/ so they stay editable and diffable in git; this
   route makes them navigable and links each one to the module it drives.
═══════════════════════════════════════════════════════════ */

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Hub · RIPPL OS" },
      {
        name: "description",
        content:
          "Playbooks, checklists, templates and prompts behind the dashboard.",
      },
    ],
  }),
  component: KnowledgePage,
});

const FAST_START: { who: string; path: string[] }[] = [
  {
    who: "Signing a new artist",
    path: [
      "A&R and Artist Development",
      "Artist Onboarding Checklist",
      "Client Pipeline (CSV)",
    ],
  },
  {
    who: "Shipping a release in 8 weeks",
    path: [
      "Release Operating System",
      "DSP Pitch Checklist",
      "Release Day Checklist",
    ],
  },
  {
    who: "Out of promo budget",
    path: ["Low Budget Promo Model", "UGC Content Engine"],
  },
  {
    who: "Building recurring revenue",
    path: ["Repeat Client Engine", "Revenue Models", "Commission Pipeline"],
  },
  {
    who: "Deciding what to sign or push",
    path: ["Hit Prediction — Method & Limits"],
  },
  { who: "Booking a show", path: ["Live Show Advance Checklist"] },
  {
    who: "Reviewing the week",
    path: ["KPI Scorecard", "Weekly Execution Template"],
  },
];

function KnowledgePage() {
  const [q, setQ] = useState("");
  const [section, setSection] = useState<KnowledgeSection | "All">("All");
  const [copied, setCopied] = useState<string | null>(null);

  const docs = useMemo(() => {
    const found = searchKnowledge(q);
    return section === "All"
      ? found
      : found.filter((d) => d.section === section);
  }, [q, section]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const d of KNOWLEDGE) m.set(d.section, (m.get(d.section) ?? 0) + 1);
    return m;
  }, []);

  const sources = useMemo(
    () => [
      ...new Set(KNOWLEDGE.map((d) => d.source).filter(Boolean) as string[]),
    ],
    [],
  );

  function copyPath(path: string) {
    navigator.clipboard?.writeText(path).then(() => {
      setCopied(path);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
          System · Knowledge
        </div>
        <h1 className="mt-1 font-display text-3xl font-bold">
          Knowledge <span className="text-gradient-neon">Hub</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {KNOWLEDGE.length} playbooks, checklists, templates and prompt sets.
          The dashboard shows what happened — this is what to do about it.
        </p>
      </header>

      {/* ── Fast start ── */}
      <SpotlightCard className="mt-6 p-5" spotlight={false}>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <Compass className="h-3.5 w-3.5" /> Fast-start paths
        </div>
        <div className="mt-4 grid grid-cols-12 gap-3">
          {FAST_START.map((f) => (
            <div
              key={f.who}
              className="glass col-span-12 rounded-xl p-3 md:col-span-6 lg:col-span-4"
            >
              <div className="text-xs font-semibold">{f.who}</div>
              <div className="mt-1.5 flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
                {f.path.map((step, i) => (
                  <span key={step} className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setQ(step);
                        setSection("All");
                      }}
                      className="rounded px-1 py-0.5 text-left hover:bg-white/5 hover:text-white"
                    >
                      {step}
                    </button>
                    {i < f.path.length - 1 && (
                      <span className="text-white/25">→</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>

      {/* ── Search + filter ── */}
      <div className="glass mt-4 flex items-center gap-3 rounded-2xl px-4">
        <Search className="h-4 w-4 shrink-0 text-white/40" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search playbooks, checklists, templates, prompts, tags…"
          className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-white/30"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="text-xs text-muted-foreground hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Chip
          active={section === "All"}
          onClick={() => setSection("All")}
          label={`All · ${KNOWLEDGE.length}`}
        />
        {SECTIONS.map((s) => (
          <Chip
            key={s}
            active={section === s}
            onClick={() => setSection(s)}
            label={`${s} · ${counts.get(s) ?? 0}`}
          />
        ))}
      </div>

      {/* ── Docs ── */}
      {docs.length === 0 ? (
        <div className="glass mt-6 rounded-2xl px-4 py-14 text-center text-sm text-muted-foreground">
          Nothing matches “{q}”.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-12 gap-4">
          {docs.map((d) => (
            <SpotlightCard
              key={d.path}
              className="col-span-12 p-5 md:col-span-6 xl:col-span-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {d.section}
                  </div>
                  <h3 className="mt-1 font-display text-lg font-bold leading-tight">
                    {d.title}
                  </h3>
                </div>
                <BookOpen className="mt-1 h-4 w-4 shrink-0 text-white/30" />
              </div>

              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                {d.summary}
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {d.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {d.source && (
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-white/35">
                  <GitFork className="h-3 w-3" /> adapted from {d.source}
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => copyPath(d.path)}
                  className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] hover:bg-white/5"
                >
                  {copied === d.path ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}{" "}
                  Copy path
                </button>
                {d.route && (
                  <Link
                    to={d.route}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-black"
                  >
                    Open {d.route} <ArrowUpRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* ── Provenance ── */}
      <SpotlightCard className="mt-4 p-5" spotlight={false}>
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Where this came from
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          The hub&apos;s structure and several of its models were adapted from
          open-source reference repositories, then rewritten for a label /
          management / 360-marketing operation. Full mapping — which repo
          produced which module — is in{" "}
          <span className="font-mono text-white/70">
            docs/RIPPL_UPGRADE_PLAN.md
          </span>
          .
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {sources.map((s) => (
            <span
              key={s}
              className="glass rounded-full px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </AppShell>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-[11px] transition-colors ${
        active
          ? "bg-white text-black"
          : "glass text-muted-foreground hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
