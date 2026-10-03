// Drivers: who moves a transition's progress. A transition only knows render(p).
import { clamp, resolveEase, springEase } from "./ease.js";
import { env } from "./env.js";

const raf = (cb) => requestAnimationFrame(cb);

/**
 * Time driver. Resolves when finished. Reduced motion: jumps to the end state.
 *   await play(t, { duration: 1.1, ease: "power2.inOut" })
 *   play(t, { from: 1, to: 0 })   // reverse
 * Options: duration (s), ease, from, to, signal (AbortSignal), onUpdate(p).
 */
export function play(t, { duration = 1, ease = "none", from = 0, to = 1, signal, onUpdate } = {}) {
  const curve = resolveEase(ease);
  if (env.reduced || duration <= 0) {
    t.render(to);
    onUpdate?.(to);
    return Promise.resolve(to);
  }
  return new Promise((resolve) => {
    const start = performance.now();
    const step = (now) => {
      if (signal?.aborted) {
        t.render(to);
        resolve(to);
        return;
      }
      const k = clamp((now - start) / (duration * 1000));
      const p = from + (to - from) * curve(k);
      t.render(p);
      onUpdate?.(p);
      if (k < 1) raf(step);
      else resolve(to);
    };
    raf(step);
  });
}

/**
 * Scroll driver. With GSAP's ScrollTrigger (pass it, or have window.ScrollTrigger), uses it;
 * otherwise measures the trigger itself, treating it as a sticky track: progress goes 0 → 1
 * while the track's top travels from the viewport top to (track height - viewport) above it.
 *   const s = scrub(t, { trigger: track, ScrollTrigger })   // later: s.kill()
 * Reduced motion: renders the end state once and does nothing else.
 */
export function scrub(t, { trigger, start = "top top", end = "bottom bottom", ease = "none", scrub: lag = 0.6, ScrollTrigger } = {}) {
  const curve = resolveEase(ease);
  if (env.reduced) {
    t.render(1);
    return { kill() {} };
  }
  const ST = ScrollTrigger ?? (typeof window !== "undefined" ? window.ScrollTrigger : undefined);
  if (ST) {
    // Same feel as GSAP's numeric scrub: the playhead catches the scroll in ~`lag` seconds.
    const follow = lag ? Math.min(1, 3 / (lag * 60)) : 1;
    let shown = 0;
    let target = 0;
    let id = 0;
    const tick = () => {
      shown += (target - shown) * follow;
      if (Math.abs(target - shown) < 0.0005) shown = target;
      t.render(curve(shown));
      id = shown === target ? 0 : raf(tick);
    };
    const st = ST.create({
      trigger,
      start,
      end,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        target = self.progress;
        if (!id) id = raf(tick);
      },
    });
    target = shown = st.progress;
    t.render(curve(shown));
    return { kill: () => (st.kill(), id && cancelAnimationFrame(id)) };
  }
  let id = 0;
  const update = () => {
    id = 0;
    const r = trigger.getBoundingClientRect();
    const span = Math.max(1, r.height - innerHeight);
    t.render(curve(clamp(-r.top / span)));
  };
  const onScroll = () => {
    if (!id) id = raf(update);
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  update();
  return {
    kill() {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (id) cancelAnimationFrame(id);
    },
  };
}

/**
 * Drag driver: the pointer moves the progress 1:1 along an axis over `distance` px.
 * On release: past `threshold` (or a fast flick) it completes, otherwise it springs back.
 *   drag(t, { el: handle, axis: "x", distance: 400, onComplete })
 */
export function drag(
  t,
  { el, axis = "x", distance = 400, threshold = 0.35, flick = 0.6, direction = 1, onComplete, onCancel, onProgress } = {},
) {
  let p = 0;
  let startPos = 0;
  let lastPos = 0;
  let lastTime = 0;
  let velocity = 0;
  let active = false;
  let settling = null;
  const back = springEase({ stiffness: 260, damping: 22 });
  const pos = (e) => (axis === "x" ? e.clientX : e.clientY);
  const set = (v) => {
    p = clamp(v);
    t.render(p);
    onProgress?.(p);
  };
  const down = (e) => {
    if (env.reduced) return;
    settling?.abort();
    active = true;
    startPos = lastPos = pos(e);
    lastTime = performance.now();
    velocity = 0;
    el.setPointerCapture?.(e.pointerId);
  };
  const move = (e) => {
    if (!active) return;
    const now = performance.now();
    const x = pos(e);
    velocity = ((x - lastPos) / Math.max(1, now - lastTime)) * direction; // px/ms
    lastPos = x;
    lastTime = now;
    set(((x - startPos) * direction) / distance);
  };
  const up = async () => {
    if (!active) return;
    active = false;
    const complete = p > threshold || velocity > flick;
    settling = new AbortController();
    const from = p;
    const to = complete ? 1 : 0;
    await play(t, { from, to, duration: complete ? 0.45 : 0.6, ease: complete ? "power3.out" : back, signal: settling.signal, onUpdate: (v) => (p = v) });
    settling = null;
    (complete ? onComplete : onCancel)?.();
  };
  const click = () => {
    // Reduced motion or keyboard: activating the handle completes directly.
    if (env.reduced) {
      set(1);
      onComplete?.();
    }
  };
  el.style.touchAction = axis === "x" ? "pan-y" : "pan-x";
  el.addEventListener("pointerdown", down);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", up);
  el.addEventListener("click", click);
  return {
    kill() {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click);
    },
  };
}

/**
 * Hold driver: pressing and holding charges the progress up to `charge` (0..1) over `duration`
 * seconds; releasing early drains it; reaching the end plays the rest and calls onComplete.
 * Enter/Space hold works the same from the keyboard.
 */
export function hold(t, { el, duration = 1.1, charge = 0.35, onComplete, release = { duration: 0.6, ease: "expo.out" } } = {}) {
  let p = 0;
  let id = 0;
  let last = 0;
  let pressing = false;
  let done = false;
  const loop = (now) => {
    const dt = (now - last) / 1000;
    last = now;
    p = clamp(p + (pressing ? dt / duration : -dt / (duration * 0.5)) * charge, 0, charge);
    t.render(p);
    if (pressing && p >= charge - 1e-4) {
      done = true;
      id = 0;
      play(t, { from: charge, to: 1, ...release }).then(() => onComplete?.());
      return;
    }
    id = p > 0 || pressing ? raf(loop) : 0;
  };
  const start = () => {
    if (done) return;
    if (env.reduced) {
      done = true;
      t.render(1);
      onComplete?.();
      return;
    }
    pressing = true;
    last = performance.now();
    if (!id) id = raf(loop);
  };
  const stop = () => {
    pressing = false;
  };
  const key = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    (e.type === "keydown" ? start : stop)();
  };
  el.addEventListener("pointerdown", start);
  el.addEventListener("pointerup", stop);
  el.addEventListener("pointerleave", stop);
  el.addEventListener("keydown", key);
  el.addEventListener("keyup", key);
  el.addEventListener("contextmenu", (e) => e.preventDefault());
  return {
    kill() {
      el.removeEventListener("pointerdown", start);
      el.removeEventListener("pointerup", stop);
      el.removeEventListener("pointerleave", stop);
      el.removeEventListener("keydown", key);
      el.removeEventListener("keyup", key);
      if (id) cancelAnimationFrame(id);
    },
  };
}
