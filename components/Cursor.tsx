"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.35, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.35, ease: "power3" });
    const move = (e: MouseEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
    const over = (e: MouseEvent) => {
      const hot = (e.target as HTMLElement).closest("a,button");
      gsap.to(ring.current, { scale: hot ? 2 : 1, backgroundColor: hot ? "rgba(255,255,255,.28)" : "rgba(255,255,255,0)", duration: 0.25 });
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return (
    <>
      <div ref={ring} className="fixed top-0 left-0 z-[200] pointer-events-none w-10 h-10 -ml-5 -mt-5 rounded-full border-2 border-white mix-blend-difference" style={{ display: "var(--cursor-display, none)" }} />
      <div ref={dot} className="fixed top-0 left-0 z-[200] pointer-events-none w-2 h-2 -ml-1 -mt-1 rounded-full bg-white mix-blend-difference" style={{ display: "var(--cursor-display, none)" }} />
    </>
  );
}
