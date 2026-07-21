import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/* Real Supabase Auth gate (email + password, or Google OAuth).
   Only mounted when Supabase is configured. While there's no session it
   shows the sign-in screen; once signed in it renders the app.

   Deliberately invite-only: there is NO public self-registration form.
   RIPPL is a controlled team workspace — HQ adds people from Admin →
   Add member (collects their full name, sets their role, and sends a
   real Supabase invite email), and that invite link signs them straight
   in. Letting anyone type an email into a public "Register" button:
     (a) had no relationship to HQ's member/role model — a self-registered
         account got an empty personal workspace with zero assigned data,
     (b) went through Supabase's default signUp() confirmation email,
         which shares the same low per-project rate limit as every other
         auth email on the built-in mailer — the actual cause of invites
         and confirmations silently not arriving. See Settings → Backend
         for the "Run diagnostics" check, and set up a custom SMTP
         provider in Supabase → Authentication → Emails for reliable
         delivery at any real scale. */

export function SupabaseAuthGate({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) return <div className="min-h-screen bg-black" />;
  if (!session) return <AuthScreen />;
  return <>{children}</>;
}

function AuthScreen() {
  const [mode, setMode] = useState<"in" | "reset">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true); setError(""); setInfo("");
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          // Supabase returns the same generic "Invalid login credentials" whether
          // the account doesn't exist or the password is wrong — nudge toward the
          // actual fix (an invite from HQ) instead of a dead-end error.
          if (/invalid login credentials/i.test(error.message)) {
            throw new Error("No matching account, or wrong password. New here? Ask your HQ admin to invite you — self-registration isn't available.");
          }
          throw error;
        }
        // onAuthStateChange in the gate will render the app
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/home` });
        if (error) throw error;
        setInfo("If that email has an account, a reset link is on its way.");
      }
    } catch (err: any) {
      setError((err?.message || "Something went wrong").toString());
      setTimeout(() => setError(""), 4000);
    } finally {
      setBusy(false);
    }
  }

  // Runs client-side, so window.location.origin is always the domain the
  // person is actually on (localhost in dev, the real deployment in prod) —
  // unlike the server-side invite email flow, this doesn't need VITE_APP_URL.
  // Google must still be enabled + configured in Supabase Dashboard →
  // Authentication → Providers, and this origin must be in Authentication →
  // URL Configuration → Redirect URLs (same allow-list the invite flow uses).
  async function submitGoogle() {
    if (!supabase) return;
    setBusy(true); setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/home` },
    });
    // On success the browser navigates away to Google, so there's nothing
    // else to do here; only reachable on failure (e.g. provider not enabled).
    if (error) {
      setError((error.message || "Something went wrong").toString());
      setTimeout(() => setError(""), 4000);
      setBusy(false);
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-black px-4 font-mono">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.06 300) 0%, transparent 65%)" }} />

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className={`relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm ${error ? "animate-shake" : ""}`}
      >
        <svg width="40" height="40" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
          <rect width="180" height="180" rx="40" fill="#0a0a0c" />
          <circle cx="46" cy="134" r="12" fill="white" />
          <path d="M 46 96 A 38 38 0 0 1 84 134" stroke="white" strokeWidth="11" strokeLinecap="round" />
          <path d="M 46 62 A 72 72 0 0 1 118 134" stroke="white" strokeWidth="9.5" strokeLinecap="round" opacity="0.62" />
          <path d="M 46 28 A 106 106 0 0 1 152 134" stroke="white" strokeWidth="8.5" strokeLinecap="round" opacity="0.34" />
        </svg>
        <div className="mt-4 text-[11px] uppercase tracking-[0.4em] text-white/40">RIPPL // {mode === "in" ? "ACCESS" : "RESET"}</div>
        <h1 className="mt-2 text-xl font-bold tracking-tight text-white">{mode === "in" ? "Sign in" : "Reset password"}</h1>
        {mode === "reset" && <p className="mt-1 text-xs text-white/40">Enter the email your account is under — we'll send a reset link.</p>}

        <input
          type="email" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"
          className="mt-6 w-full border-0 border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/70"
        />
        {mode === "in" && (
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"
            className="mt-4 w-full border-0 border-b border-white/20 bg-transparent px-1 py-2 text-sm tracking-[0.15em] text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/70"
          />
        )}

        <div className="mt-3 min-h-4 text-center text-xs">
          {error && <span className="tracking-[0.15em] text-[oklch(0.7_0.22_20)] [text-shadow:0_0_12px_oklch(0.7_0.22_20)]">{error}</span>}
          {info && <span className="text-[oklch(0.82_0.18_150)]">{info}</span>}
        </div>

        <button
          type="submit" disabled={busy}
          className="mt-4 w-full rounded-lg border border-white/20 bg-white/5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all hover:border-white/60 hover:bg-white hover:text-black disabled:opacity-50"
        >
          {busy ? "…" : mode === "in" ? "Enter" : "Send reset link"}
        </button>

        {mode === "in" && (
          <div className="mt-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/25">
            <div className="h-px flex-1 bg-white/10" /> or <div className="h-px flex-1 bg-white/10" />
          </div>
        )}

        {mode === "in" && (
          <button
            type="button" onClick={submitGoogle} disabled={busy}
            className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-lg border border-white/20 bg-white/5 py-2.5 text-sm font-medium text-white transition-all hover:border-white/60 hover:bg-white/10 disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.28-1.93-6.14-4.53H2.18v2.85A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.86 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9l3.68-2.85z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.68 2.85C6.72 7.3 9.14 5.38 12 5.38z" />
            </svg>
            Continue with Google
          </button>
        )}

        <button
          type="button"
          onClick={() => { setMode(mode === "in" ? "reset" : "in"); setError(""); setInfo(""); setPassword(""); }}
          className="mt-4 w-full text-center text-[11px] tracking-wider text-white/40 hover:text-white/70"
        >
          {mode === "in" ? "Forgot password?" : "Back to sign in"}
        </button>

        {mode === "in" && <p className="mt-3 text-center text-[10px] leading-relaxed text-white/25">No account? Ask your HQ admin to invite you from Admin → Add member.</p>}
      </motion.form>
    </div>
  );
}
