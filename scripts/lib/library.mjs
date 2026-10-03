// Parses the concept library (library/*.md) into structured records.
// Format of a concept:
//   ### SP-01 · Name
//   `fam:spatial` `mech:clip-line` `trig:click,route` ...
//   - **Conceito:** ...
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const LIBRARY_DIR = join(ROOT, "library");

export const FAMILIES = {
  SP: "Spatial / Architectural",
  CI: "Cinematic",
  TY: "Typographic / Editorial",
  MK: "Masking / Optical",
  LQ: "Liquid / Organic / Atmospheric",
  ME: "Mechanical / Physical",
  DG: "Distortion / Glitch",
  IV: "Image / Video",
  GX: "Generative / SVG / Canvas",
  GL: "WebGL / 3D",
  IN: "Interaction-driven",
  NX: "Narrative / Experimental",
};

export const LEVELS = ["refined", "premium", "experimental", "award", "art"];

/** Fields every concept must document (label as written in the markdown). */
export const REQUIRED_FIELDS = [
  "Conceito",
  "Sensação",
  "Aplicação",
  "Composição & layering",
  "Trigger · timing · easing",
  "Entrada → saída",
  "Combina com",
  "Mobile",
  "Performance",
  "Implementação",
];

const LIST_KEYS = new Set(["mat", "trig", "tech", "feel", "mech", "geo"]);

export function loadLibrary() {
  const files = readdirSync(LIBRARY_DIR)
    .filter((f) => /^\d\d-.+\.md$/.test(f) && !f.startsWith("00-"))
    .sort();
  const concepts = [];
  for (const file of files) {
    const text = readFileSync(join(LIBRARY_DIR, file), "utf8");
    const blocks = text.split(/^### /m).slice(1);
    for (const block of blocks) {
      const lines = block.split(/\r?\n/);
      const head = lines[0].match(/^([A-Z]{2}-\d{2})\s+·\s+(.+?)\s*$/);
      if (!head) continue;
      const [, id, name] = head;
      const meta = {};
      for (const [, key, value] of (lines[1] ?? "").matchAll(/`(\w+):([^`]+)`/g)) {
        meta[key] = LIST_KEYS.has(key) ? value.split(",").map((v) => v.trim()) : value.trim();
      }
      const fields = {};
      for (const line of lines.slice(2)) {
        // A bullet may hold two labelled fields: "- **Mobile:** x · **Reduced:** y"
        if (!line.startsWith("- **")) continue;
        for (const [, label, value] of line.slice(2).matchAll(/\*\*(.+?):\*\*\s*(.*?)(?=\s+·\s+\*\*|$)/g)) {
          fields[label.trim()] = value.trim();
        }
      }
      const refs = [...new Set((fields["Combina com"] ?? "").match(/[A-Z]{2}-\d{2}/g) ?? [])];
      concepts.push({ id, name, family: id.slice(0, 2), file, meta, fields, refs });
    }
  }
  return concepts;
}

export function byId(concepts) {
  return new Map(concepts.map((c) => [c.id, c]));
}

/** Small deterministic PRNG so invention seeds are reproducible. */
export function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1_000_000) / 1_000_000;
  };
}

export function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) args[key] = true;
      else {
        args[key] = next;
        i++;
      }
    } else args._.push(a);
  }
  return args;
}

/** Accent-insensitive lowercase, for matching user words against the library. */
export function norm(s) {
  return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}
