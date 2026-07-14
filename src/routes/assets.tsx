import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { EmptyState } from "@/components/EmptyState";
import { useCampaigns, type AssetStatus, type UploadedAsset } from "@/lib/campaign-store";
import { FileAudio, FileImage, FileText, FileVideo, File as FileIcon, Upload, Trash2, Clock } from "lucide-react";

export const Route = createFileRoute("/assets")({
  head: () => ({ meta: [{ title: "Assets · RIPPL" }, { name: "description", content: "Upload and approve campaign assets." }] }),
  component: AssetsPage,
});

const typeIcon: Record<UploadedAsset["type"], any> = { Audio: FileAudio, Art: FileImage, Brief: FileText, Video: FileVideo, Other: FileIcon };
const statusColor: Record<AssetStatus, string> = {
  Draft: "oklch(0.7 0.02 260)", "Under Review": "oklch(0.8 0.16 80)",
  Approved: "oklch(0.85 0.18 150)", "Needs Revision": "oklch(0.7 0.2 20)",
};
const STATUSES: AssetStatus[] = ["Draft", "Under Review", "Approved", "Needs Revision"];

function detectType(file: File): UploadedAsset["type"] {
  const m = file.type;
  if (m.startsWith("image/")) return "Art";
  if (m.startsWith("audio/")) return "Audio";
  if (m.startsWith("video/")) return "Video";
  if (m === "application/pdf" || m.includes("word") || m.includes("document")) return "Brief";
  return "Other";
}
const fmtSize = (b: number) => (b >= 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${(b / 1e3).toFixed(0)} KB`);

function AssetsPage() {
  const { active, activeAssets, addAsset, setAssetStatus, removeAsset } = useCampaigns();
  const inputRef = useRef<HTMLInputElement>(null);

  if (!active) {
    return (
      <AppShell>
        <EmptyState title="No campaign yet" note="Create a campaign to upload and manage its briefs, audio, artwork and video." />
      </AppShell>
    );
  }

  function onFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const type = detectType(file);
      const base = { name: file.name, type, size: file.size };
      // store a small preview for images only, to respect localStorage limits
      if (type === "Art" && file.size < 500_000) {
        const reader = new FileReader();
        reader.onload = () => addAsset({ ...base, previewUrl: String(reader.result) });
        reader.readAsDataURL(file);
      } else {
        addAsset(base);
      }
    });
  }

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">Library · {active.artist}</div>
          <h1 className="mt-1 font-display text-3xl font-bold">Asset <span className="text-gradient-neon">Vault</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">{activeAssets.length} asset{activeAssets.length !== 1 ? "s" : ""} · {activeAssets.filter((a) => a.status === "Approved").length} approved</p>
        </div>
        <input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => { onFiles(e.target.files); e.target.value = ""; }} />
        <MagneticButton onClick={() => inputRef.current?.click()}><Upload className="h-4 w-4" /> Upload asset</MagneticButton>
      </header>

      {/* Dropzone */}
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}
        className="mt-6 w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center transition-colors hover:border-[oklch(0.7_0.28_328)]/50"
      >
        <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
        <div className="mt-2 text-sm text-muted-foreground">Drag & drop files here, or click to browse — briefs, audio, artwork, video.</div>
      </button>

      {activeAssets.length === 0 ? (
        <div className="mt-6 glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
          No assets yet. Upload your first file to start the approval workflow.
        </div>
      ) : (
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {activeAssets.map((a, i) => {
            const Icon = typeIcon[a.type];
            return (
              <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="glass rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <div className="glass grid h-11 w-11 place-items-center rounded-xl overflow-hidden">
                    {a.previewUrl ? <img src={a.previewUrl} alt="" className="h-full w-full object-cover" /> : <Icon className="h-5 w-5 text-[oklch(0.7_0.28_328)]" />}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]" style={{ color: statusColor[a.status], background: statusColor[a.status] + "1a" }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusColor[a.status] }} />{a.status}
                  </span>
                </div>
                <div className="mt-4 truncate font-semibold" title={a.name}>{a.name}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{a.type}</span><span>·</span><span>{fmtSize(a.size)}</span><span>·</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {a.addedAt}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setAssetStatus(a.id, s)}
                      className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${a.status === s ? "text-white" : "text-muted-foreground hover:text-white"}`}
                      style={{ borderColor: a.status === s ? statusColor[s] : "rgba(255,255,255,0.1)", background: a.status === s ? statusColor[s] + "1a" : "transparent" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex justify-end">
                  <button onClick={() => removeAsset(a.id)} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-[oklch(0.7_0.2_20)]">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </motion.div>
            );
          })}
        </section>
      )}
    </AppShell>
  );
}
