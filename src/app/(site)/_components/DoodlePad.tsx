"use client";

import { useEffect, useRef } from "react";
import { DOODLE_H, DOODLE_W, type Doodle } from "../_lib/notes";
import s from "./Notes.module.scss";

const MAX_STROKES = 60;
const MAX_POINTS = 4000;

type Props = { value: Doodle; onChange: (d: Doodle) => void; labels: { hint: string; undo: string; clear: string } };

function paint(canvas: HTMLCanvasElement, strokes: Doodle) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform((rect.width / DOODLE_W) * dpr, 0, 0, (rect.height / DOODLE_H) * dpr, 0, 0);
  ctx.clearRect(0, 0, DOODLE_W, DOODLE_H);
  ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue("--ink").trim() || "#151515";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const st of strokes) {
    if (st.length < 2) continue;
    ctx.beginPath();
    ctx.moveTo(st[0], st[1]);
    for (let i = 2; i < st.length; i += 2) ctx.lineTo(st[i], st[i + 1]);
    if (st.length === 2) ctx.lineTo(st[0] + 0.1, st[1]);
    ctx.stroke();
  }
}

export default function DoodlePad({ value, onChange, labels }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<number[] | null>(null);
  const strokesRef = useRef(value);
  strokesRef.current = value;

  useEffect(() => {
    if (ref.current) paint(ref.current, value);
  }, [value]);

  function point(e: React.PointerEvent<HTMLCanvasElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    return [Math.round(((e.clientX - r.left) / r.width) * DOODLE_W), Math.round(((e.clientY - r.top) / r.height) * DOODLE_H)];
  }

  const totalPoints = value.reduce((n, st) => n + st.length / 2, 0);

  return (
    <div className={s.doodle}>
      <canvas
        ref={ref}
        className={s.doodleCanvas}
        aria-label={labels.hint}
        onPointerDown={(e) => {
          if (value.length >= MAX_STROKES || totalPoints >= MAX_POINTS) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drawing.current = point(e);
          onChange([...strokesRef.current, drawing.current]);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const [x, y] = point(e);
          const st = drawing.current;
          const dx = x - st[st.length - 2];
          const dy = y - st[st.length - 1];
          if (dx * dx + dy * dy < 36) return; // thin out points
          drawing.current = [...st, x, y];
          onChange([...strokesRef.current.slice(0, -1), drawing.current]);
        }}
        onPointerUp={() => (drawing.current = null)}
        onPointerCancel={() => (drawing.current = null)}
      />
      <div className={s.doodleBar}>
        <span>{labels.hint}</span>
        <button type="button" onClick={() => onChange(value.slice(0, -1))} disabled={!value.length}>
          {labels.undo}
        </button>
        <button type="button" onClick={() => onChange([])} disabled={!value.length}>
          {labels.clear}
        </button>
      </div>
    </div>
  );
}

/** Read-only rendering of a doodle as SVG (used on the wall). */
export function DoodleView({ doodle, className }: { doodle: Doodle; className?: string }) {
  return (
    <svg className={className} viewBox={`0 0 ${DOODLE_W} ${DOODLE_H}`} role="img" aria-label="Visitor drawing">
      {doodle.map((st, i) => (
        <polyline key={i} points={st.join(" ")} fill="none" stroke="currentColor" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </svg>
  );
}
