// DG-08 · Dithering. An ordered (Bayer 8×8) dither decides, pixel by pixel, when each cell
// changes. Two modes:
//  - colour (any DOM): the next section's colour dithers in over `from`, then dithers out in a
//    second pattern, uncovering `to` (same colour, so only its content appears through the holes);
//  - image: `fromImage` → `toImage` directly, cell by cell.
import { clamp, segment } from "../core/ease.js";
import { backgroundOf, boxOf, styleKeeper } from "../core/env.js";

export const meta = { id: "DG-08", name: "Dithering", needs: ["canvas"] };

const BAYER8 = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3,
  35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
];

function rgba(color) {
  const c = document.createElement("canvas").getContext("2d");
  c.fillStyle = color;
  c.fillRect(0, 0, 1, 1);
  return c.getImageData(0, 0, 1, 1).data;
}

function pixelsOf(source, cw, ch) {
  const c = document.createElement("canvas");
  c.width = cw;
  c.height = ch;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  const sw = source.naturalWidth || source.videoWidth || source.width;
  const sh = source.naturalHeight || source.videoHeight || source.height;
  const s = Math.max(cw / sw, ch / sh); // cover
  ctx.drawImage(source, (cw - sw * s) / 2, (ch - sh * s) / 2, sw * s, sh * s);
  return ctx.getImageData(0, 0, cw, ch).data;
}

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {number} [o.cell=6]           size of a dither pixel, CSS px
 * @param {string} [o.color]            colour mode: default `to`'s background
 * @param {CanvasImageSource} [o.fromImage]  image mode (both images required, same-origin)
 * @param {CanvasImageSource} [o.toImage]
 * @param {{x:number,y:number}} [o.origin]   bias the pattern to start near a point (stage px)
 * @param {number} [o.bias=0.35]        0 = pure Bayer, 1 = pure distance from origin
 */
export function create({ stage, from, to, cell = 6, color, fromImage, toImage, origin, bias = 0.35 }) {
  const k = styleKeeper();
  const { w, h } = boxOf(stage);
  const cw = Math.ceil(w / cell);
  const ch = Math.ceil(h / cell);
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = `position:absolute;left:0;top:0;width:${cw * cell}px;height:${ch * cell}px;image-rendering:pixelated;z-index:5;pointer-events:none;display:none;`;
  if (getComputedStyle(stage).position === "static") k.set(stage, { position: "relative" });
  stage.append(canvas);
  const ctx = canvas.getContext("2d");
  const img = ctx.createImageData(cw, ch);
  const out = img.data;

  const ox = (origin?.x ?? w / 2) / cell;
  const oy = (origin?.y ?? h / 2) / cell;
  const far = Math.hypot(Math.max(ox, cw - ox), Math.max(oy, ch - oy));
  const thr = new Float32Array(cw * ch);
  const thr2 = new Float32Array(cw * ch);
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const b = (BAYER8[(y % 8) * 8 + (x % 8)] + 0.5) / 64;
      const d = Math.hypot(x - ox, y - oy) / far;
      thr[y * cw + x] = b * (1 - bias) + d * bias;
      // The second pass uses the mirrored matrix: a different pattern on the way out.
      const b2 = (BAYER8[(7 - (y % 8)) * 8 + (7 - (x % 8))] + 0.5) / 64;
      thr2[y * cw + x] = b2 * (1 - bias) + d * bias;
    }
  }

  const imageMode = fromImage && toImage;
  const A = imageMode ? pixelsOf(fromImage, cw, ch) : null;
  const B = imageMode ? pixelsOf(toImage, cw, ch) : null;
  const ink = rgba(color || backgroundOf(to));

  k.set(from, { "z-index": "1" });
  k.set(to, { "z-index": "2" });

  return {
    render(p) {
      p = clamp(p);
      const running = p > 0 && p < 1;
      canvas.style.display = running ? "" : "none";
      if (imageMode) {
        k.set(from, { visibility: p <= 0 ? "visible" : "hidden" });
        k.set(to, { visibility: p >= 1 ? "visible" : "hidden" });
        if (!running) return;
        const q = segment(p, 0, 1, "none");
        for (let i = 0, j = 0; i < thr.length; i++, j += 4) {
          const src = thr[i] < q ? B : A;
          out[j] = src[j];
          out[j + 1] = src[j + 1];
          out[j + 2] = src[j + 2];
          out[j + 3] = 255;
        }
      } else {
        const first = p < 0.5;
        k.set(from, { visibility: first ? "visible" : "hidden" });
        k.set(to, { visibility: first ? "hidden" : "visible" });
        if (!running) return;
        const a = segment(p, 0, 0.5, "none");
        const b = segment(p, 0.5, 1, "none");
        for (let i = 0, j = 0; i < thr.length; i++, j += 4) {
          const on = first ? thr[i] < a : thr2[i] >= b;
          out[j] = ink[0];
          out[j + 1] = ink[1];
          out[j + 2] = ink[2];
          out[j + 3] = on ? 255 : 0;
        }
      }
      ctx.putImageData(img, 0, 0);
    },
    destroy() {
      canvas.remove();
      k.restore();
    },
  };
}
