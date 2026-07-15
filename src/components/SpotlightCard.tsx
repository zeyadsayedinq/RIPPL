import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  spotlight?: boolean;
}

export function SpotlightCard({ children, className = "", spotlight = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const bg = useTransform([mx, my], ([x, y]) =>
    `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.05), transparent 60%)`
  );

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }
  function onLeave() { mx.set(-200); my.set(-200); }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`glass relative overflow-hidden rounded-2xl ${className}`}
    >
      {spotlight && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: bg }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
