# ME · Mechanical / Physical

Objetos com massa, eixo, atrito e som. Transições mecânicas comunicam **confiabilidade, precisão e ofício**. O segredo está no detalhe físico: o micro-recuo depois do encaixe, a inércia antes do movimento, o clique.

---

### ME-01 · Tambor
`fam:mechanical` `mech:cylinder-rotate` `mat:metal,drum` `trig:scroll` `geo:horizontal-axis` `lvl:premium` `cost:M` `tech:css-3d,gsap` `feel:mecânico,sequencial,preciso`
- **Conceito:** os itens estão na superfície de um cilindro que gira em torno do eixo horizontal; cada item passa pela "janela" frontal e o último revela a próxima seção.
- **Sensação:** máquina de sequência, contador, cofre.
- **Aplicação:** métodos em etapas, listas curtas, números.
- **Composição & layering:** faces com `rotateX(i·θ) translateZ(r)`; janela com sombras em cima/embaixo (a curvatura escurece).
- **Trigger · timing · easing:** scrub com snap por face (0,7 tela cada).
- **Entrada → saída:** tambor entra → gira face a face → última face "trava" e a seção segue.
- **Combina com:** ME-03, TY-11 · **Evite:** com ME-02 na mesma página.
- **Mobile:** igual, menos faces visíveis. · **Reduced:** lista.
- **Performance:** 4–8 faces 3D.
- **Implementação:** referência `direcao-awwwards/assets/templates/cenas/MethodDrum.tsx`.

### ME-02 · Split-Flap
`fam:mechanical` `mech:flap-flip` `mat:metal,plastic` `trig:click,in-view,scroll` `geo:per-char` `lvl:premium` `cost:M` `tech:css-3d,js` `feel:nostálgico,viagem,informação`
- **Conceito:** o texto troca como num painel de aeroporto: cada caractere gira por plaquetas até chegar à letra certa, com o "clac-clac".
- **Sensação:** chegada, partida, informação oficial, viagem.
- **Aplicação:** troca de títulos de seção, datas, números, destinos, horários.
- **Composição & layering:** cada célula com metade superior e inferior; a aba superior cai (rotateX −180°) revelando a próxima letra.
- **Trigger · timing · easing:** 60–80 ms por plaqueta; cada célula percorre o alfabeto entre a letra atual e a alvo (limite de 6–10 passos); `steps` por célula.
- **Entrada → saída:** título A → células giram em cascata → título B.
- **Combina com:** ME-03, TY-11, NX-04 · **Evite:** em textos longos (≤ 30 caracteres).
- **Mobile:** igual. · **Reduced:** troca direta.
- **Performance:** DOM leve; use 1 rAF para todas as células.
- **Implementação:** `assets/engine/transitions/split-flap.js`.

### ME-03 · Catraca
`fam:mechanical` `mech:ratchet-step` `mat:metal,gear` `trig:scroll` `geo:rotary` `lvl:premium` `cost:S` `tech:gsap` `feel:preciso,discreto,confiável`
- **Conceito:** o scroll contínuo é convertido em passos discretos: a cena avança como uma catraca (dente a dente), com micro-recuo após cada clique.
- **Sensação:** controle, confiabilidade, relógio, cofre.
- **Aplicação:** finanças, relógios, ferramentas, métricas.
- **Composição & layering:** o progresso é quantizado: `pq = floor(p·n)/n`, suavizado com overshoot de 2–3 px por dente.
- **Trigger · timing · easing:** scrub; cada dente 180 ms `back.out(2)`.
- **Entrada → saída:** cena avança em dentes → no último, trava e libera a próxima seção.
- **Combina com:** ME-01, ME-02 · **Evite:** em cenas fluidas (contradiz o material).
- **Mobile:** igual. · **Reduced:** estados finais.
- **Performance:** trivial.
- **Implementação:** `quantize(p, steps)` em `core/ease.js` + tween curto ao mudar de dente.

