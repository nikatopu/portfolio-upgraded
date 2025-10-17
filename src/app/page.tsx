"use client";

import Header from "./components/organisms/Header";
import styles from "./Page.module.scss";

export default function Page() {
  return (
    <div className={styles.container}>
      <Header />
    </div>
  );
}
