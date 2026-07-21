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

const TIMEOUT_MS = 60_000; // free-tier hosts cold-start slowly; don't spin forever past that
const WAKE_TIMEOUT_MS = 100_000; // /health on a cold Render instance waits on the same heavy imports (librosa/numpy/sklearn) as a real request, so give it more room than a normal call
const MAX_UPLOAD_BYTES = 30 * 1024 * 1024; // ~30MB — big master WAVs will crawl on a free-tier upload

async function postAudio<T>(path: string, blob: Blob, filename: string): Promise<T> {
  if (blob.size > MAX_UPLOAD_BYTES) {
    throw new Error(`File is ${(blob.size / 1024 / 1024).toFixed(1)}MB — that's too large to upload to the analyzer reliably on a free-tier host. Try a shorter clip or an MP3 instead of a full WAV master.`);
  }

  const form = new FormData();
  form.append("file", blob, filename || "track.wav");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, { method: "POST", body: form, signal: controller.signal });
  } catch (e: any) {
    if (e?.name === "AbortError") {
      throw new Error(`Vibe Analyzer didn't respond within ${TIMEOUT_MS / 1000}s. If it's on a free-tier host (Render), it may still be waking up from sleep — wait ~30s and try again. If it keeps happening, the file may be too large or the service may have crashed.`);
    }
    throw new Error(VIBE_OFFLINE_HINT);
  } finally {
    clearTimeout(timeout);
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

export async function vibeServiceOnline(timeoutMs = 4_000): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const r = await fetch(`${BASE}/health`, { signal: controller.signal });
    return r.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

/** Cold Render instances spend most of the delay importing librosa/numpy/sklearn
 *  before they can answer even /health — that only happens once per sleep cycle.
 *  Ping /health with a long timeout so the real analyze/score calls (which reuse
 *  that now-warm process) land inside their normal 60s window instead of racing
 *  the cold start themselves. Returns false if the service never woke up in time. */
export async function wakeVibeService(): Promise<boolean> {
  if (await vibeServiceOnline(4_000)) return true;
  return vibeServiceOnline(WAKE_TIMEOUT_MS);
}
