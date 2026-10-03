// GX-03 · Partículas que Formam. A one-line title comes apart into particles sampled from its
// own glyphs; they travel (with a little turbulence) and settle into the pixels of the next
// title. Canvas 2D, typed arrays, seeded.
import { clamp, lerp, resolveEase, seeded } from "../core/ease.js";
import { boxOf, env, styleKeeper } from "../core/env.js";

export const meta = { id: "GX-03", name: "Partículas que Formam", needs: ["canvas"] };

/** The text a reader sees: skips descendants that are hidden or aria-hidden. */
function visibleText(el) {
  let out = "";
  for (const node of el.childNodes) {
    if (node.nodeType === 3) out += node.textContent;
    else if (node.nodeType === 1) {
      const cs = getComputedStyle(node);
      if (node.getAttribute("aria-hidden") === "true" || cs.visibility === "hidden" || cs.display === "none") continue;
      out += visibleText(node);
    }
  }
  return out;
}

/** Points where a single-line element's text has ink, in stage px. */
function sample(el, stageBox, step) {
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const c = document.createElement("canvas");
  c.width = Math.ceil(stageBox.w);
  c.height = Math.ceil(stageBox.h);
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  ctx.textBaseline = "alphabetic";
  const text = (el.dataset.text ?? visibleText(el)).trim();
  const m = ctx.measureText(text);
  const align = cs.textAlign;
  const left = r.left - stageBox.left;
  const x = align === "center" ? left + (r.width - m.width) / 2 : align === "right" || align === "end" ? left + r.width - m.width : left;
  const ascent = m.actualBoundingBoxAscent;
  const descent = m.actualBoundingBoxDescent;
  const y = r.top - stageBox.top + (r.height + ascent - descent) / 2;
  ctx.fillText(text, x, y);
  const data = ctx.getImageData(0, 0, c.width, c.height).data;
  const pts = [];
  for (let py = 0; py < c.height; py += step) {
    for (let px = 0; px < c.width; px += step) {
      if (data[(py * c.width + px) * 4 + 3] > 128) pts.push(px, py);
    }
  }
  return { pts, color: cs.color };
}

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.fromEl   single-line text element (hidden while running)
 * @param {HTMLElement} o.toEl     single-line text element at its final place (may be hidden)
 * @param {number} [o.step=3]      sampling grid, px (smaller = denser)
 * @param {number} [o.size=2.2]    particle size, px
 * @param {number} [o.max=6000]
 * @param {number} [o.scatter=70]  turbulence in the middle of the journey, px
 * @param {"sorted"|"random"} [o.order="sorted"]  sorted keeps letters roughly in place
 */
export function create({ stage, fromEl, toEl, step = 3, size = 2.2, max = env.finePointer ? 6000 : 1500, scatter = 70, order = "sorted", seed = 3 }) {
  const k = styleKeeper();
  const rand = seeded(seed);
  const box = boxOf(stage);
  // Measure the target where it will be, even if it is hidden now.
  k.set(toEl, { visibility: "hidden", display: getComputedStyle(toEl).display === "none" ? "block" : getComputedStyle(toEl).display });
  const A = sample(fromEl, box, step);
  const B = sample(toEl, box, step);
  if (!A.pts.length || !B.pts.length) console.warn("particles-morph: a text sampled no ink (font not loaded, or empty text)");
  const n = A.pts.length && B.pts.length ? Math.floor(Math.min(max, Math.max(A.pts.length, B.pts.length) / 2)) : 0;
  const pick = (src) => {
    const count = src.length / 2;
    const out = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) {
      const j = count >= n ? Math.floor((i / n) * count) : Math.floor(rand() * count);
      out[i * 2] = src[j * 2];
      out[i * 2 + 1] = src[j * 2 + 1];
    }
    return out;
  };
  const a = pick(A.pts);
  const b = pick(B.pts);
  if (order === "random") {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [b[i * 2], b[j * 2]] = [b[j * 2], b[i * 2]];
      [b[i * 2 + 1], b[j * 2 + 1]] = [b[j * 2 + 1], b[i * 2 + 1]];
    }
  }
  const delay = new Float32Array(n);
  const nx = new Float32Array(n);
  const ny = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    delay[i] = order === "sorted" ? (a[i * 2] / box.w) * 0.3 + rand() * 0.05 : rand() * 0.35;
    const ang = rand() * Math.PI * 2;
    nx[i] = Math.cos(ang) * (0.4 + rand() * 0.6);
    ny[i] = Math.sin(ang) * (0.4 + rand() * 0.6) - 0.5; // a slight lift, like dust
  }

  const dpr = env.dpr;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(box.w * dpr);
  canvas.height = Math.ceil(box.h * dpr);
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = `position:absolute;left:0;top:0;width:${box.w}px;height:${box.h}px;pointer-events:none;z-index:6;display:none;`;
  if (getComputedStyle(stage).position === "static") k.set(stage, { position: "relative" });
  stage.append(canvas);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  const travel = resolveEase("power3.inOut");

  return {
    render(p) {
      p = clamp(p);
      const running = p > 0 && p < 1;
      canvas.style.display = running ? "" : "none";
      k.set(fromEl, { visibility: p <= 0 ? "visible" : "hidden" });
      k.set(toEl, { visibility: p >= 1 ? "visible" : "hidden" });
      if (!running) return;
      ctx.clearRect(0, 0, box.w, box.h);
      ctx.fillStyle = p < 0.5 ? A.color : B.color;
      for (let i = 0; i < n; i++) {
        const t = travel(clamp((p - delay[i]) / 0.62));
        const bell = Math.sin(Math.PI * t);
        const x = lerp(a[i * 2], b[i * 2], t) + nx[i] * bell * scatter;
        const y = lerp(a[i * 2 + 1], b[i * 2 + 1], t) + ny[i] * bell * scatter;
        ctx.fillRect(x, y, size, size);
      }
    },
    destroy() {
      canvas.remove();
      k.restore();
    },
  };
}
