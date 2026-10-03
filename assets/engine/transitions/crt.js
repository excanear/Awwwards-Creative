// DG-10 · Desligar o CRT. The screen switches off like a cathode-ray tube: it collapses into a
// bright horizontal line, the line into a dot, the dot goes out; the next scene switches on
// through the same steps in reverse.
import { clamp, segment } from "../core/ease.js";
import { styleKeeper } from "../core/env.js";

export const meta = { id: "DG-10", name: "Desligar o CRT", needs: [] };

/** The tube's state for a local progress a = 0 (on) → 1 (off). */
function tube(a) {
  const squash = segment(a, 0, 0.55, "power3.in");
  const shrink = segment(a, 0.55, 0.85, "power3.in");
  const out = segment(a, 0.85, 1, "none");
  return {
    sy: Math.max(0.004, 1 - squash),
    sx: Math.max(0.003, 1 - shrink),
    glow: 1 + squash * 2.6,
    opacity: 1 - out,
  };
}

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {string} [o.color="#050505"]   the dark glass
 */
export function create({ stage, from, to, color = "#050505" }) {
  const k = styleKeeper();
  k.set(stage, { "background-color": color });
  const apply = (el, a) => {
    const s = tube(a);
    k.set(el, {
      visibility: "visible",
      transform: a > 0 ? `scale(${s.sx.toFixed(4)}, ${s.sy.toFixed(4)})` : "none",
      filter: a > 0 ? `brightness(${s.glow.toFixed(2)})` : "none",
      opacity: String(s.opacity),
      "transform-origin": "50% 50%",
    });
  };
  return {
    render(p) {
      p = clamp(p);
      // .0–.46 switch off · .46–.54 dark glass · .54–1 switch on
      if (p < 0.5) {
        apply(from, segment(p, 0, 0.46, "none"));
        k.set(to, { visibility: "hidden" });
      } else {
        apply(to, 1 - segment(p, 0.54, 1, "none"));
        k.set(from, { visibility: "hidden" });
      }
    },
    destroy() {
      k.restore();
    },
  };
}
