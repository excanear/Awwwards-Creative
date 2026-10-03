# LQ · Liquid / Organic / Atmospheric

Materiais que não têm forma fixa: tinta, água, fumaça, névoa, crescimento. Comunicam calor, vida, sensorialidade. Exigem física crível: o líquido escorre para baixo, a névoa não tem bordas duras, o orgânico cresce, não desliza.

---

### LQ-01 · Mancha de Tinta
`fam:liquid` `mech:noise-displaced-mask` `mat:ink` `trig:click,scroll` `geo:point-bleed` `lvl:experimental` `cost:M` `tech:svg-filter,gsap` `feel:artesanal,orgânico,expressivo`
- **Conceito:** uma gota da cor de B cai num ponto e se espalha com borda irregular como tinta em papel absorvente, até cobrir a tela; então B aparece sobre o fundo já tingido.
- **Sensação:** feito à mão, sumi-ê, aquarela, emoção.
- **Aplicação:** marcas artesanais, arte, gastronomia, transições de cor de fundo.
- **Composição & layering:** SVG fixo em tela cheia; círculo com `feTurbulence` + `feDisplacementMap`; o raio cresce; fibras da borda com uma segunda turbulência fina.
- **Trigger · timing · easing:** clique 1,2 s `power2.out` (rápido no começo, absorção lenta); scrub 1 tela.
- **Entrada → saída:** gota (pequeno impacto) → mancha cresce → tela tingida → conteúdo de B.
- **Combina com:** TY-07 (a tinta das palavras escorre), LQ-06 · **Evite:** borda perfeitamente circular (perde o material).
- **Mobile:** turbulência de 1 oitava. · **Reduced:** troca de cor de fundo direta.
- **Performance:** filtro SVG em tela cheia: teste no Safari; reduza `numOctaves`.
- **Implementação:** `assets/engine/transitions/ink-bleed.js`.

### LQ-02 · Maré
`fam:liquid` `mech:wave-path-rise` `mat:water` `trig:scroll` `geo:horizontal-wave` `lvl:premium` `cost:S` `tech:svg,gsap` `feel:sereno,fluido,natural`
- **Conceito:** a próxima seção sobe como maré: uma borda superior ondulada (path SVG com senoides que se movem) atravessa a tela de baixo para cima.
- **Sensação:** fluidez, natureza, calma.
- **Aplicação:** marcas de água, bebidas, bem-estar, oceano, transições suaves.
- **Composição & layering:** `to` com `clip-path: path()` gerado por frame, ou SVG por cima com a cor de B; 2 ondas defasadas (frente/fundo).
- **Trigger · timing · easing:** scrub 1 tela; amplitude máxima no meio, zero nas pontas (assenta plana).
- **Entrada → saída:** ondas na base → sobem → assentam planas no topo.
- **Combina com:** MK-10, LQ-05 · **Evite:** onda de amplitude constante (parece template).
- **Mobile:** menos pontos no path. · **Reduced:** troca direta.
- **Performance:** recalcular path de ~40 pontos por frame: barato.
- **Implementação:** gerar `d` com `y = base + A(p)·sin(kx + ωt)`; `A(p) = sin(πp)·amp`.

### LQ-03 · Metaball (Goo)
`fam:liquid` `mech:gooey-merge` `mat:liquid,mercury` `trig:scroll,click` `geo:blobs` `lvl:experimental` `cost:M` `tech:svg-filter,gsap` `feel:lúdico,orgânico,tátil`
- **Conceito:** bolhas da cor de B sobem/caem e se fundem umas às outras (efeito goo) até virar uma superfície contínua, que é o fundo da próxima seção.
- **Sensação:** viscoso, vivo, divertido.
- **Aplicação:** marcas jovens, bebidas, cosméticos, apps.
- **Composição & layering:** SVG com círculos + filtro `feGaussianBlur` + `feColorMatrix` (alpha contraste alto); círculos crescem e se aproximam.
- **Trigger · timing · easing:** 1,2 s; cada bolha com atraso aleatório (seed fixa) e `power2.inOut`.
- **Entrada → saída:** gotas → fundem → superfície → B.
- **Combina com:** LQ-05, IN-05 · **Evite:** com tons sóbrios/marcas sérias.
- **Mobile:** 8 bolhas. · **Reduced:** troca direta.
- **Performance:** filtro em área grande: limite e prefira canvas com threshold em telas 4K.
- **Implementação:** `assets/engine/transitions/goo-rise.js`.

