import type { ReactNode } from "react";
import { isSupabaseConfigured } from "@/lib/supabase";
import { PasswordGate } from "@/components/PasswordGate";
import { SupabaseAuthGate } from "@/components/SupabaseAuthGate";

/* Chooses the access gate:
   • Supabase configured → real email/password auth (accounts).
   • Not configured      → the local master-password gate (never lock out
     when running without a backend). */
export function AppGate({ children }: { children: ReactNode }) {
  if (isSupabaseConfigured) return <SupabaseAuthGate>{children}</SupabaseAuthGate>;
  return <PasswordGate>{children}</PasswordGate>;
}
