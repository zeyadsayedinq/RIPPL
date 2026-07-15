export function MeshGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />
      {/* One very subtle cool highlight, top — barely there */}
      <div
        className="absolute -top-1/3 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.05 300) 0%, transparent 65%)" }}
      />
      {/* Fine film grain for depth (very low opacity) */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />
    </div>
  );
}
