import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niko Vance — Car 27 (fictional concept site)",
  openGraph: { title: "Niko Vance — Car 27", description: "Fictional concept racing site.", type: "website" },
  description:
    "A fictional racing driver's personal site: a scroll-drawn racetrack, career timeline, season calendar and merch. Driver, team and results are invented.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>{children}</body>
    </html>
  );
}
