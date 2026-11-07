// Shared pieces for the 1200×630 Open Graph cards (rendered with next/og at build time).
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

export const C = {
  paper: "#F3F0EA",
  raised: "#FBFAF6",
  folder: "#E7DDC8",
  edge: "#D3C5A8",
  ink: "#151515",
  muted: "#6E6A62",
  accent: "#1F4FD1",
};

type FontSpec = { name: string; family: string; weight?: 400 | 700; text: string };

/** Fetch a Google Font subset containing only `text` (TTF, which Satori needs). */
async function loadGoogleFont({ family, weight, text }: FontSpec) {
  const axis = weight ? `:wght@${weight}` : "";
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}${axis}&text=${encodeURIComponent(text)}`)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error(`No TTF for ${family}`);
  return (await fetch(src)).arrayBuffer();
}

/** Loads whatever fonts it can; a network failure falls back to the default font instead of failing the build. */
export async function loadFonts(specs: FontSpec[]) {
  const results = await Promise.allSettled(specs.map(loadGoogleFont));
  return results.flatMap((r, i) =>
    r.status === "fulfilled" ? [{ name: specs[i].name, data: r.value, weight: specs[i].weight ?? 400, style: "normal" as const }] : [],
  );
}

export async function publicImageDataUrl(publicPath: string) {
  const buf = await readFile(join(process.cwd(), "public", publicPath));
  const ext = publicPath.split(".").pop()?.toLowerCase();
  const mime = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

/** A simple rubber-stamp circle in SVG (Satori can't run the canvas stamp). */
export function OgStamp({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: "rotate(-8deg)" }}>
      <circle cx="50" cy="50" r="46" fill="none" stroke={C.accent} strokeWidth="4" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={C.accent} strokeWidth="1.2" />
      <path d="M28 52 C 38 30, 52 70, 72 44" fill="none" stroke={C.accent} strokeWidth="1.6" />
      <path d="M30 60 C 42 42, 56 76, 70 54" fill="none" stroke={C.accent} strokeWidth="1.2" opacity="0.7" />
      <path d="M32 44 C 44 24, 58 60, 70 36" fill="none" stroke={C.accent} strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}
