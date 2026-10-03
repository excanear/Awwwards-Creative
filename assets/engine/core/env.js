// Capabilities and preferences, read once and kept current.

const mq = (q) => (typeof matchMedia === "function" ? matchMedia(q) : { matches: false, addEventListener() {} });

const reducedQuery = mq("(prefers-reduced-motion: reduce)");
const fineQuery = mq("(pointer: fine)");

/** Test overrides: <html data-motion="reduce|full"> or ?motion=reduce|full in the URL. */
function override() {
  const attr = typeof document !== "undefined" ? document.documentElement.dataset.motion : undefined;
  if (attr === "reduce" || attr === "full") return attr;
  if (typeof location !== "undefined") {
    const q = new URLSearchParams(location.search).get("motion");
    if (q === "reduce" || q === "full") return q;
  }
  return null;
}

let webglCache;

export const env = {
  get reduced() {
    const o = override();
    return o ? o === "reduce" : reducedQuery.matches;
  },
  get finePointer() {
    return fineQuery.matches;
  },
  get touch() {
    return !fineQuery.matches;
  },
  get viewTransitions() {
    return typeof document !== "undefined" && typeof document.startViewTransition === "function";
  },
  get scrollTimeline() {
    return typeof CSS !== "undefined" && CSS.supports?.("animation-timeline: view()");
  },
  get webgl() {
    if (webglCache === undefined) {
      try {
        const c = document.createElement("canvas");
        webglCache = !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
      } catch {
        webglCache = false;
      }
    }
    return webglCache;
  },
  get dpr() {
    const max = fineQuery.matches ? 2 : 1.5;
    return Math.min(typeof devicePixelRatio === "number" ? devicePixelRatio : 1, max);
  },
};

/** Calls back whenever reduced motion changes (OS setting or the data-motion attribute). */
export function onReducedChange(cb) {
  const handler = () => cb(env.reduced);
  reducedQuery.addEventListener?.("change", handler);
  let observer;
  if (typeof MutationObserver !== "undefined") {
    observer = new MutationObserver(handler);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  }
  return () => {
    reducedQuery.removeEventListener?.("change", handler);
    observer?.disconnect();
  };
}

/** Records the inline styles an effect overrides and puts them back on destroy. */
export function styleKeeper() {
  const saved = new Map();
  return {
    set(el, props) {
      if (!el) return;
      let orig = saved.get(el);
      if (!orig) saved.set(el, (orig = {}));
      for (const [k, v] of Object.entries(props)) {
        if (!(k in orig)) orig[k] = el.style.getPropertyValue(k);
        el.style.setProperty(k, v);
      }
    },
    restore() {
      for (const [el, orig] of saved) {
        for (const [k, v] of Object.entries(orig)) {
          if (v) el.style.setProperty(k, v);
          else el.style.removeProperty(k);
        }
      }
      saved.clear();
    },
  };
}

/** Size of the box an effect plays in. */
export function boxOf(el) {
  const r = el.getBoundingClientRect();
  return { w: r.width, h: r.height, left: r.left, top: r.top };
}

/** First non-transparent background colour up the tree (for colour handoffs). */
export function backgroundOf(el) {
  for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
    const c = getComputedStyle(n).backgroundColor;
    if (c && c !== "transparent" && !/rgba\(.+,\s*0\)$/.test(c)) return c;
  }
  return "rgb(255, 255, 255)";
}
