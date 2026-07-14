export type Tier = "Featured" | "Mega" | "Macro" | "Mid" | "Micro";
export type Platform =
  | "TikTok"
  | "Instagram"
  | "Facebook"
  | "YouTube"
  | "X"
  | "LinkedIn"
  | "Snapchat"
  | "Threads"
  | "Pinterest";
export type Status = "Confirmed" | "Pending" | "Priced" | "Rejected";

export interface Creator {
  id: string;
  name: string;
  handle: string;
  platform: Platform;
  tier: Tier;
  followers: number;
  avgViews: number;
  engagement: number;
  price: number;
  status: Status;
  city: string;
}

export const creators: Creator[] = [
  { id: "1", name: "Pasmala", handle: "@pasmala24", platform: "TikTok", tier: "Featured", followers: 5100000, avgViews: 1020000, engagement: 12.1, price: 15000, status: "Priced", city: "Cairo" },
  { id: "2", name: "Zyad Elshazly", handle: "@zyad_elshazly", platform: "TikTok", tier: "Featured", followers: 2600000, avgViews: 780000, engagement: 11.8, price: 80000, status: "Confirmed", city: "Cairo" },
  { id: "3", name: "Bassant", handle: "@bassant33", platform: "Instagram", tier: "Featured", followers: 7100000, avgViews: 710000, engagement: 9.2, price: 15000, status: "Pending", city: "Cairo" },
  { id: "4", name: "Haneen Hena", handle: "@haneenhena", platform: "TikTok", tier: "Featured", followers: 3900000, avgViews: 585000, engagement: 10.5, price: 20000, status: "Confirmed", city: "Cairo" },
  { id: "5", name: "Renad Mohammed", handle: "@renaddmuhammed", platform: "Instagram", tier: "Featured", followers: 3500000, avgViews: 350000, engagement: 8.9, price: 8000, status: "Pending", city: "Cairo" },
  { id: "6", name: "Sandiiyy", handle: "@sandiiyy_", platform: "TikTok", tier: "Featured", followers: 1300000, avgViews: 325000, engagement: 11.2, price: 5000, status: "Confirmed", city: "Cairo" },
  { id: "7", name: "Sherif Khalid", handle: "@sherifkhalidd", platform: "TikTok", tier: "Mega", followers: 11200000, avgViews: 3360000, engagement: 13.4, price: 15000, status: "Confirmed", city: "Cairo" },
  { id: "8", name: "Ozooo19", handle: "@ozooo19", platform: "TikTok", tier: "Mega", followers: 10600000, avgViews: 3180000, engagement: 12.8, price: 8000, status: "Priced", city: "Cairo" },
  { id: "9", name: "Abdullah El Tourky", handle: "@abdullah_eltourky", platform: "Instagram", tier: "Macro", followers: 9700000, avgViews: 873000, engagement: 8.5, price: 80000, status: "Pending", city: "Cairo" },
  { id: "10", name: "Shehab Eldin", handle: "@shehab.eldin", platform: "Instagram", tier: "Macro", followers: 8900000, avgViews: 801000, engagement: 8.2, price: 20000, status: "Priced", city: "Cairo" },
  { id: "11", name: "Gehad Hassan", handle: "@gehadhassann", platform: "Instagram", tier: "Macro", followers: 8700000, avgViews: 783000, engagement: 8.4, price: 15000, status: "Pending", city: "Cairo" },
  { id: "12", name: "Haidy Kamel", handle: "@haidyykamel", platform: "Instagram", tier: "Macro", followers: 6400000, avgViews: 576000, engagement: 7.8, price: 70000, status: "Confirmed", city: "Cairo" },
  { id: "13", name: "Malak Abdelnaby", handle: "@malakabdelnaby3", platform: "Instagram", tier: "Macro", followers: 6900000, avgViews: 621000, engagement: 8.1, price: 25000, status: "Pending", city: "Cairo" },
  { id: "14", name: "Mayar Nagiib", handle: "@mayare.nagiib", platform: "TikTok", tier: "Macro", followers: 2800000, avgViews: 560000, engagement: 9.8, price: 7000, status: "Pending", city: "Cairo" },
  { id: "15", name: "Shahd Mohamed", handle: "@shahd_m7amed1", platform: "Instagram", tier: "Macro", followers: 1900000, avgViews: 285000, engagement: 7.2, price: 5000, status: "Priced", city: "Cairo" },
  { id: "16", name: "Heba Khalid", handle: "@wwwhabo.comm", platform: "TikTok", tier: "Macro", followers: 2400000, avgViews: 432000, engagement: 9.5, price: 10000, status: "Pending", city: "Cairo" },
  { id: "17", name: "Haneen (xx_haneen)", handle: "@xx_haneen0_1xx", platform: "TikTok", tier: "Mid", followers: 5800000, avgViews: 1160000, engagement: 10.3, price: 20000, status: "Confirmed", city: "Cairo" },
  { id: "18", name: "Moonly", handle: "@momeenalaa", platform: "TikTok", tier: "Mid", followers: 4100000, avgViews: 656000, engagement: 10.1, price: 12000, status: "Pending", city: "Cairo" },
  { id: "19", name: "Bombenoz", handle: "@Bombenoz", platform: "TikTok", tier: "Mid", followers: 4400000, avgViews: 880000, engagement: 11.2, price: 8000, status: "Priced", city: "Cairo" },
  { id: "20", name: "Nancy Yasser", handle: "@nancyy.yasserr", platform: "TikTok", tier: "Mid", followers: 3100000, avgViews: 465000, engagement: 9.8, price: 8000, status: "Pending", city: "Cairo" },
  { id: "21", name: "Rahma Ayman", handle: "@rahmaaayman_", platform: "Instagram", tier: "Mid", followers: 593900, avgViews: 89085, engagement: 7.1, price: 5000, status: "Pending", city: "Cairo" },
  { id: "22", name: "Salwa Hijazi", handle: "@salwahijazi_", platform: "Instagram", tier: "Mid", followers: 1400000, avgViews: 280000, engagement: 8.2, price: 5000, status: "Priced", city: "Cairo" },
  { id: "23", name: "Rahma Waled", handle: "@rahmawaled230", platform: "TikTok", tier: "Mid", followers: 2000000, avgViews: 400000, engagement: 9.4, price: 5000, status: "Pending", city: "Cairo" },
  { id: "24", name: "Romisaa Faried", handle: "@romisaafaried.official", platform: "Instagram", tier: "Mid", followers: 1600000, avgViews: 320000, engagement: 8.3, price: 5000, status: "Pending", city: "Cairo" },
  { id: "25", name: "Dahab Elmessiri", handle: "@dahabelmessiri", platform: "TikTok", tier: "Mid", followers: 1700000, avgViews: 340000, engagement: 9.1, price: 6000, status: "Pending", city: "Cairo" },
  { id: "26", name: "Hamo Elkot", handle: "@hamoelkot74", platform: "TikTok", tier: "Mid", followers: 1300000, avgViews: 260000, engagement: 8.9, price: 6000, status: "Pending", city: "Cairo" },
  { id: "27", name: "Sohila Alia", handle: "@sohilaqotb1", platform: "Instagram", tier: "Mid", followers: 1100000, avgViews: 220000, engagement: 7.8, price: 4000, status: "Pending", city: "Cairo" },
  { id: "28", name: "Donia Doka", handle: "@doniadoka_official", platform: "TikTok", tier: "Mid", followers: 1400000, avgViews: 280000, engagement: 8.6, price: 7000, status: "Pending", city: "Cairo" },
  { id: "29", name: "Eslam Atef Saed", handle: "@eslamatefsaed_", platform: "TikTok", tier: "Mid", followers: 1800000, avgViews: 360000, engagement: 9.2, price: 8000, status: "Pending", city: "Cairo" },
  { id: "30", name: "Mayaa Felfel", handle: "@mayaafelfel", platform: "TikTok", tier: "Micro", followers: 163400, avgViews: 49020, engagement: 11.8, price: 7000, status: "Pending", city: "Cairo" },
  { id: "31", name: "Lujain Kamell", handle: "@lujainkamell", platform: "Instagram", tier: "Micro", followers: 650700, avgViews: 130140, engagement: 8.5, price: 5000, status: "Pending", city: "Cairo" },
  { id: "32", name: "Youssef Khaled", handle: "@yousseff.khaled", platform: "TikTok", tier: "Micro", followers: 10700, avgViews: 3210, engagement: 9.8, price: 3000, status: "Pending", city: "Cairo" },
  { id: "33", name: "Ahmed Nagy", handle: "@ahmednagy1010", platform: "TikTok", tier: "Mid", followers: 1500000, avgViews: 450000, engagement: 10.2, price: 15000, status: "Pending", city: "Cairo" },
  { id: "34", name: "Ebram Saeed", handle: "@ebramsaed1", platform: "TikTok", tier: "Mid", followers: 1200000, avgViews: 360000, engagement: 9.5, price: 20000, status: "Pending", city: "Cairo" },
  { id: "35", name: "Rehab Ali", handle: "@_rehab_alii0", platform: "TikTok", tier: "Micro", followers: 500000, avgViews: 125000, engagement: 8.1, price: 3000, status: "Pending", city: "Cairo" },
  { id: "36", name: "Nada Mahmoud", handle: "@nada_mahmooud1", platform: "TikTok", tier: "Micro", followers: 350000, avgViews: 87500, engagement: 7.4, price: 1500, status: "Pending", city: "Cairo" },
];

