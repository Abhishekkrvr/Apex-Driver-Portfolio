"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "@/lib/data";

export default function Timeline() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".tl-line", { scaleY: 0, transformOrigin: "top", ease: "none",
        scrollTrigger: { trigger: ".tl-wrap", start: "top 70%", end: "bottom 70%", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((el) => {
        gsap.from(el, { opacity: 0, x: -40, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="story" ref={root} className="px-5 md:px-10 py-28 bg-bone text-asphalt">
      <h2 className="font-display text-5xl md:text-8xl uppercase mb-16">The road <span className="bg-asphalt text-accent px-3">so far</span></h2>
      <div className="tl-wrap relative pl-8 md:pl-16 max-w-4xl">
        <div className="tl-line absolute left-2 md:left-4 top-0 bottom-0 w-[3px] bg-asphalt" />
        {TIMELINE.map((t) => (
          <div key={t.year} className="tl-item relative mb-14">
            <span className="absolute -left-[30px] md:-left-[54px] top-3 w-4 h-4 rounded-full bg-accent border-[3px] border-asphalt" />
            <div className="font-display text-5xl md:text-7xl">{t.year}</div>
            <div className="text-xl font-semibold mt-1">{t.title}</div>
            <p className="text-asphalt/70 mt-1 max-w-xl">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
