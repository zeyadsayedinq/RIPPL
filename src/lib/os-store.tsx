import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { loadState, saveState, cloudEnabled } from "./cloud";
import { supabase } from "./supabase";
import { fetchShared, pushSharedEdit, type SharedPayload } from "./shared-workspace";

/* ═══════════════════════════════════════════════════════════
   RIPPL PERSONAL OS — global frontend-only store (localStorage).
   Powers Roster CRM, Releases, Vault, Studio, Tech Lab, plus the
   global command palette, audio player and quick-action FAB.
═══════════════════════════════════════════════════════════ */

export type ScoutStage = "Discovered" | "Evaluating" | "Negotiating" | "Signed";
export interface Artist {
  id: string; name: string; kind: "Music" | "Influencer";
  handle: string; streams: string; followers: string;
  stage: ScoutStage; managed: boolean; note?: string;
}

export type DealStatus = "Pitching" | "Contracting" | "In Production" | "Live" | "Paid";
export interface Deal { id: string; brand: string; artist: string; deliverables: string; value: number; split: number; status: DealStatus; }

export type ContentId = "red" | "yellow" | "green";
export interface Release {
  id: string; title: string; artist: string; isrc: string; upc: string;
  releaseDate: string; contentId: ContentId; status: "Draft" | "Scheduled" | "Live";
  dsp: { spotify: boolean; anghami: boolean; youtube: boolean };
  qa: { atmos: boolean; eq: boolean };
  campaignId?: string;
}

export type ContractTag = "Split Sheet" | "Exclusive Recording" | "Sync License" | "Management" | "Other";
export interface Contract { id: string; name: string; tag: ContractTag; expiresOn: string; fileName: string; filePath?: string; }

export interface Note { id: string; title: string; body: string; updatedAt: string; }
export interface MoodItem { id: string; url: string; caption: string; }
export type SprintCol = "Backlog" | "In Progress" | "Done";
export interface SprintTask { id: string; title: string; col: SprintCol; }
export interface SaasProject { id: string; name: string; deploy: "Building" | "Ready" | "Error"; tasks: SprintTask[]; }
export interface Prompt { id: string; title: string; category: string; body: string; }
export interface Track {
  id: string; title: string; artist: string; url?: string; path?: string; bpm?: number;
  key?: string; energy?: number; mood?: string; hitScore?: number;
}
export type MemberRole = "Admin" | "Manager" | "A&R" | "Marketing" | "Creator" | "Viewer";
export interface Member {
  id: string; email: string; name: string; role: MemberRole;
  campaigns: string[]; releases: string[]; tracks: string[]; contracts: string[];
  /** ids (from the lists above) this member may EDIT; everything else assigned is view-only */
  edit: string[];
}

export interface MoodboardScene { elements: unknown[]; appState: Record<string, unknown> }

interface OS {
  artists: Artist[]; deals: Deal[]; releases: Release[]; contracts: Contract[];
  notes: Note[]; mood: MoodItem[]; projects: SaasProject[]; prompts: Prompt[]; tracks: Track[];
  todos: { id: string; label: string; done: boolean; snoozed: boolean; delegated: boolean }[];
  members: Member[];
  moodboardScene: MoodboardScene | null;
}

/* Empty by default — the app starts as a clean slate and everything you add
   is saved to Supabase. Use the + button / module pages to populate it. */
const seed: OS = {
  artists: [], deals: [], releases: [], contracts: [], notes: [], mood: [],
  projects: [], prompts: [], tracks: [], todos: [], members: [],
  moodboardScene: null,
};

const LS = "rippl.os.v2";

/* Merge whatever was actually persisted (which may predate newer fields —
   e.g. `members` didn't exist before the HQ Admin panel shipped, and older
   Member records don't have campaigns/releases/tracks/contracts) with the
   current default shape. Without this, a render like `members.length` or
   `m.campaigns.length` throws "Cannot read properties of undefined" and
   the whole route crashes (this was the /admin bug). */
