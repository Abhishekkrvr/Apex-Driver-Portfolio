"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const PATH = "M120 420 C 120 250, 260 200, 380 240 S 560 330, 640 220 S 800 60, 900 150 S 1000 380, 880 440 S 600 520, 480 470 S 300 560, 200 500 S 120 470, 120 420 Z";

export default function TrackScroll() {
  const root = useRef<HTMLElement>(null);
  const path = useRef<SVGPathElement>(null);
  const dot = useRef<SVGGElement>(null);
  const lapRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const turnRef = useRef<HTMLSpanElement>(null);
  const sectRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);
    const p = path.current!;
    const readouts = (pr: number) => {
      if (pctRef.current) pctRef.current.textContent = String(Math.round(pr * 100)).padStart(3, "0");
      if (lapRef.current) lapRef.current.textContent = pr > 0.99 ? "LAP COMPLETE" : "LAP 1 / 1";
      const turn = Math.min(12, Math.floor(pr * 12) + 1);
      if (turnRef.current) turnRef.current.textContent = pr < 0.01 ? "GRID" : "TURN " + turn;
      if (sectRef.current) sectRef.current.textContent = pr < 0.01 ? "—" : "S" + (pr < 0.34 ? 1 : pr < 0.67 ? 2 : 3);
      const ms = Math.round(pr * 83456);
      if (timeRef.current) {
        const m = Math.floor(ms / 60000), sec = Math.floor((ms % 60000) / 1000), mm = ms % 1000;
        timeRef.current.textContent = `${m}:${String(sec).padStart(2, "0")}.${String(mm).padStart(3, "0")}`;
        timeRef.current.style.color = pr > 0.99 ? "#C8FF2E" : "#F2F0EA";
        timeRef.current.style.transform = pr > 0.99 ? "scale(1.12)" : "scale(1)";
      }
    };
    const ctx = gsap.context(() => {
      const mp = { path: p, align: p, autoRotate: true, alignOrigin: [0.5, 0.5] };
      gsap.set(p, { drawSVG: "0%" });
      gsap.set(dot.current, { motionPath: { ...mp, start: 0, end: 0 } });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=250%", pin: true, scrub: true, onUpdate: (self) => readouts(self.progress) },
      });
      tl.to(p, { drawSVG: "100%", ease: "none", duration: 1 }, 0)
        .to(dot.current, { motionPath: mp, ease: "none", duration: 1 }, 0);
      gsap.from(".t-copy", { opacity: 0, y: 40, stagger: 0.1, duration: 0.8, scrollTrigger: { trigger: root.current, start: "top 70%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="track" ref={root} className="relative h-screen bg-panel overflow-hidden">
      <div className="absolute inset-0 flex flex-col px-5 md:px-10 pt-24 pb-8">
        <div className="flex justify-between items-start">
          <div className="t-copy">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Meridian Circuit</p>
            <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mt-2">Scroll to<br />drive the lap</h2>
          </div>
          <div className="t-copy text-right font-display">
            <div className="text-6xl md:text-8xl text-accent tabular-nums"><span ref={pctRef}>000</span><span className="text-2xl">%</span></div>
            <span ref={lapRef} className="text-xs tracking-[0.3em] text-bone/60 font-body">LAP 1 / 1</span>
          </div>
        </div>
        <div className="flex gap-6 md:gap-10 mt-3 font-display text-xl md:text-3xl uppercase">
          <div><div className="text-[10px] font-body tracking-[0.3em] text-bone/50">Corner</div><span ref={turnRef}>GRID</span></div>
          <div><div className="text-[10px] font-body tracking-[0.3em] text-bone/50">Sector</div><span ref={sectRef}>—</span></div>
          <div><div className="text-[10px] font-body tracking-[0.3em] text-bone/50">Lap time</div><div ref={timeRef} className="tabular-nums origin-left transition-transform duration-300">0:00.000</div></div>
        </div>
        <svg viewBox="0 0 1000 600" className="flex-1 w-full min-h-0 mt-4" role="img" aria-label="Racetrack drawn as you scroll">
          <path d={PATH} fill="none" stroke="#26262C" strokeWidth="26" strokeLinejoin="round" />
          <path d={PATH} fill="none" stroke="#33333B" strokeWidth="2" strokeDasharray="6 10" />
          <defs><filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
          <path ref={path} d={PATH} fill="none" stroke="#C8FF2E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
          <g ref={dot}>
            <circle r="16" fill="#C8FF2E" opacity="0.2" />
            <rect x="-12" y="-6" width="24" height="12" rx="4" fill="#F2F0EA" />
            <rect x="2" y="-4" width="6" height="8" rx="2" fill="#0B0B0D" />
          </g>
          <text x="120" y="470" fill="#F2F0EA" fontSize="14" letterSpacing="3">START / FINISH</text>
        </svg>
      </div>
    </section>
  );
}
