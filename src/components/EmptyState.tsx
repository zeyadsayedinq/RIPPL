import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { NewCampaignModal } from "@/components/NewCampaignModal";

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
