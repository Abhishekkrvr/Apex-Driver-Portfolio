"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

declare global { interface Window { __introDone?: boolean } }

export default function IntroLights() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      document.body.style.overflow = "";
      window.__introDone = true;
      window.dispatchEvent(new Event("intro:done"));
      setGone(true);
    };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      if (reduce) { tl.to(root.current, { opacity: 0, duration: 0.3 }); return; }
      gsap.set(".lamp", { backgroundColor: "#1a1a1e", boxShadow: "none" });
      gsap.set(".go", { opacity: 0, scale: 0.6 });
      tl.from(".lamps", { y: 30, opacity: 0, duration: 0.5 })
        .to(".lamp", { backgroundColor: "#ff2a2a", boxShadow: "0 0 30px 6px rgba(255,42,42,.7)", duration: 0.12, stagger: 0.55 }, "+=0.2")
        .to({}, { duration: 0.7 })
        .to(".lamp", { backgroundColor: "#1a1a1e", boxShadow: "none", duration: 0.05 })
        .to(".go", { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(3)" }, "<")
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "+=0.35");
    }, root);
    return () => { ctx.revert(); document.body.style.overflow = ""; };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[100] bg-asphalt flex flex-col items-center justify-center" aria-hidden>
      <div className="lamps flex gap-3 md:gap-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="w-10 h-16 md:w-16 md:h-24 rounded-full bg-[#1a1a1e] border border-line flex items-end justify-center pb-2">
            <div className="lamp w-7 h-7 md:w-11 md:h-11 rounded-full" />
          </div>
        ))}
      </div>
      <div className="go font-display text-accent text-6xl md:text-8xl mt-10 tracking-widest">GO!</div>
    </div>
  );
}
