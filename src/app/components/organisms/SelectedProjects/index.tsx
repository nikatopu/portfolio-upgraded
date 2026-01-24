import config from "@/app/lib/config";
import style from "./SelectedProjects.module.scss";
import Card from "./Card";

export default function SelectedProjects() {
  const selectedProjects = config.selectedProjects;

  return (
    <section id="projects" className={style.container}>
      <div className={style.titleContainer}>
        <div className={style.title}>
          <h2>Selected Projects</h2>
          <p>A collection of technical challenges and creative solutions.</p>
        </div>

        <a
          href={config.socials.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          See all repositories ↗
        </a>
      </div>

      <div className={style.projectsContainer}>
        {selectedProjects.map((project, index) => (
          <Card project={project} key={project.title + index} />
        ))}
      </div>
    </section>
  );
}
