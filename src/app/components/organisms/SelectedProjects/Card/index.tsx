import Tag from "@/app/components/atoms/Tag";
import style from "./Card.module.scss";
import { TProject } from "@/app/lib/types";
import { motion } from "framer-motion";

type CardProps = {
  project: TProject;
};

export default function Card({ project }: CardProps) {
  return (
    <motion.button
      className={style.container}
      onClick={project.onClick}
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
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
    </motion.button>
  );
}
