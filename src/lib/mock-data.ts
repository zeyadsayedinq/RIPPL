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

/* Influencer roster — kept intact. All statuses set to Confirmed. */
export const creators: Creator[] = [
  { id: "1", name: "Pasmala", handle: "@pasmala24", platform: "TikTok", tier: "Featured", followers: 5100000, avgViews: 1020000, engagement: 12.1, price: 15000, status: "Confirmed", city: "Cairo" },
  { id: "2", name: "Zyad Elshazly", handle: "@zyad_elshazly", platform: "TikTok", tier: "Featured", followers: 2600000, avgViews: 780000, engagement: 11.8, price: 80000, status: "Confirmed", city: "Cairo" },
  { id: "3", name: "Bassant", handle: "@bassant33", platform: "Instagram", tier: "Featured", followers: 7100000, avgViews: 710000, engagement: 9.2, price: 15000, status: "Confirmed", city: "Cairo" },
  { id: "4", name: "Haneen Hena", handle: "@haneenhena", platform: "TikTok", tier: "Featured", followers: 3900000, avgViews: 585000, engagement: 10.5, price: 20000, status: "Confirmed", city: "Cairo" },
  { id: "5", name: "Renad Mohammed", handle: "@renaddmuhammed", platform: "Instagram", tier: "Featured", followers: 3500000, avgViews: 350000, engagement: 8.9, price: 8000, status: "Confirmed", city: "Cairo" },
  { id: "6", name: "Sandiiyy", handle: "@sandiiyy_", platform: "TikTok", tier: "Featured", followers: 1300000, avgViews: 325000, engagement: 11.2, price: 5000, status: "Confirmed", city: "Cairo" },
  { id: "7", name: "Sherif Khalid", handle: "@sherifkhalidd", platform: "TikTok", tier: "Mega", followers: 11200000, avgViews: 3360000, engagement: 13.4, price: 15000, status: "Confirmed", city: "Cairo" },
  { id: "8", name: "Ozooo19", handle: "@ozooo19", platform: "TikTok", tier: "Mega", followers: 10600000, avgViews: 3180000, engagement: 12.8, price: 8000, status: "Confirmed", city: "Cairo" },
  { id: "9", name: "Abdullah El Tourky", handle: "@abdullah_eltourky", platform: "Instagram", tier: "Macro", followers: 9700000, avgViews: 873000, engagement: 8.5, price: 80000, status: "Confirmed", city: "Cairo" },
  { id: "10", name: "Shehab Eldin", handle: "@shehab.eldin", platform: "Instagram", tier: "Macro", followers: 8900000, avgViews: 801000, engagement: 8.2, price: 20000, status: "Confirmed", city: "Cairo" },
  { id: "11", name: "Gehad Hassan", handle: "@gehadhassann", platform: "Instagram", tier: "Macro", followers: 8700000, avgViews: 783000, engagement: 8.4, price: 15000, status: "Confirmed", city: "Cairo" },
  { id: "12", name: "Haidy Kamel", handle: "@haidyykamel", platform: "Instagram", tier: "Macro", followers: 6400000, avgViews: 576000, engagement: 7.8, price: 70000, status: "Confirmed", city: "Cairo" },
  { id: "13", name: "Malak Abdelnaby", handle: "@malakabdelnaby3", platform: "Instagram", tier: "Macro", followers: 6900000, avgViews: 621000, engagement: 8.1, price: 25000, status: "Confirmed", city: "Cairo" },
  { id: "14", name: "Mayar Nagiib", handle: "@mayare.nagiib", platform: "TikTok", tier: "Macro", followers: 2800000, avgViews: 560000, engagement: 9.8, price: 7000, status: "Confirmed", city: "Cairo" },
  { id: "15", name: "Shahd Mohamed", handle: "@shahd_m7amed1", platform: "Instagram", tier: "Macro", followers: 1900000, avgViews: 285000, engagement: 7.2, price: 5000, status: "Confirmed", city: "Cairo" },
  { id: "16", name: "Heba Khalid", handle: "@wwwhabo.comm", platform: "TikTok", tier: "Macro", followers: 2400000, avgViews: 432000, engagement: 9.5, price: 10000, status: "Confirmed", city: "Cairo" },
  { id: "17", name: "Haneen (xx_haneen)", handle: "@xx_haneen0_1xx", platform: "TikTok", tier: "Mid", followers: 5800000, avgViews: 1160000, engagement: 10.3, price: 20000, status: "Confirmed", city: "Cairo" },
  { id: "18", name: "Moonly", handle: "@momeenalaa", platform: "TikTok", tier: "Mid", followers: 4100000, avgViews: 656000, engagement: 10.1, price: 12000, status: "Confirmed", city: "Cairo" },
  { id: "19", name: "Bombenoz", handle: "@Bombenoz", platform: "TikTok", tier: "Mid", followers: 4400000, avgViews: 880000, engagement: 11.2, price: 8000, status: "Confirmed", city: "Cairo" },
  { id: "20", name: "Nancy Yasser", handle: "@nancyy.yasserr", platform: "TikTok", tier: "Mid", followers: 3100000, avgViews: 465000, engagement: 9.8, price: 8000, status: "Confirmed", city: "Cairo" },
  { id: "21", name: "Rahma Ayman", handle: "@rahmaaayman_", platform: "Instagram", tier: "Mid", followers: 593900, avgViews: 89085, engagement: 7.1, price: 5000, status: "Confirmed", city: "Cairo" },
  { id: "22", name: "Salwa Hijazi", handle: "@salwahijazi_", platform: "Instagram", tier: "Mid", followers: 1400000, avgViews: 280000, engagement: 8.2, price: 5000, status: "Confirmed", city: "Cairo" },
  { id: "23", name: "Rahma Waled", handle: "@rahmawaled230", platform: "TikTok", tier: "Mid", followers: 2000000, avgViews: 400000, engagement: 9.4, price: 5000, status: "Confirmed", city: "Cairo" },
  { id: "24", name: "Romisaa Faried", handle: "@romisaafaried.official", platform: "Instagram", tier: "Mid", followers: 1600000, avgViews: 320000, engagement: 8.3, price: 5000, status: "Confirmed", city: "Cairo" },
  { id: "25", name: "Dahab Elmessiri", handle: "@dahabelmessiri", platform: "TikTok", tier: "Mid", followers: 1700000, avgViews: 340000, engagement: 9.1, price: 6000, status: "Confirmed", city: "Cairo" },
  { id: "26", name: "Hamo Elkot", handle: "@hamoelkot74", platform: "TikTok", tier: "Mid", followers: 1300000, avgViews: 260000, engagement: 8.9, price: 6000, status: "Confirmed", city: "Cairo" },
  { id: "27", name: "Sohila Alia", handle: "@sohilaqotb1", platform: "Instagram", tier: "Mid", followers: 1100000, avgViews: 220000, engagement: 7.8, price: 4000, status: "Confirmed", city: "Cairo" },
  { id: "28", name: "Donia Doka", handle: "@doniadoka_official", platform: "TikTok", tier: "Mid", followers: 1400000, avgViews: 280000, engagement: 8.6, price: 7000, status: "Confirmed", city: "Cairo" },
  { id: "29", name: "Eslam Atef Saed", handle: "@eslamatefsaed_", platform: "TikTok", tier: "Mid", followers: 1800000, avgViews: 360000, engagement: 9.2, price: 8000, status: "Confirmed", city: "Cairo" },
  { id: "30", name: "Mayaa Felfel", handle: "@mayaafelfel", platform: "TikTok", tier: "Micro", followers: 163400, avgViews: 49020, engagement: 11.8, price: 7000, status: "Confirmed", city: "Cairo" },
  { id: "31", name: "Lujain Kamell", handle: "@lujainkamell", platform: "Instagram", tier: "Micro", followers: 650700, avgViews: 130140, engagement: 8.5, price: 5000, status: "Confirmed", city: "Cairo" },
  { id: "32", name: "Youssef Khaled", handle: "@yousseff.khaled", platform: "TikTok", tier: "Micro", followers: 10700, avgViews: 3210, engagement: 9.8, price: 3000, status: "Confirmed", city: "Cairo" },
  { id: "33", name: "Ahmed Nagy", handle: "@ahmednagy1010", platform: "TikTok", tier: "Mid", followers: 1500000, avgViews: 450000, engagement: 10.2, price: 15000, status: "Confirmed", city: "Cairo" },
  { id: "34", name: "Ebram Saeed", handle: "@ebramsaed1", platform: "TikTok", tier: "Mid", followers: 1200000, avgViews: 360000, engagement: 9.5, price: 20000, status: "Confirmed", city: "Cairo" },
  { id: "35", name: "Rehab Ali", handle: "@_rehab_alii0", platform: "TikTok", tier: "Micro", followers: 500000, avgViews: 125000, engagement: 8.1, price: 3000, status: "Confirmed", city: "Cairo" },
  { id: "36", name: "Nada Mahmoud", handle: "@nada_mahmooud1", platform: "TikTok", tier: "Micro", followers: 350000, avgViews: 87500, engagement: 7.4, price: 1500, status: "Confirmed", city: "Cairo" },
];

