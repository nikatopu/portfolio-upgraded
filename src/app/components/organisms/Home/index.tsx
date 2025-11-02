"use client";

import Socials from "../../atoms/Socials";
import Title from "../../atoms/Title";
import style from "./Home.module.scss";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className={style.container}>
      <div className={style.textsContainer}>
        <Title size="large">
          Welcome to my{" "}
          <b>
            <i>Portfolio</i>
          </b>
        </Title>

        <Title>
          Nikoloz, <b>Front-end Developer</b>
        </Title>

        <Title size="small">
          Check out the{" "}
          <b>
            <a href="#">Figma</a>
          </b>{" "}
          or{" "}
          <b>
            <a href="#">GitHub Repository</a>
          </b>{" "}
          of this <i>portfolio</i>
        </Title>
      </div>

      <motion.div
        className={style.imageContainer}
        initial={{ opacity: 0, y: 20, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/assets/images/me.png"
          alt="Picture of the author"
          loading="lazy"
        />
      </motion.div>

      <Socials />
    </section>
  );
}
