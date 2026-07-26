import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useWindowsOptional } from "@/lib/window-store";
import { XPIcon } from "@/components/xp/XPIcon";

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
  const xp = useWindowsOptional()?.skin === "xp";

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

  if (xp) {
    /* The XP Welcome screen: split panel, user tile, password box with the
       green go arrow. Same MASTER check, same localStorage key. */
    return (
      <div
        className="xp-chrome"
        style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          background: "linear-gradient(180deg,#0A246A 0%,#3A6EA5 30%,#5A8FD0 50%,#3A6EA5 70%,#0A246A 100%)",
          fontFamily: 'Tahoma, "Segoe UI", sans-serif', color: "#fff",
        }}
      >
        <div style={{ height: 4, background: "linear-gradient(90deg,#F0A30A,#E85A20)" }} />

        <div style={{
          flex: 1, display: "grid", gridTemplateColumns: "1fr 1px 1fr",
          alignItems: "center", gap: 30, padding: "24px 6vw",
        }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 42, fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,.4)" }}>
              RIPPL<span style={{ color: "#F0A30A", fontWeight: "normal" }}>XP</span>
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 13, opacity: .85 }}>
              To begin, enter the master key
            </p>
          </div>

          <div style={{ background: "rgba(255,255,255,.35)", height: "62%", minHeight: 150 }} />

          <form onSubmit={submit} className={error ? "animate-shake" : ""} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 62, height: 62, border: "2px solid #fff", borderRadius: 4, background: "#8FB0EA", display: "grid", placeItems: "center", flex: "0 0 62px" }}>
              <XPIcon name="user" size={46} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 17, textShadow: "1px 1px 2px rgba(0,0,0,.4)" }}>Zeyad</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 5 }}>
                <input
                  type="password" autoFocus value={value}
                  onChange={(e) => setValue(e.target.value)}
                  aria-label="Master key"
                  style={{ width: 132, padding: "3px 6px", fontSize: 13 }}
                />
                <button
                  type="submit" aria-label="Log on" className="xp-chrome xp-nobtn"
                  style={{
                    width: 24, height: 24, borderRadius: 9999, border: "1px solid #2A6B18",
                    background: "radial-gradient(circle at 35% 30%,#7BD44A,#3C9B26 70%)",
                    color: "#fff", cursor: "pointer", padding: 0, fontSize: 13, lineHeight: 1,
                  }}
                >
                  ▸
                </button>
              </div>
              <div style={{ height: 16, marginTop: 4 }}>
                {error && <span style={{ fontSize: 11, color: "#FFD0C8" }}>Did you forget your password?</span>}
              </div>
            </div>
          </form>
        </div>

        <div style={{ height: 4, background: "linear-gradient(90deg,#E85A20,#F0A30A)" }} />
        <div style={{
          background: "#0A246A", padding: "10px 6vw", fontSize: 11, opacity: .8,
          display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
        }}>
          <span>After you log on, you can add or change accounts.</span>
          <span>Just go to Control Panel and click User Accounts.</span>
        </div>
      </div>
    );
  }

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
