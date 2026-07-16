import { supabase, isSupabaseConfigured } from "./supabase";

/* Cloud state-sync + file storage.
   • loadState/saveState mirror each store key into Supabase `app_state`
     (JSONB) when signed in, with localStorage as an always-on cache/fallback.
   • uploadToBucket/signedUrl handle real files (contracts, audio) in Storage.
   Everything degrades gracefully to localStorage when Supabase isn't configured. */

export const cloudEnabled = isSupabaseConfigured;

async function currentUid(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

export async function loadState<T>(key: string, fallback: T): Promise<T> {
  if (isSupabaseConfigured && supabase) {
    const uid = await currentUid();
    if (uid) {
      const { data, error } = await supabase.from("app_state").select("data").eq("user_id", uid).eq("key", key).maybeSingle();
      if (!error && data) return data.data as T;
    }
  }
  if (typeof window !== "undefined") {
    try { const raw = window.localStorage.getItem(key); if (raw) return JSON.parse(raw) as T; } catch { /* ignore */ }
  }
  return fallback;
}

export async function saveState(key: string, data: unknown): Promise<void> {
  if (typeof window !== "undefined") { try { window.localStorage.setItem(key, JSON.stringify(data)); } catch { /* ignore */ } }
  if (isSupabaseConfigured && supabase) {
    const uid = await currentUid();
    if (uid) { await supabase.from("app_state").upsert({ user_id: uid, key, data }, { onConflict: "user_id,key" }); }
  }
}

export async function clearEverything(): Promise<void> {
  // wipe local
  if (typeof window !== "undefined") {
    try { Object.keys(window.localStorage).filter((k) => k.startsWith("rippl.")).forEach((k) => window.localStorage.removeItem(k)); } catch { /* ignore */ }
  }
  // wipe cloud state + storage files
  if (isSupabaseConfigured && supabase) {
    const uid = await currentUid();
    if (uid) {
      await supabase.from("app_state").delete().eq("user_id", uid);
      for (const bucket of ["audio", "art", "contracts"]) {
        const { data } = await supabase.storage.from(bucket).list(uid);
        if (data?.length) await supabase.storage.from(bucket).remove(data.map((f) => `${uid}/${f.name}`));
      }
    }
  }
}

/* ── Files ──────────────────────────────────────────────────── */
export async function uploadToBucket(bucket: string, file: File): Promise<string | null> {
  if (!supabase) return null;
  const uid = await currentUid();
  if (!uid) return null;
  const rand = Math.random().toString(36).slice(2, 8);
  const path = `${uid}/${Date.now()}-${rand}-${file.name.replace(/[^\w.\-]/g, "_")}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  return path;
}

export async function signedUrl(bucket: string, path: string, expires = 3600): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.storage.from(bucket).createSignedUrl(path, expires);
  return data?.signedUrl ?? null;
}

/* One-shot connection diagnostic for the Settings page. */
export interface Diag { configured: boolean; url: string; signedIn: boolean; email: string; canWrite: boolean; error: string; }
export async function diagnose(): Promise<Diag> {
  const out: Diag = { configured: isSupabaseConfigured, url: "", signedIn: false, email: "", canWrite: false, error: "" };
  const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || "";
  out.url = url.replace(/^https?:\/\//, "").slice(0, 30);
  if (!supabase) { out.error = "No Supabase client — env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are missing in THIS build. Add them in Vercel → Settings → Environment Variables, then Redeploy."; return out; }
  try {
    const { data: s } = await supabase.auth.getSession();
    out.signedIn = !!s.session;
    out.email = s.session?.user.email ?? "";
    if (!s.session) { out.error = "Not signed in to Supabase Auth (no session)."; return out; }
    const uidv = s.session.user.id;
    const { error: e1 } = await supabase.from("app_state").upsert({ user_id: uidv, key: "diag", data: { t: Date.now() } }, { onConflict: "user_id,key" });
    if (e1) throw new Error(`write: ${e1.message}`);
    const { error: e2 } = await supabase.from("app_state").select("data").eq("user_id", uidv).eq("key", "diag").maybeSingle();
    if (e2) throw new Error(`read: ${e2.message}`);
    out.canWrite = true;
  } catch (e: any) { out.error = e?.message || String(e); }
  return out;
}
