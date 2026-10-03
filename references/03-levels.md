# 03 · Níveis: Refined → Premium → Experimental → Award-Level → Art Direction

O nível não é "quantidade de efeito". É **quanto do significado o movimento carrega**. Cada nível inclui as exigências dos anteriores.

## Refined
**Meta:** o movimento é correto e invisível como técnica. Nada distrai, nada é genérico.
- Uma curva, uma escala de duração, stagger consistente.
- Transições curtas, com origem física (nada surge do nada; tudo vem de algum lugar).
- Mesmo aqui, sem fade-up padrão: prefira máscara de linha (texto sobe de dentro de uma linha), clip-path, wipe com direção de leitura.
- **Tech:** CSS transitions, WAAPI, View Transitions API, CSS scroll-driven animations.
- **Aceite:** 0 jank, reduced-motion completo, LCP intocado, consistência de 100%.
- **Conceitos típicos:** TY-07, MK-01, MK-12, SP-07, IN-10, CI-06.

## Premium
**Meta:** coreografia em camadas e um detalhe-assinatura que o usuário lembra.
- Camadas com tempos diferentes (fundo atrasa, frente adianta: overlap de 20–40%).
- Handoffs exatos entre seções (cor/forma/posição).
- Um elemento da marca participa das transições (o símbolo).
- **Tech:** GSAP + ScrollTrigger + Lenis, SVG (stroke, máscaras), clip-path, Flip, SplitText.
- **Aceite:** handoff medido quadro a quadro; mobile recomposto; ida e volta perfeitas.
- **Conceitos típicos:** SP-03, TY-02, TY-03, ME-06, MK-03, GX-01, CI-01.

## Experimental
**Meta:** um mecanismo inesperado ou um material simulado; pelo menos uma transição **inventada**.
- Uso de operadores de invenção (`04-invention-engine.md`): transplantar, materializar, inverter causalidade.
- Material com comportamento (tinta escorre, vidro refrata, papel dobra com verso).
- **Tech:** Canvas 2D, filtros SVG (`feTurbulence`, `feDisplacementMap`), física simples (verlet, springs), shaders pontuais.
- **Aceite:** o mecanismo continua legível (o usuário entende onde está); fallback leve no mobile.
- **Conceitos típicos:** LQ-01, LQ-03, DG-08, GX-03, ME-05, IN-01, SP-08.

## Award-Level
**Meta:** um conceito governa o site inteiro; cada transição é uma frase da mesma língua; existe um **momento compartilhável** (o quadro que vira GIF).
- Motion Language completa, verbos com significado fixo.
- Curva de energia desenhada (`06-continuity.md`), rima de abertura e fechamento.
- Page transitions coerentes com as de seção (o mesmo verbo entre páginas).
- Detalhes que o júri procura: 404 própria, sequência de entrada curta e pulável, cursor/microinterações próprias, OG desenhada.
- **Tech:** cenas longas fixas, WebGL pontual onde o material pede, View Transitions entre rotas.
- **Aceite:** média estimada ≥ 8 nos critérios do júri (design 40%, usabilidade 20%, criatividade 20%, conteúdo 20%); Lighthouse mobile ≥ 85, LCP < 1.5 s.
- **Conceitos típicos:** TY-01, SP-01, SP-06, NX-06, NX-11, GL-01, GL-02.

## Art Direction
**Meta:** o movimento **é** o conteúdo. Não dá para separar a animação da mensagem.
- Artefatos verdadeiros animados (dados reais, medidas reais, a requisição real, o horário real).
- O site muda de **estado do mundo** (protótipo → produção, dia → noite, rua → casa).
- O objeto-mestre aparece em todas as escalas: transição, cursor, 404, loader, OG, favicon.
- Tecnologia some: ninguém pergunta "como fizeram", perguntam "como pensaram".
- **Aceite:** um leigo explica o conceito depois de rolar uma vez; cada transição sobrevive à pergunta "por que assim?".
- **Conceitos típicos:** NX-01, NX-07, GX-12, TY-04, CI-09, NX-12.

## Escolhendo o nível

| Sinal | Nível sugerido |
|---|---|
| E-commerce com pressa, catálogo grande | Refined/Premium nas listas, Award só no hero e nas viradas |
| Institucional sóbrio (banco, jurídico, saúde) | Premium com rigor; Experimental só em material seguro (luz, papel) |
| Portfólio, estúdio, lançamento, campanha | Award-Level ou Art Direction |
| Sem fotos/vídeos bons | Tipografia e dados verdadeiros (TY, NX, GX): o nível sobe sem mídia |
| Prazo curto | Premium bem feito > Experimental quebrado |

Em um mesmo site os níveis variam: listas e formulários ficam em Refined; viradas de ato sobem para Award. **Contraste de nível é ritmo.**

## Orçamento por nível (por transição)

| Nível | JS adicional | Tempo de dev | Risco mobile |
|---|---|---|---|
| Refined | 0–5 KB | horas | nenhum |
| Premium | GSAP já carregado | 0,5–1 dia | baixo |
| Experimental | +5–20 KB, canvas | 1–2 dias | médio (fallback) |
| Award-Level | WebGL leve (raw/OGL, ~10–30 KB) | 2–4 dias | médio/alto |
| Art Direction | depende do artefato | 3+ dias | exige versão própria |
