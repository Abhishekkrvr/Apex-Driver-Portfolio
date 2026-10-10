"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOMENTS } from "@/lib/data";

function Scene({ kind, a }: { kind: string; a: string }) {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      {kind === "pole" && <><rect y="210" width="400" height="90" fill="#141418" />{[0,1,2,3,4,5].map(i=><rect key={i} x={i*70-10} y="250" width="40" height="6" fill="#F2F0EA" opacity=".6" />)}<text x="200" y="150" textAnchor="middle" fontSize="120" fontFamily="Anton, Impact" fill={a}>P1</text><rect x="150" y="215" width="100" height="22" rx="6" fill={a} /></>}
      {kind === "rain" && <><rect y="230" width="400" height="70" fill="#101822" />{Array.from({length:40}).map((_,i)=><line key={i} x1={(i*37)%400} y1={(i*53)%230} x2={(i*37)%400-8} y2={((i*53)%230)+26} stroke={a} strokeOpacity=".6" strokeWidth="2" />)}<rect x="140" y="215" width="120" height="24" rx="8" fill="#F2F0EA" /><ellipse cx="200" cy="258" rx="90" ry="8" fill={a} opacity=".25" /></>}
      {kind === "pit" && <><rect y="230" width="400" height="70" fill="#1a1612" /><rect x="130" y="200" width="140" height="34" rx="8" fill={a} />{[110,290].map(x=><circle key={x} cx={x} cy="235" r="26" fill="#0e0e11" stroke="#F2F0EA" strokeWidth="3" />)}{[60,100,300,340].map(x=><circle key={x} cx={x} cy="190" r="14" fill="#F2F0EA" />)}<text x="200" y="110" textAnchor="middle" fontSize="70" fontFamily="Anton, Impact" fill={a}>2.3s</text></>}
      {kind === "podium" && <><rect x="70" y="190" width="80" height="110" fill="#33333B" /><rect x="160" y="150" width="80" height="150" fill={a} /><rect x="250" y="210" width="80" height="90" fill="#26262C" /><text x="200" y="215" textAnchor="middle" fontSize="60" fontFamily="Anton, Impact" fill="#0B0B0D">1</text><text x="110" y="250" textAnchor="middle" fontSize="40" fontFamily="Anton, Impact" fill="#F2F0EA">2</text><text x="290" y="262" textAnchor="middle" fontSize="40" fontFamily="Anton, Impact" fill="#F2F0EA">3</text>{[0,1,2,3,4,5,6].map(i=><circle key={i} cx={40+i*55} cy={40+(i%3)*25} r="4" fill={a} opacity=".7" />)}</>}
      {kind === "night" && <><rect y="230" width="400" height="70" fill="#0c0a14" />{[40,130,220,310,380].map((x,i)=><g key={x}><rect x={x} y="60" width="3" height="170" fill="#33333B" /><circle cx={x+1} cy="58" r="12" fill={a} opacity=".8" /><path d={`M${x-40} 230 L${x+1} 62 L${x+42} 230Z`} fill={a} opacity=".08" /></g>)}<rect x="150" y="214" width="110" height="22" rx="7" fill="#F2F0EA" /></>}
    </svg>
  );
}

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const tween = gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + (track.current!.scrollWidth - window.innerWidth), pin: true, scrub: true, invalidateOnRefresh: true },
      });
      gsap.utils.toArray<HTMLElement>(".g-card").forEach((card) => {
        const ca = { containerAnimation: tween, scrub: true, trigger: card };
        gsap.fromTo(card.querySelector(".g-img"), { xPercent: -10 }, { xPercent: 10, ease: "none", scrollTrigger: { ...ca, start: "left right", end: "right left" } });
        gsap.fromTo(card, { opacity: 0.35, scale: 0.92 }, { opacity: 1, scale: 1, ease: "none", scrollTrigger: { ...ca, start: "left 95%", end: "left 55%" } });
        gsap.fromTo(card.querySelector(".g-cap"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: "none", scrollTrigger: { ...ca, start: "left 80%", end: "left 50%" } });
      });
    });
    return () => mm.revert();
  }, []);
  return (
    <section id="moments" ref={root} className="md:h-screen py-20 md:py-0 flex flex-col justify-center overflow-hidden bg-panel">
      <h2 className="font-display text-5xl md:text-8xl uppercase px-5 md:px-10 mb-8">Key <span className="text-accent">moments</span></h2>
      <div ref={track} className="flex gap-5 px-5 md:px-10 overflow-x-auto md:overflow-visible snap-x md:snap-none w-max md:w-max max-w-none">
        {MOMENTS.map((m, i) => (
          <figure key={m.title} className="g-card snap-center shrink-0 w-[78vw] md:w-[34vw] rounded-3xl overflow-hidden border border-line bg-asphalt">
            <div className="aspect-[4/3] overflow-hidden" style={{ background: `linear-gradient(135deg, ${m.b}, #141418)` }}><div className="g-img w-full h-full scale-[1.3]"><Scene kind={m.scene} a={m.a} /></div></div>
            <figcaption className="g-cap p-5 flex justify-between items-end">
              <div><div className="font-display text-3xl uppercase">{m.title}</div><div className="text-sm text-bone/60">{m.note}</div></div>
              <span className="font-display text-4xl text-bone/20">0{i + 1}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
