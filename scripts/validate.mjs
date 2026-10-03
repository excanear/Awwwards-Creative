#!/usr/bin/env node
// Integrity check of the skill: every concept complete, ids unique, every id referenced
// anywhere in the skill exists, every engine module referenced exists and exports the contract.
//   node scripts/validate.mjs
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { LEVELS, REQUIRED_FIELDS, ROOT, byId, loadLibrary } from "./lib/library.mjs";

const problems = [];
const concepts = loadLibrary();
const ids = byId(concepts);

// 1. Concepts: unique ids, required meta and fields.
const seen = new Set();
for (const c of concepts) {
  if (seen.has(c.id)) problems.push(`${c.id}: duplicated id`);
  seen.add(c.id);
  for (const key of ["fam", "mech", "mat", "trig", "geo", "lvl", "cost", "tech", "feel"]) {
    if (!c.meta[key]) problems.push(`${c.id}: missing meta \`${key}\``);
  }
  if (c.meta.lvl && !LEVELS.includes(c.meta.lvl)) problems.push(`${c.id}: unknown level ${c.meta.lvl}`);
  if (c.meta.cost && !["S", "M", "L", "XL"].includes(c.meta.cost)) problems.push(`${c.id}: unknown cost ${c.meta.cost}`);
  for (const f of REQUIRED_FIELDS) if (!c.fields[f]) problems.push(`${c.id}: missing field "${f}"`);
  if (!c.fields["Reduced"]) problems.push(`${c.id}: missing field "Reduced"`);
  for (const r of c.refs) if (!ids.has(r)) problems.push(`${c.id}: "Combina com" points to unknown ${r}`);
}

// 2. Every concept id mentioned anywhere in the skill's markdown exists.
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (f === "node_modules" || f.startsWith(".")) return [];
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const docs = walk(ROOT).filter((p) => p.endsWith(".md"));
for (const file of docs) {
  const text = readFileSync(file, "utf8");
  for (const [id] of text.matchAll(/\b(?:SP|CI|TY|MK|LQ|ME|DG|IV|GX|GL|IN|NX)-\d{2}\b/g)) {
    if (!ids.has(id)) problems.push(`${relative(ROOT, file)}: references unknown concept ${id}`);
  }
  // 3. Engine modules referenced in docs exist.
  for (const [, mod] of text.matchAll(/transitions\/([a-z0-9-]+\.js)/g)) {
    if (!existsSync(join(ROOT, "assets", "engine", "transitions", mod))) {
      problems.push(`${relative(ROOT, file)}: references missing module transitions/${mod}`);
    }
  }
}

// 4. Engine modules follow the contract.
const tdir = join(ROOT, "assets", "engine", "transitions");
if (existsSync(tdir)) {
  for (const f of readdirSync(tdir).filter((f) => f.endsWith(".js"))) {
    const src = readFileSync(join(tdir, f), "utf8");
    if (!/export const meta\s*=/.test(src)) problems.push(`transitions/${f}: no \`meta\` export`);
    if (!/export function create\(/.test(src)) problems.push(`transitions/${f}: no \`create\` export`);
    if (!/render\(p\)/.test(src)) problems.push(`transitions/${f}: no render(p)`);
    if (!/destroy\(\)/.test(src)) problems.push(`transitions/${f}: no destroy()`);
    const metaId = src.match(/id:\s*"([A-Z]{2}-\d{2})"/)?.[1];
    if (metaId && !ids.has(metaId)) problems.push(`transitions/${f}: meta id ${metaId} not in library`);
  }
}

const perFamily = {};
for (const c of concepts) perFamily[c.family] = (perFamily[c.family] ?? 0) + 1;
console.log(`${concepts.length} concepts · ${Object.entries(perFamily).map(([k, v]) => `${k} ${v}`).join(" · ")}`);
console.log(`${docs.length} markdown files scanned.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log("  - " + p);
  process.exit(1);
}
console.log("OK: library complete, references resolved, engine modules follow the contract.");
