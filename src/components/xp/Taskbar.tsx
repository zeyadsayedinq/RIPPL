import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useWindows } from "@/lib/window-store";
import { windowTitleFor } from "@/lib/nav";
import { XPIcon } from "./XPIcon";
import { StartMenu } from "./StartMenu";
import { TASKBAR_H } from "./XPWindow";

export function Taskbar() {
  const [startOpen, setStartOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const {
    windows, focusedId, routeMin, focus, minimize, focusRoute, minimizeRoute,
    open, minimizeAll,
  } = useWindows();

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!startOpen) return;
    const close = () => setStartOpen(false);
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [startOpen]);

  const route = windowTitleFor(pathname);
  const routeActive = focusedId === null && !routeMin;
  /* Minimised windows keep their taskbar button — that's how you get them
     back. The button just renders un-pressed. */
  const visible = windows;

  return (
    <>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}

      <div
        className="xp-chrome"
        style={{
          position: "fixed", left: 0, right: 0, bottom: 0, height: TASKBAR_H, zIndex: 9500,
          display: "flex", alignItems: "stretch",
          background: "linear-gradient(180deg,#2E5EDB 0%,#3D7BE8 8%,#245EDB 42%,#1F55CE 88%,#3F8CF3 100%)",
          borderTop: "1px solid #4A85E8",
          fontFamily: 'Tahoma, "Segoe UI", sans-serif', fontSize: 12,
          userSelect: "none",
        }}
      >
        {/* Start button */}
        <button
          className="xp-chrome xp-nobtn"
          onPointerDown={(e) => { e.stopPropagation(); setStartOpen((o) => !o); }}
          style={{
            display: "flex", alignItems: "center", gap: 5, padding: "0 22px 0 8px",
            border: "none", cursor: "default", color: "#fff",
            fontSize: 15, fontStyle: "italic", fontWeight: "bold",
            textShadow: "1px 1px 2px rgba(0,0,0,.5)",
            borderRadius: "0 10px 10px 0",
            background: startOpen
              ? "linear-gradient(180deg,#2E7A18 0%,#3C8B1E 50%,#2A6B14 100%)"
              : "linear-gradient(180deg,#4CA82C 0%,#63BE38 8%,#3C9B26 45%,#2E8A1C 90%,#5DB432 100%)",
            boxShadow: startOpen ? "inset 2px 2px 4px rgba(0,0,0,.35)" : "inset 0 1px 0 rgba(255,255,255,.35)",
          }}
        >
          <XPIcon name="flag" size={19} />
          start
        </button>

        {/* Window buttons */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 3, padding: "3px 5px", minWidth: 0, overflow: "hidden" }}>
          <TaskButton
            icon={route.icon}
            label={route.title}
            active={routeActive}
            onClick={() => (routeActive ? minimizeRoute() : focusRoute())}
          />
          {visible.map((w) => (
            <TaskButton
              key={w.id}
              icon={w.icon}
              label={w.title}
              active={focusedId === w.id && !w.min}
              onClick={() => (focusedId === w.id && !w.min ? minimize(w.id) : focus(w.id))}
            />
          ))}
        </div>

        {/* System tray */}
        <div
          style={{
            display: "flex", alignItems: "center", gap: 8, padding: "0 9px 0 11px",
            background: "linear-gradient(180deg,#1AA0E0 0%,#148AD0 8%,#0F8BD7 45%,#0C7BC0 90%,#3FB8EE 100%)",
            borderLeft: "1px solid #1560BD",
            boxShadow: "inset 1px 0 0 rgba(255,255,255,.25)",
            color: "#fff",
          }}
        >
          <button
            className="xp-chrome xp-nobtn" aria-label="Show desktop"
            onClick={minimizeAll}
            style={{ background: "none", border: "none", cursor: "default", padding: 0, display: "grid", placeItems: "center" }}
          >
            <XPIcon name="network" size={15} />
          </button>
          <button
            className="xp-chrome xp-nobtn" aria-label="Minesweeper"
            onClick={() => open("minesweeper")}
            style={{ background: "none", border: "none", cursor: "default", padding: 0, display: "grid", placeItems: "center" }}
          >
            <XPIcon name="mine" size={15} />
          </button>
          <span style={{ fontSize: 12, textShadow: "1px 1px 1px rgba(0,0,0,.35)", minWidth: 52, textAlign: "center" }}>
            {now
              ? now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
              : " "}
          </span>
        </div>
      </div>
    </>
  );
}

function TaskButton({
  icon, label, active, onClick,
}: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      className="xp-chrome xp-nobtn"
      onClick={onClick}
      title={label}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        minWidth: 0, maxWidth: 168, flex: "0 1 168px", height: "100%",
        padding: "0 8px", cursor: "default", color: "#fff", fontSize: 12,
        border: "1px solid " + (active ? "#1B4FB0" : "#4A85E8"),
        borderRadius: 3,
        background: active
          ? "linear-gradient(180deg,#1B4FB0 0%,#2A63C8 60%,#3A76DC 100%)"
          : "linear-gradient(180deg,#4B8BEE 0%,#3A78E2 55%,#2E68D4 100%)",
        boxShadow: active ? "inset 1px 1px 3px rgba(0,0,0,.4)" : "inset 0 1px 0 rgba(255,255,255,.25)",
        textShadow: "1px 1px 1px rgba(0,0,0,.35)",
      }}
    >
      <XPIcon name={icon} size={15} />
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
    </button>
  );
}
