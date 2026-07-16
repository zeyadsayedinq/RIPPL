import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useOS } from "@/lib/os-store";
import { useCampaigns } from "@/lib/campaign-store";
import { ArrowRight, Users, Disc3, FolderLock, Palette, Cpu, Megaphone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "RIPPL · My Universe" }, { name: "description", content: "Zeyad's universe — more than a dashboard." }] }),
  component: Universe,
});

function Universe() {
  const os = useOS();
  const { campaigns } = useCampaigns();

  const activeDeals = os.deals.filter((d) => d.status !== "Paid").length;
  const stats = [
    { label: "Artists", value: os.artists.length },
    { label: "Releases", value: os.releases.length },
    { label: "Active deals", value: activeDeals },
    { label: "Campaigns", value: campaigns.length },
    { label: "Contracts", value: os.contracts.length },
    { label: "Builds", value: os.projects.length },
  ];

  const modules = [
    { to: "/roster", label: "Roster", desc: "A&R, scouting & artist management", icon: Users, count: os.artists.length },
    { to: "/releases", label: "Releases", desc: "Distribution & label operations", icon: Disc3, count: os.releases.length },
    { to: "/vault", label: "The Vault", desc: "Contracts, splits & legal", icon: FolderLock, count: os.contracts.length },
    { to: "/studio", label: "Studio", desc: "Creative, moodboards & campaign copy", icon: Palette, count: os.notes.length },
    { to: "/techlab", label: "Tech Lab", desc: "SaaS builds & AI prompt library", icon: Cpu, count: os.projects.length + os.prompts.length },
    { to: "/dashboard", label: "Marketing", desc: "360 campaigns across every platform", icon: Megaphone, count: campaigns.length },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black font-display text-white">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[70vw] w-[70vw] -translate-x-1/2 rounded-full opacity-[0.10] blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.08 300) 0%, transparent 65%)" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10">
        {/* Nav */}
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <circle cx="2.5" cy="19.5" r="2" fill="white" />
                <path d="M 2.5 13.5 A 7 7 0 0 1 9.5 19.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M 2.5 8 A 12.5 12.5 0 0 1 15 19.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
                <path d="M 2.5 2 A 18.5 18.5 0 0 1 21 19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-[0.2em]">RIPPL</span>
          </div>
          <Link to="/home" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.03]">
            Enter <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>

        {/* Hero */}
        <section className="mt-20 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.4em] text-white/40">RIPPL // MY UNIVERSE</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-4 font-bold leading-[1.02]" style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}>
            Zeyad's <span className="text-gradient-neon">Universe</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            Not a dashboard — a command center for everything I build. A&R and artist management,
            music distribution, 360° marketing, and the AI tools I ship. Every artist I scout, every record I drop,
            every deal I close, every contract I sign, every campaign I run — it all lives here.
            One brain for the whole operation. Less noise, more range.
          </motion.p>
        </section>

        {/* Live stats */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-center">
              <div className="font-display text-3xl font-bold">{s.value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-white/40">{s.label}</div>
            </div>
          ))}
        </motion.section>

        {/* Module cards */}
        <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <motion.div key={m.to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.05 }}>
              <Link to={m.to} className="group flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-colors hover:border-white/25 hover:bg-white/[0.04]">
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"><m.icon className="h-5 w-5 text-white/70" /></div>
                  <span className="font-mono text-sm text-white/40">{m.count}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-lg font-semibold">{m.label}<ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" /></div>
                <div className="mt-1 text-sm text-white/45">{m.desc}</div>
              </Link>
            </motion.div>
          ))}
        </section>

        <footer className="mt-16 border-t border-white/[0.06] pt-6 text-[11px] text-white/30">
          © 2026 RIPPL — Built by Zeyad Sayedin. All rights reserved. This is my universe.
        </footer>
      </div>
    </div>
  );
}
