import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { XPIcon } from "./XPIcon";

export const TASKBAR_H = 30;

interface Props {
  title: string;
  icon?: string;
  focused?: boolean;
  maximized?: boolean;
  minimized?: boolean;
  x?: number; y?: number; w?: number; h?: number; z?: number;
  resizable?: boolean;
  closable?: boolean;
  onFocus?: () => void;
  onMinimize?: () => void;
  onToggleMax?: () => void;
  onClose?: () => void;
  onMove?: (x: number, y: number) => void;
  onResize?: (w: number, h: number) => void;
  menu?: string[];
  statusBar?: ReactNode;
  bodyClassName?: string;
  children: ReactNode;
}

export function XPWindow({
  title, icon = "folder", focused = true, maximized = false, minimized = false,
  x = 80, y = 60, w = 640, h = 460, z = 10,
  resizable = true, closable = true,
  onFocus, onMinimize, onToggleMax, onClose, onMove, onResize,
  menu, statusBar, bodyClassName = "", children,
}: Props) {
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);
  const sizeRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (dragRef.current && onMove) {
      onMove(
        Math.max(-40, e.clientX - dragRef.current.dx),
        Math.max(0, Math.min(window.innerHeight - TASKBAR_H - 24, e.clientY - dragRef.current.dy)),
      );
    }
    if (sizeRef.current && onResize) {
      onResize(
        sizeRef.current.w + (e.clientX - sizeRef.current.x),
        sizeRef.current.h + (e.clientY - sizeRef.current.y),
      );
    }
  }, [onMove, onResize]);

  const endDrag = useCallback(() => {
    dragRef.current = null;
    sizeRef.current = null;
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
    };
  }, [onPointerMove, endDrag]);

  if (minimized) return null;

  const frame: React.CSSProperties = maximized
    ? { position: "fixed", left: 0, top: 0, right: 0, bottom: TASKBAR_H, zIndex: z }
    : { position: "fixed", left: x, top: y, width: w, height: h, zIndex: z };

  const titleBg = focused
    ? "linear-gradient(180deg,#0058EE 0%,#3F8CF3 8%,#1868E0 40%,#0F5BD8 88%,#3F8CF3 100%)"
    : "linear-gradient(180deg,#7BA2E7 0%,#A9C4F0 10%,#8FB0EA 45%,#7BA2E7 100%)";

  return (
    <div
      className="xp-chrome"
      style={{
        ...frame,
        display: "flex",
        flexDirection: "column",
        background: "#ECE9D8",
        border: "1px solid #0831D9",
        borderTop: "none",
        borderRadius: maximized ? 0 : "8px 8px 0 0",
        boxShadow: maximized ? "none" : "2px 2px 8px rgba(0,0,0,.4)",
        overflow: "hidden",
        fontFamily: 'Tahoma, "Segoe UI", sans-serif',
      }}
      onPointerDown={onFocus}
    >
      {/* ── Title bar ─────────────────────────────────────── */}
      <div
        className="xp-chrome"
        onPointerDown={(e) => {
          if (maximized) return;
          const t = e.target as HTMLElement;
          if (t.closest("[data-winbtn]")) return;
          dragRef.current = { dx: e.clientX - x, dy: e.clientY - y };
        }}
        onDoubleClick={onToggleMax}
        style={{
          height: 28,
          flex: "0 0 28px",
          background: titleBg,
          borderRadius: maximized ? 0 : "7px 7px 0 0",
          display: "flex",
          alignItems: "center",
          padding: "0 3px 0 5px",
          gap: 5,
          cursor: maximized ? "default" : "move",
          userSelect: "none",
        }}
      >
        <XPIcon name={icon} size={16} />
        <span
          style={{
            color: "#fff",
            fontSize: 12,
            fontWeight: "bold",
            textShadow: "1px 1px 1px rgba(0,0,0,.55)",
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            opacity: focused ? 1 : 0.75,
          }}
        >
          {title}
        </span>

        <TitleBtn label="Minimize" onClick={onMinimize} glyph="min" />
        <TitleBtn label="Maximize" onClick={onToggleMax} glyph={maximized ? "restore" : "max"} />
        {closable && <TitleBtn label="Close" onClick={onClose} glyph="close" danger />}
      </div>

      {/* ── Menu bar ──────────────────────────────────────── */}
      {menu && (
        <div
          className="xp-chrome"
          style={{
            flex: "0 0 auto",
            display: "flex",
            gap: 2,
            padding: "2px 3px",
            background: "#ECE9D8",
            borderBottom: "1px solid #ACA899",
            fontSize: 12,
          }}
        >
          {menu.map((m) => (
            <span
              key={m}
              style={{ padding: "2px 7px", cursor: "default", color: "#000" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#316AC5";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#000";
              }}
            >
              <u>{m.slice(0, 1)}</u>{m.slice(1)}
            </span>
          ))}
        </div>
      )}

      {/* ── Body ──────────────────────────────────────────── */}
      <div
        className={bodyClassName}
        style={{ flex: 1, minHeight: 0, overflow: "auto", background: "#ECE9D8", position: "relative" }}
      >
        {children}
      </div>

      {/* ── Status bar ────────────────────────────────────── */}
      {statusBar && (
        <div
          className="xp-chrome"
          style={{
            flex: "0 0 20px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "0 6px",
            fontSize: 11,
            color: "#000",
            background: "#ECE9D8",
            borderTop: "1px solid #fff",
            boxShadow: "inset 0 1px 0 #ACA899",
          }}
        >
          {statusBar}
        </div>
      )}

      {/* ── Resize grip ───────────────────────────────────── */}
      {resizable && !maximized && (
        <div
          onPointerDown={(e) => {
            e.stopPropagation();
            sizeRef.current = { x: e.clientX, y: e.clientY, w, h };
          }}
          style={{
            position: "absolute", right: 0, bottom: 0, width: 16, height: 16,
            cursor: "nwse-resize",
            background:
              "linear-gradient(135deg,transparent 45%,#ACA899 45%,#ACA899 55%,transparent 55%,transparent 70%,#ACA899 70%,#ACA899 80%,transparent 80%)",
          }}
        />
      )}
    </div>
  );
}

