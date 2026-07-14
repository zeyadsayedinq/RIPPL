import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { assets, type Asset } from "@/lib/mock-data";
import { useState } from "react";
import { FileAudio, FileImage, FileText, FileVideo, MessageSquare, Send, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/assets")({
  head: () => ({
    meta: [
      { title: "Assets · RIPPL" },
      { name: "description", content: "Asset library and collaboration space for your active campaign." },
    ],
  }),
  component: AssetsPage,
});

const typeIcon = { Audio: FileAudio, Art: FileImage, Brief: FileText, Video: FileVideo } as const;

function AssetsPage() {
  const [selected, setSelected] = useState<Asset | null>(assets[0] ?? null);
  const [filter, setFilter] = useState<"All" | Asset["type"]>("All");
  const list = assets.filter((a) => filter === "All" || a.type === filter);

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">Library</div>
          <h1 className="mt-1 font-display text-3xl font-bold">Asset <span className="text-gradient-neon">Vault</span></h1>
        </div>
        <div className="flex gap-2">
          {(["All", "Brief", "Audio", "Art", "Video"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`relative rounded-full px-3 py-1.5 text-xs transition-colors ${filter === t ? "text-white" : "text-muted-foreground hover:text-white"}`}
            >
              {filter === t && (
                <motion.div layoutId="asset-filter" className="absolute inset-0 rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)]/40 to-[oklch(0.5_0.3_300)]/40 border border-[oklch(0.7_0.28_328)]/40" />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.length === 0 && (
            <div className="col-span-full glass rounded-2xl p-10 text-center text-sm text-muted-foreground">
              No assets yet. Uploaded briefs, audio, artwork and video will appear here.
            </div>
          )}
          {list.map((a, i) => {
            const Icon = typeIcon[a.type];
            const isActive = selected?.id === a.id;
            return (
              <motion.button
                key={a.id}
                onClick={() => setSelected(a)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass group relative rounded-2xl p-5 text-left transition-all ${isActive ? "border-[oklch(0.7_0.28_328)]/50 shadow-[0_0_32px_rgba(232,121,249,0.15)]" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="glass grid h-11 w-11 place-items-center rounded-xl">
                    <Icon className="h-5 w-5 text-[oklch(0.7_0.28_328)]" />
                  </div>
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {a.version}
                  </span>
                </div>
                <div className="mt-4 font-semibold">{a.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{a.owner}</div>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.updated}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {a.comments.length}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <SpotlightCard className="col-span-12 lg:col-span-4 p-5 h-fit sticky top-4">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Discussion</div>
                  <div className="mt-1 font-display text-lg font-bold truncate">{selected.name}</div>
                </div>

                <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
                  {selected.comments.length === 0 && (
                    <div className="glass rounded-xl p-4 text-center text-sm text-muted-foreground">
                      No comments yet. Kick off the thread.
                    </div>
                  )}
                  {selected.comments.map((c) => (
                    <div key={c.id} className="glass rounded-xl p-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)] text-[10px] font-bold">
                            {c.author.charAt(0)}
                          </div>
                          <span className="font-medium">{c.author}</span>
                          <span className="text-muted-foreground">· {c.role}</span>
                        </div>
                        <span className="text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="mt-2 text-sm text-foreground/90">{c.text}</p>
                    </div>
                  ))}
                </div>

                <div className="glass flex items-center gap-2 rounded-xl p-2">
                  <input
                    placeholder="Reply to thread…"
                    className="flex-1 bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <MagneticButton>
                    <Send className="h-3.5 w-3.5" />
                  </MagneticButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SpotlightCard>
      </div>
    </AppShell>
  );
}
