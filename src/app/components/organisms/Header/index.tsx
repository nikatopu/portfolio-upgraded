"use client";

import { useEffect, useState } from "react";
import style from "./Header.module.scss";
import TopuPortfolio from "../../atoms/TopuPortfolio";
import config from "@/app/lib/config";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );

  function setPageSection(link: string) {
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const headerButtons: { label: string; onClick: () => void }[] = [
    { label: "Projects", onClick: () => setPageSection("#home") },
    { label: "Experience", onClick: () => setPageSection("#work") },
    { label: "About", onClick: () => setPageSection("#freelancing") },
    {
      label: "Contact Me",
      onClick: () => {
        window.open(`mailto:${config.email}`, "_blank");
      },
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={style.container}>
      <TopuPortfolio />

      {!isMobile && (
        <nav className={style.nav}>
          {headerButtons.map((button, index) => (
            <button
              key={index}
              className={
                style.navButton + " " + (index === 3 ? style.contactMe : "")
              }
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </nav>
      )}

      {isMobile && <BurgerMenu navButtons={headerButtons} />}
    </header>
  );
}
