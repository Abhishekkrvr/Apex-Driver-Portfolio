import Link from "next/link";
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-5">
      <div className="font-display text-[30vw] leading-none text-accent">DNF</div>
      <p className="text-bone/70 mb-6">This page went off at turn 4.</p>
      <Link href="/" className="bg-accent text-asphalt font-semibold px-6 py-3 rounded-full">Back to pit lane</Link>
    </main>
  );
}
