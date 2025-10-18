"use client";

import React, { createContext, useContext, useState } from "react";
import { IAppContextProps, TSection } from "./types";

interface IProps {
  children: React.ReactNode;
}

export const AppContext = createContext<IAppContextProps | null>(null);

export default function AppContextProvider({ children }: IProps) {
  const [section, setSection] = useState<TSection>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function renderStyled(child: React.ReactNode, styles: any): React.ReactNode {
    if (typeof child === "string")
      return <span className={styles.normal}>{child}</span>;

    if (React.isValidElement(child)) {
      const inner = renderStyled(
        (child as React.ReactElement<any>).props.children,
        styles
      );

      if (child.type === "b")
        return <span className={styles.bold}>{inner}</span>;

      if (child.type === "i")
        return <span className={styles.italic}>{inner}</span>;

      if (child.type === "a")
        return <span className={styles.link}>{inner}</span>;
    }

    return child;
  }

  return (
    <AppContext.Provider
      value={{
        section,
        setSection,
        sidebarOpen,
        setSidebarOpen,
        renderStyled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContextProvider = () => {
  if (!AppContext) {
    throw new Error(
      "useAppContextProvider must be used within an AppContextProvider"
    );
  }

  return useContext(AppContext as React.Context<IAppContextProps>);
};
