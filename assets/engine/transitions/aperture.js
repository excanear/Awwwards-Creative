// CI-07 · Diafragma de Lâminas. A camera aperture: a polygon of straight blades rotates as it
// closes on the current scene down to black, holds a beat, and opens already on the next.
import { clamp, resolveEase } from "../core/ease.js";
import { boxOf, styleKeeper } from "../core/env.js";

export const meta = { id: "CI-07", name: "Diafragma de Lâminas", needs: [] };

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {number} [o.blades=7]
 * @param {number} [o.rotate=70]   degrees the blades turn over the whole transition
 * @param {string} [o.color="#0b0b0b"]  what is seen when closed (the inside of the camera)
 * @param {{x:number,y:number}} [o.origin]  centre in stage px (IN-12: the click point)
 * @param {*} [o.ease="power3.inOut"]
 */
export function create({ stage, from, to, blades = 7, rotate = 70, color = "#0b0b0b", origin, ease = "power3.inOut" }) {
  const k = styleKeeper();
  const curve = resolveEase(ease);
  const { w, h } = boxOf(stage);
  const cx = origin?.x ?? w / 2;
  const cy = origin?.y ?? h / 2;
  // Circumradius large enough that the polygon's inscribed circle reaches the farthest corner.
  const R = Math.hypot(Math.max(cx, w - cx), Math.max(cy, h - cy)) / Math.cos(Math.PI / blades) + 2;

  const polygon = (r, deg) => {
    const pts = [];
    for (let i = 0; i < blades; i++) {
      const a = ((deg + (360 / blades) * i) * Math.PI) / 180;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)}px ${(cy + r * Math.sin(a)).toFixed(1)}px`);
    }
    return `polygon(${pts.join(", ")})`;
  };

  k.set(stage, { "background-color": color });
  k.set(from, { "z-index": "1" });
  k.set(to, { "z-index": "2" });

  return {
    render(p) {
      const q = curve(clamp(p));
      const deg = rotate * q;
      if (q <= 0) {
        k.set(from, { visibility: "visible", "clip-path": "none" });
        k.set(to, { visibility: "hidden" });
        return;
      }
      if (q >= 1) {
        k.set(from, { visibility: "hidden" });
        k.set(to, { visibility: "visible", "clip-path": "none" });
        return;
      }
      // 0 → .47 closing on `from`, .47 → .53 shut (the "click"), .53 → 1 opening on `to`.
      if (q < 0.5) {
        const s = clamp(q / 0.47);
        k.set(from, { visibility: "visible", "clip-path": polygon(R * (1 - s), deg) });
        k.set(to, { visibility: "hidden" });
      } else {
        const s = clamp((q - 0.53) / 0.47);
        k.set(from, { visibility: "hidden" });
        k.set(to, { visibility: "visible", "clip-path": polygon(R * s, deg) });
      }
    },
    destroy() {
      k.restore();
    },
  };
}
