import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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
export interface Contract { id: string; name: string; tag: ContractTag; expiresOn: string; fileName: string; }

export interface Note { id: string; title: string; body: string; updatedAt: string; }
export interface MoodItem { id: string; url: string; caption: string; }
export type SprintCol = "Backlog" | "In Progress" | "Done";
export interface SprintTask { id: string; title: string; col: SprintCol; }
export interface SaasProject { id: string; name: string; deploy: "Building" | "Ready" | "Error"; tasks: SprintTask[]; }
export interface Prompt { id: string; title: string; category: string; body: string; }
export interface Track { id: string; title: string; artist: string; url?: string; }

interface OS {
  artists: Artist[]; deals: Deal[]; releases: Release[]; contracts: Contract[];
  notes: Note[]; mood: MoodItem[]; projects: SaasProject[]; prompts: Prompt[]; tracks: Track[];
  todos: { id: string; label: string; done: boolean; snoozed: boolean; delegated: boolean }[];
}

const seed: OS = {
  artists: [
    { id: "ar1", name: "Shehab", kind: "Music", handle: "@shehab.eldin", streams: "8.9M", followers: "8.9M", stage: "Signed", managed: true, note: "Lead roster artist — album cycle." },
    { id: "ar2", name: "Zyad ElShazly", kind: "Influencer", handle: "@zyad_elshazly", streams: "—", followers: "2.6M", stage: "Signed", managed: true, note: "Lifestyle / brand deals." },
    { id: "ar3", name: "Nourhan", kind: "Music", handle: "@nourhan.sings", streams: "120K", followers: "310K", stage: "Evaluating", managed: false, note: "Strong TikTok pull." },
    { id: "ar4", name: "DJ Habibeats", kind: "Music", handle: "@habibeats", streams: "540K", followers: "790K", stage: "Negotiating", managed: false, note: "Arab House remixes." },
    { id: "ar5", name: "Layla", kind: "Influencer", handle: "@laylavibes", streams: "—", followers: "88K", stage: "Discovered", managed: false },
  ],
  deals: [
    { id: "d1", brand: "Anghami", artist: "Shehab", deliverables: "Editorial + billboard", value: 250000, split: 20, status: "Contracting" },
    { id: "d2", brand: "Vodafone", artist: "Zyad ElShazly", deliverables: "3 Reels + 1 TikTok", value: 180000, split: 25, status: "Pitching" },
  ],
  releases: [
    { id: "r1", title: "Sorry", artist: "Latifa", isrc: "EGA012500001", upc: "197...014", releaseDate: "Mar 07, 2026", contentId: "green", status: "Live", dsp: { spotify: true, anghami: true, youtube: true }, qa: { atmos: true, eq: true } },
    { id: "r2", title: "Ma3rafaksh", artist: "Latifa", isrc: "EGA012500002", upc: "197...021", releaseDate: "Mar 28, 2026", contentId: "yellow", status: "Scheduled", dsp: { spotify: true, anghami: true, youtube: false }, qa: { atmos: false, eq: true } },
  ],
  contracts: [
    { id: "c1", name: "Shehab — Management Agreement", tag: "Management", expiresOn: "2026-08-01", fileName: "shehab_mgmt.pdf" },
    { id: "c2", name: "Latifa x Kadim — Split Sheet", tag: "Split Sheet", expiresOn: "2027-01-15", fileName: "story_of_us_splits.pdf" },
  ],
  notes: [
    { id: "n1", title: "Q3 campaign narrative", body: "Hook: 'from the first to the last.' Lead with confrontation → resolution arc.", updatedAt: "today" },
  ],
  mood: [],
  projects: [
    { id: "p1", name: "Mi-Assignment", deploy: "Ready", tasks: [
      { id: "t1", title: "Grading rubric engine", col: "Done" },
      { id: "t2", title: "Bulk import CSV", col: "In Progress" },
      { id: "t3", title: "Student portal redesign", col: "Backlog" },
    ]},
  ],
  prompts: [
    { id: "pr1", title: "Arabic soundscape (Suno)", category: "Suno Pro", body: "Cinematic Arabic pop, oud + 808, Latifa-style vocal, emotional, 90 BPM, radio-ready master." },
    { id: "pr2", title: "AI artist identity framework", category: "Identity", body: "Define persona: origin, visual palette, sonic signature, 3 pillar themes, target subculture." },
  ],
  tracks: [
    { id: "tr1", title: "Sorry — Master v1.2", artist: "Latifa · KAIRO SOUND" },
    { id: "tr2", title: "Untitled demo", artist: "Shehab" },
  ],
  todos: [
    { id: "td1", label: "Approve Shehab MV rough cut", done: false, snoozed: false, delegated: false },
    { id: "td2", label: "Countersign Anghami deal", done: false, snoozed: false, delegated: false },
    { id: "td3", label: "Pitch Ma3rafaksh to editorial", done: true, snoozed: false, delegated: false },
  ],
};

const LS = "rippl.os.v1";

interface Ctx extends OS {
  set: <K extends keyof OS>(key: K, val: OS[K]) => void;
  update: <K extends keyof OS>(key: K, fn: (cur: OS[K]) => OS[K]) => void;
  // global UI
  paletteOpen: boolean; setPaletteOpen: (b: boolean) => void;
  currentTrack: Track | null; playing: boolean;
  playTrack: (t: Track) => void; togglePlay: () => void;
}
const C = createContext<Ctx | null>(null);

function load(): OS {
  if (typeof window === "undefined") return seed;
  try { const raw = window.localStorage.getItem(LS); return raw ? JSON.parse(raw) : seed; } catch { return seed; }
}

export function OSProvider({ children }: { children: ReactNode }) {
  const [os, setOs] = useState<OS>(seed);
  const [hydrated, setHydrated] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { setOs(load()); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) try { window.localStorage.setItem(LS, JSON.stringify(os)); } catch { /* ignore */ } }, [os, hydrated]);

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
