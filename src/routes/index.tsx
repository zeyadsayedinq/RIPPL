import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Music2, Instagram, Facebook, Youtube, Linkedin, Ghost, AtSign,
  TrendingUp, Users, Globe, ArrowRight, DollarSign, Radio, Search as SearchIcon,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */

const SCENES = [
  { url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4", label: "Campaign Launch" },
  { url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4", label: "Creator Network" },
  { url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4", label: "Paid Strategy" },
  { url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4", label: "Night Ops" },
];

/* Simple X (Twitter) glyph — lucide's Twitter icon is deprecated */
function XIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

const PLATFORMS = [
  { name: "TikTok",    Icon: Music2,    hex: "#00f2ea", glow: "rgba(0,242,234,0.55)"   },
  { name: "Instagram", Icon: Instagram, hex: "#e1306c", glow: "rgba(225,48,108,0.55)"  },
  { name: "YouTube",   Icon: Youtube,   hex: "#ff0000", glow: "rgba(255,0,0,0.55)"     },
  { name: "Facebook",  Icon: Facebook,  hex: "#1877f2", glow: "rgba(24,119,242,0.55)"  },
  { name: "X",         Icon: XIcon,     hex: "#ffffff", glow: "rgba(255,255,255,0.30)" },
  { name: "LinkedIn",  Icon: Linkedin,  hex: "#0a66c2", glow: "rgba(10,102,194,0.55)"  },
  { name: "Snapchat",  Icon: Ghost,     hex: "#fffc00", glow: "rgba(255,252,0,0.45)"   },
  { name: "Threads",   Icon: AtSign,    hex: "#ffffff", glow: "rgba(255,255,255,0.30)" },
];

const PORTALS = [
  { role: "Agency Marketer", title: "Marketer Portal", desc: "Media buys, budgets, creator approvals, cross-platform analytics — the full 360 picture.", accent: "#e879f9", border: "rgba(232,121,249,0.25)", to: "/dashboard" as const },
  { role: "Creator", title: "Creator Portal", desc: "Submit drafts, read your brief, track views and what you're owed.", accent: "#818cf8", border: "rgba(129,140,248,0.25)", to: "/creators" as const },
  { role: "Manager", title: "Manager Portal", desc: "Oversee your whole roster, verify payouts, and manage who sees what.", accent: "#34d399", border: "rgba(52,211,153,0.25)", to: "/assets" as const },
];

/* Filter tabs → each shows a different live metric set */
const FILTERS = ["Last 24 Hours", "Active Campaigns", "Projected Q3"];
const METRIC_SETS = [
  [
    { label: "Reach · 24h",         value: "6.1M",  note: "+4.2% vs yesterday",   Icon: Globe },
    { label: "Live Conversions",    value: "18.4K", note: "pre-saves + sales",    Icon: TrendingUp },
    { label: "Spend · 24h",         value: "$41.2K", note: "blended 4.3x ROAS",   Icon: DollarSign },
  ],
  [
    { label: "Total Ecosystem Reach", value: "128.6M", note: "+21.4% this week",     Icon: Globe },
    { label: "Active Creator Nodes",  value: "142",    note: "across 9 platforms",   Icon: Users },
    { label: "Blended ROAS",          value: "4.19x",  note: "$3.11M attributed",    Icon: TrendingUp },
  ],
  [
    { label: "Projected Reach",     value: "310M",   note: "Q3 forecast",          Icon: Globe },
    { label: "Planned Budget",      value: "$950K",  note: "78% committed",        Icon: DollarSign },
    { label: "Target CPA",          value: "$1.40",  note: "-8% vs current",       Icon: TrendingUp },
  ],
];

/* ── Social Platform Marketing Matrix ─────────────────────── */
const PILLARS = [
  { key: "Organic",  Icon: Radio },
  { key: "Ads",      Icon: DollarSign },
  { key: "Creators", Icon: Users },
  { key: "Search",   Icon: SearchIcon },
] as const;
type PillarKey = (typeof PILLARS)[number]["key"];

const MATRIX_PLATFORMS = ["TikTok", "Instagram", "YouTube", "Facebook", "X", "LinkedIn"] as const;

const MATRIX: Record<PillarKey, { rows: { label: string; values: string[] }[] }> = {
  Organic: {
    rows: [
      { label: "Hook Type",   values: ["Trend-driven", "Visual-aesthetic", "Search-intent", "Community", "Real-time takes", "Thought-leadership"] },
      { label: "Format",      values: ["FYP series", "Reels + Stories", "Shorts → long-form", "Groups", "Threads/replies", "Documents + posts"] },
      { label: "Primary KPI", values: ["Discovery rate", "Saves + shares", "Watch time", "Group activity", "Reply depth", "Dwell + follows"] },
    ],
  },
  Ads: {
    rows: [
      { label: "Ad Format",   values: ["Spark Ads", "Partnership + Reels", "Bumper / TrueView", "Advantage+", "Promoted trend", "Lead-gen"] },
      { label: "Objective",   values: ["Video views", "Conversions", "View-through", "Sales / retarget", "Awareness", "B2B pipeline"] },
      { label: "Primary KPI", values: ["CPM + CPE", "ROAS", "CPV", "CPA", "Reach/Freq", "CPL"] },
    ],
  },
  Creators: {
    rows: [
      { label: "Model",       values: ["Co-creation", "Affiliate + tags", "Segment sponsor", "Local experts", "Commentary", "Exec voices"] },
      { label: "Tier Focus",  values: ["Micro → mega", "Micro (10–100k)", "Long-form hosts", "Subject experts", "Reply guys", "Employees"] },
      { label: "Primary KPI", values: ["Adoption rate", "Affiliate sales", "Integration CTR", "Sentiment", "Amplification", "Employer brand"] },
    ],
  },
  Search: {
    rows: [
      { label: "Surface",     values: ["TikTok Search", "Explore + tags", "YouTube search", "Marketplace", "Trends", "Skills / jobs"] },
      { label: "Play",        values: ["Keyword captions", "Hashtag SEO", "SEO titles + chapters", "Local intent", "Real-time news", "Intent targeting"] },
      { label: "Primary KPI", values: ["Search share", "Tag reach", "Impressions → subs", "Inquiry rate", "Trend capture", "Qualified clicks"] },
    ],
  },
};

/* ─────────────────────────────────────────────────────────
   Route
───────────────────────────────────────────────────────── */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RIPPL · 360° Marketing OS" },
      { name: "description", content: "The command center for every marketing campaign you run — paid, organic, and creator, across every platform." },
      { property: "og:title", content: "RIPPL · 360° Marketing OS" },
    ],
  }),
  component: LandingPage,
});

