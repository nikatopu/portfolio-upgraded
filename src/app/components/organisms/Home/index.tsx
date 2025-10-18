import Socials from "../../atoms/Socials";
import Title from "../../atoms/Title";
import style from "./Home.module.scss";

export default function Home() {
  return (
    <div className={style.container}>
      <div className={style.textsContainer}>
        <Title size="large">
          Welcome to my{" "}
          <b>
            <i>Portfolio</i>
          </b>
        </Title>

        <Title>
          Nikoloz, <b>Front-end Developer</b>
        </Title>

        <Title size="small">
          Check out the{" "}
          <b>
            <a href="#">Figma</a>
          </b>{" "}
          or{" "}
          <b>
            <a href="#">GitHub Repository</a>
          </b>{" "}
          of this <i>portfolio</i>
        </Title>
      </div>

      <div className={style.imageContainer}>
        <picture>
          <source srcSet="/assets/images/me.webp" type="image/webp" />
          <source srcSet="/assets/images/me.png" type="image/png" />
          <img
            src="/assets/images/me.png"
            alt="Picture of the author"
            loading="lazy"
          />
        </picture>
      </div>

      <Socials />
    </div>
  );
}
