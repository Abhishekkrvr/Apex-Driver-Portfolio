# Apex — Racing Driver Concept Site

> A fictional racing driver's personal site. **Scroll to drive the lap.**

<p align="left">
  <a href="https://apex-driver-portfolio.vercel.app/"><img alt="Live Preview" src="https://img.shields.io/badge/Live%20Preview-open-C8FF2E?style=for-the-badge&labelColor=0B0B0D" /></a>
</p>

**🔗 Live preview:** [https://apex-driver-portfolio.vercel.app/](https://apex-driver-portfolio.vercel.app/)

<!-- Add a screenshot or GIF here, e.g. ![Apex preview](./public/preview.png) -->

Apex is a scroll-driven, animation-heavy personal site for an invented driver (**Niko Vance, Car 27, Helix Racing**), built to explore what GSAP's scroll tools can do on a single page.

> ⚠️ **Everything is fictional.** The driver, team, races, results, standings and merch are all invented for this concept. No real person, team, logo or photo is used.

---

## ✨ Features

- **Scroll-drawn racetrack** — the lime track line draws itself as you scroll while a car follows the path and rotates through the turns. Live corner, sector and lap-time readouts.
- **Car anatomy** — a pinned section that highlights each part (rear wing, power unit, halo, nose, tyres) one by one.
- **Key moments gallery** — pinned horizontal scroll with in-card parallax.
- **Animated headings** — letter-by-letter masked reveals.
- **Stats counters, career timeline, 2026 race calendar and championship standings.**
- **Pit-stop challenge** — a small reaction-time game; your best time is saved in `localStorage`.
- **Paddock shop** — product cards that expand into a detail view with a smooth FLIP animation, size selector and a working demo cart drawer (no real checkout).
- **Curtain section overlap** — the shop slides up over the pinned game section.
- **Intro start-lights**, custom cursor (visible on light and dark backgrounds), smooth scrolling and a background-aware navbar with a mobile menu.
- Responsive, keyboard-focus styles, and `prefers-reduced-motion` support for the heavier effects.

## 🛠 Tech Stack

| | |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) + React 18 |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Animation | [GSAP](https://gsap.com/) — ScrollTrigger, MotionPath, DrawSVG, SplitText, Flip |
| Smooth scroll | [Lenis](https://lenis.darkroom.engineering/) |
| Fonts | Anton + Inter (Google Fonts) |

## 🚀 Getting Started

**Requirements:** Node.js 18.17 or newer.

```bash
# 1. Clone
git clone https://github.com/Abhishekkrvr/Apex-Driver-Portfolio.git
cd Apex-Driver-Portfolio

# 2. Install
npm install

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Production build
npm run build
npm start
```

## 📁 Project Structure

```
app/
  layout.tsx        # fonts + metadata
  page.tsx          # section order
  globals.css
components/
  IntroLights.tsx   # start-lights loader
  Nav.tsx · Hero.tsx · Marquee.tsx
  TrackScroll.tsx   # MotionPath + DrawSVG racetrack
  CarSection.tsx    # pinned car anatomy
  Stats.tsx · Gallery.tsx · Timeline.tsx
  RaceCalendar.tsx · Standings.tsx
  PitGame.tsx       # reaction game + curtain pin
  Merch.tsx         # shop + Flip detail view + cart
  RevealHeadings.tsx  # SplitText heading reveals
  SmoothScroll.tsx  # Lenis ↔ GSAP ticker sync
  Cursor.tsx · Footer.tsx
lib/
  data.ts           # ALL site content (driver, races, products...)
  scroll.ts         # scroll-to helper (pin-aware)
```

## ✏️ Customising

All content lives in **`lib/data.ts`**: driver name and number, stats, timeline, races, standings, car parts, gallery moments and merch. Change the data there and every section updates.

Brand colours are defined in `tailwind.config.ts`:

| Token | Value |
|---|---|
| `asphalt` | `#0B0B0D` |
| `panel` | `#141418` |
| `line` | `#26262C` |
| `accent` | `#C8FF2E` |
| `bone` | `#F2F0EA` |

## ☁️ Deployment

Works out of the box on [Vercel](https://vercel.com/): import the repo and deploy, no configuration needed.

## 📄 License

MIT © Abhishek — see [LICENSE](./LICENSE).
