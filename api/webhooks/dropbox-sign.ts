/* Dropbox Sign event callback — plain Vercel Node function at the repo ROOT
   /api folder, same reasoning as api/cron/*.ts (outside TanStack Router
   entirely, Vercel auto-detects it regardless of the frontend framework).

   Dropbox Sign POSTs callbacks as multipart/form-data with a single text
   field named "json" (confirmed against developers.hellosign.com/docs —
   NOT application/json), and requires the response body to be the literal
   string "Hello API Event Received" with HTTP 200, or it retries. Vercel's
   Node runtime does NOT auto-parse multipart/form-data (only json/
   urlencoded/text), so this reads the raw body itself and picks the "json"
   field out by hand — a tiny hand-rolled parser rather than adding a
   multipart-parsing dependency for one field.

   Authenticity is verified via event.event_hash = HMAC-SHA256(api_key,
   event_time + event_type) — same algorithm Dropbox Sign documents for
   every event, computed here with Node's built-in `crypto`. */
import { createClient } from "@supabase/supabase-js";
import { createHmac } from "node:crypto";
import type { IncomingMessage } from "node:http";

interface CronResponse {
  status: (code: number) => { send: (body: string) => void };
}

const ACK = "Hello API Event Received";

function readRawBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function extractField(raw: Buffer, contentType: string, fieldName: string): string | null {
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/);
  const boundary = boundaryMatch ? boundaryMatch[1] || boundaryMatch[2] : null;
  const text = raw.toString("utf8");
  if (boundary) {
    for (const part of text.split(`--${boundary}`)) {
      if (part.includes(`name="${fieldName}"`)) {
        const idx = part.indexOf("\r\n\r\n");
        if (idx === -1) continue;
        return part.slice(idx + 4).replace(/\r\n--?$/, "").trim();
      }
    }
    return null;
  }
  // Fallback: some setups deliver this as application/x-www-form-urlencoded instead.
  try {
    const params = new URLSearchParams(text);
    return params.get(fieldName);
  } catch {
    return null;
  }
}

function verifyEventHash(eventTime: string, eventType: string, eventHash: string, apiKey: string): boolean {
  const expected = createHmac("sha256", apiKey).update(`${eventTime}${eventType}`).digest("hex");
  return expected === eventHash;
}

const OS_KEY = "rippl.os.v2";

export default async function handler(req: IncomingMessage, res: CronResponse) {
  const apiKey = process.env.DROPBOX_SIGN_API_KEY;
  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!apiKey || !url || !serviceKey) {
    // Nothing to verify against — ack anyway so Dropbox Sign doesn't retry forever;
    // this only happens if env vars are misconfigured, not a real event to lose.
    res.status(200).send(ACK);
    return;
  }

  const contentType = (req.headers["content-type"] as string) || "";
  const raw = await readRawBody(req);
  const jsonField = extractField(raw, contentType, "json");
  if (!jsonField) {
    res.status(200).send(ACK);
    return;
  }

  let payload: any;
  try {
    payload = JSON.parse(jsonField);
  } catch {
    res.status(200).send(ACK);
    return;
  }

  const event = payload?.event;
  if (!event?.event_hash || !verifyEventHash(event.event_time, event.event_type, event.event_hash, apiKey)) {
    res.status(401).send("Invalid signature");
    return;
  }

  // Dropbox Sign sends this when you first save the callback URL — just ack it.
  if (event.event_type === "callback_test") {
    res.status(200).send(ACK);
    return;
  }

  const requestId: string | undefined = payload?.signature_request?.signature_request_id;
  if (!requestId) {
    res.status(200).send(ACK);
    return;
  }

  const newStatus =
    event.event_type === "signature_request_signed" || event.event_type === "signature_request_all_signed"
      ? "signed"
      : event.event_type === "signature_request_declined"
        ? "declined"
        : null;

  if (newStatus) {
    const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: reqRow } = await admin
      .from("signature_requests")
      .select("user_id,contract_id")
      .eq("request_id", requestId)
      .maybeSingle();

    if (reqRow) {
      await admin
        .from("signature_requests")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("request_id", requestId);

      // Patch the actual Contract record inside the JSONB blob (contracts
      // aren't a normal table — see os-store.tsx / 0004_esignatures.sql).
      const { data: stateRow } = await admin
        .from("app_state")
        .select("data")
        .eq("user_id", reqRow.user_id)
        .eq("key", OS_KEY)
        .maybeSingle();
      const os = (stateRow?.data as { contracts?: any[] }) ?? {};
      if (Array.isArray(os.contracts)) {
        const nextContracts = os.contracts.map((c) =>
          c.id === reqRow.contract_id
            ? { ...c, signatureStatus: newStatus, ...(newStatus === "signed" ? { signedAt: new Date().toISOString() } : {}) }
            : c,
        );
        await admin
          .from("app_state")
          .upsert({ user_id: reqRow.user_id, key: OS_KEY, data: { ...os, contracts: nextContracts } }, { onConflict: "user_id,key" });
      }
    }
  }

  res.status(200).send(ACK);
}
