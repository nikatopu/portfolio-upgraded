import style from "./Tag.module.scss";

export default function Tag({ text }: { text: string }) {
  return <span className={style.tag}>{text}</span>;
}
