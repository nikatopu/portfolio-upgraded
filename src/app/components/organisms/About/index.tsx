import { useAppContextProvider } from "@/app/lib/AppContext";
import style from "./About.module.scss";
import config from "@/app/lib/config";

export default function About() {
  const { experienceInYears } = useAppContextProvider();

  return (
    <section id="about" className={style.container}>
      <div className={style.textContainer}>
        <h2>About Me</h2>
        <p>
          I am a Full-Stack Developer based in Georgia, Tbilisi. With over 3
          years of experience, I specialize in the React ecosystem, specifically
          leveraging Next.js and Typescript to build lightning-fast web
          applications.
        </p>
        <p>
          My philosophy is simple: Write clean code, build for the user and
          never stop learning. When I'm not working, you can find me exploring
          current trends or contributing to open-source projects.
        </p>
        <p>
          If you wish to contact me, you can email me by my current email{" "}
          <a href={`mailto:${config.email}`}>{config.email}</a>.
        </p>
      </div>

      <div className={style.imageContainer}>
        <img
          src="/assets/images/me.jpg"
          alt="Nikoloz Topuridze"
          className={style.myImage}
        />

        <div className={style.yearsOfExperience}>
          <h4>{experienceInYears}+</h4>
          <p>Years of Experience</p>
        </div>
      </div>
    </section>
  );
}
