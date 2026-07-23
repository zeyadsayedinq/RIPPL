import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  seedCampaigns,
  type Campaign,
  type ChecklistPhase,
} from "./campaign-data";
import { campaignTemplates, type CampaignTemplate } from "./campaign-templates";
import { loadState, saveState } from "./cloud";
import { useOS } from "./os-store";
import { supabase } from "./supabase";
import { pushSharedEdit } from "./shared-workspace";
import type { Creator } from "./mock-data";

/* Frontend-only persistent store (localStorage). Everything is scoped
   per-campaign: task checklist state, influencer assignments and uploaded
   assets. Survives route changes and refreshes. */

const LS_CAMPAIGNS = "rippl.campaigns.v2";
const LS_ACTIVE = "rippl.activeCampaign.v2";
const LS_TASKS = "rippl.tasks.v2"; // { [campaignId]: { [itemId]: boolean } }
const LS_ASSIGN = "rippl.assignments.v2"; // { [campaignId]: creatorId[] }
const LS_ASSETS = "rippl.assets.v2"; // { [campaignId]: UploadedAsset[] }
const LS_BUDGET = "rippl.budgetlines.v2"; // { [campaignId]: BudgetLineItem[] }
const LS_TEMPLATES = "rippl.customTemplates.v2"; // CampaignTemplate[] (user-made/edited)
const LS_EVENTS = "rippl.calendarEvents.v1"; // { [campaignId]: CalendarPost[] }

export interface BudgetLineItem {
  id: string;
  category: string;
  planned: number;
  spent: number;
  kind: "Budget" | "Expense" | "Payment";
}

export type AssetStatus =
  "Draft" | "Under Review" | "Approved" | "Needs Revision";
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

/* RIPPL v3.0 plan: "Interactive Content Calendar — a functional,
   drag-and-drop organizer for Instagram, TikTok, and YouTube posting
   schedules." Unlike the template rollout timeline (read-only reference
   milestones), these are real per-campaign posts with real dates, so
   they're the part that's actually draggable. */
export type CalendarPlatform =
  "TikTok" | "Instagram" | "YouTube" | "Facebook" | "X" | "Other";
export interface CalendarPost {
  id: string;
  title: string;
  date: string;
  platform: CalendarPlatform;
}
type EventMap = Record<string, CalendarPost[]>;

interface StoreCtx {
  campaigns: Campaign[];
  activeId: string;
  active: Campaign | null;
  /** active campaign was assigned by HQ (not created by this account) */
  activeIsShared: boolean;
  /** false only when the active campaign is HQ-assigned view-only */
  activeEditable: boolean;
  setActive: (id: string) => void;
  addCampaign: (
    c: Omit<Campaign, "id" | "seeded"> & { id?: string },
  ) => Campaign;
  /** Patch the active campaign's real platform links (see CampaignLinks) — owner-only, not part of the shared-member edit model. */
  updateActiveLinks: (
    patch: Partial<import("./campaign-data").CampaignLinks>,
  ) => void;
  /** Edit/delete an owned campaign (no-op for HQ-assigned shared campaigns). */
  updateCampaign: (
    id: string,
    patch: Partial<Omit<Campaign, "id" | "seeded">>,
  ) => void;
  deleteCampaign: (id: string) => void;
  /** true when a campaign id was assigned by HQ (view-only here — edit/delete from HQ's own account). */
  isCampaignShared: (id: string) => boolean;

  activeTemplate: CampaignTemplate | undefined;
  activeChecklist: ChecklistPhase[];
  isTaskDone: (itemId: string) => boolean;
  toggleTask: (itemId: string) => void;
  taskProgress: number;

  assignedIds: string[];
  isAssigned: (creatorId: string) => boolean;
  toggleAssignment: (creatorId: string) => void;

  /** Full creator records HQ shared via campaigns assigned to this account
      (empty for HQ's own account — HQ just reads its own `creators`). */
  sharedCreators: Creator[];
  isSharedCreator: (creatorId: string) => boolean;
  /** true if this account can edit that creator's record (assigned to a
      shared campaign this account has edit access to). */
  canEditSharedCreator: (creatorId: string) => boolean;
  /** Push a creator edit back to HQ; no-ops if not editable. */
  pushCreatorEdit: (creator: Creator) => void;

