import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCase, getCases, getSite, getUI, KA_READY, LANGS, toLang } from "@/lib/content";
import { alternates, caseJsonLd, ogLocale, robotsFor } from "@/lib/seo";
import Header from "../../../_components/Header";
import Footer from "../../../_components/Footer";
import Stamp from "../../../_components/Stamp";
import JsonLd from "../../../_components/JsonLd";
import { href } from "../../../_lib/paths";
import s from "./Case.module.scss";

type Props = { params: Promise<{ lang: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.flatMap((lang) => getCases(lang).map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const lang = toLang(l);
  const c = getCase(slug, lang);
  if (!c) return {};
  const alt = alternates(`/work/${slug}`, lang);
  return {
    title: c.seo.title,
    description: c.seo.description,
    alternates: alt,
    robots: robotsFor(lang),
    openGraph: { type: "article", title: c.seo.title, description: c.seo.description, url: alt?.canonical as string, locale: ogLocale(lang) },
  };
}

export default async function CasePage({ params }: Props) {
  const { lang: l, slug } = await params;
  const lang = toLang(l);
  const c = getCase(slug, lang);
  if (!c) notFound();

  const ui = getUI(lang);
  const site = getSite();
  const all = getCases(lang);
  const next = all[(all.findIndex((x) => x.slug === slug) + 1) % all.length];

  return (
    <>
      <JsonLd data={caseJsonLd(c, lang, site.name, ui.work.title)} />
      <Header ui={ui.nav} lang={lang} name={site.name} showLangToggle={KA_READY || lang === "ka" || process.env.NODE_ENV === "development"} />

      <main className={s.desk}>
        <Link href={href("/", lang, "work")} className={s.back}>
          ← {ui.case.back}
        </Link>

        <article className={s.doc}>
          <div className={s.tab}>
            {ui.work.caseLabel} {c.number} · {c.tabLabel}
          </div>

          <div className={s.docStamp} aria-hidden>
            <Stamp params={{ seed: c.slug, density: 0.5, flow: 0.35, shape: "circle" }} size={150} ringLabel={`CASE FILE ${c.number} · ${c.client.toUpperCase()} · `} />
          </div>

          <header className={s.head}>
            <p className={s.kicker}>
              {c.kind === "client" ? ui.work.client : ui.work.product} · {c.years}
            </p>
            <h1 className={s.title}>{c.title}</h1>
            <p className={s.headline}>{c.headline}</p>

            <dl className={s.meta}>
              <div>
                <dt>{ui.case.client}</dt>
                <dd>{c.client}</dd>
              </div>
              <div>
                <dt>{ui.case.role}</dt>
                <dd>{c.role}</dd>
              </div>
              <div>
                <dt>{ui.case.years}</dt>
                <dd>{c.years}</dd>
              </div>
              <div>
                <dt>{ui.case.stack}</dt>
                <dd>{c.stack.join(", ")}</dd>
              </div>
            </dl>
            {c.links.live && (
              <a className={s.live} href={c.links.live} target="_blank" rel="noopener noreferrer">
                {ui.case.live} <span aria-hidden>↗</span>
              </a>
            )}
          </header>

          <figure className={s.figure}>
            <Image src={c.image} alt={`${c.title}: ${c.headline}`} fill priority sizes="(max-width: 1040px) 92vw, 960px" />
          </figure>

          <section className={s.tldr} data-reveal>
            <h2>{ui.case.tldr}</h2>
            <ol>
              {c.tldr.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
          </section>

          <section className={s.metrics} data-reveal>
            {c.metrics.map((m, i) => (
              <div key={i}>
                <p className={s.metricValue}>{m.value}</p>
                <p className={s.metricLabel}>{m.label}</p>
              </div>
            ))}
          </section>

          <section className={s.timeline} data-reveal>
            <h2>{ui.case.timeline}</h2>
            <ol>
              {c.timeline.map((t, i) => (
                <li key={i}>
                  <span>{t.period}</span>
                  <p>{t.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <div className={s.body}>
            {c.sections.map((sec, i) => (
              <section key={i} data-reveal>
                <h2>{sec.heading}</h2>
                {sec.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {sec.bullets.length > 0 && (
                  <ul>
                    {sec.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <details className={s.hood}>
              <summary>
                <span>{c.underTheHood.heading}</span>
                <span className={s.hoodHint}>{ui.case.hoodHint} ↓</span>
              </summary>
              {c.underTheHood.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              <ul>
                {c.underTheHood.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </details>
          </div>

          <aside className={s.cta}>
            <p>{c.cta}</p>
            <a href={href("/", lang, "contact")}>
              {ui.case.ctaButton} <span aria-hidden>→</span>
            </a>
          </aside>
        </article>

        <Link href={href(`/work/${next.slug}`, lang)} className={s.next}>
          <span>
            {ui.case.next} · {ui.work.caseLabel} {next.number}
          </span>
          <strong>{next.title}</strong>
          <em>{next.headline}</em>
        </Link>
      </main>

      <Footer ui={ui.footer} site={site} />
    </>
  );
}