/* ═══════════════════════════════════════════════════════════
   DATA RESET — all sample marketing content cleared.
   Only the influencer roster above is retained. Every metric,
   campaign, chart and list below is empty until real data is
   entered. Currency across the app is EGP.
═══════════════════════════════════════════════════════════ */

export const rolloutPhases: { name: string; date: string; status: string; progress: number }[] = [];

export const conversionTrend: { day: string; TikTok: number; Instagram: number; Facebook: number; YouTube: number }[] = [];

export const influencerPipeline: { stage: string; count: number }[] = [];

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

export const assets: Asset[] = [];

export const viralTriggers: string[] = [];

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
  delta: number;
  hint: string;
  format?: "money" | "number" | "ratio" | "percent";
}
export const campaignKpis: Kpi[] = [];

/* ── Per-platform reach split into paid + organic ───────────── */
export interface PlatformMetric {
  name: Platform;
  followers: string;
  reach: number;
  organicReach: number;
  paidReach: number;
  impressions: number;
  engagementRate: number;
  spend: number;
  revenue: number;
  roas: number;
  growth: number;
}
export const platformMetrics: PlatformMetric[] = [];

export const platformStats = platformMetrics.slice(0, 4).map((p) => ({
  name: p.name,
  followers: p.followers,
  reach: `${(p.reach / 1_000_000).toFixed(1)}M`,
  growth: p.growth,
  color: platformColors[p.name],
}));

