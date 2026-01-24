import config from "@/app/lib/config";
import style from "./Experience.module.scss";
import Job from "./Job";

export default function Experience() {
  return (
    <section id="experience" className={style.container}>
      <div className={style.titleContainer}>
        <h2>Experience</h2>
        <a
          href={config.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check out my LinkedIn ↗
        </a>
      </div>

      <div className={style.experiencesContainer}>
        {config.experiences.map((experience, index) => (
          <Job experience={experience} key={experience.position + index} />
        ))}
      </div>
    </section>
  );
}