function TitleBtn({
  glyph, onClick, label, danger,
}: { glyph: "min" | "max" | "restore" | "close"; onClick?: () => void; label: string; danger?: boolean }) {
  return (
    <button
      data-winbtn
      aria-label={label}
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      className="xp-chrome xp-nobtn"
      style={{
        width: danger ? 23 : 21,
        height: 21,
        border: "1px solid rgba(255,255,255,.75)",
        borderRadius: 3,
        background: danger
          ? "linear-gradient(180deg,#E9634B 0%,#D64426 45%,#B32B0F 100%)"
          : "linear-gradient(180deg,#4A9BF5 0%,#2A78E0 45%,#1A5FC8 100%)",
        display: "grid",
        placeItems: "center",
        cursor: "default",
        padding: 0,
        flex: "0 0 auto",
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" shapeRendering="crispEdges" aria-hidden="true">
        {glyph === "min" && <rect x="2" y="7" width="6" height="2" fill="#fff" />}
        {glyph === "max" && <><rect x="1" y="1" width="8" height="8" fill="none" stroke="#fff" strokeWidth="1.5" /><rect x="1" y="1" width="8" height="2.5" fill="#fff" /></>}
        {glyph === "restore" && <><rect x="3" y="1" width="6" height="6" fill="none" stroke="#fff" strokeWidth="1.4" /><rect x="1" y="3" width="6" height="6" fill="#1A5FC8" stroke="#fff" strokeWidth="1.4" /></>}
        {glyph === "close" && <path d="M2 2l6 6M8 2L2 8" stroke="#fff" strokeWidth="1.8" />}
      </svg>
    </button>
  );
}
