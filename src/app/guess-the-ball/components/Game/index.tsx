import { useEffect, useMemo, useState } from "react";
import style from "./Game.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { useGameContext } from "../../lib/GameContext";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Coordinates, LineCoordinates } from "../../lib/GameContext";
import Image from "../Image";
import AttemptCard from "../AttemptCard";
import ToolSelector from "../ToolSelector";
import LineCard from "../LineCard";
import {
  fromNaturalToRelativePixels,
  toDisplayPixels,
} from "../../lib/utils/imageUtils";
import { motion } from "framer-motion";

function useIsMobile() {
  const { width } = useWindowSize();
  return width ? width < 768 : false;
}

// Skeleton component for the right column during loading
function RightColumnSkeleton() {
  return (
    <>
      <div className={`${style.skeleton} ${style.skeletonTitle}`} />
      <div className={style.attemptsWrapper}>
        <div className={`${style.skeleton} ${style.skeletonCard}`} />
        <div className={`${style.skeleton} ${style.skeletonCard}`} />
        <div className={`${style.skeleton} ${style.skeletonCard}`} />
      </div>
      <div className={style.buttonsContainer}>
        <div className={`${style.skeleton} ${style.skeletonButton}`} />
        <div className={`${style.skeleton} ${style.skeletonButton}`} />
      </div>
      <div className={style.linesContainer}>
        <div className={`${style.skeleton} ${style.skeletonLineCard}`} />
      </div>
    </>
  );
}

