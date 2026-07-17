/* Client for the standalone Vibe Analyzer & Hit Scoring service
   (services/vibe-analyzer). Pure frontend↔HTTP — degrades gracefully with
   a clear error if the service isn't running, same pattern as Supabase's
   isSupabaseConfigured/cloudEnabled elsewhere in this app. */

const BASE = (import.meta.env.VITE_VIBE_ANALYZER_URL as string | undefined) || "http://localhost:8000";

export interface VibeFeatures {
  bpm: number; key: string; mode: "major" | "minor"; energy: number; valence: number;
  danceability: number; speechiness: number; mood: string;
}

export interface HitScoreResult {
  hit_probability: number;
  baseline: string;
  note: string;
  features: Record<string, number>;
  key: string;
  mood: string;
}

export const VIBE_OFFLINE_HINT =
  "Vibe Analyzer service isn't reachable. Run it with: cd services/vibe-analyzer && uvicorn main:app --reload (see services/vibe-analyzer/README.md).";

async function postAudio<T>(path: string, blob: Blob, filename: string): Promise<T> {
  const form = new FormData();
  form.append("file", blob, filename || "track.wav");
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, { method: "POST", body: form });
  } catch {
    throw new Error(VIBE_OFFLINE_HINT);
  }
  if (!res.ok) {
    const detail = await res.json().catch(() => null);
    throw new Error(detail?.detail || `Vibe Analyzer error (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function analyzeVibe(blob: Blob, filename: string): Promise<VibeFeatures> {
  return postAudio<VibeFeatures>("/analyze", blob, filename);
}

export function scoreHit(blob: Blob, filename: string): Promise<HitScoreResult> {
  return postAudio<HitScoreResult>("/score", blob, filename);
}

export async function vibeServiceOnline(): Promise<boolean> {
  try {
    const r = await fetch(`${BASE}/health`);
    return r.ok;
  } catch {
    return false;
  }
}
