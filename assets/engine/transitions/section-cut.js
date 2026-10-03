// SP-01 · Corte de Seção (A–A). A section line of a technical drawing (dash-dot, letters at
// both ends) is drawn at the height of the click; the page closes onto that line and the next
// one opens from it. From Guilherme Antunes ("O Corte A-A").
//
// Two forms:
//  - create(): progress-driven, for two layers on a stage (in-page states, demos, tests).
//  - navigate(): a real page transition with the View Transitions API (falls back to update()).
import { clamp, segment } from "../core/ease.js";
import { boxOf, env, styleKeeper } from "../core/env.js";

export const meta = { id: "SP-01", name: "Corte de Seção", needs: [] };

const DASH = (c) =>
  `repeating-linear-gradient(90deg, ${c} 0 26px, transparent 26px 32px, ${c} 32px 36px, transparent 36px 42px)`;

function eventColor() {
  return getComputedStyle(document.documentElement).getPropertyValue("--color-event").trim() || "#1f3fd6";
}

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {number} [o.y]            cut height in stage px (the click), default the middle
 * @param {string} [o.color]
 * @param {string} [o.label="A"]
 */
export function create({ stage, from, to, y, color = eventColor(), label = "A" }) {
  const k = styleKeeper();
  const { w, h } = boxOf(stage);
  const cy = Math.round(clamp(y ?? h / 2, 8, h - 8));
  if (getComputedStyle(stage).position === "static") k.set(stage, { position: "relative" });
  k.set(from, { "z-index": "1" });
  k.set(to, { "z-index": "2" });

  const line = document.createElement("div");
  line.setAttribute("aria-hidden", "true");
  line.style.cssText = `position:absolute;left:0;top:${cy - 1}px;width:${w}px;height:2px;z-index:5;pointer-events:none;`;
  const half = (side) => {
    const s = document.createElement("div");
    s.style.cssText = `position:absolute;top:0;${side}:0;width:50%;height:2px;background:${DASH(color)};transform:scaleX(0);transform-origin:${side} center;`;
    line.append(s);
    return s;
  };
  const left = half("left");
  const right = half("right");
  const tag = (side) => {
    const t = document.createElement("div");
    t.textContent = `${label}`;
    t.style.cssText = `position:absolute;${side}:14px;top:-26px;font:600 13px/1 ui-monospace,monospace;color:${color};letter-spacing:.1em;opacity:0;`;
    // The arrows of a cut line show the direction of view.
    t.innerHTML = `${label}<span style="display:block;margin-top:4px;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid ${color}"></span>`;
    line.append(t);
    return t;
  };
  const tags = [tag("left"), tag("right")];
  stage.append(line);

  return {
    render(p) {
      p = clamp(p);
      const draw = segment(p, 0, 0.25, "power2.out");
      left.style.transform = right.style.transform = `scaleX(${draw})`;
      for (const t of tags) t.style.opacity = String(segment(p, 0.1, 0.22, "none"));
      line.style.opacity = String(1 - segment(p, 0.85, 1, "none"));

      const close = segment(p, 0.2, 0.55, [0.76, 0, 0.24, 1]);
      k.set(from, {
        visibility: p < 0.56 ? "visible" : "hidden",
        "clip-path": close > 0 ? `inset(${(cy * close).toFixed(1)}px 0 ${((h - cy) * close).toFixed(1)}px 0)` : "none",
      });
      const open = segment(p, 0.5, 1, [0.76, 0, 0.24, 1]);
      k.set(to, {
        visibility: p > 0.5 ? "visible" : "hidden",
        "clip-path": open < 1 ? `inset(${(cy * (1 - open)).toFixed(1)}px 0 ${((h - cy) * (1 - open)).toFixed(1)}px 0)` : "none",
      });
    },
    destroy() {
      line.remove();
      k.restore();
    },
  };
}

let styleTag;

/**
 * Page transition: closes the old page onto the line at `y` (viewport px) and opens the new
 * one from it. `update` must perform the navigation/DOM swap and may return a promise (resolve
 * it when the new route has rendered). Never blocks: without View Transitions or with reduced
 * motion, it just calls update().
 *   link.addEventListener("click", (e) => { e.preventDefault(); navigate(() => router.push(href), { y: e.clientY }) })
 */
export async function navigate(update, { y = innerHeight / 2, close = 0.5, open = 0.65, timeout = 2500 } = {}) {
  if (env.reduced || !env.viewTransitions) {
    await update();
    return;
  }
  const pct = ((y / innerHeight) * 100).toFixed(2);
  styleTag ??= document.head.appendChild(document.createElement("style"));
  styleTag.textContent = `
    html[data-aw-transition="cut"]::view-transition-old(root) { animation: aw-cut-close ${close}s cubic-bezier(.76,0,.24,1) both; }
    html[data-aw-transition="cut"]::view-transition-new(root) { animation: aw-cut-open ${open}s cubic-bezier(.76,0,.24,1) ${close * 0.4}s both; }
    @keyframes aw-cut-close { to { clip-path: inset(${pct}% 0 calc(100% - ${pct}%) 0); } }
    @keyframes aw-cut-open { from { clip-path: inset(${pct}% 0 calc(100% - ${pct}%) 0); } }`;
  const root = document.documentElement;
  root.dataset.awTransition = "cut";
  const vt = document.startViewTransition(() =>
    Promise.race([Promise.resolve(update()), new Promise((r) => setTimeout(r, timeout))]),
  );
  try {
    await vt.finished;
  } finally {
    delete root.dataset.awTransition;
  }
}
