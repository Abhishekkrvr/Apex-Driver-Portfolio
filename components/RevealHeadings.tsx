"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Each section heading rises letter by letter from behind a mask.
export default function RevealHeadings() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const splits: SplitText[] = [];
      let dead = false;
      document.fonts.ready.then(() => {
        if (dead) return;
        gsap.utils.toArray<HTMLElement>("section h2").forEach((h) => {
          const sp = SplitText.create(h, { type: "chars", mask: "chars" });
          splits.push(sp);
          gsap.from(sp.chars, { yPercent: 115, duration: 0.9, ease: "power4.out", stagger: 0.03, scrollTrigger: { trigger: h, start: "top 88%" } });
        });
        ScrollTrigger.refresh();
      });
      return () => { dead = true; splits.forEach((s) => s.revert()); };
    });
    return () => mm.revert();
  }, []);
  return null;
}
