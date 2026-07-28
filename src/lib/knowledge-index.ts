/* ═══════════════════════════════════════════════════════════
   KNOWLEDGE HUB INDEX

   The /knowledge route browses the `knowledge/` folder in this repo. The files
   themselves are Markdown on disk (they're meant to be readable in an editor
   and diffable in git); this module is the in-app catalogue so the hub is
   navigable, searchable and linked to the module each doc drives.

   Structure adapted from parrsi01/Music — a "business book + operating system
   + playbook + research resource" repo. Keep this list in step with the files.
═══════════════════════════════════════════════════════════ */

export type KnowledgeSection =
  | "Foundations"
  | "Systems"
  | "Marketing"
  | "Sales"
  | "Operations"
  | "Finance"
  | "Research"
  | "Checklists"
  | "Templates"
  | "Prompts"
  | "Plans";

export interface KnowledgeDoc {
  path: string;
  title: string;
  section: KnowledgeSection;
  summary: string;
  /** in-app route this doc drives, if any */
  route?: string;
  tags: string[];
  /** the reference repo this was derived from, when applicable */
  source?: string;
}

export const KNOWLEDGE: KnowledgeDoc[] = [
  // ── Foundations ──
  {
    path: "knowledge/foundations/AR_AND_ARTIST_DEVELOPMENT.md",
    title: "A&R and Artist Development",
    section: "Foundations",
    summary:
      "Portfolio thinking under uncertainty, the five signals worth tracking, and gated stage transitions for the scouting board.",
    route: "/roster",
    tags: ["a&r", "signing", "development", "stage gates"],
  },
  {
    path: "knowledge/foundations/MUSIC_MARKET_STRUCTURES.md",
    title: "Music Market Structures",
    section: "Foundations",
    summary:
      "Where the money sits, how long each layer takes to pay, and why cashflow timing kills more operations than low revenue.",
    tags: ["revenue", "cashflow", "platform risk"],
  },
  {
    path: "knowledge/foundations/WHY_RELEASES_FAIL.md",
    title: "Why Releases Fail",
    section: "Foundations",
    summary:
      "Symptom → cause → fix table, the five failure patterns, and the post-mortem template.",
    route: "/releases",
    tags: ["diagnostics", "post-mortem"],
  },

  // ── Systems ──
  {
    path: "knowledge/systems/RELEASE_OPERATING_SYSTEM.md",
    title: "Release Operating System",
    section: "Systems",
    summary:
      "The 8-week gate-based release process. Every gate has an owner and a RIPPL surface. Missed gates move the date — they never compress the schedule.",
    route: "/calendar",
    tags: ["release", "gates", "process"],
  },
  {
    path: "knowledge/systems/CATALOG_COMPOUNDING_MODEL.md",
    title: "Catalog Compounding Model",
    section: "Systems",
    summary:
      "Catalog depth as search surface. Cadence targets by stage and the >40% catalog-share health metric.",
    route: "/releases",
    tags: ["catalog", "search", "compounding"],
    source: "parrsi01/Music",
  },
  {
    path: "knowledge/systems/LOW_BUDGET_PROMO_MODEL.md",
    title: "Low Budget Promo Model",
    section: "Systems",
    summary:
      "Sub-$500/month allocation. Creative volume over media spend, and the never-boost-cold rule.",
    route: "/budget",
    tags: ["paid", "budget", "creative"],
    source: "parrsi01/Music",
  },
  {
    path: "knowledge/systems/REPEAT_CLIENT_ENGINE.md",
    title: "Repeat Client Engine",
    section: "Systems",
    summary:
      "Moving a client from one job to three. Four touchpoints, reactivation triggers, and where the referral ask belongs.",
    route: "/invoices",
    tags: ["retention", "ltv", "referral"],
    source: "parrsi01/Music",
  },

  // ── Marketing ──
  {
    path: "knowledge/marketing/UGC_CONTENT_ENGINE.md",
    title: "UGC Content Engine",
    section: "Marketing",
    summary:
      "Batch-produced hook-led short video. Asset library, batch workflow, hook angles, and ranking on 3-second retention.",
    route: "/studio",
    tags: ["ugc", "short-form", "hooks", "batch"],
    source: "vishnuhimself/UGCVidGen",
  },
  {
    path: "knowledge/marketing/TIKTOK_GROWTH_SYSTEM.md",
    title: "TikTok / Short-Form Growth System",
    section: "Marketing",
    summary:
      "Objective hierarchy, the 14-day test protocol, and why your own audio is a catalog asset.",
    route: "/dashboard/tiktok",
    tags: ["tiktok", "reels", "retention"],
  },
  {
    path: "knowledge/marketing/CONTENT_PILLARS.md",
    title: "Content Pillars",
    section: "Marketing",
    summary:
      "Proof / Process / POV / Offer at 30-30-25-15, mapped across the release cycle.",
    route: "/channels",
    tags: ["content", "planning"],
  },

  // ── Sales ──
  {
    path: "knowledge/sales/SYNC_AND_BRAND_DEAL_PIPELINE.md",
    title: "Sync & Brand Deal Pipeline",
    section: "Sales",
    summary:
      "Eight stages moved on evidence only, what must be true before you pitch, and the negotiation levers ranked by cost.",
    route: "/roster",
    tags: ["sync", "brand", "pipeline"],
  },
  {
    path: "knowledge/sales/OBJECTION_HANDLING.md",
    title: "Objection Handling",
    section: "Sales",
    summary:
      "Objections as information about a gap in the offer. Never discount without removing scope.",
    route: "/invoices",
    tags: ["sales", "pricing", "negotiation"],
  },

  // ── Operations ──
  {
    path: "knowledge/operations/COMMISSION_PIPELINE.md",
    title: "Commission Pipeline",
    section: "Operations",
    summary:
      "Ten client-visible phases, the rule for each, auto-expiry, and the three lines that stop scope creep.",
    route: "/invoices",
    tags: ["commissions", "clients", "scope"],
    source: "wpwwhimself/muzyka-szyta-na-miare",
  },
  {
    path: "knowledge/operations/FILE_NAMING_AND_DELIVERY.md",
    title: "File Naming, Versioning & Delivery",
    section: "Operations",
    summary:
      "The naming convention, the delivery pack spec, storage routing and retention.",
    route: "/audio",
    tags: ["delivery", "files", "masters"],
  },
  {
    path: "knowledge/operations/KPI_DASHBOARD_LOGIC.md",
    title: "KPI Dashboard Logic",
    section: "Operations",
    summary:
      "Definitions behind every number on /home and /dashboard, fixed pipeline stage probabilities, and reporting cadence.",
    route: "/dashboard",
    tags: ["kpi", "definitions", "reporting"],
  },

  // ── Finance ──
  {
    path: "knowledge/finance/UNIT_ECONOMICS.md",
    title: "Unit Economics",
    section: "Finance",
    summary:
      "Per-unit maths for release, commission, live, UGC and affiliate lines. Includes the hourly-floor calculation.",
    route: "/budget",
    tags: ["economics", "pricing", "break-even"],
    source: "parrsi01/Music",
  },
  {
    path: "knowledge/finance/ROYALTY_SPLITS_AND_ACCOUNTING.md",
    title: "Royalty Splits & Accounting",
    section: "Finance",
    summary:
      "Master vs composition, split-sheet minimum fields, and the quarterly reconciliation cadence.",
    route: "/vault",
    tags: ["royalties", "splits", "publishing"],
  },
  {
    path: "knowledge/finance/REVENUE_MODELS.md",
    title: "Revenue Models",
    section: "Finance",
    summary:
      "Seven lines ranked by cash speed, margin and ceiling — plus the sequencing order for a new operation.",
    route: "/billing",
    tags: ["revenue", "diversification"],
    source: "ha346/AI-Saas-Platform",
  },

  // ── Research ──
  {
    path: "knowledge/research/HIT_PREDICTION_METHOD.md",
    title: "Hit Prediction — Method & Limits",
    section: "Research",
    summary:
      "Why the score comes from the sliders and not the audio file, what transferred from the source study, and the reasons not to over-trust the number.",
    route: "/hitlab",
    tags: ["ml", "prediction", "audio features"],
    source: "ebtezcan/Spotify-Song-Popularity-Prediction",
  },
  {
    path: "knowledge/research/CATALOG_ANALYTICS_METHOD.md",
    title: "Catalog & Sales Analytics — Method",
    section: "Research",
    summary:
      "The thirteen business questions, the decision each one drives, and how they map onto RIPPL's schema.",
    route: "/dashboard",
    tags: ["sql", "analytics", "metrics"],
    source: "dphelan61 + Divleen-0619",
  },

  // ── Checklists ──
  {
    path: "knowledge/checklists/RELEASE_DAY_CHECKLIST.md",
    title: "Release Day Checklist",
    section: "Checklists",
    summary:
      "T−24h, release hour, first 6 hours, end of day — and the three things never to do on release day.",
    route: "/tasks",
    tags: ["release", "checklist"],
  },
  {
    path: "knowledge/checklists/DSP_PITCH_CHECKLIST.md",
    title: "DSP Pitch Checklist",
    section: "Checklists",
    summary:
      "Hard rule: submitted no later than 4 weeks out. Prerequisites, the pitch fields, and what happens after.",
    route: "/releases",
    tags: ["dsp", "pitch", "editorial"],
  },
  {
    path: "knowledge/checklists/CONTRACT_REVIEW_CHECKLIST.md",
    title: "Contract Review Checklist",
    section: "Checklists",
    summary:
      "Triage list across identify / money / control / exit, plus six red flags worth stopping over.",
    route: "/vault",
    tags: ["legal", "contracts", "red flags"],
  },
  {
    path: "knowledge/checklists/LIVE_SHOW_ADVANCE_CHECKLIST.md",
    title: "Live Show Advance Checklist",
    section: "Checklists",
    summary:
      "Before confirming, advance at T−3 weeks, ticketing, day of, and settlement.",
    route: "/live",
    tags: ["live", "touring", "advance"],
    source: "lucpod/ticketless",
  },
  {
    path: "knowledge/checklists/ARTIST_ONBOARDING_CHECKLIST.md",
    title: "Artist Onboarding Checklist",
    section: "Checklists",
    summary:
      "Signed to operational in 14 days: legal, digital, catalog, operations, financial.",
    route: "/roster",
    tags: ["onboarding", "a&r"],
  },
  {
    path: "knowledge/checklists/SECURITY_AND_LAUNCH_CHECKLIST.md",
    title: "Security & Launch Checklist",
    section: "Checklists",
    summary:
      "Run before every production deploy: secrets, auth, RLS, storage, data, build.",
    route: "/settings",
    tags: ["security", "deploy", "rls"],
  },

  // ── Templates ──
  {
    path: "knowledge/templates/KPI_SCORECARD.md",
    title: "KPI Scorecard",
    section: "Templates",
    summary:
      "Weekly and monthly scorecards with targets, plus decisions taken and one thing to stop doing.",
    route: "/home",
    tags: ["kpi", "weekly", "review"],
  },
  {
    path: "knowledge/templates/WEEKLY_EXECUTION_TEMPLATE.md",
    title: "Weekly Execution Template",
    section: "Templates",
    summary:
      "Monday plan, Tue–Thu ship, Friday read, weekend compound — with four non-negotiable rules.",
    route: "/tasks",
    tags: ["weekly", "cadence"],
  },
  {
    path: "knowledge/templates/COMMISSION_QUOTE_TEMPLATE.md",
    title: "Commission Quote Template",
    section: "Templates",
    summary:
      "Scope in / scope out / rights / timeline / commercials / terms. Mirrors the quote PDF generated from /invoices.",
    route: "/invoices",
    tags: ["quote", "scope", "terms"],
  },
  {
    path: "knowledge/templates/SALES_TRACKER.csv",
    title: "Sales Tracker (CSV)",
    section: "Templates",
    summary: "Per-job revenue, deposit, invoice number, days to pay.",
    route: "/invoices",
    tags: ["csv", "sales"],
  },
  {
    path: "knowledge/templates/CLIENT_PIPELINE.csv",
    title: "Client Pipeline (CSV)",
    section: "Templates",
    summary:
      "Stage, probability, estimated value, next action, objection, owner.",
    route: "/roster",
    tags: ["csv", "pipeline"],
  },
  {
    path: "knowledge/templates/RELEASE_CALENDAR.csv",
    title: "Release Calendar (CSV)",
    section: "Templates",
    summary: "Release date, pitch deadline, asset readiness, budget, owner.",
    route: "/calendar",
    tags: ["csv", "release"],
  },
  {
    path: "knowledge/templates/OUTREACH_TRACKER.csv",
    title: "Creator Outreach Tracker (CSV)",
    section: "Templates",
    summary:
      "Per-creator brief status, agreed rate, deliverables, and 3s-retention results.",
    route: "/creators",
    tags: ["csv", "creators"],
  },
  {
    path: "knowledge/templates/ROYALTY_SPLIT_SHEET.csv",
    title: "Royalty Split Sheet (CSV)",
    section: "Templates",
    summary:
      "Writer, publisher and master shares recorded separately, with PRO and IPI fields.",
    route: "/vault",
    tags: ["csv", "splits"],
  },
  {
    path: "knowledge/templates/AFFILIATE_LEDGER.csv",
    title: "Affiliate Ledger (CSV)",
    section: "Templates",
    summary:
      "Clicks, signups, conversions, referred revenue, commission owed, payout status.",
    route: "/affiliates",
    tags: ["csv", "affiliate"],
    source: "precisep/Business",
  },

  // ── Prompts ──
  {
    path: "knowledge/prompts/AR_SCOUTING_PROMPTS.md",
    title: "A&R & Scouting Prompts",
    section: "Prompts",
    summary:
      "Artist thesis, catalog triage, first-contact DM, and a 90-day development plan generator.",
    route: "/techlab",
    tags: ["prompts", "a&r"],
  },
  {
    path: "knowledge/prompts/UGC_HOOK_GENERATOR.md",
    title: "UGC Hook Generator Prompts",
    section: "Prompts",
    summary:
      "Bulk hook generation to CSV, rewriting from a winner, captions and pinned comments, creator briefs.",
    route: "/studio",
    tags: ["prompts", "ugc"],
  },
  {
    path: "knowledge/prompts/PITCH_AND_OUTREACH.md",
    title: "Pitch & Outreach Prompts",
    section: "Prompts",
    summary:
      "DSP editorial pitch, sync pitch email, brand outreach, and a three-message follow-up ladder.",
    route: "/techlab",
    tags: ["prompts", "pitch", "sync"],
  },
  {
    path: "knowledge/prompts/CONTRACT_SUMMARIZER.md",
    title: "Contract Summarizer Prompts",
    section: "Prompts",
    summary:
      "Plain-language summary, red-flag scan, and clause-by-clause comparison. Triage only, never a substitute for a lawyer.",
    route: "/vault",
    tags: ["prompts", "legal"],
  },

  // ── Plans ──
  {
    path: "knowledge/plans/90_DAY_EXECUTION_PLAN.md",
    title: "90-Day Execution Plan",
    section: "Plans",
    summary:
      "Foundation → first cycle → release & learn. One primary outcome per week with exit criteria.",
    route: "/tasks",
    tags: ["plan", "90 days"],
  },
  {
    path: "knowledge/plans/180_DAY_SCALING_PLAN.md",
    title: "180-Day Scaling Plan",
    section: "Plans",
    summary:
      "More throughput without more chaos, plus choosing exactly one second revenue line. Five guardrails.",
    route: "/dashboard",
    tags: ["plan", "scaling"],
  },
];

export const SECTIONS: KnowledgeSection[] = [
  "Foundations",
  "Systems",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
  "Research",
  "Checklists",
  "Templates",
  "Prompts",
  "Plans",
];

export function searchKnowledge(q: string): KnowledgeDoc[] {
  const s = q.trim().toLowerCase();
  if (!s) return KNOWLEDGE;
  return KNOWLEDGE.filter((d) =>
    `${d.title} ${d.summary} ${d.section} ${d.tags.join(" ")} ${d.source ?? ""}`
      .toLowerCase()
      .includes(s),
  );
}
