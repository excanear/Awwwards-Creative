# GX · Generative / SVG / Canvas / Particles

O desenho é feito por regras. Transições generativas são únicas a cada visita (com seed controlada), sentem-se vivas e podem ser dirigidas por **dados reais**. São a família mais forte para marcas de tecnologia, ciência, dados e arte.

---

### GX-01 · Traço de Caneta
`fam:generative` `mech:stroke-draw` `mat:ink,line` `trig:scroll,in-view` `geo:path` `lvl:refined` `cost:S` `tech:svg,gsap` `feel:construtivo,preciso,artesanal`
- **Conceito:** as linhas da próxima seção (divisórias, molduras, ícones, diagramas) se desenham com curva de caneta: início firme, fim desacelerando; o conteúdo entra dentro das linhas já desenhadas.
- **Sensação:** construção, desenho técnico, clareza.
- **Aplicação:** quase qualquer site com linguagem de linha; diagramas; tabelas.
- **Composição & layering:** linhas antes do conteúdo; o conteúdo usa o desenho como "moldura que chegou primeiro".
- **Trigger · timing · easing:** 0,8–1,2 s `power1.out` (caneta); scrub em diagramas grandes.
- **Entrada → saída:** papel vazio → linhas → conteúdo encaixa.
- **Combina com:** ME-12, MK-03, NX-01 · **Evite:** desenhar tudo (escolha as linhas estruturais).
- **Mobile:** igual. · **Reduced:** linhas desenhadas.
- **Performance:** `stroke-dashoffset` barato; `pathLength="1"` simplifica.
- **Implementação:** `<path pathLength="1" style="stroke-dasharray:1; stroke-dashoffset: calc(1 - var(--p))">`.

### GX-02 · Morph de Silhueta
`fam:generative` `mech:path-morph` `mat:shape` `trig:scroll,click` `geo:shape-to-shape` `lvl:premium` `cost:M` `tech:svg,gsap-morphsvg` `feel:fluido,inteligente,metamorfose`
- **Conceito:** a forma que define A (logo, ícone, silhueta de produto) se transforma na forma que define B, servindo de máscara ou de moldura no caminho.
- **Sensação:** metamorfose, uma coisa vira outra.
- **Aplicação:** produtos relacionados, evolução, capítulos com ícones.
- **Composição & layering:** a forma é máscara (`clipPath` SVG) da mídia; o morph muda o que é visível.
- **Trigger · timing · easing:** 1 s `power2.inOut`; scrub.
- **Entrada → saída:** forma A → intermediária → forma B como máscara de B.
- **Combina com:** CI-01, SP-03 · **Evite:** formas com topologia muito diferente sem pontos de controle (morph feio).
- **Mobile:** igual. · **Reduced:** forma B direto.
- **Performance:** paths simples.
- **Implementação:** GSAP MorphSVGPlugin (grátis) com `shapeIndex` ajustado.

### GX-03 · Partículas que Formam
`fam:generative` `mech:particle-resample` `mat:dust,light` `trig:scroll,click` `geo:sample-to-sample` `lvl:experimental` `cost:M` `tech:canvas,webgl` `feel:mágico,tecnológico,transformação`
- **Conceito:** o título (ou logo/imagem) de A se desfaz em partículas amostradas da própria forma, que viajam e se reorganizam nos pixels da forma de B.
- **Sensação:** matéria reorganizada, transformação de ideia.
- **Aplicação:** troca de títulos, logos, números (contagem que vira palavra).
- **Composição & layering:** canvas sobre o texto; o texto real escondido só durante a transição.
- **Trigger · timing · easing:** 1,4 s; cada partícula com atraso aleatório (seed) e `power3.inOut`; leve ruído no meio do caminho.
- **Entrada → saída:** texto A → partículas → texto B → o texto DOM reaparece.
- **Combina com:** LQ-10, LQ-07 · **Evite:** texto pequeno (amostragem pobre).
- **Mobile:** 1 500 partículas. · **Reduced:** troca direta.
- **Performance:** typed arrays; até ~6 000 em canvas 2D.
- **Implementação:** `assets/engine/transitions/particles-morph.js`.

### GX-04 · Estilhaço Voronoi
`fam:generative` `mech:voronoi-shatter` `mat:glass,stone` `trig:click` `geo:impact-point` `lvl:experimental` `cost:L` `tech:canvas,webgl` `feel:dramático,ruptura,violento`
- **Conceito:** A se parte em fragmentos Voronoi a partir do ponto de impacto (mais densos perto dele), que caem/voam revelando B.
- **Sensação:** ruptura, quebra de paradigma.
- **Aplicação:** "quebrar o padrão", lançamentos disruptivos, games.
- **Composição & layering:** polígonos com textura de A; física simples (velocidade radial + gravidade + rotação).
- **Trigger · timing · easing:** 1,2 s; impacto 0 ms → trincas 100 ms → queda.
- **Entrada → saída:** trinca → fragmentos → B.
- **Combina com:** GL-08 · **Evite:** em marcas de cuidado/saúde.
- **Mobile:** 30 fragmentos. · **Reduced:** troca direta.
- **Performance:** fragmentos como `clip-path` de uma imagem (≤ 40) ou WebGL.
- **Implementação:** Voronoi com pontos concentrados (d3-delaunay ~5 KB).

