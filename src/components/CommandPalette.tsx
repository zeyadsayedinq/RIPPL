import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Search,
  User,
  Handshake,
  Disc3,
  StickyNote,
  Megaphone,
  Plus,
  Receipt,
  Ticket,
  Share2,
  Sparkles,
  BookOpen,
  Workflow,
} from "lucide-react";
import { Portal } from "@/components/Portal";
import { useOS, uid } from "@/lib/os-store";
import { useCampaigns } from "@/lib/campaign-store";
import { KNOWLEDGE } from "@/lib/knowledge-index";
import { nextInvoiceNumber } from "@/lib/invoice";

type Item = { icon: any; label: string; sub: string; to: string };

export function CommandPalette() {
  const {
    paletteOpen,
    setPaletteOpen,
    artists,
    deals,
    releases,
    notes,
    update,
    gigs,
    commissions,
    invoices,
    affiliates,
    hitScores,
  } = useOS();
  const { campaigns } = useCampaigns();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const creates: { icon: any; label: string; run: () => void }[] = [
    {
      icon: StickyNote,
      label: "New note / idea",
      run: () => {
        update("notes", (n) => [
          { id: uid("n"), title: "Untitled", body: "", updatedAt: "just now" },
          ...n,
        ]);
        go("/studio");
      },
    },
    {
      icon: User,
      label: "New scouting lead",
      run: () => {
        update("artists", (a) => [
          {
            id: uid("ar"),
            name: "New lead",
            kind: "Music",
            handle: "",
            streams: "—",
            followers: "—",
            stage: "Discovered",
            managed: false,
          },
          ...a,
        ]);
        go("/roster");
      },
    },
    { icon: Disc3, label: "New release", run: () => go("/releases") },
    {
      icon: Handshake,
      label: "New brand deal",
      run: () => {
        update("deals", (d) => [
          {
            id: uid("d"),
            brand: "Brand",
            artist: "—",
            deliverables: "",
            value: 0,
            split: 0,
            status: "Pitching",
          },
          ...d,
        ]);
        go("/roster");
      },
    },
    { icon: Megaphone, label: "New campaign", run: () => go("/campaigns") },
    /* ── growth modules ── */
    {
      icon: Receipt,
      label: "Raise an invoice",
      run: () => {
        update("invoices", (all) => [
          {
            id: uid("inv"),
            number: nextInvoiceNumber(all.map((i) => i.number)),
            clientName: "New client",
            issueDate: new Date().toISOString().slice(0, 10),
            dueDate: new Date(Date.now() + 14 * 86400000)
              .toISOString()
              .slice(0, 10),
            currency: "EGP",
            taxRate: 0,
            status: "Draft" as const,
            paid: 0,
            lines: [{ description: "Services", quantity: 1, unitPrice: 0 }],
          },
          ...all,
        ]);
        go("/invoices");
      },
    },
    {
      icon: Workflow,
      label: "New commission",
      run: () => {
        update("commissions", (all) => [
          {
            id: uid("cm"),
            clientName: "New client",
            title: "Untitled brief",
            kind: "Custom" as const,
            phase: "Inquiry" as const,
            currency: "EGP",
            quoteAmount: 0,
            depositPct: 0.5,
            depositPaid: false,
            revisionsIncluded: 2,
            revisionsUsed: 0,
            quoteExpiresOn: new Date(Date.now() + 14 * 86400000)
              .toISOString()
              .slice(0, 10),
          },
          ...all,
        ]);
        go("/invoices");
      },
    },
    {
      icon: Ticket,
      label: "Add a show",
      run: () => {
        update("gigs", (all) => [
          {
            id: uid("gig"),
            artist: "—",
            venue: "New venue",
            city: "",
            date: "",
            status: "Enquiry" as const,
            capacity: 0,
            currency: "EGP",
            ticketPrice: 0,
            guarantee: 0,
            doorSplit: 0.7,
            costs: 0,
            ticketsSold: 0,
            advanceComplete: false,
          },
          ...all,
        ]);
        go("/live");
      },
    },
    {
      icon: Share2,
      label: "Add affiliate partner",
      run: () => {
        update("affiliates", (all) => [
          {
            id: uid("aff"),
            partnerName: "New partner",
            code: `RIPPL-${all.length + 1}`,
            channel: "Newsletter",
            commissionRate: 0.2,
            currency: "USD",
            active: true,
            clicks: 0,
            signups: 0,
            conversions: 0,
            revenue: 0,
            payoutStatus: "pending" as const,
          },
          ...all,
        ]);
        go("/affiliates");
      },
    },
    {
      icon: Sparkles,
      label: "Score a track (Hit Lab)",
      run: () => go("/hitlab"),
    },
    {
      icon: BookOpen,
      label: "Open the Knowledge Hub",
      run: () => go("/knowledge"),
    },
  ];

  const items = useMemo<Item[]>(() => {
    const all: Item[] = [
      ...artists.map((a) => ({
        icon: User,
        label: a.name,
        sub: `Artist · ${a.handle}`,
        to: "/roster",
      })),
      ...deals.map((d) => ({
        icon: Handshake,
        label: `${d.brand} × ${d.artist}`,
        sub: `Deal · ${d.status}`,
        to: "/roster",
      })),
      ...releases.map((r) => ({
        icon: Disc3,
        label: r.title,
        sub: `Release · ${r.artist}`,
        to: "/releases",
      })),
      ...notes.map((n) => ({
        icon: StickyNote,
        label: n.title,
        sub: "Note",
        to: "/studio",
      })),
      ...campaigns.map((c) => ({
        icon: Megaphone,
        label: c.title,
        sub: `Campaign · ${c.artist}`,
        to: "/campaigns",
      })),
      ...invoices.map((i) => ({
        icon: Receipt,
        label: `${i.number} · ${i.clientName}`,
        sub: `Invoice · ${i.status}`,
        to: "/invoices",
      })),
      ...commissions.map((c) => ({
        icon: Workflow,
        label: c.title,
        sub: `Commission · ${c.phase} · ${c.clientName}`,
        to: "/invoices",
      })),
      ...gigs.map((g) => ({
        icon: Ticket,
        label: `${g.venue}${g.city ? ` · ${g.city}` : ""}`,
        sub: `Show · ${g.status} · ${g.artist}`,
        to: "/live",
      })),
      ...affiliates.map((a) => ({
        icon: Share2,
        label: a.partnerName,
        sub: `Affiliate · ${a.code}`,
        to: "/affiliates",
      })),
      ...hitScores.map((h) => ({
        icon: Sparkles,
        label: h.title,
        sub: `Hit Score ${h.score.toFixed(1)} · ${h.band}`,
        to: "/hitlab",
      })),
      ...KNOWLEDGE.map((k) => ({
        icon: BookOpen,
        label: k.title,
        sub: `Knowledge · ${k.section}`,
        to: "/knowledge",
      })),
    ];
    if (!q.trim()) return all.slice(0, 8);
    const s = q.toLowerCase();
    return all
      .filter((i) => `${i.label} ${i.sub}`.toLowerCase().includes(s))
      .slice(0, 12);
  }, [
    q,
    artists,
    deals,
    releases,
    notes,
    campaigns,
    invoices,
    commissions,
    gigs,
    affiliates,
    hitScores,
  ]);

  if (!paletteOpen) return null;

  function go(to: string) {
    setPaletteOpen(false);
    setQ("");
    navigate({ to });
  }

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[120] grid place-items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-md"
        onClick={() => setPaletteOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c]/95 shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-white/10 px-4">
            <Search className="h-4 w-4 text-white/40" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search artists, releases, invoices, shows, partners, knowledge…"
              className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-white/30"
            />
            <kbd className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/40">
              ESC
            </kbd>
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {(() => {
              const cs = creates.filter(
                (c) =>
                  !q.trim() || c.label.toLowerCase().includes(q.toLowerCase()),
              );
              return (
                cs.length > 0 && (
                  <div className="mb-1">
                    <div className="px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Create
                    </div>
                    {cs.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          c.run();
                        }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-white/5"
                      >
                        <span className="grid h-4 w-4 place-items-center">
                          <Plus className="h-3.5 w-3.5 text-white/50" />
                        </span>
                        <span className="text-sm text-white">{c.label}</span>
                      </button>
                    ))}
                  </div>
                )
              );
            })()}
            {items.length === 0 && (
              <div className="px-3 py-6 text-center text-sm text-white/40">
                No matches.
              </div>
            )}
            {items.map((i, idx) => (
              <button
                key={idx}
                onClick={() => go(i.to)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-white/5"
              >
                <i.icon className="h-4 w-4 shrink-0 text-white/50" />
                <span className="min-w-0">
                  <span className="block truncate text-sm text-white">
                    {i.label}
                  </span>
                  <span className="block truncate text-[11px] text-white/40">
                    {i.sub}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Portal>
  );
}
