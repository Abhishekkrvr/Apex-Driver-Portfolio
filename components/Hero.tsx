"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DRIVER } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ paused: true });
      intro.from(".h-char", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.05 })
           .from(".h-fade", { opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: "power3.out" }, "-=0.6");
      if (window.__introDone) intro.play(); else window.addEventListener("intro:done", () => intro.play(), { once: true });
      gsap.to(".h-num", { yPercent: -25, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".h-title", { xPercent: -8, opacity: 0.2, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  const split = (s: string) => s.split("").map((c, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom"><span className="h-char inline-block">{c}</span></span>
  ));

  return (
    <section id="top" ref={root} className="relative min-h-screen overflow-hidden flex flex-col justify-end px-5 md:px-10 pb-12 pt-28">
      <div className="h-num absolute right-[-4vw] top-[8vh] font-display leading-none text-[48vw] md:text-[38vw] text-accent/10 select-none pointer-events-none">{DRIVER.number}</div>
      <p className="h-fade text-xs uppercase tracking-[0.3em] text-bone/60 mb-4">{DRIVER.team} · 2026 Season</p>
      <h1 className="h-title font-display leading-[0.85] text-[24vw] md:text-[17vw] uppercase">
        <span className="block">{split(DRIVER.first)}</span>
        <span className="block text-accent">{split(DRIVER.last)}</span>
      </h1>
      <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <p className="h-fade max-w-md text-bone/70 text-lg">{DRIVER.tagline}</p>
        <div className="h-fade flex gap-3">
          <button onClick={() => scrollToId("track")} className="bg-accent text-asphalt font-semibold px-6 py-3 rounded-full hover:scale-105 transition">Start the lap ↓</button>
          <button onClick={() => scrollToId("calendar")} className="border border-line px-6 py-3 rounded-full hover:border-accent transition">Race calendar</button>
        </div>
      </div>
      {/* <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-bone/30 tracking-widest uppercase">Fictional concept — not a real driver</p> */}
    </section>
  );
}