### GX-05 · Campo de Pontos
`fam:generative` `mech:dot-field-wave` `mat:grid,light` `trig:scroll,cursor` `geo:dot-grid` `lvl:premium` `cost:M` `tech:canvas` `feel:tecnológico,calmo,sistema`
- **Conceito:** uma grade de pontos cobre a tela; uma onda (de tamanho/cor) atravessa a grade e, por onde passa, os pontos mudam para a cor de B e crescem até fundirem.
- **Sensação:** sistema, sensor, dados.
- **Aplicação:** SaaS, IA, dados, fintech (quando há conceito de rede/sensor).
- **Composição & layering:** canvas fixo; raio = f(distância à frente de onda).
- **Trigger · timing · easing:** scrub; frente de onda `sine.inOut`.
- **Entrada → saída:** pontos A → onda → pontos grandes de B → fundem → fundo B.
- **Combina com:** MK-11, GX-10 · **Evite:** fundo de pontos decorativo e permanente.
- **Mobile:** grade mais espaçada. · **Reduced:** fundo B.
- **Performance:** ≤ 4 000 pontos em canvas.
- **Implementação:** loop de pontos com `arc` ou sprites pré-renderizados.

### GX-06 · Campo de Fluxo
`fam:generative` `mech:flow-field-trails` `mat:wind,ink` `trig:scroll` `geo:field` `lvl:experimental` `cost:M` `tech:canvas` `feel:orgânico,generativo,artístico`
- **Conceito:** milhares de linhas curtas seguem um campo de ruído e deixam rastro; a densidade dos rastros pinta a cor de B na tela até cobri-la.
- **Sensação:** vento, correnteza, arte generativa.
- **Aplicação:** marcas de energia, clima, arte, música.
- **Composição & layering:** canvas sem limpar (acúmulo); cor dos rastros = B.
- **Trigger · timing · easing:** scrub; número de agentes ativos cresce com `p`.
- **Entrada → saída:** fios → acumulam → cobrem → B.
- **Combina com:** LQ-06 · **Evite:** em fundos de texto.
- **Mobile:** menos agentes. · **Reduced:** B direto.
- **Performance:** 2 000 agentes em canvas 2D.
- **Implementação:** ângulo = `noise(x*s, y*s) * TAU * 2`.

### GX-07 · Ramificação
`fam:generative` `mech:l-system` `mat:branches,circuits` `trig:scroll` `geo:from-root` `lvl:experimental` `cost:M` `tech:svg,canvas` `feel:crescimento,lógico,natural`
- **Conceito:** uma estrutura de ramificação (árvore, rio, circuito) cresce a partir de um ponto do conteúdo e suas pontas terminam exatamente nos elementos da próxima seção.
- **Sensação:** tudo conectado a uma origem.
- **Aplicação:** genealogia de produtos, organizações, redes, ecossistemas.
- **Composição & layering:** paths com pontas ancoradas nos alvos (cards de B).
- **Trigger · timing · easing:** scrub; profundidade da árvore por `p`.
- **Entrada → saída:** raiz → ramos → pontas acendem os cards.
- **Combina com:** LQ-06, GX-10 · **Evite:** com LQ-06 no mesmo site.
- **Mobile:** ramificação vertical. · **Reduced:** árvore completa.
- **Performance:** pré-gerar.
- **Implementação:** gerar árvore com alvos fixos (algoritmo de colonização de espaço).

### GX-08 · Curvas de Nível
`fam:generative` `mech:isolines-rise` `mat:terrain,map` `trig:scroll` `geo:contours` `lvl:experimental` `cost:M` `tech:canvas,svg` `feel:topográfico,calmo,exploração`
- **Conceito:** linhas topográficas sobem como água num mapa: o nível vai subindo e as áreas abaixo do nível são preenchidas com a cor de B.
- **Sensação:** território, expedição, dados geográficos.
- **Aplicação:** outdoor, turismo, agro, mapas, dados.
- **Composição & layering:** campo de altura (ruído); marching squares para as linhas; preenchimento abaixo do nível.
- **Trigger · timing · easing:** scrub; nível linear.
- **Entrada → saída:** mapa → inundação → B.
- **Combina com:** NX-13 · **Evite:** em marcas sem território.
- **Mobile:** resolução menor. · **Reduced:** mapa estático.
- **Performance:** canvas em meia resolução.
- **Implementação:** shader com `step(level, height)` é mais barato que marching squares.

