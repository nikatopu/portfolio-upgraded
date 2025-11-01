import { IProjectCard } from "@/app/lib/types";
import Paragraph from "../../atoms/Paragraph";
import Title from "../../atoms/Title";
import style from "./ProjectCard.module.scss";
import { motion, scale } from "framer-motion";

export default function ProjectCard({
  image,
  title,
  techs,
  description,
  link,
}: IProjectCard) {
  return (
    <motion.a
      className={style.container}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
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
    </motion.a>
  );
}
