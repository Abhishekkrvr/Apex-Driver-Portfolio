"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/data";

export default function Stats() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.v);
        const o = { v: 0 };
        gsap.to(o, { v: target, duration: 1.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => { el.textContent = String(Math.round(o.v)); } });
      });
      gsap.from(".stat-card", { y: 60, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="stats" ref={root} className="px-5 md:px-10 py-28">
      <h2 className="font-display text-5xl md:text-8xl uppercase mb-14">By the <span className="text-accent">numbers</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line">
        {STATS.map((s) => (
          <div key={s.label} className="stat-card bg-asphalt p-6 md:p-10">
            <div className="font-display text-7xl md:text-9xl text-bone tabular-nums stat-num" data-v={s.value}>0</div>
            <div className="mt-2 text-xs uppercase tracking-[0.25em] text-bone/60">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
