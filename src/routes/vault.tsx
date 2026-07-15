import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useOS, uid, type ContractTag } from "@/lib/os-store";
import { Upload, FileSignature, AlertTriangle, Trash2 } from "lucide-react";

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
  const { contracts, update } = useOS();
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  function add(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) =>
      update("contracts", (c) => [{ id: uid("c"), name: file.name.replace(/\.[^.]+$/, ""), tag: "Other" as ContractTag, expiresOn: "", fileName: file.name }, ...c])
    );
  }

  const expiring = contracts.map((c) => ({ c, d: daysUntil(c.expiresOn) })).filter((x) => x.d !== null && x.d <= 30 && x.d >= 0);

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Legal · The Vault</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Contract <span className="text-gradient-neon">Vault</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Store, tag and monitor every agreement. Alerts fire 30 days before expiry.</p>
      </header>

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

      <section className="mt-6 grid grid-cols-1 gap-3">
        {contracts.map((c) => {
          const d = daysUntil(c.expiresOn);
          const warn = d !== null && d <= 30 && d >= 0;
          return (
            <div key={c.id} className="glass flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5"><FileSignature className="h-5 w-5 text-white/50" /></div>
                <div className="min-w-0"><div className="truncate font-medium">{c.name}</div><div className="truncate text-xs text-muted-foreground">{c.fileName}</div></div>
              </div>
              <select
                value={c.tag}
                onChange={(e) => update("contracts", (all) => all.map((x) => x.id === c.id ? { ...x, tag: e.target.value as ContractTag } : x))}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs outline-none"
              >
                {TAGS.map((t) => <option key={t} className="bg-[#140a1e]">{t}</option>)}
              </select>
              <input
                type="date" value={c.expiresOn}
                onChange={(e) => update("contracts", (all) => all.map((x) => x.id === c.id ? { ...x, expiresOn: e.target.value } : x))}
                className={`rounded-full border bg-white/[0.03] px-3 py-1.5 text-xs outline-none ${warn ? "border-[oklch(0.82_0.16_90)]/60 text-[oklch(0.85_0.16_90)]" : "border-white/10"}`}
              />
              <button onClick={() => update("contracts", (all) => all.filter((x) => x.id !== c.id))} className="text-muted-foreground hover:text-[oklch(0.7_0.2_20)]"><Trash2 className="h-4 w-4" /></button>
            </div>
          );
        })}
        {contracts.length === 0 && <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">No contracts yet.</div>}
      </section>
    </AppShell>
  );
}
