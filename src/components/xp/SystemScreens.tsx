import { useEffect, useState } from "react";
import { useWindows } from "@/lib/window-store";

/* ── Boot ──────────────────────────────────────────────────────────
   BIOS post → XP splash with the marching loader → hand off to the
   desktop. Runs once per tab (sessionStorage), so refreshing while
   working doesn't cost you five seconds every time. */

const BOOT_KEY = "rippl.xp.booted";

export function BootScreen() {
  const { setPhase } = useWindows();
  const [stage, setStage] = useState<"bios" | "splash">("bios");

  useEffect(() => {
    let skip = false;
    try { skip = window.sessionStorage.getItem(BOOT_KEY) === "1"; } catch { /* ignore */ }
    if (skip) { setPhase("ready"); return; }

    const a = setTimeout(() => setStage("splash"), 1400);
    const b = setTimeout(() => {
      try { window.sessionStorage.setItem(BOOT_KEY, "1"); } catch { /* ignore */ }
      setPhase("ready");
    }, 4200);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [setPhase]);

  const skipNow = () => {
    try { window.sessionStorage.setItem(BOOT_KEY, "1"); } catch { /* ignore */ }
    setPhase("ready");
  };

  return (
    <div
      className="xp-chrome"
      onClick={skipNow}
      style={{
        position: "fixed", inset: 0, zIndex: 99999, background: "#000",
        color: "#C8C8C8", fontFamily: '"Lucida Console","Courier New",monospace',
        fontSize: 13, padding: 24, cursor: "pointer", overflow: "hidden",
      }}
    >
      {stage === "bios" ? (
        <pre style={{ margin: 0, lineHeight: 1.55 }}>{`RIPPL BIOS v4.51PG · Zeyad Systems Inc.

Main Processor      : Opus 5 High
Memory Testing      : 262144K OK

Detecting Primary Master   ... RIPPL_OS
Detecting Primary Slave    ... THE_VAULT
Detecting Secondary Master ... CAMPAIGN_COMMAND

Press DEL to enter SETUP`}</pre>
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Tahoma, sans-serif", color: "#fff", fontSize: 15, letterSpacing: 1 }}>
              <span style={{ opacity: .55, fontSize: 12 }}>Zeyad Systems</span>
              <div style={{ fontSize: 40, fontWeight: "bold", marginTop: 2 }}>
                RIPPL<span style={{ color: "#F0A30A", fontWeight: "normal" }}>XP</span>
              </div>
              <div style={{ opacity: .6, fontSize: 12, marginTop: 4 }}>Professional Edition</div>
            </div>

            <div style={{
              width: 168, height: 16, margin: "34px auto 0", border: "1px solid #6A6A6A",
              borderRadius: 3, padding: 2, display: "flex", overflow: "hidden",
            }}>
              <div className="xp-boot-bar" style={{ display: "flex", gap: 3 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: 14, height: 10, background: "#2E6BD6", borderRadius: 1 }} />
                ))}
              </div>
            </div>
            <div style={{ marginTop: 26, fontSize: 11, opacity: .4, fontFamily: "Tahoma, sans-serif" }}>
              click anywhere to skip
            </div>
          </div>

          <style>{`
            @keyframes xpboot { 0% { transform: translateX(-58px); } 100% { transform: translateX(172px); } }
            .xp-boot-bar { animation: xpboot 1.9s linear infinite; }
          `}</style>
        </div>
      )}
    </div>
  );
}

/* ── Shutdown ─────────────────────────────────────────────────────── */

export function ShutdownScreen() {
  const { setPhase } = useWindows();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (done) {
    return (
      <div
        className="xp-chrome"
        onClick={() => {
          try { window.sessionStorage.removeItem(BOOT_KEY); } catch { /* ignore */ }
          setPhase("boot");
        }}
        style={{
          position: "fixed", inset: 0, zIndex: 99999, background: "#000", color: "#8A8A8A",
          display: "grid", placeItems: "center", cursor: "pointer",
          fontFamily: "Tahoma, sans-serif", fontSize: 13,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 15, color: "#C8C8C8" }}>It is now safe to turn off your computer.</div>
          <div style={{ marginTop: 14, fontSize: 11, opacity: .5 }}>click to power on</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="xp-chrome"
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        background: "linear-gradient(180deg,#1F4FA8 0%,#4A8FD8 55%,#8FC4EC 100%)",
        display: "grid", placeItems: "center", fontFamily: "Tahoma, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", color: "#fff", textShadow: "1px 1px 3px rgba(0,0,0,.45)" }}>
        <div style={{ fontSize: 30, fontWeight: "bold" }}>
          RIPPL<span style={{ color: "#F0A30A", fontWeight: "normal" }}>XP</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 14 }}>Saving your settings...</div>
      </div>
    </div>
  );
}

/* ── Blue Screen of Death ─────────────────────────────────────────── */

