"use client";

import { useAppContextProvider } from "@/app/lib/AppContext";
import style from "./Header.module.scss";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { TSection } from "@/app/lib/types";
import Sidebar from "./Sidebar";

export interface IHeaderButton {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export default function Header() {
  const { section, setSection, sidebarOpen, setSidebarOpen } =
    useAppContextProvider();
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function toSection(section: TSection) {
    setSection(section);
    setSidebarOpen(false);
  }

  const headerButtons: IHeaderButton[] = [
    {
      label: "Home",
      onClick: () => toSection("home"),
      isActive: section === "home",
    },
    {
      label: "Work",
      onClick: () => toSection("work"),
      isActive: section === "work",
    },
    {
      label: "Freelancing",
      onClick: () => toSection("freelancing"),
      isActive: section === "freelancing",
    },
    {
      label: "Other",
      onClick: () => toSection("other"),
      isActive: section === "other",
    },
  ];

  if (mobile === true)
    return (
      <div
        className={classNames(
          style.mobileHeader,
          sidebarOpen && style.expanded
        )}
      >
        <Sidebar buttons={headerButtons} />

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={classNames(style.toggleButton)}
        >
          {sidebarOpen ? (
            <svg
              width="53"
              height="54"
              viewBox="0 0 53 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1.41421"
                y1="1.41422"
                x2="51.4142"
                y2="51.4142"
                stroke="white"
                strokeWidth={4}
              />
              <line
                x1="51.4142"
                y1="2.24264"
                x2="1.41421"
                y2="52.2426"
                stroke="white"
                strokeWidth={4}
              />
            </svg>
          ) : (
            <svg
              width="50"
              height="24"
              viewBox="0 0 50 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="2" x2="50" y2="2" stroke="white" strokeWidth={4} />
              <line y1="12" x2="50" y2="12" stroke="white" strokeWidth={4} />
              <line y1="22" x2="50" y2="22" stroke="white" strokeWidth={4} />
            </svg>
          )}
        </button>
      </div>
    );
  if (mobile === false)
    return (
      <header className={style.container}>
        {headerButtons.map((button) => (
          <button
            key={button.label}
            className={classNames(
              style.button,
              button.isActive && style.active
            )}
            onClick={button.onClick}
          >
            <span className={style.label}>{button.label}</span>
          </button>
        ))}
      </header>
    );

  return <header className={style.container}></header>;
}
