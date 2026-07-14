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
    primary: "bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)] text-white shadow-[0_0_24px_rgba(232,121,249,0.35)]",
    ghost: "glass text-foreground",
    danger: "bg-destructive/80 text-white border border-destructive",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-shadow hover:shadow-[0_0_36px_rgba(232,121,249,0.55)] ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
