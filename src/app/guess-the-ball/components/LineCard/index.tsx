import style from "./LineCard.module.scss";
import { LineCoordinates } from "../../lib/GameContext";

interface Props {
  line: LineCoordinates;
  deleteLine: () => void;
  nth: number;
  editDisabled: boolean;
}

export default function LineCard({
  line,
  deleteLine,
  nth,
  editDisabled,
}: Props) {
  return (
    <div
      className={style.container}
      style={{ borderLeft: `4px solid ${line.color}` }}
    >
      <div className={style.details}>
        <p className={style.lineNumber}>Reference Line {nth}</p>
        <p className={style.colorName}>Color: {getColorName(line.color)}</p>
      </div>

      {!editDisabled && (
        <button
          className={style.delete}
          onClick={deleteLine}
          aria-label="Delete line"
          title="Delete this reference line"
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
    </div>
  );
}

function getColorName(color: string): string {
  const colorMap: { [key: string]: string } = {
    "rgba(0, 255, 255, 0.9)": "Cyan",
    "rgba(255, 0, 255, 0.9)": "Magenta",
    "rgba(255, 255, 0, 0.9)": "Yellow",
    "rgba(0, 255, 0, 0.9)": "Green",
    "rgba(241, 90, 34, 0.9)": "Orange",
  };
  return colorMap[color] || "Unknown";
}
