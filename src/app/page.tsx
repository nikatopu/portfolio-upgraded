"use client";

import { AnimatePresence } from "framer-motion";
import styles from "./Page.module.scss";
import Header from "./components/organisms/Header";
import Hero from "./components/organisms/Hero";
import SelectedProjects from "./components/organisms/SelectedProjects";

export default function Page() {
  return (
    <AnimatePresence mode="wait">
      <Header key={"Header"} />

      <Hero key={"Hero"} />

      <SelectedProjects key={"SelectedProjects"} />
    </AnimatePresence>
  );
}
