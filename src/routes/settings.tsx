import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useRole, type Role } from "@/lib/role-context";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { clearEverything } from "@/lib/cloud";
import { Lock, Trash2, ShieldCheck, Database, LogOut } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · RIPPL OS" }] }),
  component: SettingsPage,
});

const roles: Role[] = ["Marketing Manager", "Team Member", "Client"];

function SettingsPage() {
  const { role, setRole } = useRole();
  async function lock() {
    if (isSupabaseConfigured && supabase) { await supabase.auth.signOut(); }
    try { localStorage.removeItem("rippl.unlocked.v1"); } catch { /* ignore */ }
    location.reload();
  }
  async function resetOS() {
    if (!confirm("Reset EVERYTHING — all campaigns, roster, deals, releases, contracts, files, notes (local + Supabase)? This cannot be undone.")) return;
    await clearEverything();
    location.reload();
  }
  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">System</div>
        <h1 className="mt-1 font-display text-3xl font-bold"><span className="text-gradient-neon">Settings</span></h1>
      </header>

      <section className="mt-6 grid grid-cols-12 gap-4">
        <SpotlightCard className="col-span-12 md:col-span-6 p-6" spotlight={false}>
          <div className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-white/50" /> Active role</div>
          <p className="mt-1 text-xs text-muted-foreground">Controls what pricing/financials are visible.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {roles.map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`rounded-full border px-4 py-2 text-sm ${r === role ? "border-white bg-white text-black" : "border-white/15 text-muted-foreground hover:text-white"}`}>{r}</button>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard className="col-span-12 p-6" spotlight={false}>
          <div className="flex items-center gap-2 text-sm font-semibold"><Database className="h-4 w-4 text-white/50" /> Backend</div>
          <div className="mt-3 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]" style={{ color: isSupabaseConfigured ? "oklch(0.82 0.18 150)" : "oklch(0.7 0.02 260)", background: (isSupabaseConfigured ? "oklch(0.82 0.18 150)" : "oklch(0.7 0.02 260)") + "1a" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: isSupabaseConfigured ? "oklch(0.82 0.18 150)" : "oklch(0.7 0.02 260)" }} />
              {isSupabaseConfigured ? "Supabase connected" : "Local (localStorage)"}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{isSupabaseConfigured ? "Data syncs to your Supabase project." : "Add VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY to .env, run the migration in supabase/migrations, and reload to go cloud-backed."}</p>
        </SpotlightCard>

        <SpotlightCard className="col-span-12 md:col-span-6 p-6" spotlight={false}>
          <div className="text-sm font-semibold">Security & data</div>
          <div className="mt-4 flex flex-col gap-2">
            <button onClick={lock} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm hover:bg-white/5">
              {isSupabaseConfigured ? <><LogOut className="h-4 w-4" /> Sign out</> : <><Lock className="h-4 w-4" /> Lock app (require password)</>}
            </button>
            <button onClick={resetOS} className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.7_0.2_20)]/40 px-4 py-2.5 text-sm text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10"><Trash2 className="h-4 w-4" /> Reset everything (local + cloud)</button>
          </div>
        </SpotlightCard>
      </section>
    </AppShell>
  );
}
