import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedCampaigns, type Campaign, type ChecklistPhase } from "./campaign-data";
import { getTemplate, type CampaignTemplate } from "./campaign-templates";

/* Frontend-only persistent store (localStorage). Everything is scoped
   per-campaign: task checklist state, influencer assignments and uploaded
   assets. Survives route changes and refreshes. */

const LS_CAMPAIGNS = "rippl.campaigns.v2";
const LS_ACTIVE = "rippl.activeCampaign.v2";
const LS_TASKS = "rippl.tasks.v2";          // { [campaignId]: { [itemId]: boolean } }
const LS_ASSIGN = "rippl.assignments.v2";   // { [campaignId]: creatorId[] }
const LS_ASSETS = "rippl.assets.v2";        // { [campaignId]: UploadedAsset[] }

export type AssetStatus = "Draft" | "Under Review" | "Approved" | "Needs Revision";
export interface UploadedAsset {
  id: string;
  name: string;
  type: "Brief" | "Audio" | "Art" | "Video" | "Other";
  size: number;
  previewUrl?: string; // small images only (data URL)
  status: AssetStatus;
  addedAt: string;
}

type TaskMap = Record<string, Record<string, boolean>>;
type AssignMap = Record<string, string[]>;
type AssetMap = Record<string, UploadedAsset[]>;

interface StoreCtx {
  campaigns: Campaign[];
  activeId: string;
  active: Campaign | null;
  setActive: (id: string) => void;
  addCampaign: (c: Omit<Campaign, "id" | "seeded"> & { id?: string }) => Campaign;

  activeTemplate: CampaignTemplate | undefined;
  activeChecklist: ChecklistPhase[];
  isTaskDone: (itemId: string) => boolean;
  toggleTask: (itemId: string) => void;
  taskProgress: number;

  assignedIds: string[];
  isAssigned: (creatorId: string) => boolean;
  toggleAssignment: (creatorId: string) => void;

  activeAssets: UploadedAsset[];
  addAsset: (a: Omit<UploadedAsset, "id" | "addedAt" | "status"> & { status?: AssetStatus }) => void;
  setAssetStatus: (assetId: string, status: AssetStatus) => void;
  removeAsset: (assetId: string) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}
function save(key: string, val: unknown) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key, JSON.stringify(val)); } catch { /* quota — ignore */ }
}

export function CampaignProvider({ children }: { children: ReactNode }) {
  // Deterministic initial state for SSR; localStorage hydrates after mount.
  const [campaigns, setCampaigns] = useState<Campaign[]>(seedCampaigns);
  const [activeId, setActiveId] = useState<string>(seedCampaigns[0]?.id ?? "");
  const [tasks, setTasks] = useState<TaskMap>({});
  const [assignments, setAssignments] = useState<AssignMap>({});
  const [assets, setAssets] = useState<AssetMap>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const userMade = load<Campaign[]>(LS_CAMPAIGNS, []).filter((c) => !c.seeded);
    const all = [...seedCampaigns, ...userMade];
    if (userMade.length) setCampaigns(all);
    setActiveId(load<string>(LS_ACTIVE, all[0]?.id ?? ""));
    setTasks(load<TaskMap>(LS_TASKS, {}));
    setAssignments(load<AssignMap>(LS_ASSIGN, {}));
    setAssets(load<AssetMap>(LS_ASSETS, {}));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) save(LS_CAMPAIGNS, campaigns.filter((c) => !c.seeded)); }, [campaigns, hydrated]);
  useEffect(() => { if (hydrated) save(LS_ACTIVE, activeId); }, [activeId, hydrated]);
  useEffect(() => { if (hydrated) save(LS_TASKS, tasks); }, [tasks, hydrated]);
  useEffect(() => { if (hydrated) save(LS_ASSIGN, assignments); }, [assignments, hydrated]);
  useEffect(() => { if (hydrated) save(LS_ASSETS, assets); }, [assets, hydrated]);

  const active = useMemo(
    () => campaigns.find((c) => c.id === activeId) ?? campaigns[0] ?? null,
    [campaigns, activeId]
  );
  const activeTemplate = useMemo(() => getTemplate(active?.templateId), [active]);
  const activeChecklist = activeTemplate?.checklist ?? [];

  function addCampaign(c: Omit<Campaign, "id" | "seeded"> & { id?: string }) {
    const id = c.id ?? `c-${Date.now()}`;
    const created: Campaign = { ...c, id, seeded: false };
    setCampaigns((prev) => [...prev, created]);
    setTasks((prev) => ({ ...prev, [id]: {} }));
    setAssignments((prev) => ({ ...prev, [id]: [] }));
    setAssets((prev) => ({ ...prev, [id]: [] }));
    setActiveId(id);
    return created;
  }

  const isTaskDone = (itemId: string) => !!tasks[activeId]?.[itemId];
  function toggleTask(itemId: string) {
    setTasks((prev) => {
      const cur = prev[activeId] ?? {};
      return { ...prev, [activeId]: { ...cur, [itemId]: !cur[itemId] } };
    });
  }
  const taskProgress = useMemo(() => {
    const ids = activeChecklist.flatMap((p) => p.items.map((i) => i.id));
    if (!ids.length) return 0;
    const done = ids.filter((id) => tasks[activeId]?.[id]).length;
    return Math.round((done / ids.length) * 100);
  }, [activeChecklist, tasks, activeId]);

  const assignedIds = assignments[activeId] ?? [];
  const isAssigned = (creatorId: string) => (assignments[activeId] ?? []).includes(creatorId);
  function toggleAssignment(creatorId: string) {
    setAssignments((prev) => {
      const cur = prev[activeId] ?? [];
      return { ...prev, [activeId]: cur.includes(creatorId) ? cur.filter((x) => x !== creatorId) : [...cur, creatorId] };
    });
  }

  const activeAssets = assets[activeId] ?? [];
  function addAsset(a: Omit<UploadedAsset, "id" | "addedAt" | "status"> & { status?: AssetStatus }) {
    const item: UploadedAsset = {
      ...a,
      id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      status: a.status ?? "Draft",
      addedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit" }),
    };
    setAssets((prev) => ({ ...prev, [activeId]: [item, ...(prev[activeId] ?? [])] }));
  }
  function setAssetStatus(assetId: string, status: AssetStatus) {
    setAssets((prev) => ({ ...prev, [activeId]: (prev[activeId] ?? []).map((x) => (x.id === assetId ? { ...x, status } : x)) }));
  }
  function removeAsset(assetId: string) {
    setAssets((prev) => ({ ...prev, [activeId]: (prev[activeId] ?? []).filter((x) => x.id !== assetId) }));
  }

  return (
    <Ctx.Provider value={{
      campaigns, activeId, active, setActive: setActiveId, addCampaign,
      activeTemplate, activeChecklist, isTaskDone, toggleTask, taskProgress,
      assignedIds, isAssigned, toggleAssignment,
      activeAssets, addAsset, setAssetStatus, removeAsset,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCampaigns() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCampaigns outside provider");
  return c;
}