export const rolloutPhases = [
  { name: "Teaser Drop", date: "Jan 14, 2026", status: "complete", progress: 100 },
  { name: "Lead Single", date: "Feb 28, 2026", status: "active", progress: 68 },
  { name: "Music Video", date: "Mar 20, 2026", status: "upcoming", progress: 32 },
  { name: "Pre-Save Push", date: "Apr 10, 2026", status: "upcoming", progress: 15 },
  { name: "Album Release", date: "May 8, 2026", status: "upcoming", progress: 5 },
  { name: "Tour Announce", date: "Jun 1, 2026", status: "upcoming", progress: 0 },
];

export const conversionTrend = [
  { day: "Mon", TikTok: 4200, Instagram: 2400, Facebook: 1800, YouTube: 3100 },
  { day: "Tue", TikTok: 5100, Instagram: 2800, Facebook: 1600, YouTube: 3400 },
  { day: "Wed", TikTok: 6800, Instagram: 3200, Facebook: 2100, YouTube: 3800 },
  { day: "Thu", TikTok: 8200, Instagram: 3600, Facebook: 1900, YouTube: 4200 },
  { day: "Fri", TikTok: 11400, Instagram: 4400, Facebook: 2400, YouTube: 5100 },
  { day: "Sat", TikTok: 14200, Instagram: 5200, Facebook: 2800, YouTube: 6300 },
  { day: "Sun", TikTok: 16800, Instagram: 6100, Facebook: 3200, YouTube: 7400 },
];

