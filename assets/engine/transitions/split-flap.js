// ME-02 · Split-Flap. The text changes like a departures board: every character flips through
// its plates (top flap falls, bottom flap lands) until it reaches the new letter, in a cascade.
import { clamp, resolveEase, segment } from "../core/ease.js";
import { styleKeeper } from "../core/env.js";

export const meta = { id: "ME-02", name: "Split-Flap", needs: [] };

const ALPHABET = " ABCDEFGHIJKLMNOPQRSTUVWXYZÁÂÃÀÇÉÊÍÓÔÕÚ0123456789.,:;-/&!?'";

/** The plates a cell shows on its way from `a` to `b`, at most `max` flips. */
function plates(a, b, max) {
  if (a === b) return [a];
  const ia = ALPHABET.indexOf(a.toUpperCase());
  const ib = ALPHABET.indexOf(b.toUpperCase());
  if (ia < 0 || ib < 0) return [a, b];
  const seq = [];
  for (let i = ia; seq.length < ALPHABET.length; i = (i + 1) % ALPHABET.length) {
    seq.push(ALPHABET[i]);
    if (i === ib) break;
  }
  // Keep the first plate and the last `max` ones (a long walk would take forever).
  const tail = seq.slice(-max);
  const out = tail[0] === seq[0] ? tail : [seq[0], ...tail];
  out[out.length - 1] = b; // keep the target's own case
  return out;
}

/**
 * @param {object} o
 * @param {HTMLElement} o.el
 * @param {string} o.next
 * @param {number} [o.maxFlips=7]
 * @param {string} [o.panel="#141414"]  plate colour
 * @param {string} [o.ink="#f2efe6"]    letter colour
 */
export function create({ el, next, maxFlips = 7, panel = "#141414", ink = "#f2efe6" }) {
  const k = styleKeeper();
  const original = el.textContent ?? "";
  const from = original.toUpperCase();
  const to = String(next).toUpperCase();
  const n = Math.max(from.length, to.length);
  const a = from.padEnd(n, " ");
  const b = to.padEnd(n, " ");

  const cellCss = `position:relative;display:inline-block;width:.72em;height:1.12em;margin-right:.06em;perspective:3em;border-radius:.07em;background:${panel};color:${ink};vertical-align:top;`;
  const halfCss = (which) =>
    `position:absolute;left:0;right:0;height:50%;overflow:hidden;${which === "top" ? "top:0;border-radius:.07em .07em 0 0;" : "top:50%;border-radius:0 0 .07em .07em;"}background:${panel};backface-visibility:hidden;`;
  const glyphCss = (which) =>
    `display:block;height:200%;line-height:1.12em;text-align:center;${which === "bottom" ? "transform:translateY(-50%);" : ""}`;
  const part = (which) => {
    const s = document.createElement("span");
    s.style.cssText = halfCss(which);
    const g = document.createElement("span");
    g.style.cssText = glyphCss(which);
    s.append(g);
    return { s, g };
  };

  const wrap = document.createElement("span");
  wrap.setAttribute("aria-hidden", "true");
  wrap.style.cssText = "display:inline-block;white-space:nowrap;";
  const cells = [];
  for (let i = 0; i < n; i++) {
    const cell = document.createElement("span");
    cell.style.cssText = cellCss;
    const top = part("top");
    const bottom = part("bottom");
    const flapTop = part("top");
    const flapBottom = part("bottom");
    flapTop.s.style.transformOrigin = "50% 100%";
    flapBottom.s.style.transformOrigin = "50% 0";
    // A hairline across the middle, the gap between plates.
    const gap = document.createElement("span");
    gap.style.cssText = "position:absolute;left:0;right:0;top:50%;height:1px;background:rgba(0,0,0,.55);z-index:3;";
    cell.append(top.s, bottom.s, flapTop.s, flapBottom.s, gap);
    wrap.append(cell);
    cells.push({ top, bottom, flapTop, flapBottom, seq: plates(a[i], b[i], maxFlips) });
  }
  const label = document.createElement("span");
  label.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;";
  k.set(el, { position: getComputedStyle(el).position === "static" ? "relative" : getComputedStyle(el).position });
  el.replaceChildren(wrap, label);
  const flipEase = resolveEase("power2.in");
  const landEase = resolveEase("back.out(1.6)");
  let lastP = 0;

  return {
    render(p) {
      p = lastP = clamp(p);
      label.textContent = p >= 0.5 ? String(next) : original;
      const spread = Math.min(0.4, 0.04 * n);
      cells.forEach((c, i) => {
        const d = n > 1 ? (i / (n - 1)) * spread : 0;
        const steps = c.seq.length - 1;
        const s = segment(p, d, d + (1 - spread), "none") * steps;
        const kIdx = Math.min(Math.floor(s), Math.max(0, steps - 1));
        const f = steps ? s - kIdx : 1;
        const cur = c.seq[kIdx];
        const nxt = c.seq[Math.min(kIdx + 1, steps)];
        const done = !steps || s >= steps;
        c.top.g.textContent = done ? c.seq[steps] : nxt;
        c.bottom.g.textContent = done ? c.seq[steps] : cur;
        c.flapTop.g.textContent = cur;
        c.flapBottom.g.textContent = nxt;
        c.flapTop.s.style.display = done || f >= 0.5 ? "none" : "";
        c.flapBottom.s.style.display = done || f < 0.5 ? "none" : "";
        c.flapTop.s.style.transform = `rotateX(${(-90 * flipEase(Math.min(1, f * 2))).toFixed(1)}deg)`;
        c.flapBottom.s.style.transform = `rotateX(${(90 * (1 - landEase(Math.max(0, f * 2 - 1)))).toFixed(1)}deg)`;
      });
    },
    destroy() {
      el.textContent = lastP >= 1 ? String(next) : original;
      k.restore();
    },
  };
}
