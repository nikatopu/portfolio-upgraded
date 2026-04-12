import { useAppContextProvider } from "@/app/lib/AppContext";
import style from "./About.module.scss";
import config from "@/app/lib/config";
import { motion, Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function About() {
  const { experienceInYears } = useAppContextProvider();

  return (
    <motion.section
      id="about"
      className={style.container}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div className={style.textContainer} variants={itemVariants}>
        <h2>About Me</h2>

        <motion.p variants={itemVariants}>
          I am a Full-Stack Developer based in Georgia, Tbilisi. With over {experienceInYears}{" "}
          years of experience, I specialize in the React ecosystem, specifically
          leveraging Next.js and Typescript to build lightning-fast web
          applications.
        </motion.p>

        <motion.p variants={itemVariants}>
          My philosophy is simple: Write clean code, build for the user and
          never stop learning. When I'm not working, you can find me exploring
          current trends or contributing to open-source projects.
        </motion.p>

        <motion.p variants={itemVariants}>
          If you wish to contact me, you can email me by my current email{" "}
          <a href={`mailto:${config.email}`}>{config.email}</a>.
        </motion.p>
      </motion.div>

      <motion.div
        className={style.imageContainer}
        variants={itemVariants}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
      >
        <img
          src="/assets/images/me.jpg"
          alt="Nikoloz Topuridze"
          className={style.myImage}
        />

        <div className={style.yearsOfExperience}>
          <h4>{experienceInYears}+</h4>
          <p>Years of Experience</p>
        </div>
      </motion.div>
    </motion.section>
  );
}
