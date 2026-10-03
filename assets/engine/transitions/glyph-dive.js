// TY-01 · Mergulho no Glifo. Every other word goes; one letter stays, and the camera dives
// into its stroke until the stroke is the whole screen. The letter is drawn in the colour of
// the next section's background, so the stroke *becomes* the next section with no cut.
//
// Requirements: `glyph` is a single letter in an inline-block element, coloured like `to`'s
// background. Fonts must be loaded (await document.fonts.ready) before create().
// Generalised from escanearcplx.com (BelowTheSurface, "O Mergulho no C").
import { clamp, resolveEase, segment } from "../core/ease.js";
import { boxOf, styleKeeper } from "../core/env.js";

export const meta = { id: "TY-01", name: "Mergulho no Glifo", needs: ["fonts-loaded"] };

/**
 * Where to dive so the stroke fills the screen: the centre of the stroke on the glyph's left
 * side at mid cap height (the thickest, straightest part of most letters), found by drawing the
 * glyph in the element's own font on a canvas. In the element's own coordinates.
 */
export function strokeCentre(el) {
  const cs = getComputedStyle(el);
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  const text = el.textContent ?? "";
  const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  ctx.font = font;
  const m = ctx.measureText(text);
  const pad = 4;
  const ascent = m.fontBoundingBoxAscent ?? m.actualBoundingBoxAscent;
  const descent = m.fontBoundingBoxDescent ?? m.actualBoundingBoxDescent;
  const width = Math.ceil(m.width) + pad * 2;
  const height = Math.ceil(ascent + descent) + pad * 2;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.font = font; // resizing the canvas resets its state
  ctx.fillText(text, pad, pad + ascent);
  const row = Math.round(pad + ascent - m.actualBoundingBoxAscent / 2);
  const data = ctx.getImageData(0, row, width, 1).data;
  let start = -1;
  let end = -1;
  for (let x = 0; x < width; x++) {
    const ink = data[x * 4 + 3] > 127;
    if (ink && start < 0) start = x;
    if (!ink && start >= 0) {
      end = x;
      break;
    }
  }
  if (start < 0 || end < 0) return null;
  const fontSize = parseFloat(cs.fontSize);
  const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.2;
  const halfLeading = (lineHeight - (ascent + descent)) / 2;
  return {
    x: (start + end) / 2 - pad,
    y: halfLeading + ascent - m.actualBoundingBoxAscent / 2,
    width: end - start,
  };
}

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {HTMLElement} o.glyph         the letter that stays
 * @param {HTMLElement[]} [o.others=[]] everything that leaves first
 * @param {number} [o.maxScale=420]
 */
export function create({ stage, from, to, glyph, others = [], maxScale = 420 }) {
  const k = styleKeeper();
  const stageBox = boxOf(stage);
  const g = glyph.getBoundingClientRect();
  const centre = strokeCentre(glyph) ?? { x: g.width / 2, y: g.height / 2, width: g.width / 6 };
  // Whole pixels: at 100×+ half a pixel of origin drifts by dozens of pixels.
  const ox = Math.round(centre.x);
  const oy = Math.round(centre.y);
  const gx = g.left - stageBox.left + ox;
  const gy = g.top - stageBox.top + oy;
  const dx = Math.round(stageBox.w / 2 - gx);
  const dy = Math.round(stageBox.h / 2 - gy);
  const target = Math.min(maxScale, (Math.max(stageBox.w, stageBox.h) * 2.2) / Math.max(1, centre.width));

  k.set(glyph, { display: "inline-block", "transform-origin": `${ox}px ${oy}px` });
  k.set(to, { "z-index": "2" });
  k.set(from, { "z-index": "1" });

  return {
    render(p) {
      p = clamp(p);
      const leave = segment(p, 0, 0.25, "power2.in");
      for (const el of others) k.set(el, { opacity: String(1 - leave) });
      const travel = segment(p, 0.18, 0.5, "power2.inOut");
      // Exponential scale: equal scroll, equal perceived speed of approach.
      const zoom = segment(p, 0.22, 1, "none");
      const s = Math.pow(target, resolveEase("power1.in")(zoom));
      k.set(glyph, {
        transform: `translate(${(dx * travel).toFixed(2)}px, ${(dy * travel).toFixed(2)}px) scale(${s.toFixed(4)})`,
        "will-change": p > 0 && p < 1 ? "transform" : "auto",
      });
      const done = p >= 0.999;
      k.set(from, { visibility: done ? "hidden" : "visible" });
      k.set(to, { visibility: done ? "visible" : "hidden" });
    },
    destroy() {
      k.restore();
    },
  };
}