export default function Game() {
  const {
    attempts,
    setAttempts,
    maxAttempts,
    lines,
    setLines,
    naturalDimensions,
    setNaturalDimensions,
  } = useGameContext();
  const isMobile = useIsMobile();
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [hoveringAttemptInd, setHoveringAttemptInd] = useState<number | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);
  const { width, height } = useWindowSize();

  // Portfolio showcase - use a sample soccer image
  const playPicture =
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";

  const playableGames = maxAttempts;
  const editDisabled = false; // For portfolio showcase
  const alreadyPlayedCoords: Coordinates[] = []; // No previous attempts in showcase
  const isLoading = !naturalDimensions;

  const isInteractionDisabled = editDisabled;

  const imageHeight = useMemo(
    () => imageRef?.clientHeight,
    [imageRef, width, height],
  );

  const deleteLine = (id: number) => {
    if (isInteractionDisabled) return;
    setLines((prev) => prev.filter((line) => line.id !== id));
  };

  const handleAttempt = (attempt: Coordinates) => {
    toast.dismiss();

    if (isInteractionDisabled) {
      return toast.error("Game interaction is currently disabled");
    }

    if (attempts.length >= playableGames) {
      return toast.error(`Maximum ${playableGames} attempts allowed`);
    }

    if (
      attempts.some((a) => a.x === attempt.x && a.y === attempt.y) ||
      alreadyPlayedCoords.some((a) => a.x === attempt.x && a.y === attempt.y)
    ) {
      return toast.error("You already chose this point");
    }

    setAttempts((prev) => [...prev, attempt]);
  };

  const deleteAttempt = (index: number) => {
    if (isInteractionDisabled) return;
    setAttempts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    toast.dismiss();
    if (isInteractionDisabled) return;
    if (!naturalDimensions) {
      toast.error("Loading...");
      return;
    }
    setSubmitting(true);

    const attemptsInPixels = attempts.map((attempt) => ({
      x: Math.round(attempt.x * naturalDimensions.width),
      y: Math.round(attempt.y * naturalDimensions.height),
    }));

    // Simulate API call for portfolio showcase
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const message =
        `Portfolio Showcase - Submitted ${attempts.length} attempt(s):\n` +
        attemptsInPixels
          .map(
            (coords, index) =>
              `${index + 1}. Pixel coordinates: (${coords.x}, ${coords.y})`,
          )
          .join("\n") +
        (lines.length > 0 ? `\n\nReference lines drawn: ${lines.length}` : "") +
        "\n\nIn a real application, these would be processed by a server for scoring.";

      alert(message);
      setAttempts([]);
    } catch (err) {
      console.error("handleSubmit error:", err);
      toast.error("Error submitting attempts");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const img = imageRef;
    if (!img) return;

    setNaturalDimensions(null);

    const handleLoad = () => {
      setNaturalDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    if (img.complete && img.naturalWidth > 0) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
    }

    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, [imageRef]);

  return (
    <motion.div
      className={style.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "var(--color-background-secondary)",
            color: "var(--color-text)",
            border: "1px solid var(--color-accent)",
          },
        }}
      />

      <div className={style.content}>
        <div className={style.innerContent}>
          <div className={style.left}>
            <ToolSelector
              isMobile={isMobile}
              disabled={isInteractionDisabled}
            />

            <div className={style.imageWrapper}>
              {isLoading && (
                <div className={style.imagePlaceholderContainer}>
                  <div
                    className={`${style.skeleton} ${style.imagePlaceholder}`}
                  />
                </div>
              )}

              <Image
                className={isLoading ? style.hiddenImage : ""}
                src={playPicture}
                attempts={attempts}
                alreadyPlayedCoords={alreadyPlayedCoords}
                hoveringAttemptInd={hoveringAttemptInd}
                editDisabled={isInteractionDisabled}
                imageRef={imageRef}
                setImageRef={setImageRef}
                onAttempt={handleAttempt}
                naturalDimensions={naturalDimensions}
                lines={lines}
                setLines={setLines}
                isMobile={isMobile}
                winnerCoordinates={[]}
                jurySelectedWinnerCoordinate={null}
              />
            </div>
          </div>

          <div
            className={style.right}
            style={{
              height: !isLoading && imageHeight ? imageHeight + 100 : "500px",
            }}
          >
            {isLoading ? (
              <RightColumnSkeleton />
            ) : (
              <>
                <p className={style.attemptsTitle}>
                  {attempts?.length || 0}/{playableGames}
                </p>

                {attempts.length > 0 || alreadyPlayedCoords.length > 0 ? (
                  <div className={style.attemptsWrapper}>
                    {alreadyPlayedCoords.map((coordinates, index) => (
                      <AttemptCard
                        key={`played-cords-${coordinates.x}-${coordinates.y}`}
                        imageRef={imageRef}
                        onHoverStart={() => {}}
                        onHoverEnd={() => {}}
                        coordinates={coordinates}
                        deleteAttempt={() => {}}
                        nth={index + 1}
                        total={alreadyPlayedCoords.length}
                        isLocked={true}
                        editDisabled={true}
                        naturalDimensions={naturalDimensions}
                      />
                    ))}

                    {attempts.map((coordinates, index) => (
                      <AttemptCard
                        key={`cords-${coordinates.x}-${coordinates.y}`}
                        imageRef={imageRef}
                        onHoverStart={() => setHoveringAttemptInd(index)}
                        onHoverEnd={() => setHoveringAttemptInd(null)}
                        coordinates={coordinates}
                        deleteAttempt={() => deleteAttempt(index)}
                        nth={index + 1}
                        total={playableGames}
                        editDisabled={isInteractionDisabled}
                        naturalDimensions={naturalDimensions}
                      />
                    ))}
                  </div>
                ) : (
                  <p className={style.placeholderText}>
                    Select a tool and click on the image to start!
                  </p>
                )}

                <div className={style.buttonsContainer}>
                  <button
                    className={style.clearButton}
                    onClick={() => {
                      setAttempts([]);
                      setLines([]);
                    }}
                    disabled={attempts.length === 0 && lines.length === 0}
                  >
                    Clear All
                  </button>
                  {!isInteractionDisabled && (
                    <button
                      className={style.submitButton}
                      onClick={handleSubmit}
                      disabled={!(attempts.length > 0) || submitting}
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>

                {lines.length > 0 && (
                  <div className={style.linesContainer}>
                    {lines.map((line, index) => (
                      <LineCard
                        key={`line-${index}`}
                        line={line}
                        deleteLine={() => deleteLine(line.id)}
                        nth={index + 1}
                        editDisabled={isInteractionDisabled}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* How to play instructions */}
      <div className={style.howToPlay}>
        <h3>Portfolio Showcase - Spot The Ball</h3>
        <p>
          This is a complex interactive game showcasing advanced image
          interaction, magnification, and precise coordinate tracking.
        </p>
        <ul>
          <li>
            <strong>Point Tool:</strong> Click to place coordinate guesses with
            pixel precision
          </li>
          <li>
            <strong>Line Tool:</strong> Draw reference lines for trajectory
            analysis
          </li>
          <li>
            <strong>Magnifier:</strong> Hover for 2x zoom with crosshair
            precision
          </li>
          <li>Maximum {maxAttempts} attempts allowed</li>
        </ul>
      </div>
    </motion.div>
  );
}