export const influencerPipeline = [
  { stage: "Sourced", count: 142 },
  { stage: "Contacted", count: 97 },
  { stage: "Priced", count: 64 },
  { stage: "Confirmed", count: 36 },
  { stage: "Delivered", count: 12 },
];

export interface Asset {
  id: string;
  name: string;
  type: "Brief" | "Audio" | "Art" | "Video";
  version: string;
  updated: string;
  owner: string;
  comments: Comment[];
}
export interface Comment {
  id: string;
  author: string;
  role: string;
  text: string;
  time: string;
}

export const assets: Asset[] = [
  { id: "a1", name: "Lead Single — Master v1.2", type: "Audio", version: "v1.2", updated: "2h ago", owner: "The Artist", comments: [
    { id: "c1", author: "Marwan", role: "Producer", text: "Bumped low-end 2dB, check the drop at 1:24.", time: "2h ago" },
    { id: "c2", author: "Artist", role: "Artist", text: "Love it. Ship for mastering.", time: "1h ago" },
  ]},
  { id: "a2", name: "Album Cover — Concept A", type: "Art", version: "v2.0", updated: "6h ago", owner: "Studio Noir", comments: [
    { id: "c3", author: "Client", role: "Client", text: "Warmer on the gradient?", time: "5h ago" },
  ]},
  { id: "a3", name: "TikTok Creator Brief", type: "Brief", version: "v1.4", updated: "1d ago", owner: "Sara", comments: [] },
  { id: "a4", name: "Teaser 15s Cut", type: "Video", version: "v3.1", updated: "1d ago", owner: "Edit Team", comments: [
    { id: "c4", author: "Zyad", role: "Creator", text: "Can I get vertical crop?", time: "12h ago" },
  ]},
  { id: "a5", name: "Press Kit EPK", type: "Brief", version: "v2.3", updated: "3d ago", owner: "PR", comments: [] },
  { id: "a6", name: "Music Video Storyboard", type: "Art", version: "v0.8", updated: "4d ago", owner: "Director", comments: [] },
];

