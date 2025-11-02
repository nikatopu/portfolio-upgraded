import style from "./Gradients.module.scss";

export default function Gradients() {
  return (
    <div className={style.container}>
      <div className={`${style.gradient1} ${style.gradient}`}></div>
      <div className={`${style.gradient2} ${style.gradient}`}></div>
      <div className={`${style.gradient3} ${style.gradient}`}></div>
      <div className={`${style.gradient4} ${style.gradient}`}></div>
      <div className={`${style.gradient5} ${style.gradient}`}></div>
    </div>
  );
}
