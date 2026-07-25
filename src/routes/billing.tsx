import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useOS, type PlanId } from "@/lib/os-store";
import { PLANS, quota, CREDIT_COST, TIER_FEATURES } from "@/lib/plans";
import { Check, Zap, CreditCard, Gauge, Lock } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   PLANS, CREDITS & USAGE
   Derived from ha346/AI-Saas-Platform — a Next.js/Clerk/Prisma/Stripe SaaS
   whose transferable idea is the commercial shape, not the stack: tiered
   subscriptions, a free tier hard-limited by API usage, and per-feature
   metering. RIPPL had no billing or quota concept at all.

   Stripe is deliberately NOT wired up here — plan switching is local until you
   add price IDs and a server-side checkout/webhook. Everything else (metering,
   quota enforcement, tier gating) already works.

   Commercial context: knowledge/finance/REVENUE_MODELS.md
═══════════════════════════════════════════════════════════ */

export const Route = createFileRoute("/billing")({
  head: () => ({
    meta: [
      { title: "Billing · RIPPL OS" },
      { name: "description", content: "Plans, AI credits and usage." },
    ],
  }),
  component: BillingPage,
});

function BillingPage() {
  const { plan, usage, set } = useOS();
  const q = useMemo(() => quota(plan, usage), [plan, usage]);

  const byFeature = useMemo(() => {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    const m = new Map<string, number>();
    for (const u of usage) {
      if (new Date(u.at).getTime() < start.getTime()) continue;
      m.set(u.feature, (m.get(u.feature) ?? 0) + u.credits);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [usage]);

  const barColor = q.exhausted
    ? "oklch(0.7 0.2 20)"
    : q.pct > 0.8
      ? "oklch(0.85 0.15 85)"
      : "oklch(0.82 0.18 150)";

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
          System · Billing
        </div>
        <h1 className="mt-1 font-display text-3xl font-bold">
          Plans &amp; <span className="text-gradient-neon">Credits</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Metered AI actions with a hard-limited free tier. Stripe checkout
          plugs in on top.
        </p>
      </header>

      {/* ── Usage ── */}
      <SpotlightCard className="mt-6 p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <Gauge className="h-3.5 w-3.5" /> This month
            </div>
            <div className="mt-2 font-display text-4xl font-bold">
              {q.used}
              <span className="text-lg text-muted-foreground">
                {q.limit === 0
                  ? " credits · unlimited"
                  : ` / ${q.limit} credits`}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Current plan
            </div>
            <div className="font-display text-xl font-bold">{q.plan.name}</div>
            <div className="text-[11px] text-muted-foreground">
              {q.plan.priceMonth === 0 ? "Free" : `$${q.plan.priceMonth}/mo`} ·{" "}
              {q.plan.seats} seat{q.plan.seats > 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {q.limit > 0 && (
          <>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${q.pct * 100}%`, background: barColor }}
              />
            </div>
            {q.exhausted && (
              <div className="mt-3 rounded-xl border border-[oklch(0.7_0.2_20/0.3)] bg-[oklch(0.7_0.2_20/0.06)] px-3 py-2 text-[11px] text-[oklch(0.8_0.15_20)]">
                Monthly credits exhausted. Metered actions are blocked until the
                reset or an upgrade.
              </div>
            )}
          </>
        )}

        {byFeature.length > 0 && (
          <div className="mt-5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Where they went
            </div>
            <div className="mt-2 space-y-1.5">
              {byFeature.map(([feature, credits]) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="w-36 shrink-0 truncate text-xs">
                    {feature.replace(/_/g, " ")}
                  </div>
                  <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-white/40"
                      style={{
                        width: `${Math.min((credits / Math.max(q.used, 1)) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <div className="w-10 shrink-0 text-right font-mono text-[11px] text-muted-foreground">
                    {credits}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SpotlightCard>

      {/* ── Plans ── */}
      <section className="mt-4 grid grid-cols-12 gap-4">
        {PLANS.map((p) => {
          const current = p.id === plan;
          return (
            <SpotlightCard key={p.id} className="col-span-12 p-6 md:col-span-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {p.name}
                  </div>
                  <div className="mt-2 font-display text-3xl font-bold">
                    {p.priceMonth === 0 ? "Free" : `$${p.priceMonth}`}
                    {p.priceMonth > 0 && (
                      <span className="text-sm font-normal text-muted-foreground">
                        /mo
                      </span>
                    )}
                  </div>
                </div>
                {current && (
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider">
                    Current
                  </span>
                )}
              </div>

              <div className="mt-4 text-[11px] text-muted-foreground">
                {p.monthlyCredits === 0
                  ? "Unlimited AI credits"
                  : `${p.monthlyCredits} AI credits / month`}
                {" · "}
                {p.seats} seat{p.seats > 1 ? "s" : ""}
              </div>

              <ul className="mt-4 space-y-2">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[oklch(0.82_0.18_150)]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={current}
                onClick={() => set("plan", p.id as PlanId)}
                className={`mt-5 w-full rounded-full py-2.5 text-sm font-medium transition-colors ${
                  current
                    ? "cursor-default bg-white/[0.06] text-muted-foreground"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {current
                  ? "Active"
                  : p.priceMonth === 0
                    ? "Downgrade"
                    : "Choose plan"}
              </button>
              {!current && p.priceMonth > 0 && (
                <p className="mt-2 text-center text-[10px] text-muted-foreground/60">
                  Switches locally — add a Stripe price ID to charge for real.
                </p>
              )}
            </SpotlightCard>
          );
        })}
      </section>

      {/* ── Reference ── */}
      <div className="mt-4 grid grid-cols-12 gap-4">
        <SpotlightCard
          className="col-span-12 p-5 md:col-span-6"
          spotlight={false}
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <Zap className="h-3.5 w-3.5" /> Credit cost per action
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
            {Object.entries(CREDIT_COST).map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between text-sm"
              >
                <span className="truncate text-muted-foreground">
                  {k.replace(/_/g, " ")}
                </span>
                <span className="font-mono">{v}</span>
              </div>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="col-span-12 p-5 md:col-span-6"
          spotlight={false}
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Tier-gated modules
          </div>
          <div className="mt-3 space-y-1.5">
            {Object.entries(TIER_FEATURES).map(([feature, plans]) => (
              <div
                key={feature}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">/{feature}</span>
                <span
                  className={
                    plans.includes(plan)
                      ? "text-[oklch(0.82_0.18_150)]"
                      : "text-muted-foreground"
                  }
                >
                  {plans
                    .map((p) => PLANS.find((x) => x.id === p)?.name)
                    .join(" · ")}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground/70">
            Gating is advisory in the UI today — enforce it server-side before
            you charge anyone. See
            knowledge/checklists/SECURITY_AND_LAUNCH_CHECKLIST.md
          </p>
        </SpotlightCard>
      </div>

      <SpotlightCard className="mt-4 p-5" spotlight={false}>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <CreditCard className="h-3.5 w-3.5" /> Wiring up Stripe
        </div>
        <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          <li>
            1. Create three prices in Stripe; put the IDs in{" "}
            <span className="font-mono text-white/70">src/lib/plans.ts</span>{" "}
            and{" "}
            <span className="font-mono text-white/70">
              public.plans.stripe_price_id
            </span>
            .
          </li>
          <li>
            2. Add a server function that creates a Checkout session for the
            signed-in user.
          </li>
          <li>
            3. Add a webhook that writes{" "}
            <span className="font-mono text-white/70">
              public.subscriptions
            </span>{" "}
            on{" "}
            <span className="font-mono text-white/70">
              checkout.session.completed
            </span>{" "}
            and{" "}
            <span className="font-mono text-white/70">
              customer.subscription.updated
            </span>
            .
          </li>
          <li>
            4. Keep{" "}
            <span className="font-mono text-white/70">STRIPE_API_KEY</span> and{" "}
            <span className="font-mono text-white/70">
              STRIPE_WEBHOOK_SECRET
            </span>{" "}
            server-side only — never as{" "}
            <span className="font-mono text-white/70">VITE_</span> vars.
          </li>
        </ol>
      </SpotlightCard>
    </AppShell>
  );
}
