import React from "react";
import styles from "./Title.module.scss";
import classNames from "classnames";
import { useAppContextProvider } from "@/app/lib/AppContext";

type TitleProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
};

export default function Title({ children, size = "medium" }: TitleProps) {
  const { renderStyled } = useAppContextProvider();

  return (
    <h1 className={classNames(styles.container, styles[size])}>
      {React.Children.map(children, (child) => renderStyled(child, styles))}
    </h1>
  );
}
