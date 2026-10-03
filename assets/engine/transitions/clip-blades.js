// MK-01 · Persianas. The next layer appears through parallel blades that open from their
// centres, like venetian blinds letting the light in. Pure CSS mask, no extra nodes.
//
// Layers: `from` and `to` cover the same `stage`. `to` is put on top and masked.
import { clamp, resolveEase } from "../core/ease.js";
import { boxOf, styleKeeper } from "../core/env.js";

export const meta = { id: "MK-01", name: "Persianas", needs: [] };

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {number} [o.blades=9]   how many blades across the stage
 * @param {number} [o.angle=90]   gradient angle: 90 = vertical blades, 0 = horizontal, 60 = slanted
 * @param {*} [o.ease="power2.inOut"]
 */
export function create({ stage, from, to, blades = 9, angle = 90, ease = "power2.inOut" }) {
  const k = styleKeeper();
  const curve = resolveEase(ease);
  const { w, h } = boxOf(stage);
  const rad = (angle * Math.PI) / 180;
  // Length of the stage measured along the gradient line, so `blades` fit exactly.
  const span = Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad));
  const bw = span / blades;

  k.set(from, { "z-index": "1" });
  k.set(to, { "z-index": "2" });

  const mask = (value) => k.set(to, { "mask-image": value, "-webkit-mask-image": value });

  return {
    render(p) {
      const q = curve(clamp(p));
      if (q <= 0) {
        k.set(to, { visibility: "hidden" });
        return;
      }
      k.set(to, { visibility: "visible" });
      if (q >= 1) {
        mask("none");
        return;
      }
      const open = bw * q;
      const a = (bw - open) / 2;
      mask(
        `repeating-linear-gradient(${angle}deg, transparent 0 ${a}px, #000 ${a}px ${a + open}px, transparent ${a + open}px ${bw}px)`,
      );
    },
    destroy() {
      k.restore();
    },
  };
}
