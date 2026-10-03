# 09 · Mobile, touch, acessibilidade, reduced-motion e performance

## 1. Mobile: recompor, não encolher

A versão mobile mantém **a ideia** e muda **a composição e o gatilho**.

| Desktop | Mobile |
|---|---|
| scroll scrub longo (3+ telas) | trilho menor (60–75%), batidas mais curtas |
| hover revela | toque revela; ou o item no centro da tela é o "hover" |
| cursor como lente/lanterna | o dedo arrastando, ou a inclinação do aparelho (com permissão, iOS) |
| corredor horizontal (pin + x) | pilha vertical, ou swipe horizontal nativo com `scroll-snap` |
| WebGL em tela cheia | WebGL a meia resolução, ou fallback em CSS/canvas |
| composição em largura (lado a lado) | composição em altura (em cima/embaixo), objeto-mestre ocupando a tela |
| clique + view transition | o mesmo, com área de toque ≥ 44 px |

Regras de toque:
- Nunca sequestre o scroll vertical no toque (sem Lenis, sem `preventDefault` em `touchmove` vertical).
- Gestos horizontais (swipe) só onde o usuário espera (carrosséis, cartas), com `touch-action: pan-y` no contêiner.
- Arrastar com limiar: abaixo de 30–40% volta com mola; acima completa. Velocidade alta completa mesmo com pouca distância.
- Feedback imediato no `pointerdown` (≤ 100 ms).
- Teste em aparelho real ou emulação com CPU 4× lenta.

## 2. Reduced-motion: uma versão, não um desligamento

Com `prefers-reduced-motion: reduce` (ou `?motion=reduce` / `<html data-motion="reduce">` para testar):

- **Nada se desloca, gira, escala ou pisca.** Permitido: troca de opacidade curta (≤ 200 ms), mudança de cor, estado final direto.
- **O significado sobrevive:** se a transição era "a tinta tinge a próxima seção", o fundo da próxima já é a cor da tinta; se era "a cota mede o nome", a cota aparece já desenhada com a medida.
- Cenas fixas viram blocos no fluxo normal, cada batida no seu estado final, em ordem.
- Vídeos não tocam sozinhos; não são baixados se não forem conteúdo.
- GSAP/Lenis/WebGL não carregam.
- Page transitions: navegação normal ou crossfade curto.

No código: `render(1)` direto + `destroy()`; o driver respeita `env.reduced` automaticamente (ver `core/drive.js`).

## 3. Acessibilidade

- Conteúdo real sempre no DOM, legível, na ordem certa; efeitos são camadas `aria-hidden`.
- Foco de teclado: após uma page transition, foco no `<h1>` ou no `main` da página nova; após abrir algo, foco dentro; ao fechar, foco volta ao gatilho.
- Nada que pisque mais de 3 vezes por segundo (glitch, strobe): limite de segurança contra fotossensibilidade.
- Contraste medido **durante** a transição nos quadros em que há texto legível sobre fundo em mudança.
- Interações por cursor (lente, lanterna, arrastar) têm alternativa por teclado/clique.
- Som: desligado por padrão, com controle visível.
- Auto-play de movimento com mais de 5 s precisa de pausa (WCAG 2.2.2).

## 4. Performance: orçamento

| Métrica | Meta |
|---|---|
| LCP | < 1,5 s (observado), hero estático |
| CLS | < 0,05 (trilhos e camadas existem desde a hidratação) |
| INP | < 200 ms |
| Frame | 60 fps no desktop médio; ≥ 50 fps em celular médio |
| JS de motion antes do `load` | 0 KB |
| Main thread por frame de scroll | < 6 ms |

Regras:
- Anime só `transform`, `opacity`, `clip-path`, `mask-position`, custom properties registradas (`@property`) e uniformes de shader.
- `will-change` só durante a transição (adicione no início, remova no fim).
- Nada de `getBoundingClientRect` dentro do `render(p)`: meça antes.
- Uma única fonte de rAF (o ticker do GSAP, ou o driver). Nada de vários loops.
- Pause tudo fora da tela (IntersectionObserver) e em aba oculta (`visibilitychange`).
- Canvas/WebGL: DPR ≤ 2 (≤ 1,5 em celular), resolução reduzida durante movimento rápido.
- Divida texto (SplitText) perto da hora de usar, não no carregamento.
- Filtros SVG em áreas grandes: teste no Safari; prefira animar a escala do displacement a animar `baseFrequency`.

## 5. Checklist final (por transição)

- [ ] Desktop: ida e volta, rápido e devagar, no meio da transição muda de direção.
- [ ] Mobile: toque, swipe, rotação de tela, barra de endereço aparecendo/sumindo.
- [ ] Reduced-motion: significado preservado, nada se move.
- [ ] Sem JS: conteúdo completo e legível.
- [ ] Teclado: tudo acessível, foco visível, ordem lógica.
- [ ] Console sem erros e avisos.
- [ ] Performance: sem long tasks > 50 ms durante a transição (Performance panel).
- [ ] Costuras: 0 px de vazamento medido em quadros capturados.
