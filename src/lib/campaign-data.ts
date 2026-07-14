/* ═══════════════════════════════════════════════════════════
   GROUNDED CAMPAIGN DATA
   Extracted from real marketing plans:
   • Latifa — "The Story of Us" 2025 album (12 tracks, 2 phases)
   • Antigoni — 2025 Dubai/Cairo release plan
   • ETOLUBOV ft. Ramy Sabry — "Attraction" promo plan
   • D4 Music Marketing — 6-phase single release checklist
   These frameworks drive every module in the dashboard.
═══════════════════════════════════════════════════════════ */

export type Platform =
  | "TikTok" | "Instagram" | "YouTube" | "Facebook" | "X"
  | "Anghami" | "Spotify" | "Radio" | "TV";

/* ── Tracks (Latifa · The Story of Us) ──────────────────────── */
export interface Track {
  n: number;
  title: string;
  titleAr: string;
  phase: 1 | 2;
  tag: string;
  focus: string[];
  platforms: string[];
}
export const latifaTracks: Track[] = [
  { n: 1,  title: "Sorry",        titleAr: "سوري",        phase: 1, tag: "Lead Single",     focus: ["Flagship music video", "TikTok dance challenge", "Radio + TV push"], platforms: ["TikTok", "YouTube", "Radio"] },
  { n: 2,  title: "Ma3rafaksh",   titleAr: "معرفكش",      phase: 1, tag: "Viral Potential", focus: ["Lip-sync trends", "Instagram Reels campaign", "Influencer collabs"], platforms: ["TikTok", "Instagram"] },
  { n: 3,  title: "3andna Wi Bas",titleAr: "عندنا وبس",   phase: 1, tag: "Anthem",          focus: ["Brand partnerships & sync", "Empowerment campaign", "Fan content prompts"], platforms: ["Instagram", "TikTok"] },
  { n: 4,  title: "Akhbark Eh",   titleAr: "أخبارك إيه",  phase: 1, tag: "Pop Ballad",      focus: ["IG story trends", "Acoustic & live sessions", "Fan question campaign"], platforms: ["Instagram"] },
  { n: 5,  title: "Alby Erta7",   titleAr: "قلبي ارتاح",  phase: 1, tag: "Disco Vibes",     focus: ["Remix collaborations", "Wedding & celebration playlists", "Feel-good social"], platforms: ["Spotify", "Instagram"] },
  { n: 6,  title: "Hala Hala",    titleAr: "هال هال",     phase: 1, tag: "Gulf Appeal",     focus: ["Gulf radio exclusive", "Gulf influencer dance", "Wedding season push"], platforms: ["Radio", "TikTok"] },
  { n: 7,  title: "Ektshaft",     titleAr: "اكتشفت",      phase: 2, tag: "Introspective",   focus: ["Story-driven music video", "Intimate live performance", "Fan reflection"], platforms: ["YouTube"] },
  { n: 8,  title: "2abl Ma Teb3ed",titleAr: "قبل ما تبعد",phase: 2, tag: "Transitional",    focus: ["Lyric video with story", "Playlist placement", "Relationship partnership"], platforms: ["Spotify", "YouTube"] },
  { n: 9,  title: "Hate'bal",     titleAr: "هتقبل",       phase: 2, tag: "Poetic",          focus: ["Poetry visualization", "ASMR/spatial audio", "Fan poetry competition"], platforms: ["YouTube", "Spotify"] },
  { n: 10, title: "Teslamly",     titleAr: "تسلملي",      phase: 2, tag: "Wedding Song",     focus: ["Wedding planner partnerships", "Wedding season campaign", "Couple choreography"], platforms: ["Instagram", "Radio"] },
  { n: 11, title: "Ya Leil",      titleAr: "قلبي حن",     phase: 2, tag: "Night Ballad",     focus: ["Night visual aesthetics", "Night-time playlists", "Ambient remix"], platforms: ["Spotify"] },
  { n: 12, title: "Tetraggy Fe Meen", titleAr: "تترجى في مين", phase: 2, tag: "Grand Finale", focus: ["TV special performance", "Press feature campaign", "Awards submission"], platforms: ["TV", "YouTube"] },
];

/* ── Narrative arcs (album emotional journey) ───────────────── */
export const narrativeArcs = [
  { name: "Confrontation", tracks: "1–2",  color: "oklch(0.62 0.26 20)" },
  { name: "Empowerment",   tracks: "3–4",  color: "oklch(0.7 0.24 60)" },
  { name: "Celebration",   tracks: "5–6",  color: "oklch(0.82 0.2 90)" },
  { name: "Introspection", tracks: "7–8",  color: "oklch(0.66 0.2 250)" },
  { name: "Vulnerability", tracks: "9–10", color: "oklch(0.6 0.26 300)" },
  { name: "Resolution",    tracks: "11–12",color: "oklch(0.7 0.28 328)" },
];

