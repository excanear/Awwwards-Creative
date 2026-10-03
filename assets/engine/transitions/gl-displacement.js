// GL-01 · Dissolução por Mapa, with sibling modes that share the same two-texture pipeline:
//   "dissolve" GL-01  noise map decides when each pixel changes, both images drift along it
//   "ripple"   LQ-05  a drop at `origin`: rings distort the image, the front carries the change
//   "rgb"      DG-01  channels split at the peak and rejoin on the new image
//   "pixelate" DG-05  bitrate drop: blocks grow, swap at the worst moment, sharpen again
//   "twirl"    DG-09  a vortex drains the image into `origin` and spins the next one out
// Raw WebGL 1, one quad, ~4 KB. Without WebGL: a 2D canvas that swaps at the midpoint.
import { clamp, resolveEase } from "../core/ease.js";
import { boxOf, env } from "../core/env.js";

export const meta = { id: "GL-01", name: "Dissolução por Mapa", needs: ["webgl"] };

const MODES = { dissolve: 0, ripple: 1, rgb: 2, pixelate: 3, twirl: 4 };

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uFrom, uTo;
uniform vec2 uFromScale, uToScale, uOrigin, uRes;
uniform float uP, uIntensity, uAspect;
uniform int uMode;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}
vec4 A(vec2 uv) { return texture2D(uFrom, (uv - 0.5) * uFromScale + 0.5); }
vec4 B(vec2 uv) { return texture2D(uTo, (uv - 0.5) * uToScale + 0.5); }

