/* ═══════════════════════════════════════════════════════════
   PLANS, CREDITS & USAGE LIMITING

   Adapted from ha346/AI-Saas-Platform (Next.js + Clerk + Prisma + Stripe),
   whose useful idea for RIPPL is not the stack but the shape: tiered
   subscriptions with a free tier that is hard-limited by API usage, metered
   per feature. RIPPL was single-tenant with no billing concept at all.

   The catalogue below mirrors public.plans in
   supabase/migrations/0006_growth_modules.sql — keep them in sync.
   Commercial reasoning: knowledge/finance/REVENUE_MODELS.md
═══════════════════════════════════════════════════════════ */

import type { PlanId, UsageEvent } from "./os-store";

export interface Plan {
  id: PlanId;
  name: string;
  priceMonth: number;
  currency: string;
  /** 0 = unlimited */
  monthlyCredits: number;
  seats: number;
  features: string[];
  /** set once you create the price in Stripe */
  stripePriceId?: string;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    priceMonth: 0,
    currency: "USD",
    monthlyCredits: 25,
    seats: 1,
    features: [
      "Personal OS",
      "1 campaign",
      "Vault & Audio",
      "25 AI credits / month",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    priceMonth: 29,
    currency: "USD",
    monthlyCredits: 500,
    seats: 3,
    features: [
      "Everything in Free",
      "Unlimited campaigns",
      "Hit Lab scoring",
      "Commissions & invoicing",
      "500 AI credits / month",
    ],
  },
  {
    id: "label",
    name: "Label",
    priceMonth: 99,
    currency: "USD",
    monthlyCredits: 0,
    seats: 10,
    features: [
      "Everything in Studio",
      "Live & ticketing",
      "Affiliate programme",
      "Team roles & per-asset assignment",
      "Unlimited AI credits",
    ],
  },
];

export const planById = (id: PlanId): Plan =>
  PLANS.find((p) => p.id === id) ?? PLANS[0];

/** Credit cost per metered action. Keep in step with usage_events.feature. */
export const CREDIT_COST: Record<string, number> = {
  hit_score: 1,
  prompt_enhance: 1,
  press_kit_pdf: 1,
  one_pager_pdf: 1,
  invoice_pdf: 1,
  quote_pdf: 1,
  ugc_batch: 5,
  weekly_digest: 2,
};

export function creditsUsedThisMonth(usage: UsageEvent[]): number {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return usage
    .filter((u) => new Date(u.at).getTime() >= start.getTime())
    .reduce((s, u) => s + (u.credits || 0), 0);
}

export interface Quota {
  plan: Plan;
  used: number;
  limit: number; // 0 = unlimited
  left: number | null; // null = unlimited
  pct: number; // 0–1, 0 when unlimited
  exhausted: boolean;
}

export function quota(planId: PlanId, usage: UsageEvent[]): Quota {
  const plan = planById(planId);
  const used = creditsUsedThisMonth(usage);
  const limit = plan.monthlyCredits;
  const unlimited = limit === 0;
  return {
    plan,
    used,
    limit,
    left: unlimited ? null : Math.max(limit - used, 0),
    pct: unlimited ? 0 : Math.min(used / limit, 1),
    exhausted: !unlimited && used >= limit,
  };
}

/** Gate a metered action. Returns why it was blocked, when it is. */
export function canRun(
  feature: string,
  planId: PlanId,
  usage: UsageEvent[],
): { ok: true } | { ok: false; reason: string } {
  const q = quota(planId, usage);
  if (q.limit === 0) return { ok: true };
  const cost = CREDIT_COST[feature] ?? 1;
  if (q.used + cost > q.limit) {
    return {
      ok: false,
      reason: `${q.plan.name} includes ${q.limit} credits/month and ${q.used} are used. This action costs ${cost}.`,
    };
  }
  return { ok: true };
}

/** Features gated by tier, independent of credits. */
export const TIER_FEATURES: Record<string, PlanId[]> = {
  hitlab: ["studio", "label"],
  invoices: ["studio", "label"],
  live: ["label"],
  affiliates: ["label"],
};

export function hasFeature(feature: string, planId: PlanId): boolean {
  const allowed = TIER_FEATURES[feature];
  return !allowed || allowed.includes(planId);
}
