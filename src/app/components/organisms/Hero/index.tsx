import config from "@/app/lib/config";
import style from "./Hero.module.scss";
import { motion } from "framer-motion";

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
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      <div className={style.content}>
        <p>AVAILABLE FOR NEW OPPORTUNITIES</p>

        <h2>Nikoloz Topuridze</h2>

        <h1>
          Full-Stack <br /> Engineer
        </h1>

        <div className={style.smallDescriptionContainer}>
          <p>
            Crafting high-performance web experiences with <b>Next.js</b> &{" "}
            <b>TypeScript</b>.
          </p>

          <p>
            Focused on building scalable and user-centric digital products,
            quickly and efficiently.
          </p>
        </div>

        <div className={style.buttonsContainer}>
          <button className={style.primaryButton} onClick={viewSelectedWork}>
            View Selected Work ↓
          </button>

          <button className={style.secondaryButton} onClick={downloadResume}>
            <span>Download Resume</span>{" "}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 10L2.5 5.83333L3.66667 4.625L5.83333 6.79167V0H7.5V6.79167L9.66667 4.625L10.8333 5.83333L6.66667 10ZM1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8437C0.163194 12.5174 0 12.125 0 11.6667V9.16667H1.66667V11.6667H11.6667V9.16667H13.3333V11.6667C13.3333 12.125 13.1701 12.5174 12.8437 12.8437C12.5174 13.1701 12.125 13.3333 11.6667 13.3333H1.66667Z"
                fill="#E3E3E3"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={style.techStackContainer}>
        {config.techStack.map((tech, index) => (
          <p key={"tech" + index} className={style.techStackItem}>
            {tech}
          </p>
        ))}
      </div>
    </section>
  );
}
