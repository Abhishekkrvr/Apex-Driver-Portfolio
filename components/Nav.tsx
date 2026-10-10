"use client";
import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";
import { DRIVER } from "@/lib/data";

const LINKS = [["track","Track"],["car","Car"],["moments","Moments"],["story","Story"],["calendar","Calendar"],["standings","Standings"],["game","Game"],["shop","Shop"]];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const els = LINKS.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      let cur = "";
      for (const el of els) {
        const box = (el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el).getBoundingClientRect();
        if (box.top <= window.innerHeight * 0.4) cur = el.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => { setOpen(false); setTimeout(() => scrollToId(id), 50); };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white">
        <div className="flex items-center justify-between px-5 md:px-10 py-5">
          <button onClick={() => go("top")} className="font-display text-2xl tracking-wide" aria-label="Back to top">{DRIVER.number}.</button>
          <nav className="hidden lg:flex gap-7 text-xs uppercase tracking-[0.2em]" aria-label="Main">
            {LINKS.map(([id, l]) => (
              <button key={id} onClick={() => go(id)} aria-current={active === id ? "true" : undefined}
                className={`relative pb-1 transition-opacity ${active === id ? "opacity-100" : "opacity-60 hover:opacity-100"}`}>
                {l}
                <span className={`absolute left-0 -bottom-0.5 h-[2px] bg-white transition-all duration-300 ${active === id ? "w-full" : "w-0"}`} />
              </button>
            ))}
          </nav>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu" className="lg:hidden relative w-10 h-10">
            <span className={`absolute left-2 right-2 h-[2px] bg-white transition-all ${open ? "top-[19px] rotate-45" : "top-[14px]"}`} />
            <span className={`absolute left-2 right-2 h-[2px] bg-white transition-all ${open ? "top-[19px] -rotate-45" : "top-[24px]"}`} />
          </button>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 bg-asphalt flex flex-col justify-center px-8 gap-2 transition-all duration-500 lg:hidden ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        {LINKS.map(([id, l], i) => (
          <button key={id} onClick={() => go(id)} style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            className={`text-left font-display text-5xl uppercase transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${active === id ? "text-accent" : "text-bone"}`}>{l}</button>
        ))}
      </div>
    </>
  );
}
