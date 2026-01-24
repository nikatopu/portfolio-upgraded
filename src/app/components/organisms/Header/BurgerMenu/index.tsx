"use client";

import { useState } from "react";
import style from "./BurgerMenu.module.scss";

export default function BurgerMenu({
  navButtons,
}: {
  navButtons: { label: string; onClick: () => void }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={style.container}>
      <img
        src="/assets/images/burger-menu.svg"
        alt="Burger Menu"
        onClick={() => setIsOpen(!isOpen)}
        className={style.burgerIcon}
      />

      <nav className={style.nav} style={{ right: isOpen ? "0" : "-100%" }}>
        {navButtons.map((button, index) => (
          <button
            key={index}
            className={style.navButton}
            onClick={() => {
              button.onClick();
              setIsOpen(false);
            }}
          >
            {button.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
