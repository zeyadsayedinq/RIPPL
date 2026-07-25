import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { EmptyState } from "@/components/EmptyState";
import {
  useOS, uid,
  type Commission, type CommissionPhase, type InvoiceRecord, type InvoiceStatus,
} from "@/lib/os-store";
import { useRole } from "@/lib/role-context";
import {
  invoicePdf, quotePdf, invoiceTotals, nextInvoiceNumber, daysUntilDue, money,
} from "@/lib/invoice";
import {
  Receipt, Plus, Trash2, FileDown, Wallet, Clock, AlertTriangle, Workflow,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   COMMISSIONS & INVOICING
   Derived from wpwwhimself/muzyka-szyta-na-miare — a Laravel CRM for a music
   commission business built around client-visible commission *phases*,
   automated expiry, and invoice generation. RIPPL had contracts (/vault) but
   no client work pipeline and no invoicing at all.

   Run-book: knowledge/operations/COMMISSION_PIPELINE.md
═══════════════════════════════════════════════════════════ */

export const Route = createFileRoute("/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices · RIPPL OS" },
      { name: "description", content: "Commission pipeline, quotes and invoicing." },
    ],
  }),
  component: InvoicesPage,
});

const PHASES: CommissionPhase[] = [
  "Inquiry", "Quoted", "Deposit Paid", "In Progress", "Review",
  "Revisions", "Delivered", "Invoiced", "Paid", "Cancelled",
];
const STATUSES: InvoiceStatus[] = ["Draft", "Sent", "Partial", "Paid", "Overdue", "Void"];

type Tab = "pipeline" | "invoices";

