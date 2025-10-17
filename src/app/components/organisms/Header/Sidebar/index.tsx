"use client";

import classNames from "classnames";
import { IHeaderButton } from "..";
import style from "./Sidebar.module.scss";
import { useAppContextProvider } from "@/app/lib/AppContext";
import { useEffect } from "react";

export default function Sidebar({ buttons }: { buttons: IHeaderButton[] }) {
  const { sidebarOpen } = useAppContextProvider();

  useEffect(() => {
    console.log("Sidebar state changed:", sidebarOpen);
  }, [sidebarOpen]);

  return (
    <div className={classNames(style.container, sidebarOpen && style.open)}>
      {buttons.map((button) => (
        <button
          key={button.label}
          className={classNames(style.button, button.isActive && style.active)}
          onClick={button.onClick}
        >
          <span className={style.label}>{button.label}</span>
        </button>
      ))}
    </div>
  );
}