export const viralTriggers = [
  "@zyad_elshazly reached 1M views on Teaser",
  "@pasmala trending #3 in Egypt",
  "Lead Single pre-saves crossed 210K",
  "@habiba.t duet chain hit 4.2M plays",
  "TikTok sound library — artist hook adopted by 8.4K creators",
  "Instagram Reels engagement +38% WoW",
  "@shehab.official story swipe-ups peaked at 12%",
];

/* ═══════════════════════════════════════════════════════════
   360° MARKETING CAMPAIGN DATA
   Full-funnel, all-platform, paid + organic, attribution,
   budget and channel-mix data powering the command center.
═══════════════════════════════════════════════════════════ */

/* Brand color per platform (used across tiles, charts, legends) */
export const platformColors: Record<Platform, string> = {
  TikTok: "oklch(0.72 0.16 200)",
  Instagram: "oklch(0.62 0.26 350)",
  Facebook: "oklch(0.6 0.22 264)",
  YouTube: "oklch(0.63 0.25 25)",
  X: "oklch(0.85 0.02 260)",
  LinkedIn: "oklch(0.58 0.16 245)",
  Snapchat: "oklch(0.88 0.18 100)",
  Threads: "oklch(0.75 0.02 260)",
  Pinterest: "oklch(0.58 0.24 20)",
};

/* ── Top-line campaign KPIs (the 360 header row) ────────────── */
export interface Kpi {
  key: string;
  label: string;
  value: string;
  raw: number;
  delta: number; // % vs previous period
  hint: string;
  format?: "money" | "number" | "ratio" | "percent";
}

export const campaignKpis: Kpi[] = [
  { key: "reach", label: "Total Reach", value: "128.6M", raw: 128_600_000, delta: 21.4, hint: "Unique across 9 platforms" },
  { key: "impressions", label: "Impressions", value: "412.9M", raw: 412_900_000, delta: 17.8, hint: "Paid + organic served" },
  { key: "engagements", label: "Engagements", value: "38.4M", raw: 38_400_000, delta: 24.9, hint: "Likes, comments, shares, saves" },
  { key: "conversions", label: "Conversions", value: "486.2K", raw: 486_200, delta: 12.6, hint: "Pre-saves, sign-ups, sales" },
  { key: "spend", label: "Total Spend", value: "$742.5K", raw: 742_500, delta: 8.9, hint: "Media + creator + production", format: "money", },
  { key: "revenue", label: "Attributed Revenue", value: "$3.11M", raw: 3_110_000, delta: 19.2, hint: "Last-touch + assisted", format: "money" },
  { key: "roas", label: "Blended ROAS", value: "4.19x", raw: 4.19, delta: 9.4, hint: "Revenue ÷ total spend", format: "ratio" },
  { key: "cpa", label: "Blended CPA", value: "$1.53", raw: 1.53, delta: -6.1, hint: "Spend ÷ conversions", format: "money" },
];

