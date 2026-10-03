// Easing toolkit with no dependencies. Every transition reads its own curve through these,
// so the driver (scroll, time, drag) can stay linear.

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const invLerp = (a, b, v) => clamp((v - a) / (b - a));

/** CSS-compatible cubic-bezier(x1, y1, x2, y2) as a function of progress. */
export function cubicBezier(x1, y1, x2, y2) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t) => (3 * ax * t + 2 * bx) * t + cx;
  const solve = (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x;
      if (Math.abs(err) < 1e-6) return t;
      const d = slopeX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    while (hi - lo > 1e-6) {
      if (sampleX(t) < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return t;
  };
  return (p) => (p <= 0 ? 0 : p >= 1 ? 1 : sampleY(solve(p)));
}

const powIn = (n) => (p) => Math.pow(p, n);
const powOut = (n) => (p) => 1 - Math.pow(1 - p, n);
const powInOut = (n) => (p) => (p < 0.5 ? Math.pow(2 * p, n) / 2 : 1 - Math.pow(2 - 2 * p, n) / 2);

/** GSAP-style names, so beat sheets can be written once and used with or without GSAP. */
export const EASES = {
  none: (p) => p,
  linear: (p) => p,
  "power1.in": powIn(2),
  "power1.out": powOut(2),
  "power1.inOut": powInOut(2),
  "power2.in": powIn(3),
  "power2.out": powOut(3),
  "power2.inOut": powInOut(3),
  "power3.in": powIn(4),
  "power3.out": powOut(4),
  "power3.inOut": powInOut(4),
  "power4.in": powIn(5),
  "power4.out": powOut(5),
  "power4.inOut": powInOut(5),
  "sine.in": (p) => 1 - Math.cos((p * Math.PI) / 2),
  "sine.out": (p) => Math.sin((p * Math.PI) / 2),
  "sine.inOut": (p) => -(Math.cos(Math.PI * p) - 1) / 2,
  "expo.in": (p) => (p === 0 ? 0 : Math.pow(2, 10 * p - 10)),
  "expo.out": (p) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p)),
  "expo.inOut": (p) =>
    p === 0 ? 0 : p === 1 ? 1 : p < 0.5 ? Math.pow(2, 20 * p - 10) / 2 : (2 - Math.pow(2, -20 * p + 10)) / 2,
  "back.out": (p, s = 1.70158) => 1 + (s + 1) * Math.pow(p - 1, 3) + s * Math.pow(p - 1, 2),
  "back.in": (p, s = 1.70158) => (s + 1) * p * p * p - s * p * p,
};

/**
 * Accepts a function, a [x1, y1, x2, y2] array (cubic-bezier), a GSAP-like name
 * ("power2.inOut"), or "back.out(2)" with a parameter.
 */
export function resolveEase(e) {
  if (!e) return EASES["power2.inOut"];
  if (typeof e === "function") return e;
  if (Array.isArray(e)) return cubicBezier(...e);
  const m = String(e).match(/^([a-z0-9.]+?)(?:\(([\d.]+)\))?$/i);
  if (m && EASES[m[1]]) {
    const f = EASES[m[1]];
    if (m[2] !== undefined) {
      const param = parseFloat(m[2]);
      return (p) => f(p, param);
    }
    return f;
  }
  const bez = String(e).match(/cubic-bezier\(([^)]+)\)/);
  if (bez) return cubicBezier(...bez[1].split(",").map(Number));
  return EASES["power2.inOut"];
}

/**
 * The local progress of a layer that acts between `start` and `end` of the global progress,
 * passed through its own curve. The core of every overlapped choreography:
 *   const bg = segment(p, 0, 0.6, "power2.in"); const fg = segment(p, 0.3, 1, "expo.out");
 */
export function segment(p, start, end, ease) {
  return resolveEase(ease)(invLerp(start, end, p));
}

/** Discrete steps with an eased fraction inside each step (ratchet, split-flap, drum). */
export function quantize(p, steps, ease = "back.out(2)") {
  const s = clamp(p) * steps;
  const k = Math.min(Math.floor(s), steps - 1);
  const f = s - k;
  return (k + resolveEase(ease)(clamp(f / 0.35))) / steps;
}

/** Bell curve 0 → 1 → 0, for things that peak in the middle (blur, displacement, glitch). */
export const bell = (p) => Math.sin(Math.PI * clamp(p));

/**
 * Damped spring solved analytically. Returns { at(t) → value 0..1+, duration } where t is in
 * seconds and duration is when it settles within 0.1%. Use it to bake springs into render(p).
 */
export function spring({ stiffness = 170, damping = 14, mass = 1 } = {}) {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  let at;
  if (zeta < 1) {
    const wd = w0 * Math.sqrt(1 - zeta * zeta);
    at = (t) => 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
  } else {
    at = (t) => 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  }
  let duration = 0;
  for (let t = 0; t < 10; t += 1 / 120) {
    if (Math.abs(1 - at(t)) > 0.001) duration = t;
  }
  return { at, duration: duration + 1 / 60 };
}

/** A spring as an ease over its own settle time (overshoot preserved). */
export function springEase(opts) {
  const s = spring(opts);
  return (p) => (p >= 1 ? 1 : s.at(p * s.duration));
}

/** Seeded PRNG (xorshift), so generated choreographies are identical on every visit. */
export function seeded(seed = 1) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}
