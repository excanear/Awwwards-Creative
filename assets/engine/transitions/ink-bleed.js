// LQ-01 · Mancha de Tinta. A drop lands at a point and spreads like ink in absorbent paper:
// the next section is revealed inside an irregular, living edge that grows from the drop.
//
// The edge is a clip-path polygon whose radius follows layered periodic noise around the
// circle, drifting as it grows; it works on any HTML (no SVG mask support needed).
import { clamp, resolveEase, seeded } from "../core/ease.js";
import { boxOf, styleKeeper } from "../core/env.js";

export const meta = { id: "LQ-01", name: "Mancha de Tinta", needs: [] };

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {{x:number,y:number}} [o.origin]  drop point in stage px (IN-12: the click)
 * @param {number} [o.points=180]          polygon resolution
 * @param {number} [o.roughness=0.22]      how ragged the edge is (0 = circle)
 * @param {number} [o.seed=7]
 * @param {*} [o.ease="power2.out"]        fast impact, slow absorption
 */
export function create({ stage, from, to, origin, points = 180, roughness = 0.22, seed = 7, ease = "power2.out" }) {
  const k = styleKeeper();
  const curve = resolveEase(ease);
  const { w, h } = boxOf(stage);
  const cx = origin?.x ?? w / 2;
  const cy = origin?.y ?? h / 2;
  const reach = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy));
  const rand = seeded(seed);
  // Octaves of periodic noise: integer frequencies keep the outline closed.
  const octaves = [
    { f: 3, a: 0.5 },
    { f: 7, a: 0.28 },
    { f: 13, a: 0.14 },
    { f: 29, a: 0.08 },
    { f: 53, a: 0.04 },
  ].map((o) => ({ ...o, phase: rand() * Math.PI * 2, drift: (rand() - 0.5) * 4 }));

  k.set(from, { "z-index": "1" });
  k.set(to, { "z-index": "2" });

  const outline = (R, t) => {
    const pts = [];
    for (let i = 0; i < points; i++) {
      const a = (i / points) * Math.PI * 2;
      let n = 0;
      for (const o of octaves) n += o.a * Math.sin(o.f * a + o.phase + o.drift * t);
      // The edge gets more ragged as the stain grows (fibres catch the ink unevenly).
      const r = Math.max(0, R * (1 + roughness * (0.4 + 0.6 * t) * n));
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)}px ${(cy + r * Math.sin(a)).toFixed(1)}px`);
    }
    return `polygon(${pts.join(",")})`;
  };

  return {
    render(p) {
      p = clamp(p);
      if (p <= 0) {
        k.set(to, { visibility: "hidden" });
        return;
      }
      k.set(to, { visibility: "visible" });
      if (p >= 1) {
        k.set(to, { "clip-path": "none" });
        return;
      }
      // Overshoot the radius so the ragged edge has left the corners by the end.
      const R = reach * (1 + roughness * 1.6) * curve(p);
      k.set(to, { "clip-path": outline(R, p) });
    },
    destroy() {
      k.restore();
    },
  };
}