/* ── Release timeline (singles every ~3 weeks) ──────────────── */
export interface TimelineItem {
  date: string;
  title: string;
  type: "Single" | "Video" | "Remix" | "Announce" | "Album" | "Event";
  status: "done" | "active" | "upcoming";
  channel: string;
}
export const releaseTimeline: TimelineItem[] = [
  { date: "Feb 14", title: "Album teaser — visual concept reveal", type: "Announce", status: "done",     channel: "All platforms" },
  { date: "Mar 07", title: "Lead single “Sorry” + music video",   type: "Single",   status: "done",     channel: "TikTok · YouTube · Radio" },
  { date: "Mar 28", title: "“Ma3rafaksh” — viral Reels push",      type: "Single",   status: "active",   channel: "TikTok · Instagram" },
  { date: "Apr 18", title: "“3andna Wi Bas” — anthem + sync",      type: "Single",   status: "upcoming", channel: "Instagram · Brand" },
  { date: "May 09", title: "“Akhbark Eh” — IG story trends",       type: "Single",   status: "upcoming", channel: "Instagram" },
  { date: "May 30", title: "“Alby Erta7” — disco remix",           type: "Remix",    status: "upcoming", channel: "Spotify · Instagram" },
  { date: "Jun 20", title: "“Hala Hala” — Gulf radio exclusive",   type: "Single",   status: "upcoming", channel: "Gulf Radio · TikTok" },
  { date: "Jul 11", title: "Phase 2 opener “Ektshaft”",            type: "Video",    status: "upcoming", channel: "YouTube" },
  { date: "Spring", title: "Full album + Kadim Al Saher duet finale",  type: "Album",    status: "upcoming", channel: "Anghami · MBC · Vogue Arabia" },
];

/* ── 6-phase release checklist (D4 Music Marketing) ─────────── */
export interface ChecklistItem { id: string; label: string; done: boolean; }
export interface ChecklistPhase { phase: string; items: ChecklistItem[]; }
export const releaseChecklist: ChecklistPhase[] = [
  { phase: "1 · Preparation", items: [
    { id: "p1a", label: "Mixed & mastered audio file", done: true },
    { id: "p1b", label: "Cover art designed (3000×3000)", done: true },
    { id: "p1c", label: "Promo content planned (video + photo)", done: true },
    { id: "p1d", label: "Song registered with PRO / publishing admin", done: true },
    { id: "p1e", label: "Release date set + splits decided", done: true },
  ]},
  { phase: "2 · Distribution", items: [
    { id: "p2a", label: "ISRC code + songwriter credits", done: true },
    { id: "p2b", label: "Uploaded to distributor + Anghami", done: true },
    { id: "p2c", label: "Lyrics formatted (Apple Music, Musixmatch)", done: true },
    { id: "p2d", label: "Scheduled release across DSPs", done: true },
  ]},
  { phase: "3 · Promotion Planning", items: [
    { id: "p3a", label: "Pre-save / pre-order smart link live", done: true },
    { id: "p3b", label: "Submitted for Anghami + Spotify editorial", done: true },
    { id: "p3c", label: "Single announcement post prepared", done: true },
    { id: "p3d", label: "Live stream planned (IG / YouTube Live)", done: false },
  ]},
  { phase: "4 · Days Before Release", items: [
    { id: "p4a", label: "Social posts ready w/ captions + hashtags", done: true },
    { id: "p4b", label: "Music video scheduled (YouTube + FB)", done: true },
    { id: "p4c", label: "Video clips prepped for social ads", done: false },
    { id: "p4d", label: "Email newsletter designed", done: false },
  ]},
  { phase: "5 · Day of Release", items: [
    { id: "p5a", label: "Promote across FB / IG / Stories / TikTok / X", done: false },
    { id: "p5b", label: "Upload music video (YouTube, FB, IGTV)", done: false },
    { id: "p5c", label: "Update smart link + profiles + banners", done: false },
    { id: "p5d", label: "Launch FB/IG + Spotify + YouTube ad campaigns", done: false },
  ]},
  { phase: "6 · Post-Release", items: [
    { id: "p6a", label: "Keep promoting + resend email to non-openers", done: false },
    { id: "p6b", label: "Pitch independent blog coverage (SubmitHub)", done: false },
    { id: "p6c", label: "Chase playlist adds + build themed playlist", done: false },
    { id: "p6d", label: "Schedule next single", done: false },
  ]},
];

/* ── 360 Channel plan ───────────────────────────────────────── */
export interface ChannelRow { name: string; owner: string; status: "Live" | "Planned" | "Booked"; metric: string; note: string; }

export const socialChannels: ChannelRow[] = [
  { name: "TikTok — dance challenges", owner: "Creator team", status: "Live", metric: "8.4K creations", note: "Phase 1 lead sound" },
  { name: "Instagram Reels + Stories", owner: "Social", status: "Live", metric: "38% ER WoW", note: "Visual concept drops, story polls" },
  { name: "YouTube — MV + shorts", owner: "Video", status: "Live", metric: "4.2M views", note: "Premieres + making-of docs" },
  { name: "Facebook + X cross-post", owner: "Social", status: "Live", metric: "9.8M reach", note: "Review/article cross-posting" },
];

