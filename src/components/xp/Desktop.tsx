import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useWindows, type AppId } from "@/lib/window-store";
import { XPIcon } from "./XPIcon";
import { TASKBAR_H } from "./XPWindow";

/* Bliss, rebuilt in SVG — no binary asset, scales to any viewport, and
   the whole thing is ~1KB. */
function Bliss() {
  return (
    <svg
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
      viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
    >
      <defs>
        {/* Deep at the zenith, almost white at the horizon — the sky is most
            of what makes Bliss recognisable, so the falloff matters more than
            the hill does. */}
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1053A8" />
          <stop offset="22%" stopColor="#2E76C4" />
          <stop offset="48%" stopColor="#61A5DF" />
          <stop offset="74%" stopColor="#9FCDEE" />
          <stop offset="100%" stopColor="#DCEDF8" />
        </linearGradient>
        <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ACB3C" />
          <stop offset="22%" stopColor="#7DB92C" />
          <stop offset="60%" stopColor="#5A9C1C" />
          <stop offset="100%" stopColor="#3A7310" />
        </linearGradient>
        <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B4DC5E" />
          <stop offset="100%" stopColor="#69A824" />
        </linearGradient>
        <radialGradient id="cloud" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".95" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#sky)" />

      {/* Cumulus banks. Bliss has a dense cluster low-right and wispier,
          flatter cloud running along the horizon — layered ellipses at
          different opacities read closer than a few big even blobs. */}
      <g>
        <ellipse cx="1240" cy="150" rx="300" ry="78" fill="url(#cloud)" />
        <ellipse cx="1130" cy="196" rx="210" ry="58" fill="url(#cloud)" opacity=".85" />
        <ellipse cx="1380" cy="205" rx="190" ry="48" fill="url(#cloud)" opacity=".7" />
        <ellipse cx="1290" cy="255" rx="260" ry="40" fill="url(#cloud)" opacity=".5" />

        <ellipse cx="300" cy="196" rx="230" ry="60" fill="url(#cloud)" opacity=".8" />
        <ellipse cx="430" cy="164" rx="140" ry="44" fill="url(#cloud)" opacity=".7" />
        <ellipse cx="150" cy="238" rx="180" ry="38" fill="url(#cloud)" opacity=".5" />

        {/* thin haze sitting just above the horizon */}
        <ellipse cx="700" cy="392" rx="520" ry="30" fill="url(#cloud)" opacity=".45" />
        <ellipse cx="1150" cy="410" rx="420" ry="24" fill="url(#cloud)" opacity=".35" />
        <ellipse cx="260" cy="404" rx="360" ry="22" fill="url(#cloud)" opacity=".3" />
      </g>

      {/* The hill: one broad mound cresting left-of-centre and falling away
          to the right, the way the photograph reads. The far ridge behind it
          gives the horizon depth. */}
      <path
        d="M0 556 C 220 476, 520 452, 830 508 C 1120 560, 1360 578, 1600 552 L1600 1000 L0 1000 Z"
        fill="url(#hill2)"
      />
      <path
        d="M0 640 C 280 500, 640 470, 980 560 C 1250 630, 1430 664, 1600 640 L1600 1000 L0 1000 Z"
        fill="url(#hill)"
      />
      {/* sunlit crest — the bright rim along the top of the near hill */}
      <path
        d="M0 640 C 280 500, 640 470, 980 560 C 1250 630, 1430 664, 1600 640"
        fill="none"
        stroke="#C4E87A"
        strokeWidth="5"
        opacity=".55"
      />
      {/* soft shadow in the trough, bottom-left */}
      <ellipse cx="240" cy="1000" rx="720" ry="230" fill="#2F6410" opacity=".35" />
    </svg>
  );
}

interface DeskIcon { icon: string; label: string; to?: string; app?: AppId }

const ICONS: DeskIcon[] = [
  { icon: "computer", label: "My Computer", app: "mycomputer" },
  { icon: "bin", label: "Recycle Bin", app: "recyclebin" },
  { icon: "chart", label: "Campaign Command", to: "/dashboard" },
  { icon: "user", label: "Roster", to: "/roster" },
  { icon: "folder", label: "The Vault", to: "/vault" },
  { icon: "wmp", label: "Releases", to: "/releases" },
  { icon: "taskmgr", label: "Task Manager", app: "taskmgr" },
  { icon: "controlpanel", label: "Control Panel", to: "/settings" },
];

