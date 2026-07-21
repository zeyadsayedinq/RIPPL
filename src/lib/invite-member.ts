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
interface InviteResult { ok: boolean; error?: string; warning?: string }

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

    // Without an explicit redirectTo, Supabase sends people to whatever
    // "Site URL" is configured in the dashboard — which defaults to
    // http://localhost:3000 and will send every invite to a dead link.
    // Preference order:
    //   1. VITE_APP_URL — explicit, set this if you're on a custom domain.
    //   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's stable production alias
    //      (unlike VERCEL_URL, this doesn't change per-deployment).
    //   3. VERCEL_URL — the current deployment's own URL, always present on Vercel.
    //   4. Hardcoded fallback to the known production domain, so an invite
    //      is never sent with an undefined/localhost redirect even if no
    //      env vars are configured on this deployment.
    // NOTE: setting this correctly is necessary but not sufficient — the
    // exact URL must ALSO be added under Supabase Dashboard → Authentication
    // → URL Configuration → Redirect URLs, or Supabase silently ignores
    // redirectTo and falls back to "Site URL" (often still localhost:3000).
    const KNOWN_PRODUCTION_URL = "https://rippl-mu.vercel.app";
    const appUrl =
      process.env.VITE_APP_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
      KNOWN_PRODUCTION_URL;

    const { error } = await admin.auth.admin.inviteUserByEmail(data.email, {
      data: data.name ? { name: data.name } : undefined,
      redirectTo: appUrl ? `${appUrl}/home` : undefined,
    });

    if (error) {
      // Supabase returns "User already registered" if they've already signed up — not really a failure.
      if (/already registered|already exists/i.test(error.message)) {
        return { ok: true };
      }
      return { ok: false, error: error.message };
    }

    // appUrl always resolves now (see fallback chain above), but Supabase
    // still silently ignores redirectTo — and falls back to its dashboard
    // "Site URL" (often localhost) — unless this exact URL is also
    // allow-listed under Authentication → URL Configuration → Redirect URLs.
    // We can't check that allow-list from here, so surface a one-time nudge
    // rather than a hard error.
    if (!process.env.VITE_APP_URL) {
      return {
        ok: true,
        warning: `Sent using ${appUrl} as a guessed redirect (VITE_APP_URL isn't set — set it explicitly in Vercel for reliability). Either way, make sure ${appUrl}/home is added under Supabase → Authentication → URL Configuration → Redirect URLs, or Supabase will ignore it and send people to the dashboard's "Site URL" instead (often localhost).`,
      };
    }
    return { ok: true };
  });