void main() {
  vec2 uv = vUv;
  float p = uP;
  vec2 asp = vec2(uAspect, 1.0);
  vec4 c;
  if (uMode == 0) {
    float n = fbm(uv * asp * 3.0);
    float w = 0.18;
    float t = p * (1.0 + w) - w;
    float m = smoothstep(t, t + w, n);
    vec2 d = vec2(n - 0.5) * 0.25 * uIntensity;
    c = mix(B(uv - d * (1.0 - p)), A(uv + d * p), m);
  } else if (uMode == 1) {
    float dist = distance(uv * asp, uOrigin * asp);
    float x = dist - p * (length(asp) + 0.25);
    float wave = sin(x * 48.0) * exp(-abs(x) * 9.0) * 0.035 * uIntensity * (1.0 - p);
    vec2 dir = normalize((uv - uOrigin) * asp + 1e-5) / asp;
    vec2 uv2 = uv + dir * wave;
    float m = smoothstep(-0.02, 0.02, x);
    c = mix(B(uv2), A(uv2), m);
  } else if (uMode == 2) {
    float s = sin(3.14159 * p) * 0.05 * uIntensity;
    float m = smoothstep(0.42, 0.58, p);
    vec4 a = vec4(A(uv + vec2(s, 0.0)).r, A(uv).g, A(uv - vec2(s, 0.0)).b, 1.0);
    vec4 b = vec4(B(uv + vec2(s, 0.0)).r, B(uv).g, B(uv - vec2(s, 0.0)).b, 1.0);
    c = mix(a, b, m);
  } else if (uMode == 3) {
    float block = max(1.0, floor(pow(2.0, sin(3.14159 * p) * 6.0 * uIntensity)));
    vec2 cell = block / uRes;
    vec2 q = (floor(uv / cell) + 0.5) * cell;
    c = p < 0.5 ? A(q) : B(q);
  } else {
    vec2 d = (uv - uOrigin) * asp;
    float r = length(d);
    float k = sin(3.14159 * p);
    float ang = k * 6.0 * uIntensity * (1.0 - smoothstep(0.0, 0.9, r));
    float cs = cos(ang), sn = sin(ang);
    d = mat2(cs, -sn, sn, cs) * d * (1.0 + k * 0.5);
    vec2 uv2 = d / asp + uOrigin;
    c = p < 0.5 ? A(uv2) : B(uv2);
  }
  gl_FragColor = c;
}`;

function load(src) {
  if (typeof src !== "string") {
    if (src instanceof HTMLImageElement && !src.complete) return new Promise((r) => src.addEventListener("load", () => r(src), { once: true }));
    return Promise.resolve(src);
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

const sizeOf = (s) => [s.naturalWidth || s.videoWidth || s.width, s.naturalHeight || s.videoHeight || s.height];

/**
 * @param {object} o
 * @param {HTMLElement} o.stage
 * @param {string|CanvasImageSource} o.from   image URL, <img>, <canvas> or <video>
 * @param {string|CanvasImageSource} o.to
 * @param {"dissolve"|"ripple"|"rgb"|"pixelate"|"twirl"} [o.mode="dissolve"]
 * @param {{x:number,y:number}} [o.origin]   stage px (ripple/twirl centre)
 * @param {number} [o.intensity=1]
 * @param {*} [o.ease="none"]  the driver usually carries the curve; add one here if not
 * @returns {{ready: Promise<void>, render(p:number):void, destroy():void}}
 */
export function create({ stage, from, to, mode = "dissolve", origin, intensity = 1, ease = "none" }) {
  const curve = resolveEase(ease);
  const { w, h } = boxOf(stage);
  const dpr = env.dpr;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = `position:absolute;left:0;top:0;width:${w}px;height:${h}px;z-index:6;pointer-events:none;`;
  if (getComputedStyle(stage).position === "static") stage.style.position = "relative";
  stage.append(canvas);

  let lastP = 0;
  let draw = () => {};
  let textures = [];
  let sources = [];
  const gl = env.webgl ? canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false }) : null;

  const ready = Promise.all([load(from), load(to)]).then(([a, b]) => {
    sources = [a, b];
    if (!gl) {
      // Fallback: same choreography without the shader, a hard swap at the midpoint.
      const ctx = canvas.getContext("2d");
      const cover = (src) => {
        const [sw, sh] = sizeOf(src);
        const s = Math.max(canvas.width / sw, canvas.height / sh);
        ctx.drawImage(src, (canvas.width - sw * s) / 2, (canvas.height - sh * s) / 2, sw * s, sh * s);
      };
      draw = (p) => cover(p < 0.5 ? a : b);
      draw(lastP);
      return;
    }
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n) => gl.getUniformLocation(prog, n);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const texture = (src, unit) => {
      const t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      return t;
    };
    textures = [texture(a, 0), texture(b, 1)];
    // object-fit: cover, done in the shader by scaling the UVs around the centre.
    const aspect = w / h;
    const fit = (src) => {
      const [sw, sh] = sizeOf(src);
      const ta = sw / sh;
      return ta > aspect ? [aspect / ta, 1] : [1, ta / aspect];
    };
    gl.uniform1i(u("uFrom"), 0);
    gl.uniform1i(u("uTo"), 1);
    gl.uniform2f(u("uFromScale"), ...fit(a));
    gl.uniform2f(u("uToScale"), ...fit(b));
    gl.uniform2f(u("uOrigin"), (origin?.x ?? w / 2) / w, 1 - (origin?.y ?? h / 2) / h);
    gl.uniform2f(u("uRes"), canvas.width, canvas.height);
    gl.uniform1f(u("uAspect"), aspect);
    gl.uniform1f(u("uIntensity"), intensity);
    gl.uniform1i(u("uMode"), MODES[mode] ?? 0);
    gl.viewport(0, 0, canvas.width, canvas.height);
    const uP = u("uP");
    draw = (p) => {
      // Live sources (video) are re-uploaded each frame.
      sources.forEach((s, i) => {
        if (s instanceof HTMLVideoElement) {
          gl.activeTexture(gl.TEXTURE0 + i);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, s);
        }
      });
      gl.uniform1f(uP, p);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    draw(lastP);
  });

  const lost = (e) => {
    e.preventDefault();
    draw = () => {};
    canvas.style.display = "none";
  };
  canvas.addEventListener("webglcontextlost", lost);

  return {
    ready,
    canvas,
    render(p) {
      lastP = curve(clamp(p));
      draw(lastP);
    },
    destroy() {
      canvas.removeEventListener("webglcontextlost", lost);
      if (gl) for (const t of textures) gl.deleteTexture(t);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    },
  };
}