export function Desktop() {
  const navigate = useNavigate();
  const { open, focusRoute } = useWindows();
  const [sel, setSel] = useState<string | null>(null);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(null);
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [menu]);

  const launch = (i: DeskIcon) => {
    if (i.app) open(i.app);
    else if (i.to) { navigate({ to: i.to }); focusRoute(); }
  };

  return (
    <div
      className="xp-chrome"
      onPointerDown={() => setSel(null)}
      onContextMenu={(e) => { e.preventDefault(); setMenu({ x: e.clientX, y: e.clientY }); }}
      style={{ position: "fixed", inset: 0, bottom: TASKBAR_H, zIndex: 0, overflow: "hidden" }}
    >
      <Bliss />

      <div style={{
        position: "relative", zIndex: 1, display: "grid",
        gridTemplateColumns: "76px", gap: 4, padding: "8px 6px",
        gridAutoRows: "min-content",
      }}>
        {ICONS.map((i) => (
          <button
            key={i.label}
            className="xp-chrome xp-nobtn"
            onPointerDown={(e) => { e.stopPropagation(); setSel(i.label); }}
            onDoubleClick={() => launch(i)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              background: "transparent", border: "none", cursor: "default", padding: "3px 1px",
            }}
          >
            <span style={{
              filter: sel === i.label ? "drop-shadow(0 0 1px #316AC5)" : "none",
              opacity: sel === i.label ? .78 : 1,
            }}>
              <XPIcon name={i.icon} size={36} />
            </span>
            <span style={{
              fontSize: 11, color: "#fff", textAlign: "center", lineHeight: 1.2,
              textShadow: sel === i.label ? "none" : "1px 1px 2px rgba(0,0,0,.85)",
              background: sel === i.label ? "#316AC5" : "transparent",
              padding: "0 2px", wordBreak: "break-word",
            }}>
              {i.label}
            </span>
          </button>
        ))}
      </div>

      {menu && <DesktopMenu x={menu.x} y={menu.y} onClose={() => setMenu(null)} />}
    </div>
  );
}

/* The old QuickActionFAB, re-housed where XP would put it. */
function DesktopMenu({ x, y, onClose }: { x: number; y: number; onClose: () => void }) {
  const navigate = useNavigate();
  const { setSkin, open } = useWindows();
  const [sub, setSub] = useState(false);

  const item = (label: string, fn?: () => void, arrow?: boolean, dim?: boolean) => (
    <div
      key={label}
      onClick={() => { if (!dim && fn) { fn(); onClose(); } }}
      onMouseEnter={(e) => {
        if (dim) return;
        (e.currentTarget as HTMLElement).style.background = "#316AC5";
        (e.currentTarget as HTMLElement).style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "transparent";
        (e.currentTarget as HTMLElement).style.color = dim ? "#ACA899" : "#000";
      }}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "3px 22px 3px 24px", cursor: "default",
        color: dim ? "#ACA899" : "#000", fontSize: 12,
      }}
    >
      {label}{arrow && <span style={{ fontSize: 9 }}>▶</span>}
    </div>
  );

  return (
    <div
      onPointerDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        position: "fixed", left: x, top: y, zIndex: 9200, width: 186,
        background: "#fff", border: "1px solid #ACA899",
        boxShadow: "2px 2px 5px rgba(0,0,0,.35)", padding: "2px 0",
        fontFamily: 'Tahoma, "Segoe UI", sans-serif',
      }}
    >
      {item("Arrange Icons By", undefined, true, true)}
      {item("Refresh", () => window.location.reload())}
      <Sep />
      <div onMouseEnter={() => setSub(true)} onMouseLeave={() => setSub(false)} style={{ position: "relative" }}>
        {item("New", undefined, true)}
        {sub && (
          <div style={{
            position: "absolute", left: "100%", top: 0, width: 178, background: "#fff",
            border: "1px solid #ACA899", boxShadow: "2px 2px 5px rgba(0,0,0,.35)", padding: "2px 0",
          }}>
            {item("Campaign", () => navigate({ to: "/campaigns" }))}
            {item("Release", () => navigate({ to: "/releases" }))}
            {item("Artist", () => navigate({ to: "/roster" }))}
            {item("Task", () => navigate({ to: "/tasks" }))}
            <Sep />
            {item("Text Document", () => open("notepad"))}
          </div>
        )}
      </div>
      <Sep />
      {item("Properties", () => setSkin("neon"))}
    </div>
  );
}

const Sep = () => <div style={{ height: 1, background: "#D6D3C4", margin: "3px 2px" }} />;
