import React from "react";
import styles from "./Paragraph.module.scss";
import classNames from "classnames";
import { useAppContextProvider } from "@/app/lib/AppContext";
import { motion } from "framer-motion";

type ParagraphProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  align?: "left" | "center" | "right";
  color?: "default" | "lighter";
};

export default function Paragraph({
  children,
  size = "medium",
  align = "left",
  color = "default",
}: ParagraphProps) {
  const { renderStyled } = useAppContextProvider();

  return (
    <motion.p
      className={classNames(styles.container, styles[size], styles[color])}
      style={{ textAlign: align }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {React.Children.map(children, (child) => renderStyled(child, styles))}
    </motion.p>
  );
}
