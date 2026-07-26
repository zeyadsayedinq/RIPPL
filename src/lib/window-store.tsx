import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ═══════════════════════════════════════════════════════════
   RIPPL XP — window manager.

   Sits alongside os-store (which holds the app's DATA). This holds
   only the DESKTOP state: which windows are open, where they are,
   what's focused, what's minimised.

   Two kinds of window:
     • "route" — the current TanStack route, framed as a window. There
       is always exactly one, and navigating replaces its contents.
       This is what lets 26 routes become windows without fighting
       the router.
     • "app"   — a store-driven overlay window (Task Manager, Notepad,
       Minesweeper…). Any number, fully independent of the URL.
   ═══════════════════════════════════════════════════════════ */

export type AppId =
  | "taskmgr"
  | "mycomputer"
  | "notepad"
  | "controlpanel"
  | "minesweeper"
  | "run"
  | "about"
  | "recyclebin";

export interface WinState {
  id: string;
  appId: AppId;
  title: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  min: boolean;
  max: boolean;
}

interface WindowCtx {
  windows: WinState[];
  focusedId: string | null;
  /** The route window's own focus/minimise state. */
  routeMin: boolean;
  routeMax: boolean;
  routeZ: number;
  open: (appId: AppId, opts?: Partial<WinState>) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMax: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, w: number, h: number) => void;
  focusRoute: () => void;
  minimizeRoute: () => void;
  toggleMaxRoute: () => void;
  minimizeAll: () => void;
  /** Boot / shutdown lifecycle. */
  phase: Phase;
  setPhase: (p: Phase) => void;
  /** Skin toggle — the whole point of the layer being a layer. */
  skin: Skin;
  setSkin: (s: Skin) => void;
}

export type Phase = "boot" | "ready" | "shutdown" | "off";
export type Skin = "xp" | "neon";

const LS_WINDOWS = "rippl.xp.windows.v1";
const LS_SKIN = "rippl.xp.skin.v1";

export const APP_META: Record<AppId, { title: string; icon: string; w: number; h: number }> = {
  taskmgr: { title: "Windows Task Manager", icon: "taskmgr", w: 560, h: 460 },
  mycomputer: { title: "My Computer", icon: "computer", w: 700, h: 480 },
  notepad: { title: "Untitled - Notepad", icon: "notepad", w: 520, h: 400 },
  controlpanel: { title: "Control Panel", icon: "controlpanel", w: 680, h: 460 },
  minesweeper: { title: "Minesweeper", icon: "mine", w: 300, h: 360 },
  run: { title: "Run", icon: "run", w: 380, h: 180 },
  about: { title: "About Windows", icon: "info", w: 420, h: 300 },
  recyclebin: { title: "Recycle Bin", icon: "bin", w: 620, h: 420 },
};

const Ctx = createContext<WindowCtx | null>(null);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WinState[]>([]);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [routeMin, setRouteMin] = useState(false);
  const [routeMax, setRouteMax] = useState(true);
  const [routeZ, setRouteZ] = useState(1);
  const [phase, setPhase] = useState<Phase>("boot");
  const [skin, setSkinState] = useState<Skin>("xp");
  const zRef = useRef(2);
  const hydrated = useRef(false);

  /* Hydrate after mount — never touch localStorage during SSR. */
  useEffect(() => {
    try {
      const rawSkin = window.localStorage.getItem(LS_SKIN);
      if (rawSkin === "neon" || rawSkin === "xp") setSkinState(rawSkin);
      const raw = window.localStorage.getItem(LS_WINDOWS);
      if (raw) {
        const parsed = JSON.parse(raw) as WinState[];
        if (Array.isArray(parsed)) {
          setWindows(parsed);
          zRef.current = parsed.reduce((m, w) => Math.max(m, w.z), 2) + 1;
        }
      }
    } catch {
      /* ignore */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(LS_WINDOWS, JSON.stringify(windows));
    } catch {
      /* ignore */
    }
  }, [windows]);

  /* Drive the skin off the <html> attribute. One line, whole app repaints. */
  const setSkin = useCallback((s: Skin) => {
    setSkinState(s);
    try {
      window.localStorage.setItem(LS_SKIN, s);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (skin === "xp") document.documentElement.setAttribute("data-skin", "xp");
    else document.documentElement.removeAttribute("data-skin");
  }, [skin]);

  const nextZ = useCallback(() => {
    zRef.current += 1;
    return zRef.current;
  }, []);

  const open = useCallback(
    (appId: AppId, opts?: Partial<WinState>) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.appId === appId);
        const z = nextZ();
        if (existing) {
          setFocusedId(existing.id);
          return prev.map((w) => (w.id === existing.id ? { ...w, min: false, z } : w));
        }
        const meta = APP_META[appId];
        const n = prev.length;
        const id = `${appId}-${Date.now().toString(36)}`;
        setFocusedId(id);
        return [
          ...prev,
          {
            id,
            appId,
            title: meta.title,
            icon: meta.icon,
            x: 90 + n * 24,
            y: 70 + n * 24,
            w: meta.w,
            h: meta.h,
            z,
            min: false,
            max: false,
            ...opts,
          },
        ];
      });
    },
    [nextZ],
  );

  const close = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setFocusedId((f) => (f === id ? null : f));
  }, []);

  const focus = useCallback(
    (id: string) => {
      const z = nextZ();
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, min: false, z } : w)));
      setFocusedId(id);
    },
    [nextZ],
  );

  const minimize = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, min: true } : w)));
    setFocusedId((f) => (f === id ? null : f));
  }, []);

  const toggleMax = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, max: !w.max } : w)));
  }, []);

  const move = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const resize = useCallback((id: string, w: number, h: number) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, w: Math.max(240, w), h: Math.max(140, h) } : win)),
    );
  }, []);

  const focusRoute = useCallback(() => {
    setRouteZ(nextZ());
    setRouteMin(false);
    setFocusedId(null);
  }, [nextZ]);

  const minimizeRoute = useCallback(() => setRouteMin(true), []);
  const toggleMaxRoute = useCallback(() => setRouteMax((m) => !m), []);

  const minimizeAll = useCallback(() => {
    setWindows((prev) => prev.map((w) => ({ ...w, min: true })));
    setRouteMin(true);
    setFocusedId(null);
  }, []);

  const value = useMemo<WindowCtx>(
    () => ({
      windows,
      focusedId,
      routeMin,
      routeMax,
      routeZ,
      open,
      close,
      focus,
      minimize,
      toggleMax,
      move,
      resize,
      focusRoute,
      minimizeRoute,
      toggleMaxRoute,
      minimizeAll,
      phase,
      setPhase,
      skin,
      setSkin,
    }),
    [
      windows, focusedId, routeMin, routeMax, routeZ, open, close, focus, minimize,
      toggleMax, move, resize, focusRoute, minimizeRoute, toggleMaxRoute, minimizeAll,
      phase, skin, setSkin,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWindows() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWindows must be used inside <WindowProvider>");
  return ctx;
}

/** Safe variant for components that may render outside the provider. */
export function useWindowsOptional() {
  return useContext(Ctx);
}
