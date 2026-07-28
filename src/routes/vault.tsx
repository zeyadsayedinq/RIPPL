import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useOS, uid, type ContractTag, type Contract } from "@/lib/os-store";
import { cloudEnabled, uploadToBucket, signedUrl } from "@/lib/cloud";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { sendForSignature, getSignatureStatus } from "@/lib/esignature";
import { FileViewer } from "@/components/FileViewer";
import { ModalShell } from "@/components/NewCampaignModal";
import { MagneticButton } from "@/components/MagneticButton";
import { splitSheetPdf, type SplitEntry, type SplitSheetInput } from "@/lib/pdf";
import { AnimatePresence } from "framer-motion";
import { Upload, FileSignature, AlertTriangle, Trash2, Eye, Download, Search, FilePlus2, Plus, Send, RefreshCw, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { SharedBadge } from "@/components/SharedBadge";

export const Route = createFileRoute("/vault")({
  head: () => ({ meta: [{ title: "The Vault · RIPPL OS" }, { name: "description", content: "Legal & contract management." }] }),
  component: VaultPage,
});

const TAGS: ContractTag[] = ["Split Sheet", "Exclusive Recording", "Sync License", "Management", "Other"];

function daysUntil(iso: string): number | null {
  if (!iso) return null;
  const d = new Date(iso); if (isNaN(d.getTime())) return null;
  return Math.ceil((d.getTime() - Date.now()) / 86400000);
}

function VaultPage() {
  const { contracts, update, isShared, canEdit } = useOS();
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  // in-memory object URLs for files uploaded this session (instant view before cloud round-trip).
  const [blobs, setBlobs] = useState<Record<string, string>>({});
  const [err, setErr] = useState("");
  const [viewer, setViewer] = useState<{ url: string; name: string } | null>(null);
  const [q, setQ] = useState("");
  const [splitOpen, setSplitOpen] = useState(false);
  const [signModal, setSignModal] = useState<Contract | null>(null);
  const [refreshingId, setRefreshingId] = useState<string | null>(null);
  const shown = useMemo(() => contracts.filter((c) => !q || `${c.name} ${c.tag} ${c.fileName}`.toLowerCase().includes(q.toLowerCase())), [contracts, q]);

  async function accessToken(): Promise<string | undefined> {
    if (!isSupabaseConfigured || !supabase) return undefined;
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  }

  async function refreshSignature(c: Contract) {
    if (!c.signatureRequestId) return;
    setRefreshingId(c.id);
    try {
      const token = await accessToken();
      const res = await getSignatureStatus({ data: { accessToken: token ?? "", requestId: c.signatureRequestId } });
      if (res.ok && res.status && res.status !== c.signatureStatus) {
        update("contracts", (all) =>
          all.map((x) => (x.id === c.id ? { ...x, signatureStatus: res.status as Contract["signatureStatus"], signedAt: res.signedAt ?? x.signedAt } : x)),
        );
      }
    } finally {
      setRefreshingId(null);
    }
  }

  async function add(files: FileList | null) {
    if (!files) return;
    await Promise.all(Array.from(files).map(async (file) => {
      const id = uid("c");
      const url = URL.createObjectURL(file);
      setBlobs((b) => ({ ...b, [id]: url }));
      let filePath: string | undefined;
      if (cloudEnabled) {
        try { filePath = (await uploadToBucket("contracts", file)) ?? undefined; }
        catch (e: any) { setErr(`Upload failed: ${(e as Error)?.message || e}. Create the "contracts" bucket + run the storage policy (see SUPABASE_SETUP.md).`); return; }
      }
      update("contracts", (c) => [{ id, name: file.name.replace(/\.[^.]+$/, ""), tag: "Other" as ContractTag, expiresOn: "", fileName: file.name, filePath }, ...c]);
    }));
  }

  async function resolveUrl(filePath?: string, sessionUrl?: string) {
    return sessionUrl ?? (filePath ? await signedUrl("contracts", filePath) : null);
  }
  async function viewFile(name: string, filePath?: string, sessionUrl?: string) {
    const url = await resolveUrl(filePath, sessionUrl);
    if (url) setViewer({ url, name });
  }
  async function downloadFile(name: string, filePath?: string, sessionUrl?: string) {
    const url = await resolveUrl(filePath, sessionUrl);
    if (!url) return;
    const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  }

  const expiring = contracts.map((c) => ({ c, d: daysUntil(c.expiresOn) })).filter((x) => x.d !== null && x.d <= 30 && x.d >= 0);

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Legal · The Vault</div>
          <h1 className="mt-1 font-display text-3xl font-bold">Contract <span className="text-gradient-neon">Vault</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">Store, tag and monitor every agreement. Alerts fire 30 days before expiry.</p>
        </div>
        <MagneticButton onClick={() => setSplitOpen(true)}><FilePlus2 className="h-4 w-4" /> Generate split sheet</MagneticButton>
      </header>

      {err && <div className="mt-4 rounded-xl border border-[oklch(0.7_0.2_20)]/40 bg-[oklch(0.7_0.2_20)]/10 p-3 text-sm text-[oklch(0.8_0.2_20)]">{err}</div>}

      {/* Expiration alerts */}
      {expiring.length > 0 && (
        <div className="mt-4 rounded-2xl border border-[oklch(0.82_0.16_90)]/30 bg-[oklch(0.82_0.16_90)]/10 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[oklch(0.85_0.16_90)]"><AlertTriangle className="h-4 w-4" /> Contracts expiring soon</div>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {expiring.map(({ c, d }) => <li key={c.id}>• <span className="text-foreground">{c.name}</span> — expires in {d} day{d === 1 ? "" : "s"} (renegotiate)</li>)}
          </ul>
        </div>
      )}

      {/* Dropzone */}
      <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
        className={`mt-6 w-full rounded-2xl border border-dashed p-10 text-center transition-colors ${over ? "border-white/50 bg-white/[0.04]" : "border-white/15 bg-white/[0.02] hover:border-white/30"}`}
      >
        <Upload className="mx-auto h-7 w-7 text-muted-foreground" />
        <div className="mt-2 text-sm text-muted-foreground">Drop contracts here, or click to upload — split sheets, recording, sync & management agreements.</div>
      </button>

      {contracts.length > 0 && (
        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search contracts by name, tag or file…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-white/40" />
        </div>
      )}

      <section className="mt-4 grid grid-cols-1 gap-3">
        {shown.map((c) => {
          const d = daysUntil(c.expiresOn);
          const warn = d !== null && d <= 30 && d >= 0;
          return (
            <div key={c.id} className="glass flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5"><FileSignature className="h-5 w-5 text-white/50" /></div>
                <div className="min-w-0"><div className="flex items-center gap-2 truncate font-medium">{c.name}{isShared(c.id) && <SharedBadge editable={canEdit(c.id)} />}</div><div className="truncate text-xs text-muted-foreground">{c.fileName}</div></div>
              </div>
              <select
                value={c.tag}
                disabled={!canEdit(c.id)}
                onChange={(e) => update("contracts", (all) => all.map((x) => x.id === c.id ? { ...x, tag: e.target.value as ContractTag } : x))}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs outline-none disabled:opacity-60"
              >
                {TAGS.map((t) => <option key={t} className="bg-[#140a1e]">{t}</option>)}
              </select>
              <input
                type="date" value={c.expiresOn}
                onChange={(e) => update("contracts", (all) => all.map((x) => x.id === c.id ? { ...x, expiresOn: e.target.value } : x))}
                className={`rounded-full border bg-white/[0.03] px-3 py-1.5 text-xs outline-none ${warn ? "border-[oklch(0.82_0.16_90)]/60 text-[oklch(0.85_0.16_90)]" : "border-white/10"}`}
              />
              {(blobs[c.id] || c.filePath) ? (
                <div className="flex items-center gap-1">
                  <button onClick={() => viewFile(c.fileName, c.filePath, blobs[c.id])} title="View" className="glass grid h-7 w-7 place-items-center rounded-lg hover:bg-white/5"><Eye className="h-3.5 w-3.5" /></button>
                  <button onClick={() => downloadFile(c.fileName, c.filePath, blobs[c.id])} title="Download" className="glass grid h-7 w-7 place-items-center rounded-lg hover:bg-white/5"><Download className="h-3.5 w-3.5" /></button>
                </div>
              ) : (
                <span title="Metadata only — no file bytes stored" className="text-[10px] text-muted-foreground/60">no file</span>
              )}
              {!c.signatureStatus && c.filePath && !isShared(c.id) && (
                <button onClick={() => setSignModal(c)} title="Send for e-signature" className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] hover:bg-white/5">
                  <Send className="h-3.5 w-3.5" /> Send for signature
                </button>
              )}
              {c.signatureStatus === "sent" && (
                <div className="flex items-center gap-1.5 rounded-full border border-[oklch(0.82_0.16_90)]/40 bg-[oklch(0.82_0.16_90)]/10 px-3 py-1.5 text-[11px] text-[oklch(0.85_0.16_90)]">
                  <Clock className="h-3.5 w-3.5" /> Awaiting {c.signerName || c.signerEmail}
                  <button onClick={() => refreshSignature(c)} disabled={refreshingId === c.id} title="Check status" className="ml-0.5 disabled:opacity-50">
                    {refreshingId === c.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                  </button>
                </div>
              )}
              {c.signatureStatus === "signed" && (
                <div className="flex items-center gap-1.5 rounded-full border border-[oklch(0.82_0.18_150)]/40 bg-[oklch(0.82_0.18_150)]/10 px-3 py-1.5 text-[11px] text-[oklch(0.82_0.18_150)]">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Signed{c.signedAt ? ` ${new Date(c.signedAt).toLocaleDateString()}` : ""}
                </div>
              )}
              {c.signatureStatus === "declined" && (
                <button onClick={() => setSignModal(c)} className="flex items-center gap-1.5 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-[11px] text-destructive hover:bg-destructive/20">
                  <XCircle className="h-3.5 w-3.5" /> Declined — resend
                </button>
              )}
              {!isShared(c.id) && <button onClick={() => update("contracts", (all) => all.filter((x) => x.id !== c.id))} className="text-muted-foreground hover:text-[oklch(0.7_0.2_20)]"><Trash2 className="h-4 w-4" /></button>}
            </div>
          );
        })}
        {contracts.length === 0 && <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">No contracts yet.</div>}
        {contracts.length > 0 && shown.length === 0 && <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">No contracts match "{q}".</div>}
      </section>

      <AnimatePresence>{viewer && <FileViewer url={viewer.url} fileName={viewer.name} onClose={() => setViewer(null)} />}</AnimatePresence>
      <AnimatePresence>
        {signModal && (
          <SendSignatureModal
            contract={signModal}
            onClose={() => setSignModal(null)}
            accessToken={accessToken}
            onSent={(patch) => {
              update("contracts", (all) => all.map((x) => (x.id === signModal.id ? { ...x, ...patch } : x)));
              setSignModal(null);
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {splitOpen && (
          <SplitSheetModal
            onClose={() => setSplitOpen(false)}
            onGenerated={(name) => update("contracts", (c) => [{ id: uid("c"), name, tag: "Split Sheet" as ContractTag, expiresOn: "", fileName: `${name.replace(/\s+/g, "_")}_Split_Sheet.pdf` }, ...c])}
          />
        )}
      </AnimatePresence>
    </AppShell>
  );
}

const field = "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40";

/* Send a contract for e-signature via Dropbox Sign — see lib/esignature.ts.
   Needs the contract's Storage file (filePath), since Dropbox Sign
   downloads the document server-side from a signed URL rather than taking
   an upload directly from this modal. */
function SendSignatureModal({
  contract,
  onClose,
  accessToken,
  onSent,
}: {
  contract: Contract;
  onClose: () => void;
  accessToken: () => Promise<string | undefined>;
  onSent: (patch: Partial<Contract>) => void;
}) {
  const [signerName, setSignerName] = useState(contract.signerName ?? "");
  const [signerEmail, setSignerEmail] = useState(contract.signerEmail ?? "");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send() {
    if (!signerEmail.trim() || !contract.filePath) return;
    setSending(true);
    setError(null);
    try {
      const fileUrl = await signedUrl("contracts", contract.filePath, 60 * 60 * 24 * 7); // valid a week — plenty for Dropbox Sign to fetch it
      if (!fileUrl) {
        setError("Couldn't generate a link to the contract file.");
        setSending(false);
        return;
      }
      const token = await accessToken();
      const res = await sendForSignature({
        data: {
          accessToken: token ?? "",
          contractId: contract.id,
          contractName: contract.name,
          fileUrl,
          signerName: signerName.trim(),
          signerEmail: signerEmail.trim(),
        },
      });
      if (!res.ok) {
        setError(res.error || "Couldn't send for signature.");
        setSending(false);
        return;
      }
      onSent({ signatureStatus: "sent", signatureRequestId: res.requestId, signerName: signerName.trim(), signerEmail: signerEmail.trim() });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setSending(false);
    }
  }

  return (
    <ModalShell eyebrow="The Vault · E-Signature" title={`Send "${contract.name}" for signature`} onClose={onClose}>
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Signer name</label>
          <input className={field} value={signerName} onChange={(e) => setSignerName(e.target.value)} placeholder="Full name" />
        </div>
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Signer email</label>
          <input type="email" className={field} value={signerEmail} onChange={(e) => setSignerEmail(e.target.value)} placeholder="name@email.com" />
        </div>
      </div>

      {error && <div className="mt-3 text-xs text-destructive">{error}</div>}

      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="glass rounded-full px-4 py-2.5 text-sm hover:bg-white/5">Cancel</button>
        <MagneticButton onClick={send} className={!signerEmail.trim() || sending ? "pointer-events-none opacity-50" : ""}>
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} {sending ? "Sending…" : "Send for signature"}
        </MagneticButton>
      </div>
    </ModalShell>
  );
}

const ROLES = ["Composer", "Lyricist", "Producer", "Co-Producer", "Featured Artist", "Arranger", "Mix Engineer", "Executive Producer"];

function SplitSheetModal({ onClose, onGenerated }: { onClose: () => void; onGenerated: (trackTitle: string) => void }) {
  const [trackTitle, setTrackTitle] = useState("");
  const [artist, setArtist]         = useState("");
  const [isrc, setIsrc]             = useState("");
  const [iswc, setIswc]             = useState("");
  const [label, setLabel]           = useState("");
  const [publisher, setPublisher]   = useState("");
  const [date, setDate]             = useState(() => new Date().toISOString().slice(0, 10));
  const [entries, setEntries]       = useState<SplitEntry[]>([
    { name: "", role: "Composer",  publisher: "", ipi: "", email: "", masterPct: 50, pubPct: 50 },
    { name: "", role: "Lyricist",  publisher: "", ipi: "", email: "", masterPct: 50, pubPct: 50 },
  ]);

  const masterTotal = entries.reduce((s, e) => s + (Number(e.masterPct) || 0), 0);
  const pubTotal    = entries.reduce((s, e) => s + (Number(e.pubPct)    || 0), 0);

  function updateEntry(i: number, patch: Partial<SplitEntry>) {
    setEntries((all) => all.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));
  }
  function addEntry() {
    setEntries((all) => [...all, { name: "", role: "Composer", publisher: "", ipi: "", email: "", masterPct: 0, pubPct: 0 }]);
  }
  function removeEntry(i: number) { setEntries((all) => all.filter((_, idx) => idx !== i)); }
  function autoBalance(field: "masterPct" | "pubPct") {
    const n = entries.length;
    if (!n) return;
    const share = Math.floor(100 / n);
    const rem   = 100 - share * n;
    setEntries((all) => all.map((e, i) => ({ ...e, [field]: i === 0 ? share + rem : share })));
  }

  function generate() {
    if (!trackTitle.trim() || entries.every((e) => !e.name.trim())) return;
    const input: SplitSheetInput = {
      trackTitle, artist, isrc, iswc, label, publisher, date,
      entries: entries.filter((e) => e.name.trim()),
    };
    splitSheetPdf(input);
    onGenerated(trackTitle.trim());
    onClose();
  }

  const totalOk = masterTotal === 100 && pubTotal === 100;

  return (
    <ModalShell eyebrow="The Vault · Legal Document" title="Music Split Sheet" onClose={onClose}>
      {/* Track info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 sm:col-span-1">
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Track title *</label>
          <input className={field} value={trackTitle} onChange={(e) => setTrackTitle(e.target.value)} placeholder="e.g. Shabhi Bel Meli" />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Artist / Band *</label>
          <input className={field} value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="e.g. Latifa" />
        </div>
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">ISRC</label>
          <input className={field} value={isrc} onChange={(e) => setIsrc(e.target.value)} placeholder="EGXXX2600001" />
        </div>
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">ISWC</label>
          <input className={field} value={iswc} onChange={(e) => setIswc(e.target.value)} placeholder="T-000.000.000-0" />
        </div>
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Label / Rights Holder</label>
          <input className={field} value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Rotana" />
        </div>
        <div>
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Publishing Admin</label>
          <input className={field} value={publisher} onChange={(e) => setPublisher(e.target.value)} placeholder="e.g. Sony Music Publishing" />
        </div>
        <div className="col-span-2">
          <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Agreement date</label>
          <input type="date" className={field + " [color-scheme:dark]"} value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>

      {/* Ownership totals bar */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { label: "Master %", total: masterTotal, field: "masterPct" as const },
          { label: "Publishing %", total: pubTotal, field: "pubPct" as const },
        ].map(({ label: lbl, total, field: f }) => (
          <div key={f} className="glass rounded-xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{lbl}</span>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs font-bold ${total === 100 ? "text-[oklch(0.8_0.18_150)]" : total > 100 ? "text-red-400" : "text-yellow-400"}`}>
                  {total}%
                </span>
                <button onClick={() => autoBalance(f)} className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] hover:bg-white/5">Auto</button>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${total === 100 ? "bg-[oklch(0.7_0.18_150)]" : total > 100 ? "bg-red-500" : "bg-yellow-500"}`}
                style={{ width: `${Math.min(total, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Contributors table */}
      <div className="mt-5 space-y-2">
        <div className="hidden sm:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1.5fr_auto] gap-2 text-[9px] uppercase tracking-widest text-muted-foreground px-1">
          <span>Name</span><span>Role</span><span>IPI/CAE</span><span>Master%</span><span>Pub%</span><span>Publisher</span><span />
        </div>
        {entries.map((e, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1.5fr_auto] gap-2 items-center glass rounded-xl p-2">
            <input className={field} placeholder="Full name *" value={e.name} onChange={(ev) => updateEntry(i, { name: ev.target.value })} />
            <select className={field} value={e.role} onChange={(ev) => updateEntry(i, { role: ev.target.value })}>
              {ROLES.map((r) => <option key={r} value={r} className="bg-[#140a1e]">{r}</option>)}
            </select>
            <input className={field} placeholder="IPI" value={e.ipi || ""} onChange={(ev) => updateEntry(i, { ipi: ev.target.value })} />
            <input type="number" min={0} max={100} className={field} placeholder="0" value={e.masterPct || ""} onChange={(ev) => updateEntry(i, { masterPct: Number(ev.target.value) })} />
            <input type="number" min={0} max={100} className={field} placeholder="0" value={e.pubPct || ""} onChange={(ev) => updateEntry(i, { pubPct: Number(ev.target.value) })} />
            <input className={field} placeholder="Publisher" value={e.publisher || ""} onChange={(ev) => updateEntry(i, { publisher: ev.target.value })} />
            <button onClick={() => removeEntry(i)} className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
        ))}
        <button onClick={addEntry} className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5">
          <Plus className="h-3.5 w-3.5" /> Add contributor
        </button>
      </div>

      {!totalOk && (
        <p className="mt-3 text-[11px] text-yellow-400">
          {masterTotal !== 100 && `Master splits must equal 100% (currently ${masterTotal}%). `}
          {pubTotal !== 100 && `Publishing splits must equal 100% (currently ${pubTotal}%). `}
          You can still generate the PDF — a warning will appear on the document.
        </p>
      )}

      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onClose} className="glass rounded-full px-4 py-2.5 text-sm hover:bg-white/5">Cancel</button>
        <MagneticButton onClick={generate} className={!trackTitle.trim() ? "opacity-40 pointer-events-none" : ""}>
          <FilePlus2 className="h-4 w-4" /> Generate PDF
        </MagneticButton>
      </div>
    </ModalShell>
  );
}
