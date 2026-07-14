interface Props { items: string[] }

export function Marquee({ items }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className="glass relative overflow-hidden rounded-full py-3">
      <div className="animate-marquee flex whitespace-nowrap gap-12 font-mono text-xs uppercase tracking-[0.25em]">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-4">
            <span className="text-[oklch(0.7_0.28_328)]">▲▲▲</span>
            <span className="text-foreground/80">{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
