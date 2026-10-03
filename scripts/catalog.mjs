#!/usr/bin/env node
// Query the concept library.
//   node scripts/catalog.mjs                       summary by family
//   node scripts/catalog.mjs --cat MK              concepts of a family
//   node scripts/catalog.mjs --lvl experimental    by level
//   node scripts/catalog.mjs --tech webgl          by technology
//   node scripts/catalog.mjs --feel tenso          by feeling (accent-insensitive, partial)
//   node scripts/catalog.mjs --trig drag           by trigger
//   node scripts/catalog.mjs --mat ink             by material
//   node scripts/catalog.mjs --q "porta"           free text over name + fields
//   node scripts/catalog.mjs --id SP-03            full card
//   node scripts/catalog.mjs --json                machine-readable output (combine with filters)
//   node scripts/catalog.mjs --index               regenerate library/00-index.md
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { FAMILIES, LEVELS, LIBRARY_DIR, loadLibrary, norm, parseArgs } from "./lib/library.mjs";

const args = parseArgs(process.argv.slice(2));
const all = loadLibrary();

const has = (list, needle) => (list ?? []).some((v) => norm(v).includes(norm(needle)));

let list = all;
if (args.cat) list = list.filter((c) => c.family === String(args.cat).toUpperCase());
if (args.lvl) list = list.filter((c) => c.meta.lvl === args.lvl);
if (args.tech) list = list.filter((c) => has(c.meta.tech, args.tech));
if (args.feel) list = list.filter((c) => has(c.meta.feel, args.feel));
if (args.trig) list = list.filter((c) => has(c.meta.trig, args.trig));
if (args.mat) list = list.filter((c) => has(c.meta.mat, args.mat));
if (args.cost) list = list.filter((c) => c.meta.cost === String(args.cost).toUpperCase());
if (args.q) {
  const q = norm(args.q);
  list = list.filter((c) => norm([c.name, ...Object.values(c.fields)].join(" ")).includes(q));
}
if (args.id) list = list.filter((c) => c.id === String(args.id).toUpperCase());

if (args.index) {
  writeFileSync(join(LIBRARY_DIR, "00-index.md"), renderIndex(all));
  console.log(`library/00-index.md written (${all.length} concepts).`);
} else if (args.json) {
  console.log(JSON.stringify(list, null, 2));
} else if (args.id) {
  for (const c of list) printCard(c);
  if (!list.length) console.log(`No concept ${args.id}.`);
} else if (Object.keys(args).length === 1) {
  printSummary(all);
} else {
  for (const c of list) printLine(c);
  console.log(`\n${list.length} concept(s).`);
}

function printLine(c) {
  const m = c.meta;
  console.log(
    `${c.id}  ${c.name.padEnd(34)} ${String(m.lvl).padEnd(12)} ${String(m.cost).padEnd(3)} ${(m.tech ?? []).join(",").padEnd(34)} ${(m.feel ?? []).join(", ")}`,
  );
}

function printCard(c) {
  console.log(`\n${c.id} · ${c.name}   [${FAMILIES[c.family]} · ${c.meta.lvl} · cost ${c.meta.cost}]`);
  for (const [k, v] of Object.entries(c.meta)) console.log(`  ${k.padEnd(5)} ${Array.isArray(v) ? v.join(", ") : v}`);
  console.log("");
  for (const [k, v] of Object.entries(c.fields)) console.log(`  ${k}: ${v}`);
}

function printSummary(concepts) {
  console.log(`Awwwards-Creative library: ${concepts.length} concepts\n`);
  for (const [code, label] of Object.entries(FAMILIES)) {
    const n = concepts.filter((c) => c.family === code).length;
    console.log(`  ${code}  ${label.padEnd(32)} ${n}`);
  }
  console.log("");
  for (const lvl of LEVELS) console.log(`  ${lvl.padEnd(13)} ${concepts.filter((c) => c.meta.lvl === lvl).length}`);
  console.log("\nFilters: --cat --lvl --tech --feel --trig --mat --cost --q --id --json --index");
}

function renderIndex(concepts) {
  const out = [];
  out.push("# Biblioteca de transições: índice");
  out.push("");
  out.push(
    `${concepts.length} conceitos em ${Object.keys(FAMILIES).length} famílias. Gerado por \`node scripts/catalog.mjs --index\`; não edite à mão (edite os arquivos da família e regenere).`,
  );
  out.push("");
  out.push("Como usar: escolha pela **sensação** e pelo **verbo** da Motion Language, não pelo nome. Depois leia o card completo no arquivo da família (ou `node scripts/catalog.mjs --id XX-00`).");
  out.push("");
  out.push("Níveis: `refined` · `premium` · `experimental` · `award` · `art`. Custo: `S` horas · `M` ~1 dia · `L` 2–3 dias · `XL` 3+ dias.");
  out.push("");
  for (const [code, label] of Object.entries(FAMILIES)) {
    const fam = concepts.filter((c) => c.family === code);
    if (!fam.length) continue;
    out.push(`## ${code} · ${label} (${fam.length}) — \`${fam[0].file}\``);
    out.push("");
    out.push("| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |");
    out.push("|---|---|---|---|---|---|---|---|");
    for (const c of fam) {
      const m = c.meta;
      out.push(
        `| ${c.id} | ${c.name} | ${(m.mech ?? []).join(", ")} | ${(m.trig ?? []).join(", ")} | ${m.lvl} | ${m.cost} | ${(m.tech ?? []).join(", ")} | ${(m.feel ?? []).join(", ")} |`,
      );
    }
    out.push("");
  }
  out.push("## Por sensação (atalhos)");
  out.push("");
  const feelings = new Map();
  for (const c of concepts) for (const f of c.meta.feel ?? []) feelings.set(f, [...(feelings.get(f) ?? []), c.id]);
  const top = [...feelings.entries()].filter(([, ids]) => ids.length >= 3).sort((a, b) => b[1].length - a[1].length);
  for (const [f, ids] of top) out.push(`- **${f}**: ${ids.join(", ")}`);
  out.push("");
  return out.join("\n");
}