/* ── Per-platform reach split into paid + organic ───────────── */
export interface PlatformMetric {
  name: Platform;
  followers: string;
  reach: number; // total reach
  organicReach: number;
  paidReach: number;
  impressions: number;
  engagementRate: number; // %
  spend: number;
  revenue: number;
  roas: number;
  growth: number; // follower growth %
}

export const platformMetrics: PlatformMetric[] = [
  { name: "TikTok",    followers: "8.4M", reach: 42_100_000, organicReach: 31_600_000, paidReach: 10_500_000, impressions: 138_000_000, engagementRate: 11.8, spend: 214_000, revenue: 1_040_000, roas: 4.86, growth: 24.6 },
  { name: "Instagram", followers: "5.2M", reach: 28_700_000, organicReach: 18_900_000, paidReach: 9_800_000,  impressions: 96_400_000,  engagementRate: 8.4,  spend: 168_000, revenue: 726_000,   roas: 4.32, growth: 12.3 },
  { name: "YouTube",   followers: "2.8M", reach: 22_600_000, organicReach: 16_100_000, paidReach: 6_500_000,  impressions: 61_800_000,  engagementRate: 6.1,  spend: 132_000, revenue: 512_000,   roas: 3.88, growth: 18.1 },
  { name: "Facebook",  followers: "3.1M", reach: 12_400_000, organicReach: 4_600_000,  paidReach: 7_800_000,  impressions: 54_200_000,  engagementRate: 3.2,  spend: 96_000,  revenue: 318_000,   roas: 3.31, growth: 4.8 },
  { name: "X",         followers: "1.9M", reach: 9_800_000,  organicReach: 7_200_000,  paidReach: 2_600_000,  impressions: 31_400_000,  engagementRate: 2.4,  spend: 42_000,  revenue: 128_000,   roas: 3.05, growth: 6.2 },
  { name: "Snapchat",  followers: "2.2M", reach: 7_100_000,  organicReach: 3_900_000,  paidReach: 3_200_000,  impressions: 18_900_000,  engagementRate: 5.6,  spend: 38_000,  revenue: 121_000,   roas: 3.18, growth: 9.7 },
  { name: "LinkedIn",  followers: "480K", reach: 3_600_000,  organicReach: 2_500_000,  paidReach: 1_100_000,  impressions: 8_400_000,   engagementRate: 4.1,  spend: 24_000,  revenue: 96_000,    roas: 4.0,  growth: 14.5 },
  { name: "Threads",   followers: "910K", reach: 1_500_000,  organicReach: 1_500_000,  paidReach: 0,          impressions: 3_100_000,   engagementRate: 7.2,  spend: 0,       revenue: 41_000,    roas: 0,    growth: 31.4 },
  { name: "Pinterest", followers: "640K", reach: 800_000,    organicReach: 620_000,    paidReach: 180_000,    impressions: 2_700_000,   engagementRate: 3.9,  spend: 12_000,  revenue: 38_000,    roas: 3.17, growth: 5.1 },
];

/* Kept for backward-compat with the existing dashboard tiles */
export const platformStats = platformMetrics.slice(0, 4).map((p) => ({
  name: p.name,
  followers: p.followers,
  reach: `${(p.reach / 1_000_000).toFixed(1)}M`,
  growth: p.growth,
  color: platformColors[p.name],
}));

