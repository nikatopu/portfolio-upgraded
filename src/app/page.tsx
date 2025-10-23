"use client";

import Header from "./components/organisms/Header";
import Home from "./components/organisms/Home";
import Work from "./components/organisms/Work";
import styles from "./Page.module.scss";

export default function Page() {
  return (
    <div className={styles.container}>
      <Home />

      <Work />
    </div>
  );
}
