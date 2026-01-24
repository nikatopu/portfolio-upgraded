"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { IAppContextProps } from "./types";
import config from "./config";

interface IProps {
  children: React.ReactNode;
}

export const AppContext = createContext<IAppContextProps | null>(null);

export default function AppContextProvider({ children }: IProps) {
  const [experienceInYears, setExperienceInYears] = useState<number>(0);

  useEffect(() => {
    const startDate = config.countExperienceFrom;
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - startDate.getTime();
    const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
    setExperienceInYears(Math.floor(diffInYears));
  }, []);

  return <AppContext.Provider value={{ experienceInYears }}>{children}</AppContext.Provider>;
}

export const useAppContextProvider = () => {
  if (!AppContext) {
    throw new Error(
      "useAppContextProvider must be used within an AppContextProvider",
    );
  }

  return useContext(AppContext as React.Context<IAppContextProps>);
};
