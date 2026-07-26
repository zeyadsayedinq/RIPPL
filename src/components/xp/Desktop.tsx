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
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F4FA8" />
          <stop offset="38%" stopColor="#4A8FD8" />
          <stop offset="72%" stopColor="#8FC4EC" />
          <stop offset="100%" stopColor="#C8E4F5" />
        </linearGradient>
        <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8FC33A" />
          <stop offset="35%" stopColor="#6FAE28" />
          <stop offset="100%" stopColor="#3E7A14" />
        </linearGradient>
        <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A5D24C" />
          <stop offset="100%" stopColor="#5C9A1E" />
        </linearGradient>
        <radialGradient id="cloud" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity=".95" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="1000" fill="url(#sky)" />
      <ellipse cx="330" cy="210" rx="240" ry="72" fill="url(#cloud)" />
      <ellipse cx="450" cy="180" rx="150" ry="52" fill="url(#cloud)" />
      <ellipse cx="1180" cy="150" rx="270" ry="66" fill="url(#cloud)" />
      <ellipse cx="1020" cy="196" rx="170" ry="44" fill="url(#cloud)" />
      <ellipse cx="760" cy="300" rx="320" ry="54" fill="url(#cloud)" opacity=".55" />

      <path d="M0 700 C 260 560, 620 542, 900 616 C 1180 690, 1400 706, 1600 660 L1600 1000 L0 1000 Z" fill="url(#hill2)" />
      <path d="M0 786 C 300 636, 700 610, 1030 700 C 1290 770, 1450 790, 1600 764 L1600 1000 L0 1000 Z" fill="url(#hill)" />
      <path d="M0 786 C 300 636, 700 610, 1030 700" fill="none" stroke="#B6E06A" strokeWidth="3" opacity=".45" />
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
