import { createServerFn } from "@tanstack/react-start";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ═══════════════════════════════════════════════════════════
   Real e-signatures for Vault, via Dropbox Sign (developers.hellosign.com —
   Dropbox acquired HelloSign; the API is still hosted at api.hellosign.com).
   Confirmed against their live API reference (2026-07-24):
     • POST https://api.hellosign.com/v3/signature_request/send
       — HTTP Basic auth, API key as the username, empty password.
       Needs file_urls[] (or files[], not used here — RIPPL already has a
       signed Storage URL for the uploaded contract) + signers[] with
       email_address/name.
     • Webhook events are verified via event_hash = HMAC-SHA256(
       event_time + event_type) keyed by the API key — see
       api/webhooks/dropbox-sign.ts, which does the verification and patches
       the actual Contract record. This file only sends the request and
       offers a manual status-refresh (signature_requests is the source of
       truth the webhook writes to).

   This closes a real gap: Home already shows "Pending Signatures" as a
   headline metric, but until now nothing in Vault could actually get a
   signature — contracts were upload-and-file only. */

const DROPBOX_SIGN_BASE = "https://api.hellosign.com/v3";

function dropboxSignConfiguredEnv(): boolean {
  return Boolean(process.env.DROPBOX_SIGN_API_KEY);
}

function authHeader(): string {
  const key = process.env.DROPBOX_SIGN_API_KEY!;
  return `Basic ${Buffer.from(`${key}:`).toString("base64")}`;
}

function adminClient(): SupabaseClient | { error: string } {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey)
    return { error: "Supabase service credentials aren't configured on the server (VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)." };
  return createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function resolveUserId(admin: SupabaseClient, accessToken: string | undefined): Promise<string | null> {
  if (!accessToken) return null;
  const { data, error } = await admin.auth.getUser(accessToken);
  if (error || !data?.user) return null;
  return data.user.id;
}

export const esignatureConfigured = createServerFn({ method: "GET" }).handler(async () => {
  return dropboxSignConfiguredEnv();
});

/* ── Send a contract for signature ───────────────────────────── */
export const sendForSignature = createServerFn({ method: "POST" })
  .validator((d: {
    accessToken: string;
    contractId: string;
    contractName: string;
    /** signed Storage URL for the already-uploaded contract file — Dropbox Sign downloads from this URL server-side */
    fileUrl: string;
    signerName: string;
    signerEmail: string;
  }) => d)
  .handler(async ({ data }): Promise<{ ok: boolean; requestId?: string; error?: string }> => {
    if (!dropboxSignConfiguredEnv()) {
      return { ok: false, error: "DROPBOX_SIGN_API_KEY isn't set. Add it in Vercel env vars (from Dropbox Sign → Settings → API), then redeploy." };
    }
    const admin = adminClient();
    if ("error" in admin) return { ok: false, error: admin.error };
    const userId = await resolveUserId(admin, data.accessToken);
    if (!userId) return { ok: false, error: "Sign in to send a contract for signature." };
    if (!data.signerEmail.trim()) return { ok: false, error: "A signer email is required." };

    const body = new URLSearchParams();
    body.set("title", data.contractName || "RIPPL contract");
    body.set("subject", `Please sign: ${data.contractName || "contract"}`);
    body.set("message", "Sent via RIPPL — please review and sign at your earliest convenience.");
    body.set("signers[0][email_address]", data.signerEmail.trim());
    body.set("signers[0][name]", data.signerName.trim() || data.signerEmail.trim());
    body.set("file_urls[0]", data.fileUrl);
    // callback_url gets the webhook the signature status — see api/webhooks/dropbox-sign.ts.
    // Falls back to the known production domain the same way invite-member.ts does for auth redirects.
    const appUrl =
      process.env.VITE_APP_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
      "https://rippl-mu.vercel.app";
    body.set("callback_url", `${appUrl}/api/webhooks/dropbox-sign`);
    // Sandbox mode unless explicitly turned off — sending real signature requests to real people is
    // exactly the kind of thing that shouldn't happen by accident from a default env var config.
    if (process.env.DROPBOX_SIGN_TEST_MODE !== "false") body.set("test_mode", "1");

    const res = await fetch(`${DROPBOX_SIGN_BASE}/signature_request/send`, {
      method: "POST",
      headers: { Authorization: authHeader(), "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => null);
      return { ok: false, error: errBody?.error?.error_msg || `Dropbox Sign API error (${res.status})` };
    }
    const json = await res.json();
    const requestId: string | undefined = json?.signature_request?.signature_request_id;
    if (!requestId) return { ok: false, error: "Dropbox Sign didn't return a request id." };

    const { error: insertErr } = await admin.from("signature_requests").insert({
      request_id: requestId,
      user_id: userId,
      contract_id: data.contractId,
      contract_name: data.contractName,
      signer_name: data.signerName,
      signer_email: data.signerEmail,
      status: "sent",
    });
    if (insertErr) return { ok: false, error: `Sent, but failed to log it: ${insertErr.message}` };

    return { ok: true, requestId };
  });

/* ── Manual status refresh — the webhook (api/webhooks/dropbox-sign.ts) is
   the real-time path, this is the "check now" fallback since RIPPL has no
   live Supabase Realtime subscription set up anywhere yet. ───────────── */
export const getSignatureStatus = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string; requestId: string }) => d)
  .handler(async ({ data }): Promise<{ ok: boolean; status?: string; signedAt?: string; error?: string }> => {
    const admin = adminClient();
    if ("error" in admin) return { ok: false, error: admin.error };
    const userId = await resolveUserId(admin, data.accessToken);
    if (!userId) return { ok: false, error: "Sign in to check signature status." };

    const { data: row, error } = await admin
      .from("signature_requests")
      .select("status,updated_at")
      .eq("request_id", data.requestId)
      .eq("user_id", userId)
      .maybeSingle();
    if (error) return { ok: false, error: error.message };
    if (!row) return { ok: false, error: "No record of this signature request." };
    return { ok: true, status: row.status, signedAt: row.status === "signed" ? row.updated_at : undefined };
  });
