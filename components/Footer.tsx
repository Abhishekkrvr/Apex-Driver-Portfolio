import { DRIVER } from "@/lib/data";
export default function Footer() {
  return (
    <footer className="px-5 md:px-10 py-16 border-t border-line">
      <div className="font-display text-[22vw] leading-none text-line select-none">{DRIVER.number}</div>
      <div className="flex flex-col md:flex-row justify-between gap-4 text-sm text-bone/50 mt-4">
        <span>© 2026 {DRIVER.first} {DRIVER.last} · {DRIVER.team}</span>
        <span>Fictional concept site. Driver, team and results are invented.</span>
      </div>
    </footer>
  );
}
