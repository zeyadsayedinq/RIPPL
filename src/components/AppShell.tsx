import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MeshGradient } from "@/components/MeshGradient";
import { CommandPalette } from "@/components/CommandPalette";
import { AudioPlayer } from "@/components/AudioPlayer";
import { QuickActionFAB } from "@/components/QuickActionFAB";
import { motion } from "framer-motion";

// Providers (Campaign, Role, OS) live in __root.tsx, wrapping every route.
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <MeshGradient />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] gap-6 p-4 pb-24">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="min-w-0 flex-1 pb-16"
        >
          {children}
        </motion.main>
      </div>

      {/* Global chrome */}
      <CommandPalette />
      <QuickActionFAB />
      <AudioPlayer />
    </>
  );
}
