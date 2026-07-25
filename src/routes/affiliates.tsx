import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { EmptyState } from "@/components/EmptyState";
import { useOS, uid, type Affiliate } from "@/lib/os-store";
import { useRole } from "@/lib/role-context";
import { downloadCsv } from "@/lib/csv-export";
import { Share2, Plus, Trash2, Copy, Check, Users, DollarSign, MousePointerClick, Download } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   AFFILIATE / REFERRAL PROGRAMME
   Derived from precisep/Business ("Affiliate and Music Promotion") — a Django
   app pairing an affiliate system with music promotion. RIPPL had no concept
   of referral partners, tracked links, or commission payouts.

   Why it matters: the marginal cost of a referred sale is ~0, which is why
   this is the one line where a *higher* payout rate can be strictly correct.
   See knowledge/finance/UNIT_ECONOMICS.md and
   knowledge/systems/REPEAT_CLIENT_ENGINE.md (the referral ask).
═══════════════════════════════════════════════════════════ */

export const Route = createFileRoute("/affiliates")({
  head: () => ({
    meta: [
      { title: "Affiliates · RIPPL OS" },
      { name: "description", content: "Referral partners, tracked codes and commission payouts." },
    ],
  }),
  component: AffiliatesPage,
});

const CHANNELS = ["Newsletter", "Instagram", "TikTok", "YouTube", "Blog", "Discord", "Word of mouth"];
const BASE_URL = "https://rippl-mu.vercel.app";

