import config from "@/app/lib/config";
import TopuPortfolio from "../../atoms/TopuPortfolio";
import style from "./Footer.module.scss";
import { motion, Variants } from "framer-motion";

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.08 },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

export default function Footer() {
  return (
    <motion.footer
      className={style.container}
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div className={style.logoContainer} variants={linkVariants}>
        <TopuPortfolio />
      </motion.div>

      <div className={style.linksContainer}>
        {Object.entries(config.socials).map(([name, link], index) => (
          <motion.a
            key={"footerSocial" + index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
            aria-label={name}
            variants={linkVariants}
            whileHover={{ y: -2 }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </motion.a>
        ))}
      </div>

      <motion.p className={style.copy} variants={linkVariants}>
        © {new Date().getFullYear()} Nikoloz Topuridze. Made with love.
      </motion.p>
    </motion.footer>
  );
}
