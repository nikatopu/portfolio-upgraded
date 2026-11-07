// Deterministic generative "rubber stamp".
// Same params → same drawing on every device, so a note only needs to store
// { seed, density, flow, shape } (tiny, schema-validatable data), never an image or code.

export type StampShape = "circle" | "square" | "hex";
export const STAMP_SHAPES: StampShape[] = ["circle", "square", "hex"];

export type StampParams = {
  seed: string;
  density: number; // 0..1 → number of flow lines
  flow: number; // 0..1 → how turbulent the field is
  shape: StampShape;
};

export const DEFAULT_STAMP: StampParams = {
  seed: "n1k4t0pu",
  density: 0.55,
  flow: 0.35,
  shape: "circle",
};

const TAU = Math.PI * 2;

// --- seeded randomness -----------------------------------------------------

function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function rngFrom(seed: string) {
  return mulberry32(xmur3(seed)());
}

/** Random 8-character seed of lowercase letters and digits, e.g. "k3x9q2mz". */
export function randomSeed(length = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

// --- gradient noise ----------------------------------------------------------

function makeNoise(rand: () => number) {
  const N = 64;
  const gx = new Float32Array(N * N);
  const gy = new Float32Array(N * N);
  for (let i = 0; i < N * N; i++) {
    const a = rand() * TAU;
    gx[i] = Math.cos(a);
    gy[i] = Math.sin(a);
  }
  const grad = (ix: number, iy: number, dx: number, dy: number) => {
    const k = (ix & (N - 1)) * N + (iy & (N - 1));
    return gx[k] * dx + gy[k] * dy;
  };
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  return (x: number, y: number) => {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const fx = x - x0;
    const fy = y - y0;
    const u = fx * fx * (3 - 2 * fx);
    const v = fy * fy * (3 - 2 * fy);
    return lerp(
      lerp(grad(x0, y0, fx, fy), grad(x0 + 1, y0, fx - 1, fy), u),
      lerp(grad(x0, y0 + 1, fx, fy - 1), grad(x0 + 1, y0 + 1, fx - 1, fy - 1), u),
      v,
    );
  };
}

// --- drawing -----------------------------------------------------------------

function shapePath(ctx: CanvasRenderingContext2D, c: number, r: number, shape: StampShape) {
  ctx.beginPath();
  if (shape === "circle") {
    ctx.arc(c, c, r, 0, TAU);
  } else if (shape === "square") {
    const s = r * 0.9;
    ctx.roundRect(c - s, c - s, s * 2, s * 2, r * 0.08);
  } else {
    for (let i = 0; i < 6; i++) {
      const a = TAU * (i / 6) - Math.PI / 2;
      const x = c + Math.cos(a) * r;
      const y = c + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
}

function ringText(ctx: CanvasRenderingContext2D, c: number, r: number, text: string, size: number, font: string) {
  ctx.save();
  ctx.font = `500 ${Math.round(size * 0.052)}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const chars = [...text];
  const step = TAU / chars.length;
  chars.forEach((ch, i) => {
    const a = i * step - Math.PI / 2;
    ctx.save();
    ctx.translate(c + Math.cos(a) * r, c + Math.sin(a) * r);
    ctx.rotate(a + Math.PI / 2);
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });
  ctx.restore();
}

export type DrawOptions = {
  size: number; // CSS pixels
  ink: string;
  ringLabel?: string; // only drawn for circles ≥ 110px
  font?: string;
};

export function drawStamp(canvas: HTMLCanvasElement, params: StampParams, opts: DrawOptions) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { size, ink } = opts;
  const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  const rand = rngFrom(`${params.seed}|${params.shape}`);
  const noise = makeNoise(rand);
  const c = size / 2;
  const R = size * 0.46;
  const hasRing = params.shape === "circle" && !!opts.ringLabel && size >= 110;
  const inner = hasRing ? R * 0.74 : R * 0.86;

  // hand-stamped tilt
  ctx.translate(c, c);
  ctx.rotate((rand() - 0.5) * 0.3);
  ctx.translate(-c, -c);

  ctx.strokeStyle = ink;
  ctx.fillStyle = ink;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // borders
  ctx.lineWidth = Math.max(1.5, size * 0.022);
  shapePath(ctx, c, R, params.shape);
  ctx.stroke();
  ctx.lineWidth = Math.max(0.75, size * 0.007);
  shapePath(ctx, c, inner + size * 0.02, params.shape);
  ctx.stroke();

  if (hasRing) ringText(ctx, c, (R + inner + size * 0.02) / 2, opts.ringLabel!, size, opts.font ?? "monospace");

  // flow field, clipped to the inner shape
  ctx.save();
  shapePath(ctx, c, inner, params.shape);
  ctx.clip();
  const count = Math.round(50 + params.density * 330);
  const scale = 1.4 + params.flow * 5.5;
  const steps = 40;
  const stepLen = size * 0.007;
  const angleOffset = rand() * TAU;
  const twist = 1.2 + rand() * 2.4;
  ctx.lineWidth = Math.max(0.6, size * 0.0038);
  ctx.globalAlpha = 0.6;
  for (let i = 0; i < count; i++) {
    let x = c + (rand() * 2 - 1) * inner;
    let y = c + (rand() * 2 - 1) * inner;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let s = 0; s < steps; s++) {
      const a = angleOffset + noise((x / size) * scale, (y / size) * scale) * TAU * twist;
      x += Math.cos(a) * stepLen;
      y += Math.sin(a) * stepLen;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();

  // worn rubber texture
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "destination-out";
  const specks = Math.round(size * 2.2);
  for (let i = 0; i < specks; i++) {
    ctx.globalAlpha = 0.25 + rand() * 0.6;
    ctx.beginPath();
    ctx.arc(rand() * size, rand() * size, rand() * size * 0.006 + 0.3, 0, TAU);
    ctx.fill();
  }
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
