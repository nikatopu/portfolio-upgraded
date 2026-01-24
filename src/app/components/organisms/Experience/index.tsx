import config from "@/app/lib/config";
import style from "./Experience.module.scss";
import Job from "./Job";
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

export default function Experience() {
  return (
    <motion.section
      id="experience"
      className={style.container}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div className={style.titleContainer} variants={itemVariants}>
        <h2>Experience</h2>
        <a
          href={config.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check out my LinkedIn ↗
        </a>
      </motion.div>

      <motion.div className={style.experiencesContainer}>
        {config.experiences.map((experience, index) => (
          <motion.div key={experience.position + index} variants={itemVariants}>
            <Job experience={experience} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
