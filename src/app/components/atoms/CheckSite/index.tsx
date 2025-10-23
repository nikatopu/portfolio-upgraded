import style from "./CheckSite.module.scss";

interface Props {
  link: string;
}

export default function CheckSite({ link }: Props) {
  return (
    <button
      className={style.container}
      onClick={() => window.open(link, "_blank")}
    >
      <span>Check Out The Website</span>
    </button>
  );
}