### GX-09 · Autômato Celular
`fam:generative` `mech:cellular-automaton` `mat:cells,life` `trig:click,scroll` `geo:grid` `lvl:experimental` `cost:M` `tech:canvas,webgl` `feel:científico,vivo,algorítmico`
- **Conceito:** células "vivas" com a cor de B se espalham pela grade segundo regras (Game of Life com semeadura direcionada), até tomar a tela.
- **Sensação:** vida artificial, contágio, crescimento.
- **Aplicação:** biotech, ciência, games, IA.
- **Composição & layering:** grade de células 6–10 px; regras ajustadas para crescer (B3/S12345).
- **Trigger · timing · easing:** 1,5 s; ~25 gerações.
- **Entrada → saída:** sementes → colônia → tela coberta → B.
- **Combina com:** DG-08 · **Evite:** células pequenas demais.
- **Mobile:** células maiores. · **Reduced:** B direto.
- **Performance:** WebGL ping-pong ou canvas com `Uint8Array`.
- **Implementação:** semente no ponto do clique; força término com preenchimento em 100%.

### GX-10 · Constelação
`fam:generative` `mech:graph-connect` `mat:nodes,network` `trig:scroll` `geo:graph` `lvl:premium` `cost:M` `tech:svg,canvas` `feel:inteligente,conectado,sistêmico`
- **Conceito:** os elementos de A viram nós; linhas os conectam e o grafo se reorganiza na estrutura de B (a nova disposição é o layout da próxima seção).
- **Sensação:** rede, relações, inteligência.
- **Aplicação:** segurança, redes, dados, organizações, ecossistemas de produto.
- **Composição & layering:** nós posicionados nos centros dos elementos de A → destino nos de B; arestas desenhadas.
- **Trigger · timing · easing:** scrub; nós viajam com `power2.inOut`, arestas redesenham.
- **Entrada → saída:** conteúdo A → nós → grafo → conteúdo B nos nós.
- **Combina com:** GX-12, GX-07 · **Evite:** fundo de rede decorativo (clichê de "tech").
- **Mobile:** menos nós. · **Reduced:** layout final.
- **Performance:** ≤ 60 nós.
- **Implementação:** posições medidas; arestas por proximidade ou dados reais.

### GX-11 · Ladrilhos Truchet
`fam:generative` `mech:tile-rotate-pattern` `mat:tiles,pattern` `trig:click,scroll` `geo:grid-wave` `lvl:experimental` `cost:M` `tech:svg,canvas` `feel:gráfico,ornamental,lúdico`
- **Conceito:** a tela é coberta por ladrilhos Truchet (quartos de círculo) cuja rotação forma padrões; uma onda gira os ladrilhos até o padrão formar a silhueta/palavra de B, e então a cor se fecha.
- **Sensação:** padrão, ornamento, azulejo.
- **Aplicação:** marcas de padronagem (tecido, cerâmica, azulejo), cultura.
- **Composição & layering:** grade de ladrilhos SVG; rotação alvo por máscara da forma B.
- **Trigger · timing · easing:** 1,2 s; cada ladrilho 300 ms `back.out`.
- **Entrada → saída:** padrão A → onda gira → padrão revela forma B → preenche.
- **Combina com:** MK-08 · **Evite:** com MK-08 em sequência.
- **Mobile:** ladrilhos maiores. · **Reduced:** padrão final.
- **Performance:** ≤ 600 ladrilhos (canvas acima disso).
- **Implementação:** rotação ∈ {0,90,180,270} definida por amostragem da forma.

### GX-12 · Artefato Verdadeiro
`fam:generative` `mech:real-data-stream` `mat:data` `trig:scroll,event` `geo:stream` `lvl:art` `cost:M` `tech:js,svg,canvas` `feel:autêntico,técnico,revelador`
- **Conceito:** a transição é feita com o **dado real** do próprio site/marca: o hexdump do texto que o usuário digitou, o log real da requisição, as coordenadas reais da loja, a contagem real de itens; o fluxo de dados "vira" a próxima seção.
- **Sensação:** honestidade, profundidade, "isso é real".
- **Aplicação:** segurança, engenharia, dados, jornalismo, ciência.
- **Composição & layering:** fonte mono; o dado flui (linhas que entram) e converge no conteúdo de B.
- **Trigger · timing · easing:** scrub ou evento; ritmo de terminal (linhas por batida).
- **Entrada → saída:** ação do usuário → dado real → transformação → B.
- **Combina com:** SP-06, TY-15, NX-01 · **Evite:** dado falso com cara de real (marque "ilustrativo" quando for).
- **Mobile:** menos linhas. · **Reduced:** o dado final como bloco legível.
- **Performance:** texto.
- **Implementação:** gere o artefato a partir do conteúdo (ex.: `TextEncoder` → hex); referência: escanearcplx.
