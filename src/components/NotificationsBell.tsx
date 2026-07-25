import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  FileSignature,
  Disc3,
  Handshake,
  FileDown,
  Receipt,
  Ticket,
  Clock,
  Zap,
} from "lucide-react";
import { useOS } from "@/lib/os-store";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { signedUrl } from "@/lib/cloud";
import { invoiceTotals } from "@/lib/invoice";
import { quota } from "@/lib/plans";

function daysUntil(iso: string): number | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return Math.ceil((d.getTime() - Date.now()) / 86400000);
}

/** Latest row the Monday digest cron logged for this account — see
 *  weekly_digests in 0003_soundcharts_digest_shares.sql and
 *  api/cron/weekly-digest.ts. This is "the summary somewhere you'll
 *  actually see it": the Bell is global chrome on every page. */
interface DigestRow {
  campaign_title: string;
  pdf_path: string | null;
  creators_count: number;
  task_progress: number;
  generated_at: string;
}

function useLatestDigest(): DigestRow | null {
  const [digest, setDigest] = useState<DigestRow | null>(null);
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    let cancelled = false;
    (async () => {
      const { data: s } = await supabase!.auth.getSession();
      const uid = s.session?.user.id;
      if (!uid) return;
      // Only surface digests from the last 8 days — an old one lingering
      // forever would just be noise once the next Monday's has landed.
      const since = new Date(Date.now() - 8 * 86400000).toISOString();
      const { data } = await supabase!
        .from("weekly_digests")
        .select(
          "campaign_title,pdf_path,creators_count,task_progress,generated_at",
        )
        .eq("user_id", uid)
        .gte("generated_at", since)
        .order("generated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!cancelled && data) setDigest(data as DigestRow);
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return digest;
}

export function NotificationsBell() {
  const {
    contracts,
    releases,
    deals,
    invoices,
    commissions,
    gigs,
    usage,
    plan,
  } = useOS();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const digest = useLatestDigest();

  async function openDigest() {
    setOpen(false);
    if (!digest?.pdf_path) return;
    const url = await signedUrl("reports", digest.pdf_path);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }

  const items = [
    ...(digest
      ? [
          {
            icon: FileDown,
            text: `This week's brief is ready — ${digest.campaign_title} (${digest.creators_count} creator${digest.creators_count !== 1 ? "s" : ""}, ${digest.task_progress}% checklist)`,
            onClick: digest.pdf_path ? openDigest : undefined,
            to: digest.pdf_path ? undefined : "/campaigns",
          },
        ]
      : []),
    ...contracts
      .map((c) => ({ c, d: daysUntil(c.expiresOn) }))
      .filter((x) => x.d !== null && x.d <= 30 && x.d >= 0)
      .map((x) => ({
        icon: FileSignature,
        text: `${x.c.name} expires in ${x.d}d`,
        to: "/vault" as const,
      })),
    ...releases
      .filter((r) => r.status === "Scheduled")
      .map((r) => ({
        icon: Disc3,
        text: `${r.title} scheduled — ${r.releaseDate}`,
        to: "/releases" as const,
      })),
    ...deals
      .filter((d) => d.status === "Contracting")
      .map((d) => ({
        icon: Handshake,
        text: `${d.brand} × ${d.artist} — awaiting signature`,
        to: "/roster" as const,
      })),

    /* ── growth modules ── */
    // Overdue invoices: the fastest money in the business is money already earned.
    ...invoices
      .filter((i) => i.status !== "Paid" && i.status !== "Void")
      .map((i) => ({ i, d: daysUntil(i.dueDate ?? "") }))
      .filter((x) => x.d !== null && x.d < 0)
      .map((x) => ({
        icon: Receipt,
        text: `${x.i.number} · ${x.i.clientName} is ${Math.abs(x.d!)}d overdue (${x.i.currency} ${invoiceTotals({ ...x.i, paid: x.i.paid }).balance.toLocaleString()})`,
        to: "/invoices" as const,
      })),
    // Quotes about to expire — the original Laravel CRM this is modelled on
    // ran automated expiry messages; this is the same idea, surfaced globally.
    ...commissions
      .filter((c) => c.phase === "Quoted")
      .map((c) => ({ c, d: daysUntil(c.quoteExpiresOn ?? "") }))
      .filter((x) => x.d !== null && x.d <= 7 && x.d >= 0)
      .map((x) => ({
        icon: Clock,
        text: `Quote for ${x.c.clientName} expires in ${x.d}d`,
        to: "/invoices" as const,
      })),
    // Work in progress with no deposit — the one rule the pipeline exists to enforce.
    ...commissions
      .filter(
        (c) =>
          !c.depositPaid &&
          ["In Progress", "Review", "Revisions", "Delivered"].includes(c.phase),
      )
      .map((c) => ({
        icon: Clock,
        text: `${c.title} is in progress without a deposit`,
        to: "/invoices" as const,
      })),
    // Shows tracking below break-even.
    ...gigs
      .filter((g) => ["Confirmed", "Announced", "On Sale"].includes(g.status))
      .map((g) => {
        const perTicket = g.ticketPrice * g.doorSplit;
        const be =
          perTicket > 0
            ? Math.ceil(Math.max(g.costs - g.guarantee, 0) / perTicket)
            : 0;
        return { g, short: be - g.ticketsSold };
      })
      .filter((x) => x.short > 0)
      .map((x) => ({
        icon: Ticket,
        text: `${x.g.venue} is ${x.short} tickets short of break-even`,
        to: "/live" as const,
      })),
    // Credit quota.
    ...(() => {
      const q = quota(plan, usage);
      if (q.limit === 0) return [];
      if (q.exhausted)
        return [
          {
            icon: Zap,
            text: `AI credits exhausted (${q.used}/${q.limit}) — metered actions are blocked`,
            to: "/billing" as const,
          },
        ];
      if (q.pct >= 0.8)
        return [
          {
            icon: Zap,
            text: `${q.left} AI credits left this month`,
            to: "/billing" as const,
          },
        ];
      return [];
    })(),
  ];

  return (
    <div className="fixed right-6 top-6 z-40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#0a0a0c]/90 backdrop-blur hover:border-white/30"
      >
        <Bell className="h-4 w-4 text-white/70" />
        {items.length > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[oklch(0.7_0.2_20)] px-1 text-[9px] font-bold text-white">
            {items.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#0a0a0c]/95 p-2 shadow-2xl backdrop-blur">
          <div className="px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
            Notifications
          </div>
          {items.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-white/40">
              All clear — nothing needs you.
            </div>
          )}
          {items.map((n, i) => (
            <button
              key={i}
              onClick={() => {
                if ("onClick" in n && n.onClick) {
                  n.onClick();
                  return;
                }
                setOpen(false);
                if (n.to) navigate({ to: n.to });
              }}
              className="flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left hover:bg-white/5"
            >
              <n.icon className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
              <span className="text-sm text-white/80">{n.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