function normalizeOS(raw: Partial<OS> | null | undefined): OS {
  const o: OS = { ...seed, ...(raw ?? {}) };
  // Only force array-shaped defaults back onto fields that are actually
  // supposed to be arrays — non-array fields (like moodboardScene) must be
  // left alone here or they'd get silently wiped back to their seed value
  // on every load.
  for (const key of Object.keys(seed) as (keyof OS)[]) {
    if (Array.isArray((seed as any)[key]) && !Array.isArray(o[key])) (o as any)[key] = (seed as any)[key];
  }
  o.members = (o.members ?? []).filter(Boolean).map((m) => ({
    id: m.id, email: m.email, name: m.name, role: m.role,
    campaigns: Array.isArray(m.campaigns) ? m.campaigns : [],
    releases: Array.isArray(m.releases) ? m.releases : [],
    tracks: Array.isArray(m.tracks) ? m.tracks : [],
    contracts: Array.isArray(m.contracts) ? m.contracts : [],
    edit: Array.isArray(m.edit) ? m.edit : [],
  }));
  return o;
}

/* Collections that HQ can assign to members (see /admin + shared-workspace.ts). */
type SharedKey = "releases" | "tracks" | "contracts";
const SHARED_KEYS: SharedKey[] = ["releases", "tracks", "contracts"];

interface Ctx extends OS {
  set: <K extends keyof OS>(key: K, val: OS[K]) => void;
  update: <K extends keyof OS>(key: K, fn: (cur: OS[K]) => OS[K]) => void;
  /** true when the item was assigned by HQ (not created by this account) */
  isShared: (id: string) => boolean;
  /** false only for HQ-assigned items the member has no edit access to */
  canEdit: (id: string) => boolean;
  /** shared campaign data for campaign-store (null for HQ / signed-out) */
  shared: SharedPayload | null;
  // global UI
  paletteOpen: boolean; setPaletteOpen: (b: boolean) => void;
  currentTrack: Track | null; playing: boolean;
  playTrack: (t: Track) => void; togglePlay: () => void;
}
const C = createContext<Ctx | null>(null);

