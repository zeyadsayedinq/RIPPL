import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Bell, FileSignature, Disc3, Handshake } from "lucide-react";
import { useOS } from "@/lib/os-store";

function daysUntil(iso: string): number | null {
  if (!iso) return null;
  const d = new Date(iso); if (isNaN(d.getTime())) return null;
  return Math.ceil((d.getTime() - Date.now()) / 86400000);
}

export function NotificationsBell() {
  const { contracts, releases, deals } = useOS();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const items = [
    ...contracts.map((c) => ({ c, d: daysUntil(c.expiresOn) }))
      .filter((x) => x.d !== null && x.d <= 30 && x.d >= 0)
      .map((x) => ({ icon: FileSignature, text: `${x.c.name} expires in ${x.d}d`, to: "/vault" })),
    ...releases.filter((r) => r.status === "Scheduled").map((r) => ({ icon: Disc3, text: `${r.title} scheduled — ${r.releaseDate}`, to: "/releases" })),
    ...deals.filter((d) => d.status === "Contracting").map((d) => ({ icon: Handshake, text: `${d.brand} × ${d.artist} — awaiting signature`, to: "/roster" })),
  ];

  return (
    <div className="fixed right-6 top-6 z-40">
      <button onClick={() => setOpen((o) => !o)} className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#0a0a0c]/90 backdrop-blur hover:border-white/30">
        <Bell className="h-4 w-4 text-white/70" />
        {items.length > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[oklch(0.7_0.2_20)] px-1 text-[9px] font-bold text-white">{items.length}</span>}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#0a0a0c]/95 p-2 shadow-2xl backdrop-blur">
          <div className="px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white/40">Notifications</div>
          {items.length === 0 && <div className="px-3 py-6 text-center text-sm text-white/40">All clear — nothing needs you.</div>}
          {items.map((n, i) => (
            <button key={i} onClick={() => { setOpen(false); navigate({ to: n.to }); }} className="flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left hover:bg-white/5">
              <n.icon className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
              <span className="text-sm text-white/80">{n.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
