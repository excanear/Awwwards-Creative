// TY-04 · Tachado e Reescrita. Every visible line is struck through like a proof, then the
// new text is written over it, left to right, line by line, in the same place.
// From Guilherme Antunes ("A Revisão de Idioma"). Works on one text element.
import { clamp, segment } from "../core/ease.js";
import { backgroundOf, styleKeeper } from "../core/env.js";

export const meta = { id: "TY-04", name: "Tachado e Reescrita", needs: [] };

/** Visual lines of an element's text, merged per baseline, relative to the element. */
function lines(el) {
  const box = el.getBoundingClientRect();
  const range = document.createRange();
  range.selectNodeContents(el);
  const out = [];
  for (const r of range.getClientRects()) {
    if (r.width < 1) continue;
    const top = r.top - box.top;
    const line = out.find((l) => Math.abs(l.top - top) < r.height * 0.5);
    if (line) {
      const right = Math.max(line.left + line.width, r.right - box.left);
      line.left = Math.min(line.left, r.left - box.left);
      line.width = right - line.left;
      line.height = Math.max(line.height, r.height);
    } else out.push({ left: r.left - box.left, top, width: r.width, height: r.height });
  }
  return out.slice(0, 80);
}

/**
 * @param {object} o
 * @param {HTMLElement} o.el         the text element (its children are replaced while it runs)
 * @param {string} o.next            the new text (plain text; set `html: true` for markup)
 * @param {boolean} [o.html=false]
 * @param {string} [o.color]         strike colour (default: the event colour token, else currentColor)
 * @param {string} [o.paper]         background used to hide the text before it is written
 */
export function create({ el, next, html = false, color, paper }) {
  const k = styleKeeper();
  const original = el.innerHTML;
  const nextHtml = html ? next : escape(next);
  const strokeColor =
    color || getComputedStyle(document.documentElement).getPropertyValue("--color-event").trim() || "currentColor";
  const ground = paper || backgroundOf(el);

  if (getComputedStyle(el).position === "static") k.set(el, { position: "relative" });
  const oldLines = lines(el);
  el.innerHTML = nextHtml;
  const newLines = lines(el);
  el.innerHTML = original;

  // Structure while running: the text in a span, and an overlay with strikes and covers.
  const text = document.createElement("span");
  text.innerHTML = original;
  const overlay = document.createElement("span");
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.cssText = "position:absolute;inset:0;pointer-events:none;";
  const strikes = oldLines.map((l) => {
    const s = document.createElement("span");
    const t = Math.max(2, l.height * 0.07);
    s.style.cssText = `position:absolute;left:${l.left}px;top:${l.top + l.height * 0.54 - t / 2}px;width:${l.width}px;height:${t}px;background:${strokeColor};transform:scaleX(0);transform-origin:left center;z-index:2;`;
    overlay.append(s);
    return s;
  });
  const covers = newLines.map((l) => {
    const c = document.createElement("span");
    c.style.cssText = `position:absolute;left:${l.left - 2}px;top:${l.top}px;width:${l.width + 4}px;height:${l.height}px;background:${ground};transform-origin:right center;z-index:1;display:none;`;
    overlay.append(c);
    return c;
  });
  el.replaceChildren(text, overlay);
  let showingNext = false;
  let lastP = 0;

  return {
    render(p) {
      p = lastP = clamp(p);
      const n = strikes.length || 1;
      const st = Math.min(0.03, 0.15 / n);
      strikes.forEach((s, i) => {
        const draw = segment(p, i * st, 0.3 + i * st, "power2.out");
        const retract = segment(p, 0.45, 0.6, "power2.in");
        s.style.transformOrigin = retract > 0 ? "right center" : "left center";
        s.style.transform = `scaleX(${retract > 0 ? 1 - retract : draw})`;
        s.style.display = p >= 0.6 ? "none" : "";
      });
      const wantNext = p >= 0.42;
      if (wantNext !== showingNext) {
        text.innerHTML = wantNext ? nextHtml : original;
        showingNext = wantNext;
      }
      const m = covers.length || 1;
      const ct = Math.min(0.06, 0.25 / m);
      covers.forEach((c, i) => {
        c.style.display = wantNext && p < 1 ? "" : "none";
        const write = segment(p, 0.48 + i * ct, 0.75 + i * ct, "power1.inOut");
        c.style.transform = `scaleX(${1 - write})`;
      });
    },
    destroy() {
      el.innerHTML = lastP >= 0.42 ? nextHtml : original;
      k.restore();
    },
  };
}

function escape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
