"use client";

import { AnimatePresence } from "framer-motion";
import Freelancing from "./components/organisms/Freelancing";
import Header from "./components/organisms/Header";
import Home from "./components/organisms/Home";
import Work from "./components/organisms/Work";
import styles from "./Page.module.scss";

export default function Page() {
  return (
    <AnimatePresence mode="wait" >
      <div className={styles.container}>
        <Home />

        <Work />

        <Freelancing />
      </div>
    </AnimatePresence>
  );
}