### ME-04 · Gaveta de Arquivo
`fam:mechanical` `mech:drawer-slide` `mat:wood,metal` `trig:scroll,click` `geo:z-out` `lvl:premium` `cost:M` `tech:css-3d,gsap` `feel:documental,organizado,tátil`
- **Conceito:** a seção é uma gaveta: ao terminar, ela se fecha (recua em z com perspectiva de cima) e a gaveta de baixo se abre, trazendo a próxima.
- **Sensação:** arquivo, acervo, organização.
- **Aplicação:** portfólios, acervos, museus, escritórios, documentos.
- **Composição & layering:** gaveta em perspectiva vista de cima; frente com etiqueta (título); conteúdo como fichas em pé.
- **Trigger · timing · easing:** scrub; fechar `power2.in`, abrir `power3.out` com batida de fim de curso (2 px).
- **Entrada → saída:** gaveta A fecha → a câmera desce um nível → gaveta B abre.
- **Combina com:** NX-07, ME-07 · **Evite:** em seções de imagem única.
- **Mobile:** gaveta frontal (sem perspectiva de cima). · **Reduced:** seções com etiqueta.
- **Performance:** 3D leve.
- **Implementação:** `rotateX` na câmera + `z` na gaveta; etiquetas com o dado real (quantidade de itens).

### ME-05 · Gravidade
`fam:physical` `mech:rigid-body-fall` `mat:objects` `trig:scroll-threshold,click` `geo:floor` `lvl:experimental` `cost:L` `tech:js-physics,gsap` `feel:lúdico,caótico,libertador`
- **Conceito:** a gravidade é ligada: os elementos de A caem, quicam e se empilham no rodapé da tela; a próxima seção desce por cima (ou o chão se abre).
- **Sensação:** soltar, liberdade, humor.
- **Aplicação:** fim de lista, 404, marcas lúdicas, "jogue fora o velho".
- **Composição & layering:** elementos viram corpos (caixas) numa simulação simples; DOM segue as posições.
- **Trigger · timing · easing:** física real 1,5–2 s; a próxima seção entra aos 70%.
- **Entrada → saída:** micro-tremor (antecipação) → queda → pilha → B cobre.
- **Combina com:** ME-11, IN-08 · **Evite:** com conteúdo essencial ainda não lido.
- **Mobile:** menos corpos; acelerômetro pode inclinar a gravidade. · **Reduced:** troca direta.
- **Performance:** verlet próprio para < 40 corpos; Matter.js acima disso.
- **Implementação:** `assets/engine/transitions/gravity-drop.js` (verlet com chão e paredes).

### ME-06 · Dobradiça (Aba)
`fam:mechanical` `mech:hinge-swing` `mat:plastic,paper` `trig:scroll,click,drag` `geo:top-hinge` `lvl:premium` `cost:S` `tech:css-3d,gsap` `feel:lúdico,acolhedor,doméstico`
- **Conceito:** o conteúdo está numa aba presa no topo (porta de pet, placa de "aberto/fechado"); mudar de conteúdo é a aba balançar: ela gira, passa o novo conteúdo e oscila até parar.
- **Sensação:** casa, animal, convite, leveza.
- **Aplicação:** troca de itens num palco (raças, produtos), carrosséis com personalidade.
- **Composição & layering:** `transform-origin: top`; `rotateX` com oscilação amortecida; troca do conteúdo no ponto de máxima rotação.
- **Trigger · timing · easing:** clique/arrastar; mola (massa 1, rigidez 120, amortecimento 8); 1 s até parar.
- **Entrada → saída:** antecipação (aba recua) → balança → troca no pico → oscila → para.
- **Combina com:** SP-03, IN-01 · **Evite:** fora de um conceito de porta/placa.
- **Mobile:** swipe controla o ângulo. · **Reduced:** troca direta.
- **Performance:** 1 elemento 3D.
- **Implementação:** spring de `core/ease.js` aplicada ao ângulo.

