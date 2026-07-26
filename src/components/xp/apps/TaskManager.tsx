import { useEffect, useMemo, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useWindows } from "@/lib/window-store";
import { useOS } from "@/lib/os-store";
import { windowTitleFor } from "@/lib/nav";
import { XPIcon } from "../XPIcon";

/* Task Manager, wired to real state.

   "Applications" lists the windows that are actually open — End Task
   really closes them. "Processes" derives one row per OS collection, so
   the memory column moves when you add an artist. "Performance" is a
   live CPU/PF graph driven by how much is actually loaded. */

type Tab = "apps" | "proc" | "perf";

export function TaskManager() {
  const [tab, setTab] = useState<Tab>("apps");
  const { windows, close, focus, routeMin } = useWindows();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const os = useOS();
  const route = windowTitleFor(pathname);

  const collections = useMemo(
    () => [
      { name: "roster.exe", n: os.artists.length, user: "Zeyad" },
      { name: "creators.exe", n: os.creators.length, user: "Zeyad" },
      { name: "releases.exe", n: os.releases.length, user: "Zeyad" },
      { name: "deals.exe", n: os.deals.length, user: "Zeyad" },
      { name: "contracts.exe", n: os.contracts.length, user: "Zeyad" },
      { name: "tracks.exe", n: os.tracks.length, user: "Zeyad" },
      { name: "notes.exe", n: os.notes.length, user: "Zeyad" },
      { name: "todos.exe", n: os.todos.length, user: "Zeyad" },
      { name: "members.exe", n: os.members.length, user: "SYSTEM" },
      { name: "projects.exe", n: os.projects.length, user: "SYSTEM" },
    ],
    [os],
  );

  const totalRows = collections.reduce((s, c) => s + c.n, 0);
  const load = Math.min(96, 8 + totalRows * 0.7 + windows.length * 6);

  return (
    <div className="xp-chrome" style={{ display: "flex", flexDirection: "column", height: "100%", background: "#ECE9D8", fontSize: 12 }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, padding: "6px 6px 0", borderBottom: "1px solid #ACA899" }}>
        {([["apps", "Applications"], ["proc", "Processes"], ["perf", "Performance"]] as const).map(([k, label]) => (
          <button
            key={k}
            className="xp-chrome xp-nobtn"
            onClick={() => setTab(k)}
            style={{
              padding: "3px 12px", fontSize: 12, cursor: "default",
              border: "1px solid #ACA899", borderBottom: tab === k ? "1px solid #ECE9D8" : "1px solid #ACA899",
              borderRadius: "3px 3px 0 0", marginBottom: -1,
              background: tab === k ? "#ECE9D8" : "#DEDACB",
              fontWeight: tab === k ? "bold" : "normal", color: "#000",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, minHeight: 0, padding: 8, display: "flex", flexDirection: "column" }}>
        {tab === "apps" && (
          <>
            <Sunken>
              <Row header cols={["Task", "Status"]} />
              {!routeMin && <AppRow icon={route.icon} name={route.title} status="Running" />}
              {windows.map((w) => (
                <AppRow
                  key={w.id} icon={w.icon} name={w.title}
                  status={w.min ? "Not Responding" : "Running"}
                  onClick={() => focus(w.id)}
                />
              ))}
              {windows.length === 0 && routeMin && (
                <div style={{ padding: 10, color: "#7A786E" }}>No applications running.</div>
              )}
            </Sunken>
            <ButtonRow>
              <button
                onClick={() => { const last = windows[windows.length - 1]; if (last) close(last.id); }}
                style={btn}
              >
                End Task
              </button>
              <button style={btn}>Switch To</button>
              <button style={btn}>New Task...</button>
            </ButtonRow>
          </>
        )}

        {tab === "proc" && (
          <>
            <Sunken>
              <Row header cols={["Image Name", "User Name", "CPU", "Mem Usage"]} widths={[2, 1, 0.5, 1]} />
              <Row cols={["System Idle Process", "SYSTEM", `${Math.max(0, 99 - Math.round(load))}`, "28 K"]} widths={[2, 1, 0.5, 1]} />
              <Row cols={["rippl.exe", "Zeyad", `${Math.round(load / 3)}`, `${(12_400 + totalRows * 37).toLocaleString()} K`]} widths={[2, 1, 0.5, 1]} />
              {collections.map((c) => (
                <Row
                  key={c.name}
                  cols={[c.name, c.user, c.n ? "01" : "00", `${(320 + c.n * 148).toLocaleString()} K`]}
                  widths={[2, 1, 0.5, 1]}
                  dim={c.n === 0}
                />
              ))}
              {windows.map((w) => (
                <Row key={w.id} cols={[`${w.appId}.exe`, "Zeyad", "00", `${(1_240 + w.w).toLocaleString()} K`]} widths={[2, 1, 0.5, 1]} />
              ))}
            </Sunken>
            <ButtonRow>
              <span style={{ flex: 1, fontSize: 11, color: "#4A4A42" }}>
                Processes: {collections.length + windows.length + 2} &nbsp;·&nbsp; Records: {totalRows}
              </span>
              <button style={btn}>End Process</button>
            </ButtonRow>
          </>
        )}

        {tab === "perf" && <Performance load={load} records={totalRows} windows={windows.length} />}
      </div>
    </div>
  );
}

/* ── Performance tab ──────────────────────────────────────────────── */

function Performance({ load, records, windows }: { load: number; records: number; windows: number }) {
  const [hist, setHist] = useState<number[]>(() => Array(60).fill(0));
  const [memHist, setMemHist] = useState<number[]>(() => Array(60).fill(0));
  const loadRef = useRef(load);
  loadRef.current = load;

  useEffect(() => {
    const t = setInterval(() => {
      setHist((h) => [...h.slice(1), Math.max(2, Math.min(99, loadRef.current + (Math.random() * 22 - 11)))]);
      setMemHist((h) => [...h.slice(1), Math.max(10, Math.min(95, loadRef.current * 0.6 + 22 + Math.random() * 6))]);
    }, 700);
    return () => clearInterval(t);
  }, []);

  const cpu = Math.round(hist[hist.length - 1]);
  const mem = Math.round(memHist[memHist.length - 1]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, overflow: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "108px 1fr", gap: 10 }}>
        <Gauge label="CPU Usage" value={cpu} />
        <Graph label="CPU Usage History" data={hist} />
        <Gauge label="PF Usage" value={mem} />
        <Graph label="Page File Usage History" data={memHist} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Fieldset title="Totals">
          <Stat k="Handles" v={(records * 17 + 4_812).toLocaleString()} />
          <Stat k="Threads" v={(windows * 9 + 341).toLocaleString()} />
          <Stat k="Processes" v={`${windows + 12}`} />
        </Fieldset>
        <Fieldset title="Commit Charge (K)">
          <Stat k="Total" v={(records * 148 + 96_420).toLocaleString()} />
          <Stat k="Limit" v={(1_048_576).toLocaleString()} />
          <Stat k="Peak" v={(records * 172 + 118_900).toLocaleString()} />
        </Fieldset>
      </div>
    </div>
  );
}

