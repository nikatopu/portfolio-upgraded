import type { UI } from "@/lib/content";
import SectionHead from "./SectionHead";
import sec from "./Section.module.scss";
import s from "./Campaigns.module.scss";

type Props = { ui: UI["campaigns"]; building: UI["building"] };

export default function Campaigns({ ui, building }: Props) {
  return (
    <section className={`${sec.section} ${sec.cream}`} id="campaigns">
      <SectionHead title={ui.title} intro={ui.intro} />

      <ol className={s.ledger}>
        {ui.items.map((item, i) => (
          <li key={item.artist} data-reveal={i * 60}>
            <a className={s.row} href={item.url} target="_blank" rel="noopener noreferrer">
              <span className={s.num}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.artist}>{item.artist}</span>
              <span className={s.format}>{item.format}</span>
              <span className={s.arrow} aria-hidden>
                ↗
              </span>
            </a>
          </li>
        ))}
      </ol>
      <details className={s.all}>
        <summary>
          <span>
            {ui.allLabel} <span className={s.count}>({ui.items.length + ui.archive.length})</span>
          </span>
          <span className={s.chevron} aria-hidden />
        </summary>
        <p className={s.allNote}>{ui.allNote}</p>
        <ul className={s.allList}>
          {ui.archive.map((item) => (
            <li key={item.url}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <span className={s.allArtist}>{item.artist}</span>
                <span className={s.allFormat}>{item.format}</span>
                <span className={s.allYear}>{item.year}</span>
                <span className={s.allArrow} aria-hidden>
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </details>

      <a className={s.more} href="https://studio.glitch.ge/" target="_blank" rel="noopener noreferrer">
        {ui.more} <span aria-hidden>↗</span>
      </a>

      <a className={s.building} href="https://www.raidoftheleks.com/" target="_blank" rel="noopener noreferrer" data-reveal>
        <span className={s.badge}>{building.label} · alpha</span>
        <span className={s.bTitle}>{building.title}</span>
        <span className={s.bText}>{building.text}</span>
        <span className={s.bLink}>
          {building.link} <span aria-hidden>↗</span>
        </span>
      </a>
    </section>
  );
}
