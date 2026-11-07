"use client";

import { useEffect, useRef } from "react";
import { drawStamp, type StampParams } from "../_lib/stamp";

type Props = {
  params: StampParams;
  size: number;
  ringLabel?: string;
  label?: string;
  className?: string;
  canvasRef?: React.RefObject<HTMLCanvasElement | null>;
};

/** Renders a deterministic stamp in the current theme's accent ink; redraws on theme change. */
export default function Stamp({ params, size, ringLabel, label, className, canvasRef }: Props) {
  const localRef = useRef<HTMLCanvasElement>(null);
  const ref = canvasRef ?? localRef;
  const { seed, density, flow, shape } = params;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const draw = () => {
      const styles = getComputedStyle(canvas);
      drawStamp(canvas, { seed, density, flow, shape }, {
        size,
        ink: styles.getPropertyValue("--accent").trim() || "#1f4fd1",
        ringLabel,
        font: styles.getPropertyValue("--font-mono").trim() || "monospace",
      });
    };
    draw();
    void document.fonts?.ready.then(draw);
    const mo = new MutationObserver(draw);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, [ref, seed, density, flow, shape, size, ringLabel]);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `Generative stamp, seed ${seed}`}
    />
  );
}
