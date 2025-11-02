"use client";

import { useEffect, useState } from "react";
import Paragraph from "../../atoms/Paragraph";
import Socials from "../../atoms/Socials";
import Title from "../../atoms/Title";
import style from "./Footer.module.scss";
import { motion } from "framer-motion";

interface IQA {
  [key: string]: string;
}

export default function Footer() {
  const [questionsPerRow, setQuestionsPerRow] = useState(null as string | null);

  const QA: IQA = {
    "When will you be able to start?":
      "If the opportunity is full-time and good enough, in 25 work days. For the cases of contracts or part-time jobs, I will be able to start right away.",
    "When will you be able to start??":
      "If the opportunity is full-time and good enough, in 25 work days. For the cases of contracts or part-time jobs, I will be able to start right away.",
    "When will you be able to start???":
      "If the opportunity is full-time and good enough, in 25 work days. For the cases of contracts or part-time jobs, I will be able to start right away.",
    "When will you be able to start????":
      "If the opportunity is full-time and good enough, in 25 work days. For the cases of contracts or part-time jobs, I will be able to start right away.",
    "When will you be able to start?????":
      "If the opportunity is full-time and good enough, in 25 work days. For the cases of contracts or part-time jobs, I will be able to start right away.",
    "When will you be able to start??????":
      "If the opportunity is full-time and good enough, in 25 work days. For the cases of contracts or part-time jobs, I will be able to start right away.",
  };

  function getQuestionPerRow() {
    if (typeof window === "undefined") return "2";
    const width = window.innerWidth;

    if (width >= 1200) return "5";
    if (width >= 768) return "4";
    if (width >= 450) return "2";
    return "1";
  }

  useEffect(() => {
    setQuestionsPerRow(getQuestionPerRow());

    function handleResize() {
      setQuestionsPerRow(getQuestionPerRow());
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.footer
      className={style.container}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className={style.contact}>
        <div className={style.contactText}>
          <Title>
            Want me to <b>create your website?</b>
          </Title>

          <Paragraph>
            Contact me at{" "}
            <b>
              <a
                href="mailto:nikatopu@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                nikatopu@gmail.com
              </a>
            </b>{" "}
            or my any of my socials.
          </Paragraph>
        </div>

        <div className={style.contactLinks}>
          <Socials />
        </div>
      </div>

      <div
        className={style.questionaire}
        style={{
          gridTemplateColumns: `repeat(${questionsPerRow}, 1fr)`,
        }}
      >
        {Object.entries(QA).map(([question, answer], index) => (
          <motion.div
            key={question}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={style.qaItem}
          >
            <p className={style.question}>
              <b>Q: {question}</b>
            </p>
            <p className={style.answer}>A: {answer}</p>
          </motion.div>
        ))}
      </div>
    </motion.footer>
  );
}
