// Content loader: typed access to /content JSON with per-string Georgian → English fallback.
// Static imports (not fs) so this works in any runtime and gets type-checked.

import site from "@content/site.json";
import uiEn from "@content/ui/en.json";
import uiKa from "@content/ui/ka.json";

import iberieliMeta from "@content/cases/iberieli/meta.json";
import iberieliEn from "@content/cases/iberieli/en.json";
import iberieliKa from "@content/cases/iberieli/ka.json";
import geowonderMeta from "@content/cases/geowonder/meta.json";
import geowonderEn from "@content/cases/geowonder/en.json";
import geowonderKa from "@content/cases/geowonder/ka.json";
import anukaMeta from "@content/cases/anuka-live/meta.json";
import anukaEn from "@content/cases/anuka-live/en.json";
import anukaKa from "@content/cases/anuka-live/ka.json";
import dialogueForgeMeta from "@content/cases/dialogue-forge/meta.json";
import dialogueForgeEn from "@content/cases/dialogue-forge/en.json";
import dialogueForgeKa from "@content/cases/dialogue-forge/ka.json";

export type Lang = "en" | "ka";
export const LANGS: Lang[] = ["en", "ka"];

export function toLang(value: unknown): Lang {
  return value === "ka" ? "ka" : "en";
}

/** Deep-merge `ka` over `en`, treating empty strings as "not translated yet". */
export function withFallback<T>(en: T, ka: unknown): T {
  if (typeof en === "string") {
    return (typeof ka === "string" && ka.trim() !== "" ? ka : en) as T;
  }
  if (Array.isArray(en)) {
    const arr = Array.isArray(ka) ? ka : [];
    return en.map((item, i) => withFallback(item, arr[i])) as T;
  }
  if (en && typeof en === "object") {
    const obj = ka && typeof ka === "object" ? (ka as Record<string, unknown>) : {};
    return Object.fromEntries(
      Object.entries(en).map(([k, v]) => [k, withFallback(v, obj[k])]),
    ) as T;
  }
  return en;
}

export type UI = typeof uiEn;
export type Site = typeof site;

export type CaseMeta = {
  slug: string;
  order: number;
  kind: "client" | "product";
  client: string;
  years: string;
  stack: string[];
  links: { live?: string; repo?: string };
  image: string;
};

type Paragraphs = { heading: string; paragraphs: string[]; bullets: string[] };

export type CaseCopy = {
  title: string;
  headline: string;
  summary: string;
  tabLabel: string;
  role: string;
  timeline: { period: string; text: string }[];
  tldr: string[];
  metrics: { value: string; label: string }[];
  sections: Paragraphs[];
  underTheHood: Paragraphs;
  cta: string;
  seo: { title: string; description: string };
};

export type CaseStudy = CaseMeta & CaseCopy & { number: string };

const cases: { meta: CaseMeta; en: CaseCopy; ka: unknown }[] = [
  { meta: iberieliMeta as CaseMeta, en: iberieliEn, ka: iberieliKa },
  { meta: geowonderMeta as CaseMeta, en: geowonderEn, ka: geowonderKa },
  { meta: anukaMeta as CaseMeta, en: anukaEn, ka: anukaKa },
  { meta: dialogueForgeMeta as CaseMeta, en: dialogueForgeEn, ka: dialogueForgeKa },
];

export function getSite(): Site {
  return site;
}

/** Share of English strings that have a Georgian translation (UI + all case studies), 0..1. */
function coverage(en: unknown, ka: unknown): [number, number] {
  if (typeof en === "string") return [1, typeof ka === "string" && ka.trim() !== "" ? 1 : 0];
  if (Array.isArray(en)) {
    const arr = Array.isArray(ka) ? ka : [];
    return en.reduce<[number, number]>((acc, item, i) => { const [t, d] = coverage(item, arr[i]); return [acc[0] + t, acc[1] + d]; }, [0, 0]);
  }
  if (en && typeof en === "object") {
    const obj = ka && typeof ka === "object" ? (ka as Record<string, unknown>) : {};
    return Object.entries(en).reduce<[number, number]>((acc, [k, v]) => { const [t, d] = coverage(v, obj[k]); return [acc[0] + t, acc[1] + d]; }, [0, 0]);
  }
  return [0, 0];
}

export const KA_COVERAGE = (() => {
  const parts = [coverage(uiEn, uiKa), ...cases.map((c) => coverage(c.en, c.ka))];
  const [total, done] = parts.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]);
  return total ? done / total : 0;
})();

/**
 * The Georgian site is published (indexed, in the sitemap, toggle visible) once 80% is translated.
 * Until then /ka still works (for previewing) but is noindex and hidden from visitors in production.
 */
export const KA_READY = KA_COVERAGE >= 0.8;

/** Languages that are public: shown in hreflang, the sitemap and the language toggle. */
export const PUBLIC_LANGS: Lang[] = KA_READY ? ["en", "ka"] : ["en"];

export function getUI(lang: Lang): UI {
  return lang === "ka" ? withFallback(uiEn, uiKa) : uiEn;
}

export function getCases(lang: Lang): CaseStudy[] {
  return [...cases]
    .sort((a, b) => a.meta.order - b.meta.order)
    .map(({ meta, en, ka }, i) => ({
      ...meta,
      ...(lang === "ka" ? withFallback(en, ka) : en),
      number: String(i + 1).padStart(2, "0"),
    }));
}

export function getCase(slug: string, lang: Lang): CaseStudy | undefined {
  return getCases(lang).find((c) => c.slug === slug);
}
