"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STANDINGS } from "@/lib/data";

export default function Standings() {
  const root = useRef<HTMLElement>(null);
  const max = STANDINGS[0].pts;
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".bar", { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: root.current, start: "top 65%" } });
      gsap.from(".st-row", { opacity: 0, x: -30, stagger: 0.07, duration: 0.6, scrollTrigger: { trigger: root.current, start: "top 70%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="standings" ref={root} className="px-5 md:px-10 py-28">
      <h2 className="font-display text-5xl md:text-8xl uppercase mb-12">Drivers' <span className="text-accent">standings</span></h2>
      <div className="space-y-2">
        {STANDINGS.map((s) => (
          <div key={s.name} className={`st-row relative overflow-hidden rounded-xl border ${s.me ? "border-accent" : "border-line"} bg-panel`}>
            <div className={`bar absolute inset-y-0 left-0 ${s.me ? "bg-accent/25" : "bg-white/5"}`} style={{ width: `${(s.pts / max) * 100}%` }} />
            <div className="relative grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1fr_14rem_6rem] items-center gap-3 px-4 py-4">
              <span className="font-display text-3xl text-bone/50">{s.pos}</span>
              <span className={`text-lg ${s.me ? "font-bold text-accent" : "font-semibold"}`}>{s.name}</span>
              <span className="hidden md:block text-sm text-bone/50">{s.team}</span>
              <span className="font-display text-3xl text-right tabular-nums">{s.pts}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-bone/40">Fictional drivers and points.</p>
    </section>
  );
}
