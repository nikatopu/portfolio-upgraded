import { Coordinates } from "../../hooks/useImageInteraction";

export interface DisplayCoordinates {
  left: number;
  top: number;
}

/** Convert relative (0..1) -> displayed CSS pixels (based on rendered size) */
export function toDisplayPixels(
  imageRef: HTMLImageElement | null,
  relativePos: Coordinates,
): DisplayCoordinates {
  if (!imageRef) return { left: 0, top: 0 };

  const rect = imageRef.getBoundingClientRect();
  return {
    left: Math.round(relativePos.x * rect.width),
    top: Math.round(relativePos.y * rect.height),
  };
}

/** Convert displayed CSS pixels (based on rendered size) -> relative (0..1) */
export function fromDisplayToRelativePixels(
  imageRef: HTMLImageElement | null,
  displayPos: { left: number; top: number },
): Coordinates {
  if (!imageRef) return { x: 0, y: 0 };

  const rect = imageRef.getBoundingClientRect();
  return {
    x: displayPos.left / rect.width,
    y: displayPos.top / rect.height,
  };
}

/** Convert relative (0..1) -> natural/source image pixels (exact pixel in file) */
export function toNaturalPixels(
  imageRef: HTMLImageElement | null,
  relativePos: Coordinates,
) {
  if (!imageRef) return { x: 0, y: 0 };

  return {
    x: Math.round(relativePos.x * imageRef.naturalWidth),
    y: Math.round(relativePos.y * imageRef.naturalHeight),
  };
}

/** Convert natural/source image pixels (exact pixel in file) -> relative (0..1) */
export function fromNaturalToRelativePixels(
  imageRef: HTMLImageElement | null,
  naturalPos: Coordinates,
): Coordinates {
  if (!imageRef) return { x: 0, y: 0 };

  return {
    x: naturalPos.x / imageRef.naturalWidth,
    y: naturalPos.y / imageRef.naturalHeight,
  };
}
