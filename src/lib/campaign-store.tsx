import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedCampaigns, releaseChecklist, type Campaign } from "./campaign-data";

/* Persistent store for campaigns + release checklist.
   Survives route changes and refreshes via localStorage, which also
   fixes the old "role/state resets on refresh" issue. */

const LS_CAMPAIGNS = "rippl.campaigns.v1";
const LS_ACTIVE = "rippl.activeCampaign.v1";
const LS_TASKS = "rippl.tasks.v1";

type TaskState = Record<string, boolean>; // checklist item id -> done

interface StoreCtx {
  campaigns: Campaign[];
  activeId: string;
  active: Campaign;
  setActive: (id: string) => void;
  addCampaign: (c: Omit<Campaign, "id" | "seeded"> & { id?: string }) => Campaign;
  taskState: TaskState;
  toggleTask: (id: string) => void;
  taskProgress: number; // 0-100 across all phases
}

const Ctx = createContext<StoreCtx | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, val: unknown) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
}

/* default checklist task state derived from seed data */
function defaultTaskState(): TaskState {
  const s: TaskState = {};
  releaseChecklist.forEach((p) => p.items.forEach((i) => (s[i.id] = i.done)));
  return s;
}

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const stored = load<Campaign[]>(LS_CAMPAIGNS, []);
    // merge seeds with any user-created campaigns (seeds always present)
    const userMade = stored.filter((c) => !c.seeded);
    return [...seedCampaigns, ...userMade];
  });
  const [activeId, setActiveId] = useState<string>(() => load<string>(LS_ACTIVE, seedCampaigns[0].id));
  const [taskState, setTaskState] = useState<TaskState>(() => ({ ...defaultTaskState(), ...load<TaskState>(LS_TASKS, {}) }));

  useEffect(() => { save(LS_CAMPAIGNS, campaigns.filter((c) => !c.seeded)); }, [campaigns]);
  useEffect(() => { save(LS_ACTIVE, activeId); }, [activeId]);
  useEffect(() => { save(LS_TASKS, taskState); }, [taskState]);

  const active = useMemo(
    () => campaigns.find((c) => c.id === activeId) ?? campaigns[0],
    [campaigns, activeId]
  );

  const taskProgress = useMemo(() => {
    const ids = releaseChecklist.flatMap((p) => p.items.map((i) => i.id));
    const done = ids.filter((id) => taskState[id]).length;
    return ids.length ? Math.round((done / ids.length) * 100) : 0;
  }, [taskState]);

  function addCampaign(c: Omit<Campaign, "id" | "seeded"> & { id?: string }) {
    const id = c.id ?? `c-${Date.now()}`;
    const created: Campaign = { ...c, id, seeded: false }; // seeded:false → persisted to localStorage
    setCampaigns((prev) => [...prev, created]);
    setActiveId(id);
    return created;
  }

  function toggleTask(id: string) {
    setTaskState((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <Ctx.Provider value={{ campaigns, activeId, active, setActive: setActiveId, addCampaign, taskState, toggleTask, taskProgress }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCampaigns() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCampaigns outside provider");
  return c;
}
