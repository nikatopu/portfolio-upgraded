"use client";

import { createContext, useContext, useState } from "react";
import { IAppContextProps, TSection } from "./types";

interface IProps {
  children: React.ReactNode;
}

export const AppContext = createContext<IAppContextProps | null>(null);

export default function AppContextProvider({ children }: IProps) {
  const [section, setSection] = useState<TSection>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        section,
        setSection,
        sidebarOpen,
        setSidebarOpen,
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
