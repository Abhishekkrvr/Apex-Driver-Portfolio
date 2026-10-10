export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  // Pinned sections live inside a GSAP pin-spacer; measure the spacer, not the (fixed) pinned element.
  const target = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
  let top = 0;
  let n: HTMLElement | null = target;
  while (n) { top += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
  const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(top, { duration: 1.4 });
  else window.scrollTo({ top, behavior: "smooth" });
}
