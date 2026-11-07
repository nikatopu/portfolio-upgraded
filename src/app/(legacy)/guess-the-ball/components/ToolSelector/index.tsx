import React from "react";
import style from "./ToolSelector.module.scss";
import { useGameContext } from "../../lib/GameContext";

interface Props {
  isMobile?: boolean;
  disabled?: boolean;
}

export default function ToolSelector({ isMobile = false, disabled = false }: Props) {
  const { activeTool, setActiveTool } = useGameContext();

  return (
    <div className={style.container}>
      <div className={style.toolGroup}>
        <p className={style.label}>Select Tool:</p>
        <button
          className={`${style.toolButton} ${
            activeTool === "point" ? style.active : ""
          }`}
          onClick={() => setActiveTool("point")}
          title="Select Point Tool - Click to place coordinates"
          disabled={disabled}
        >
          <span className={style.icon}>📍</span>
          Point
        </button>
        <button
          className={`${style.toolButton} ${
            activeTool === "line" ? style.active : ""
          }`}
          onClick={() => setActiveTool("line")}
          title="Line Tool - Click to draw reference lines"
          disabled={disabled}
        >
          <span className={style.icon}>📏</span>
          Line
        </button>
        {!isMobile && (
          <button
            className={`${style.toolButton} ${
              activeTool === "pan" ? style.active : ""
            }`}
            onClick={() => setActiveTool("pan")}
            title="Pan Tool - Move around the image"
            disabled={disabled}
          >
            <span className={style.icon}>✋</span>
            Pan
          </button>
        )}
      </div>
      
      <div className={style.instructions}>
        {activeTool === "point" && (
          <span>Click on the image to place coordinate points</span>
        )}
        {activeTool === "line" && (
          <span>Click twice to draw a reference line</span>
        )}
        {activeTool === "pan" && (
          <span>Drag to move around the image (desktop only)</span>
        )}
      </div>
    </div>
  );
}