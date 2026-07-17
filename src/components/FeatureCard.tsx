import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

/* Glowing gradient-border feature card. Glow intensifies on hover; whole card
   is a link into the app. */
export function FeatureCard({ title, description, icon, gradient, to, count, delay = 0 }: {
  title: string; description: string; icon: React.ReactNode; gradient: string; to: string; count?: number | string; delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay }}>
      <Link to={to} className="relative mx-auto flex w-full max-w-[300px] flex-col items-start justify-start group">
        {/* Glow */}
        <div className="pointer-events-none absolute h-[260px] w-full rounded-[40px] opacity-50 transition-opacity duration-500 group-hover:opacity-90 md:h-[280px]"
          style={{ background: gradient, filter: "blur(45px)" }} />
        {/* Foreground with gradient border */}
        <div className="relative z-10 h-[260px] w-full self-stretch overflow-hidden rounded-[40px] transition-transform duration-300 group-hover:-translate-y-1 md:h-[280px]"
          style={{ border: "8px solid transparent", background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${gradient} border-box` }}>
          <div className="flex h-full w-full flex-col justify-between p-7">
            <div className="flex items-start justify-between">
              <div className="text-white/90">{icon}</div>
              {count != null && <span className="font-mono text-sm text-white/50">{count}</span>}
            </div>
            <div>
              <div className="mb-2 text-xl font-medium tracking-tight text-white">{title}</div>
              <div className="text-[14px] font-normal leading-[1.6] text-gray-400 selection:bg-white/20">{description}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
