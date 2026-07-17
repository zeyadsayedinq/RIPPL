import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "./supabase";

/* The HQ / admin account — full control over the workspace. */
export const HQ_EMAIL = "zeyadsayedinq@gmail.com";

export function useAuthEmail(): string | null {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setEmail(s?.user.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);
  return email;
}

/* HQ when signed in as the admin — or when running locally with no backend
   (so the panel is reachable in local/dev). */
export function useIsHQ(): boolean {
  const email = useAuthEmail();
  if (!isSupabaseConfigured) return true;
  return email?.toLowerCase() === HQ_EMAIL;
}