### ME-07 · Carimbo
`fam:mechanical` `mech:stamp-impact` `mat:ink,rubber` `trig:scroll,click,in-view` `geo:impact-point` `lvl:premium` `cost:S` `tech:css,gsap` `feel:oficial,decisivo,documental`
- **Conceito:** um carimbo desce, bate (a página treme 1–2 px), sobe, e deixa a marca com textura de tinta irregular; a marca valida e libera a próxima seção.
- **Sensação:** aprovado, oficial, decisão tomada.
- **Aplicação:** checkout, contratos, certificações, conclusão de etapa.
- **Composição & layering:** carimbo com sombra que diminui ao descer; a marca usa máscara com textura de tinta.
- **Trigger · timing · easing:** 600 ms: descida `power4.in` 180 ms, impacto 60 ms (tremor da página), subida `power2.out`.
- **Entrada → saída:** sombra cresce → impacto → marca → próxima.
- **Combina com:** SP-07, ME-04 · **Evite:** carimbar tudo (a cada etapa perde força).
- **Mobile:** igual + vibração (`navigator.vibrate(10)`) opcional. · **Reduced:** marca aparece direto.
- **Performance:** trivial.
- **Implementação:** marca com `mask-image` de textura; tremor em `y` ±1,5 px por 2 ciclos.

### ME-08 · Elástico
`fam:physical` `mech:tether-spring` `mat:rubber` `trig:scroll,drag` `geo:edge-tension` `lvl:experimental` `cost:M` `tech:svg,gsap` `feel:lúdico,tenso,resistência`
- **Conceito:** a borda inferior da seção estica como elástico enquanto o usuário rola (resistência); passado o limiar, arrebenta/solta e a próxima seção sobe com o rebote.
- **Sensação:** tensão, recompensa, resistência física.
- **Aplicação:** fim de página, "puxe para ver mais", CTA final.
- **Composição & layering:** borda como path SVG com controle central puxado pelo scroll; a próxima seção ligada ao elástico.
- **Trigger · timing · easing:** scrub até o limiar; depois spring de 600 ms.
- **Entrada → saída:** borda curva para baixo → solta → B sobe com overshoot.
- **Combina com:** IN-01 · **Evite:** em scroll comum (atrapalha a leitura).
- **Mobile:** combina com overscroll do toque. · **Reduced:** borda reta.
- **Performance:** path simples.
- **Implementação:** quadrática `M0,0 Q w/2,k·p w,0`.

### ME-09 · Esteira
`fam:mechanical` `mech:conveyor` `mat:belt,items` `trig:scroll` `geo:path-track` `lvl:premium` `cost:M` `tech:gsap,flip` `feel:produtivo,industrial,abundante`
- **Conceito:** os itens de A seguem numa esteira para fora da tela; a esteira entrega os itens de B, que saem dela para os seus lugares na grade.
- **Sensação:** produção, abundância, processo.
- **Aplicação:** delivery, indústria, e-commerce, logística.
- **Composição & layering:** trilho com textura (roletes) que se move com o scroll; itens presos ao trilho até serem "pegos".
- **Trigger · timing · easing:** scrub; trilho linear (`none`), saída para a grade `power2.out`.
- **Entrada → saída:** itens A saem → itens B chegam → saltam para a grade (Flip).
- **Combina com:** IV-05, ME-11 · **Evite:** marquee disfarçado (R9): a esteira tem que entregar algo.
- **Mobile:** esteira vertical. · **Reduced:** grade final.
- **Performance:** ≤ 20 itens visíveis.
- **Implementação:** itens em `MotionPath` ou `x` linear; Flip da esteira para a grade.

### ME-10 · Sanfona
`fam:mechanical` `mech:accordion-compress` `mat:paper,bellows` `trig:scroll` `geo:vertical-folds` `lvl:experimental` `cost:M` `tech:css-3d,gsap` `feel:compacto,engenhoso,editorial`
- **Conceito:** a seção se comprime em sanfona (dobras alternadas) até virar uma tira fina que se aloja no topo como item de navegação/histórico; a próxima ocupa o espaço.
- **Sensação:** guardar, compactar, memória do percurso.
- **Aplicação:** sites longos com histórico de capítulos, documentação.
- **Composição & layering:** seção em N faixas horizontais com `rotateX` alternado (±); a tira final mostra o título.
- **Trigger · timing · easing:** scrub 1 tela; `power2.inOut`.
- **Entrada → saída:** seção plana → sanfona → tira no topo → próxima.
- **Combina com:** TY-13, SP-08 · **Evite:** com SP-08 em sequência.
- **Mobile:** menos dobras. · **Reduced:** seção normal + item de navegação.
- **Performance:** clones/snapshots por faixa.
- **Implementação:** como `paper-fold.js` com N faixas.

