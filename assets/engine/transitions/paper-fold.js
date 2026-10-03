// SP-08 · Dobradura. The section folds like paper: the lower half swings up over the crease
// (its back printed in the next section's colour), then the folded sheet tips away from its top
// edge, uncovering the next section.
//
// Uses static clones of `from` while it runs; videos/iframes/canvas inside are not live in the
// clones (give them posters). `stage` gets a perspective.
import { clamp, segment } from "../core/ease.js";
import { backgroundOf, boxOf, styleKeeper } from "../core/env.js";

export const meta = { id: "SP-08", name: "Dobradura", needs: [] };

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {string} [o.verso]   colour of the back of the sheet (default: `to`'s background)
 * @param {number} [o.perspective=1800]
 */
export function create({ stage, from, to, verso, perspective = 1800 }) {
  const k = styleKeeper();
  const { w, h } = boxOf(stage);
  const back = verso || backgroundOf(to);
  if (getComputedStyle(stage).position === "static") k.set(stage, { position: "relative" });
  k.set(stage, { perspective: `${perspective}px`, "perspective-origin": "50% 40%" });
  k.set(to, { "z-index": "1" });

  const layer = (z) => {
    const d = document.createElement("div");
    d.setAttribute("aria-hidden", "true");
    d.style.cssText = `position:absolute;left:0;top:0;width:${w}px;height:${h}px;z-index:${z};transform-style:preserve-3d;pointer-events:none;`;
    return d;
  };
  // Clones keep their ids so id-based CSS still styles them; they are appended after the
  // original, so getElementById keeps finding the original. They live only while it runs.
  const copy = (clip) => {
    const c = from.cloneNode(true);
    c.setAttribute("aria-hidden", "true");
    c.style.cssText += `;position:absolute;inset:0;width:${w}px;height:${h}px;margin:0;visibility:visible;clip-path:${clip};backface-visibility:hidden;transform:none;`;
    return c;
  };
  const top = "inset(0 0 50% 0)";
  const bottom = "inset(50% 0 0 0)";

  // The packet (top half + the flap that lands on it) tips away in phase 2.
  const packet = layer(3);
  packet.style.transformOrigin = "50% 0";
  packet.append(copy(top));
  const flap = layer(4);
  flap.style.transformOrigin = "50% 50%"; // the crease
  const flapFront = copy(bottom);
  const flapBack = document.createElement("div");
  flapBack.style.cssText = `position:absolute;inset:0;background:${back};clip-path:${bottom};transform:rotateX(180deg);backface-visibility:hidden;`;
  // A soft shading on the back, darker near the crease, so the fold reads as paper.
  flapBack.style.backgroundImage = "linear-gradient(to bottom, rgba(0,0,0,.18), rgba(0,0,0,0) 70%)";
  flap.append(flapFront, flapBack);
  packet.append(flap);
  const shade = document.createElement("div");
  shade.style.cssText = `position:absolute;left:0;top:50%;width:100%;height:50%;background:linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,0));pointer-events:none;z-index:2;opacity:0;`;
  stage.append(shade, packet);

  return {
    render(p) {
      p = clamp(p);
      const fold = segment(p, 0, 0.55, "power3.inOut");
      const away = segment(p, 0.45, 1, "power2.in");
      const running = p > 0 && p < 1;
      k.set(from, { visibility: running || p >= 1 ? "hidden" : "visible" });
      k.set(to, { visibility: p > 0 ? "visible" : "hidden" });
      packet.style.display = running ? "" : "none";
      shade.style.display = running ? "" : "none";
      flap.style.transform = `rotateX(${(180 * fold).toFixed(2)}deg)`;
      packet.style.transform = `rotateX(${(-100 * away).toFixed(2)}deg)`;
      // The uncovered half lies in the shadow of the flap while it is still close.
      shade.style.opacity = String(0.9 * (1 - fold) * Math.min(1, fold * 6));
    },
    destroy() {
      packet.remove();
      shade.remove();
      k.restore();
    },
  };
}
