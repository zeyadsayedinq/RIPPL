import { useEffect, useState } from "react";
import { Cloud, CloudOff, Loader2 } from "lucide-react";
import { onSync, type SyncState } from "@/lib/cloud";

/* Small fixed indicator showing cloud-sync status. Stays out of the way:
   shows "Saving…" briefly, a green "Synced" flash, and a persistent red
   "Sync error" so a silent DB failure can never go unnoticed again. */
export function SyncBadge() {
  const [state, setState] = useState<SyncState>("idle");
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => onSync((s, e) => {
    setState(s); setErr(e);
    if (s === "synced") { setShow(true); const t = setTimeout(() => setShow(false), 1400); return () => clearTimeout(t); }
    setShow(s === "saving" || s === "error");
  }), []);

  if (!show) return null;
  const cfg = {
    saving: { icon: Loader2, text: "Saving…", color: "oklch(0.8 0.02 260)", spin: true },
    synced: { icon: Cloud, text: "Synced", color: "oklch(0.82 0.18 150)", spin: false },
    error: { icon: CloudOff, text: "Sync error", color: "oklch(0.7 0.2 20)", spin: false },
    idle: { icon: Cloud, text: "", color: "", spin: false },
  }[state];
  const Icon = cfg.icon;

  return (
    <div className="fixed bottom-24 left-6 z-40 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur"
      title={err} style={{ borderColor: cfg.color + "55", background: cfg.color + "1a", color: cfg.color }}>
      <Icon className={`h-3.5 w-3.5 ${cfg.spin ? "animate-spin" : ""}`} />
      {cfg.text}
    </div>
  );
}