### ME-11 · Ímã
`fam:physical` `mech:attract-to-slots` `mat:metal,filings` `trig:scroll,click` `geo:target-points` `lvl:experimental` `cost:M` `tech:gsap,flip` `feel:ordem,magnético,sistemático`
- **Conceito:** os elementos de A se soltam e são atraídos para os pontos/slots onde ficarão no layout de B, com aceleração de ímã (fraca longe, forte perto) e batida no encaixe.
- **Sensação:** ordem emergindo, atração, sistema.
- **Aplicação:** grades, dashboards, organização de conteúdo.
- **Composição & layering:** Flip com ease customizada (`expo.in`) + encaixe com 2 px.
- **Trigger · timing · easing:** 900 ms; atrasos por distância.
- **Entrada → saída:** elementos flutuam → puxados → encaixam (clique visual).
- **Combina com:** ME-09, TY-10 · **Evite:** com IV-05 (dois sistemas de distribuição).
- **Mobile:** igual. · **Reduced:** layout final.
- **Performance:** Flip.
- **Implementação:** `Flip.from(state, { ease: "expo.in", duration: 0.7 })` + `back.out` curto no fim.

### ME-12 · Plotter
`fam:mechanical` `mech:pen-plot` `mat:ink,paper,line` `trig:scroll,in-view` `geo:pen-path` `lvl:premium` `cost:M` `tech:svg,gsap` `feel:técnico,preciso,construtivo`
- **Conceito:** uma caneta de plotter (visível, pequena) desenha a próxima seção traço a traço, em ordem de máquina (linhas retas, depois curvas, depois hachuras); o preenchimento entra depois.
- **Sensação:** construção, engenharia, desenho técnico.
- **Aplicação:** engenharia, arquitetura, portfólio técnico, diagramas.
- **Composição & layering:** SVG da seção (ou de seu esqueleto); a cabeça da caneta segue o ponto final do traço ativo.
- **Trigger · timing · easing:** scrub; cada traço com curva de caneta (firme e desacelerando: `power1.out`).
- **Entrada → saída:** papel vazio → traços → preenchimento → conteúdo real.
- **Combina com:** GX-01, SP-02, NX-01 · **Evite:** ilustrações complexas (> 60 paths).
- **Mobile:** igual. · **Reduced:** desenho final.
- **Performance:** `stroke-dashoffset`.
- **Implementação:** `getPointAtLength` para posicionar a caneta.

### ME-13 · Cortina de Teatro
`fam:physical` `mech:cloth-pull` `mat:fabric,velvet` `trig:click,scroll` `geo:center-split` `lvl:experimental` `cost:M` `tech:svg,webgl,css` `feel:teatral,cerimonial,espetáculo`
- **Conceito:** duas cortinas de tecido (com dobras) se fecham sobre A e abrem em B; as dobras se acumulam nas bordas e o tecido balança ao parar.
- **Sensação:** espetáculo, estreia, cerimônia.
- **Aplicação:** cultura, teatro, lançamentos, eventos.
- **Composição & layering:** cada cortina como faixa com gradiente de dobras; escala horizontal não uniforme (dobras comprimem perto da borda).
- **Trigger · timing · easing:** fechar 700 ms `power2.in`; segurar 200 ms; abrir 900 ms `power3.out` + balanço.
- **Entrada → saída:** cortinas fecham → troca → abrem.
- **Combina com:** MK-06, CI-10 · **Evite:** cortina sólida lisa (R11).
- **Mobile:** igual. · **Reduced:** troca direta.
- **Performance:** CSS com gradientes de dobra; WebGL para tecido real.
- **Implementação:** dobras via `repeating-linear-gradient` + `scaleX` com origem na borda.