export const paidChannels: ChannelRow[] = [
  { name: "TikTok Spark Ads", owner: "Media buyer", status: "Live", metric: "5.1x ROAS", note: "Amplify top organic UGC" },
  { name: "YouTube Ads (pre-roll/bumper)", owner: "Media buyer", status: "Live", metric: "$0.09 CPV", note: "MV trailer sequencing" },
  { name: "Meta (FB/IG) conversion ads", owner: "Media buyer", status: "Live", metric: "3.3x ROAS", note: "Pre-save conversion" },
  { name: "Spotify Ad Studio", owner: "Media buyer", status: "Planned", metric: "—", note: "Audio + video takeover" },
];

export const playlistTargets = [
  { name: "Anghami editorial — Arabic Pop", followers: "featured", status: "Booked" },
  { name: "Spotify — Eric Alper submission", followers: "28,927", status: "Planned" },
  { name: "Main Character Vibes (indie pop)", followers: "2,295", status: "Planned" },
  { name: "New Songs & New Artists", followers: "2,075", status: "Planned" },
  { name: "Playlist Push / SoundCampaign / Groover", followers: "pitching svc", status: "Planned" },
];

export const pressTargets = [
  { outlet: "Vogue Arabia", region: "MENA", type: "Feature", contact: "Editorial", status: "Booked" },
  { outlet: "MBC", region: "MENA", type: "TV feature", contact: "Programming", status: "Booked" },
  { outlet: "EARMILK", region: "US/CA", type: "Review", contact: "Editorial", status: "Planned" },
  { outlet: "CLASH", region: "UK", type: "Review", contact: "Robin Murray", status: "Planned" },
  { outlet: "Rolling Stone (regional)", region: "Global", type: "Fresh Picks", contact: "Editorial", status: "Planned" },
  { outlet: "Sistra", region: "Egypt/Africa", type: "Review", contact: "Editorial", status: "Planned" },
];

export const radioTargets = [
  { station: "Gulf radio network (exclusive)", region: "GCC", note: "“Hala Hala” priority" },
  { station: "MBC FM", region: "MENA", note: "Lead single rotation" },
  { station: "Nogoum FM", region: "Egypt", note: "On-air interview" },
  { station: "European Indie Music Network", region: "Global", note: "5,400 plays / 3 months" },
];

export const mediaPartners = ["Anghami", "MBC", "Vogue Arabia"];

/* ── Budget lines (grounded in plan spend categories) ───────── */
export interface BudgetLine { category: string; planned: number; spent: number; }
export const budgetLines: BudgetLine[] = [
  { category: "TikTok campaign / Spark Ads", planned: 120_000, spent: 84_200 },
  { category: "YouTube Ads", planned: 80_000, spent: 52_400 },
  { category: "Meta (FB/IG) Reels ads", planned: 90_000, spent: 61_800 },
  { category: "Playlisting & pitching", planned: 40_000, spent: 22_500 },
  { category: "PR / press campaign", planned: 55_000, spent: 31_000 },
  { category: "Radio & TV push", planned: 35_000, spent: 12_000 },
  { category: "Music videos & visualisers", planned: 150_000, spent: 118_000 },
  { category: "Photography & content shoot", planned: 45_000, spent: 38_000 },
  { category: "Travel & production (Dubai/Cairo)", planned: 60_000, spent: 42_000 },
];

/* ── Seed campaigns (3 real artists) ───────────────────────── */
export interface Campaign {
  id: string;
  artist: string;
  title: string;
  subtitle: string;
  status: "Active" | "Planning" | "Wrapped";
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  platforms: string[];
  goal: string;
  reach: string;
  seeded?: boolean;
}

export const seedCampaigns: Campaign[] = [
  {
    id: "latifa-story-of-us",
    artist: "Latifa",
    title: "The Story of Us",
    subtitle: "من أولها لآخرها · 12-track album · 2 phases",
    status: "Active",
    budget: 950_000, spent: 461_900,
    startDate: "Feb 14, 2025", endDate: "Spring 2025",
    platforms: ["TikTok", "Instagram", "YouTube", "Anghami", "Radio", "TV"],
    goal: "Chart performance + critical acclaim",
    reach: "128.6M",
    seeded: true,
  },
  {
    id: "antigoni-habibi",
    artist: "Antigoni",
    title: "Habibi · Ana",
    subtitle: "Dubai/Cairo rollout · singles + Arab House remixes",
    status: "Planning",
    budget: 220_000, spent: 48_000,
    startDate: "Feb 05, 2025", endDate: "Jun 29, 2025",
    platforms: ["TikTok", "Instagram", "YouTube"],
    goal: "MENA breakthrough + playlisting",
    reach: "18.4M",
    seeded: true,
  },
  {
    id: "etolubov-attraction",
    artist: "ETOLUBOV ft. Ramy Sabry",
    title: "Attraction",
    subtitle: "PR-led promo · press, playlists, radio",
    status: "Active",
    budget: 140_000, spent: 96_000,
    startDate: "Apr 01, 2025", endDate: "Jul 31, 2025",
    platforms: ["Instagram", "Spotify", "Radio", "X"],
    goal: "International press + playlist reach",
    reach: "9.8M",
    seeded: true,
  },
];
