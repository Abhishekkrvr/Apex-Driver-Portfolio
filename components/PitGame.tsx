"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type S = "idle" | "wait" | "go" | "done" | "early";
const KEY = "apex-best-pit";

export default function PitGame() {
  const [state, setState] = useState<S>("idle");
  const [ms, setMs] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const root = useRef<HTMLElement>(null);

  // Curtain: the shop slides up over this section while it stays pinned and dims.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const shop = document.getElementById("shop");
      if (!shop) return;
      ScrollTrigger.create({ trigger: root.current, start: "bottom bottom", endTrigger: shop, end: "top top", pin: true, pinSpacing: false });
      gsap.to(root.current, { scale: 0.92, opacity: 0.35, ease: "none", transformOrigin: "50% 100%", scrollTrigger: { trigger: shop, start: "top bottom", end: "top top", scrub: true } });
    });
    return () => mm.revert();
  }, []);
  const t0 = useRef(0);

  useEffect(() => {
    try { const v = localStorage.getItem(KEY); if (v) setBest(Number(v)); } catch {}
    return () => clearTimeout(timer.current);
  }, []);

  const start = () => {
    setState("wait"); setMs(null);
    timer.current = setTimeout(() => { t0.current = performance.now(); setState("go"); }, 1500 + Math.random() * 2500);
  };
  const press = () => {
    if (state === "idle" || state === "done" || state === "early") return start();
    if (state === "wait") { clearTimeout(timer.current); setState("early"); return; }
    if (state === "go") {
      const t = Math.round(performance.now() - t0.current);
      setMs(t); setState("done");
      if (best === null || t < best) { setBest(t); try { localStorage.setItem(KEY, String(t)); } catch {} }
    }
  };
  const label = { idle: "Tap to start pit stop", wait: "Wait for green…", go: "GO! TAP NOW!", done: "Tap to go again", early: "Too early! Tap to retry" }[state];
  const bg = state === "go" ? "bg-accent text-asphalt" : state === "wait" ? "bg-red-600" : state === "early" ? "bg-orange-600" : "bg-panel";
  const rating = ms === null ? "" : ms < 250 ? "Crew-chief material" : ms < 350 ? "Quick hands" : ms < 500 ? "Decent stop" : "Box again…";

  return (
    <section id="game" ref={root} className="px-5 md:px-10 py-28">
      <h2 className="font-display text-5xl md:text-8xl uppercase mb-4">Pit stop <span className="text-accent">challenge</span></h2>
      <p className="text-bone/60 mb-8 max-w-xl">Tap when the light turns green. How fast can you release the car?</p>
      <button onClick={press} aria-live="polite" className={`w-full md:w-[640px] h-72 rounded-3xl border border-line transition-colors flex flex-col items-center justify-center select-none ${bg}`}>
        <span className="font-display text-4xl md:text-6xl uppercase">{label}</span>
        {ms !== null && <span className="font-display text-7xl mt-3 tabular-nums">{ms} ms</span>}
        {ms !== null && <span className="text-sm opacity-80 mt-1">{rating}</span>}
      </button>
      <p className="mt-4 text-bone/60">Best: {best !== null ? `${best} ms` : "—"}</p>
    </section>
  );
}
