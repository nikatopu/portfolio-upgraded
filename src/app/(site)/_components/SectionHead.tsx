import s from "./Section.module.scss";

type Props = { title: string; intro?: string };

export default function SectionHead({ title, intro }: Props) {
  return (
    <div className={s.head} data-reveal>
      <h2 className={s.title}>{title}</h2>
      {intro && <p className={s.intro}>{intro}</p>}
    </div>
  );
}
