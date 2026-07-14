/* ═══════════════════════════════════════════════════════════
   CAMPAIGN TEMPLATES — knowledge blocks extracted from the
   provided marketing-plan PDFs. Applying a template seeds a new
   campaign's release checklist, rollout timeline and channel plan.

   Sources:
   • D4 Music Marketing — Ultimate Single Release Checklist (6 phases)
   • ETOLUBOV ft. Ramy Sabry — PR / playlist / radio promo plan
   • Latifa "The Story of Us" + EP Marketing Plan — phased rollout
   • Antigoni 2025 — Dubai/Cairo regional release plan
   • SaskMusic funding tool — marketing-plan structure
═══════════════════════════════════════════════════════════ */

import type { ChecklistPhase, TimelineItem, ChannelRow } from "./campaign-data";

export interface CampaignTemplate {
  id: string;
  name: string;
  source: string;
  description: string;
  bestFor: string;
  checklist: ChecklistPhase[];
  timeline: Omit<TimelineItem, "status">[];
  channels: {
    social: ChannelRow[];
    paid: ChannelRow[];
    playlists: { name: string; followers: string; status: string }[];
    press: { outlet: string; region: string; type: string; contact: string; status: string }[];
    radio: { station: string; region: string; note: string }[];
  };
}

/* ── 1 · Single Release (D4 6-phase checklist) ──────────────── */
const singleReleaseChecklist: ChecklistPhase[] = [
  { phase: "1 · Preparation", items: [
    { id: "prep-master", label: "Mixed & mastered audio (16-bit/44.1kHz WAV)", done: false },
    { id: "prep-art", label: "Cover art designed (3000×3000 JPEG/PNG)", done: false },
    { id: "prep-content", label: "Plan promo content (videos + photos)", done: false },
    { id: "prep-pro", label: "Register song with PRO / publishing admin", done: false },
    { id: "prep-splits", label: "Decide song splits + set release date (2–4 wks out)", done: false },
  ]},
  { phase: "2 · Distribution", items: [
    { id: "dist-isrc", label: "ISRC code + songwriter credits", done: false },
    { id: "dist-upload", label: "Upload to distributor", done: false },
    { id: "dist-lyrics", label: "Lyrics formatted (Apple Music, Musixmatch)", done: false },
    { id: "dist-schedule", label: "Schedule release across DSPs", done: false },
  ]},
  { phase: "3 · Promotion Planning", items: [
    { id: "promo-presave", label: "Pre-save / pre-order smart link live", done: false },
    { id: "promo-editorial", label: "Submit for editorial playlist consideration", done: false },
    { id: "promo-announce", label: "Single announcement post prepared", done: false },
    { id: "promo-live", label: "Plan live stream (IG / YouTube Live)", done: false },
  ]},
  { phase: "4 · Days Before Release", items: [
    { id: "before-posts", label: "Social posts ready w/ captions + hashtags", done: false },
    { id: "before-video", label: "Music video scheduled (YouTube + FB)", done: false },
    { id: "before-ads", label: "Video clips prepped for social ads", done: false },
    { id: "before-email", label: "Email newsletter designed", done: false },
  ]},
  { phase: "5 · Day of Release", items: [
    { id: "day-promote", label: "Promote across FB / IG / Stories / TikTok / X", done: false },
    { id: "day-video", label: "Upload music video (YouTube, FB, IGTV)", done: false },
    { id: "day-links", label: "Update smart link + profiles + banners", done: false },
    { id: "day-ads", label: "Launch FB/IG + Spotify + YouTube ad campaigns", done: false },
  ]},
  { phase: "6 · Post-Release", items: [
    { id: "post-promote", label: "Keep promoting + resend email to non-openers", done: false },
    { id: "post-blogs", label: "Pitch independent blog coverage (SubmitHub)", done: false },
    { id: "post-playlists", label: "Chase playlist adds + build themed playlist", done: false },
    { id: "post-next", label: "Schedule next single", done: false },
  ]},
];

const emptyChannels = { social: [], paid: [], playlists: [], press: [], radio: [] } as CampaignTemplate["channels"];

