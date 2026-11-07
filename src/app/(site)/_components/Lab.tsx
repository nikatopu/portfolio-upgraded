"use client";

import { useRef, useState } from "react";
import type { UI } from "@/lib/content";
import { DEFAULT_STAMP, STAMP_SHAPES, randomSeed, type StampParams, type StampShape } from "../_lib/stamp";
import DiceIcon from "./DiceIcon";
import SectionHead from "./SectionHead";
import Stamp from "./Stamp";
import sec from "./Section.module.scss";
import s from "./Lab.module.scss";

type Props = { ui: UI["lab"]; ringLabel: string };

export default function Lab({ ui, ringLabel }: Props) {
  const [params, setParams] = useState<StampParams>(DEFAULT_STAMP);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rolls, setRolls] = useState(0); // drives the dice turning on each roll

  const shapeLabel: Record<StampShape, string> = { circle: ui.shapeCircle, square: ui.shapeSquare, hex: ui.shapeHex };

  function update(patch: Partial<StampParams>) {
    setParams((p) => ({ ...p, ...patch }));
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `stamp-${params.seed}.png`;
    a.click();
  }

  return (
    <section className={sec.section} id="lab">
      <SectionHead title={ui.title} intro={ui.intro} />

      <div className={s.maker} data-reveal>
        <div className={s.preview}>
          <Stamp params={params} size={300} ringLabel={ringLabel} canvasRef={canvasRef} className={s.canvas} />
          <code className={s.seedCode}>{JSON.stringify(params)}</code>
        </div>

        <div className={s.controls}>
          <div className={s.field}>
            <label htmlFor="stamp-seed">
              <span>{ui.seed}</span>
            </label>
            <div className={s.seedRow}>
              <input id="stamp-seed" value={params.seed} maxLength={40} onChange={(e) => update({ seed: e.target.value || " " })} spellCheck={false} />
              <button
                type="button"
                className={s.dice}
                style={{ "--roll": `${rolls * 180}deg` } as React.CSSProperties}
                onClick={() => {
                  setRolls((n) => n + 1);
                  update({ seed: randomSeed() });
                }}
                aria-label={ui.randomize}
                title={ui.randomize}
              >
                <DiceIcon />
              </button>
            </div>
          </div>

          <label className={s.field}>
            <span>
              {ui.density} <output>{Math.round(params.density * 100)}</output>
            </span>
            <input type="range" min={0} max={1} step={0.01} value={params.density} onChange={(e) => update({ density: Number(e.target.value) })} />
          </label>

          <label className={s.field}>
            <span>
              {ui.flow} <output>{Math.round(params.flow * 100)}</output>
            </span>
            <input type="range" min={0} max={1} step={0.01} value={params.flow} onChange={(e) => update({ flow: Number(e.target.value) })} />
          </label>

          <fieldset className={s.field}>
            <legend>{ui.shape}</legend>
            <div className={s.chips}>
              {STAMP_SHAPES.map((shape) => (
                <button key={shape} type="button" aria-pressed={params.shape === shape} onClick={() => { update({ shape }); }}>
                  {shapeLabel[shape]}
                </button>
              ))}
            </div>
          </fieldset>

          <div className={s.actions}>
            <button type="button" className={s.primary} onClick={download}>
              {ui.download}
            </button>
          </div>
        </div>
      </div>

      <div className={s.more} data-reveal>
        <p className={s.moreTitle}>{ui.moreTitle}</p>
        <a href="/math-animations" target="_blank" rel="noopener noreferrer">
          <strong>{ui.more[0].title}</strong> <span>{ui.more[0].text}</span> <i aria-hidden>↗</i>
        </a>
        <a href="/guess-the-ball" target="_blank" rel="noopener noreferrer">
          <strong>{ui.more[1].title}</strong> <span>{ui.more[1].text}</span> <i aria-hidden>↗</i>
        </a>
      </div>
    </section>
  );
}
