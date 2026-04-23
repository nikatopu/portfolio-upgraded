import { useState } from "react";
import style from "./AttemptCard.module.scss";
import { Coordinates } from "../../lib/GameContext";

interface Props {
  imageRef: HTMLImageElement | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  coordinates: Coordinates;
  deleteAttempt: () => void;
  nth: number;
  total: number;
  editDisabled: boolean;
  naturalDimensions: { width: number; height: number } | null;
  isLocked?: boolean;
}

export default function AttemptCard({
  imageRef,
  onHoverStart,
  onHoverEnd,
  coordinates,
  deleteAttempt,
  nth,
  total,
  editDisabled,
  naturalDimensions,
  isLocked = false,
}: Props) {
  const [deleting, setDeleting] = useState(false);

  const pixelX = naturalDimensions
    ? Math.round(coordinates.x * naturalDimensions.width)
    : 0;
  const pixelY = naturalDimensions
    ? Math.round(coordinates.y * naturalDimensions.height)
    : 0;

  function handleDelete() {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      deleteAttempt();
    }, 300);
  }

  return (
    <div
      className={`${style.container} ${deleting ? style.deleting : ""} ${
        isLocked ? style.locked : ""
      }`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className={style.left}>
        <span className={style.ticketLabel}>
          Attempt {nth}/{total}
        </span>
        <div className={style.ticketIcon}>🎯</div>
      </div>

      <div className={style.ripLine} />

      <div className={style.right}>
        <div className={style.coordinates}>
          <p className={style.coordinate}>{`X: ${pixelX}`}</p>
          <p className={style.coordinate}>{`Y: ${pixelY}`}</p>
        </div>

        {!editDisabled && !isLocked && (
          <button
            className={style.delete}
            onClick={handleDelete}
            aria-label="Delete attempt"
            title="Delete this attempt"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {isLocked && (
          <div className={style.lockIcon} aria-label="Locked coordinate">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
