export function PartnerMarquee({
  label,
  items
}: {
  label: string;
  items: string[];
}) {
  return (
    <section className="border-y border-slate-200/70 bg-white/72 py-5 dark:border-white/10 dark:bg-white/5">
      <div className="premium-container grid gap-4 lg:grid-cols-[220px_1fr] lg:items-center">
        <p className="text-safe text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">{label}</p>
        <div className="home-partner-marquee">
          <div className="home-partner-track">
            {items.map((item, index) => (
              <div key={`${item}-${index}`} className="home-partner-logo">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
