import React from "react";
import styles from "./Paragraph.module.scss";
import classNames from "classnames";
import { useAppContextProvider } from "@/app/lib/AppContext";

type ParagraphProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
};

export default function Paragraph({
  children,
  size = "medium",
}: ParagraphProps) {
  const { renderStyled } = useAppContextProvider();

  return (
    <p className={classNames(styles.container, styles[size])}>
      {React.Children.map(children, (child) => renderStyled(child, styles))}
    </p>
  );
}
