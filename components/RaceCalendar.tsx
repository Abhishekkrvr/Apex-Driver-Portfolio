"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RACES } from "@/lib/data";

export default function RaceCalendar() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".race-row", { opacity: 0, y: 30, stagger: 0.07, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  const color = (r: string | null) => r === "P1" ? "text-accent" : r === "DNF" ? "text-red-400" : r ? "text-bone" : "text-bone/40";
  return (
    <section id="calendar" ref={root} className="px-5 md:px-10 py-28">
      <h2 className="font-display text-5xl md:text-8xl uppercase mb-12">2026 <span className="text-accent">calendar</span></h2>
      <div className="border-t border-line">
        {RACES.map((r) => (
          <div key={r.round} className="race-row group relative grid grid-cols-[3rem_1fr_auto] md:grid-cols-[5rem_1fr_12rem_8rem] items-center gap-4 py-5 border-b border-line hover:bg-panel transition-colors px-2 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-accent before:origin-top before:scale-y-0 group-hover:before:scale-y-100 before:transition-transform before:duration-300">
            <span className="font-display text-3xl text-bone/40 group-hover:text-accent transition-colors">{String(r.round).padStart(2, "0")}</span>
            <div className="transition-transform duration-300 group-hover:translate-x-2">
              <div className="text-lg md:text-2xl font-semibold">{r.name}</div>
              <div className="text-sm text-bone/50">{r.place}</div>
            </div>
            <span className="hidden md:block text-sm uppercase tracking-widest text-bone/60">{r.date}</span>
            <span className={`font-display text-3xl text-right ${color(r.result)}`}>{r.result ?? "Upcoming"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
