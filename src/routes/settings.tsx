import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useRole, type Role } from "@/lib/role-context";
import { useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { clearEverything, diagnose, type Diag } from "@/lib/cloud";
import { Lock, Trash2, ShieldCheck, Database, LogOut, Check, Minus, X } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · RIPPL OS" }] }),
  component: SettingsPage,
});

const roles: Role[] = ["Marketing Manager", "Team Member", "Client"];

type PermKey = "pricing" | "edit" | "approve" | "export";
const PERM_KEYS: { key: PermKey; label: string }[] = [
  { key: "pricing", label: "Pricing & financials" },
  { key: "edit", label: "Edit content" },
  { key: "approve", label: "Approve / sign off" },
  { key: "export", label: "Export & reports" },
];
const PERMS: Record<Role, { blurb: string; perms: Record<PermKey, boolean> }> = {
  "Marketing Manager": { blurb: "Full access — owner view of budgets, deals and approvals.", perms: { pricing: true, edit: true, approve: true, export: true } },
  "Team Member": { blurb: "Can build and edit, but financials stay hidden.", perms: { pricing: false, edit: true, approve: false, export: true } },
  "Client": { blurb: "Read-only presentation view — no prices, no edits.", perms: { pricing: false, edit: false, approve: false, export: true } },
};

function DiagRow({ label, ok, note }: { label: string; ok: boolean; note: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5 font-mono" style={{ color: ok ? "oklch(0.85 0.18 150)" : "oklch(0.75 0.2 20)" }}>
        {note}{ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
      </span>
    </div>
  );
}

function SettingsPage() {
  const { role, setRole } = useRole();
  const [diag, setDiag] = useState<Diag | null>(null);
  const [diagBusy, setDiagBusy] = useState(false);
  async function runDiag() { setDiagBusy(true); setDiag(await diagnose()); setDiagBusy(false); }
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
        <SpotlightCard className="col-span-12 p-6" spotlight={false}>
          <div className="flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-4 w-4 text-white/50" /> Access control</div>
          <p className="mt-1 text-xs text-muted-foreground">Choose who's viewing. Each role sees a different slice of pricing, editing, approvals and exports.</p>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            {roles.map((r) => {
              const on = r === role;
              const p = PERMS[r];
              return (
                <button key={r} onClick={() => setRole(r)} className={`rounded-2xl border p-4 text-left transition-colors ${on ? "border-white bg-white/[0.06]" : "border-white/10 hover:border-white/30"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{r}</span>
                    {on && <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">Active</span>}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{p.blurb}</p>
                  <div className="mt-3 space-y-1.5">
                    {PERM_KEYS.map((k) => (
                      <div key={k.key} className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">{k.label}</span>
                        {p.perms[k.key]
                          ? <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[oklch(0.82_0.18_150)]/20 text-[oklch(0.85_0.18_150)]"><Check className="h-3 w-3" /></span>
                          : <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/5 text-white/30"><Minus className="h-3 w-3" /></span>}
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
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
          <p className="mt-2 text-xs text-muted-foreground">{isSupabaseConfigured ? "Data should sync to your Supabase project. Run diagnostics to confirm." : "Env vars missing in THIS build. Add VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables, then Redeploy."}</p>

          <button onClick={runDiag} disabled={diagBusy} className="glass mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/5 disabled:opacity-50">
            {diagBusy ? "Testing…" : "Run diagnostics"}
          </button>
          {diag && (
            <div className="mt-4 space-y-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs">
              <DiagRow label="Env vars present (VITE_…)" ok={diag.configured} note={diag.url ? diag.url : "missing"} />
              <DiagRow label="Signed in to Supabase" ok={diag.signedIn} note={diag.email || "no session"} />
              <DiagRow label="Can write to database (app_state)" ok={diag.canWrite} note={diag.canWrite ? "sync working ✓" : "blocked"} />
              {diag.error && <div className="mt-2 rounded-lg bg-[oklch(0.7_0.2_20)]/10 p-2 text-[oklch(0.8_0.2_20)]">{diag.error}</div>}
            </div>
          )}
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
