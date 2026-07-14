import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useCampaigns } from "@/lib/campaign-store";
import { EmptyState } from "@/components/EmptyState";
import { type ChannelRow } from "@/lib/campaign-data";
import { Radio as RadioIcon, DollarSign, ListMusic, Newspaper, Antenna } from "lucide-react";

export const Route = createFileRoute("/channels")({
  head: () => ({ meta: [{ title: "Channels · RIPPL" }, { name: "description", content: "360 channel plan — social, paid, playlists, press, radio." }] }),
  component: ChannelsPage,
});

type Tab = "social" | "paid" | "playlists" | "press" | "radio";
const TABS: { key: Tab; label: string; icon: any }[] = [
  { key: "social", label: "Social", icon: RadioIcon },
  { key: "paid", label: "Paid Ads", icon: DollarSign },
  { key: "playlists", label: "Playlists", icon: ListMusic },
  { key: "press", label: "PR / Press", icon: Newspaper },
  { key: "radio", label: "Radio & TV", icon: Antenna },
];
const statusColor: Record<string, string> = { Live: "oklch(0.85 0.18 150)", Booked: "oklch(0.85 0.18 200)", Planned: "oklch(0.8 0.16 80)" };

function ChannelsPage() {
  const { active, activeTemplate } = useCampaigns();
  const [tab, setTab] = useState<Tab>("social");

  if (!active) {
    return (
      <AppShell>
        <EmptyState title="No campaign yet" note="Create a campaign to plan its 360° channel mix — social, paid, playlists, press and broadcast." />
      </AppShell>
    );
  }

  const ch = activeTemplate?.channels ?? { social: [], paid: [], playlists: [], press: [], radio: [] };

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]">360° Channel Plan · {active.artist}</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Every <span className="text-gradient-neon">Channel</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Organic, paid, playlists, press and broadcast — not just influencers.{activeTemplate ? ` Plan seeded from the ${activeTemplate.name} template.` : ""}</p>
      </header>

      <div className="mt-6 flex gap-1.5 overflow-x-auto rounded-2xl glass p-1.5">
        {TABS.map((t) => {
          const on = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${on ? "text-white" : "text-muted-foreground hover:text-white"}`}>
              {on && <motion.div layoutId="ch-tab" className="absolute inset-0 rounded-xl bg-gradient-to-r from-[oklch(0.7_0.28_328)]/30 to-[oklch(0.5_0.3_300)]/10 border border-[oklch(0.7_0.28_328)]/30" transition={{ type: "spring", stiffness: 320, damping: 30 }} />}
              <t.icon className="relative h-4 w-4" /><span className="relative whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mt-6">
          {(tab === "social" || tab === "paid") && (
            (tab === "social" ? ch.social : ch.paid).length === 0
              ? <EmptyNote label={tab === "social" ? "social" : "paid"} />
              : <ChannelGrid rows={tab === "social" ? ch.social : ch.paid} />
          )}
          {tab === "playlists" && (
            <SpotlightCard className="p-6" spotlight={false}>
              <SectionHead title="Playlist & Pitching Targets" note="Editorial playlists, curators and pitching services." />
              {ch.playlists.length === 0 ? <EmptyNote label="playlist" /> : <List rows={ch.playlists.map((p) => ({ a: p.name, b: `${p.followers} followers`, status: p.status }))} />}
            </SpotlightCard>
          )}
          {tab === "press" && (
            <SpotlightCard className="p-6" spotlight={false}>
              <SectionHead title="PR & Press Campaign" note="Guaranteed features + non-guaranteed submissions across regions." />
              {ch.press.length === 0 ? <EmptyNote label="press" /> : (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[620px] text-sm">
                  <thead><tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <th className="pb-3">Outlet</th><th className="pb-3">Region</th><th className="pb-3">Type</th><th className="pb-3">Contact</th><th className="pb-3 text-right">Status</th>
                  </tr></thead>
                  <tbody>
                    {ch.press.map((p) => (
                      <tr key={p.outlet} className="border-t border-white/[0.06]">
                        <td className="py-3 font-medium">{p.outlet}</td>
                        <td className="py-3 text-muted-foreground">{p.region}</td>
                        <td className="py-3 text-muted-foreground">{p.type}</td>
                        <td className="py-3 text-muted-foreground">{p.contact}</td>
                        <td className="py-3 text-right"><Badge status={p.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
            </SpotlightCard>
          )}
          {tab === "radio" && (
            <SpotlightCard className="p-6" spotlight={false}>
              <SectionHead title="Radio & TV Broadcasting" note="Regional rotation and radio-network plays." />
              {ch.radio.length === 0 ? <EmptyNote label="radio" /> : <List rows={ch.radio.map((r) => ({ a: r.station, b: `${r.region} — ${r.note}`, status: "Planned" }))} />}
            </SpotlightCard>
          )}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}

function EmptyNote({ label }: { label: string }) {
  return <p className="mt-4 text-sm text-muted-foreground">No {label} channels planned for this campaign yet.</p>;
}

function ChannelGrid({ rows }: { rows: ChannelRow[] }) {
  return (
    <section className="grid grid-cols-12 gap-4">
      {rows.map((r) => (
        <SpotlightCard key={r.name} className="col-span-12 md:col-span-6 p-5">
          <div className="flex items-start justify-between">
            <div className="font-semibold">{r.name}</div>
            <Badge status={r.status} />
          </div>
          <div className="mt-3 font-display text-2xl font-bold text-gradient-neon">{r.metric}</div>
          <div className="mt-1 text-xs text-muted-foreground">{r.note}</div>
          <div className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground/70">Owner · {r.owner}</div>
        </SpotlightCard>
      ))}
    </section>
  );
}

function SectionHead({ title, note }: { title: string; note: string }) {
  return (<><h2 className="font-display text-2xl font-bold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{note}</p></>);
}
function List({ rows }: { rows: { a: string; b: string; status: string }[] }) {
  return (
    <div className="mt-5 space-y-2">
      {rows.map((r) => (
        <div key={r.a} className="glass flex items-center justify-between rounded-xl p-3">
          <div className="min-w-0"><div className="truncate text-sm font-medium">{r.a}</div><div className="truncate text-xs text-muted-foreground">{r.b}</div></div>
          <Badge status={r.status} />
        </div>
      ))}
    </div>
  );
}
function Badge({ status }: { status: string }) {
  const c = statusColor[status] ?? "oklch(0.6 0.02 260)";
  return <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]" style={{ color: c, background: c + "1a" }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />{status}</span>;
}
