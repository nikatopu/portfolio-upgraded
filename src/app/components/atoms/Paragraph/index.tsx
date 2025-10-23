import React from "react";
import styles from "./Paragraph.module.scss";
import classNames from "classnames";
import { useAppContextProvider } from "@/app/lib/AppContext";

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
    <p
      className={classNames(styles.container, styles[size], styles[color])}
      style={{ textAlign: align }}
    >
      {React.Children.map(children, (child) => renderStyled(child, styles))}
    </p>
  );
}
