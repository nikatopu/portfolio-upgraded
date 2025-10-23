import React from "react";
import styles from "./SectionHeader.module.scss";
import classNames from "classnames";

type Props = {
  title: React.ReactNode;
  comment?: React.ReactNode;
  image?: string;
  mirrored?: boolean;
  size?: "normal" | "small";
  content?: React.ReactNode;
};

export default function SectionHeader({
  title,
  mirrored = false,
  image,
  size = "normal",
  comment,
  content,
}: Props) {
  return (
    <div className={classNames(styles.container)}>
      <div
        className={classNames(
          styles.content,
          mirrored && styles.mirrored,
          styles[size],
          image && styles.withImage
        )}
      >
        <div className={classNames(styles.headerContainer, styles.shadow)}>
          <img
            src="/assets/images/top-background.png"
            alt=""
            className={styles.headerBackground}
          />
          <div className={styles.text}>{title}</div>
        </div>

        {comment && (
          <div className={classNames(styles.commentContainer, styles.shadow)}>
            <img
              src="/assets/images/bottom-background.png"
              alt=""
              className={styles.commentBackground}
            />

            <div className={styles.text}>{comment}</div>
          </div>
        )}

        {image && comment && (
          <div className={styles.imageContainer}>
            <img
              src={image}
              alt="Section Header Image"
              className={styles.image}
            />
          </div>
        )}

        {image && comment && content && (
          <div className={styles.extraContent}>
            {content}
          </div>
        )}
      </div>
    </div>
  );
}
