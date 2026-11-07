import { ImageResponse } from "next/og";
import { getSite, getUI, toLang } from "@/lib/content";
import { C, loadFonts, OG_SIZE, OgStamp } from "../_lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Nikoloz Topuridze, freelance web developer in Tbilisi";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const lang = toLang((await params).lang);
  const ui = getUI(lang);
  const site = getSite();
  const label = ui.hero.eyebrow.toUpperCase();
  const footer = "nikatopu.dev";

  const fonts = await loadFonts([
    { name: "Gloock", family: "Gloock", text: site.name },
    { name: "Hanken", family: "Hanken Grotesk", weight: 400, text: ui.hero.lede + footer },
    { name: "Courier", family: "Courier Prime", text: label + footer },
    { name: "NotoGe", family: "Noto Sans Georgian", weight: 400, text: ui.hero.lede + label },
  ]);

  return new ImageResponse(
    (
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "80px 80px 64px", background: C.paper, color: C.ink }}>
        <div style={{ display: "flex", fontFamily: "Courier, NotoGe", fontSize: 24, color: C.muted, letterSpacing: 2 }}>{label}</div>
        <div style={{ display: "flex", marginTop: 36, fontFamily: "Gloock", fontSize: 104, lineHeight: 1, letterSpacing: -2 }}>{site.name}</div>
        <div style={{ display: "flex", marginTop: 32, fontFamily: "Hanken, NotoGe", fontSize: 34, lineHeight: 1.35, maxWidth: 800 }}>{ui.hero.lede}</div>
        <div style={{ display: "flex", marginTop: "auto", fontFamily: "Courier", fontSize: 28, color: C.accent }}>{footer}</div>
        <div style={{ position: "absolute", right: 72, bottom: 56, display: "flex" }}>
          <OgStamp size={170} />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
