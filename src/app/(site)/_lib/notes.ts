import type { StampParams } from "./stamp";

export type NoteRole = "recruiter" | "manager" | "client" | "engineer" | "designer" | "friend" | "visitor";
export const NOTE_ROLES: NoteRole[] = ["recruiter", "manager", "client", "engineer", "designer", "friend", "visitor"];

/** A doodle is vector data: strokes of points in a 1000×625 box. Never an uploaded image. */
export type Doodle = number[][]; // each stroke: [x0, y0, x1, y1, ...]
export const DOODLE_W = 1000;
export const DOODLE_H = 625;

export type Note = {
  id: string;
  name: string; // "" = anonymous
  role: NoteRole;
  message: string;
  doodle?: Doodle;
  stamp: StampParams;
  date: string;
};

function smiley(): Doodle {
  const circle: number[] = [];
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    circle.push(Math.round(500 + Math.cos(a) * 230), Math.round(312 + Math.sin(a) * 230));
  }
  const mouth: number[] = [];
  for (let i = 0; i <= 16; i++) {
    const a = Math.PI * (0.15 + 0.7 * (i / 16));
    mouth.push(Math.round(500 + Math.cos(a) * 130), Math.round(330 + Math.sin(a) * 110));
  }
  return [circle, [430, 240, 432, 270], [570, 240, 568, 270], mouth];
}

// Development-only sample data: shown only when `next dev` runs without any database.
// Never shown in production (it would be fake testimonials).
export const SAMPLE_NOTES: Note[] = [
  { id: "1", name: "Mariam", role: "recruiter", message: "The folders are a lovely touch. First portfolio this month where I found the CV in under ten seconds.", stamp: { seed: "m4k8x2qa", density: 0.5, flow: 0.3, shape: "circle" }, date: "2026-10-30" },
  { id: "2", name: "", role: "engineer", message: "Came for the particles, stayed for the Dialogue Forge write-up. The migration chain is a neat idea.", stamp: { seed: "7rz3vn0e", density: 0.7, flow: 0.6, shape: "hex" }, date: "2026-10-29" },
  { id: "3", name: "Giorgi", role: "client", message: "", doodle: smiley(), stamp: { seed: "g9p2w6tc", density: 0.4, flow: 0.2, shape: "square" }, date: "2026-10-27" },
  { id: "4", name: "Ana", role: "designer", message: "Light mode first? Bold. It works.", stamp: { seed: "a5h1yq8d", density: 0.35, flow: 0.8, shape: "circle" }, date: "2026-10-25" },
  { id: "5", name: "", role: "visitor", message: "გამარჯობა from Batumi 👋", stamp: { seed: "b0t7mu3k", density: 0.6, flow: 0.45, shape: "hex" }, date: "2026-10-24" },
  { id: "6", name: "Luka", role: "manager", message: "Clear about what you did on team projects. That honesty is rarer than it should be.", stamp: { seed: "l2c9fj4s", density: 0.55, flow: 0.15, shape: "square" }, date: "2026-10-22" },
];
