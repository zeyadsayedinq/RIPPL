import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { NewCampaignModal } from "@/components/NewCampaignModal";
import { useWindowsOptional } from "@/lib/window-store";
import { XPIcon } from "@/components/xp/XPIcon";

/* Reusable empty-state card. Shows a "New campaign" CTA by default. */
export function EmptyState({
  title,
  note,
  showCreate = true,
}: {
  title: string;
  note: string;
  showCreate?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const win = useWindowsOptional();

  /* Explorer's "This folder is empty" pane. */
  if (win?.skin === "xp") {
    return (
      <div style={{
        marginTop: 16, padding: "48px 16px", textAlign: "center",
        background: "#fff", border: "1px solid", borderColor: "#716F64 #fff #fff #716F64",
      }}>
        <XPIcon name="folderopen" size={48} />
        <p style={{ margin: "12px 0 0", fontSize: 13, color: "#000" }}>{title}</p>
        <p style={{ margin: "6px 0 0", fontSize: 11, color: "#4A4A42" }}>{note}</p>
        {showCreate && (
          <div style={{ marginTop: 18 }}>
            <MagneticButton onClick={() => setOpen(true)}>New campaign</MagneticButton>
          </div>
        )}
        <AnimatePresence>{open && <NewCampaignModal onClose={() => setOpen(false)} />}</AnimatePresence>
      </div>
    );
  }

  return (
    <SpotlightCard className="mt-6 p-12 text-center" spotlight={false}>
      <div className="mx-auto max-w-md">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[oklch(0.7_0.28_328)]/15">
          <Sparkles className="h-6 w-6 text-[oklch(0.8_0.25_328)]" />
        </div>
        <h2 className="mt-4 font-display text-2xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{note}</p>
        {showCreate && (
          <div className="mt-6 flex justify-center">
            <MagneticButton onClick={() => setOpen(true)}>+ New campaign</MagneticButton>
          </div>
        )}
      </div>
      <AnimatePresence>{open && <NewCampaignModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </SpotlightCard>
  );
}
