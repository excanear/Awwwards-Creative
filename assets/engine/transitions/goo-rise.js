// LQ-03 · Metaball (Goo). Drops in the next section's colour rise and merge (SVG goo filter)
// into one surface that floods the stage; then the next section's content surfaces from the
// bottom on that same colour (colour handoff, no cut).
import { clamp, lerp, segment, seeded } from "../core/ease.js";
import { backgroundOf, boxOf, styleKeeper } from "../core/env.js";

export const meta = { id: "LQ-03", name: "Metaball (Goo)", needs: ["svg-filter"] };

const SVGNS = "http://www.w3.org/2000/svg";
let uid = 0;

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {number} [o.drops=14]
 * @param {string} [o.color]   default: `to`'s background
 * @param {number} [o.seed=3]
 */
export function create({ stage, from, to, drops = 14, color, seed = 3 }) {
  const k = styleKeeper();
  const { w, h } = boxOf(stage);
  const fill = color || backgroundOf(to);
  const rand = seeded(seed);
  const id = `aw-goo-${++uid}`;
  if (getComputedStyle(stage).position === "static") k.set(stage, { position: "relative" });
  k.set(from, { "z-index": "1" });
  k.set(to, { "z-index": "4" });

  const svg = document.createElementNS(SVGNS, "svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("width", String(w));
  svg.setAttribute("height", String(h));
  svg.style.cssText = "position:absolute;left:0;top:0;z-index:3;pointer-events:none;overflow:visible;";
  const blur = Math.max(8, Math.min(w, h) / 40);
  svg.innerHTML = `<defs><filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${blur}" result="b"/>
      <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11"/>
    </filter></defs>`;
  const g = document.createElementNS(SVGNS, "g");
  g.setAttribute("filter", `url(#${id})`);
  g.setAttribute("fill", fill);
  svg.append(g);
  // The rising pool, and drops ahead of it with their own pace.
  const pool = document.createElementNS(SVGNS, "rect");
  pool.setAttribute("x", String(-blur * 2));
  pool.setAttribute("width", String(w + blur * 4));
  pool.setAttribute("height", String(h * 2));
  g.append(pool);
  const blobs = Array.from({ length: drops }, (_, i) => {
    const c = document.createElementNS(SVGNS, "circle");
    g.append(c);
    return {
      el: c,
      x: ((i + 0.5) / drops) * w + (rand() - 0.5) * (w / drops),
      r: lerp(0.05, 0.11, rand()) * Math.max(w, h),
      start: rand() * 0.25,
      lead: lerp(0.15, 0.45, rand()) * h,
    };
  });
  stage.append(svg);

  return {
    render(p) {
      p = clamp(p);
      const running = p > 0 && p < 1;
      svg.style.display = p > 0 && p < 0.99 ? "" : "none";
      // 0 → .7: the liquid rises and closes over the stage.
      const rise = segment(p, 0, 0.7, "power2.inOut");
      const surface = lerp(h + blur * 3, -blur * 3, rise);
      pool.setAttribute("y", surface.toFixed(1));
      for (const b of blobs) {
        const t = segment(p, b.start, 0.7, "sine.inOut");
        b.el.setAttribute("cx", b.x.toFixed(1));
        b.el.setAttribute("cy", (surface - b.lead * Math.sin(Math.PI * Math.min(1, t * 1.1))).toFixed(1));
        b.el.setAttribute("r", (b.r * Math.sin(Math.PI * Math.min(1, t * 0.9 + 0.1))).toFixed(1));
      }
      // .7 → 1: on the flooded colour, `to` surfaces from the bottom (same background).
      const surfaceTo = segment(p, 0.7, 1, "power3.out");
      k.set(to, {
        visibility: p >= 0.7 ? "visible" : "hidden",
        "clip-path": running ? `inset(${((1 - surfaceTo) * 100).toFixed(2)}% 0 0 0)` : "none",
      });
      k.set(from, { visibility: p >= 0.7 ? "hidden" : "visible" });
    },
    destroy() {
      svg.remove();
      k.restore();
    },
  };
}
