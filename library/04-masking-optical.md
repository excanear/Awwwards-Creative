# MK · Masking / Clipping / Optical

Revelar é a operação mais comum da web e a mais mal feita (fade, cortina sólida). Aqui a revelação tem **ótica**: luz, lente, recorte, sombra, química. O que revela diz algo sobre o que é revelado.

---

### MK-01 · Persianas
`fam:masking` `mech:slat-mask` `mat:wood,metal,light` `trig:scroll,click` `geo:parallel-strips` `lvl:refined` `cost:S` `tech:css,gsap` `feel:arquitetônico,rítmico,preciso`
- **Conceito:** a próxima seção aparece através de lâminas paralelas que se abrem (ou giram) como persianas; a luz entra em faixas antes de a imagem completar.
- **Sensação:** ritmo, abrir um ambiente, luz do dia.
- **Aplicação:** arquitetura, interiores, hotelaria, transições sóbrias.
- **Composição & layering:** `to` por cima com `mask-image: repeating-linear-gradient` cuja largura visível cresce de 0 a 100% da lâmina; ângulo da lâmina na Motion Language.
- **Trigger · timing · easing:** clique 900 ms `power2.inOut`; scrub 1 tela; stagger das lâminas a partir de uma borda (opcional).
- **Entrada → saída:** fendas finas → lâminas abrem → imagem contínua.
- **Combina com:** MK-06, CI-10 · **Evite:** lâminas muito finas (moiré).
- **Mobile:** lâminas mais largas (menos, 6–8). · **Reduced:** troca direta.
- **Performance:** máscara CSS: barata.
- **Implementação:** `assets/engine/transitions/clip-blades.js`.

### MK-02 · Lente
`fam:masking` `mech:circle-clip-follow` `mat:glass,lens` `trig:cursor,click` `geo:cursor-point` `lvl:premium` `cost:S` `tech:css,gsap` `feel:curioso,investigativo,íntimo`
- **Conceito:** o cursor é uma lente que mostra a próxima camada (o raio-x, a versão real, o futuro); clicar expande a lente até a tela inteira.
- **Sensação:** descoberta, investigar por baixo da superfície.
- **Aplicação:** antes/depois, produto por dentro, "por trás" do processo.
- **Composição & layering:** `to` sobre `from` com `clip-path: circle(r at x y)`; anel da lente com leve refração (borda).
- **Trigger · timing · easing:** movimento: `quickTo` 0,25 s; clique: raio → diagonal da tela em 700 ms `power3.inOut`.
- **Entrada → saída:** lente pequena segue → clique → expande a partir do cursor.
- **Combina com:** IN-12, IN-04 · **Evite:** cursor-blob sem conteúdo por baixo (R10).
- **Mobile:** lente parada no centro, arrastável; toque expande. · **Reduced:** botão "ver por dentro" que troca direto.
- **Performance:** clip-path circular: barato.
- **Implementação:** `assets/engine/transitions/cursor-lens.js`.

### MK-03 · Revelação Fotoquímica
`fam:masking` `mech:sweep-develop` `mat:film,cyanotype` `trig:scroll,in-view` `geo:sweep-line` `lvl:premium` `cost:S` `tech:css-property,gsap` `feel:artesanal,técnico,revelação`
- **Conceito:** a imagem chega num estado de prova (cianotipia azul, negativo, sépia, planta) e uma linha varre a tela revelando a versão real em cores por onde passa.
- **Sensação:** algo sendo revelado como foto no laboratório; do projeto ao real.
- **Aplicação:** portfólios (projeto → produção), fotografia, before/after com narrativa.
- **Composição & layering:** duas versões empilhadas (tratada + real); a real com `clip-path: inset(0 calc(100% - var(--reveal)*100%) 0 0)`; a linha da varredura na cor de evento.
- **Trigger · timing · easing:** in-view 1,8 s `ease-in-out`; ou scrub.
- **Entrada → saída:** prova → linha varre → real; a linha some na borda.
- **Combina com:** GX-01, NX-11 · **Evite:** usar como fade com outro nome (precisa da linha e do estado de prova).
- **Mobile:** igual. · **Reduced:** versão real direto (ou prova + real lado a lado).
- **Performance:** `@property --reveal` com transition CSS: zero JS.
- **Implementação:** referência real Guilherme `Revelar.tsx`/`Cianotipia.tsx`; filtro de cianotipia em CSS: `grayscale(1) sepia(1) hue-rotate(180deg) saturate(3)` ou SVG `feColorMatrix`.

