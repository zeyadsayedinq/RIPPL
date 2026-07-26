import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useOS } from "@/lib/os-store";
import { useWindows } from "@/lib/window-store";
import { XPIcon } from "../XPIcon";

/* ── My Computer — Explorer chrome over the real OS collections ───── */

export function MyComputer() {
  const os = useOS();
  const navigate = useNavigate();
  const { focusRoute } = useWindows();

  const drives = [
    { icon: "computer", label: "Local Disk (C:)", sub: "RIPPL OS", to: "/home" },
    { icon: "folder", label: "The Vault (V:)", sub: `${os.contracts.length} contracts`, to: "/vault" },
    { icon: "user", label: "Roster (R:)", sub: `${os.artists.length} artists`, to: "/roster" },
    { icon: "wmp", label: "Releases (D:)", sub: `${os.releases.length} releases`, to: "/releases" },
    { icon: "chart", label: "Campaigns (M:)", sub: "marketing", to: "/campaigns" },
    { icon: "user", label: "Creators (K:)", sub: `${os.creators.length} creators`, to: "/creators" },
  ];

  return (
    <div className="xp-chrome" style={{ display: "flex", height: "100%", background: "#fff", fontSize: 12 }}>
      <TaskPane
        title="System Tasks"
        items={["View system information", "Add or remove programs", "Change a setting"]}
        extra={
          <PaneBox title="Other Places">
            {["My Network Places", "My Documents", "Control Panel"].map((t) => (
              <PaneLink key={t} label={t} onClick={() => { navigate({ to: "/settings" }); focusRoute(); }} />
            ))}
          </PaneBox>
        }
      />

      <div style={{ flex: 1, padding: 12, overflow: "auto" }}>
        <GroupLabel>Hard Disk Drives</GroupLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 6, marginTop: 6 }}>
          {drives.map((d) => (
            <button
              key={d.label}
              className="xp-chrome xp-nobtn"
              onDoubleClick={() => { navigate({ to: d.to }); focusRoute(); }}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: 6,
                background: "transparent", border: "1px solid transparent", cursor: "default", textAlign: "left",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#D2E3F7"; e.currentTarget.style.borderColor = "#9BB8DC"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}
            >
              <XPIcon name={d.icon} size={32} />
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 11, color: "#000", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.label}</span>
                <span style={{ display: "block", fontSize: 10, color: "#4A4A42" }}>{d.sub}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Recycle Bin ─────────────────────────────────────────────────── */

export function RecycleBin() {
  return (
    <div className="xp-chrome" style={{ display: "flex", height: "100%", background: "#fff", fontSize: 12 }}>
      <TaskPane title="Recycle Bin Tasks" items={["Empty the Recycle Bin", "Restore all items"]} />
      <div style={{ flex: 1, display: "grid", placeItems: "center", color: "#4A4A42" }}>
        <div style={{ textAlign: "center" }}>
          <XPIcon name="bin" size={54} />
          <p style={{ marginTop: 10, fontSize: 12 }}>This folder is empty.</p>
          <p style={{ marginTop: 4, fontSize: 11, color: "#7A786E" }}>
            Nothing has been deleted. RIPPL keeps everything.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Notepad ─────────────────────────────────────────────────────── */

export function Notepad() {
  const os = useOS();
  const [text, setText] = useState("");

  useEffect(() => {
    if (os.notes.length && !text) setText(os.notes[0].body ?? "");
  }, [os.notes, text]);

  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      spellCheck={false}
      className="xp-chrome"
      style={{
        width: "100%", height: "100%", border: "none", outline: "none", resize: "none",
        padding: 4, fontFamily: '"Lucida Console","Courier New",monospace', fontSize: 13,
        background: "#fff", color: "#000", boxShadow: "none", borderRadius: 0,
      }}
    />
  );
}

/* ── Run dialog ──────────────────────────────────────────────────── */

const RUN_MAP: Record<string, string> = {
  "rippl": "/home", "home": "/home", "roster": "/roster", "releases": "/releases",
  "vault": "/vault", "studio": "/studio", "techlab": "/techlab", "audio": "/audio",
  "dashboard": "/dashboard", "campaigns": "/campaigns", "calendar": "/calendar",
  "channels": "/channels", "tasks": "/tasks", "budget": "/budget",
  "templates": "/templates", "creators": "/creators", "assets": "/assets",
  "control": "/settings", "settings": "/settings", "admin": "/admin",
};

export function RunDialog({ winId }: { winId: string }) {
  const [cmd, setCmd] = useState("");
  const navigate = useNavigate();
  const { close, open, focusRoute, setSkin } = useWindows();
  const [err, setErr] = useState(false);

  const submit = () => {
    const c = cmd.trim().toLowerCase().replace(/\.exe$/, "");
    if (c === "taskmgr") { open("taskmgr"); close(winId); return; }
    if (c === "notepad") { open("notepad"); close(winId); return; }
    if (c === "winmine" || c === "minesweeper") { open("minesweeper"); close(winId); return; }
    if (c === "winver") { open("about"); close(winId); return; }
    if (c === "neon" || c === "rippl2025") { setSkin("neon"); close(winId); return; }
    const to = RUN_MAP[c];
    if (to) { navigate({ to }); focusRoute(); close(winId); return; }
    setErr(true);
  };

  return (
    <div className="xp-chrome" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, fontSize: 12, height: "100%" }}>
      <div style={{ display: "flex", gap: 12 }}>
        <XPIcon name="run" size={32} />
        <p style={{ margin: 0, lineHeight: 1.5, color: "#000" }}>
          Type the name of a program, folder, or resource, and RIPPL will open it for you.
        </p>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 42, color: "#000" }}>Open:</span>
        <input
          autoFocus value={cmd}
          onChange={(e) => { setCmd(e.target.value); setErr(false); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="dashboard"
          style={{ flex: 1 }}
        />
      </label>

      {err && <span style={{ color: "#B03020", fontSize: 11 }}>Cannot find '{cmd}'. Check the spelling and try again.</span>}

      <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button onClick={submit}>OK</button>
        <button onClick={() => close(winId)}>Cancel</button>
      </div>
    </div>
  );
}

/* ── About ───────────────────────────────────────────────────────── */

export function About() {
  const os = useOS();
  const total = os.artists.length + os.releases.length + os.creators.length + os.contracts.length;
  return (
    <div className="xp-chrome" style={{ padding: 18, fontSize: 12, color: "#000", lineHeight: 1.6 }}>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>
        RIPPL<span style={{ color: "#F0A30A", fontWeight: "normal" }}>XP</span>
      </div>
      <p style={{ margin: "4px 0 0", color: "#4A4A42" }}>Professional Edition · Version 2026 (Build 5.1.2600)</p>
      <div style={{ height: 1, background: "#ACA899", margin: "14px 0" }} />
      <p style={{ margin: 0 }}>Licensed to:</p>
      <p style={{ margin: "2px 0 0", fontWeight: "bold" }}>Zeyad</p>
      <p style={{ margin: "10px 0 0" }}>Physical memory available to Windows: {(total * 148 + 96_420).toLocaleString()} KB</p>
      <p style={{ margin: "14px 0 0", color: "#4A4A42", fontSize: 11 }}>
        Every artist, release, deal, contract, campaign and build — in one operating system.
      </p>
    </div>
  );
}

/* ── Minesweeper ─────────────────────────────────────────────────── */

const W = 9, H = 9, MINES = 10;

export function Minesweeper() {
  const [seed, setSeed] = useState(0);
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [flags, setFlags] = useState<Set<number>>(new Set());
  const [dead, setDead] = useState(false);

  const mines = useMemo(() => {
    const s = new Set<number>();
    let i = 0;
    while (s.size < MINES && i < 500) { s.add(Math.floor(Math.random() * W * H)); i++; }
    return s;
  }, [seed]);

  const won = open.size === W * H - MINES && !dead;

  const near = (idx: number) => {
    const x = idx % W, y = Math.floor(idx / W);
    let n = 0;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        if (mines.has(ny * W + nx)) n++;
      }
    return n;
  };

  const reveal = (idx: number, acc = new Set<number>()): Set<number> => {
    if (acc.has(idx)) return acc;
    acc.add(idx);
    if (near(idx) === 0) {
      const x = idx % W, y = Math.floor(idx / W);
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const n = ny * W + nx;
          if (!mines.has(n)) reveal(n, acc);
        }
    }
    return acc;
  };

  const click = (idx: number) => {
    if (dead || won || flags.has(idx)) return;
    if (mines.has(idx)) { setDead(true); return; }
    setOpen((prev) => new Set([...prev, ...reveal(idx)]));
  };

  const reset = () => { setSeed((s) => s + 1); setOpen(new Set()); setFlags(new Set()); setDead(false); };

  const COLORS = ["", "#0000FF", "#008000", "#FF0000", "#000080", "#800000", "#008080", "#000000", "#808080"];

  return (
    <div className="xp-chrome" style={{ padding: 8, background: "#ECE9D8", height: "100%" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", padding: 5, marginBottom: 6,
        border: "2px solid", borderColor: "#7F7F6F #fff #fff #7F7F6F", background: "#C0C0C0",
      }}>
        <LED v={MINES - flags.size} />
        <button
          className="xp-chrome xp-nobtn" onClick={reset}
          style={{
            width: 26, height: 26, fontSize: 15, lineHeight: 1, cursor: "default",
            border: "2px solid", borderColor: "#fff #7F7F6F #7F7F6F #fff", background: "#C0C0C0",
          }}
        >
          {dead ? "✖" : won ? "★" : "●"}
        </button>
        <LED v={open.size} />
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: `repeat(${W},22px)`, gap: 0,
        border: "2px solid", borderColor: "#7F7F6F #fff #fff #7F7F6F", width: "fit-content", margin: "0 auto",
      }}>
        {Array.from({ length: W * H }).map((_, i) => {
          const isOpen = open.has(i) || (dead && mines.has(i));
          const n = near(i);
          return (
            <button
              key={i}
              className="xp-chrome xp-nobtn"
              onClick={() => click(i)}
              onContextMenu={(e) => {
                e.preventDefault();
                setFlags((f) => { const s = new Set(f); s.has(i) ? s.delete(i) : s.add(i); return s; });
              }}
              style={{
                width: 22, height: 22, padding: 0, fontSize: 12, fontWeight: "bold", cursor: "default",
                fontFamily: "Tahoma, sans-serif", background: "#C0C0C0",
                border: isOpen ? "1px solid #9A9A8A" : "2px solid",
                borderColor: isOpen ? "#9A9A8A" : "#fff #7F7F6F #7F7F6F #fff",
                color: mines.has(i) && isOpen ? "#000" : COLORS[n],
              }}
            >
              {isOpen ? (mines.has(i) ? "☀" : n || "") : flags.has(i) ? "⚑" : ""}
            </button>
          );
        })}
      </div>

      <p style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: "#4A4A42" }}>
        {dead ? "Boom. Click the face to try again." : won ? "Cleared." : "Right-click to flag."}
      </p>
    </div>
  );
}

