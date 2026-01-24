"use client";

import { AnimatePresence } from "framer-motion";
import styles from "./Page.module.scss";
import Header from "./components/organisms/Header";

export default function Page() {
  return (
    <AnimatePresence mode="wait">
      <Header />
    </AnimatePresence>
  );
}
