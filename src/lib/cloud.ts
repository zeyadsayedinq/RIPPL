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
  const path = `${uid}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
  if (error) throw error;
  return path;
}

export async function signedUrl(bucket: string, path: string, expires = 3600): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.storage.from(bucket).createSignedUrl(path, expires);
  return data?.signedUrl ?? null;
}