export function BSOD({ error, onReset }: { error: Error; onReset?: () => void }) {
  const code = "0x0000007B";
  return (
    <div
      className="xp-chrome"
      onClick={onReset}
      style={{
        position: "fixed", inset: 0, zIndex: 99999, background: "#0000AA", color: "#fff",
        fontFamily: '"Lucida Console","Courier New",monospace', fontSize: 14,
        padding: "8vh 8vw", lineHeight: 1.6, cursor: onReset ? "pointer" : "default",
        overflow: "auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 26 }}>
        <span style={{ background: "#C8C8C8", color: "#0000AA", padding: "0 10px" }}>RIPPL</span>
      </div>

      <p>A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>
      <p style={{ marginTop: 18, wordBreak: "break-word" }}>
        {(error?.message || "UNEXPECTED_KERNEL_MODE_TRAP").toUpperCase().slice(0, 120)}
      </p>
      <p style={{ marginTop: 18 }}>
        If this is the first time you've seen this Stop error screen, restart your computer. If this screen
        appears again, follow these steps:
      </p>
      <p style={{ marginTop: 18 }}>
        Check to make sure any new hardware or software is properly installed. Disable BIOS memory options
        such as caching or shadowing. If you need to use Safe Mode, restart your computer and press F8.
      </p>
      <p style={{ marginTop: 18 }}>Technical information:</p>
      <p style={{ marginTop: 8 }}>*** STOP: {code} (0xF7B6D528, 0xC0000034, 0x00000000, 0x00000000)</p>
      <p style={{ marginTop: 18, opacity: .85, fontSize: 12, whiteSpace: "pre-wrap" }}>
        {(error?.stack || "").split("\n").slice(0, 4).join("\n")}
      </p>
      <p style={{ marginTop: 28 }}>Beginning dump of physical memory</p>
      <p>Physical memory dump complete.</p>
      <p style={{ marginTop: 18 }}>Contact your system administrator or technical support group for further assistance.</p>
      {onReset && <p style={{ marginTop: 26, opacity: .7, fontSize: 12 }}>Click anywhere to restart.</p>}
    </div>
  );
}

/* ── Mobile gag ───────────────────────────────────────────────────── */

export function MobileGate({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      className="xp-chrome"
      style={{
        position: "fixed", inset: 0, zIndex: 99998,
        background: "linear-gradient(180deg,#1F4FA8 0%,#4A8FD8 60%,#8FC4EC 100%)",
        display: "grid", placeItems: "center", padding: 18,
        fontFamily: 'Tahoma, "Segoe UI", sans-serif',
      }}
    >
      <div style={{
        width: "100%", maxWidth: 330, background: "#ECE9D8",
        border: "1px solid #0831D9", borderTop: "none", borderRadius: "8px 8px 0 0",
        boxShadow: "3px 3px 12px rgba(0,0,0,.45)", overflow: "hidden",
      }}>
        <div style={{
          height: 28, display: "flex", alignItems: "center", gap: 5, padding: "0 6px",
          background: "linear-gradient(180deg,#0058EE 0%,#3F8CF3 8%,#1868E0 40%,#0F5BD8 88%,#3F8CF3 100%)",
          borderRadius: "7px 7px 0 0",
        }}>
          <span style={{ color: "#fff", fontSize: 12, fontWeight: "bold", textShadow: "1px 1px 1px rgba(0,0,0,.5)" }}>
            RIPPL XP
          </span>
        </div>

        <div style={{ display: "flex", gap: 12, padding: "18px 16px" }}>
          <svg width="34" height="34" viewBox="0 0 32 32" style={{ flex: "0 0 34px" }} aria-hidden="true">
            <circle cx="16" cy="16" r="13" fill="#C4402A" stroke="#8A2A18" strokeWidth="2" />
            <path d="M10 10l12 12M22 10L10 22" stroke="#fff" strokeWidth="3.5" />
          </svg>
          <div style={{ fontSize: 12, color: "#000", lineHeight: 1.55 }}>
            <p style={{ margin: 0 }}>
              This program requires a minimum display resolution of <b>800 &times; 600</b>.
            </p>
            <p style={{ margin: "10px 0 0", color: "#4A4A42" }}>
              Windows XP shipped two years before the first iPhone. It is not going to be responsive
              about this.
            </p>
          </div>
        </div>

        <div style={{
          display: "flex", justifyContent: "flex-end", gap: 8, padding: "0 14px 16px",
        }}>
          <button onClick={onDismiss} style={xpBtn}>Continue anyway</button>
        </div>
      </div>
    </div>
  );
}

const xpBtn: React.CSSProperties = {
  background: "linear-gradient(180deg,#fdfdfc 0%,#ece9d8 45%,#d9d5c5 100%)",
  border: "1px solid #ACA899", borderRadius: 3, padding: "4px 14px",
  fontSize: 12, fontFamily: "Tahoma, sans-serif", color: "#000", cursor: "pointer",
  boxShadow: "inset 0 0 0 1px #fff",
};