/* ── Paid vs Organic weekly trend ───────────────────────────── */
export const paidVsOrganic: { week: string; organic: number; paid: number; spend: number }[] = [];

/* ── Marketing funnel (awareness → conversion) ──────────────── */
export interface FunnelStage {
  stage: string;
  value: number;
  rate: number;
  color: string;
}
export const funnel: FunnelStage[] = [];

/* ── Multi-touch attribution by channel ─────────────────────── */
export interface AttributionRow {
  channel: string;
  firstTouch: number;
  lastTouch: number;
  linear: number;
  assisted: number;
  roas: number;
}
export const attribution: AttributionRow[] = [];

/* ── Channel mix (spend / revenue / efficiency) ─────────────── */
export interface ChannelMixRow {
  channel: string;
  spend: number;
  revenue: number;
  roas: number;
  cpa: number;
  share: number;
}
export const channelMix: ChannelMixRow[] = [];

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
export const paidCampaigns: PaidCampaign[] = [];

/* ── Budget burndown ────────────────────────────────────────── */
export const budget = {
  total: 0,
  spent: 0,
  committed: 0,
  get remaining() {
    return this.total - this.spent - this.committed;
  },
  byChannel: [] as { channel: string; spend: number }[],
  burndown: [] as { week: string; planned: number; actual: number }[],
};

/* ── Live activity feed ─────────────────────────────────────── */
export const activityFeed: string[] = [];
