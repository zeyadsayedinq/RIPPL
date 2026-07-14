import type { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MeshGradient } from "@/components/MeshGradient";
import { RoleProvider } from "@/lib/role-context";
import { CampaignProvider } from "@/lib/campaign-store";
import { motion } from "framer-motion";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <CampaignProvider>
    <RoleProvider>
      <MeshGradient />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] gap-6 p-4">
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
    </RoleProvider>
    </CampaignProvider>
  );
}
