import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

/* Simple client-side master-password gate.
   NOTE: this is a UI lock for a private tool, not real security — the
   bundle still ships to the browser. For true protection, move the check
   to a server route / real auth. Matches the "single hardcoded password,
   no complex auth" requirement. */

const MASTER = "FUKmusic";
const LS_KEY = "rippl.unlocked.v1";

export function PasswordGate({ children }: { children: ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try { setUnlocked(window.localStorage.getItem(LS_KEY) === "1"); } catch { /* ignore */ }
    setChecked(true);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (value === MASTER) {
      try { window.localStorage.setItem(LS_KEY, "1"); } catch { /* ignore */ }
      setUnlocked(true);
    } else {
      setError(true);
      setValue("");
      setTimeout(() => setError(false), 500);
    }
  }

  // Until we've read localStorage (and on the server), render a black screen
  // so the app never flashes before the gate.
  if (!checked) return <div className="min-h-screen bg-black" />;
  if (unlocked) return <>{children}</>;

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-black px-4 font-mono">
      {/* subtle ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.06 300) 0%, transparent 65%)" }} />

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className={`relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm ${error ? "animate-shake" : ""}`}
      >
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/40">RIPPL // SYSTEM_LOCKED</div>
        <h1 className="mt-2 text-xl font-bold tracking-tight text-white">Enter master key</h1>

        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="••••••••"
          className="mt-6 w-full border-0 border-b border-white/20 bg-transparent px-1 py-2 text-center text-lg tracking-[0.3em] text-white outline-none transition-colors placeholder:text-white/20 focus:border-white/70"
        />

        <div className="mt-3 h-4 text-center">
          {error && <span className="text-xs tracking-[0.2em] text-[oklch(0.7_0.22_20)] [text-shadow:0_0_12px_oklch(0.7_0.22_20)]">ACCESS DENIED</span>}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg border border-white/20 bg-white/5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all hover:border-white/60 hover:bg-white hover:text-black"
        >
          Enter
        </button>
        <p className="mt-4 text-center text-[10px] tracking-wider text-white/25">Authorized access only</p>
      </motion.form>
    </div>
  );
}
