import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MeshGradient } from "@/components/MeshGradient";
import { CommandPalette } from "@/components/CommandPalette";
import { AudioPlayer } from "@/components/AudioPlayer";
import { QuickActionFAB } from "@/components/QuickActionFAB";
import { NotificationsBell } from "@/components/NotificationsBell";
import { SyncBadge } from "@/components/SyncBadge";
import { XPRouteWindow } from "@/components/xp/XPShell";
import { useWindowsOptional } from "@/lib/window-store";
import { motion } from "framer-motion";

// Providers (Campaign, Role, OS, Window) live in __root.tsx, wrapping every route.
export function AppShell({ children }: { children: ReactNode }) {
  const win = useWindowsOptional();

  /* XP skin: the page becomes the CONTENTS of the route window. Wallpaper,
     taskbar and every other window are rendered once at the root by
     <XPChrome />, so nothing here needs to know about them.
     Sidebar → Start menu · FAB → desktop right-click · bell → system tray. */
  if (win?.skin === "xp") {
    return (
      <>
        <XPRouteWindow>{children}</XPRouteWindow>
        <CommandPalette />
      </>
    );
  }

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
      <NotificationsBell />
      <SyncBadge />
      <CommandPalette />
      <QuickActionFAB />
      <AudioPlayer />
    </>
  );
}