function LED({ v }: { v: number }) {
  return (
    <span style={{
      fontFamily: '"Lucida Console",monospace', background: "#000", color: "#FF0000",
      padding: "1px 5px", fontSize: 17, letterSpacing: 1, border: "1px solid #7F7F6F",
    }}>
      {String(Math.max(0, v)).padStart(3, "0")}
    </span>
  );
}

/* ── Shared Explorer task pane ───────────────────────────────────── */

function TaskPane({ title, items, extra }: { title: string; items: string[]; extra?: React.ReactNode }) {
  return (
    <div style={{
      width: 172, flex: "0 0 172px", padding: 8, overflow: "auto",
      background: "linear-gradient(180deg,#7CA7E8 0%,#6B96DE 12%,#E8EEFB 12%,#D6E3F8 100%)",
    }}>
      <PaneBox title={title}>
        {items.map((t) => <PaneLink key={t} label={t} />)}
      </PaneBox>
      {extra}
    </div>
  );
}

function PaneBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #C4D5F0", marginBottom: 8, overflow: "hidden" }}>
      <div style={{
        padding: "3px 8px", fontSize: 11, fontWeight: "bold", color: "#0C327D",
        background: "linear-gradient(180deg,#F0F4FD 0%,#D9E4F8 100%)", borderBottom: "1px solid #C4D5F0",
      }}>
        {title}
      </div>
      <div style={{ padding: "5px 8px", display: "flex", flexDirection: "column", gap: 4 }}>{children}</div>
    </div>
  );
}

function PaneLink({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <span
      onClick={onClick}
      style={{ fontSize: 11, color: "#215DC6", cursor: "default" }}
      onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; e.currentTarget.style.color = "#EF6D1E"; }}
      onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; e.currentTarget.style.color = "#215DC6"; }}
    >
      {label}
    </span>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: "bold", color: "#0C327D", borderBottom: "1px solid #C4D5F0", paddingBottom: 2 }}>
      {children}
    </div>
  );
}
