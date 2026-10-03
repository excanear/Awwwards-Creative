// ME-05 · Gravidade. Gravity is switched on: the pieces of the section tremble, fall, bounce and
// pile on the floor; then the next section drops in from above, heavy, and lands over them.
//
// The physics is baked once at create() into frames, so render(p) stays a pure function of p:
// scrubbable, reversible and identical on every visit (seeded).
import { clamp, lerp, seeded } from "../core/ease.js";
import { boxOf, styleKeeper } from "../core/env.js";

export const meta = { id: "ME-05", name: "Gravidade", needs: [] };

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {HTMLElement} o.from
 * @param {HTMLElement} o.to
 * @param {HTMLElement[]} [o.items]   bodies (default: [data-body] inside `from`, else its children)
 * @param {number} [o.seconds=2.4]    simulated time mapped onto p = 0..1
 * @param {number} [o.gravity=2600]   px/s²
 * @param {number} [o.restitution=0.38]
 * @param {number} [o.seed=11]
 */
export function create({ stage, from, to, items, seconds = 2.4, gravity = 2600, restitution = 0.38, seed = 11 }) {
  const k = styleKeeper();
  const rand = seeded(seed);
  const box = boxOf(stage);
  const W = box.w;
  const H = box.h;
  const els = items ?? [...(from.querySelectorAll("[data-body]").length ? from.querySelectorAll("[data-body]") : from.children)];

  const bodies = els.slice(0, 48).map((el, i) => {
    const r = el.getBoundingClientRect();
    const x0 = r.left - box.left + r.width / 2;
    const y0 = r.top - box.top + r.height / 2;
    return {
      el,
      x0,
      y0,
      x: x0,
      y: y0,
      hw: r.width / 2,
      hh: r.height / 2,
      rad: Math.max(6, Math.min(r.width, r.height) * 0.5),
      vx: (rand() - 0.5) * 160,
      vy: -rand() * 260,
      a: 0,
      va: (rand() - 0.5) * 3,
      // Things let go one after another, not all at once.
      release: 0.12 + i * 0.025 + rand() * 0.06,
    };
  });

  // The next section falls as one heavy body, landing with a short, dull bounce.
  const lid = { y: -H, vy: 0, release: seconds * 0.5 };

  const fps = 60;
  const sub = 4;
  const dt = 1 / (fps * sub);
  const frames = [];
  const total = Math.round(seconds * fps);
  for (let f = 0; f <= total; f++) {
    const t = f / fps;
    frames.push({
      b: bodies.map((b) => [b.x - b.x0, b.y - b.y0, b.a]),
      lid: lid.y,
      t,
    });
    for (let s = 0; s < sub; s++) {
      const now = t + s * dt;
      for (const b of bodies) {
        if (now < b.release) continue;
        b.vy += gravity * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.a += b.va * dt;
        const ext = Math.max(b.hh, b.rad);
        if (b.y + ext > H) {
          b.y = H - ext;
          b.vy = -Math.abs(b.vy) * restitution;
          b.vx *= 0.82;
          b.va = b.va * 0.6 + b.vx * 0.004;
          if (Math.abs(b.vy) < 30) b.vy = 0;
        }
        if (b.x - b.hw < 0) (b.x = b.hw), (b.vx = Math.abs(b.vx) * restitution);
        if (b.x + b.hw > W) (b.x = W - b.hw), (b.vx = -Math.abs(b.vx) * restitution);
      }
      // Pairwise contacts as circles: enough for a believable pile of labels and blocks.
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const p = bodies[i];
          const q = bodies[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const min = p.rad + q.rad;
          const d2 = dx * dx + dy * dy;
          if (d2 >= min * min || d2 === 0) continue;
          const d = Math.sqrt(d2);
          const nx = dx / d;
          const ny = dy / d;
          const push = (min - d) / 2;
          p.x -= nx * push;
          p.y -= ny * push;
          q.x += nx * push;
          q.y += ny * push;
          const rv = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
          if (rv < 0) {
            const jimp = (-(1 + restitution) * rv) / 2;
            p.vx -= jimp * nx;
            p.vy -= jimp * ny;
            q.vx += jimp * nx;
            q.vy += jimp * ny;
          }
        }
      }
      if (now >= lid.release) {
        lid.vy += gravity * 1.2 * dt;
        lid.y += lid.vy * dt;
        if (lid.y > 0) {
          lid.y = 0;
          lid.vy = -Math.abs(lid.vy) * 0.12;
          if (Math.abs(lid.vy) < 40) lid.vy = 0;
        }
      }
    }
  }
  frames[frames.length - 1].lid = 0;

  k.set(from, { "z-index": "1" });
  k.set(to, { "z-index": "2" });

  return {
    render(p) {
      p = clamp(p);
      const fi = p * (frames.length - 1);
      const f0 = frames[Math.floor(fi)];
      const f1 = frames[Math.min(frames.length - 1, Math.ceil(fi))];
      const m = fi - Math.floor(fi);
      // Anticipation: a short tremor before anything lets go.
      const shake = f0.t < 0.12 && p > 0 ? Math.sin(f0.t * 140) * 1.5 * (1 - f0.t / 0.12) : 0;
      bodies.forEach((b, i) => {
        const [x0, y0, a0] = f0.b[i];
        const [x1, y1, a1] = f1.b[i];
        k.set(b.el, {
          transform: p > 0 ? `translate(${(lerp(x0, x1, m) + shake).toFixed(1)}px, ${lerp(y0, y1, m).toFixed(1)}px) rotate(${lerp(a0, a1, m).toFixed(3)}rad)` : "none",
        });
      });
      const lid = lerp(f0.lid, f1.lid, m);
      k.set(to, {
        visibility: lid > -H + 1 || p >= 1 ? "visible" : "hidden",
        transform: p >= 1 ? "none" : `translateY(${lid.toFixed(1)}px)`,
      });
      k.set(from, { visibility: p >= 1 ? "hidden" : "visible" });
    },
    destroy() {
      k.restore();
    },
  };
}