### LQ-04 · Névoa
`fam:atmospheric` `mech:noise-alpha` `mat:fog,smoke` `trig:scroll` `geo:volume` `lvl:experimental` `cost:M` `tech:webgl,canvas` `feel:misterioso,onírico,silencioso`
- **Conceito:** a névoa entra, engole a cena e se dissipa revelando outra; a dissolução é por ruído (as partes mais "finas" da névoa abrem primeiro).
- **Sensação:** mistério, passagem de tempo, sonho.
- **Aplicação:** turismo, vinhos, cinema, narrativas atmosféricas.
- **Composição & layering:** canvas WebGL com fbm noise; limiar animado por `p`; cor da névoa = média das duas cenas.
- **Trigger · timing · easing:** scrub 1,5 telas; densidade sobe até 50% e cai.
- **Entrada → saída:** névoa entra pelas bordas → cobre → se rasga mostrando B.
- **Combina com:** GL-07, MK-06 · **Evite:** névoa como "blur" (R5).
- **Mobile:** canvas a ¼ da resolução (névoa não precisa de nitidez). · **Reduced:** troca direta.
- **Performance:** shader leve; resolução baixa é invisível neste material.
- **Implementação:** shader `smoothstep(p - 0.1, p + 0.1, fbm(uv*3 + t))` como alpha.

### LQ-05 · Gota e Ondulação
`fam:liquid` `mech:ripple-distort` `mat:water` `trig:click` `geo:click-point` `lvl:experimental` `cost:M` `tech:webgl,svg-filter` `feel:sensorial,calmo,preciso`
- **Conceito:** o clique é uma gota; ondas concêntricas distorcem A a partir do ponto, e na crista da terceira onda B substitui A.
- **Sensação:** toque na água, causa e efeito.
- **Aplicação:** bem-estar, bebidas, botões de entrada, interações de destaque.
- **Composição & layering:** shader de ripple (deslocamento radial senoidal com decaimento) entre duas texturas.
- **Trigger · timing · easing:** clique 1,4 s; raio linear, amplitude `expo.out`.
- **Entrada → saída:** impacto → anéis → troca na passagem do anel → superfície assenta.
- **Combina com:** LQ-02, IN-12 · **Evite:** ripple em cada clique do site.
- **Mobile:** igual (toque). · **Reduced:** troca direta.
- **Performance:** WebGL 1 passe.
- **Implementação:** `transitions/gl-displacement.js` com `mode: "ripple"`.

### LQ-06 · Crescimento
`fam:organic` `mech:branching-growth` `mat:roots,veins` `trig:scroll` `geo:from-seed` `lvl:experimental` `cost:M` `tech:svg,canvas` `feel:vivo,natural,paciente`
- **Conceito:** a partir de uma semente (um ponto, a última letra), linhas orgânicas crescem e se ramificam; quando a malha fica densa, vira a próxima seção.
- **Sensação:** vida, crescimento, ecossistema.
- **Aplicação:** agro, sustentabilidade, saúde, educação, redes.
- **Composição & layering:** paths SVG gerados (L-system ou random walk com seed); stroke animado; preenchimento final.
- **Trigger · timing · easing:** scrub 1,5 telas; crescimento desacelerando (`power2.out`).
- **Entrada → saída:** semente → raízes → malha → B nasce dentro da malha.
- **Combina com:** GX-07, LQ-01 · **Evite:** crescimento sem origem.
- **Mobile:** menos ramos. · **Reduced:** malha final como ilustração.
- **Performance:** pré-gerar paths; animar `stroke-dashoffset`.
- **Implementação:** gerar com seed, `getTotalLength()` cacheado.

### LQ-07 · Vapor
`fam:atmospheric` `mech:curl-particles` `mat:steam,smoke` `trig:scroll,hover` `geo:rising` `lvl:experimental` `cost:L` `tech:webgl,canvas` `feel:calor,sensorial,efêmero`
- **Conceito:** a cena se desfaz em vapor que sobe (partículas seguindo ruído curl), e o vapor se condensa formando a próxima cena acima.
- **Sensação:** calor, café, cozinha, transformação.
- **Aplicação:** gastronomia, café, spa, perfumes.
- **Composição & layering:** partículas amostradas da imagem A sobem com curl noise; cor e alpha decaem.
- **Trigger · timing · easing:** scrub; dissolução por altura (de cima para baixo).
- **Entrada → saída:** A sólida → vapor → B se forma das partículas.
- **Combina com:** GX-03, LQ-04 · **Evite:** em seções com texto essencial (texto vira partícula ilegível).
- **Mobile:** 1 500 partículas. · **Reduced:** troca direta.
- **Performance:** WebGL points; até ~20k no desktop.
- **Implementação:** posições num buffer; curl noise no vertex shader.

