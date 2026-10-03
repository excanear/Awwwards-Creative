# 08 · Implementação: padrões que funcionam em produção

## 1. A arquitetura: transição = função de progresso

Toda transição desta skill é escrita como **`render(p)`, com `p` de 0 a 1**, sem saber quem a dirige. Quem dirige é um **driver**:

| Driver | Quando | Arquivo |
|---|---|---|
| `play(t, { duration, ease })` | clique, troca de rota, evento | `assets/engine/core/drive.js` |
| `scrub(t, { trigger, start, end })` | preso ao scroll (usa ScrollTrigger se existir; senão, cálculo próprio) | idem |
| `drag(t, { el, axis, distance, threshold })` | arrastar/swipe com limiar e mola de retorno | idem |
| `hold(t, { el, duration })` | pressionar e segurar | idem |

Vantagens: a mesma transição serve ao desktop (scrub), ao mobile (drag/clique), ao reduced-motion (`render(1)` direto) e aos testes (capturas em `p = 0, .25, .5, .75, 1`). E a ida e a volta são gratuitas: `render` é pura em relação a `p`.

Contrato de um módulo (`assets/engine/transitions/*.js`):

```js
export const meta = { id: "MK-01", name: "Persianas", needs: [] }; // needs: ["webgl"], ["svg-filter"]...
export function create(opts) {
  // opts.from / opts.to: elementos; opts.stage: contêiner; mais opções próprias
  // 1. prepara camadas (sem mudar layout visível)
  return {
    render(p) { /* idempotente, só transform/opacity/clip/mask/uniforms */ },
    destroy() { /* remove camadas criadas, limpa estilos inline */ },
  };
}
```

Uso:

```js
import { create } from "./transitions/clip-blades.js";
import { play, scrub } from "./core/drive.js";
const t = create({ from: a, to: b, blades: 9, angle: 90 });
await play(t, { duration: 1.1, ease: LANGUAGE.ease.chapter });   // por clique
// ou: scrub(t, { trigger: track, start: "top top", end: "bottom bottom" });
```

Em React/Next: crie no `useEffect`/`useGSAP` e destrua no cleanup; nunca no render.

## 2. Cena fixa por scroll (o padrão de trilho)

```html
<section data-scene style="--track: 300svh">       <!-- trilho alto: define a duração em telas -->
  <div class="stage">                              <!-- position: sticky; top: 0; height: 100svh -->
    <div data-layer="from">…</div>
    <div data-layer="to">…</div>
  </div>
</section>
```

```css
.js.motion-ok [data-scene] { height: var(--track); }
[data-scene] .stage { position: sticky; top: 0; height: 100svh; overflow: clip; }
```

- `position: sticky` é mais barato e estável que `pin` do GSAP. Use `pin` só quando precisar de pinSpacing dinâmico.
- O comprimento do trilho vive numa **variável CSS em regra fixa**, nunca numa classe utilitária gerada na hora (o CSS do dev server pode não gerar e a cena "pula").
- Sem JS ou com reduced-motion: o trilho não existe; as camadas viram blocos empilhados no fluxo normal.
- `overflow: clip` (não `hidden`) para não quebrar o sticky.

## 3. Timeline de batidas (GSAP)

```js
const tl = gsap.timeline({
  defaults: { ease: "none" },
  scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true },
});
tl.addLabel("abertura")
  .to({}, { duration: 0.6 })                                // pausa de leitura
  .add(() => {}, "antecipacao")
  .to(proxy, { p: 1, duration: 1, onUpdate: () => t.render(proxy.p) }, "acao")
  .to({}, { duration: 0.4 });                               // assentamento
```

- `ease: "none"` dentro do scrub: o easing de cada camada é aplicado **dentro** do `render(p)` (cada camada lê `p` através da sua própria curva). Assim o scroll fica linear e a sensação, desenhada.
- Camadas com atraso: `pLayer = clamp((p - start) / (end - start))` e então `ease(pLayer)`. O helper `segment(p, start, end, ease)` está em `core/ease.js`.

## 4. Overlap e camadas

Transições premium sobrepõem camadas: o fundo começa antes, a frente termina depois.

```
p:      0 ────── .2 ────── .4 ────── .6 ────── .8 ────── 1
fundo   ███████████████████████████
meio              █████████████████████████
frente                      ████████████████████████████
UI/nav                                          ██████████  (troca de tema no quadro exato)
```

