import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loadState, saveState } from "./cloud";

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
}

export type ContractTag = "Split Sheet" | "Exclusive Recording" | "Sync License" | "Management" | "Other";
export interface Contract { id: string; name: string; tag: ContractTag; expiresOn: string; fileName: string; filePath?: string; }

export interface Note { id: string; title: string; body: string; updatedAt: string; }
export interface MoodItem { id: string; url: string; caption: string; }
export type SprintCol = "Backlog" | "In Progress" | "Done";
export interface SprintTask { id: string; title: string; col: SprintCol; }
export interface SaasProject { id: string; name: string; deploy: "Building" | "Ready" | "Error"; tasks: SprintTask[]; }
export interface Prompt { id: string; title: string; category: string; body: string; }
export interface Track { id: string; title: string; artist: string; url?: string; path?: string; }

interface OS {
  artists: Artist[]; deals: Deal[]; releases: Release[]; contracts: Contract[];
  notes: Note[]; mood: MoodItem[]; projects: SaasProject[]; prompts: Prompt[]; tracks: Track[];
  todos: { id: string; label: string; done: boolean; snoozed: boolean; delegated: boolean }[];
}

/* Empty by default — the app starts as a clean slate and everything you add
   is saved to Supabase. Use the + button / module pages to populate it. */
const seed: OS = {
  artists: [], deals: [], releases: [], contracts: [], notes: [], mood: [],
  projects: [], prompts: [], tracks: [], todos: [],
};

const LS = "rippl.os.v2";

interface Ctx extends OS {
  set: <K extends keyof OS>(key: K, val: OS[K]) => void;
  update: <K extends keyof OS>(key: K, fn: (cur: OS[K]) => OS[K]) => void;
  // global UI
  paletteOpen: boolean; setPaletteOpen: (b: boolean) => void;
  currentTrack: Track | null; playing: boolean;
  playTrack: (t: Track) => void; togglePlay: () => void;
}
const C = createContext<Ctx | null>(null);

export function OSProvider({ children }: { children: ReactNode }) {
  const [os, setOs] = useState<OS>(seed);
  const [hydrated, setHydrated] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { (async () => { setOs(await loadState<OS>(LS, seed)); setHydrated(true); })(); }, []);
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

  function set<K extends keyof OS>(key: K, val: OS[K]) { setOs((p) => ({ ...p, [key]: val })); }
  function update<K extends keyof OS>(key: K, fn: (cur: OS[K]) => OS[K]) { setOs((p) => ({ ...p, [key]: fn(p[key]) })); }

  function playTrack(t: Track) { setCurrentTrack(t); setPlaying(true); }
  function togglePlay() { setPlaying((p) => !p); }

  return (
    <C.Provider value={{ ...os, set, update, paletteOpen, setPaletteOpen, currentTrack, playing, playTrack, togglePlay }}>
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
