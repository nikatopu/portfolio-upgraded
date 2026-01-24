import Tag from "@/app/components/atoms/Tag";
import style from "./Card.module.scss";
import { TProject } from "@/app/lib/types";

type CardProps = {
  project: TProject;
};

export default function Card({ project }: CardProps) {
  return (
    <button className={style.container}>
      <img
        src={project.image}
        alt={project.title}
        className={style.projectImage}
      />

      <div className={style.details}>
        <div className={style.tags}>
          {project.tags.map((tag, index) => (
            <Tag key={project.title + "tag" + index} text={tag} />
          ))}
        </div>

        <h3 className={style.title}>{project.title}</h3>
        <p className={style.description}>{project.description}</p>
      </div>
    </button>
  );
}
