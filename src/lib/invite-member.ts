import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

/* Sends a real "you've been invited to RIPPL" email via Supabase Auth's
   built-in invite flow. This MUST run server-side only — it needs the
   Supabase *service role* key, which grants full admin access and must
   never reach the browser bundle. TanStack Start's createServerFn strips
   the handler body out of the client bundle automatically; calling this
   function from a component triggers an RPC to the server, not local
   execution. See .env.example for SUPABASE_SERVICE_ROLE_KEY. */

interface InviteInput { email: string; name?: string }
interface InviteResult { ok: boolean; error?: string }

export const inviteMember = createServerFn({ method: "POST" })
  .validator((data: InviteInput) => data)
  .handler(async ({ data }): Promise<InviteResult> => {
    const url = process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url) {
      return { ok: false, error: "VITE_SUPABASE_URL isn't set — Supabase isn't configured on this deployment." };
    }
    if (!serviceKey) {
      return {
        ok: false,
        error:
          "SUPABASE_SERVICE_ROLE_KEY isn't set. Add it in Vercel → Settings → Environment Variables (server-only — do NOT prefix it with VITE_) using the service_role secret from Supabase Dashboard → Project Settings → API, then redeploy.",
      };
    }

    const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

    const { error } = await admin.auth.admin.inviteUserByEmail(data.email, {
      data: data.name ? { name: data.name } : undefined,
    });

    if (error) {
      // Supabase returns "User already registered" if they've already signed up — not really a failure.
      if (/already registered|already exists/i.test(error.message)) {
        return { ok: true };
      }
      return { ok: false, error: error.message };
    }
    return { ok: true };
  });
