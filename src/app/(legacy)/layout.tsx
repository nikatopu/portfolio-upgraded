// Root layout for the standalone experiments (/math-animations, /guess-the-ball).
// They keep their original dark look; only the font moved to self-hosted Hanken Grotesk.
import "./global.scss";
import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import site from "@content/site.json";

const hanken = Hanken_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-legacy" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Lab · Nikoloz Topuridze", template: "%s · Lab · Nikoloz Topuridze" },
  icons: { icon: "/assets/images/monogram.svg" },
};

export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font variable sits on <html> because global.scss reads it in :root.
    <html lang="en" className={hanken.variable}>
      <body>{children}</body>
    </html>
  );
}
