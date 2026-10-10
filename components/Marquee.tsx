export default function Marquee({ text }: { text: string }) {
  const items = Array.from({ length: 8 });
  return (
    <div className="overflow-hidden border-y border-line py-5 bg-accent text-asphalt" aria-hidden>
      <div className="marquee-track flex w-max whitespace-nowrap font-display text-4xl md:text-6xl uppercase">
        {items.map((_, i) => <span key={i} className="px-6">{text} <span className="px-4">✦</span></span>)}
      </div>
    </div>
  );
}
