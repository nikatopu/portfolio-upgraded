"use client";

import { useEffect, useState } from "react";
import style from "./Header.module.scss";
import TopuPortfolio from "../../atoms/TopuPortfolio";
import config from "@/app/lib/config";
import BurgerMenu from "./BurgerMenu";
import { motion } from "framer-motion";

export default function Header() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : null,
  );

  function setPageSection(link: string) {
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const headerButtons: { label: string; onClick: () => void }[] = [
    { label: "Projects", onClick: () => setPageSection("#projects") },
    { label: "Experience", onClick: () => setPageSection("#experience") },
    { label: "About", onClick: () => setPageSection("#about") },
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
    <motion.header
      className={style.container}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <TopuPortfolio />

      {isMobile === false && (
        <nav className={style.nav}>
          {headerButtons.map((button, index) => (
            <button
              key={button.label + index}
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

      {isMobile === true && <BurgerMenu navButtons={headerButtons} />}
    </motion.header>
  );
}