  activeAssets: UploadedAsset[];
  addAsset: (
    a: Omit<UploadedAsset, "id" | "addedAt" | "status"> & {
      status?: AssetStatus;
    },
  ) => void;
  setAssetStatus: (assetId: string, status: AssetStatus) => void;
  removeAsset: (assetId: string) => void;

  activeBudgetLines: BudgetLineItem[];
  addBudgetLine: (line: Omit<BudgetLineItem, "id">) => void;
  updateBudgetLine: (id: string, patch: Partial<BudgetLineItem>) => void;
  removeBudgetLine: (id: string) => void;

  allTemplates: CampaignTemplate[]; // built-in + custom
  customTemplates: CampaignTemplate[];
  saveTemplate: (t: CampaignTemplate) => void; // add or update a custom template
  deleteTemplate: (id: string) => void;

  activeEvents: CalendarPost[];
  addEvent: (e: Omit<CalendarPost, "id">) => void;
  moveEvent: (id: string, date: string) => void;
  removeEvent: (id: string) => void;
}

const Ctx = createContext<StoreCtx | null>(null);
const save = (key: string, val: unknown) => {
  void saveState(key, val);
};

/* Defensive guards — persisted data may predate a schema change or be
   corrupt, so never trust its shape blindly (see os-store.tsx normalizeOS
   for the /admin crash this pattern was introduced to prevent). */
const asArray = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const asObject = <T extends object>(v: unknown): T =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as T) : ({} as T);