function InvoicesPage() {
  const [tab, setTab] = useState<Tab>("pipeline");
  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "pipeline", label: "Commission Pipeline", icon: Workflow },
    { key: "invoices", label: "Invoices", icon: Receipt },
  ];
  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Client work · Money in</div>
        <h1 className="mt-1 font-display text-3xl font-bold">
          Commissions &amp; <span className="text-gradient-neon">Invoices</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          No work without a deposit. Balance invoice on delivery day, every time.
        </p>
      </header>

      <div className="glass mt-6 flex gap-1.5 overflow-x-auto rounded-2xl p-1.5">
        {tabs.map((t) => {
          const on = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${on ? "text-white" : "text-muted-foreground hover:text-white"}`}>
              {on && <motion.div layoutId="inv-tab" className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.06]"
                transition={{ type: "spring", stiffness: 320, damping: 30 }} />}
              <t.icon className="relative h-4 w-4" />
              <span className="relative whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">{tab === "pipeline" ? <Pipeline /> : <Invoices />}</div>
    </AppShell>
  );
}

/* ── Commission pipeline ─────────────────────────────────── */
function Pipeline() {
  const { commissions, update } = useOS();
  const { canSeePrice } = useRole();
  const mask = (v: string) => (canSeePrice ? v : "•••••");
  const [f, setF] = useState({ clientName: "", title: "", quoteAmount: "", dueDate: "" });

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!f.clientName.trim() || !f.title.trim()) return;
    const expires = new Date(Date.now() + 14 * 86_400_000).toISOString().slice(0, 10);
    const c: Commission = {
      id: uid("cm"),
      clientName: f.clientName.trim(),
      title: f.title.trim(),
      kind: "Custom",
      phase: "Inquiry",
      currency: "EGP",
      quoteAmount: Number(f.quoteAmount) || 0,
      depositPct: 0.5,
      depositPaid: false,
      revisionsIncluded: 2,
      revisionsUsed: 0,
      quoteExpiresOn: expires,
      dueDate: f.dueDate || undefined,
    };
    update("commissions", (all) => [c, ...all]);
    setF({ clientName: "", title: "", quoteAmount: "", dueDate: "" });
  }

  function patch(id: string, p: Partial<Commission>) {
    update("commissions", (all) => all.map((c) => (c.id === id ? { ...c, ...p } : c)));
  }

  function downloadQuote(c: Commission) {
    quotePdf({
      number: `Q-${c.id.slice(-4).toUpperCase()}`,
      clientName: c.clientName,
      title: c.title,
      currency: c.currency,
      amount: c.quoteAmount,
      depositPct: c.depositPct,
      validUntil: c.quoteExpiresOn || "—",
      revisionsIncluded: c.revisionsIncluded,
      included: [
        "24-bit/48kHz WAV master",
        "−14 LUFS streaming master",
        "Instrumental version",
        "MP3 reference",
      ],
      excluded: [
        "Stems (quoted separately)",
        "Alternate versions or edits not listed above",
        `Revisions beyond ${c.revisionsIncluded} rounds`,
        "Publishing or master share unless stated",
      ],
      rights: "Work-for-hire unless separately agreed in writing.",
    });
  }

  const expiringSoon = commissions.filter((c) => {
    const d = daysUntilDue(c.quoteExpiresOn);
    return c.phase === "Quoted" && d !== null && d <= 7;
  });

  return (
    <>
      <SpotlightCard className="p-5" spotlight={false}>
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">New commission</div>
        <form onSubmit={add} className="mt-3 grid grid-cols-12 items-end gap-3">
          <Field className="col-span-12 sm:col-span-3" label="Client" value={f.clientName} onChange={(v) => setF({ ...f, clientName: v })} />
          <Field className="col-span-12 sm:col-span-4" label="Brief / title" value={f.title} onChange={(v) => setF({ ...f, title: v })} />
          <Field className="col-span-6 sm:col-span-2" label="Quote (EGP)" type="number" value={f.quoteAmount} onChange={(v) => setF({ ...f, quoteAmount: v })} />
          <Field className="col-span-6 sm:col-span-2" label="Due" type="date" value={f.dueDate} onChange={(v) => setF({ ...f, dueDate: v })} />
          <div className="col-span-12 sm:col-span-1">
            <button className="w-full rounded-xl bg-white py-2 text-sm font-medium text-black"><Plus className="mx-auto h-4 w-4" /></button>
          </div>
        </form>
        <p className="mt-3 text-[11px] text-muted-foreground/70">
          Quotes expire after 14 days automatically — stated in the generated PDF.
        </p>
      </SpotlightCard>

      {expiringSoon.length > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[oklch(0.85_0.15_85/0.3)] bg-[oklch(0.85_0.15_85/0.06)] px-4 py-3 text-sm text-[oklch(0.88_0.13_85)]">
          <Clock className="h-4 w-4 shrink-0" />
          {expiringSoon.length} quote{expiringSoon.length > 1 ? "s" : ""} expiring within 7 days.
        </div>
      )}

      {commissions.length === 0 ? (
        <div className="mt-6"><EmptyState title="No commissions yet" note="Log an inquiry to start the pipeline." /></div>
      ) : (
        <div className="mt-4 space-y-3">
          {commissions.map((c) => {
            const deposit = c.quoteAmount * c.depositPct;
            const phaseIdx = PHASES.indexOf(c.phase);
            const blocked = !c.depositPaid && phaseIdx >= PHASES.indexOf("In Progress") && c.phase !== "Cancelled";
            return (
              <SpotlightCard key={c.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate font-display text-lg font-bold">{c.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {c.clientName} · {c.kind} · quote valid to {c.quoteExpiresOn || "—"}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <select value={c.phase} onChange={(e) => patch(c.id, { phase: e.target.value as CommissionPhase })}
                      className="glass rounded-lg bg-transparent px-2 py-1.5 text-xs outline-none">
                      {PHASES.map((p) => <option key={p} value={p} className="bg-black">{p}</option>)}
                    </select>
                    <button onClick={() => downloadQuote(c)} title="Download quote PDF"
                      className="glass rounded-lg p-2 hover:bg-white/5"><FileDown className="h-4 w-4" /></button>
                    <button onClick={() => update("commissions", (all) => all.filter((x) => x.id !== c.id))}
                      className="text-muted-foreground hover:text-white"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>

                {/* phase rail */}
                <div className="mt-4 flex gap-1">
                  {PHASES.slice(0, 9).map((p, i) => (
                    <div key={p} title={p} className="h-1.5 flex-1 rounded-full"
                      style={{ background: i <= phaseIdx ? "oklch(0.82 0.18 150)" : "rgba(255,255,255,0.07)" }} />
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Mini label="Quote" value={mask(money(c.quoteAmount, c.currency))} />
                  <Mini label={`Deposit ${Math.round(c.depositPct * 100)}%`} value={mask(money(deposit, c.currency))} />
                  <Mini label="Revisions" value={`${c.revisionsUsed} / ${c.revisionsIncluded}`} />
                  <Mini label="Due" value={c.dueDate || "—"} />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button onClick={() => patch(c.id, { depositPaid: !c.depositPaid })}
                    className={`glass rounded-full px-3 py-1.5 text-[11px] ${c.depositPaid ? "text-[oklch(0.82_0.18_150)]" : "text-muted-foreground"}`}>
                    {c.depositPaid ? "✓ Deposit received" : "Deposit outstanding"}
                  </button>
                  <button onClick={() => patch(c.id, { revisionsUsed: c.revisionsUsed + 1 })}
                    className="glass rounded-full px-3 py-1.5 text-[11px] text-muted-foreground hover:text-white">
                    + Revision used
                  </button>
                  {c.revisionsUsed > c.revisionsIncluded && (
                    <span className="text-[11px] text-[oklch(0.85_0.15_85)]">Over included revisions — raise a new quote.</span>
                  )}
                </div>

                {blocked && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-[oklch(0.7_0.2_20/0.3)] bg-[oklch(0.7_0.2_20/0.06)] px-3 py-2 text-[11px] text-[oklch(0.8_0.15_20)]">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    Work is in progress without a deposit. That is the rule this pipeline exists to enforce.
                  </div>
                )}
              </SpotlightCard>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ── Invoices ────────────────────────────────────────────── */
function Invoices() {
  const { invoices, commissions, update } = useOS();
  const { canSeePrice } = useRole();
  const mask = (v: string) => (canSeePrice ? v : "•••••");
  const [f, setF] = useState({ clientName: "", description: "", amount: "", dueDays: "14" });

  const totals = useMemo(() => {
    let outstanding = 0, collected = 0, overdue = 0;
    for (const i of invoices) {
      const t = invoiceTotals({ ...i, lines: i.lines, paid: i.paid });
      if (i.status === "Paid") collected += t.total;
      else if (i.status !== "Void") {
        outstanding += t.balance;
        const d = daysUntilDue(i.dueDate);
        if (d !== null && d < 0) overdue += t.balance;
      }
    }
    return { outstanding, collected, overdue };
  }, [invoices]);

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!f.clientName.trim()) return;
    const issue = new Date();
    const due = new Date(Date.now() + (Number(f.dueDays) || 14) * 86_400_000);
    const inv: InvoiceRecord = {
      id: uid("inv"),
      number: nextInvoiceNumber(invoices.map((i) => i.number)),
      clientName: f.clientName.trim(),
      issueDate: issue.toISOString().slice(0, 10),
      dueDate: due.toISOString().slice(0, 10),
      currency: "EGP",
      taxRate: 0,
      status: "Draft",
      paid: 0,
      lines: [{ description: f.description.trim() || "Services", quantity: 1, unitPrice: Number(f.amount) || 0 }],
    };
    update("invoices", (all) => [inv, ...all]);
    setF({ clientName: "", description: "", amount: "", dueDays: "14" });
  }

  function patch(id: string, p: Partial<InvoiceRecord>) {
    update("invoices", (all) => all.map((i) => (i.id === id ? { ...i, ...p } : i)));
  }

  function download(i: InvoiceRecord) {
    invoicePdf({
      number: i.number,
      clientName: i.clientName,
      clientEmail: i.clientEmail,
      issueDate: i.issueDate,
      dueDate: i.dueDate,
      currency: i.currency,
      taxRate: i.taxRate,
      lines: i.lines,
      paid: i.paid,
      notes: i.notes,
      from: { name: "RIPPL", email: "zeyadsayedinq@gmail.com" },
    });
  }

  return (
    <>
      <section className="grid grid-cols-12 gap-4">
        <Stat label="Outstanding" value={mask(`EGP ${Math.round(totals.outstanding).toLocaleString()}`)} icon={Wallet} accent="oklch(0.85 0.02 260)" />
        <Stat label="Collected" value={mask(`EGP ${Math.round(totals.collected).toLocaleString()}`)} icon={Receipt} accent="oklch(0.82 0.18 150)" />
        <Stat label="Overdue" value={mask(`EGP ${Math.round(totals.overdue).toLocaleString()}`)} icon={AlertTriangle}
          accent={totals.overdue ? "oklch(0.7 0.2 20)" : "oklch(0.82 0.18 150)"} />
        <Stat label="Open commissions" value={String(commissions.filter((c) => !["Paid", "Cancelled"].includes(c.phase)).length)}
          icon={Workflow} accent="oklch(0.7 0.02 260)" />
      </section>

      <SpotlightCard className="mt-6 p-5" spotlight={false}>
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Raise an invoice</div>
        <form onSubmit={add} className="mt-3 grid grid-cols-12 items-end gap-3">
          <Field className="col-span-12 sm:col-span-3" label="Client" value={f.clientName} onChange={(v) => setF({ ...f, clientName: v })} />
          <Field className="col-span-12 sm:col-span-4" label="Description" value={f.description} onChange={(v) => setF({ ...f, description: v })} />
          <Field className="col-span-6 sm:col-span-2" label="Amount" type="number" value={f.amount} onChange={(v) => setF({ ...f, amount: v })} />
          <Field className="col-span-6 sm:col-span-2" label="Due in (days)" type="number" value={f.dueDays} onChange={(v) => setF({ ...f, dueDays: v })} />
          <div className="col-span-12 sm:col-span-1">
            <button className="w-full rounded-xl bg-white py-2 text-sm font-medium text-black"><Plus className="mx-auto h-4 w-4" /></button>
          </div>
        </form>
      </SpotlightCard>

      {invoices.length === 0 ? (
        <div className="mt-6"><EmptyState title="No invoices yet" note="Raise the balance invoice on delivery day, not later." /></div>
      ) : (
        <SpotlightCard className="mt-4 p-5" spotlight={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="pb-3">No.</th><th className="pb-3">Client</th><th className="pb-3">Issued</th>
                  <th className="pb-3">Due</th><th className="pb-3 text-right">Total</th>
                  <th className="pb-3 text-right">Balance</th><th className="pb-3">Status</th><th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((i) => {
                  const t = invoiceTotals({ ...i, paid: i.paid });
                  const d = daysUntilDue(i.dueDate);
                  const late = i.status !== "Paid" && i.status !== "Void" && d !== null && d < 0;
                  return (
                    <tr key={i.id} className="border-t border-white/[0.06]">
                      <td className="py-3 font-mono text-xs">{i.number}</td>
                      <td className="py-3 font-medium">{i.clientName}</td>
                      <td className="py-3 text-muted-foreground">{i.issueDate}</td>
                      <td className="py-3" style={late ? { color: "oklch(0.8 0.15 20)" } : undefined}>
                        {i.dueDate || "—"}{late && ` (${Math.abs(d!)}d late)`}
                      </td>
                      <td className="py-3 text-right font-mono">{mask(money(t.total, i.currency))}</td>
                      <td className="py-3 text-right font-mono">{mask(money(t.balance, i.currency))}</td>
                      <td className="py-3">
                        <select value={i.status}
                          onChange={(e) => {
                            const status = e.target.value as InvoiceStatus;
                            patch(i.id, {
                              status,
                              paid: status === "Paid" ? t.total : i.paid,
                              paidOn: status === "Paid" ? new Date().toISOString().slice(0, 10) : undefined,
                            });
                          }}
                          className="glass rounded-lg bg-transparent px-2 py-1 text-xs outline-none">
                          {STATUSES.map((s) => <option key={s} value={s} className="bg-black">{s}</option>)}
                        </select>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => download(i)} title="Download PDF"
                            className="glass rounded-lg p-1.5 hover:bg-white/5"><FileDown className="h-3.5 w-3.5" /></button>
                          <button onClick={() => update("invoices", (all) => all.filter((x) => x.id !== i.id))}
                            className="text-muted-foreground hover:text-white"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SpotlightCard>
      )}
    </>
  );
}

/* ── shared bits ─────────────────────────────────────────── */
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

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl px-3 py-2">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-mono text-xs">{value}</div>
    </div>
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
