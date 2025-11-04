import React from "react";
import styles from "./Title.module.scss";
import classNames from "classnames";
import { useAppContextProvider } from "@/app/lib/AppContext";
import { motion } from "framer-motion";

type TitleProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  align?: "left" | "center" | "right";
};

export default function Title({
  children,
  size = "medium",
  align = "left",
}: TitleProps) {
  const { renderStyled } = useAppContextProvider();

  return (
    <motion.h1
      className={classNames(styles.container, styles[size])}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{ textAlign: align }}
    >
      {React.Children.map(children, (child) => renderStyled(child, styles))}
    </motion.h1>
  );
}