/* ── Paid vs Organic weekly trend (last 8 weeks) ────────────── */
export const paidVsOrganic = [
  { week: "W1", organic: 6_200_000, paid: 2_100_000, spend: 62_000 },
  { week: "W2", organic: 7_800_000, paid: 2_600_000, spend: 71_000 },
  { week: "W3", organic: 9_400_000, paid: 3_400_000, spend: 84_000 },
  { week: "W4", organic: 11_900_000, paid: 4_100_000, spend: 96_000 },
  { week: "W5", organic: 13_600_000, paid: 5_200_000, spend: 108_000 },
  { week: "W6", organic: 15_100_000, paid: 6_000_000, spend: 116_000 },
  { week: "W7", organic: 17_800_000, paid: 7_100_000, spend: 124_000 },
  { week: "W8", organic: 20_400_000, paid: 8_300_000, spend: 132_000 },
];

/* ── Marketing funnel (awareness → conversion) ──────────────── */
export interface FunnelStage {
  stage: string;
  value: number;
  rate: number; // % of previous stage
  color: string;
}
export const funnel: FunnelStage[] = [
  { stage: "Impressions", value: 412_900_000, rate: 100, color: "oklch(0.72 0.16 200)" },
  { stage: "Reach", value: 128_600_000, rate: 31.1, color: "oklch(0.66 0.2 250)" },
  { stage: "Engagements", value: 38_400_000, rate: 29.9, color: "oklch(0.6 0.26 300)" },
  { stage: "Link Clicks", value: 6_240_000, rate: 16.3, color: "oklch(0.62 0.26 340)" },
  { stage: "Landing Views", value: 2_180_000, rate: 34.9, color: "oklch(0.7 0.24 20)" },
  { stage: "Conversions", value: 486_200, rate: 22.3, color: "oklch(0.82 0.2 90)" },
];

/* ── Multi-touch attribution by channel ─────────────────────── */
export interface AttributionRow {
  channel: string;
  firstTouch: number;
  lastTouch: number;
  linear: number; // multi-touch %
  assisted: number; // assisted conversions
  roas: number;
}
export const attribution: AttributionRow[] = [
  { channel: "TikTok Organic", firstTouch: 34, lastTouch: 21, linear: 27, assisted: 148_200, roas: 6.2 },
  { channel: "Paid Social", firstTouch: 18, lastTouch: 29, linear: 24, assisted: 96_400, roas: 4.1 },
  { channel: "Influencer / Creator", firstTouch: 22, lastTouch: 14, linear: 19, assisted: 118_600, roas: 5.4 },
  { channel: "YouTube", firstTouch: 9, lastTouch: 12, linear: 11, assisted: 42_100, roas: 3.9 },
  { channel: "Email / CRM", firstTouch: 6, lastTouch: 15, linear: 10, assisted: 28_900, roas: 8.7 },
  { channel: "Search / SEO", firstTouch: 11, lastTouch: 9, linear: 9, assisted: 21_400, roas: 5.1 },
];

/* ── Channel mix (spend / revenue / efficiency) ─────────────── */
export interface ChannelMixRow {
  channel: string;
  spend: number;
  revenue: number;
  roas: number;
  cpa: number;
  share: number; // % of spend
}
export const channelMix: ChannelMixRow[] = [
  { channel: "Paid Social", spend: 286_000, revenue: 1_184_000, roas: 4.14, cpa: 1.42, share: 38.5 },
  { channel: "Creator / Influencer", spend: 214_000, revenue: 1_064_000, roas: 4.97, cpa: 1.18, share: 28.8 },
  { channel: "Video / YouTube", spend: 132_000, revenue: 512_000, roas: 3.88, cpa: 1.86, share: 17.8 },
  { channel: "Search / SEM", spend: 62_000, revenue: 246_000, roas: 3.97, cpa: 1.64, share: 8.3 },
  { channel: "Email / CRM", spend: 18_500, revenue: 161_000, roas: 8.70, cpa: 0.54, share: 2.5 },
  { channel: "Production / Creative", spend: 30_000, revenue: 0, roas: 0, cpa: 0, share: 4.0 },
];

