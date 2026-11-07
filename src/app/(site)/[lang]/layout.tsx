import "../reset.scss";
import type { Metadata, Viewport } from "next";
import { Courier_Prime, Gloock, Hanken_Grotesk, Noto_Sans_Georgian, Noto_Serif_Georgian } from "next/font/google";
import { notFound } from "next/navigation";
import { getSite, getUI, LANGS, toLang } from "@/lib/content";
import { ogLocale, robotsFor, SITE_URL } from "@/lib/seo";
import RevealObserver from "../_components/RevealObserver";
import s from "../Site.module.scss";

// Type: Gloock (display) · Hanken Grotesk (text) · Courier Prime (typewriter labels)
// Only the two faces needed for the first screen are preloaded; the rest load on demand.
const gloock = Gloock({ subsets: ["latin"], weight: "400", variable: "--f-gloock" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], style: ["normal", "italic"], variable: "--f-hanken" });
const courier = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--f-courier", preload: false });
// Georgian fallbacks (none of the Latin faces have Georgian glyphs)
const kaSans = Noto_Sans_Georgian({ subsets: ["georgian"], variable: "--font-sans-ka", preload: false });
const kaSerif = Noto_Serif_Georgian({ subsets: ["georgian"], variable: "--font-serif-ka", preload: false });

type Params = { params: Promise<{ lang: string }> };

export const dynamicParams = true; // see the note in ./page.tsx; invalid langs hit notFound() below
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lang = toLang((await params).lang);
  const ui = getUI(lang);
  const site = getSite();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: ui.meta.homeTitle, template: `%s · ${site.name}` },
    description: ui.meta.homeDescription,
    applicationName: site.name,
    authors: [{ name: site.name, url: SITE_URL }],
    creator: site.name,
    icons: { icon: "/assets/images/monogram.svg" },
    robots: robotsFor(lang),
    openGraph: { siteName: site.name, locale: ogLocale(lang), type: "website" },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f0ea" },
    { media: "(prefers-color-scheme: dark)", color: "#121211" },
  ],
};

// Runs before paint: light by default, dark only if the visitor chose it before.
const bootScript = `try{var t=localStorage.getItem('nt-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}document.documentElement.classList.add('js');`;

export default async function SiteLayout({ children, params }: Params & { children: React.ReactNode }) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ka") notFound();
  const fonts = [gloock, hanken, courier, kaSans, kaSerif].map((f) => f.variable).join(" ");

  return (
    <html lang={lang} data-theme="light" suppressHydrationWarning>
      <body className={`${fonts} ${s.root}`}>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <div className={s.progress} aria-hidden />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