### LQ-08 · Derretimento
`fam:liquid` `mech:column-drip` `mat:wax,paint` `trig:scroll` `geo:vertical-columns` `lvl:experimental` `cost:M` `tech:canvas,webgl` `feel:surreal,quente,irônico`
- **Conceito:** a cena derrete: colunas de pixels escorrem para baixo com velocidades diferentes (gotejando), revelando B atrás.
- **Sensação:** calor, surrealismo (Dalí), irreverência.
- **Aplicação:** sorvetes, música, arte, campanhas irreverentes.
- **Composição & layering:** shader que desloca `uv.y` por coluna com `offset = p * speed(x)`; borda inferior arredondada de gota.
- **Trigger · timing · easing:** scrub 1,2 telas; aceleração `power2.in`.
- **Entrada → saída:** A firme → começa a pingar → escorre → B.
- **Combina com:** DG-04 · **Evite:** marcas sérias.
- **Mobile:** igual (shader barato). · **Reduced:** troca direta.
- **Performance:** 1 passe.
- **Implementação:** shader: `float drip = noise(x*20.)*.5+.5; uv.y -= p*p*drip*1.5;`.

### LQ-09 · Respiração
`fam:organic` `mech:breath-scale` `mat:body,air` `trig:scroll,idle` `geo:center` `lvl:refined` `cost:S` `tech:css,gsap` `feel:calmo,humano,meditativo`
- **Conceito:** a seção "expira": contrai levemente e escurece; a próxima "inspira": expande do centro. É um ciclo respiratório, não um zoom.
- **Sensação:** calma, ritmo humano, pausa.
- **Aplicação:** saúde mental, ioga, bem-estar.
- **Composição & layering:** ritmo 4 s (inspira) / 6 s (expira) quando em tempo; em scroll, 1 tela por ciclo.
- **Trigger · timing · easing:** `sine.inOut` simétrico.
- **Entrada → saída:** expira A → pausa vazia (cor neutra) → inspira B.
- **Combina com:** LQ-11 · **Evite:** escala acima de 4% (vira zoom, R3).
- **Mobile:** igual. · **Reduced:** só cor.
- **Performance:** trivial.
- **Implementação:** escala 1 → 0,97 → 1 com a cor passando por neutro.

### LQ-10 · Pólen
`fam:organic` `mech:letter-disperse` `mat:pollen,seeds` `trig:scroll` `geo:wind-direction` `lvl:experimental` `cost:M` `tech:gsap,splittext` `feel:leve,poético,efêmero`
- **Conceito:** as letras do título se soltam como pólen levado pelo vento, atravessam a tela e pousam formando o título da próxima seção.
- **Sensação:** leveza, polinização (uma ideia fecunda a outra).
- **Aplicação:** marcas naturais, poesia, cultura.
- **Composição & layering:** chars com trajetórias em curva (bezier com ruído), rotação suave; as letras são reaproveitadas quando possível (anagrama parcial).
- **Trigger · timing · easing:** scrub 1,5 telas; stagger por posição.
- **Entrada → saída:** título A → letras voam → pousam → título B.
- **Combina com:** TY-05, GX-03 · **Evite:** títulos longos.
- **Mobile:** igual. · **Reduced:** título B direto.
- **Performance:** chars com transform.
- **Implementação:** MotionPath ou bezier manual; mapear letras iguais entre A e B primeiro.

### LQ-11 · Condensação
`fam:atmospheric` `mech:fog-wipe` `mat:glass,steam` `trig:cursor,drag,idle` `geo:wipe-path` `lvl:experimental` `cost:M` `tech:canvas` `feel:íntimo,tátil,curioso`
- **Conceito:** a tela embaça como vidro; o usuário limpa com o cursor/dedo e vê a próxima seção por trás; quando limpa o suficiente (ou depois de um tempo), o vidro inteiro desembaça.
- **Sensação:** tátil, intimidade, descoberta ativa.
- **Aplicação:** inverno, bebidas, banho/spa, experiências lúdicas.
- **Composição & layering:** canvas com camada de "vapor" (cinza claro com ruído); `destination-out` no traço do cursor; gotas escorrendo do traço (detalhe).
- **Trigger · timing · easing:** interação; desembaçar total 1,2 s quando cobertura > 40%.
- **Entrada → saída:** vidro embaça → traços → limpa tudo → B.
- **Combina com:** IN-05, MK-02 · **Evite:** obrigar a interação (sempre complete sozinho após ~3 s ou ao rolar).
- **Mobile:** dedo; limiar menor. · **Reduced:** B direto.
- **Performance:** canvas em meia resolução; calcule cobertura por amostragem.
- **Implementação:** `globalCompositeOperation = "destination-out"` com pincel suave.
