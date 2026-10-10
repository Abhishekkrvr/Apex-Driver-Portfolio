"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const BLURB: Record<string, string> = { tee: "Heavyweight cotton, team crest on the chest. Built for long weekends in the paddock.", cap: "Structured six-panel cap with a curved peak and tonal stitching.", hoodie: "Brushed fleece, double-layer hood and a lime hem. The pit-lane favourite.", poster: "A2 print of the Meridian Ring layout on matte 250gsm stock." };
import { PRODUCTS } from "@/lib/data";

const SIZES = ["S", "M", "L", "XL"];
const num = (price: string) => Number(price.replace(/[^\d]/g, ""));
const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

function Mock({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-[78%] h-[78%] drop-shadow-[0_24px_30px_rgba(0,0,0,.55)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2" aria-hidden>
      <defs>
        <linearGradient id="gBone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#CFCBBF" /></linearGradient>
        <linearGradient id="gDark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3A3A44" /><stop offset="1" stopColor="#15151A" /></linearGradient>
        <linearGradient id="gLime" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E3FF7A" /><stop offset="1" stopColor="#9BCC12" /></linearGradient>
        <linearGradient id="gFold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity=".0" /><stop offset="1" stopColor="#000" stopOpacity=".28" /></linearGradient>
      </defs>
      {kind === "tee" && <g>
        <path d="M62 26 L84 18 Q100 36 116 18 L138 26 L178 62 L156 88 L142 76 V176 H58 V76 L44 88 L22 62 Z" fill="url(#gBone)" />
        <path d="M84 18 Q100 36 116 18 Q112 46 100 46 Q88 46 84 18Z" fill="#B9B5A8" />
        <path d="M58 76 V176 H142 V76" fill="url(#gFold)" />
        <path d="M70 90 Q64 130 70 170 M130 90 Q136 130 130 170" stroke="#000" strokeOpacity=".07" strokeWidth="6" fill="none" />
        <text x="100" y="128" textAnchor="middle" fontSize="54" fill="#0B0B0D" fontFamily="Anton, Impact, sans-serif">27</text>
        <rect x="76" y="140" width="48" height="4" fill="#C8FF2E" />
        <text x="100" y="158" textAnchor="middle" fontSize="8" letterSpacing="3" fill="#0B0B0D" fontFamily="Inter, sans-serif">HELIX RACING</text>
      </g>}
      {kind === "cap" && <g>
        <path d="M34 120 Q34 52 104 52 Q166 52 166 120 Z" fill="url(#gLime)" />
        <path d="M104 52 V120 M70 62 Q76 92 72 120 M138 62 Q132 92 136 120" stroke="#000" strokeOpacity=".14" strokeWidth="2" fill="none" />
        <path d="M120 116 Q186 108 192 132 Q150 142 112 134 Z" fill="url(#gDark)" />
        <path d="M120 116 Q186 108 192 132" stroke="#C8FF2E" strokeWidth="2" fill="none" />
        <circle cx="104" cy="52" r="5" fill="#15151A" />
        <text x="100" y="98" textAnchor="middle" fontSize="26" fill="#0B0B0D" fontFamily="Anton, Impact, sans-serif">27</text>
        <path d="M34 120 H112 V134 H34Z" fill="#000" fillOpacity=".18" />
      </g>}
      {kind === "hoodie" && <g>
        <path d="M66 24 Q100 4 134 24 L182 62 L160 98 L148 88 V180 H52 V88 L40 98 L18 62 Z" fill="url(#gDark)" />
        <path d="M70 26 Q100 70 130 26 Q100 6 70 26Z" fill="#0F0F13" />
        <path d="M88 52 V82 M112 52 V82" stroke="#C8FF2E" strokeWidth="3" strokeLinecap="round" />
        <path d="M70 126 H130 L138 172 H62 Z" fill="#101014" stroke="#2C2C34" strokeWidth="2" />
        <path d="M52 88 V180 H148 V88" fill="url(#gFold)" />
        <text x="100" y="116" textAnchor="middle" fontSize="30" fill="#C8FF2E" fontFamily="Anton, Impact, sans-serif">27</text>
        <rect x="52" y="172" width="96" height="8" fill="#C8FF2E" />
      </g>}
      {kind === "poster" && <g>
        <rect x="44" y="14" width="112" height="164" fill="#0B0B0D" stroke="#F2F0EA" strokeWidth="3" />
        <rect x="52" y="22" width="96" height="148" fill="#141418" />
        <path d="M70 120 C66 82 104 66 116 92 S92 138 78 112" fill="none" stroke="#26262C" strokeWidth="12" strokeLinecap="round" />
        <path d="M70 120 C66 82 104 66 116 92 S92 138 78 112" fill="none" stroke="#C8FF2E" strokeWidth="2.5" strokeLinecap="round" />
        <text x="100" y="52" textAnchor="middle" fontSize="20" fill="#F2F0EA" fontFamily="Anton, Impact, sans-serif" letterSpacing="2">MERIDIAN</text>
        <text x="100" y="158" textAnchor="middle" fontSize="9" fill="#C8FF2E" letterSpacing="4" fontFamily="Inter, sans-serif">RING · 5.8 KM</text>
      </g>}
    </svg>
  );
}

export default function Merch() {
  const root = useRef<HTMLElement>(null);
  type Line = { key: string; name: string; size: string; price: number; qty: number };
  const [cart, setCart] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const pending = useRef<{ state: ReturnType<typeof Flip.getState>; id: string; close: boolean } | null>(null);
  const openDetail = (id: string, el: HTMLElement) => { gsap.registerPlugin(Flip); pending.current = { state: Flip.getState(el), id, close: false }; setSel(id); };
  const closeDetail = () => {
    const el = document.querySelector(".fl-big");
    if (el && sel) { gsap.registerPlugin(Flip); pending.current = { state: Flip.getState(el), id: sel, close: true }; }
    setSel(null);
  };
  useIso(() => {
    const pd = pending.current;
    if (!pd) return;
    pending.current = null;
    gsap.registerPlugin(Flip);
    const target = pd.close ? `.fl-small[data-flip-id="${pd.id}"]` : `.fl-big[data-flip-id="${pd.id}"]`;
    Flip.from(pd.state, { targets: target, duration: 0.75, ease: "power3.inOut", scale: true });
    if (!pd.close) {
      gsap.from(".detail-bg", { opacity: 0, duration: 0.4 });
      gsap.from(".detail-copy > *", { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.35, ease: "power3.out" });
    }
  }, [sel]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape" && sel) closeDetail(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });
  const [size, setSize] = useState<Record<string, string>>({});
  const count = cart.reduce((n, l) => n + l.qty, 0);
  const total = cart.reduce((n, l) => n + l.qty * l.price, 0);
  const add = (id: string, name: string, price: string, kind: string) => {
    const sz = kind === "tee" || kind === "hoodie" ? size[id] ?? "M" : "One size";
    const key = id + sz;
    setCart((c) => c.find((l) => l.key === key) ? c.map((l) => l.key === key ? { ...l, qty: l.qty + 1 } : l) : [...c, { key, name, size: sz, price: num(price), qty: 1 }]);
    setOpen(true);
  };
  const change = (key: string, d: number) => setCart((c) => c.map((l) => l.key === key ? { ...l, qty: l.qty + d } : l).filter((l) => l.qty > 0));
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".p-card", { opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 70%" } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section id="shop" ref={root} className="relative px-5 md:px-10 py-28 bg-panel">
      <div className="flex items-end justify-between mb-12">
        <h2 className="font-display text-5xl md:text-8xl uppercase">Paddock <span className="text-accent">shop</span></h2>
        <button onClick={() => setOpen(true)} className="text-sm border border-line rounded-full px-4 py-2 hover:border-accent transition">Cart ({count})</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[780px]">
        {PRODUCTS.map((p) => {
          const big = p.kind === "hoodie";
          const tint = { tee: "from-[#1b1b20] to-[#0e0e11]", cap: "from-[#1d2410] to-[#0e0e11]", hoodie: "from-[#26280f] to-[#0e0e11]", poster: "from-[#1b1b20] to-[#0e0e11]" }[p.kind];
          const tag = { tee: "Team", cap: "New", hoodie: "Limited", poster: "Print" }[p.kind];
          const sized = p.kind === "tee" || p.kind === "hoodie";
          return (
            <div key={p.id} className={`p-card group relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br ${tint} hover:border-accent transition-colors flex flex-col ${big ? "col-span-2 row-span-2 order-first" : ""}`}>
              <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.25em] bg-accent text-asphalt px-3 py-1 rounded-full font-semibold">{tag}</span>
              <div className="absolute inset-0 flex items-center justify-center font-display text-[16rem] md:text-[22rem] leading-none text-white/[0.03] select-none pointer-events-none">27</div>
              <div data-flip-id={p.id} role="button" tabIndex={0} aria-label={`View ${p.name}`} onClick={(e) => openDetail(p.id, e.currentTarget)} onKeyDown={(e) => { if (e.key === "Enter") openDetail(p.id, e.currentTarget); }} className={`fl-small relative flex-1 flex items-center justify-center cursor-pointer ${big ? "min-h-[320px]" : "min-h-[200px]"}`}><Mock kind={p.kind} /></div>
              <div className="relative p-4 md:p-5 bg-black/30 backdrop-blur-sm border-t border-white/5">
                <div className="flex items-baseline justify-between gap-2">
                  <div className={`font-semibold ${big ? "text-xl md:text-2xl" : ""}`}>{p.name}</div>
                  <div className="text-accent font-display text-xl md:text-2xl whitespace-nowrap">{p.price}</div>
                </div>
                {sized && (
                  <div className="flex gap-1 mt-3">
                    {SIZES.map((z) => <button key={z} onClick={() => setSize((s) => ({ ...s, [p.id]: z }))} aria-label={`Size ${z}`} className={`flex-1 text-xs py-1.5 rounded-full border transition ${(size[p.id] ?? "M") === z ? "bg-bone text-asphalt border-bone" : "border-line text-bone/60 hover:border-accent"}`}>{z}</button>)}
                  </div>
                )}
                <button onClick={() => add(p.id, p.name, p.price, p.kind)} className="mt-3 w-full bg-bone text-asphalt font-semibold rounded-full py-2.5 text-sm hover:bg-accent transition">Add to cart</button>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-xs text-bone/40">Demo only — no real checkout.</p>
      {sel && (() => {
        const p = PRODUCTS.find((x) => x.id === sel)!;
        const sized = p.kind === "tee" || p.kind === "hoodie";
        return (
          <div className="fixed inset-0 z-[92] flex items-center justify-center p-4">
            <div className="detail-bg absolute inset-0 bg-black/85" onClick={closeDetail} />
            <div role="dialog" aria-modal="true" aria-label={p.name} className="relative w-full max-w-4xl grid md:grid-cols-2 gap-6 rounded-3xl border border-line bg-asphalt p-5 md:p-10 max-h-[92vh] overflow-auto">
              <button onClick={closeDetail} aria-label="Close" className="absolute top-4 right-5 text-2xl z-10">✕</button>
              <div data-flip-id={p.id} className="fl-big aspect-square rounded-2xl bg-gradient-to-br from-[#26280f] to-[#0e0e11] flex items-center justify-center"><Mock kind={p.kind} /></div>
              <div className="detail-copy flex flex-col justify-center">
                <div className="text-xs uppercase tracking-[0.3em] text-accent mb-2">Paddock shop</div>
                <h3 className="font-display text-4xl md:text-6xl uppercase leading-none">{p.name}</h3>
                <div className="font-display text-3xl text-accent mt-3">{p.price}</div>
                <p className="text-bone/70 mt-4">{BLURB[p.kind]}</p>
                {sized && (
                  <div className="flex gap-2 mt-5">
                    {SIZES.map((z) => <button key={z} onClick={() => setSize((s) => ({ ...s, [p.id]: z }))} className={`w-12 h-12 rounded-full border transition ${(size[p.id] ?? "M") === z ? "bg-bone text-asphalt border-bone" : "border-line text-bone/70 hover:border-accent"}`}>{z}</button>)}
                  </div>
                )}
                <button onClick={() => { add(p.id, p.name, p.price, p.kind); closeDetail(); }} className="mt-6 bg-accent text-asphalt font-semibold rounded-full py-3 hover:scale-[1.02] transition">Add to cart</button>
              </div>
            </div>
          </div>
        );
      })()}
      <div className={`fixed inset-0 z-[90] bg-black/60 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setOpen(false)} />
      <aside aria-label="Cart" className={`fixed top-0 right-0 z-[95] h-full w-full max-w-sm bg-asphalt border-l border-line p-6 flex flex-col transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-between items-center mb-6"><h3 className="font-display text-3xl uppercase">Your cart</h3><button onClick={() => setOpen(false)} aria-label="Close cart" className="text-2xl">✕</button></div>
        <div className="flex-1 overflow-auto space-y-4">
          {cart.length === 0 && <p className="text-bone/50">Cart is empty.</p>}
          {cart.map((l) => (
            <div key={l.key} className="flex items-center justify-between border-b border-line pb-3">
              <div><div className="font-semibold">{l.name}</div><div className="text-xs text-bone/50">{l.size} · {fmt(l.price)}</div></div>
              <div className="flex items-center gap-2"><button onClick={() => change(l.key, -1)} className="w-7 h-7 border border-line rounded-full">−</button><span>{l.qty}</span><button onClick={() => change(l.key, 1)} className="w-7 h-7 border border-line rounded-full">+</button></div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-line"><div className="flex justify-between text-lg mb-3"><span>Total</span><span className="font-semibold">{fmt(total)}</span></div>
          <button disabled={!cart.length} className="w-full bg-accent text-asphalt font-semibold rounded-full py-3 disabled:opacity-40">Checkout (demo)</button></div>
      </aside>
    </section>
  );
}
