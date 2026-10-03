#!/usr/bin/env node
// Anti-Repetition audit of a project's motion code: counts the red-list patterns (R1–R12 in
// references/05-anti-repetition.md), the share of cliché, and suggests families to explore.
//   node scripts/audit-motion.mjs <project-dir> [--json]
import { readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { parseArgs } from "./lib/library.mjs";

const args = parseArgs(process.argv.slice(2));
const dir = args._[0];
if (!dir) {
  console.log("usage: node scripts/audit-motion.mjs <project-dir> [--json]");
  process.exit(1);
}
const EXT = new Set([".js", ".jsx", ".ts", ".tsx", ".vue", ".svelte", ".astro", ".css", ".scss", ".html", ".mjs"]);
const SKIP = new Set(["node_modules", ".git", ".next", "dist", "build", ".vercel", ".turbo", "out", "coverage"]);

const RED = {
  R1: { name: "Fade (opacidade sozinha)", re: /autoAlpha\s*:|opacity\s*:\s*0\b(?![^;\n]*(clip|mask|scale|x\s*:|y\s*:))|fadeIn|data-aos=["']fade["']/g, alt: "MK-03, MK-06, LQ-11, MK-11, DG-08" },
  R2: { name: "Fade-up / slide-up", re: /\by\s*:\s*-?\d{2,3}\b|translateY\(\s*-?\d{2,3}px\)|fade-up|initial=\{\{[^}]*\by\s*:/g, alt: "TY-07, TY-11, ME-02, ME-12, TY-03" },
  R3: { name: "Zoom / scale", re: /\bscale\s*:\s*(0?\.\d+|1\.\d+)|scale\((0?\.\d+|1\.[1-9]\d*)\)|zoom-in|data-aos=["']zoom/g, alt: "SP-03, TY-01, SP-10, CI-03, NX-08" },
  R4: { name: "Slide lateral", re: /\bx\s*:\s*["']?-?100%|xPercent\s*:\s*-?100|translateX\(-?100%\)|slide-(left|right)/g, alt: "SP-07, ME-04, ME-09, SP-04, IN-08" },
  R5: { name: "Blur-in", re: /blur\(\s*\d+px\s*\)/g, alt: "CI-02, DG-07, GL-04, LQ-04" },
  R6: { name: "Parallax genérico", re: /data-speed|data-lag|yPercent\s*:|parallax/gi, alt: "SP-05, SP-11, SP-13, IV-08, CI-03" },
  R7: { name: "Stagger de cards", re: /stagger\s*:\s*(0?\.\d+|\{)/g, alt: "IV-05, ME-11, TY-10, ME-09, GX-11" },
  R8: { name: "Texto embaralhado", re: /scramble|ScrambleText/gi, alt: "TY-04, TY-09, ME-02, TY-12" },
  R9: { name: "Marquee infinito", re: /marquee|repeat\s*:\s*-1[^\n]*x(Percent)?\s*:/gi, alt: "TY-08, ME-09, GX-12" },
  R10: { name: "Cursor blob", re: /cursor-(follower|blob|dot)|mix-blend-mode\s*:\s*difference/gi, alt: "IN-04, MK-02, IN-05, IN-12" },
  R11: { name: "Cortina sólida (reveal)", re: /reveal-(overlay|curtain|block)|scaleX\s*:\s*0[^\n]*transformOrigin/gi, alt: "MK-01, ME-13, SP-08, MK-12" },
  R12: { name: "Tilt 3D de card", re: /vanilla-tilt|tilt\.js|rotateX\s*:\s*-?\d+[^\n]*rotateY/gi, alt: "ME-06, IN-06, GL-05" },
};
const FAMILY_SIGNS = {
  SP: /perspective|preserve-3d|view-transition|rotationX|translateZ/gi,
  TY: /SplitText|font-variation|fontVariationSettings|wdth|wght/gi,
  MK: /clip-path|clipPath|mask-image|maskImage/gi,
  LQ: /feTurbulence|feDisplacementMap|goo|metaball/gi,
  ME: /spring|ratchet|rotateX\(|split-?flap/gi,
  GX: /stroke-dashoffset|strokeDashoffset|DrawSVG|MorphSVG|getContext\(["']2d/gi,
  GL: /getContext\(["']webgl|THREE\.|three|ogl|gl_FragColor|fragmentShader/gi,
  IN: /pointermove|pointerdown|setPointerCapture|deviceorientation/gi,
  IV: /currentTime\s*=|<video|createImageBitmap/gi,
};

const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    if (SKIP.has(f)) continue;
    const p = join(d, f);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (EXT.has(extname(f)) && s.size < 600_000) files.push(p);
  }
};
walk(dir);

const hits = Object.fromEntries(Object.keys(RED).map((k) => [k, []]));
const families = Object.fromEntries(Object.keys(FAMILY_SIGNS).map((k) => [k, 0]));
for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const [code, r] of Object.entries(RED)) {
    for (const m of text.matchAll(r.re)) {
      const line = text.slice(0, m.index).split("\n").length;
      hits[code].push(`${relative(dir, file)}:${line}`);
    }
  }
  for (const [fam, re] of Object.entries(FAMILY_SIGNS)) families[fam] += (text.match(re) ?? []).length;
}

const clicheTotal = Object.values(hits).reduce((s, h) => s + h.length, 0);
const signatureTotal = Object.values(families).reduce((s, n) => s + n, 0);
const ratio = clicheTotal / Math.max(1, clicheTotal + signatureTotal);
const used = Object.entries(families).filter(([, n]) => n > 0).map(([f]) => f);
const unused = Object.keys(FAMILY_SIGNS).filter((f) => !used.includes(f));

if (args.json) {
  console.log(JSON.stringify({ files: files.length, hits, families, ratio, unused }, null, 2));
  process.exit(0);
}
console.log(`Auditoria de motion: ${files.length} arquivos em ${dir}\n`);
for (const [code, r] of Object.entries(RED)) {
  const h = hits[code];
  if (!h.length) continue;
  console.log(`${code.padEnd(4)} ${r.name.padEnd(28)} ${String(h.length).padStart(4)}×   ex.: ${h.slice(0, 3).join(", ")}`);
  console.log(`     substitutos: ${r.alt}`);
}
console.log(`\nSinais de famílias autorais: ${Object.entries(families).map(([f, n]) => `${f} ${n}`).join(" · ")}`);
console.log(`Proporção de clichê: ${(ratio * 100).toFixed(0)}%  (${ratio > 0.5 ? "ALTA: aplique o protocolo de recaída" : ratio > 0.25 ? "média: troque as transições mais visíveis" : "saudável"})`);
console.log(`Famílias ainda não exploradas: ${unused.join(", ") || "nenhuma"}`);
console.log("\nHeurístico: confirme cada ocorrência no contexto (um fade como tempero de ≤20% é permitido).");