/* ── Active paid campaigns across platforms ─────────────────── */
export interface PaidCampaign {
  id: string;
  name: string;
  platform: Platform;
  objective: "Awareness" | "Traffic" | "Engagement" | "Conversions" | "Video Views";
  status: "Active" | "Paused" | "Scheduled" | "Ended";
  spend: number;
  budget: number;
  impressions: number;
  ctr: number;
  cpc: number;
  roas: number;
}
export const paidCampaigns: PaidCampaign[] = [
  { id: "p1", name: "Lead Single — Spark Ads", platform: "TikTok", objective: "Video Views", status: "Active", spend: 84_200, budget: 120_000, impressions: 62_400_000, ctr: 2.4, cpc: 0.06, roas: 5.1 },
  { id: "p2", name: "Reels Boost — Teaser", platform: "Instagram", objective: "Engagement", status: "Active", spend: 61_800, budget: 90_000, impressions: 41_200_000, ctr: 1.9, cpc: 0.08, roas: 4.3 },
  { id: "p3", name: "Pre-Save Conversion", platform: "Facebook", objective: "Conversions", status: "Active", spend: 48_600, budget: 70_000, impressions: 28_900_000, ctr: 1.1, cpc: 0.11, roas: 3.3 },
  { id: "p4", name: "MV Trailer — TrueView", platform: "YouTube", objective: "Video Views", status: "Active", spend: 52_400, budget: 80_000, impressions: 34_100_000, ctr: 0.9, cpc: 0.09, roas: 3.9 },
  { id: "p5", name: "Story Ads — Countdown", platform: "Snapchat", objective: "Awareness", status: "Active", spend: 24_100, budget: 40_000, impressions: 18_600_000, ctr: 1.6, cpc: 0.07, roas: 3.2 },
  { id: "p6", name: "Promoted Trend", platform: "X", objective: "Awareness", status: "Paused", spend: 18_900, budget: 30_000, impressions: 12_400_000, ctr: 1.2, cpc: 0.10, roas: 3.0 },
  { id: "p7", name: "Tour Announce — B2B", platform: "LinkedIn", objective: "Traffic", status: "Scheduled", spend: 0, budget: 24_000, impressions: 0, ctr: 0, cpc: 0, roas: 0 },
  { id: "p8", name: "Idea Pins — Aesthetic", platform: "Pinterest", objective: "Traffic", status: "Active", spend: 9_800, budget: 15_000, impressions: 2_600_000, ctr: 1.4, cpc: 0.12, roas: 3.2 },
];

/* ── Budget burndown ────────────────────────────────────────── */
export const budget = {
  total: 950_000,
  spent: 742_500,
  committed: 128_000, // contracted but not yet billed
  get remaining() {
    return this.total - this.spent - this.committed;
  },
  byChannel: channelMix.map((c) => ({ channel: c.channel, spend: c.spend })),
  burndown: [
    { week: "W1", planned: 60_000, actual: 62_000 },
    { week: "W2", planned: 130_000, actual: 133_000 },
    { week: "W3", planned: 215_000, actual: 217_000 },
    { week: "W4", planned: 310_000, actual: 313_000 },
    { week: "W5", planned: 420_000, actual: 421_000 },
    { week: "W6", planned: 540_000, actual: 537_000 },
    { week: "W7", planned: 660_000, actual: 661_000 },
    { week: "W8", planned: 790_000, actual: 742_500 },
  ],
};

/* ── Live activity feed (360 across all channels) ───────────── */
export const activityFeed: string[] = [
  "[2m ago] TikTok Spark Ads ROAS hit 5.1x on Lead Single",
  "[8m ago] @pasmala trending #3 in Egypt",
  "[14m ago] Pre-save conversions crossed 210K",
  "[22m ago] Instagram Reels engagement +38% WoW",
  "[31m ago] YouTube MV trailer passed 4.2M views",
  "[44m ago] Email flow drove 8.7x ROAS on presale",
  "[1h ago] Snapchat Story Ads CPM down 12%",
  "[1h ago] LinkedIn tour-announce campaign scheduled",
  "[2h ago] Threads organic reach up 31% WoW",
];
