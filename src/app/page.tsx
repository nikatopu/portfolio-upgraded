"use client";

import { AnimatePresence } from "framer-motion";
import Freelancing from "./components/organisms/Freelancing";
import Home from "./components/organisms/Home";
import Work from "./components/organisms/Work";
import styles from "./Page.module.scss";
import { useAppContextProvider } from "./lib/AppContext";
import { useEffect, useRef } from "react";
import Contact from "./components/organisms/Contact";

export default function Page() {
  const { allSections, section, setSection } = useAppContextProvider();
  const isScrolledByUser = useRef(false);

  const handleScroll = () => {
    isScrolledByUser.current = true;
    const windowHeight = window.innerHeight;

    const timeout = setTimeout(() => {
      isScrolledByUser.current = false;
    }, 100);

    Object.entries(allSections).forEach(([key, value]) => {
      const element = document.getElementById(value);

      if (element) {
        const { top, bottom } = element.getBoundingClientRect();
        if (top < windowHeight / 2 && bottom > windowHeight / 2) {
          setSection(key as keyof typeof allSections);
        }
      }
    });

    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allSections]);

  useEffect(() => {
    if (section) {
      if (isScrolledByUser.current) return;

      const element = document.getElementById(allSections[section]);
      if (element) {
        const headerOffset = 100;
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementTop - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [section]);

  return (
    <AnimatePresence mode="wait">
      <div className={styles.container}>
        <div id={allSections.home}>
          <Home />
        </div>

        <div id={allSections.work}>
          <Work />
        </div>

        <div id={allSections.freelancing}>
          <Freelancing />
        </div>

        <div id={allSections.contact}>
          <Contact />
        </div>
      </div>
    </AnimatePresence>
  );
}
