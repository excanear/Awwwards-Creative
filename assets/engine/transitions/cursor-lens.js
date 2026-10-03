// MK-02 · Lente. The pointer is a lens that shows the next layer underneath; the transition
// grows the lens from wherever it is until it covers the stage. The lens glides after the
// pointer (lerp), like glass with a little mass.
import { clamp, lerp, resolveEase } from "../core/ease.js";
import { boxOf, env, styleKeeper } from "../core/env.js";

export const meta = { id: "MK-02", name: "Lente", needs: ["fine-pointer"] };

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {number} [o.radius=90]  lens radius while hovering, px
 * @param {{x:number,y:number}} [o.origin]  start point in stage px (touch: the lens sits here)
 * @param {*} [o.ease="power3.inOut"]
 */
export function create({ stage, from, to, radius = 90, origin, ease = "power3.inOut" }) {
  const k = styleKeeper();
  const curve = resolveEase(ease);
  let { w, h } = boxOf(stage);
  let cx = origin?.x ?? w / 2;
  let cy = origin?.y ?? h / 2;
  let tx = cx;
  let ty = cy;
  // On touch there is no hover: the lens rests at the origin so it can still be discovered.
  let hover = !env.finePointer;
  let last = 0;
  let id = 0;

  k.set(from, { "z-index": "1" });
  k.set(to, { "z-index": "2", visibility: "visible" });

  const farthest = (x, y) => Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
  const apply = () => {
    const q = curve(last);
    if (q >= 1) {
      k.set(to, { "clip-path": "none" });
      return;
    }
    const r0 = hover ? radius : 0;
    const r = r0 + (farthest(cx, cy) - r0) * q;
    k.set(to, { "clip-path": `circle(${r.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)` });
  };
  const glide = () => {
    cx = lerp(cx, tx, 0.22);
    cy = lerp(cy, ty, 0.22);
    apply();
    id = Math.abs(cx - tx) + Math.abs(cy - ty) > 0.3 ? requestAnimationFrame(glide) : 0;
  };
  const move = (e) => {
    const b = stage.getBoundingClientRect();
    w = b.width;
    h = b.height;
    tx = e.clientX - b.left;
    ty = e.clientY - b.top;
    if (!hover) {
      hover = true;
      cx = tx;
      cy = ty;
    }
    if (last < 1 && !id) id = requestAnimationFrame(glide);
  };
  const leave = () => {
    if (!env.finePointer) return;
    hover = false;
    apply();
  };
  stage.addEventListener("pointermove", move);
  stage.addEventListener("pointerleave", leave);
  apply();

  return {
    render(p) {
      last = clamp(p);
      apply();
    },
    /** Current lens centre: hand it to the next transition as its origin (IN-12). */
    get origin() {
      return { x: cx, y: cy };
    },
    destroy() {
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      if (id) cancelAnimationFrame(id);
      k.restore();
    },
  };
}
