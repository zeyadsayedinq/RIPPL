/* ═══════════════════════════════════════════════════════════
   CAMPAIGN DATA — RESET
   All sample marketing content has been cleared. Interfaces are
   retained so the app compiles and pages render empty states.
   Create a campaign to begin. Currency across the app is EGP.
═══════════════════════════════════════════════════════════ */

export type Platform =
  | "TikTok" | "Instagram" | "YouTube" | "Facebook" | "X"
  | "Anghami" | "Spotify" | "Radio" | "TV";

/* ── Tracks ─────────────────────────────────────────────────── */
export interface Track {
  n: number;
  title: string;
  titleAr: string;
  phase: 1 | 2;
  tag: string;
  focus: string[];
  platforms: string[];
}
export const latifaTracks: Track[] = [];

/* ── Narrative arcs ─────────────────────────────────────────── */
export const narrativeArcs: { name: string; tracks: string; color: string }[] = [];

/* ── Release timeline ───────────────────────────────────────── */
export interface TimelineItem {
  date: string;
  title: string;
  type: "Single" | "Video" | "Remix" | "Announce" | "Album" | "Event";
  status: "done" | "active" | "upcoming";
  channel: string;
}
export const releaseTimeline: TimelineItem[] = [];

/* ── Release checklist ──────────────────────────────────────── */
export interface ChecklistItem { id: string; label: string; done: boolean; }
export interface ChecklistPhase { phase: string; items: ChecklistItem[]; }
export const releaseChecklist: ChecklistPhase[] = [];

/* ── 360 Channel plan ───────────────────────────────────────── */
export interface ChannelRow { name: string; owner: string; status: "Live" | "Planned" | "Booked"; metric: string; note: string; }
export const socialChannels: ChannelRow[] = [];
export const paidChannels: ChannelRow[] = [];

export const playlistTargets: { name: string; followers: string; status: string }[] = [];
export const pressTargets: { outlet: string; region: string; type: string; contact: string; status: string }[] = [];
export const radioTargets: { station: string; region: string; note: string }[] = [];
export const mediaPartners: string[] = [];

/* ── Budget lines ───────────────────────────────────────────── */
export interface BudgetLine { category: string; planned: number; spent: number; }
export const budgetLines: BudgetLine[] = [];

/* ── Campaigns ──────────────────────────────────────────────── */
export interface Campaign {
  id: string;
  artist: string;
  title: string;
  subtitle: string;
  status: "Active" | "Planning" | "Wrapped";
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  platforms: string[];
  goal: string;
  reach: string;
  seeded?: boolean;
}
export const seedCampaigns: Campaign[] = [];
