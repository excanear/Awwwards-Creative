# 07 · Escolha de tecnologia

Regra: **a ferramenta mais leve que entrega a sensação**. O usuário não vê a tecnologia; vê o peso, o atraso e o travamento quando ela é a errada.

## Árvore de decisão

```
A transição é entre ROTAS?
├─ sim → View Transitions API (nomes compartilhados) + GSAP/CSS para o miolo
│        fallback: navegação normal (nunca bloquear)
└─ não ↓
O movimento é PRESO AO SCROLL (scrub)?
├─ sim → é simples (1–2 propriedades, sem pin)? → CSS scroll-driven animations
│                                                  (animation-timeline: view()/scroll())
│        precisa de pin, batidas, medidas, labels? → GSAP ScrollTrigger (+ sticky track)
└─ não (disparado por evento) ↓
É um estado → estado de UI (abrir, trocar, expandir)?
├─ o elemento muda de lugar/tamanho no layout → GSAP Flip / View Transition de elemento
├─ 1–3 propriedades, curto → CSS transition / WAAPI
└─ coreografia com várias camadas → GSAP timeline
O material exige PIXEL A PIXEL (líquido, ruído, refração, dissolução por textura)?
├─ efeito sobre forma vetorial/texto → filtros SVG (feTurbulence + feDisplacementMap) ou máscara SVG
├─ efeito sobre imagem, ≤ 1 por tela, sem 3D → Canvas 2D (ou CSS mask com imagem de ruído)
└─ efeito em tela cheia, 60 fps, com ruído/refração/feedback → WebGL (shader de fragmento)
Precisa de MUITAS PARTÍCULAS (> 2 000) ou geometria 3D real?
├─ partículas 2D → Canvas 2D com typed arrays (até ~5 000), senão WebGL points
└─ cena 3D (malhas, luz, câmera) → Three.js (ou OGL se só planos + shader)
```

## A caixa de ferramentas

| Ferramenta | Use para | Custo | Cuidado |
|---|---|---|---|
| **CSS transitions / keyframes** | microinterações, estados, refined | 0 KB | `@property` para animar custom properties (ex.: `--reveal`) |
| **CSS scroll-driven animations** | reveals presos ao scroll sem pin | 0 KB | suporte: Chromium + Safari 26+; Firefox atrás de flag em 2026: sempre `@supports` |
| **WAAPI** (`el.animate`) | animações por evento sem lib | 0 KB | `finished` promise para encadear; `commitStyles` |
| **View Transitions API** | page transitions, troca de estados com morph de elemento | 0 KB | same-document em todos os navegadores modernos; cross-document só Chromium/Safari; nunca bloqueie a navegação |
| **GSAP core** | timelines, coreografia | ~25 KB gz | registre plugins em um só lugar; `gsap.context()` para limpar |
| **ScrollTrigger** | cenas fixas, scrub, batidas | +~12 KB | `invalidateOnRefresh`, medidas em `refreshInit`, `scrub: 0.4–0.8` |
| **Flip** | re-layout animado (card → hero, grade → lista) | +~5 KB | meça antes e depois do layout no mesmo frame |
| **SplitText** | tipografia cinética por linha/palavra/letra | +~4 KB | divida perto da hora de usar (custa TBT); `aria` preservado; re-split no resize |
| **MorphSVG / DrawSVG** | morph de silhueta, traço | +~5 KB cada | (grátis no GSAP 3.13+) paths com nº de pontos compatível |
| **CustomEase** | curva-assinatura | +~2 KB | uma por site, espelhada em CSS |
| **Lenis** | smooth scroll | ~4 KB | só ponteiro fino; ligado ao ticker do GSAP; nunca no toque |
| **SVG filtros** | tinta, ruído, gooey, displacement em vetor/texto | 0 KB | caro em áreas grandes no Safari; anime o `scale` do displacement, não o `baseFrequency` |
| **Canvas 2D** | dither, pixel sort, partículas médias, máscaras geradas | 0 KB | `devicePixelRatio` limitado a 2; pause fora da tela |
| **WebGL cru** | um shader de transição entre duas texturas | ~3–6 KB seu código | contexto perdido, fallback, 1 contexto por página |
| **OGL** | planos com shader, sem 3D pesado | ~13 KB | menos ecossistema que Three |
| **Three.js** | 3D real, malhas, luz, instancing | ~150 KB+ | só em Award/Art Direction com motivo; carregue sob demanda |
| **Rive / Lottie** | ilustração animada desenhada por designer | 30–80 KB runtime | para personagens e ícones, não para transições de layout |

## Matriz família × tecnologia típica

| Família | Primeira escolha | Quando subir |
|---|---|---|
| SP espacial | CSS 3D (perspective) + GSAP | Three.js se a câmera atravessa geometria real |
| CI cinematográfica | GSAP + clip-path + filtros leves | WebGL para rack focus/whip blur de qualidade |
| TY tipográfica | SplitText + eixos variáveis + clip | canvas para medir glifos; SVG para traço |
| MK máscara/óptica | clip-path, mask-image, SVG mask | WebGL para refração real |
| LQ líquida/orgânica | filtros SVG, metaballs em SVG goo | WebGL com ruído (simplex/curl) |
| ME mecânica | GSAP + CSS 3D + springs | física (verlet própria, Matter.js) só com motivo |
| DG distorção/glitch | canvas, clip em fatias | WebGL para datamosh/feedback |
| IV imagem/vídeo | `<video>` + scrub, clip, Flip | WebGL para displacement entre mídias |
| GX generativo | SVG/canvas | WebGL points acima de ~5 000 partículas |
| GL WebGL/3D | OGL/WebGL cru | Three.js para cena 3D |
| IN interação | Pointer Events + GSAP quickTo | — |
| NX narrativa | o que o artefato pedir | — |

## Regras de carregamento

1. O primeiro quadro **não depende** de JS de motion. HTML/CSS pintam o hero.
2. GSAP/Lenis carregam **depois do `load` + idle** ou no primeiro gesto (scroll/toque/tecla). Com reduced-motion, nem são baixados.
3. WebGL/Three carregam **na aproximação** da cena (IntersectionObserver com margem de 1–2 telas).
4. Cenas são construídas na aproximação e destruídas longe (`gsap.context().revert()`).
5. Um contexto WebGL por página quando possível (um canvas fixo que renderiza a cena ativa).

## Suporte de navegador: sempre com detecção

```js
const canVT = typeof document.startViewTransition === "function";
const canScrollTimeline = CSS.supports("animation-timeline: view()");
const canWebGL = (() => { try { return !!document.createElement("canvas").getContext("webgl"); } catch { return false; } })();
const fine = matchMedia("(pointer: fine)").matches;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
```

Cada transição declara: a versão principal, a versão mobile e o **fallback sem a capacidade** (que nunca é "nada acontece de forma quebrada": é o estado final, limpo).
