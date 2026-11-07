import { ImageResponse } from "next/og";
import { getCase, getSite, getUI, toLang } from "@/lib/content";
import { C, loadFonts, OG_SIZE, OgStamp, publicImageDataUrl } from "../../../_lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study by Nikoloz Topuridze";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: l, slug } = await params;
  const lang = toLang(l);
  const c = getCase(slug, lang)!;
  const ui = getUI(lang);
  const site = getSite();
  const label = `${ui.work.caseLabel} ${c.number} · ${c.tabLabel}`.toUpperCase();
  const footer = `${site.name} · nikatopu.dev`;
  const photo = await publicImageDataUrl(c.image);

  const fonts = await loadFonts([
    { name: "Gloock", family: "Gloock", text: c.title },
    { name: "Hanken", family: "Hanken Grotesk", weight: 400, text: c.headline + footer },
    { name: "Courier", family: "Courier Prime", text: label },
    { name: "NotoGe", family: "Noto Sans Georgian", weight: 400, text: c.headline + label + c.title },
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.paper, padding: "56px 64px 0" }}>
        {/* folder */}
        <div style={{ position: "relative", display: "flex", flex: 1, marginTop: 40 }}>
          <div style={{ position: "absolute", top: -40, left: 0, height: 56, padding: "12px 24px 0", display: "flex", background: C.folder, border: `2px solid ${C.edge}`, borderBottom: "none", borderRadius: "14px 14px 0 0", fontFamily: "Courier, NotoGe", fontSize: 22, letterSpacing: 2, color: C.ink }}>
            {label}
          </div>
          <div style={{ display: "flex", flex: 1, background: C.folder, border: `2px solid ${C.edge}`, borderRadius: "0 20px 0 0", borderBottom: "none", padding: "48px 48px 0", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", width: 560 }}>
              <div style={{ fontFamily: "Gloock, NotoGe", fontSize: 108, lineHeight: 0.95, letterSpacing: -2, color: C.ink }}>{c.title}</div>
              <div style={{ marginTop: 24, fontFamily: "Hanken, NotoGe", fontSize: 32, lineHeight: 1.3, color: C.ink }}>{c.headline}</div>
              <div style={{ marginTop: "auto", marginBottom: 40, display: "flex", fontFamily: "Hanken", fontSize: 24, color: C.muted }}>{footer}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
              <div style={{ display: "flex", padding: "12px 12px 40px", background: C.raised, border: `1px solid ${C.edge}`, transform: "rotate(2.5deg)", boxShadow: "0 18px 40px rgba(60,45,20,0.22)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} width={400} height={300} style={{ objectFit: "cover" }} alt="" />
              </div>
              <div style={{ position: "absolute", right: -24, bottom: 10, display: "flex" }}>
                <OgStamp size={140} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
