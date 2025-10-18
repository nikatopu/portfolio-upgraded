"use client";

import Home from "./components/organisms/Home";
import styles from "./Page.module.scss";

export default function Page() {
  return (
    <div className={styles.container}>
      <Home />
    </div>
  );
}
