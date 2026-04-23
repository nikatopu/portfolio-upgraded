import { useState, useEffect, useCallback, useMemo } from "react";

export interface Coordinates {
  x: number;
  y: number;
}

export interface NaturalDimensions {
  width: number;
  height: number;
}

interface UseImageInteractionReturn {
  mouseRel: Coordinates;
  isInside: boolean;
  magnifierCenter: Coordinates;
  magnifierSize: number;
  containerProps: {
    onMouseMove: (event: React.MouseEvent) => void;
    onMouseLeave: () => void;
    onMouseEnter: () => void;
  };
}

const MAGNIFIER_SIZE = 150;
const MAGNIFIER_ZOOM = 2;

export function useImageInteraction(
  imageRef: HTMLImageElement | null,
): UseImageInteractionReturn {
  const [mouseRel, setMouseRel] = useState<Coordinates>({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [magnifierCenter, setMagnifierCenter] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!imageRef) return;

      const rect = imageRef.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;

      // Clamp coordinates to image bounds
      const clampedX = Math.max(0, Math.min(1, relativeX));
      const clampedY = Math.max(0, Math.min(1, relativeY));

      setMouseRel({ x: clampedX, y: clampedY });
      setMagnifierCenter({ x: clampedX, y: clampedY });
    },
    [imageRef],
  );

  const handleMouseLeave = useCallback(() => {
    setIsInside(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsInside(true);
  }, []);

  const containerProps = useMemo(
    () => ({
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    }),
    [handleMouseMove, handleMouseLeave, handleMouseEnter],
  );

  return {
    mouseRel,
    isInside,
    magnifierCenter,
    magnifierSize: MAGNIFIER_SIZE,
    containerProps,
  };
}
