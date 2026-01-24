import config from "@/app/lib/config";
import style from "./SelectedProjects.module.scss";
import Card from "./Card";
import { motion, Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function SelectedProjects() {
  const selectedProjects = config.selectedProjects;

  return (
    <motion.section
      id="projects"
      className={style.container}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div className={style.titleContainer} variants={itemVariants}>
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
      </motion.div>

      <motion.div className={style.projectsContainer}>
        {selectedProjects.map((project, index) => (
          <motion.div key={project.title + index} variants={itemVariants}>
            <Card project={project} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
