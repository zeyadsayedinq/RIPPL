import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  StickyNote,
  FileSignature,
  Handshake,
  UserSearch,
  Receipt,
  Ticket,
  Share2,
} from "lucide-react";
import { ModalShell } from "@/components/NewCampaignModal";
import { MagneticButton } from "@/components/MagneticButton";
import {
  useOS,
  uid,
  type ContractTag,
  type DealStatus,
  type ScoutStage,
} from "@/lib/os-store";
import { nextInvoiceNumber } from "@/lib/invoice";

type Action =
  "note" | "contract" | "deal" | "lead" | "invoice" | "gig" | "affiliate";
const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-white/40";
const label =
  "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground";

export function QuickActionFAB() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<Action | null>(null);

  const menu: { key: Action; label: string; icon: any }[] = [
    { key: "note", label: "New Note / Idea", icon: StickyNote },
    { key: "contract", label: "Upload Contract", icon: FileSignature },
    { key: "deal", label: "Log Brand Deal", icon: Handshake },
    { key: "lead", label: "Add Scouting Lead", icon: UserSearch },
    { key: "invoice", label: "Raise Invoice", icon: Receipt },
    { key: "gig", label: "Add Show", icon: Ticket },
    { key: "affiliate", label: "Add Affiliate Partner", icon: Share2 },
  ];

  return (
    <>
      <div className="fixed bottom-20 right-6 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open &&
            menu.map((m, i) => (
              <motion.button
                key={m.key}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => {
                  setAction(m.key);
                  setOpen(false);
                }}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0c]/95 py-2 pl-3 pr-4 text-sm text-white shadow-xl backdrop-blur hover:border-white/40"
              >
                <m.icon className="h-4 w-4 text-white/60" /> {m.label}
              </motion.button>
            ))}
        </AnimatePresence>
        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-2xl transition-transform hover:scale-105"
          aria-label="Quick actions"
        >
          <Plus
            className={`h-6 w-6 transition-transform ${open ? "rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {action && (
          <QuickModal action={action} onClose={() => setAction(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

function QuickModal({
  action,
  onClose,
}: {
  action: Action;
  onClose: () => void;
}) {
  const { update, invoices } = useOS();
  const [saved, setSaved] = useState(false);
  // shared fields
  const [f, setF] = useState<Record<string, string>>({});
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (action === "note")
      update("notes", (n) => [
        {
          id: uid("n"),
          title: f.title || "Untitled",
          body: f.body || "",
          updatedAt: "just now",
        },
        ...n,
      ]);
    if (action === "contract")
      update("contracts", (c) => [
        {
          id: uid("c"),
          name: f.name || "Untitled contract",
          tag: (f.tag as ContractTag) || "Other",
          expiresOn: f.expires || "",
          fileName: f.file || "contract.pdf",
        },
        ...c,
      ]);
    if (action === "deal")
      update("deals", (d) => [
        {
          id: uid("d"),
          brand: f.brand || "Brand",
          artist: f.artist || "—",
          deliverables: f.deliverables || "",
          value: Number(f.value) || 0,
          split: Number(f.split) || 0,
          status: (f.status as DealStatus) || "Pitching",
        },
        ...d,
      ]);
    if (action === "lead")
      update("artists", (a) => [
        {
          id: uid("ar"),
          name: f.name || "New lead",
          kind: (f.kind as "Music" | "Influencer") || "Music",
          handle: f.handle || "",
          streams: f.streams || "—",
          followers: f.followers || "—",
          stage: "Discovered" as ScoutStage,
          managed: false,
        },
        ...a,
      ]);
    if (action === "invoice")
      update("invoices", (all) => [
        {
          id: uid("inv"),
          number: nextInvoiceNumber(invoices.map((i) => i.number)),
          clientName: f.client || "New client",
          clientEmail: f.email || undefined,
          issueDate: new Date().toISOString().slice(0, 10),
          dueDate: new Date(Date.now() + (Number(f.dueDays) || 14) * 86400000)
            .toISOString()
            .slice(0, 10),
          currency: "EGP",
          taxRate: 0,
          status: "Draft",
          paid: 0,
          lines: [
            {
              description: f.description || "Services",
              quantity: 1,
              unitPrice: Number(f.amount) || 0,
            },
          ],
        },
        ...all,
      ]);
    if (action === "gig")
      update("gigs", (all) => [
        {
          id: uid("gig"),
          artist: f.artist || "—",
          venue: f.venue || "New venue",
          city: f.city || "",
          date: f.date || "",
          status: "Enquiry",
          capacity: Number(f.capacity) || 0,
          currency: "EGP",
          ticketPrice: Number(f.ticketPrice) || 0,
          guarantee: Number(f.guarantee) || 0,
          doorSplit: 0.7,
          costs: Number(f.costs) || 0,
          ticketsSold: 0,
          advanceComplete: false,
        },
        ...all,
      ]);
    if (action === "affiliate")
      update("affiliates", (all) => [
        {
          id: uid("aff"),
          partnerName: f.partner || "New partner",
          partnerEmail: f.email || undefined,
          code: (
            f.code || `RIPPL-${(f.partner || "P").split(/\s+/)[0]}`
          ).toUpperCase(),
          channel: f.channel || "Newsletter",
          commissionRate: (Number(f.rate) || 20) / 100,
          currency: "USD",
          active: true,
          clicks: 0,
          signups: 0,
          conversions: 0,
          revenue: 0,
          payoutStatus: "pending",
        },
        ...all,
      ]);
    setSaved(true);
  }

  const meta: Record<Action, { eyebrow: string; title: string }> = {
    note: { eyebrow: "Quick action", title: "New Note / Idea" },
    contract: { eyebrow: "Quick action", title: "Upload Contract" },
    deal: { eyebrow: "Quick action", title: "Log Brand Deal" },
    lead: { eyebrow: "Quick action", title: "Add Scouting Lead" },
    invoice: { eyebrow: "Quick action", title: "Raise Invoice" },
    gig: { eyebrow: "Quick action", title: "Add Show" },
    affiliate: { eyebrow: "Quick action", title: "Add Affiliate Partner" },
  };

  if (saved) {
    return (
      <ModalShell
        eyebrow={meta[action].eyebrow}
        title="Saved"
        onClose={onClose}
      >
        <p className="text-sm text-muted-foreground">
          Added to your RIPPL OS. You'll find it in the relevant module.
        </p>
        <div className="mt-5 flex justify-end">
          <MagneticButton onClick={onClose}>Done</MagneticButton>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell
      eyebrow={meta[action].eyebrow}
      title={meta[action].title}
      onClose={onClose}
    >
      <form onSubmit={submit} className="space-y-4">
        {action === "note" && (
          <>
            <div>
              <label className={label}>Title</label>
              <input
                className={field}
                value={f.title || ""}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Idea title"
              />
            </div>
            <div>
              <label className={label}>Note</label>
              <textarea
                className={`${field} min-h-24`}
                value={f.body || ""}
                onChange={(e) => set("body", e.target.value)}
                placeholder="Write your idea…"
              />
            </div>
          </>
        )}
        {action === "contract" && (
          <>
            <div>
              <label className={label}>Contract name</label>
              <input
                className={field}
                value={f.name || ""}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Artist — Agreement"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Tag</label>
                <select
                  className={field}
                  value={f.tag || "Split Sheet"}
                  onChange={(e) => set("tag", e.target.value)}
                >
                  {[
                    "Split Sheet",
                    "Exclusive Recording",
                    "Sync License",
                    "Management",
                    "Other",
                  ].map((t) => (
                    <option key={t} className="bg-[#140a1e]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label}>Expires on</label>
                <input
                  type="date"
                  className={field}
                  value={f.expires || ""}
                  onChange={(e) => set("expires", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className={label}>File</label>
              <input
                type="file"
                className={field}
                onChange={(e) => set("file", e.target.files?.[0]?.name || "")}
              />
            </div>
          </>
        )}
        {action === "deal" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Brand</label>
                <input
                  className={field}
                  value={f.brand || ""}
                  onChange={(e) => set("brand", e.target.value)}
                  placeholder="Vodafone"
                />
              </div>
              <div>
                <label className={label}>Artist</label>
                <input
                  className={field}
                  value={f.artist || ""}
                  onChange={(e) => set("artist", e.target.value)}
                  placeholder="Shehab"
                />
              </div>
              <div>
                <label className={label}>Value (EGP)</label>
                <input
                  type="number"
                  className={field}
                  value={f.value || ""}
                  onChange={(e) => set("value", e.target.value)}
                  placeholder="180000"
                />
              </div>
              <div>
                <label className={label}>Split %</label>
                <input
                  type="number"
                  className={field}
                  value={f.split || ""}
                  onChange={(e) => set("split", e.target.value)}
                  placeholder="25"
                />
              </div>
            </div>
            <div>
              <label className={label}>Deliverables</label>
              <input
                className={field}
                value={f.deliverables || ""}
                onChange={(e) => set("deliverables", e.target.value)}
                placeholder="3 Reels + 1 TikTok"
              />
            </div>
          </>
        )}
        {action === "lead" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Name</label>
                <input
                  className={field}
                  value={f.name || ""}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Artist name"
                />
              </div>
              <div>
                <label className={label}>Type</label>
                <select
                  className={field}
                  value={f.kind || "Music"}
                  onChange={(e) => set("kind", e.target.value)}
                >
                  <option className="bg-[#140a1e]">Music</option>
                  <option className="bg-[#140a1e]">Influencer</option>
                </select>
              </div>
              <div>
                <label className={label}>Handle</label>
                <input
                  className={field}
                  value={f.handle || ""}
                  onChange={(e) => set("handle", e.target.value)}
                  placeholder="@handle"
                />
              </div>
              <div>
                <label className={label}>Followers</label>
                <input
                  className={field}
                  value={f.followers || ""}
                  onChange={(e) => set("followers", e.target.value)}
                  placeholder="310K"
                />
              </div>
            </div>
          </>
        )}
        {action === "invoice" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Client</label>
                <input
                  className={field}
                  value={f.client || ""}
                  onChange={(e) => set("client", e.target.value)}
                  placeholder="Nile Records"
                />
              </div>
              <div>
                <label className={label}>Email</label>
                <input
                  className={field}
                  value={f.email || ""}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="ops@example.com"
                />
              </div>
              <div>
                <label className={label}>Amount (EGP)</label>
                <input
                  type="number"
                  className={field}
                  value={f.amount || ""}
                  onChange={(e) => set("amount", e.target.value)}
                  placeholder="18000"
                />
              </div>
              <div>
                <label className={label}>Due in (days)</label>
                <input
                  type="number"
                  className={field}
                  value={f.dueDays || "14"}
                  onChange={(e) => set("dueDays", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className={label}>Description</label>
              <input
                className={field}
                value={f.description || ""}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Custom beat pack ×3"
              />
            </div>
            <p className="text-[11px] text-muted-foreground/70">
              Raise the balance invoice on delivery day — not later.
            </p>
          </>
        )}
        {action === "gig" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Artist</label>
                <input
                  className={field}
                  value={f.artist || ""}
                  onChange={(e) => set("artist", e.target.value)}
                  placeholder="Marwan H."
                />
              </div>
              <div>
                <label className={label}>Venue</label>
                <input
                  className={field}
                  value={f.venue || ""}
                  onChange={(e) => set("venue", e.target.value)}
                  placeholder="Cairo Jazz Club"
                />
              </div>
              <div>
                <label className={label}>City</label>
                <input
                  className={field}
                  value={f.city || ""}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="Cairo"
                />
              </div>
              <div>
                <label className={label}>Date</label>
                <input
                  type="date"
                  className={field}
                  value={f.date || ""}
                  onChange={(e) => set("date", e.target.value)}
                />
              </div>
              <div>
                <label className={label}>Capacity</label>
                <input
                  type="number"
                  className={field}
                  value={f.capacity || ""}
                  onChange={(e) => set("capacity", e.target.value)}
                  placeholder="400"
                />
              </div>
              <div>
                <label className={label}>Ticket price</label>
                <input
                  type="number"
                  className={field}
                  value={f.ticketPrice || ""}
                  onChange={(e) => set("ticketPrice", e.target.value)}
                  placeholder="350"
                />
              </div>
              <div>
                <label className={label}>Guarantee</label>
                <input
                  type="number"
                  className={field}
                  value={f.guarantee || ""}
                  onChange={(e) => set("guarantee", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div>
                <label className={label}>Costs</label>
                <input
                  type="number"
                  className={field}
                  value={f.costs || ""}
                  onChange={(e) => set("costs", e.target.value)}
                  placeholder="25000"
                />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground/70">
              Break-even ticket count is computed for you on /live.
            </p>
          </>
        )}
        {action === "affiliate" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Partner</label>
                <input
                  className={field}
                  value={f.partner || ""}
                  onChange={(e) => set("partner", e.target.value)}
                  placeholder="Partner One"
                />
              </div>
              <div>
                <label className={label}>Email</label>
                <input
                  className={field}
                  value={f.email || ""}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="one@example.com"
                />
              </div>
              <div>
                <label className={label}>Code</label>
                <input
                  className={field}
                  value={f.code || ""}
                  onChange={(e) => set("code", e.target.value)}
                  placeholder="RIPPL-ONE"
                />
              </div>
              <div>
                <label className={label}>Commission %</label>
                <input
                  type="number"
                  className={field}
                  value={f.rate || "20"}
                  onChange={(e) => set("rate", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className={label}>Channel</label>
              <select
                className={field}
                value={f.channel || "Newsletter"}
                onChange={(e) => set("channel", e.target.value)}
              >
                {[
                  "Newsletter",
                  "Instagram",
                  "TikTok",
                  "YouTube",
                  "Blog",
                  "Discord",
                  "Word of mouth",
                ].map((c) => (
                  <option key={c} className="bg-[#140a1e]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white"
          >
            Cancel
          </button>
          <MagneticButton>Save</MagneticButton>
        </div>
      </form>
    </ModalShell>
  );
}
