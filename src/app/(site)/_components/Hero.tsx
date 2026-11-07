import type { Lang, UI } from "@/lib/content";
import { href } from "../_lib/paths";
import Stamp from "./Stamp";
import s from "./Hero.module.scss";

type Props = { ui: UI["hero"]; lang: Lang };

export default function Hero({ ui, lang }: Props) {
  return (
    <section className={s.hero}>
      <p className={s.eyebrow}>{ui.eyebrow}</p>
      <h1 className={s.name}>
        {ui.title.split(" ").map((word, i) => (
          <span key={word} style={{ animationDelay: `${120 + i * 110}ms` }}>
            {word}
          </span>
        ))}
      </h1>

      <div className={s.bottom}>
        <div className={s.copy}>
          <p className={s.lede}>{ui.lede}</p>
          <p className={s.cred}>{ui.credibility}</p>
          <div className={s.ctas}>
            <a className={s.primary} href={href("/", lang, "contact")}>
              {ui.ctaPrimary}
              <svg className={s.arrow} viewBox="0 0 16 16" aria-hidden>
                <path d="M2 8h11M9 4l4 4-4 4" />
              </svg>
            </a>
            <a className={s.secondary} href={href("/", lang, "work")}>
              {ui.ctaSecondary}
            </a>
          </div>
        </div>
        <div className={s.stampWrap} aria-hidden>
          <Stamp
            className={s.stamp}
            size={260}
            params={{ seed: "nikoloz-topuridze", density: 0.6, flow: 0.3, shape: "circle" }}
            ringLabel={ui.stampText}
            label="Generative stamp"
          />
        </div>
      </div>
    </section>
  );
}