function AffiliatesPage() {
  const { affiliates, update } = useOS();
  const { canSeePrice } = useRole();
  const mask = (v: string) => (canSeePrice ? v : "•••••");
  const [f, setF] = useState({ partnerName: "", partnerEmail: "", code: "", channel: CHANNELS[0], rate: "20" });
  const [copied, setCopied] = useState<string | null>(null);

  const totals = useMemo(() => {
    const revenue = affiliates.reduce((s, a) => s + a.revenue, 0);
    const owed = affiliates.reduce((s, a) => s + a.revenue * a.commissionRate, 0);
    const clicks = affiliates.reduce((s, a) => s + a.clicks, 0);
    const conversions = affiliates.reduce((s, a) => s + a.conversions, 0);
    return { revenue, owed, clicks, conversions, cvr: clicks ? conversions / clicks : 0 };
  }, [affiliates]);

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!f.partnerName.trim()) return;
    const code = (f.code.trim() || `RIPPL-${f.partnerName.trim().split(/\s+/)[0]}`).toUpperCase();
    if (affiliates.some((a) => a.code.toLowerCase() === code.toLowerCase())) return;
    const a: Affiliate = {
      id: uid("aff"),
      partnerName: f.partnerName.trim(),
      partnerEmail: f.partnerEmail.trim() || undefined,
      code,
      channel: f.channel,
      commissionRate: (Number(f.rate) || 0) / 100,
      currency: "USD",
      active: true,
      clicks: 0,
      signups: 0,
      conversions: 0,
      revenue: 0,
      payoutStatus: "pending",
    };
    update("affiliates", (all) => [a, ...all]);
    setF({ partnerName: "", partnerEmail: "", code: "", channel: CHANNELS[0], rate: "20" });
  }

  function patch(id: string, p: Partial<Affiliate>) {
    update("affiliates", (all) => all.map((a) => (a.id === id ? { ...a, ...p } : a)));
  }

  function copyLink(a: Affiliate) {
    const url = `${BASE_URL}/?ref=${encodeURIComponent(a.code)}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(a.id);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  function exportLedger() {
    downloadCsv(
      "affiliate_ledger.csv",
      affiliates.map((a) => ({
        partner: a.partnerName,
        email: a.partnerEmail ?? "",
        code: a.code,
        channel: a.channel,
        clicks: a.clicks,
        signups: a.signups,
        conversions: a.conversions,
        referred_revenue: a.revenue,
        currency: a.currency,
        commission_rate: a.commissionRate,
        commission_owed: Math.round(a.revenue * a.commissionRate * 100) / 100,
        payout_status: a.payoutStatus,
      })),
    );
  }

  return (
    <AppShell>
      <header className="glass flex flex-wrap items-start justify-between gap-3 rounded-2xl p-5">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Growth · Partners</div>
          <h1 className="mt-1 font-display text-3xl font-bold">
            Affiliate <span className="text-gradient-neon">Programme</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tracked codes, real payouts. An untracked referral is a favour — favours don&apos;t compound.
          </p>
        </div>
        {affiliates.length > 0 && (
          <button onClick={exportLedger}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/5">
            <Download className="h-4 w-4" /> Export ledger
          </button>
        )}
      </header>

      <section className="mt-6 grid grid-cols-12 gap-4">
        <Stat label="Partners" value={String(affiliates.filter((a) => a.active).length)} icon={Users} accent="oklch(0.7 0.02 260)" />
        <Stat label="Clicks" value={totals.clicks.toLocaleString()} icon={MousePointerClick} accent="oklch(0.85 0.02 260)" />
        <Stat label="Referred revenue" value={mask(`$${Math.round(totals.revenue).toLocaleString()}`)} icon={DollarSign} accent="oklch(0.82 0.18 150)" />
        <Stat label="Commission owed" value={mask(`$${Math.round(totals.owed).toLocaleString()}`)} icon={Share2} accent="oklch(0.85 0.15 85)" />
      </section>

      <SpotlightCard className="mt-6 p-5" spotlight={false}>
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Add a partner</div>
        <form onSubmit={add} className="mt-3 grid grid-cols-12 items-end gap-3">
          <Field className="col-span-12 sm:col-span-3" label="Partner name" value={f.partnerName} onChange={(v) => setF({ ...f, partnerName: v })} />
          <Field className="col-span-12 sm:col-span-3" label="Email" value={f.partnerEmail} onChange={(v) => setF({ ...f, partnerEmail: v })} />
          <Field className="col-span-6 sm:col-span-2" label="Code" value={f.code} onChange={(v) => setF({ ...f, code: v })} />
          <div className="col-span-6 sm:col-span-2">
            <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Channel</label>
            <select value={f.channel} onChange={(e) => setF({ ...f, channel: e.target.value })}
              className="glass w-full rounded-xl bg-transparent px-3 py-2 text-sm outline-none">
              {CHANNELS.map((c) => <option key={c} value={c} className="bg-black">{c}</option>)}
            </select>
          </div>
          <Field className="col-span-6 sm:col-span-1" label="Rate %" type="number" value={f.rate} onChange={(v) => setF({ ...f, rate: v })} />
          <div className="col-span-6 sm:col-span-1">
            <button className="w-full rounded-xl bg-white py-2 text-sm font-medium text-black"><Plus className="mx-auto h-4 w-4" /></button>
          </div>
        </form>
        <p className="mt-3 text-[11px] text-muted-foreground/70">
          Codes must be unique. Duplicate codes are silently rejected so attribution stays clean.
        </p>
      </SpotlightCard>

      {affiliates.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No partners yet" note="Add a partner, share their tracked link, and log conversions here." />
        </div>
      ) : (
        <SpotlightCard className="mt-4 p-5" spotlight={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="pb-3">Partner</th><th className="pb-3">Code</th><th className="pb-3">Channel</th>
                  <th className="pb-3 text-right">Clicks</th><th className="pb-3 text-right">Conv.</th>
                  <th className="pb-3 text-right">CVR</th><th className="pb-3 text-right">Revenue</th>
                  <th className="pb-3 text-right">Owed</th><th className="pb-3">Payout</th><th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {affiliates.map((a) => {
                  const cvr = a.clicks ? a.conversions / a.clicks : 0;
                  const owed = a.revenue * a.commissionRate;
                  return (
                    <tr key={a.id} className="border-t border-white/[0.06]">
                      <td className="py-3">
                        <div className="font-medium">{a.partnerName}</div>
                        <div className="text-[11px] text-muted-foreground">{a.partnerEmail || "—"}</div>
                      </td>
                      <td className="py-3">
                        <button onClick={() => copyLink(a)}
                          className="glass inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-mono text-[11px] hover:bg-white/5">
                          {copied === a.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />} {a.code}
                        </button>
                      </td>
                      <td className="py-3 text-muted-foreground">{a.channel}</td>
                      <NumCell value={a.clicks} onChange={(v) => patch(a.id, { clicks: v })} />
                      <NumCell value={a.conversions} onChange={(v) => patch(a.id, { conversions: v })} />
                      <td className="py-3 text-right font-mono text-muted-foreground">{(cvr * 100).toFixed(1)}%</td>
                      <NumCell value={a.revenue} onChange={(v) => patch(a.id, { revenue: v })} wide />
                      <td className="py-3 text-right font-mono text-[oklch(0.85_0.15_85)]">{mask(`$${owed.toFixed(2)}`)}</td>
                      <td className="py-3">
                        <select value={a.payoutStatus}
                          onChange={(e) => patch(a.id, { payoutStatus: e.target.value as Affiliate["payoutStatus"] })}
                          className="glass rounded-lg bg-transparent px-2 py-1 text-xs outline-none">
                          {(["pending", "approved", "paid"] as const).map((s) =>
                            <option key={s} value={s} className="bg-black">{s}</option>)}
                        </select>
                      </td>
                      <td className="py-3 text-right">
                        <button onClick={() => update("affiliates", (all) => all.filter((x) => x.id !== a.id))}
                          className="text-muted-foreground hover:text-white"><Trash2 className="h-4 w-4" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground/70">
            Programme-wide conversion rate: <span className="font-mono text-white/80">{(totals.cvr * 100).toFixed(1)}%</span>.
            Ask for the referral at delivery, never in the same message as an invoice.
          </p>
        </SpotlightCard>
      )}
    </AppShell>
  );
}

function NumCell({ value, onChange, wide }: { value: number; onChange: (v: number) => void; wide?: boolean }) {
  return (
    <td className="py-3 text-right">
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value) || 0)}
        className={`glass rounded-lg px-2 py-1 text-right font-mono text-xs outline-none ${wide ? "w-24" : "w-16"}`} />
    </td>
  );
}

function Stat({ label, value, icon: Icon, accent }: { label: string; value: string; icon: any; accent: string }) {
  return (
    <SpotlightCard className="col-span-6 p-4 lg:col-span-3">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <Icon className="h-4 w-4" style={{ color: accent }} />
      </div>
      <div className="mt-2 font-display text-2xl font-bold" style={{ color: accent }}>{value}</div>
    </SpotlightCard>
  );
}

function Field({
  label, value, onChange, type = "text", className = "",
}: { label: string; value: string; onChange: (v: string) => void; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="glass w-full rounded-xl px-3 py-2 text-sm outline-none" />
    </div>
  );
}