export function CampaignProvider({ children }: { children: ReactNode }) {
  // Deterministic initial state for SSR; localStorage hydrates after mount.
  const [campaigns, setCampaigns] = useState<Campaign[]>(seedCampaigns);
  const [activeId, setActiveId] = useState<string>(seedCampaigns[0]?.id ?? "");
  const [tasks, setTasks] = useState<TaskMap>({});
  const [assignments, setAssignments] = useState<AssignMap>({});
  const [assets, setAssets] = useState<AssetMap>({});
  const [budgetLines, setBudgetLines] = useState<
    Record<string, BudgetLineItem[]>
  >({});
  const [customTemplates, setCustomTemplates] = useState<CampaignTemplate[]>(
    [],
  );
  const [events, setEvents] = useState<EventMap>({});
  const [hydrated, setHydrated] = useState(false);
  /* Wipe guard — see os-store.tsx: never let an empty first load auto-save
     over real cloud data. Saves only run after a user mutation (or when
     hydration itself produced content). */
  const dirty = useRef(false);

  /* ── HQ-assigned campaigns (see shared-workspace.ts / os-store.tsx) ──
     Members get campaigns HQ assigned to them merged in read-only, or
     editable when HQ granted edit access. Their collaboration data
     (tasks/assets/budget/events) lives in `sharedData`, NOT in this
     account's own persisted maps. */
  const { shared } = useOS();
  const sharedCampaigns = useMemo(() => shared?.campaigns ?? [], [shared]);
  const sharedCampaignIds = useMemo(
    () => new Set(sharedCampaigns.map((c) => c.id)),
    [sharedCampaigns],
  );
  const canEditShared = (id: string) => !!shared?.editable.includes(id);
  const [sharedData, setSharedData] = useState<{
    tasks: TaskMap;
    assets: AssetMap;
    budget: Record<string, BudgetLineItem[]>;
    events: EventMap;
    assignments: AssignMap;
  }>({ tasks: {}, assets: {}, budget: {}, events: {}, assignments: {} });
  useEffect(() => {
    if (shared)
      setSharedData({
        tasks: asObject(shared.tasks),
        assets: asObject(shared.assets),
        budget: asObject(shared.budget),
        events: asObject(shared.events),
        assignments: asObject(shared.assignments),
      });
  }, [shared]);

  /* Full creator records (deliverable link/file, status, messages) for
     creators assigned to one of this account's shared campaigns. Optimistic
     local overrides give instant UI feedback on edit before the debounced
     push to HQ lands; the base list refreshes from `shared` on refetch. */
  const [sharedCreatorOverrides, setSharedCreatorOverrides] = useState<
    Record<string, Creator>
  >({});
  const sharedCreators = useMemo(() => {
    const base = shared?.creators ?? [];
    return base.map((c) => sharedCreatorOverrides[c.id] ?? c);
  }, [shared, sharedCreatorOverrides]);
  const sharedCreatorIds = useMemo(
    () => new Set((shared?.creators ?? []).map((c) => c.id)),
    [shared],
  );
  const isSharedCreator = (creatorId: string) =>
    sharedCreatorIds.has(creatorId);
  /** First shared campaign this account can edit that has `creatorId`
      assigned — the campaign id the server needs to authorize the push. */
  function editableSharedCampaignFor(creatorId: string): string | undefined {
    return Object.keys(sharedData.assignments).find(
      (cid) =>
        (sharedData.assignments[cid] ?? []).includes(creatorId) &&
        canEditShared(cid),
    );
  }
  const canEditSharedCreator = (creatorId: string) =>
    !!editableSharedCampaignFor(creatorId);
  const creatorPushTimer = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});
  function pushCreatorEdit(creator: Creator) {
    const campaignId = editableSharedCampaignFor(creator.id);
    if (!campaignId || !supabase) return;
    setSharedCreatorOverrides((p) => ({ ...p, [creator.id]: creator }));
    clearTimeout(creatorPushTimer.current[creator.id]);
    creatorPushTimer.current[creator.id] = setTimeout(async () => {
      const { data: s } = await supabase!.auth.getSession();
      const token = s.session?.access_token;
      if (token)
        void pushSharedEdit({
          data: { accessToken: token, kind: "creator", campaignId, creator },
        });
    }, 600);
  }

  // Heal the historical leak: HQ campaigns (and their per-campaign data)
  // that were copied into this account via the shared localStorage cache.
  useEffect(() => {
    if (!shared || !hydrated) return;
    const hq = new Set(shared.hqIds);
    const dropHq = <T,>(m: Record<string, T>) =>
      Object.fromEntries(Object.entries(m).filter(([k]) => !hq.has(k)));
    dirty.current = true; // healed state must persist
    setCampaigns((prev) => prev.filter((c) => c.seeded || !hq.has(c.id)));
    setTasks((p) => dropHq(p));
    setAssets((p) => dropHq(p));
    setBudgetLines((p) => dropHq(p));
    setEvents((p) => dropHq(p));
    setAssignments((p) => dropHq(p));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shared, hydrated]);

  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function pushCampaignData(
    campaignId: string,
    patch: Partial<{
      tasks: Record<string, boolean>;
      assets: UploadedAsset[];
      budget: BudgetLineItem[];
      events: CalendarPost[];
      assignments: string[];
    }>,
  ) {
    if (!supabase || !canEditShared(campaignId)) return;
    if (pushTimer.current) clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(async () => {
      const { data: s } = await supabase!.auth.getSession();
      const token = s.session?.access_token;
      if (token)
        void pushSharedEdit({
          data: {
            accessToken: token,
            kind: "campaignData",
            campaignId,
            ...patch,
          },
        });
    }, 600);
  }

  useEffect(() => {
    (async () => {
      const userMade = asArray<Campaign>(
        await loadState<Campaign[]>(LS_CAMPAIGNS, []),
      ).filter((c) => c && !c.seeded);
      const all = [...seedCampaigns, ...userMade];
      if (userMade.length) setCampaigns(all);
      setActiveId(await loadState<string>(LS_ACTIVE, all[0]?.id ?? ""));
      const tk = asObject<TaskMap>(await loadState<TaskMap>(LS_TASKS, {}));
      const asg = asObject<AssignMap>(
        await loadState<AssignMap>(LS_ASSIGN, {}),
      );
      const ast = asObject<AssetMap>(await loadState<AssetMap>(LS_ASSETS, {}));
      const bl = asObject<Record<string, BudgetLineItem[]>>(
        await loadState<Record<string, BudgetLineItem[]>>(LS_BUDGET, {}),
      );
      const tpl = asArray<CampaignTemplate>(
        await loadState<CampaignTemplate[]>(LS_TEMPLATES, []),
      );
      const ev = asObject<EventMap>(await loadState<EventMap>(LS_EVENTS, {}));
      setTasks(tk);
      setAssignments(asg);
      setAssets(ast);
      setBudgetLines(bl);
      setCustomTemplates(tpl);
      setEvents(ev);
      if (
        userMade.length ||
        [tk, asg, ast, bl, tpl, ev].some(
          (m) => (Array.isArray(m) ? m.length : Object.keys(m).length) > 0,
        )
      )
        dirty.current = true;
      setHydrated(true);
    })();
  }, []);

  useEffect(() => {
    if (hydrated && dirty.current)
      save(
        LS_CAMPAIGNS,
        campaigns.filter((c) => !c.seeded),
      );
  }, [campaigns, hydrated]);
  useEffect(() => {
    if (hydrated && dirty.current) save(LS_ACTIVE, activeId);
  }, [activeId, hydrated]);
  useEffect(() => {
    if (hydrated && dirty.current) save(LS_TASKS, tasks);
  }, [tasks, hydrated]);
  useEffect(() => {
    if (hydrated && dirty.current) save(LS_ASSIGN, assignments);
  }, [assignments, hydrated]);
  useEffect(() => {
    if (hydrated && dirty.current) save(LS_ASSETS, assets);
  }, [assets, hydrated]);
  useEffect(() => {
    if (hydrated && dirty.current) save(LS_BUDGET, budgetLines);
  }, [budgetLines, hydrated]);
  useEffect(() => {
    if (hydrated && dirty.current) save(LS_TEMPLATES, customTemplates);
  }, [customTemplates, hydrated]);
  useEffect(() => {
    if (hydrated && dirty.current) save(LS_EVENTS, events);
  }, [events, hydrated]);

  /* Own campaigns + whatever HQ assigned to this account. */
  const allCampaigns = useMemo(
    () => [
      ...campaigns,
      ...sharedCampaigns.filter((c) => !campaigns.some((o) => o.id === c.id)),
    ],
    [campaigns, sharedCampaigns],
  );
  const active = useMemo(
    () =>
      allCampaigns.find((c) => c.id === activeId) ?? allCampaigns[0] ?? null,
    [allCampaigns, activeId],
  );
  const activeIsShared = !!active && sharedCampaignIds.has(active.id);
  const activeEditable = !activeIsShared || canEditShared(active?.id ?? "");
  const allTemplates = useMemo(
    () => [
      ...campaignTemplates,
      ...customTemplates,
      ...(shared?.templates ?? []).filter(
        (t) =>
          !campaignTemplates.some((b) => b.id === t.id) &&
          !customTemplates.some((c) => c.id === t.id),
      ),
    ],
    [customTemplates, shared],
  );
  const activeTemplate = useMemo(
    () => allTemplates.find((t) => t.id === active?.templateId),
    [allTemplates, active],
  );
  const activeChecklist = activeTemplate?.checklist ?? [];

  function saveTemplate(t: CampaignTemplate) {
    dirty.current = true;
    setCustomTemplates((prev) =>
      prev.some((x) => x.id === t.id)
        ? prev.map((x) => (x.id === t.id ? t : x))
        : [...prev, t],
    );
  }
  function deleteTemplate(id: string) {
    dirty.current = true;
    setCustomTemplates((prev) => prev.filter((x) => x.id !== id));
  }

  function addCampaign(c: Omit<Campaign, "id" | "seeded"> & { id?: string }) {
    dirty.current = true;
    const id = c.id ?? `c-${Date.now()}`;
    const created: Campaign = { ...c, id, seeded: false };
    setCampaigns((prev) => [...prev, created]);
    setTasks((prev) => ({ ...prev, [id]: {} }));
    setAssignments((prev) => ({ ...prev, [id]: [] }));
    setAssets((prev) => ({ ...prev, [id]: [] }));
    setActiveId(id);
    return created;
  }

  function updateActiveLinks(
    patch: Partial<import("./campaign-data").CampaignLinks>,
  ) {
    if (!activeId || activeIsShared) return; // links are HQ-owned metadata, not part of the member share model
    dirty.current = true;
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === activeId ? { ...c, links: { ...c.links, ...patch } } : c,
      ),
    );
  }

  /* Edit/delete a campaign this account owns. HQ-assigned campaigns aren't
     in `campaigns` at all (they live in `sharedCampaigns`, sourced from
     HQ's own workspace) — editing/deleting those from here would silently
     no-op against the wrong data, so both bail out for shared ids. */
  function updateCampaign(
    id: string,
    patch: Partial<Omit<Campaign, "id" | "seeded">>,
  ) {
    if (sharedCampaignIds.has(id)) return;
    dirty.current = true;
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    );
  }

  function deleteCampaign(id: string) {
    if (sharedCampaignIds.has(id)) return;
    dirty.current = true;
    const remainingOwn = campaigns.filter((c) => c.id !== id);
    setCampaigns(remainingOwn);
    if (activeId === id)
      setActiveId(remainingOwn[0]?.id ?? sharedCampaigns[0]?.id ?? "");
    const drop = <T,>(m: Record<string, T>) => {
      const next = { ...m };
      delete next[id];
      return next;
    };
    setTasks((p) => drop(p));
    setAssignments((p) => drop(p));
    setAssets((p) => drop(p));
    setBudgetLines((p) => drop(p));
    setEvents((p) => drop(p));
  }

  /* Every per-campaign read/write goes through these: shared campaigns
     read from sharedData and (with edit access) write back to HQ;
     view-only mutations are silently ignored. */
  const taskMapFor = (cid: string) =>
    (sharedCampaignIds.has(cid) ? sharedData.tasks[cid] : tasks[cid]) ?? {};

  const isTaskDone = (itemId: string) => !!taskMapFor(activeId)[itemId];
  function toggleTask(itemId: string) {
    if (activeIsShared) {
      if (!activeEditable) return;
      const next = {
        ...taskMapFor(activeId),
        [itemId]: !taskMapFor(activeId)[itemId],
      };
      setSharedData((p) => ({ ...p, tasks: { ...p.tasks, [activeId]: next } }));
      pushCampaignData(activeId, { tasks: next });
      return;
    }
    dirty.current = true;
    setTasks((prev) => {
      const cur = prev[activeId] ?? {};
      return { ...prev, [activeId]: { ...cur, [itemId]: !cur[itemId] } };
    });
  }
  const taskProgress = useMemo(() => {
    const ids = activeChecklist.flatMap((p) => p.items.map((i) => i.id));
    if (!ids.length) return 0;
    const map =
      (sharedCampaignIds.has(activeId)
        ? sharedData.tasks[activeId]
        : tasks[activeId]) ?? {};
    const done = ids.filter((id) => map[id]).length;
    return Math.round((done / ids.length) * 100);
  }, [activeChecklist, tasks, activeId, sharedCampaignIds, sharedData.tasks]);

  /* Generic helper for the array-valued per-campaign maps. Routes shared/
     HQ-assigned campaigns through pushCampaignData (server-verified edit
     access) instead of writing into this account's own local map, where
     the write would appear to "save" but never sync anywhere and vanish
     on reload. */
  function mutateList<T>(
    kind: "assets" | "budget" | "events" | "assignments",
    own: [
      Record<string, T[]>,
      React.Dispatch<React.SetStateAction<Record<string, T[]>>>,
    ],
    fn: (cur: T[]) => T[],
  ) {
    if (activeIsShared) {
      if (!activeEditable) return;
      const next = fn((sharedData[kind][activeId] as T[] | undefined) ?? []);
      setSharedData((p) => ({
        ...p,
        [kind]: { ...p[kind], [activeId]: next },
      }));
      pushCampaignData(activeId, { [kind]: next } as Partial<{
        assets: UploadedAsset[];
        budget: BudgetLineItem[];
        events: CalendarPost[];
        assignments: string[];
      }>);
      return;
    }
    dirty.current = true;
    own[1]((prev) => ({ ...prev, [activeId]: fn(prev[activeId] ?? []) }));
  }

  const assignedIds =
    (activeIsShared
      ? sharedData.assignments[activeId]
      : assignments[activeId]) ?? [];
  const isAssigned = (creatorId: string) => assignedIds.includes(creatorId);
  function toggleAssignment(creatorId: string) {
    mutateList<string>("assignments", [assignments, setAssignments], (cur) =>
      cur.includes(creatorId)
        ? cur.filter((x) => x !== creatorId)
        : [...cur, creatorId],
    );
  }

  const activeAssets =
    (activeIsShared ? sharedData.assets[activeId] : assets[activeId]) ?? [];
  function addAsset(
    a: Omit<UploadedAsset, "id" | "addedAt" | "status"> & {
      status?: AssetStatus;
    },
  ) {
    const item: UploadedAsset = {
      ...a,
      id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      status: a.status ?? "Draft",
      addedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
    };
    mutateList<UploadedAsset>("assets", [assets, setAssets], (cur) => [
      item,
      ...cur,
    ]);
  }
  function setAssetStatus(assetId: string, status: AssetStatus) {
    mutateList<UploadedAsset>("assets", [assets, setAssets], (cur) =>
      cur.map((x) => (x.id === assetId ? { ...x, status } : x)),
    );
  }
  function removeAsset(assetId: string) {
    mutateList<UploadedAsset>("assets", [assets, setAssets], (cur) =>
      cur.filter((x) => x.id !== assetId),
    );
  }

  const activeBudgetLines =
    (activeIsShared ? sharedData.budget[activeId] : budgetLines[activeId]) ??
    [];
  function addBudgetLine(line: Omit<BudgetLineItem, "id">) {
    mutateList<BudgetLineItem>(
      "budget",
      [budgetLines, setBudgetLines],
      (cur) => [
        {
          ...line,
          id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        },
        ...cur,
      ],
    );
  }
  function updateBudgetLine(id: string, patch: Partial<BudgetLineItem>) {
    mutateList<BudgetLineItem>("budget", [budgetLines, setBudgetLines], (cur) =>
      cur.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    );
  }
  function removeBudgetLine(id: string) {
    mutateList<BudgetLineItem>("budget", [budgetLines, setBudgetLines], (cur) =>
      cur.filter((x) => x.id !== id),
    );
  }

  const activeEvents =
    (activeIsShared ? sharedData.events[activeId] : events[activeId]) ?? [];
  function addEvent(e: Omit<CalendarPost, "id">) {
    const item: CalendarPost = {
      ...e,
      id: `ce-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    mutateList<CalendarPost>("events", [events, setEvents], (cur) => [
      ...cur,
      item,
    ]);
  }
  function moveEvent(id: string, date: string) {
    mutateList<CalendarPost>("events", [events, setEvents], (cur) =>
      cur.map((x) => (x.id === id ? { ...x, date } : x)),
    );
  }
  function removeEvent(id: string) {
    mutateList<CalendarPost>("events", [events, setEvents], (cur) =>
      cur.filter((x) => x.id !== id),
    );
  }

  return (
    <Ctx.Provider
      value={{
        campaigns: allCampaigns,
        activeId,
        active,
        activeIsShared,
        activeEditable,
        setActive: (id: string) => {
          dirty.current = true;
          setActiveId(id);
        },
        addCampaign,
        updateActiveLinks,
        updateCampaign,
        deleteCampaign,
        isCampaignShared: (id: string) => sharedCampaignIds.has(id),
        activeTemplate,
        activeChecklist,
        isTaskDone,
        toggleTask,
        taskProgress,
        assignedIds,
        isAssigned,
        toggleAssignment,
        sharedCreators,
        isSharedCreator,
        canEditSharedCreator,
        pushCreatorEdit,
        activeAssets,
        addAsset,
        setAssetStatus,
        removeAsset,
        activeBudgetLines,
        addBudgetLine,
        updateBudgetLine,
        removeBudgetLine,
        allTemplates,
        customTemplates,
        saveTemplate,
        deleteTemplate,
        activeEvents,
        addEvent,
        moveEvent,
        removeEvent,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCampaigns() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCampaigns outside provider");
  return c;
}