export const campaignTemplates: CampaignTemplate[] = [
  {
    id: "single-release",
    name: "Single Release",
    source: "D4 Music Marketing — Ultimate Single Release Checklist",
    description: "The complete 6-phase rollout for one single: preparation, distribution, promotion, launch day and post-release.",
    bestFor: "A single or lead track with a 4–6 week runway.",
    checklist: singleReleaseChecklist,
    timeline: [
      { date: "Week -4", title: "Master + art locked, release date set", type: "Announce", channel: "Internal" },
      { date: "Week -2", title: "Pre-save link live + editorial submitted", type: "Announce", channel: "DSPs · Social" },
      { date: "Week -1", title: "Announcement post + video scheduled", type: "Video", channel: "YouTube · Social" },
      { date: "Day 0", title: "Single + music video release", type: "Single", channel: "All platforms" },
      { date: "Week +2", title: "Blog + playlist push, next single planned", type: "Event", channel: "PR · Playlists" },
    ],
    channels: {
      social: [
        { name: "TikTok — teaser + trend", owner: "Social", status: "Planned", metric: "—", note: "Hook-led short clips" },
        { name: "Instagram Reels + Stories", owner: "Social", status: "Planned", metric: "—", note: "Countdown, snippets" },
      ],
      paid: [
        { name: "Meta (FB/IG) ads", owner: "Media buyer", status: "Planned", metric: "—", note: "Pre-save conversion" },
        { name: "YouTube + Spotify Ads", owner: "Media buyer", status: "Planned", metric: "—", note: "Video views + audio" },
      ],
      playlists: [{ name: "Editorial + curator submissions (SubmitHub)", followers: "—", status: "Planned" }],
      press: [],
      radio: [],
    },
  },
  {
    id: "album-rollout",
    name: "Album / EP Rollout",
    source: "Latifa 'The Story of Us' + EP Marketing Plan",
    description: "Multi-phase rollout: a commercial single every ~3 weeks, then the full project. Two marketing phases (commercial appeal → emotional depth).",
    bestFor: "An album or EP with several singles and a phased narrative.",
    checklist: [
      { phase: "Phase 1 · Commercial", items: [
        { id: "p1-teaser", label: "Album teaser — visual concept reveal", done: false },
        { id: "p1-lead", label: "Lead single + flagship music video", done: false },
        { id: "p1-tiktok", label: "TikTok dance/lip-sync challenge for lead", done: false },
        { id: "p1-singles", label: "Roll one commercial single every ~3 weeks", done: false },
        { id: "p1-sync", label: "Brand partnerships & sync for anthem track", done: false },
      ]},
      { phase: "Phase 2 · Emotional", items: [
        { id: "p2-open", label: "Phase 2 opener — story-driven MV", done: false },
        { id: "p2-lyric", label: "Lyric videos + playlist placement", done: false },
        { id: "p2-radio", label: "Radio exclusives + interviews", done: false },
        { id: "p2-press", label: "Press features & photoshoots", done: false },
      ]},
      { phase: "Finale · Full Project", items: [
        { id: "fin-album", label: "Full album release + headline collab", done: false },
        { id: "fin-tv", label: "TV special performance", done: false },
        { id: "fin-awards", label: "Awards submission + recap report", done: false },
      ]},
    ],
    timeline: [
      { date: "Wk 0", title: "Album teaser — concept reveal", type: "Announce", channel: "All platforms" },
      { date: "Wk 3", title: "Lead single + music video", type: "Single", channel: "TikTok · YouTube · Radio" },
      { date: "Wk 6", title: "Single 2 — viral Reels push", type: "Single", channel: "TikTok · Instagram" },
      { date: "Wk 9", title: "Single 3 — anthem + sync", type: "Single", channel: "Instagram · Brand" },
      { date: "Wk 12", title: "Phase 2 opener", type: "Video", channel: "YouTube" },
      { date: "Finale", title: "Full album + headline collab", type: "Album", channel: "Anghami · TV · Press" },
    ],
    channels: {
      social: [
        { name: "TikTok — phase challenges", owner: "Creator team", status: "Planned", metric: "—", note: "Dance (P1) → lyric (P2)" },
        { name: "Instagram — visual drops", owner: "Social", status: "Planned", metric: "—", note: "Concept reveals, story polls" },
        { name: "YouTube — MV + making-of", owner: "Video", status: "Planned", metric: "—", note: "Premieres + docs" },
      ],
      paid: [
        { name: "TikTok Spark Ads", owner: "Media buyer", status: "Planned", metric: "—", note: "Amplify top organic" },
        { name: "YouTube + Meta ads", owner: "Media buyer", status: "Planned", metric: "—", note: "Trailer + conversion" },
      ],
      playlists: [{ name: "Anghami editorial — Arabic Pop", followers: "editorial", status: "Planned" }],
      press: [
        { outlet: "Vogue Arabia", region: "MENA", type: "Feature", contact: "Editorial", status: "Planned" },
        { outlet: "MBC", region: "MENA", type: "TV feature", contact: "Programming", status: "Planned" },
      ],
      radio: [{ station: "Gulf radio network", region: "GCC", note: "Regional single priority" }],
    },
  },
  {
    id: "pr-playlist-push",
    name: "360 PR & Playlist Push",
    source: "ETOLUBOV ft. Ramy Sabry — 'Attraction' promo plan",
    description: "PR-led international campaign: online media features, playlist pitching, radio network plays and social seeding.",
    bestFor: "Building press, playlist and radio reach across regions.",
    checklist: [
      { phase: "PR / Online Media", items: [
        { id: "pr-features", label: "Secure guaranteed reviews/features", done: false },
        { id: "pr-submissions", label: "Submit to non-guaranteed tier (Billboard, CLASH, FADER…)", done: false },
        { id: "pr-crosspost", label: "Cross-post published articles to social", done: false },
      ]},
      { phase: "Playlists", items: [
        { id: "pl-editorial", label: "Submit to editorial + curator playlists", done: false },
        { id: "pl-services", label: "Run pitching services (Playlist Push, SoundCampaign, Groover)", done: false },
      ]},
      { phase: "Radio", items: [
        { id: "rad-network", label: "Book indie radio network plays (3-month window)", done: false },
        { id: "rad-interview", label: "Secure on-air interviews", done: false },
      ]},
      { phase: "Targeting", items: [
        { id: "tgt-growth", label: "Launch IG + Spotify growth targeting", done: false },
        { id: "tgt-report", label: "Track submissions in reporting sheet", done: false },
      ]},
    ],
    timeline: [
      { date: "Wk 0", title: "PR kit + press list finalised", type: "Announce", channel: "PR" },
      { date: "Wk 1", title: "Playlist pitching begins", type: "Event", channel: "Playlists" },
      { date: "Wk 2", title: "Radio network plays start", type: "Event", channel: "Radio" },
      { date: "Wk 3", title: "Feature waves + social cross-post", type: "Event", channel: "Press · Social" },
    ],
    channels: {
      social: [{ name: "TikTok + IG creator seeding", owner: "Social", status: "Planned", metric: "—", note: "Submit to curators/influencers" }],
      paid: [{ name: "IG + Spotify growth (Your Music Marketing / Toneden)", owner: "Media buyer", status: "Planned", metric: "—", note: "AI-assisted targeting" }],
      playlists: [
        { name: "Eric Alper (Spotify)", followers: "28,927", status: "Planned" },
        { name: "Main Character Vibes (indie pop)", followers: "2,295", status: "Planned" },
        { name: "Playlist Push / SoundCampaign / Groover", followers: "pitching svc", status: "Planned" },
      ],
      press: [
        { outlet: "EARMILK", region: "US/CA", type: "Review", contact: "Editorial", status: "Planned" },
        { outlet: "CLASH", region: "UK", type: "Review", contact: "Robin Murray", status: "Planned" },
        { outlet: "Billboard Fresh Picks", region: "US", type: "Submission", contact: "Editorial", status: "Planned" },
      ],
      radio: [
        { station: "European Indie Music Network", region: "Global", note: "5,400 plays / 3 months" },
        { station: "BORDO FM & TV", region: "France", note: "Web + FM plays" },
      ],
    },
  },
  {
    id: "regional-release",
    name: "Regional Release (Gulf / MENA)",
    source: "Antigoni 2025 — Dubai/Cairo release plan",
    description: "Location-based rollout with studio sessions, music-video shoots, local content and regional marketing spend.",
    bestFor: "A release anchored on a city/region with on-the-ground production.",
    checklist: [
      { phase: "Production Trip", items: [
        { id: "reg-studio", label: "Book studio sessions + local collaborators", done: false },
        { id: "reg-mv", label: "Shoot music video + social content on location", done: false },
        { id: "reg-meetings", label: "Label / DSP meetings (e.g. Anghami)", done: false },
      ]},
      { phase: "Content", items: [
        { id: "reg-visualisers", label: "Cut visualisers for TikTok/Instagram/Shorts", done: false },
        { id: "reg-bts", label: "Behind-the-scenes + photoshoot", done: false },
      ]},
      { phase: "Release + Remix", items: [
        { id: "reg-original", label: "Original version release", done: false },
        { id: "reg-remix", label: "Regional remix with local DJ/artist", done: false },
      ]},
      { phase: "Marketing Spend", items: [
        { id: "reg-yt", label: "YouTube Ads", done: false },
        { id: "reg-tt", label: "TikTok campaign", done: false },
        { id: "reg-reels", label: "Reels boost", done: false },
        { id: "reg-playlist", label: "Playlisting", done: false },
      ]},
    ],
    timeline: [
      { date: "Days 1–7", title: "Production trip — sessions + MV shoot", type: "Event", channel: "On location" },
      { date: "Wk 4", title: "Original version release + music video", type: "Single", channel: "TikTok · YouTube" },
      { date: "Wk 7", title: "Regional remix release", type: "Remix", channel: "Spotify · Radio" },
    ],
    channels: {
      social: [{ name: "Location content — TikTok/IG/Shorts", owner: "Content", status: "Planned", metric: "—", note: "Visualisers + BTS" }],
      paid: [
        { name: "YouTube Ads", owner: "Media buyer", status: "Planned", metric: "—", note: "MV push" },
        { name: "TikTok campaign + Reels", owner: "Media buyer", status: "Planned", metric: "—", note: "Regional targeting" },
      ],
      playlists: [{ name: "Regional editorial playlisting", followers: "—", status: "Planned" }],
      press: [],
      radio: [{ station: "Regional radio", region: "MENA/Gulf", note: "Original + remix rotation" }],
    },
  },
  {
    id: "blank",
    name: "Blank Campaign",
    source: "—",
    description: "Start from scratch with no pre-filled checklist, timeline or channels.",
    bestFor: "A custom campaign you'll build up yourself.",
    checklist: [],
    timeline: [],
    channels: emptyChannels,
  },
];

export function getTemplate(id?: string): CampaignTemplate | undefined {
  return campaignTemplates.find((t) => t.id === id);
}
