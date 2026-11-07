"use client";

// All UI sound lives in this one file.
// - Sounds are synthesized with Web Audio (no audio files to load).
// - ON by default; turning it off is saved in localStorage. Browsers keep audio silent
//   until the visitor's first click/tap, so nothing ever plays on page load.
// - To remove sound from the site entirely: set SOUND_FEATURE = false.
//   The header toggle disappears and every play() call becomes a no-op.

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export const SOUND_FEATURE = true;
const STORAGE_KEY = "nt-sound";
const MASTER_VOLUME = 0.5;

export type SoundName = "tick" | "paper" | "stamp";

type SoundApi = { enabled: boolean; toggle: () => void; play: (name: SoundName) => void };

const SoundContext = createContext<SoundApi>({ enabled: false, toggle: () => {}, play: () => {} });

export function useSound() {
  return useContext(SoundContext);
}

function noise(ctx: AudioContext, seconds: number) {
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  return src;
}

function envelope(ctx: AudioContext, peak: number, attack: number, release: number, out: AudioNode) {
  const g = ctx.createGain();
  const t = ctx.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + release);
  g.connect(out);
  return g;
}

const synth: Record<SoundName, (ctx: AudioContext, out: AudioNode) => void> = {
  // a soft paper "tick" for small clicks and toggles
  tick(ctx, out) {
    const src = noise(ctx, 0.05);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 3200;
    bp.Q.value = 1.4;
    src.connect(bp).connect(envelope(ctx, 0.05, 0.002, 0.035, out));
    src.start();
  },
  // a short sheet-of-paper slide for opening folders and dialogs
  paper(ctx, out) {
    const src = noise(ctx, 0.3);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 0.8;
    bp.frequency.setValueAtTime(900, ctx.currentTime);
    bp.frequency.exponentialRampToValueAtTime(2600, ctx.currentTime + 0.24);
    src.connect(bp).connect(envelope(ctx, 0.04, 0.05, 0.2, out));
    src.start();
  },
  // a muffled rubber-stamp thump for generating / submitting
  stamp(ctx, out) {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.14);
    osc.connect(envelope(ctx, 0.12, 0.004, 0.16, out));
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
    const src = noise(ctx, 0.06);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    src.connect(lp).connect(envelope(ctx, 0.06, 0.002, 0.05, out));
    src.start();
  },
};

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(SOUND_FEATURE);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  useEffect(() => {
    try {
      setEnabled(SOUND_FEATURE && localStorage.getItem(STORAGE_KEY) !== "off");
    } catch {}
  }, []);

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
      masterRef.current = ctxRef.current.createGain();
      masterRef.current.gain.value = MASTER_VOLUME;
      masterRef.current.connect(ctxRef.current.destination);
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const playRaw = useCallback(
    (name: SoundName) => {
      const ctx = ensureContext();
      if (ctx && masterRef.current) synth[name](ctx, masterRef.current);
    },
    [ensureContext],
  );

  const play = useCallback(
    (name: SoundName) => {
      if (!SOUND_FEATURE || !enabled) return;
      if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches && name === "paper") return;
      playRaw(name);
    },
    [enabled, playRaw],
  );

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {}
    if (next) playRaw("tick"); // confirm audibly; this click is the user gesture that unlocks audio
  }, [enabled, playRaw]);

  return <SoundContext.Provider value={{ enabled, toggle, play }}>{children}</SoundContext.Provider>;
}
