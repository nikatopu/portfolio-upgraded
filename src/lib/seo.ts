// URLs, hreflang alternates and JSON-LD for the site.
// English lives at "/", Georgian at "/ka" (src/proxy.ts maps "/" → the internal "/en" route).

import type { Metadata } from "next";
import { getSite, KA_READY, type CaseStudy, type Lang } from "./content";

const site = getSite();
export const SITE_URL = site.url;
const PERSON_ID = `${SITE_URL}/#person`;

/** "/work/x" + "ka" → "/ka/work/x"; English paths stay unprefixed. */
export function localePath(path: string, lang: Lang) {
  if (lang === "en") return path;
  return `/ka${path === "/" ? "" : path}`;
}

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function alternates(path: string, lang: Lang): Metadata["alternates"] {
  return {
    canonical: localePath(path, lang),
    languages: KA_READY ? { en: path, ka: localePath(path, "ka"), "x-default": path } : undefined,
  };
}

/** Untranslated Georgian pages stay reachable for previewing but out of search results. */
export function robotsFor(lang: Lang): Metadata["robots"] {
  return lang === "ka" && !KA_READY ? { index: false, follow: true } : undefined;
}

export const ogLocale = (lang: Lang) => (lang === "ka" ? "ka_GE" : "en_US");

// ---------- JSON-LD ----------

export function siteJsonLd(lang: Lang, description: string) {
  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    alternateName: [site.shortName, "nikatopu"],
    url: SITE_URL,
    image: absoluteUrl("/assets/images/me.jpg"),
    jobTitle: "Full-stack developer",
    worksFor: { "@type": "Organization", name: "Glitch", url: "https://studio.glitch.ge/" },
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "GE" },
    email: `mailto:${site.contact.email}`,
    telephone: site.contact.phoneE164,
    sameAs: [...Object.values(site.socials), ...Object.values(site.profiles)],
    knowsAbout: ["Web development", "Next.js", "React", "TypeScript", "Search engine optimization", "Content management systems", "Interactive web experiences"],
  };
  const service = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: `${site.name}: web development`,
    description,
    url: absoluteUrl(localePath("/", lang)),
    image: absoluteUrl("/assets/images/me.jpg"),
    founder: { "@id": PERSON_ID },
    email: site.contact.email,
    telephone: site.contact.phoneE164,
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "GE" },
    areaServed: [{ "@type": "Country", name: "Georgia" }, "Worldwide"],
    availableLanguage: ["en", "ka"],
  };
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.name,
    inLanguage: ["en", "ka"],
    publisher: { "@id": PERSON_ID },
  };
  return { "@context": "https://schema.org", "@graph": [person, service, website] };
}

export function caseJsonLd(c: CaseStudy, lang: Lang, homeLabel: string, workLabel: string) {
  const url = absoluteUrl(localePath(`/work/${c.slug}`, lang));
  const work =
    c.kind === "product"
      ? {
          "@type": "SoftwareApplication",
          name: c.title,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web browser",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          url: c.links.live,
        }
      : { "@type": "CreativeWork", name: c.title, sourceOrganization: { "@type": "Organization", name: c.client, url: c.links.live } };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...work,
        "@id": `${url}#work`,
        headline: c.seo.title,
        description: c.seo.description,
        image: absoluteUrl(c.image),
        author: { "@id": PERSON_ID },
        keywords: c.stack.join(", "),
        inLanguage: lang,
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeLabel, item: absoluteUrl(localePath("/", lang)) },
          { "@type": "ListItem", position: 2, name: workLabel, item: absoluteUrl(`${localePath("/", lang)}#work`) },
          { "@type": "ListItem", position: 3, name: c.title, item: url },
        ],
      },
    ],
  };
}
