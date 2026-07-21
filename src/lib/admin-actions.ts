import { createServerFn } from "@tanstack/react-start";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { HQ_EMAIL } from "./use-auth";

/* HQ-only account administration — setting a member's password on their
   behalf. Uses the Supabase service-role key server-side (same pattern as
   invite-member.ts / shared-workspace.ts), and independently verifies the
   caller is actually HQ before touching anyone's account — never trust a
   client-sent "I'm HQ" flag, always re-derive it from their access token. */

interface Result { ok: boolean; error?: string }

function adminClient() {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return { error: "Supabase service credentials aren't configured on the server (VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)." } as const;
  return createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

/** Small-team tool: page through users to find one by email (Supabase admin
 *  API has no direct getUserByEmail) — same approach as findHqUid in
 *  shared-workspace.ts. */
async function findUserIdByEmail(admin: SupabaseClient, email: string): Promise<string | null> {
  const target = email.toLowerCase();
  for (let page = 1; page <= 10; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error || !data?.users?.length) return null;
    const hit = data.users.find((u) => u.email?.toLowerCase() === target);
    if (hit) return hit.id;
    if (data.users.length < 200) return null;
  }
  return null;
}

export const setMemberPassword = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string; targetEmail: string; newPassword: string }) => d)
  .handler(async ({ data }): Promise<Result> => {
    if (data.newPassword.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

    const admin = adminClient();
    if ("error" in admin) return { ok: false, error: admin.error };

    const { data: userData, error: userErr } = await admin.auth.getUser(data.accessToken);
    const callerEmail = userData?.user?.email?.toLowerCase();
    if (userErr || !callerEmail) return { ok: false, error: "Not signed in (invalid access token)." };
    if (callerEmail !== HQ_EMAIL) return { ok: false, error: "Only HQ can set a member's password." };

    const targetId = await findUserIdByEmail(admin, data.targetEmail);
    if (!targetId) return { ok: false, error: `No account found for ${data.targetEmail} yet — they need to accept their invite first.` };

    const { error } = await admin.auth.admin.updateUserById(targetId, { password: data.newPassword });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  });