### MK-04 · Prisma
`fam:masking` `mech:refracted-slices` `mat:glass,light` `trig:scroll,click` `geo:vertical-slices` `lvl:experimental` `cost:M` `tech:css,gsap,webgl` `feel:luminoso,fragmentado,luxuoso`
- **Conceito:** a tela é vista através de um bloco de vidro canelado: faixas verticais deslocam a imagem em quantidades diferentes; ao trocar a cena, os deslocamentos invertem e a nova imagem "se recompõe".
- **Sensação:** vidro, luz, sofisticação material.
- **Aplicação:** joalheria, perfumaria, arquitetura, tecnologia premium.
- **Composição & layering:** N faixas, cada uma mostrando a imagem com `background-position` deslocado; versão WebGL com refração real.
- **Trigger · timing · easing:** 1 s `sine.inOut`; deslocamento pico no meio.
- **Entrada → saída:** A nítida → faixas deslizam (refração) → no pico, troca a textura → faixas voltam com B.
- **Combina com:** GL-04, MK-06 · **Evite:** faixas iguais (precisa de variação de deslocamento).
- **Mobile:** 6 faixas. · **Reduced:** troca direta.
- **Performance:** CSS com N elementos de background: ok até ~16 faixas.
- **Implementação:** faixas com a mesma imagem em `background-size: cover` e `background-position-x` deslocado por faixa.

### MK-05 · Sombra Primeiro
`fam:masking` `mech:shadow-precede` `mat:light,shadow` `trig:scroll` `geo:offset-projection` `lvl:experimental` `cost:S` `tech:css,gsap` `feel:misterioso,teatral,antecipação`
- **Conceito:** a próxima seção chega primeiro como sombra projetada sobre a atual (alguém ou algo se aproxima), depois o objeto real entra no lugar da sombra.
- **Sensação:** antecipação, suspense, teatro de sombras.
- **Aplicação:** revelação de produto, personagem, lançamento.
- **Composição & layering:** silhueta do elemento de B (mesma forma) com blur e opacidade sobre A; desloca até a posição final; o objeto real assenta em cima.
- **Trigger · timing · easing:** scrub 1 tela; sombra 0–60%, objeto 50–100%.
- **Entrada → saída:** sombra cresce → objeto cobre a sombra → fundo de B entra.
- **Combina com:** CI-03, MK-06 · **Evite:** sombras sem fonte de luz plausível.
- **Mobile:** igual. · **Reduced:** objeto direto.
- **Performance:** silhueta como PNG/SVG com `filter: blur` estático (pré-borrado).
- **Implementação:** silhueta = a imagem com `filter: brightness(0)`.

### MK-06 · Luz que Varre
`fam:masking` `mech:light-sweep` `mat:light` `trig:scroll,click` `geo:beam` `lvl:premium` `cost:S` `tech:css,gsap` `feel:cerimonial,revelação,luxuoso`
- **Conceito:** a cena está no escuro; um feixe de luz (holofote, farol, fresta) varre e só o que ele ilumina existe; ao passar, a próxima seção fica acesa.
- **Sensação:** palco, inspeção, revelação nobre.
- **Aplicação:** lançamentos, automóveis, museus, produtos premium.
- **Composição & layering:** overlay escuro com `mask-image: linear-gradient` (o feixe) móvel; feixe com borda suave + leve bloom.
- **Trigger · timing · easing:** scrub; feixe atravessa em `sine.inOut`; no fim, luz geral sobe.
- **Entrada → saída:** escuro → feixe → luz geral (cor de fundo de B).
- **Combina com:** MK-05, CI-12 · **Evite:** feixe sem sentido de origem (de onde vem a luz?).
- **Mobile:** o feixe segue o scroll vertical. · **Reduced:** cena acesa direto.
- **Performance:** máscara com gradiente: barata.
- **Implementação:** `--beam-x` custom property animada; máscara em gradiente com 3 paradas.