function Gauge({ label, value }: { label: string; value: number }) {
  const bars = 20;
  const lit = Math.round((value / 100) * bars);
  return (
    <Fieldset title={label}>
      <div style={{ background: "#000", padding: 3, display: "flex", flexDirection: "column-reverse", gap: 1, height: 92 }}>
        {Array.from({ length: bars }).map((_, i) => (
          <div key={i} style={{ flex: 1, background: i < lit ? "#00FF00" : "#003300" }} />
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 12, marginTop: 3 }}>{value} %</div>
    </Fieldset>
  );
}

function Graph({ label, data }: { label: string; data: number[] }) {
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - v}`)
    .join(" ");
  return (
    <Fieldset title={label}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: 92, background: "#000", display: "block" }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 10} x2="100" y2={(i + 1) * 10} stroke="#0A3A0A" strokeWidth=".5" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 10} y1="0" x2={(i + 1) * 10} y2="100" stroke="#0A3A0A" strokeWidth=".5" />
        ))}
        <polyline points={pts} fill="none" stroke="#00FF00" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
    </Fieldset>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset style={{ border: "1px solid #ACA899", padding: "4px 8px 8px", margin: 0, minWidth: 0 }}>
      <legend style={{ fontSize: 11, padding: "0 4px", color: "#000" }}>{title}</legend>
      {children}
    </fieldset>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "1px 0" }}>
      <span>{k}</span><span>{v}</span>
    </div>
  );
}

function Sunken({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      flex: 1, minHeight: 0, overflow: "auto", background: "#fff",
      border: "1px solid", borderColor: "#716F64 #fff #fff #716F64",
    }}>
      {children}
    </div>
  );
}

function Row({
  cols, header, widths, dim,
}: { cols: string[]; header?: boolean; widths?: number[]; dim?: boolean }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: (widths ?? cols.map(() => 1)).map((w) => `${w}fr`).join(" "),
      fontSize: 11, padding: "2px 6px",
      background: header ? "#ECE9D8" : "transparent",
      borderBottom: header ? "1px solid #ACA899" : "none",
      fontWeight: header ? "bold" : "normal",
      color: dim ? "#ACA899" : "#000",
      position: header ? "sticky" : "static", top: 0,
    }}>
      {cols.map((c, i) => <span key={i} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c}</span>)}
    </div>
  );
}

function AppRow({
  icon, name, status, onClick,
}: { icon: string; name: string; status: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 6px", fontSize: 11, cursor: "default" }}
    >
      <XPIcon name={icon} size={16} />
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
      <span style={{ width: 96, color: status === "Running" ? "#000" : "#B03020" }}>{status}</span>
    </div>
  );
}

function ButtonRow({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 8 }}>{children}</div>;
}

const btn: React.CSSProperties = {
  background: "linear-gradient(180deg,#fdfdfc 0%,#ece9d8 45%,#d9d5c5 100%)",
  border: "1px solid #ACA899", borderRadius: 3, padding: "3px 14px",
  fontSize: 12, fontFamily: "Tahoma, sans-serif", color: "#000", cursor: "default",
  boxShadow: "inset 0 0 0 1px #fff", minWidth: 76,
};
