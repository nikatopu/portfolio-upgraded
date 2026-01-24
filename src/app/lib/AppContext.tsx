"use client";

import React, { createContext, useContext } from "react";
import { IAppContextProps } from "./types";

interface IProps {
  children: React.ReactNode;
}

export const AppContext = createContext<IAppContextProps | null>(null);

export default function AppContextProvider({ children }: IProps) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}

export const useAppContextProvider = () => {
  if (!AppContext) {
    throw new Error(
      "useAppContextProvider must be used within an AppContextProvider",
    );
  }

  return useContext(AppContext as React.Context<IAppContextProps>);
};
