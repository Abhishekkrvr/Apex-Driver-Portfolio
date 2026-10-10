"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAR_PARTS } from "@/lib/data";

const IDS = ["rw", "eng", "halo", "nose", "tyre"];

export default function CarSection() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".info-i", { opacity: 0, y: 20 });
      gsap.set(".part-hl", { opacity: 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=300%", pin: true, scrub: 0.6 } });
      tl.fromTo(".car-svg", { xPercent: -8, scale: 0.9 }, { xPercent: 8, scale: 1.05, duration: IDS.length * 2, ease: "none" }, 0);
      IDS.forEach((id, i) => {
        const t = i * 2;
        tl.to(`.hl-${id}`, { opacity: 1, duration: 0.3 }, t)
          .to(`.info-${i}`, { opacity: 1, y: 0, duration: 0.3 }, t)
          .to(`.hl-${id}`, { opacity: 0, duration: 0.3 }, t + 1.6)
          .to(`.info-${i}`, { opacity: 0, y: -20, duration: 0.3 }, t + 1.6);
        tl.to(".prog-bar", { scaleX: (i + 1) / IDS.length, duration: 0.3, ease: "none", transformOrigin: "left" }, t);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const hl = "part-hl fill-none stroke-[#C8FF2E] [stroke-width:4]";
  return (
    <section id="car" ref={root} className="relative h-screen overflow-hidden bg-asphalt">
      <div className="absolute inset-0 px-5 md:px-10 pt-24 pb-8 flex flex-col">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Anatomy of Car 27</p>
        <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mt-2">Built to <span className="text-accent">go fast</span></h2>
        <div className="relative h-28 md:h-32 mt-6 max-w-xl">
          {CAR_PARTS.map((p, i) => (
            <div key={p.title} className={`info-i info-${i} absolute inset-0`}>
              <div className="font-display text-3xl uppercase">{String(i + 1).padStart(2, "0")} · {p.title}</div>
              <p className="text-bone/70 mt-1">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="flex-1 min-h-0 flex items-center">
          <svg viewBox="0 0 800 300" className="car-svg w-full max-h-full" role="img" aria-label="Stylised side view of a race car">
            <ellipse cx="400" cy="272" rx="340" ry="10" fill="#000" opacity=".5" />
            {/* rear wing */}
            <rect x="70" y="66" width="70" height="10" rx="3" fill="#33333B" />
            <rect x="96" y="76" width="8" height="84" fill="#26262C" />
            {/* body */}
            <path d="M110 190 L150 160 L300 118 L420 124 L470 100 L560 150 L700 205 L710 222 L120 222 Z" fill="#1d1d23" stroke="#33333B" strokeWidth="2" />
            <path d="M300 118 L420 124 L430 150 L190 160Z" fill="#C8FF2E" opacity=".9" />
            <text x="320" y="146" fontSize="22" fill="#0B0B0D" fontFamily="Anton, Impact, sans-serif">27</text>
            {/* halo */}
            <path d="M425 126 Q470 80 520 128" fill="none" stroke="#F2F0EA" strokeWidth="5" strokeLinecap="round" />
            <circle cx="465" cy="118" r="12" fill="#F2F0EA" />
            {/* front wing */}
            <path d="M650 232 H790 L780 244 H640Z" fill="#33333B" />
            {/* wheels */}
            <g><circle cx="210" cy="220" r="52" fill="#0e0e11" stroke="#33333B" strokeWidth="3" /><circle cx="210" cy="220" r="26" fill="#26262C" /><circle cx="210" cy="220" r="8" fill="#C8FF2E" /></g>
            <g><circle cx="600" cy="228" r="42" fill="#0e0e11" stroke="#33333B" strokeWidth="3" /><circle cx="600" cy="228" r="20" fill="#26262C" /><circle cx="600" cy="228" r="6" fill="#C8FF2E" /></g>
            {/* highlights */}
            <rect className={`${hl} hl-rw`} x="62" y="58" width="86" height="106" rx="6" />
            <path className={`${hl} hl-eng`} d="M150 160 L300 118 L430 150 L190 162Z" />
            <path className={`${hl} hl-halo`} d="M418 126 Q470 70 528 130" />
            <path className={`${hl} hl-nose`} d="M560 150 L700 205 L792 232 L792 246 L640 246 L600 205Z" />
            <circle className={`${hl} hl-tyre`} cx="210" cy="220" r="58" />
            <circle className={`${hl} hl-tyre`} cx="600" cy="228" r="48" />
          </svg>
        </div>
        <div className="h-1 bg-line rounded overflow-hidden"><div className="prog-bar h-full bg-accent origin-left scale-x-0" /></div>
      </div>
    </section>
  );
}