### MK-07 · Recorte por Texto
`fam:masking` `mech:text-knockout` `mat:type,image` `trig:scroll` `geo:glyphs` `lvl:premium` `cost:S` `tech:css,gsap` `feel:monumental,editorial,impacto`
- **Conceito:** a próxima seção é vista através de letras gigantes; as letras crescem até que o espaço dentro delas seja a tela inteira.
- **Sensação:** a palavra contém o mundo.
- **Aplicação:** nomes de lojas/produtos, heros tipográficos, transições de capítulo.
- **Composição & layering:** `background-clip: text` com a imagem/vídeo de B; ou SVG `<mask>` com `<text>` para vídeo.
- **Trigger · timing · easing:** scrub; escala do texto exponencial; origem num ponto da letra mais aberta (o miolo do "O").
- **Entrada → saída:** palavra com a imagem dentro → cresce → imagem em tela cheia.
- **Combina com:** TY-08, TY-01 · **Evite:** fontes finas; usar em todas as seções.
- **Mobile:** palavra mais curta/quebrada em 2 linhas. · **Reduced:** palavra com imagem dentro, estática.
- **Performance:** `background-clip: text` com escala grande pode serrilhar: troque para máscara SVG.
- **Implementação:** escala calculada para que o miolo escolhido cubra o viewport.

### MK-08 · Ladrilhos que Viram
`fam:masking` `mech:tile-flip` `mat:tiles,cards` `trig:click,scroll` `geo:grid-wave` `lvl:premium` `cost:M` `tech:css-3d,gsap` `feel:sistemático,lúdico,mosaico`
- **Conceito:** a tela é uma grade de ladrilhos; cada um vira (rotateY) mostrando no verso o pedaço correspondente da próxima seção, numa onda que parte de um ponto.
- **Sensação:** mosaico, painel de aeroporto, sistema.
- **Aplicação:** grades de produtos, galerias, transições de categoria.
- **Composição & layering:** N×M ladrilhos com frente (A) e verso (B) via `background-position`; onda pela distância ao ponto de origem.
- **Trigger · timing · easing:** clique 1,1 s total; cada ladrilho 450 ms `power2.inOut`; atraso = distância × 0,6 ms/px.
- **Entrada → saída:** origem no clique → onda → B completo.
- **Combina com:** IN-12, ME-02 · **Evite:** ladrilhos com conteúdo de texto (cortes ilegíveis).
- **Mobile:** grade 4×8. · **Reduced:** troca direta.
- **Performance:** ≤ 120 ladrilhos; use imagens, não DOM clonado.
- **Implementação:** gere os ladrilhos a partir de 2 imagens (snapshots ou mídia das seções).

### MK-09 · Fresta
`fam:masking` `mech:crack-open` `mat:light,door` `trig:scroll` `geo:vertical-slit` `lvl:refined` `cost:S` `tech:css,gsap` `feel:íntimo,suspense,convite`
- **Conceito:** uma fresta vertical fina de luz se abre no meio da tela (porta entreaberta), mostra uma tira da próxima seção, e se abre de vez.
- **Sensação:** espiar, convite discreto.
- **Aplicação:** transições suaves de capítulo, abertura de um "por dentro".
- **Composição & layering:** `to` com `clip-path: inset(0 calc(50% - var(--w)/2))`; brilho nas bordas da fresta.
- **Trigger · timing · easing:** scrub; fresta de 0 → 4% (pausa) → 100% em `power3.in`.
- **Entrada → saída:** linha de luz → fresta → abertura total.
- **Combina com:** MK-06, SP-03 · **Evite:** com CI-08 (geometria parecida).
- **Mobile:** fresta horizontal. · **Reduced:** troca direta.
- **Performance:** trivial.
- **Implementação:** custom property `--w` e `inset()`.

