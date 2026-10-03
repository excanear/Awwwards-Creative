# Awwwards-Creative

Claude Code skill: Creative Direction + Motion Design Engine for award-level section and page transitions.

- `SKILL.md` — the engine (workflow, levels, rules)
- `references/` — content DNA, motion language, invention engine, anti-repetition, continuity, tech, implementation, a11y/perf, QA, case studies
- `library/` — 145 transition concepts in 12 families (`00-index.md`)
- `assets/engine/` — progress-driven transition modules + drivers; lab at `assets/engine/lab/`
- `assets/templates/` — Motion Language, Direction Card, Beat Sheet, Motion Ledger

## Install
Copy (or clone) this folder to `~/.claude/skills/awwwards-creative/`.

## Scripts (Node 18+, no deps)
```
node scripts/catalog.mjs [--cat MK] [--feel tenso] [--id SP-03] [--index]
node scripts/invent.mjs --seed 7 --count 5 --avoid fade,zoom
node scripts/audit-motion.mjs <project-dir>
node scripts/validate.mjs
node scripts/lab.mjs   # http://localhost:4173/assets/engine/lab/
```
