"use client";

import Link from "next/link";
import styles from "./SimpleHeader.module.scss";

export default function SimpleHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.backButton}>
        ← Back to Portfolio
      </Link>
    </header>
  );
}