Regra prática: 20–40% de sobreposição entre camadas vizinhas; a UI (navbar, cursor) muda no instante em que a cor dominante muda (via `data-nav-theme` + observer).

## 5. Medidas e refresh

- Geometria que depende do layout (centro de um glifo, escala final de um zoom, posição de um card) é medida em `ScrollTrigger.addEventListener("refreshInit", measure)` ou no `resize` com debounce.
- Meça com `offsetLeft/Top` (ignoram transforms) ou remova transforms antes de `getBoundingClientRect`.
- Zoom extremo (60×–400×): arredonde a origem para pixel inteiro; meio pixel vira dezenas de pixels de deriva.
- Medir glifos: desenhe o texto num canvas com a mesma fonte e leia a linha de pixels (ver `transitions/glyph-dive.js`). Espere `document.fonts.ready`.

## 6. Page transitions (View Transitions)

```js
function navigate(href, mode) {
  if (!document.startViewTransition || reduced) return location.assign(href);
  document.documentElement.dataset.transition = mode;           // CSS escolhe a coreografia
  const vt = document.startViewTransition(() => router.push(href) /* resolva quando a rota montar */);
  vt.finished.finally(() => delete document.documentElement.dataset.transition);
}
```

```css
html[data-transition="cut"]::view-transition-old(root) { animation: cut-close 0.6s var(--ease-chapter) both; }
html[data-transition="cut"]::view-transition-new(root) { animation: cut-open 0.7s var(--ease-chapter) 0.15s both; }
@keyframes cut-close { to { clip-path: inset(var(--cut-y) 0 calc(100% - var(--cut-y)) 0); } }
@keyframes cut-open { from { clip-path: inset(var(--cut-y) 0 calc(100% - var(--cut-y)) 0); } }
```

- Elementos compartilhados: `view-transition-name: porta-<slug>` na origem e no destino (únicos por página).
- No Next.js App Router: resolva a promessa do update quando o `pathname` mudar (`useEffect` no pathname), com timeout de segurança.
- Intercepte só cliques simples, mesma origem, sem `target`, sem modificador. Ver `transitions/section-cut.js`.

## 7. WebGL pontual

- Um `<canvas>` posicionado sobre a cena, criado na aproximação, destruído longe.
- Texturas a partir de `<img>` já carregadas (mesma origem ou CORS liberado) ou de um canvas 2D desenhado com o conteúdo.
- O shader recebe `uProgress` (o `p`), `uResolution`, `uTime` (opcional) e as texturas. O `render(p)` só atualiza uniformes e desenha um quad.
- `webglcontextlost` → remova o canvas e mostre o estado final em DOM.
- DPR limitado a 1,5–2; em celular, metade da resolução e shader simplificado.

## 8. Texto e acessibilidade em transições tipográficas

- Texto dividido (SplitText ou manual) mantém o texto original acessível: `aria-label` no pai com o texto completo e filhos `aria-hidden`, ou o SplitText com `aria: "auto"`.
- Partículas, canvas e SVG decorativos: `aria-hidden="true"`; o conteúdo real fica no DOM.
- Nunca deixe o conteúdo invisível ao fim: o estado final é sempre o DOM legível.

## 9. Interrupção e estado

- Um `busy` por transição de clique; novo clique durante a animação vai para o destino final (ou é ignorado se for o mesmo destino).
- Scroll durante uma transição por clique: deixe o driver terminar em ≤ 300 ms (acelere) em vez de travar o scroll.
- `destroy()` sempre restaura: nenhum estilo inline sobrando, nenhum nó extra no DOM.

## 10. Armadilhas registradas

- Animação de entrada no título do LCP atrasa FCP/LCP: o hero é estático no primeiro quadro.
- Fonte usada no elemento LCP sem preload re-registra o LCP na troca de fonte.
- `100vh` no celular inclui a barra escondida: use `svh`/`dvh` ou pixels de `innerHeight` medidos.
- `transform` num ancestral quebra `position: fixed` e `sticky` dos filhos.
- `backdrop-filter` e filtros SVG grandes custam caro no Safari: limite a área.
- Trocou uma imagem? Mude o nome do arquivo (o otimizador de imagem do Next cacheia pelo nome).
- `ScrollTrigger.refresh()` depois de `document.fonts.ready` e depois de imagens que mudam layout.
- Lenis só em ponteiro fino; no toque, scroll nativo.
