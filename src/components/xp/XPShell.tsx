import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useWindows } from "@/lib/window-store";
import { windowTitleFor } from "@/lib/nav";
import { Desktop } from "./Desktop";
import { Taskbar } from "./Taskbar";
import { XPWindow, TASKBAR_H } from "./XPWindow";
import { MobileGate } from "./SystemScreens";
import { TaskManager } from "./apps/TaskManager";
import { MyComputer, RecycleBin, Notepad, RunDialog, About, Minesweeper } from "./apps/SmallApps";

/* ═══════════════════════════════════════════════════════════
   XPShell — the desktop itself.

   Rendered once, at the root, as a sibling of <Outlet />. It owns the
   wallpaper, the taskbar and every overlay ("app") window. The route
   window is rendered by AppShell, so navigating swaps its contents
   without disturbing anything out here.
   ═══════════════════════════════════════════════════════════ */

export function XPChrome() {
  const { windows, focusedId, focus, close, minimize, toggleMax, move, resize } = useWindows();
  const [mobileDismissed, setMobileDismissed] = useState(false);
  const [narrow, setNarrow] = useState(false);

  /* Boot and shutdown are handled above the access gate, in __root's
     <BootGate>, so a real machine's order is preserved: boot → login →
     desktop. */
  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < 800);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <Desktop />

      {windows.map((w) => (
        <XPWindow
          key={w.id}
          title={w.title}
          icon={w.icon}
          focused={focusedId === w.id}
          maximized={w.max}
          minimized={w.min}
          x={w.x} y={w.y} w={w.w} h={w.h} z={w.z}
          menu={MENUS[w.appId]}
          resizable={w.appId !== "run"}
          onFocus={() => focus(w.id)}
          onMinimize={() => minimize(w.id)}
          onToggleMax={() => toggleMax(w.id)}
          onClose={() => close(w.id)}
          onMove={(x, y) => move(w.id, x, y)}
          onResize={(ww, hh) => resize(w.id, ww, hh)}
        >
          <AppBody appId={w.appId} winId={w.id} />
        </XPWindow>
      ))}

      <Taskbar />

      {narrow && !mobileDismissed && <MobileGate onDismiss={() => setMobileDismissed(true)} />}
    </>
  );
}

const MENUS: Record<string, string[] | undefined> = {
  taskmgr: ["File", "Options", "View", "Shut Down", "Help"],
  mycomputer: ["File", "Edit", "View", "Favorites", "Tools", "Help"],
  recyclebin: ["File", "Edit", "View", "Favorites", "Tools", "Help"],
  notepad: ["File", "Edit", "Format", "View", "Help"],
  minesweeper: ["Game", "Help"],
  about: undefined,
  run: undefined,
  controlpanel: ["File", "Edit", "View", "Favorites", "Tools", "Help"],
};

function AppBody({ appId, winId }: { appId: string; winId: string }) {
  switch (appId) {
    case "taskmgr": return <TaskManager />;
    case "mycomputer": return <MyComputer />;
    case "recyclebin": return <RecycleBin />;
    case "notepad": return <Notepad />;
    case "minesweeper": return <Minesweeper />;
    case "run": return <RunDialog winId={winId} />;
    case "about": return <About />;
    default: return <div style={{ padding: 16 }}>Not installed.</div>;
  }
}

/* ── The route, framed as a window ────────────────────────────────── */

export function XPRouteWindow({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const {
    routeMin, routeMax, routeZ, focusedId,
    focusRoute, minimizeRoute, toggleMaxRoute, setPhase,
  } = useWindows();
  const { title, icon } = windowTitleFor(pathname);

  return (
    <XPWindow
      title={`${title} — RIPPL`}
      icon={icon}
      focused={focusedId === null}
      maximized={routeMax}
      minimized={routeMin}
      z={routeZ}
      x={40} y={30} w={980} h={640}
      menu={["File", "Edit", "View", "Favorites", "Tools", "Help"]}
      onFocus={focusRoute}
      onMinimize={minimizeRoute}
      onToggleMax={toggleMaxRoute}
      onClose={() => setPhase("shutdown")}
      statusBar={<StatusBar />}
      bodyClassName="xp-route-body"
    >
      <div style={{ padding: 12, minHeight: "100%", background: "#ECE9D8" }}>{children}</div>
    </XPWindow>
  );
}

function StatusBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { windows } = useWindows();
  return (
    <>
      <Cell grow>{pathname}</Cell>
      <Cell>{windows.length} window{windows.length === 1 ? "" : "s"} open</Cell>
      <Cell>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: "#3C9B26", display: "inline-block" }} />
          My Computer
        </span>
      </Cell>
    </>
  );
}

function Cell({ children, grow }: { children: ReactNode; grow?: boolean }) {
  return (
    <span style={{
      flex: grow ? 1 : "0 0 auto", padding: "1px 6px", minWidth: 0,
      borderLeft: "1px solid #ACA899", borderTop: "1px solid #ACA899",
      boxShadow: "inset -1px -1px 0 #fff",
      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
    }}>
      {children}
    </span>
  );
}

export { TASKBAR_H };
