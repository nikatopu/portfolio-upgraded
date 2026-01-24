import config from "@/app/lib/config";
import style from "./Hero.module.scss";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Hero() {
  function viewSelectedWork() {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  function downloadResume() {
    window.open("/documents/Nikoloz Topuridze - Resume.pdf", "_blank");
  }

  return (
    <section className={style.container}>
      <motion.div
        className={style.gradient}
        initial={{ translateX: "0%", opacity: 0 }}
        animate={{ translateX: "25%", opacity: 1 }}
        transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }} // easeInOut cubic-bezier
      />

      <motion.div
        className={style.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants}>
          AVAILABLE FOR NEW OPPORTUNITIES
        </motion.p>

        <motion.h2 variants={itemVariants}>Nikoloz Topuridze</motion.h2>

        <motion.h1 variants={itemVariants}>
          Full-Stack <br /> Engineer
        </motion.h1>

        <motion.div
          className={style.smallDescriptionContainer}
          variants={itemVariants}
        >
          <p>
            Crafting high-performance web experiences with <b>Next.js</b> &{" "}
            <b>TypeScript</b>.
          </p>
          <p>
            Focused on building scalable and user-centric digital products,
            quickly and efficiently.
          </p>
        </motion.div>

        <motion.div className={style.buttonsContainer} variants={itemVariants}>
          <button className={style.primaryButton} onClick={viewSelectedWork}>
            View Selected Work ↓
          </button>

          <button className={style.secondaryButton} onClick={downloadResume}>
            <span>Download Resume</span>
            {/* svg unchanged */}
          </button>
        </motion.div>
      </motion.div>

      <div className={style.techStackContainer}>
        <motion.div
          className={style.techStackTrack}
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {config.techStack.map((tech, index) => (
            <p key={"tech" + index} className={style.techStackItem}>
              {tech}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
