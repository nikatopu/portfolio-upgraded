import type { Metadata } from "next";
import { getCases, getSite, getUI, KA_READY, LANGS, toLang } from "@/lib/content";
import { alternates, ogLocale, robotsFor, siteJsonLd } from "@/lib/seo";
import { getApprovedNotes, type WallNote } from "@/lib/server/notes";
import { SAMPLE_NOTES } from "../_lib/notes";
import Header from "../_components/Header";
import Hero from "../_components/Hero";
import SectionHead from "../_components/SectionHead";
import FolderStack from "../_components/FolderStack";
import Campaigns from "../_components/Campaigns";
import Lab from "../_components/Lab";
import VisitorLog from "../_components/VisitorLog";
import Contact from "../_components/Contact";
import Footer from "../_components/Footer";
import JsonLd from "../_components/JsonLd";
import sec from "../_components/Section.module.scss";

type Props = { params: Promise<{ lang: string }> };

// Approving a note expires this page's cached data (updateTag). With dynamicParams = false Next
// treats the expired entry as "not prerendered" and 404s (NoFallbackError), so this page allows
// on-demand rendering. Safe: src/proxy.ts only ever routes "en" or "ka" here, and the layout
// calls notFound() for anything else.
export const dynamicParams = true;
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  const ui = getUI(lang);
  return {
    title: { absolute: ui.meta.homeTitle },
    description: ui.meta.homeDescription,
    alternates: alternates("/", lang),
    robots: robotsFor(lang),
    openGraph: { title: ui.meta.homeTitle, description: ui.meta.homeDescription, url: alternates("/", lang)?.canonical as string, locale: ogLocale(lang), type: "website" },
  };
}

export default async function Home({ params }: Props) {
  const lang = toLang((await params).lang);
  const ui = getUI(lang);
  const site = getSite();
  const cases = getCases(lang);
  const wall = await getApprovedNotes().catch((err) => {
    console.error("[home] notes unavailable:", err);
    return null;
  });
  const sample = wall === null && process.env.NODE_ENV === "development";
  const notes: WallNote[] = wall ?? (sample ? SAMPLE_NOTES : []);

  return (
    <>
      <JsonLd data={siteJsonLd(lang, ui.meta.homeDescription)} />
      <Header ui={ui.nav} lang={lang} name={site.name} showLangToggle={KA_READY || lang === "ka" || process.env.NODE_ENV === "development"} />
      <main>
        <Hero ui={ui.hero} lang={lang} />

        <section className={sec.section} id="work">
          <SectionHead title={ui.work.title} intro={ui.work.intro} />
          <FolderStack
            cases={cases.map(({ slug, number, title, headline, summary, tabLabel, client, years, kind, image, stack }) => ({ slug, number, title, headline, summary, tabLabel, client, years, kind, image, stack }))}
            ui={ui.work}
            lang={lang}
          />
        </section>

        <Campaigns ui={ui.campaigns} building={ui.building} />
        <Lab ui={ui.lab} ringLabel={ui.hero.stampText} />
        <VisitorLog ui={ui.notes} lang={lang} notes={notes} sample={sample} />
        <Contact ui={ui.contact} contact={site.contact} lang={lang} />
      </main>
      <Footer ui={ui.footer} site={site} />
    </>
  );
}