/* ─────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────── */

function LandingPage() {
  const [activeScene, setActiveScene]         = useState(0);
  const [transitioning, setTransitioning]     = useState(false);
  const [activeFilter, setActiveFilter]       = useState(1);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setActiveScene((prev) => (prev + 1) % SCENES.length), 8000);
    return () => clearInterval(id);
  }, []);

  const switchScene = useCallback(
    (idx: number) => {
      if (transitioning || idx === activeScene) return;
      setTransitioning(true);
      setActiveScene(idx);
      setTimeout(() => setTransitioning(false), 1000);
    },
    [transitioning, activeScene]
  );

  const metrics = METRIC_SETS[activeFilter];
  const hovered = PLATFORMS.find((p) => p.name === hoveredPlatform);

  return (
    <div className="relative w-full bg-black font-display">
      {/* ═══════════ HERO (first viewport) ═══════════ */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Layer 0 · Videos (darkened) */}
        <div className="absolute inset-0 z-0">
          {SCENES.map((s, i) => (
            <video
              key={s.url}
              src={s.url}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: i === activeScene ? 1 : 0,
                filter: "brightness(0.42) saturate(1.05) contrast(1.05)",
                transition: "opacity 1000ms ease-in-out",
              }}
            />
          ))}
        </div>

        {/* Layer 0b · Solid dim base */}
        <div className="absolute inset-0 z-0 bg-black/40 pointer-events-none" />

        {/* Layer 1 · PNG overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <img
            src="https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png"
            alt=""
            className="w-full h-full object-cover train-bob select-none opacity-80"
          />
        </div>

        {/* Layer 2 · Gradient veil (darker) */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/75 via-black/45 to-black/90" />

        {/* Layer 2b · Platform ambient glow */}
        {hovered && (
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              opacity: 0.2,
              background: `radial-gradient(ellipse 55% 55% at 50% 55%, ${hovered.hex} 0%, transparent 100%)`,
              transition: "opacity 400ms ease",
            }}
          />
        )}

        {/* Layer 3 · Content */}
        <div className="absolute inset-0 z-20 flex flex-col">
          {/* Nav */}
          <nav className="flex items-center justify-between px-6 py-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)] shrink-0">
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                  <circle cx="2.5" cy="19.5" r="2" fill="white" />
                  <path d="M 2.5 13.5 A 7 7 0 0 1 9.5 19.5"  stroke="white" strokeWidth="2"   strokeLinecap="round" />
                  <path d="M 2.5 8   A 12.5 12.5 0 0 1 15 19.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
                  <path d="M 2.5 2   A 18.5 18.5 0 0 1 21 19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                </svg>
                <div className="absolute inset-0 rounded-xl bg-[oklch(0.7_0.28_328)] blur-xl opacity-40 -z-10" />
              </div>
              <span className="text-white font-bold tracking-[0.2em] text-sm">RIPPL</span>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="liquid-glass rounded-full px-4 py-2 flex items-center gap-3 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>14 active campaigns</span>
                <span className="w-px h-3 bg-white/15" />
                <span>73% budget utilized</span>
              </div>
              <div className="liquid-glass rounded-full flex items-center gap-0.5 px-2 py-1.5">
                {NAV_LINKS.map(({ label, to }) => (
                  <Link
                    key={label}
                    to={to}
                    className="px-3 py-1.5 text-xs text-white/70 hover:text-white rounded-full transition-colors"
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  to="/dashboard"
                  className="ml-1 rounded-full bg-white text-black text-xs font-semibold px-4 py-1.5 hover:bg-white/90 transition-colors"
                >
                  Enter
                </Link>
              </div>
            </div>
          </nav>

          {/* Hero body */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4 min-h-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
              className="liquid-glass rounded-full px-4 py-2 text-xs text-white/70 tracking-wide"
            >
              9 platforms · paid, organic &amp; creator — one command center
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}
              className="text-white font-bold leading-[1.06]" style={{ fontSize: "clamp(2rem, 4.8vw, 4.2rem)" }}
            >
              Where Campaigns Drop
              <br />
              <span className="text-gradient-neon">and Culture Follows</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
              className="text-white/60 max-w-md text-sm leading-relaxed"
            >
              Every platform, every format, every buy — paid, organic, and creator.
              One place to run the whole funnel, built for the people doing the actual work.
            </motion.p>

            {/* Filter tabs (live) */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
              className="liquid-glass rounded-full flex items-center p-1 gap-0.5"
            >
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(i)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${activeFilter === i ? "bg-white text-black" : "text-white/55 hover:text-white"}`}
                >
                  {f}
                </button>
              ))}
            </motion.div>

            {/* Metric cards (react to filter) */}
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              className="flex gap-3 flex-wrap justify-center"
            >
              {metrics.map(({ label, value, note, Icon }) => (
                <div key={label} className="liquid-glass rounded-2xl px-5 py-4 text-center min-w-[138px]">
                  <Icon className="h-4 w-4 mx-auto mb-2" style={{ color: "oklch(0.7 0.28 328)" }} />
                  <div className="font-bold text-white text-2xl tracking-tight">{value}</div>
                  <div className="text-white/45 text-[10px] mt-1 uppercase tracking-wide">{label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: "oklch(0.85 0.18 200)" }}>{note}</div>
                </div>
              ))}
            </motion.div>

            {/* Platform Hub */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {PLATFORMS.map(({ name, Icon, hex, glow }) => {
                const isHovered = hoveredPlatform === name;
                return (
                  <button
                    key={name}
                    onMouseEnter={() => setHoveredPlatform(name)}
                    onMouseLeave={() => setHoveredPlatform(null)}
                    onClick={() => navigate({ to: "/dashboard" })}
                    className="group flex flex-col items-center gap-1.5"
                    title={`${name} analytics`}
                  >
                    <div
                      className="liquid-glass grid h-14 w-14 place-items-center rounded-2xl transition-all duration-300 group-hover:scale-[1.12]"
                      style={{ boxShadow: isHovered ? `0 0 30px ${glow}, inset 0 1px 1px rgba(255,255,255,0.15)` : undefined }}
                    >
                      <Icon className="h-6 w-6 transition-colors duration-300" style={{ color: isHovered ? hex : "rgba(255,255,255,0.55)" }} />
                    </div>
                    <span className="text-[10px] transition-colors duration-300" style={{ color: isHovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}>
                      {name}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Scroll cue */}
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              onClick={() => document.getElementById("matrix")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-1 text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white/70 transition-colors"
            >
              Platform playbook ↓
            </motion.button>
          </div>

          {/* Tri-Portal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.55 }}
            className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0"
          >
            {PORTALS.map((portal) => (
              <button
                key={portal.role}
                onClick={() => navigate({ to: portal.to })}
                className="liquid-glass rounded-2xl p-4 text-left group hover:bg-white/[0.04] transition-all duration-200"
                style={{ borderLeft: `2px solid ${portal.border}` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: portal.accent }}>{portal.role}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" style={{ color: portal.accent }} />
                </div>
                <div className="text-white text-sm font-semibold mb-1">{portal.title}</div>
                <div className="text-white/40 text-xs leading-relaxed">{portal.desc}</div>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Scene switcher */}
        <div className="absolute bottom-5 right-6 z-30 flex items-center gap-2">
          {SCENES.map((s, i) => (
            <button
              key={i}
              onClick={() => switchScene(i)}
              title={s.label}
              className="rounded-full transition-all duration-300"
              style={{ height: "3px", width: i === activeScene ? "28px" : "14px", background: i === activeScene ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)" }}
            />
          ))}
        </div>
      </section>

      {/* ═══════════ SOCIAL PLATFORM MARKETING MATRIX ═══════════ */}
      <MatrixSection />
    </div>
  );
}

const NAV_LINKS = [
  { label: "Campaigns", to: "/dashboard" as const },
  { label: "Creators",  to: "/creators" as const },
  { label: "Analytics", to: "/dashboard" as const },
  { label: "Assets",    to: "/assets" as const },
];

/* ── Matrix section ───────────────────────────────────────── */
function MatrixSection() {
  const [pillar, setPillar] = useState<PillarKey>("Ads");
  const platformTint: Record<string, string> = {
    TikTok: "#00f2ea", Instagram: "#e1306c", YouTube: "#ff0000", Facebook: "#1877f2", X: "#ffffff", LinkedIn: "#0a66c2",
  };
  const rows = MATRIX[pillar].rows;

  return (
    <section id="matrix" className="relative w-full bg-[oklch(0.14_0.02_300)] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">The 360 Playbook</div>
          <h2 className="mt-2 font-bold text-white" style={{ fontSize: "clamp(1.8rem, 3.6vw, 3rem)" }}>
            Social Platform <span className="text-gradient-neon">Marketing Matrix</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
            In 2026 the lines between organic, paid, and creator marketing are blurred — creators run your ads and
            organic comments drive the creative. Switch the pillar to see how each platform's play changes.
          </p>
        </div>

        {/* Pillar selector */}
        <div className="mt-8 flex justify-center">
          <div className="liquid-glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1">
            {PILLARS.map(({ key, Icon }) => (
              <button
                key={key}
                onClick={() => setPillar(key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${pillar === key ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
              >
                <Icon className="h-3.5 w-3.5" /> {key}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix table */}
        <div className="glass mt-8 overflow-x-auto rounded-3xl p-2">
          <table className="w-full min-w-[820px] border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left text-[11px] uppercase tracking-[0.2em] text-white/40">Strategy</th>
                {MATRIX_PLATFORMS.map((p) => (
                  <th key={p} className="p-4 text-left text-sm font-semibold text-white">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: platformTint[p] }} />
                      {p}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <motion.tr
                  key={`${pillar}-${row.label}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: ri * 0.06 }}
                  className={ri % 2 ? "bg-white/[0.02]" : ""}
                >
                  <td className="p-4 text-sm font-medium text-white/70">{row.label}</td>
                  {row.values.map((v, vi) => (
                    <td key={vi} className="p-4 text-sm text-white/85">{v}</td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer stats */}
        <div className="mt-8 flex items-center justify-center gap-8 text-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">Active Platforms</div>
            <div className="mt-1 text-2xl font-bold text-white">{MATRIX_PLATFORMS.length}</div>
          </div>
          <div className="h-8 w-px bg-white/15" />
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40">Selected Pillar</div>
            <div className="mt-1 text-2xl font-bold text-gradient-neon">{pillar}</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(232,121,249,0.4)] transition-shadow hover:shadow-[0_0_44px_rgba(232,121,249,0.6)]"
          >
            Open the 360° command center <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
