// Everything here is invented for this concept site: the driver, team,
// circuits, results and products do not refer to real people or events.

export const DRIVER = {
  first: "NIKO",
  last: "VANCE",
  number: "27",
  team: "Helix Racing",
  tagline: "Late on the brakes. Early on the throttle. Never quiet on the radio.",
};

export const STATS = [
  { label: "Race wins", value: 9 },
  { label: "Podiums", value: 31 },
  { label: "Pole positions", value: 14 },
  { label: "Fastest laps", value: 11 },
];

export type TimelineItem = { year: string; title: string; text: string };

export const TIMELINE: TimelineItem[] = [
  {
    year: "2013",
    title: "First kart",
    text: "A rented kart on a car-park circuit behind a petrol station. Last place, biggest grin in the paddock.",
  },
  {
    year: "2017",
    title: "National karting champion",
    text: "Four wins from six rounds, and the first time the word 'prospect' appeared next to his name.",
  },
  {
    year: "2020",
    title: "Into single-seaters",
    text: "Moved up a category mid-pandemic with a borrowed helmet and a very small budget.",
  },
  {
    year: "2022",
    title: "Regional series title",
    text: "Took the championship at the final round after a lap-one spin that should have ended it.",
  },
  {
    year: "2024",
    title: "Feeder series, four wins",
    text: "The year the team stopped calling it 'raw speed' and started calling it racecraft.",
  },
  {
    year: "2026",
    title: "Grand Prix debut with Helix Racing",
    text: "Car 27. A podium in the opening round, and a long list of things still to prove.",
  },
];

export type Race = {
  round: string;
  name: string;
  place: string;
  date: string;
  result: string | null; // null = not raced yet
};

export const RACES: Race[] = [
  { round: "01", name: "Harbor Nights GP", place: "Port Meridian", date: "08 Mar", result: "P2" },
  { round: "02", name: "Sand Ridge GP", place: "Karun Desert", date: "29 Mar", result: "P1" },
  { round: "03", name: "Old Mill GP", place: "Brindley", date: "19 Apr", result: "P4" },
  { round: "04", name: "Coastline GP", place: "Valmora", date: "10 May", result: "P1" },
  { round: "05", name: "Pinewood GP", place: "Aldermoor", date: "07 Jun", result: "P3" },
  { round: "06", name: "Skyline GP", place: "Tessaly", date: "12 Jul", result: "DNF" },
  { round: "07", name: "Lakeshore GP", place: "Ostrava Bay", date: "30 Aug", result: "P1" },
  { round: "08", name: "Foundry GP", place: "Hallow Creek", date: "20 Sep", result: "P2" },
  { round: "09", name: "Midnight GP", place: "Neon Quay", date: "18 Oct", result: null },
  { round: "10", name: "Season Finale GP", place: "Meridian Ring", date: "08 Nov", result: null },
];

export type Product = {
  id: string;
  name: string;
  price: string;
  kind: "tee" | "cap" | "hoodie" | "poster";
};

export const PRODUCTS: Product[] = [
  { id: "tee", name: "Car 27 Team Tee", price: "₹2,499", kind: "tee" },
  { id: "cap", name: "Paddock Cap", price: "₹1,799", kind: "cap" },
  { id: "hoodie", name: "Pit Lane Hoodie", price: "₹4,999", kind: "hoodie" },
  { id: "poster", name: "Meridian Ring Poster", price: "₹1,299", kind: "poster" },
];

// All names below are invented. Any resemblance to real drivers is coincidental.
export type Standing = { pos: number; name: string; team: string; pts: number; me?: boolean };
export const STANDINGS: Standing[] = [
  { pos: 1, name: "Rafael Okoye", team: "Solis GP", pts: 168 },
  { pos: 2, name: "Niko Vance", team: "Helix Racing", pts: 154, me: true },
  { pos: 3, name: "Mira Halden", team: "Northwind", pts: 141 },
  { pos: 4, name: "Tomas Brandt", team: "Solis GP", pts: 120 },
  { pos: 5, name: "Anaya Rao", team: "Vortex Motorsport", pts: 97 },
  { pos: 6, name: "Luca Ferrante", team: "Northwind", pts: 81 },
  { pos: 7, name: "Jun Takeda", team: "Vortex Motorsport", pts: 64 },
  { pos: 8, name: "Sofia Marek", team: "Helix Racing", pts: 52 },
];

export const CAR_PARTS = [
  { title: "Rear wing", text: "Adjustable flap opens on the straights to shed drag — the 'overtake' button you can see." },
  { title: "Power unit", text: "A 1.6L hybrid V6 hides under the engine cover, feeding energy back on every braking zone." },
  { title: "Halo", text: "Titanium cockpit protection. It can carry the weight of a double-decker bus." },
  { title: "Nose & front wing", text: "Where the airflow is born. A few millimetres here change how the whole car feels." },
  { title: "Tyres", text: "Soft, medium or hard. A fresh soft is a rocket for three laps and a problem after fifteen." },
];

export const MOMENTS = [
  { title: "First pole", note: "Qualifying, Meridian Ring", a: "#C8FF2E", b: "#0B0B0D", scene: "pole" },
  { title: "Rain at Hallow Creek", note: "Wet-weather win, Round 7", a: "#5aa9ff", b: "#0B0B0D", scene: "rain" },
  { title: "2.3 second stop", note: "The crew nailed it", a: "#ff8a3d", b: "#0B0B0D", scene: "pit" },
  { title: "Podium champagne", note: "Round 4, Ironbridge", a: "#f2f0ea", b: "#26262C", scene: "podium" },
  { title: "Night race", note: "Neon Quay, under lights", a: "#b36bff", b: "#0B0B0D", scene: "night" },
];

