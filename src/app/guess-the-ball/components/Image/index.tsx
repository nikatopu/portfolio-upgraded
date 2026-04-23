import React, {
  MouseEvent,
  TouchEvent,
  useMemo,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import style from "./Image.module.scss";
import {
  Coordinates,
  LineCoordinates,
  useGameContext,
} from "../../lib/GameContext";
import { toDisplayPixels, toNaturalPixels } from "../../lib/utils/imageUtils";
import { useImageInteraction } from "../../hooks/useImageInteraction";
import toast from "react-hot-toast";
import MagnifiedOverlay from "./MagnifiedOverlay";

interface Props {
  className?: string;
  src: string;
  attempts: Coordinates[];
  alreadyPlayedCoords: Coordinates[];
  hoveringAttemptInd: number | null;
  editDisabled: boolean;
  imageRef: HTMLImageElement | null;
  setImageRef: Dispatch<SetStateAction<HTMLImageElement | null>>;
  onAttempt: (attempt: Coordinates) => void;
  naturalDimensions: { width: number; height: number } | null;
  lines: LineCoordinates[];
  setLines: Dispatch<SetStateAction<LineCoordinates[]>>;
  isMobile: boolean;
  winnerCoordinates?: any[] | null;
  jurySelectedWinnerCoordinate: any | null;
}

const ZOOM_LEVEL = 2;
const LINE_COLORS = [
  "rgba(0, 255, 255, 0.9)", // Cyan
  "rgba(255, 0, 255, 0.9)", // Magenta
  "rgba(255, 255, 0, 0.9)", // Yellow
  "rgba(0, 255, 0, 0.9)", // Lime Green
  "rgba(241, 90, 34, 0.9)", // Orange
];

const MOBILE_DRAG_SENSITIVITY = 0.05;

export default function Image({
  className,
  src,
  attempts,
  alreadyPlayedCoords,
  hoveringAttemptInd,
  editDisabled,
  imageRef,
  setImageRef,
  onAttempt,
  naturalDimensions,
  lines,
  setLines,
  isMobile,
  winnerCoordinates,
  jurySelectedWinnerCoordinate,
}: Props) {
  const { mouseRel, isInside, magnifierCenter, magnifierSize, containerProps } =
    useImageInteraction(imageRef);
  const { activeTool } = useGameContext();
  const magnifierRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [preciseNaturalCoords, setPreciseNaturalCoords] =
    useState<Coordinates | null>(null);
  const [lineStartPoint, setLineStartPoint] = useState<Coordinates | null>(
    null,
  );
  const [mouseViewportPos, setMouseViewportPos] = useState({ x: 0, y: 0 });

  const [mobileCursorPos, setMobileCursorPos] = useState<Coordinates>({
    x: 0.5,
    y: 0.5,
  });
  const [lastTouchPos, setLastTouchPos] = useState<Coordinates | null>(null);
  const [touchRel, setTouchRel] = useState<Coordinates>({ x: 0, y: 0 });
  const [isDraggingLine, setIsDraggingLine] = useState(false);
  const [isTouchDragging, setIsTouchDragging] = useState(false);

  const effectiveRelPos = isMobile ? touchRel : mouseRel;

  useEffect(() => {
    if (isMobile) {
      setMobileCursorPos({ x: 0.5, y: 0.5 });
      setLineStartPoint(null);
      setIsDraggingLine(false);
      setIsTouchDragging(false);
    }
  }, [isMobile]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !isMobile) return;

    element.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
      },
      { passive: false },
    );

    return () => {
      element.removeEventListener("touchmove", (e) => {
        e.preventDefault();
      });
    };
  }, [containerRef, activeTool, isMobile]);

  const backgroundPosition = useMemo(() => {
    if (!isMobile && magnifierCenter && naturalDimensions) {
      return {
        x:
          -(magnifierCenter.x * naturalDimensions.width * ZOOM_LEVEL) +
          magnifierSize / 2,
        y:
          -(magnifierCenter.y * naturalDimensions.height * ZOOM_LEVEL) +
          magnifierSize / 2,
      };
    }

    return { x: 0, y: 0 };
  }, [isMobile, magnifierCenter, naturalDimensions, magnifierSize]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    containerProps.onMouseMove?.(event);
    setMouseViewportPos({ x: event.clientX, y: event.clientY });
    if (
      !imageRef ||
      !magnifierCenter ||
      !naturalDimensions ||
      !magnifierRef.current
    ) {
      setPreciseNaturalCoords(null);
      return;
    }
    const magRect = magnifierRef.current.getBoundingClientRect();
    const mouseXInMag = event.clientX - magRect.left;
    const mouseYInMag = event.clientY - magRect.top;
    const centerNatural = toNaturalPixels(imageRef, magnifierCenter);
    const viewSizeInNaturalPixels = magnifierSize / ZOOM_LEVEL;
    const viewTopLeftNaturalX = centerNatural.x - viewSizeInNaturalPixels / 2;
    const viewTopLeftNaturalY = centerNatural.y - viewSizeInNaturalPixels / 2;
    const mouseOffsetNaturalX = mouseXInMag / ZOOM_LEVEL;
    const mouseOffsetNaturalY = mouseYInMag / ZOOM_LEVEL;
    const preciseNaturalX = Math.round(
      viewTopLeftNaturalX + mouseOffsetNaturalX,
    );
    const preciseNaturalY = Math.round(
      viewTopLeftNaturalY + mouseOffsetNaturalY,
    );
    const finalX = Math.max(
      0,
      Math.min(naturalDimensions.width - 1, preciseNaturalX),
    );
    const finalY = Math.max(
      0,
      Math.min(naturalDimensions.height - 1, preciseNaturalY),
    );
    setPreciseNaturalCoords({ x: finalX, y: finalY });
  }

  function handleMouseLeave() {
    containerProps.onMouseLeave?.();
    setPreciseNaturalCoords(null);
  }

  function handleClick() {
    if (editDisabled || isMobile) return;

    if (activeTool === "point") handleAttemptClick();
    else if (activeTool === "line") handleLineClick();
  }

  function handleAttemptClick() {
    if (editDisabled || !preciseNaturalCoords || !naturalDimensions) return;
    const finalRelX = preciseNaturalCoords.x / naturalDimensions.width;
    const finalRelY = preciseNaturalCoords.y / naturalDimensions.height;
    onAttempt({
      x: Math.max(0, Math.min(1, finalRelX)),
      y: Math.max(0, Math.min(1, finalRelY)),
    });
  }

  function handleLineClick() {
    if (editDisabled) return;
    if (!lineStartPoint) {
      setLineStartPoint(mouseRel);
    } else {
      setLines((prev) => {
        const nextColor = LINE_COLORS[prev.length % LINE_COLORS.length];
        return [
          ...prev,
          {
            id: prev.length + 1,
            start: lineStartPoint!,
            end: mouseRel,
            color: nextColor,
          },
        ];
      });
      setLineStartPoint(null);
    }
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (editDisabled || !imageRef) return;
    const touch = e.touches[0];
    const rect = imageRef.getBoundingClientRect();
    setLastTouchPos({ x: touch.clientX, y: touch.clientY });
    setIsTouchDragging(false);

    const currentRel = {
      x: (touch.clientX - rect.left) / rect.width,
      y: (touch.clientY - rect.top) / rect.height,
    };
    setTouchRel(currentRel);

    if (activeTool === "line") {
      setLineStartPoint(currentRel);
      setIsDraggingLine(true);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (editDisabled || !lastTouchPos || !imageRef) return;
    const touch = e.touches[0];
    const rect = imageRef.getBoundingClientRect();
    const dx = touch.clientX - lastTouchPos.x;
    const dy = touch.clientY - lastTouchPos.y;

    // Mark as dragging if movement is significant
    const dragDistance = Math.sqrt(dx * dx + dy * dy);
    if (dragDistance > 10) {
      setIsTouchDragging(true);
    }

    if (activeTool === "pan" || activeTool === "point") {
      const relDx = (dx * MOBILE_DRAG_SENSITIVITY) / rect.width;
      const relDy = (dy * MOBILE_DRAG_SENSITIVITY) / rect.height;
      setMobileCursorPos((prev) => ({
        x: Math.max(0, Math.min(1, prev.x + relDx)),
        y: Math.max(0, Math.min(1, prev.y + relDy)),
      }));
    } else if (activeTool === "line") {
      const currentRel = {
        x: (touch.clientX - rect.left) / rect.width,
        y: (touch.clientY - rect.top) / rect.height,
      };
      setTouchRel(currentRel);
    }

    setLastTouchPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    if (editDisabled) return;

    // Handle point placement on tap (only if not dragging)
    if (activeTool === "point" && !isTouchDragging && !isDraggingLine) {
      onAttempt(mobileCursorPos);
      toast.success("Point placed!");
    }

    if (activeTool === "line" && isDraggingLine && lineStartPoint) {
      setLines((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          start: lineStartPoint!,
          end: touchRel,
          color: LINE_COLORS[prev.length % LINE_COLORS.length],
        },
      ]);
      setLineStartPoint(null);
      toast.success("Line created!");
    }

    setIsDraggingLine(false);
    setIsTouchDragging(false);
    setLastTouchPos(null);
  };

  const handleMobilePointPlacement = () => {
    if (editDisabled) return;
    onAttempt(mobileCursorPos);
    toast.success("Point placed!");
  };

  const mobileCursorNaturalCoords = useMemo(() => {
    if (!isMobile || !naturalDimensions) return null;
    return {
      x: Math.round(mobileCursorPos.x * naturalDimensions.width),
      y: Math.round(mobileCursorPos.y * naturalDimensions.height),
    };
  }, [isMobile, naturalDimensions, mobileCursorPos]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLineStartPoint(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setLineStartPoint(null);
    setIsTouchDragging(false);
    setIsDraggingLine(false);
  }, [activeTool]);

  // Helper: extend a ray from `start` through `end` until it hits the image bounds
  function extendToEdge(
    start: { left: number; top: number },
    end: { left: number; top: number },
  ) {
    if (!imageRef) return end;
    const imgWidth = imageRef.clientWidth;
    const imgHeight = imageRef.clientHeight;

    const sx = start.left;
    const sy = start.top;
    const dx = end.left - sx;
    const dy = end.top - sy;

    // If no direction, return original end
    if (Math.abs(dx) < 1e-6 && Math.abs(dy) < 1e-6) {
      return end;
    }

    const candidates: { x: number; y: number; t: number }[] = [];

    // vertical borders x = 0 and x = imgWidth
    if (Math.abs(dx) > 1e-9) {
      const t1 = (0 - sx) / dx;
      const y1 = sy + t1 * dy;
      if (t1 > 0 && y1 >= 0 - 1e-6 && y1 <= imgHeight + 1e-6)
        candidates.push({ x: 0, y: y1, t: t1 });

      const t2 = (imgWidth - sx) / dx;
      const y2 = sy + t2 * dy;
      if (t2 > 0 && y2 >= 0 - 1e-6 && y2 <= imgHeight + 1e-6)
        candidates.push({ x: imgWidth, y: y2, t: t2 });
    }

    // horizontal borders y = 0 and y = imgHeight
    if (Math.abs(dy) > 1e-9) {
      const t3 = (0 - sy) / dy;
      const x3 = sx + t3 * dx;
      if (t3 > 0 && x3 >= 0 - 1e-6 && x3 <= imgWidth + 1e-6)
        candidates.push({ x: x3, y: 0, t: t3 });

      const t4 = (imgHeight - sy) / dy;
      const x4 = sx + t4 * dx;
      if (t4 > 0 && x4 >= 0 - 1e-6 && x4 <= imgWidth + 1e-6)
        candidates.push({ x: x4, y: imgHeight, t: t4 });
    }

    if (candidates.length === 0) {
      // Nothing found (shouldn't happen), fallback to clamped end
      return {
        left: Math.max(0, Math.min(imgWidth, end.left)),
        top: Math.max(0, Math.min(imgHeight, end.top)),
      };
    }

    // pick smallest positive t
    candidates.sort((a, b) => a.t - b.t);
    const chosen = candidates[0];
    return { left: chosen.x, top: chosen.y };
  }

  const mobileCursorDisplayPos = useMemo(() => {
    if (!isMobile || !imageRef) return null;
    return toDisplayPixels(imageRef, mobileCursorPos);
  }, [isMobile, imageRef, mobileCursorPos]);

  const magnifierStyle = useMemo(() => {
    if (
      isMobile ||
      !imageRef ||
      !naturalDimensions ||
      (editDisabled && (winnerCoordinates?.length ?? 0) === 0)
    ) {
      return { display: "none" };
    }

    if (!isInside || !magnifierCenter || activeTool === "line") {
      return { display: "none" };
    }

    const displayPos = toDisplayPixels(imageRef, magnifierCenter);

    return {
      left: displayPos.left - magnifierSize / 2,
      top: displayPos.top - magnifierSize / 2,
      width: magnifierSize,
      height: magnifierSize,
      backgroundImage: `url("${src}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${naturalDimensions.width * ZOOM_LEVEL}px ${
        naturalDimensions.height * ZOOM_LEVEL
      }px`,
      backgroundPosition: `${Math.round(backgroundPosition.x)}px ${Math.round(
        backgroundPosition.y,
      )}px`,
      position: "absolute",
      overflow: "hidden",
    } as React.CSSProperties;
  }, [
    isMobile,
    isInside,
    imageRef,
    magnifierCenter,
    naturalDimensions,
    magnifierSize,
    src,
    editDisabled,
    activeTool,
    backgroundPosition,
    winnerCoordinates,
  ]);

  const previewLine =
    lineStartPoint && imageRef && toDisplayPixels(imageRef, lineStartPoint);
  const currentPos = imageRef && toDisplayPixels(imageRef, effectiveRelPos);
  const cursorIcon = activeTool === "line" ? "crosshair" : "none";
  const nextLineColor = LINE_COLORS[lines.length % LINE_COLORS.length];

  const interactionHandlers = isMobile
    ? {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
      }
    : {
        ...containerProps,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onClick: handleClick,
      };

  return (
    <>
      <div
        ref={containerRef}
        className={`${style.imageContainer} ${className}`}
        style={{
          cursor:
            !editDisabled || (winnerCoordinates?.length ?? 0) > 0
              ? cursorIcon
              : "auto",
        }}
        {...interactionHandlers}
      >
        {editDisabled && (winnerCoordinates?.length ?? 0) === 0 && (
          <div className={style.answersSubmitted}>
            <h1>Game interaction disabled for showcase</h1>
          </div>
        )}

        {imageRef && !editDisabled && (
          <svg className={style.lineCanvas}>
            {lines.map((line, index) => {
              const start = toDisplayPixels(imageRef, line.start);
              // Treat stored line as a ray: extend it to the image edge
              const rawEnd = toDisplayPixels(imageRef, line.end);
              const extEnd = extendToEdge(start, rawEnd);

              return (
                <line
                  key={index}
                  x1={start.left}
                  y1={start.top}
                  x2={extEnd.left}
                  y2={extEnd.top}
                  stroke={line.color}
                  strokeWidth="2"
                />
              );
            })}

            {previewLine &&
              currentPos &&
              !editDisabled &&
              (() => {
                const extended = extendToEdge(previewLine, currentPos);
                return (
                  <line
                    x1={previewLine.left}
                    y1={previewLine.top}
                    x2={extended.left}
                    y2={extended.top}
                    stroke={nextLineColor}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                );
              })()}
          </svg>
        )}

        <img
          ref={setImageRef}
          src={src}
          className={style.image}
          alt="Game area"
          draggable={false}
          style={{
            opacity: editDisabled ? 0.6 : 1,
            pointerEvents: "none",
          }}
        />

        {imageRef &&
          !editDisabled &&
          attempts.map((coords, ind) => {
            const isHovered =
              hoveringAttemptInd !== null && hoveringAttemptInd === ind;
            const display = toDisplayPixels(imageRef, coords);

            return (
              <div
                key={`${coords.x}-${coords.y}-${ind}`}
                className={`${style.attempt} ${
                  isHovered ? style.attemptHovered : ""
                }`}
                style={{
                  left: display.left,
                  top: display.top,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "var(--color-accent)",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {ind + 1}
              </div>
            );
          })}

        {!editDisabled &&
          imageRef &&
          alreadyPlayedCoords.length > 0 &&
          alreadyPlayedCoords.map((coords, ind) => {
            const display = toDisplayPixels(imageRef, coords);

            return (
              <div
                key={`played-${coords.x}-${coords.y}-${ind}`}
                className={style.playedAttempt}
                style={{
                  left: display.left,
                  top: display.top,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "var(--color-text-secondary)",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                }}
              >
                {ind + 1}
              </div>
            );
          })}

        <div
          ref={magnifierRef}
          className={`${style.magnifier} ${
            editDisabled && (winnerCoordinates?.length ?? 0) === 0
              ? style.magnifierDisabled
              : ""
          }`}
          style={magnifierStyle}
        >
          {/* Magnified overlay with lines and points */}
          {naturalDimensions && !isMobile && (
            <MagnifiedOverlay
              imageRef={imageRef}
              lines={lines}
              attempts={attempts}
              alreadyPlayedCoords={alreadyPlayedCoords}
              naturalDimensions={naturalDimensions}
              zoomLevel={ZOOM_LEVEL}
              backgroundPosition={backgroundPosition}
              magnifierSize={magnifierSize}
              hoveringAttemptInd={hoveringAttemptInd}
            />
          )}

          {/* Crosshair in magnifier */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "20px",
              height: "20px",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "0",
                width: "1px",
                height: "100%",
                backgroundColor: "red",
                transform: "translateX(-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "50%",
                width: "100%",
                height: "1px",
                backgroundColor: "red",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </div>

        {isMobile &&
          mobileCursorDisplayPos &&
          activeTool !== "line" &&
          !editDisabled && (
            <div
              className={style.cursor}
              style={{
                left: mobileCursorDisplayPos.left,
                top: mobileCursorDisplayPos.top,
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
                backgroundColor: "var(--color-accent)",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
              }}
            >
              +
            </div>
          )}

        {!isMobile &&
          (!editDisabled || (winnerCoordinates?.length ?? 0) > 0) &&
          isInside && (
            <div
              className={style.cursor}
              style={{
                left: currentPos?.left,
                top: currentPos?.top,
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
                backgroundColor: "var(--color-accent)",
                color: "white",
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8px",
              }}
            >
              +
            </div>
          )}
      </div>

      {/* Mobile action button */}
      {isMobile && activeTool === "point" && !editDisabled && (
        <div className={style.mobileActionContainer}>
          <button
            onClick={handleMobilePointPlacement}
            className={style.choosePointButton}
          >
            📍 Place Point Here
          </button>
        </div>
      )}

      {/* Mobile coordinate display */}
      {isMobile &&
        mobileCursorNaturalCoords &&
        mobileCursorDisplayPos &&
        !editDisabled && (
          <div
            className={style.coords}
            style={{
              position: "absolute",
              left: mobileCursorDisplayPos.left,
              top: mobileCursorDisplayPos.top - 40,
              transform: "translateX(-50%)",
              backgroundColor: "var(--color-background-secondary)",
              color: "var(--color-text)",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              border: "1px solid var(--color-border)",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            X: {mobileCursorNaturalCoords.x}, Y: {mobileCursorNaturalCoords.y}
          </div>
        )}

      {!isMobile &&
        isInside &&
        preciseNaturalCoords &&
        (!editDisabled || (winnerCoordinates?.length ?? 0) > 0) && (
          <div
            className={style.coords}
            style={{
              position: "fixed",
              left: mouseViewportPos.x,
              top: mouseViewportPos.y - 30,
              backgroundColor: "var(--color-background-secondary)",
              color: "var(--color-text)",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              border: "1px solid var(--color-border)",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            X: {preciseNaturalCoords.x}, Y: {preciseNaturalCoords.y}
          </div>
        )}
    </>
  );
}
