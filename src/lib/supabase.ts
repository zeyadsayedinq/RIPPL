import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* Supabase client.
   Reads Vite env vars — add them to `.env` (see .env.example):
     VITE_SUPABASE_URL=...
     VITE_SUPABASE_ANON_KEY=...
   When they're absent, `supabase` is null and the app keeps running
   on the localStorage stores (graceful fallback — nothing breaks). */

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anon);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anon!, { auth: { persistSession: true, autoRefreshToken: true } })
  : null;
