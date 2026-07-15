import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedCampaigns, type Campaign, type ChecklistPhase } from "./campaign-data";
import { campaignTemplates, type CampaignTemplate } from "./campaign-templates";

/* Frontend-only persistent store (localStorage). Everything is scoped
   per-campaign: task checklist state, influencer assignments and uploaded
   assets. Survives route changes and refreshes. */

const LS_CAMPAIGNS = "rippl.campaigns.v2";
const LS_ACTIVE = "rippl.activeCampaign.v2";
const LS_TASKS = "rippl.tasks.v2";          // { [campaignId]: { [itemId]: boolean } }
const LS_ASSIGN = "rippl.assignments.v2";   // { [campaignId]: creatorId[] }
const LS_ASSETS = "rippl.assets.v2";        // { [campaignId]: UploadedAsset[] }
const LS_BUDGET = "rippl.budgetlines.v2";   // { [campaignId]: BudgetLineItem[] }
const LS_TEMPLATES = "rippl.customTemplates.v2"; // CampaignTemplate[] (user-made/edited)

export interface BudgetLineItem { id: string; category: string; planned: number; spent: number; kind: "Budget" | "Expense" | "Payment"; }

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

  activeBudgetLines: BudgetLineItem[];
  addBudgetLine: (line: Omit<BudgetLineItem, "id">) => void;
  updateBudgetLine: (id: string, patch: Partial<BudgetLineItem>) => void;
  removeBudgetLine: (id: string) => void;

  allTemplates: CampaignTemplate[];        // built-in + custom
  customTemplates: CampaignTemplate[];
  saveTemplate: (t: CampaignTemplate) => void;   // add or update a custom template
  deleteTemplate: (id: string) => void;
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
  const [budgetLines, setBudgetLines] = useState<Record<string, BudgetLineItem[]>>({});
  const [customTemplates, setCustomTemplates] = useState<CampaignTemplate[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const userMade = load<Campaign[]>(LS_CAMPAIGNS, []).filter((c) => !c.seeded);
    const all = [...seedCampaigns, ...userMade];
    if (userMade.length) setCampaigns(all);
    setActiveId(load<string>(LS_ACTIVE, all[0]?.id ?? ""));
    setTasks(load<TaskMap>(LS_TASKS, {}));
    setAssignments(load<AssignMap>(LS_ASSIGN, {}));
    setAssets(load<AssetMap>(LS_ASSETS, {}));
    setBudgetLines(load<Record<string, BudgetLineItem[]>>(LS_BUDGET, {}));
    setCustomTemplates(load<CampaignTemplate[]>(LS_TEMPLATES, []));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) save(LS_CAMPAIGNS, campaigns.filter((c) => !c.seeded)); }, [campaigns, hydrated]);
  useEffect(() => { if (hydrated) save(LS_ACTIVE, activeId); }, [activeId, hydrated]);
  useEffect(() => { if (hydrated) save(LS_TASKS, tasks); }, [tasks, hydrated]);
  useEffect(() => { if (hydrated) save(LS_ASSIGN, assignments); }, [assignments, hydrated]);
  useEffect(() => { if (hydrated) save(LS_ASSETS, assets); }, [assets, hydrated]);
  useEffect(() => { if (hydrated) save(LS_BUDGET, budgetLines); }, [budgetLines, hydrated]);
  useEffect(() => { if (hydrated) save(LS_TEMPLATES, customTemplates); }, [customTemplates, hydrated]);

  const active = useMemo(
    () => campaigns.find((c) => c.id === activeId) ?? campaigns[0] ?? null,
    [campaigns, activeId]
  );
  const allTemplates = useMemo(() => [...campaignTemplates, ...customTemplates], [customTemplates]);
  const activeTemplate = useMemo(() => allTemplates.find((t) => t.id === active?.templateId), [allTemplates, active]);
  const activeChecklist = activeTemplate?.checklist ?? [];

  function saveTemplate(t: CampaignTemplate) {
    setCustomTemplates((prev) => (prev.some((x) => x.id === t.id) ? prev.map((x) => (x.id === t.id ? t : x)) : [...prev, t]));
  }
  function deleteTemplate(id: string) { setCustomTemplates((prev) => prev.filter((x) => x.id !== id)); }

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

  const activeBudgetLines = budgetLines[activeId] ?? [];
  function addBudgetLine(line: Omit<BudgetLineItem, "id">) {
    setBudgetLines((prev) => ({ ...prev, [activeId]: [{ ...line, id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 5)}` }, ...(prev[activeId] ?? [])] }));
  }
  function updateBudgetLine(id: string, patch: Partial<BudgetLineItem>) {
    setBudgetLines((prev) => ({ ...prev, [activeId]: (prev[activeId] ?? []).map((x) => x.id === id ? { ...x, ...patch } : x) }));
  }
  function removeBudgetLine(id: string) {
    setBudgetLines((prev) => ({ ...prev, [activeId]: (prev[activeId] ?? []).filter((x) => x.id !== id) }));
  }

  return (
    <Ctx.Provider value={{
      campaigns, activeId, active, setActive: setActiveId, addCampaign,
      activeTemplate, activeChecklist, isTaskDone, toggleTask, taskProgress,
      assignedIds, isAssigned, toggleAssignment,
      activeAssets, addAsset, setAssetStatus, removeAsset,
      activeBudgetLines, addBudgetLine, updateBudgetLine, removeBudgetLine,
      allTemplates, customTemplates, saveTemplate, deleteTemplate,
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
