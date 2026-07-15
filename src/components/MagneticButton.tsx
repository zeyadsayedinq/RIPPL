import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
}

export function MagneticButton({ children, className = "", onClick, variant = "primary" }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
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
