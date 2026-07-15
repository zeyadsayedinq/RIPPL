import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/* Real Supabase Auth gate (email + password accounts).
   Only mounted when Supabase is configured. While there's no session it
   shows the login/sign-up screen; once signed in it renders the app. */

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
  const [mode, setMode] = useState<"in" | "up">("in");
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
        if (error) throw error;
        // onAuthStateChange in the gate will render the app
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (!data.session) setInfo("Account created. Check your email to confirm, then sign in.");
      }
    } catch (err: any) {
      setError((err?.message || "Something went wrong").toString());
      setTimeout(() => setError(""), 2500);
    } finally {
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
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/40">RIPPL // {mode === "in" ? "ACCESS" : "REGISTER"}</div>
        <h1 className="mt-2 text-xl font-bold tracking-tight text-white">{mode === "in" ? "Sign in" : "Create account"}</h1>

        <input
          type="email" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"
          className="mt-6 w-full border-0 border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/70"
        />
        <input
          type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password (min 6)"
          className="mt-4 w-full border-0 border-b border-white/20 bg-transparent px-1 py-2 text-sm tracking-[0.15em] text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/70"
        />

        <div className="mt-3 min-h-4 text-center text-xs">
          {error && <span className="tracking-[0.15em] text-[oklch(0.7_0.22_20)] [text-shadow:0_0_12px_oklch(0.7_0.22_20)]">ACCESS DENIED — {error}</span>}
          {info && <span className="text-[oklch(0.82_0.18_150)]">{info}</span>}
        </div>

        <button
          type="submit" disabled={busy}
          className="mt-4 w-full rounded-lg border border-white/20 bg-white/5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all hover:border-white/60 hover:bg-white hover:text-black disabled:opacity-50"
        >
          {busy ? "…" : mode === "in" ? "Enter" : "Register"}
        </button>

        <button type="button" onClick={() => { setMode(mode === "in" ? "up" : "in"); setError(""); setInfo(""); }} className="mt-4 w-full text-center text-[11px] tracking-wider text-white/40 hover:text-white/70">
          {mode === "in" ? "Need an account? Register" : "Have an account? Sign in"}
        </button>
      </motion.form>
    </div>
  );
}