### MK-10 · Reflexo
`fam:masking` `mech:mirror-become` `mat:water,glass` `trig:scroll` `geo:horizon-line` `lvl:experimental` `cost:M` `tech:css,gsap,svg-filter` `feel:sereno,onírico,simétrico`
- **Conceito:** a seção ganha um reflexo abaixo de uma linha de horizonte (água, vidro); a câmera desce para dentro do reflexo, que se revela ser a próxima seção (outra imagem, não um espelho).
- **Sensação:** mundo invertido, sonho, outro lado.
- **Aplicação:** hotelaria, bem-estar, arte, dualidades.
- **Composição & layering:** cópia invertida (`scaleY(-1)`) com ondulação (feDisplacementMap leve); conforme desce, o reflexo crossfade para B.
- **Trigger · timing · easing:** scrub 1,5 telas `sine.inOut`.
- **Entrada → saída:** cena + horizonte → reflexo → mergulho → B endireita.
- **Combina com:** LQ-02, LQ-05 · **Evite:** reflexo sem água/superfície no conceito.
- **Mobile:** sem ondulação. · **Reduced:** B direto.
- **Performance:** filtro SVG só no reflexo, área limitada.
- **Implementação:** mídia duplicada; filtro de onda com `feTurbulence` estático e `feDisplacementMap scale` animado.

### MK-11 · Meio-Tom
`fam:masking` `mech:halftone-grow` `mat:print,ink` `trig:scroll,click` `geo:dot-grid` `lvl:premium` `cost:M` `tech:css,canvas` `feel:gráfico,retro,impresso`
- **Conceito:** a próxima seção aparece através de uma retícula de meio-tom: pontos minúsculos crescem até se fundirem numa área contínua.
- **Sensação:** impressão, cartaz, gráfica.
- **Aplicação:** marcas gráficas, música, editorial, pop art.
- **Composição & layering:** máscara de pontos (`radial-gradient` repetido) com raio animado; ou canvas com raio por luminância.
- **Trigger · timing · easing:** 1 s `power2.in` (pontos crescem acelerando); origem opcional por gradiente (pontos maiores perto da origem).
- **Entrada → saída:** pontos → crescem → fundem → B sólida.
- **Combina com:** DG-08, ME-07 · **Evite:** pontos grandes demais no início (vira bolinhas).
- **Mobile:** retícula maior. · **Reduced:** troca direta.
- **Performance:** máscara CSS barata; canvas para versão por luminância.
- **Implementação:** `mask-image: radial-gradient(circle, #000 var(--r), transparent calc(var(--r) + 0.5px))` com `mask-size` da célula.

### MK-12 · Lâmina Diagonal
`fam:masking` `mech:blade-split` `mat:steel,paper` `trig:click,scroll` `geo:diagonal` `lvl:refined` `cost:S` `tech:css,gsap` `feel:decisivo,afiado,energético`
- **Conceito:** um corte diagonal atravessa a tela; as duas metades de A deslizam ao longo do corte em sentidos opostos, revelando B.
- **Sensação:** decisão, corte limpo.
- **Aplicação:** esportes, moda, mudança brusca de tema.
- **Composição & layering:** dois clones/metades de A com `clip-path: polygon` complementar; linha de corte brilha por 1 frame.
- **Trigger · timing · easing:** clique 700 ms; linha 120 ms → separação `power3.inOut`.
- **Entrada → saída:** corte aparece → metades escorregam → B.
- **Combina com:** CI-04 · **Evite:** com SP-01 (geometria de linha parecida).
- **Mobile:** ângulo mais vertical. · **Reduced:** corte direto.
- **Performance:** dois polígonos.
- **Implementação:** metades como snapshot (imagem) ou o próprio DOM duplicado em seções simples.
