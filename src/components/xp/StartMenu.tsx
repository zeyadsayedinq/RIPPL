import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { groups } from "@/lib/nav";
import { useWindows, type AppId } from "@/lib/window-store";
import { useRole, type Role } from "@/lib/role-context";
import { XPIcon } from "./XPIcon";
import { TASKBAR_H } from "./XPWindow";

const roles: Role[] = ["Marketing Manager", "Team Member", "Client"];

/* The Sidebar's three nav groups, re-housed as the Start menu.
   Same array from lib/nav.ts — this is a chrome swap, not a rewrite. */
export function StartMenu({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const { open, setSkin, setPhase } = useWindows();
  const { role, setRole } = useRole();
  const [flyout, setFlyout] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);

  const go = (to: string) => { navigate({ to }); onClose(); };
  const launch = (id: AppId) => { open(id); onClose(); };

  const pinned = groups[0].items.slice(0, 6);
  const recent = groups[1].items.slice(0, 6);

  return (
    <div
      className="xp-chrome"
      onPointerDown={(e) => e.stopPropagation()}
      style={{
        position: "fixed", left: 0, bottom: TASKBAR_H, width: 386, zIndex: 9000,
        border: "1px solid #0831D9", borderBottom: "none", borderRadius: "8px 8px 0 0",
        boxShadow: "3px -3px 12px rgba(0,0,0,.45)", overflow: "hidden",
        fontFamily: 'Tahoma, "Segoe UI", sans-serif', fontSize: 12,
      }}
    >
      {/* Header — user tile */}
      <div style={{
        height: 56, display: "flex", alignItems: "center", gap: 9, padding: "0 10px",
        background: "linear-gradient(180deg,#1C60D8 0%,#3A80EE 55%,#1E5FD0 100%)",
        borderBottom: "2px solid #0831D9",
      }}>
        <div style={{ width: 40, height: 40, border: "2px solid #fff", borderRadius: 4, background: "#8FB0EA", display: "grid", placeItems: "center" }}>
          <XPIcon name="user" size={28} />
        </div>
        <span style={{ color: "#fff", fontSize: 15, fontWeight: "bold", textShadow: "1px 1px 2px rgba(0,0,0,.5)" }}>
          Zeyad
        </span>
      </div>

      <div style={{ display: "flex", minHeight: 340 }}>
        {/* Left column — pinned + all programs */}
        <div style={{ flex: "1 1 62%", background: "#fff", padding: "5px 3px", display: "flex", flexDirection: "column" }}>
          {pinned.map((i) => (
            <MenuRow key={i.to} icon={i.xpIcon ?? "folder"} label={i.label} sub={i.window} onClick={() => go(i.to)} big />
          ))}
          <div style={{ height: 1, background: "#D6D3C4", margin: "5px 8px" }} />
          {recent.map((i) => (
            <MenuRow key={i.to} icon={i.xpIcon ?? "doc"} label={i.label} onClick={() => go(i.to)} />
          ))}

          <div style={{ flex: 1 }} />
          <div style={{ height: 1, background: "#D6D3C4", margin: "5px 8px" }} />
          <div
            onMouseEnter={() => setFlyout(true)}
            onMouseLeave={() => setFlyout(false)}
            style={{ position: "relative" }}
          >
            <MenuRow icon="folderopen" label="All Programs" arrow bold />
            {flyout && (
              <div style={{
                position: "absolute", left: "100%", bottom: 0, width: 230,
                background: "#fff", border: "1px solid #0831D9", padding: "3px 2px",
                boxShadow: "3px -3px 10px rgba(0,0,0,.35)", maxHeight: 420, overflowY: "auto",
              }}>
                {groups.map((g) => (
                  <div key={g.label}>
                    <div style={{ padding: "4px 10px 2px", fontSize: 11, fontWeight: "bold", color: "#4A4A42" }}>{g.label}</div>
                    {g.items.map((i) => (
                      <MenuRow key={i.to} icon={i.xpIcon ?? "doc"} label={i.label} onClick={() => go(i.to)} />
                    ))}
                    <div style={{ height: 1, background: "#D6D3C4", margin: "3px 8px" }} />
                  </div>
                ))}
                <div style={{ padding: "4px 10px 2px", fontSize: 11, fontWeight: "bold", color: "#4A4A42" }}>Accessories</div>
                <MenuRow icon="notepad" label="Notepad" onClick={() => launch("notepad")} />
                <MenuRow icon="mine" label="Minesweeper" onClick={() => launch("minesweeper")} />
                <MenuRow icon="info" label="About RIPPL" onClick={() => launch("about")} />
              </div>
            )}
          </div>
        </div>

        {/* Right column — places */}
        <div style={{ flex: "1 1 38%", background: "#D3E5FA", padding: "5px 3px", display: "flex", flexDirection: "column" }}>
          <MenuRow icon="computer" label="My Computer" onClick={() => launch("mycomputer")} dark />
          <MenuRow icon="folder" label="The Vault" onClick={() => go("/vault")} dark />
          <MenuRow icon="chart" label="Campaign Command" onClick={() => go("/dashboard")} dark />
          <div style={{ height: 1, background: "#A8C8E8", margin: "5px 8px" }} />
          <MenuRow icon="controlpanel" label="Control Panel" onClick={() => go("/settings")} dark />
          <MenuRow icon="taskmgr" label="Task Manager" onClick={() => launch("taskmgr")} dark />
          <MenuRow icon="run" label="Run..." onClick={() => launch("run")} dark />
          <div style={{ height: 1, background: "#A8C8E8", margin: "5px 8px" }} />
          <MenuRow
            icon="ie" label="Switch to RIPPL 2025" dark
            onClick={() => { setSkin("neon"); onClose(); }}
          />
          <MenuRow icon="help" label="Help and Support" dark onClick={() => launch("about")} />

          <div style={{ flex: 1 }} />
          <div style={{ position: "relative" }}>
            {rolesOpen && (
              <div style={{ position: "absolute", right: 4, bottom: 26, width: 180, background: "#fff", border: "1px solid #0831D9", padding: 2 }}>
                {roles.map((r) => (
                  <MenuRow
                    key={r} icon="user" label={r}
                    onClick={() => { setRole(r); setRolesOpen(false); onClose(); }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer — log off / shut down */}
      <div style={{
        height: 38, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14, padding: "0 12px",
        background: "linear-gradient(180deg,#3A80EE 0%,#1C60D8 55%,#1A55C0 100%)",
        borderTop: "1px solid #6C9BE8",
      }}>
        <button
          className="xp-chrome xp-nobtn"
          onClick={() => setRolesOpen((o) => !o)}
          style={footBtn}
        >
          <XPIcon name="logoff" size={20} /> Log Off <span style={{ opacity: .8, fontSize: 10 }}>({role.split(" ")[0]})</span>
        </button>
        <button
          className="xp-chrome xp-nobtn"
          onClick={() => { setPhase("shutdown"); onClose(); }}
          style={footBtn}
        >
          <XPIcon name="shutdown" size={20} /> Turn Off Computer
        </button>
      </div>
    </div>
  );
}

const footBtn: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: 6, background: "transparent",
  border: "none", color: "#fff", fontSize: 12, cursor: "default",
  textShadow: "1px 1px 1px rgba(0,0,0,.4)", padding: "3px 6px", borderRadius: 3,
};

function MenuRow({
  icon, label, sub, onClick, big, bold, arrow, dark,
}: {
  icon: string; label: string; sub?: string; onClick?: () => void;
  big?: boolean; bold?: boolean; arrow?: boolean; dark?: boolean;
}) {
  const [hot, setHot] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: big ? "5px 8px" : "4px 8px",
        cursor: "default",
        background: hot ? "#316AC5" : "transparent",
        color: hot ? "#fff" : dark ? "#00186F" : "#000",
        fontWeight: bold ? "bold" : "normal",
      }}
    >
      <XPIcon name={icon} size={big ? 26 : 18} />
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
        {sub && big && (
          <span style={{ display: "block", fontSize: 10, opacity: .7, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {sub}
          </span>
        )}
      </span>
      {arrow && <span style={{ fontSize: 10 }}>▶</span>}
    </div>
  );
}
