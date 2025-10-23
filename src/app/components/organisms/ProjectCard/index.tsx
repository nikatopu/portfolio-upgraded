import { IProjectCard } from "@/app/lib/types";
import Paragraph from "../../atoms/Paragraph";
import Title from "../../atoms/Title";
import style from "./ProjectCard.module.scss";

export default function ProjectCard({
  image,
  title,
  techs,
  description,
  link,
}: IProjectCard) {
  return (
    <a
      className={style.container}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={style.imageContainer}>
        <img src={image} alt={title} loading="lazy" />
      </div>

      <div className={style.textsContainer}>
        <Title size="small">
          <b>{title}</b>
        </Title>

        <Paragraph size="small" align="center">
          Tech: {techs.join(", ")}
        </Paragraph>

        <Paragraph size="small" align="center" color="lighter">
          {description}
        </Paragraph>
      </div>
    </a>
  );
}
