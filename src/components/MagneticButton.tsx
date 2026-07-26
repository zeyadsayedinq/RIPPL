import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useWindowsOptional } from "@/lib/window-store";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
}

export function MagneticButton({ children, className = "", onClick, variant = "primary" }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const win = useWindowsOptional();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  function onMove(e: MouseEvent<HTMLButtonElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }
  function onLeave() { x.set(0); y.set(0); }

  const variants = {
    primary: "bg-white text-black hover:bg-white/90",
    ghost: "glass text-foreground hover:bg-white/5",
    danger: "bg-transparent text-[oklch(0.7_0.2_20)] border border-[oklch(0.7_0.2_20)]/40 hover:bg-[oklch(0.7_0.2_20)]/10",
  };

  /* XP buttons do not follow your cursor. They are 22px tall, beveled, and
     they stay exactly where they were put. */
  if (win?.skin === "xp") {
    return (
      <button
        onClick={onClick}
        className={className}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: variant === "danger"
            ? "linear-gradient(180deg,#F5D6D0 0%,#EBBDB4 50%,#DFA79C 100%)"
            : "linear-gradient(180deg,#fdfdfc 0%,#ece9d8 45%,#e2dfd0 90%,#d9d5c5 100%)",
          border: "1px solid #ACA899", borderRadius: 3,
          boxShadow: "inset 0 0 0 1px #fff",
          padding: "3px 14px", minHeight: 23,
          fontFamily: 'Tahoma, "Segoe UI", sans-serif', fontSize: 12,
          color: variant === "danger" ? "#8A2A18" : "#000",
          cursor: "default",
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
