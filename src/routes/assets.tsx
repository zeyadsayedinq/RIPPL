import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { MagneticButton } from "@/components/MagneticButton";
import { EmptyState } from "@/components/EmptyState";
import { useCampaigns, type AssetStatus, type UploadedAsset } from "@/lib/campaign-store";
import { useRole, type Role } from "@/lib/role-context";
import {
  FileAudio, FileImage, FileText, FileVideo, File as FileIcon,
  Upload, Trash2, Clock, CheckCircle2, RotateCcw, ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/assets")({
  head: () => ({ meta: [{ title: "Assets · RIPPL" }, { name: "description", content: "Upload and approve campaign assets." }] }),
  component: AssetsPage,
});

const typeIcon: Record<UploadedAsset["type"], any> = {
  Audio: FileAudio, Art: FileImage, Brief: FileText, Video: FileVideo, Other: FileIcon,
};

const STATUS_META: Record<AssetStatus, { color: string; bg: string }> = {
  "Draft":          { color: "oklch(0.72 0.02 260)",  bg: "rgba(180,180,200,0.05)"  },
  "Under Review":   { color: "oklch(0.82 0.16 80)",   bg: "rgba(200,170,50,0.07)"   },
  "Needs Revision": { color: "oklch(0.72 0.22 20)",   bg: "rgba(220,80,60,0.07)"    },
  "Approved":       { color: "oklch(0.82 0.18 150)",  bg: "rgba(50,200,100,0.06)"   },
};

type ColAction = {
  label: string;
  icon: any;
  target: AssetStatus;
  roles: Role[];
  style: "approve" | "reject" | "neutral";
};

const COLUMNS: { status: AssetStatus; actions: ColAction[] }[] = [
  {
    status: "Draft",
    actions: [
      { label: "Submit for Review", icon: ChevronRight, target: "Under Review", roles: ["Marketing Manager", "Team Member"], style: "neutral" },
    ],
  },
  {
    status: "Under Review",
    actions: [
      { label: "Approve", icon: CheckCircle2, target: "Approved", roles: ["Marketing Manager"], style: "approve" },
      { label: "Request Revision", icon: RotateCcw, target: "Needs Revision", roles: ["Marketing Manager"], style: "reject" },
    ],
  },
  {
    status: "Needs Revision",
    actions: [
      { label: "Resubmit", icon: ChevronRight, target: "Under Review", roles: ["Marketing Manager", "Team Member"], style: "neutral" },
    ],
  },
  { status: "Approved", actions: [] },
];

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
  const { role } = useRole();
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
      if (type === "Art" && file.size < 500_000) {
        const reader = new FileReader();
        reader.onload = () => addAsset({ ...base, previewUrl: String(reader.result) });
        reader.readAsDataURL(file);
      } else {
        addAsset(base);
      }
    });
  }

  const byStatus = (s: AssetStatus) => activeAssets.filter((a) => a.status === s);
  const approvedCount = byStatus("Approved").length;
  const reviewCount = byStatus("Under Review").length;

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">
            Pipeline · {active.artist}
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold">
            Asset <span className="text-gradient-neon">Pipeline</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {activeAssets.length} asset{activeAssets.length !== 1 ? "s" : ""} · {approvedCount} approved · {reviewCount} in review
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef} type="file" multiple className="hidden"
            onChange={(e) => { onFiles(e.target.files); e.target.value = ""; }}
          />
          <MagneticButton onClick={() => inputRef.current?.click()}>
            <Upload className="h-4 w-4" /> Upload asset
          </MagneticButton>
        </div>
      </header>

      {/* Dropzone */}
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}
        className="mt-4 w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-center transition-colors hover:border-[oklch(0.7_0.28_328)]/50"
      >
        <Upload className="mx-auto h-5 w-5 text-muted-foreground" />
        <div className="mt-1.5 text-xs text-muted-foreground">
          Drag & drop files here, or click to browse — briefs, audio, artwork, video.
        </div>
      </button>

      {/* Kanban pipeline */}
      {activeAssets.length === 0 ? (
        <div className="mt-6 glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
          No assets yet. Upload your first file to start the approval pipeline.
        </div>
      ) : (
        <div className="mt-6 flex gap-3 overflow-x-auto pb-4">
          {COLUMNS.map((col) => {
            const cards = byStatus(col.status);
            const meta = STATUS_META[col.status];
            return (
              <div key={col.status} className="flex min-w-[240px] flex-1 flex-col gap-2.5">
                {/* Column header */}
                <div
                  className="flex items-center justify-between rounded-xl px-3 py-2.5"
                  style={{ background: meta.bg, borderLeft: `3px solid ${meta.color}` }}
                >
                  <span className="text-sm font-semibold" style={{ color: meta.color }}>
                    {col.status}
                  </span>
                  <span
                    className="grid h-5 min-w-[20px] place-items-center rounded-full px-1.5 text-[10px] font-bold text-black"
                    style={{ background: meta.color }}
                  >
                    {cards.length}
                  </span>
                </div>

                {/* Empty column */}
                {cards.length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-[11px] text-muted-foreground/40">
                    Empty
                  </div>
                )}

                {/* Cards */}
                {cards.map((a, i) => {
                  const Icon = typeIcon[a.type];
                  const allowedActions = col.actions.filter((ac) => ac.roles.includes(role as Role));
                  return (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="glass rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg"
                          style={{ background: meta.bg }}
                        >
                          {a.previewUrl ? (
                            <img src={a.previewUrl} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <Icon className="h-4 w-4" style={{ color: meta.color }} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium" title={a.name}>
                            {a.name}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                            <span>{a.type}</span>
                            <span>·</span>
                            <span>{fmtSize(a.size)}</span>
                          </div>
                          <div className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Clock className="h-2.5 w-2.5" /> {a.addedAt}
                          </div>
                        </div>
                      </div>

                      {allowedActions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {allowedActions.map((ac) => {
                            const c =
                              ac.style === "approve"
                                ? STATUS_META["Approved"].color
                                : ac.style === "reject"
                                  ? STATUS_META["Needs Revision"].color
                                  : "rgba(255,255,255,0.65)";
                            return (
                              <button
                                key={ac.label}
                                onClick={() => setAssetStatus(a.id, ac.target)}
                                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-opacity hover:opacity-80"
                                style={{ color: c, border: `1px solid ${c}40` }}
                              >
                                <ac.icon className="h-2.5 w-2.5" /> {ac.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => removeAsset(a.id)}
                          className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/40 hover:text-[oklch(0.7_0.2_20)]"
                        >
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
