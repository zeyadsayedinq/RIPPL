import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useOS } from "@/lib/os-store";
import { useCampaigns } from "@/lib/campaign-store";
import { FeatureCard } from "@/components/FeatureCard";
import { ArrowRight, Users, Disc3, FolderLock, Palette, Cpu, Megaphone } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "RIPPL · My Universe" }, { name: "description", content: "Zeyad's universe — more than a dashboard." }] }),
  component: Universe,
});

const BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";
const SCENES = [
  { url: BASE + "hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4", label: "Command" },
  { url: BASE + "hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4", label: "Network" },
  { url: BASE + "hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4", label: "Studio" },
  { url: BASE + "hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4", label: "Night Ops" },
];

function Universe() {
  const os = useOS();
  const { campaigns } = useCampaigns();
  const [scene, setScene] = useState(0);

  useEffect(() => { const id = setInterval(() => setScene((s) => (s + 1) % SCENES.length), 8000); return () => clearInterval(id); }, []);
  const switchScene = useCallback((i: number) => setScene(i), []);

  const activeDeals = os.deals.filter((d) => d.status !== "Paid").length;
  const stats = [
    { label: "Artists", value: os.artists.length },
    { label: "Releases", value: os.releases.length },
    { label: "Deals", value: activeDeals },
    { label: "Campaigns", value: campaigns.length },
    { label: "Contracts", value: os.contracts.length },
    { label: "Builds", value: os.projects.length },
  ];
  const modules = [
    { to: "/roster", label: "Roster", desc: "A&R, scouting & artist management.", icon: <Users size={32} strokeWidth={2.5} />, count: os.artists.length, gradient: "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)", delay: 0.1 },
    { to: "/releases", label: "Releases", desc: "Distribution & label operations.", icon: <Disc3 size={32} strokeWidth={2.5} />, count: os.releases.length, gradient: "linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)", delay: 0.15 },
    { to: "/vault", label: "The Vault", desc: "Contracts, splits & legal.", icon: <FolderLock size={32} strokeWidth={2.5} />, count: os.contracts.length, gradient: "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)", delay: 0.2 },
    { to: "/studio", label: "Studio", desc: "Creative, moodboards & copy.", icon: <Palette size={32} strokeWidth={2.5} />, count: os.notes.length, gradient: "linear-gradient(137deg, #06B6D4 0%, #A5F3FC 45%, #FFFFFF 100%)", delay: 0.25 },
    { to: "/techlab", label: "Tech Lab", desc: "SaaS builds & AI prompts.", icon: <Cpu size={32} strokeWidth={2.5} />, count: os.projects.length + os.prompts.length, gradient: "linear-gradient(137deg, #F72585 0%, #E0AEFF 45%, #4361EE 100%)", delay: 0.3 },
    { to: "/dashboard", label: "Marketing", desc: "360 campaigns, every platform.", icon: <Megaphone size={32} strokeWidth={2.5} />, count: campaigns.length, gradient: "linear-gradient(137deg, #FF9D3C 0%, #FFB1CE 45%, #FF3D77 100%)", delay: 0.35 },
  ];

  return (
    <div className="relative w-full bg-black font-display">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          {SCENES.map((s, i) => (
            <video key={s.url} src={s.url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: i === scene ? 1 : 0, filter: "brightness(0.4) saturate(1.05) contrast(1.05)", transition: "opacity 1000ms ease-in-out" }} />
          ))}
        </div>
        <div className="absolute inset-0 z-0 bg-black/45" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/95" />

        <div className="absolute inset-0 z-20 mx-auto flex max-w-6xl flex-col px-6">
          <nav className="flex items-center justify-between py-5">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                  <circle cx="2.5" cy="19.5" r="2" fill="white" />
                  <path d="M 2.5 13.5 A 7 7 0 0 1 9.5 19.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 2.5 8 A 12.5 12.5 0 0 1 15 19.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
                  <path d="M 2.5 2 A 18.5 18.5 0 0 1 21 19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-[0.2em] text-white">RIPPL</span>
            </div>
            <Link to="/home" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.03]">Enter <ArrowRight className="h-4 w-4" /></Link>
          </nav>

          <div className="flex flex-1 flex-col justify-center pb-16">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
              className="liquid-glass w-fit rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/70">RIPPL // MY UNIVERSE</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 font-bold leading-[1.02] text-white" style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)" }}>
              Zeyad's <span className="text-gradient-neon">Universe</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.55 }}
              className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
              Not a dashboard — a command center for everything I build. A&R and artist management, music distribution,
              360° marketing, and the AI tools I ship. Every artist I scout, every record I drop, every deal I close,
              every contract I sign — it all lives here. One brain for the whole operation.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {stats.map((s) => (
                <div key={s.label} className="liquid-glass rounded-2xl px-4 py-3 text-center">
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/45">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-5 right-6 z-30 flex items-center gap-2">
          {SCENES.map((s, i) => (
            <button key={i} onClick={() => switchScene(i)} title={s.label} className="rounded-full transition-all duration-300"
              style={{ height: "3px", width: i === scene ? "28px" : "14px", background: i === scene ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)" }} />
          ))}
        </div>
      </section>

      {/* ═══════ MODULES (glow cards) ═══════ */}
      <section className="bg-[#0A0A0B] px-6 py-20">
        <div className="mx-auto max-w-[936px]">
          <div className="text-[11px] uppercase tracking-[0.35em] text-white/40">The whole universe</div>
          <h2 className="mt-2 text-3xl font-bold text-white">Everything, in one place</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-3">
            {modules.map((m) => (
              <FeatureCard key={m.to} to={m.to} title={m.label} description={m.desc} icon={m.icon} gradient={m.gradient} count={m.count} delay={m.delay} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="relative z-[100] overflow-hidden bg-black text-white">
        <div className="footer-dots" aria-hidden="true"><div className="footer-dots__line" /></div>
        <div className="mx-auto w-[min(100%-48px,1820px)] pb-8 pt-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.25fr_repeat(3,0.42fr)]">
            <h2 className="max-w-[680px] text-4xl font-light leading-[1.06] tracking-tight md:col-auto" style={{ fontSize: "clamp(28px,3.2vw,54px)", fontWeight: 300 }}>Everything I build, in one universe.</h2>
            <FooterNav links={[["Home", "/home"], ["Roster", "/roster"], ["Releases", "/releases"], ["The Vault", "/vault"], ["Studio", "/studio"]]} />
            <FooterNav links={[["Tech Lab", "/techlab"], ["Audio", "/audio"], ["Marketing", "/dashboard"], ["Campaigns", "/campaigns"]]} />
            <FooterNav links={[["Settings", "/settings"]]} />
          </div>

          <div className="mt-10 w-full">
            <Link to="/home" className="flex w-full items-center gap-4 text-white">
              <span className="footer-wordmark block flex-1">RIPPL</span>
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-white/50">
            <span>© 2026 RIPPL. All rights reserved. Built by Zeyad Sayedin.</span>
            <span>This is my universe.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterNav({ links }: { links: [string, string][] }) {
  return (
    <nav className="flex flex-col items-start gap-4">
      {links.map(([label, to]) => (
        <Link key={to} to={to} className="text-[15px] font-semibold text-white/85 transition-all hover:translate-x-1 hover:text-white">{label}</Link>
      ))}
    </nav>
  );
}
