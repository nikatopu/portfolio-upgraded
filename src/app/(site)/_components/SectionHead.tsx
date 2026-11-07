import s from "./Section.module.scss";

type Props = { index: string; label: string; title: string; intro?: string; aside?: React.ReactNode };

export default function SectionHead({ index, label, title, intro, aside }: Props) {
  return (
    <div className={s.head} data-reveal>
      <p className={s.label}>
        <span>
          § {index} — {label}
        </span>
        {aside}
      </p>
      <h2 className={s.title}>{title}</h2>
      {intro && <p className={s.intro}>{intro}</p>}
    </div>
  );
}
