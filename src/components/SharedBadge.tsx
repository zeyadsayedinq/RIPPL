import { Lock, PenLine } from "lucide-react";

/* Small pill shown on items that HQ assigned to this account (members only).
   View = read-only (edits silently revert); Edit = changes sync back to HQ. */
export function SharedBadge({ editable, className = "" }: { editable: boolean; className?: string }) {
  return (
    <span
      title={editable ? "Assigned by HQ — you have full edit access; changes sync back to HQ." : "Assigned by HQ — view-only. Ask HQ for edit access."}
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider ${
        editable
          ? "border-[oklch(0.85_0.25_328)]/40 bg-[oklch(0.85_0.25_328)]/10 text-[oklch(0.85_0.25_328)]"
          : "border-white/15 bg-white/[0.04] text-muted-foreground"
      } ${className}`}
    >
      {editable ? <PenLine className="h-2.5 w-2.5" /> : <Lock className="h-2.5 w-2.5" />}
      {editable ? "HQ · Edit" : "HQ · View"}
    </span>
  );
}
