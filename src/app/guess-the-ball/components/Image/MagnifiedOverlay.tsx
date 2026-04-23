import React, { useMemo } from "react";
import { Coordinates, LineCoordinates } from "../../lib/GameContext";

interface Props {
  imageRef: HTMLImageElement | null;
  lines: LineCoordinates[];
  attempts: Coordinates[];
  alreadyPlayedCoords: Coordinates[];
  naturalDimensions: { width: number; height: number };
  zoomLevel: number;
  backgroundPosition: Coordinates;
  magnifierSize: number;
  hoveringAttemptInd: number | null;
}

export default function MagnifiedOverlay({
  imageRef,
  lines,
  attempts,
  alreadyPlayedCoords = [],
  naturalDimensions,
  zoomLevel,
  backgroundPosition,
  magnifierSize,
  hoveringAttemptInd,
}: Props) {
  const overlayStyle = useMemo(() => {
    return {
      position: "absolute",
      width: naturalDimensions.width * zoomLevel,
      height: naturalDimensions.height * zoomLevel,
      left: backgroundPosition.x,
      top: backgroundPosition.y,
      pointerEvents: "none",
    } as React.CSSProperties;
  }, [naturalDimensions, zoomLevel, backgroundPosition]);

  // Helper function to extend lines to edges within magnified view
  function extendToEdge(
    s: { x: number; y: number },
    e: { x: number; y: number },
  ) {
    const sx = s.x;
    const sy = s.y;
    const dx = e.x - sx;
    const dy = e.y - sy;

    if (Math.abs(dx) < 1e-9 && Math.abs(dy) < 1e-9) return e;

    const overlayW = naturalDimensions.width * zoomLevel;
    const overlayH = naturalDimensions.height * zoomLevel;
    const candidates: { x: number; y: number; t: number }[] = [];

    if (Math.abs(dx) > 1e-9) {
      const t1 = (0 - sx) / dx;
      const y1 = sy + t1 * dy;
      if (t1 > 0 && y1 >= 0 - 1e-6 && y1 <= overlayH + 1e-6)
        candidates.push({ x: 0, y: y1, t: t1 });

      const t2 = (overlayW - sx) / dx;
      const y2 = sy + t2 * dy;
      if (t2 > 0 && y2 >= 0 - 1e-6 && y2 <= overlayH + 1e-6)
        candidates.push({ x: overlayW, y: y2, t: t2 });
    }

    if (Math.abs(dy) > 1e-9) {
      const t3 = (0 - sy) / dy;
      const x3 = sx + t3 * dx;
      if (t3 > 0 && x3 >= 0 - 1e-6 && x3 <= overlayW + 1e-6)
        candidates.push({ x: x3, y: 0, t: t3 });

      const t4 = (overlayH - sy) / dy;
      const x4 = sx + t4 * dx;
      if (t4 > 0 && x4 >= 0 - 1e-6 && x4 <= overlayW + 1e-6)
        candidates.push({ x: x4, y: overlayH, t: t4 });
    }

    if (candidates.length === 0)
      return {
        x: Math.max(0, Math.min(overlayW, e.x)),
        y: Math.max(0, Math.min(overlayH, e.y)),
      };

    candidates.sort((a, b) => a.t - b.t);
    return candidates[0];
  }

  return (
    <svg style={overlayStyle}>
      {/* Render lines */}
      {lines.length > 0 &&
        lines.map((line, index) => {
          const start = {
            x: line.start.x * naturalDimensions.width * zoomLevel,
            y: line.start.y * naturalDimensions.height * zoomLevel,
          };

          const end = {
            x: line.end.x * naturalDimensions.width * zoomLevel,
            y: line.end.y * naturalDimensions.height * zoomLevel,
          };

          const extEnd = extendToEdge(start, end);

          return (
            <line
              key={`mag-line-${index}`}
              x1={start.x}
              y1={start.y}
              x2={extEnd.x}
              y2={extEnd.y}
              stroke={line.color}
              strokeWidth={3 * zoomLevel}
            />
          );
        })}

      {/* Render attempt points */}
      {attempts.map((coords, ind) => {
        const isHovered = hoveringAttemptInd === ind;
        const x = coords.x * naturalDimensions.width * zoomLevel;
        const y = coords.y * naturalDimensions.height * zoomLevel;
        const radius = isHovered ? 16 * zoomLevel : 12 * zoomLevel;

        return (
          <g key={`mag-attempt-${ind}`}>
            <circle
              cx={x}
              cy={y}
              r={radius}
              fill="var(--color-accent)"
              stroke="white"
              strokeWidth={2 * zoomLevel}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize={8 * zoomLevel}
              fontWeight="bold"
            >
              {ind + 1}
            </text>
          </g>
        );
      })}

      {/* Render already played coordinates */}
      {alreadyPlayedCoords.map((coords, ind) => {
        const x = coords.x * naturalDimensions.width * zoomLevel;
        const y = coords.y * naturalDimensions.height * zoomLevel;
        const radius = 10 * zoomLevel;

        return (
          <g key={`mag-played-${ind}`}>
            <circle
              cx={x}
              cy={y}
              r={radius}
              fill="var(--color-text-secondary)"
              stroke="white"
              strokeWidth={2 * zoomLevel}
              opacity={0.7}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize={6 * zoomLevel}
              fontWeight="bold"
            >
              {ind + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
