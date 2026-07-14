export function MeshGradient() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute -top-1/4 -left-1/4 h-[70vw] w-[70vw] rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.55 0.32 328) 0%, transparent 60%)",
          animation: "mesh-drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 -right-1/4 h-[60vw] w-[60vw] rounded-full opacity-50 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.5 0.3 295) 0%, transparent 60%)",
          animation: "mesh-drift 28s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute -bottom-1/4 left-1/4 h-[55vw] w-[55vw] rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.28 340) 0%, transparent 60%)",
          animation: "mesh-drift 34s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />
    </div>
  );
}
