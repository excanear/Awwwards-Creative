#!/usr/bin/env node
// Invention seeds: combines the 6 axes, 12 operators and two library concepts from distant
// families into prompts the director then judges (protocol in references/04-invention-engine.md).
//   node scripts/invent.mjs [--seed 7] [--count 5] [--avoid fade,zoom,MK] [--feel "precisão"] [--level award]
import { FAMILIES, loadLibrary, norm, parseArgs, rng } from "./lib/library.mjs";

const args = parseArgs(process.argv.slice(2));
const rand = rng(Number(args.seed ?? Date.now() % 100000));
const count = Number(args.count ?? 5);
const avoid = String(args.avoid ?? "").split(",").map((s) => norm(s.trim())).filter(Boolean);
const pickOne = (list) => list[Math.floor(rand() * list.length)];

const AXES = {
  mecanismo: ["máscara/clip", "deslocamento (displace)", "dobra/dobradiça", "morph", "decomposição em partes", "quantização", "revelação por luz", "física", "re-layout (Flip)", "movimento de câmera", "traço/desenho", "substituição no lugar (flap)", "manipulação do tempo"],
  material: ["papel", "vidro", "tinta", "metal", "tecido", "luz", "líquido", "fumaça", "areia", "pixel", "tipo de chumbo", "filme fotográfico", "pedra", "sombra", "dado"],
  trigger: ["scroll scrub", "limiar de scroll", "clique", "hover", "arrastar", "segurar", "velocidade do scroll", "tempo ocioso", "posição do cursor", "inclinação do aparelho", "troca de rota", "evento de dado"],
  geometria: ["ponto do clique", "linha/eixo", "borda", "glifo/símbolo da marca", "grade", "objeto do conteúdo", "radial", "diagonal", "profundidade z", "caminho (path)"],
  agente: ["o usuário", "um objeto da cena", "o próprio dado", "o símbolo da marca", "o tempo", "um personagem", "a interface do navegador", "a gravidade"],
  ritmo: ["corte seco", "staccato", "legato", "acelerando", "desacelerando", "respiração presa", "scrub reversível", "rewind", "câmera lenta", "timelapse"],
};
const OPERATORS = ["TRANSPLANTAR", "MATERIALIZAR", "INVERTER CAUSA", "MUDAR ESCALA", "FRACIONAR", "FUNDIR", "RESTRINGIR", "TEMPORALIZAR", "QUEBRAR A MOLDURA", "DADO VERDADEIRO", "PERSONIFICAR", "SINESTESIA"];

// 1 = neighbours, 3 = distant. Symmetric. Order: SP CI TY MK LQ ME DG IV GX GL IN NX.
const CODES = Object.keys(FAMILIES);
const DISTANCE = [
  [0, 1, 2, 1, 3, 2, 3, 2, 2, 1, 2, 2],
  [1, 0, 2, 1, 2, 2, 1, 1, 2, 2, 2, 1],
  [2, 2, 0, 1, 3, 2, 2, 2, 2, 3, 2, 1],
  [1, 1, 1, 0, 1, 2, 2, 1, 2, 2, 1, 2],
  [3, 2, 3, 1, 0, 3, 2, 2, 1, 1, 2, 2],
  [2, 2, 2, 2, 3, 0, 3, 2, 2, 2, 1, 2],
  [3, 1, 2, 2, 2, 3, 0, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 2, 1, 0, 2, 1, 2, 2],
  [2, 2, 2, 2, 1, 2, 2, 2, 0, 1, 2, 1],
  [1, 2, 3, 2, 1, 2, 1, 1, 1, 0, 2, 2],
  [2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 0, 2],
  [2, 1, 1, 2, 2, 2, 2, 2, 1, 2, 2, 0],
];
const dist = (a, b) => DISTANCE[CODES.indexOf(a)][CODES.indexOf(b)];

const RED = ["fade", "zoom", "scale", "slide", "blur", "parallax"];
const blocked = (s) => avoid.some((a) => norm(s).includes(a));
let concepts = loadLibrary().filter((c) => !avoid.includes(norm(c.family)) && !blocked(c.name) && !(c.meta.mech ?? []).some(blocked));
if (args.feel) {
  const f = norm(args.feel);
  const matching = concepts.filter((c) => (c.meta.feel ?? []).some((x) => f.split(/[ ,]+/).some((w) => w && norm(x).includes(w))));
  if (matching.length) concepts = matching.concat(concepts.filter((c) => !matching.includes(c)).slice(0, 20));
}
if (args.level) {
  const order = ["refined", "premium", "experimental", "award", "art"];
  const min = order.indexOf(args.level);
  if (min >= 0) concepts = concepts.filter((c) => order.indexOf(c.meta.lvl) >= Math.max(0, min - 1));
}

console.log(`Sementes de invenção${args.seed ? ` (seed ${args.seed})` : ""}${avoid.length ? ` · evitando: ${avoid.join(", ")}` : ""}\n`);
for (let i = 0; i < count; i++) {
  const a = pickOne(concepts);
  const far = concepts.filter((c) => dist(a.family, c.family) >= 2 && c.id !== a.id);
  const b = pickOne(far.length ? far : concepts);
  const ops = [];
  while (ops.length < 2) {
    const o = pickOne(OPERATORS);
    if (!ops.includes(o)) ops.push(o);
  }
  const axis = pickOne(Object.keys(AXES));
  const value = pickOne(AXES[axis].filter((v) => !blocked(v) && !RED.some((r) => norm(v).includes(r))));
  console.log(`${i + 1}. ${a.id} ${a.name}  ×  ${b.id} ${b.name}   [distância ${dist(a.family, b.family)}]`);
  console.log(`   mecanismo de ${a.id}: ${(a.meta.mech ?? []).join(", ")} · material/geometria de ${b.id}: ${(b.meta.mat ?? []).join(", ")} / ${(b.meta.geo ?? []).join(", ")}`);
  console.log(`   operadores: ${ops.join(" + ")} · eixo distante: ${axis} = "${value}"`);
  console.log(`   frase-semente: "${(a.meta.mech ?? [""])[0]} feito de ${(b.meta.mat ?? [""])[0]}, ${axis} ${value}, ${ops[0].toLowerCase()} e ${ops[1].toLowerCase()}"`);
  console.log(`   agora: teste do conteúdo → novidade → legibilidade → nome → beat sheet (04-invention-engine.md §3)\n`);
}