export function OSProvider({ children }: { children: ReactNode }) {
  const [os, setOs] = useState<OS>(seed);
  const [shared, setShared] = useState<SharedPayload | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const pushTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    (async () => {
      let own = normalizeOS(await loadState<Partial<OS>>(LS, seed));
      // Members: fetch what HQ assigned to this account (server-side filtered).
      if (cloudEnabled && supabase) {
        try {
          const { data: s } = await supabase.auth.getSession();
          const token = s.session?.access_token;
          if (token) {
            const res = await fetchShared({ data: { accessToken: token } });
            if (res.ok && res.payload) {
              const hq = new Set(res.payload.hqIds);
              // Heal the historical leak: copies of HQ's items that got
              // synced into this account's own state (via the shared
              // localStorage cache) are recognized by id and dropped —
              // the member's OWN creations have different ids and stay.
              for (const k of SHARED_KEYS) own = { ...own, [k]: own[k].filter((x) => !hq.has(x.id)) };
              own = { ...own, artists: own.artists.filter((x) => !hq.has(x.id)), deals: own.deals.filter((x) => !hq.has(x.id)), notes: own.notes.filter((x) => !hq.has(x.id)), mood: own.mood.filter((x) => !hq.has(x.id)), projects: own.projects.filter((x) => !hq.has(x.id)), prompts: own.prompts.filter((x) => !hq.has(x.id)), todos: own.todos.filter((x) => !hq.has(x.id)), members: [] };
              setShared(res.payload);
            }
          }
        } catch { /* offline / server fn unavailable — show own data only */ }
      }
      setOs(own);
      setHydrated(true);
    })();
  }, []);
  useEffect(() => { if (hydrated) { void saveState(LS, os); } }, [os, hydrated]);

  // Cmd/Ctrl + K
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPaletteOpen((o) => !o); }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const sharedIds = (key: SharedKey) => new Set((shared?.[key] ?? []).map((x) => x.id));
  const editableSet = new Set(shared?.editable ?? []);
  const isShared = (id: string) => !!shared && (sharedIds("releases").has(id) || sharedIds("tracks").has(id) || sharedIds("contracts").has(id) || (shared.campaigns ?? []).some((c) => c.id === id));
  const canEdit = (id: string) => !isShared(id) || editableSet.has(id);

  /* Persist an edited HQ-assigned item back to HQ's workspace (debounced
     per item; server re-checks edit permission with the service key). */
  function pushEdit(kind: "release" | "track" | "contract", item: Release | Track | Contract) {
    if (!supabase) return;
    const tKey = `${kind}:${item.id}`;
    clearTimeout(pushTimers.current[tKey]);
    pushTimers.current[tKey] = setTimeout(async () => {
      const { data: s } = await supabase!.auth.getSession();
      const token = s.session?.access_token;
      if (token) void pushSharedEdit({ data: { accessToken: token, kind, item } });
    }, 600);
  }

  /* set/update operate on the MERGED view (own + assigned). Results are
     split back apart: own items → this account's state; edited assigned
     items → pushed to HQ if the member has edit access, silently reverted
     if view-only. Assigned items can never be deleted by a member — they
     simply reappear (un-assign them from /admin instead). */
  function applyShared<K extends keyof OS>(key: K, next: OS[K]): OS[K] {
    if (!shared || !SHARED_KEYS.includes(key as SharedKey)) return next;
    const k = key as SharedKey;
    const sIds = sharedIds(k);
    const arr = next as { id: string }[];
    const nextOwn = arr.filter((x) => !sIds.has(x.id));
    // detect changes to assigned items
    const kindOf: Record<SharedKey, "release" | "track" | "contract"> = { releases: "release", tracks: "track", contracts: "contract" };
    const nextSharedArr = (shared[k] as { id: string }[]).map((prev) => {
      const cand = arr.find((x) => x.id === prev.id);
      if (!cand || JSON.stringify(cand) === JSON.stringify(prev)) return prev; // unchanged or deleted → keep
      if (!editableSet.has(prev.id)) return prev; // view-only → revert
      pushEdit(kindOf[k], cand as Release & Track & Contract);
      return cand;
    });
    setShared((p) => (p ? { ...p, [k]: nextSharedArr } : p));
    return nextOwn as OS[K];
  }

  function set<K extends keyof OS>(key: K, val: OS[K]) { setOs((p) => ({ ...p, [key]: applyShared(key, val) })); }
  function update<K extends keyof OS>(key: K, fn: (cur: OS[K]) => OS[K]) {
    setOs((p) => {
      const merged = shared && SHARED_KEYS.includes(key as SharedKey)
        ? ([...(p[key] as unknown[]), ...(shared[key as SharedKey] as unknown[])] as OS[K])
        : p[key];
      return { ...p, [key]: applyShared(key, fn(merged)) };
    });
  }

  function playTrack(t: Track) { setCurrentTrack(t); setPlaying(true); }
  function togglePlay() { setPlaying((p) => !p); }

  /* Exposed view = own items + whatever HQ assigned to this account. */
  const view: OS = shared
    ? {
        ...os,
        releases: [...os.releases, ...shared.releases],
        tracks: [...os.tracks, ...shared.tracks],
        contracts: [...os.contracts, ...shared.contracts],
      }
    : os;

  return (
    <C.Provider value={{ ...view, set, update, isShared, canEdit, shared, paletteOpen, setPaletteOpen, currentTrack, playing, playTrack, togglePlay }}>
      {children}
    </C.Provider>
  );
}

export function useOS() {
  const c = useContext(C);
  if (!c) throw new Error("useOS outside provider");
  return c;
}

export const uid = (p = "x") => `${p}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
