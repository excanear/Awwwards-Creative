# IV · Image / Video

A mídia é o melhor conteúdo de um site quando é boa, e a pior quando é decorativa. Transições de imagem tratam a foto/vídeo como **objeto** (impresso, projetado, revelado, fatiado), não como fundo que desliza.

---

### IV-01 · Congelar e Imprimir
`fam:image-video` `mech:freeze-to-print` `mat:film,paper,photo` `trig:scroll,click` `geo:frame` `lvl:premium` `cost:M` `tech:gsap,video,canvas` `feel:memória,nostálgico,tátil`
- **Conceito:** o vídeo congela num quadro, ganha borda branca de fotografia impressa, encolhe e é colocado sobre a mesa (a próxima seção), como uma foto entre outras.
- **Sensação:** memória fixada, momento guardado.
- **Aplicação:** histórias de marca, eventos, casamentos, turismo, cases.
- **Composição & layering:** `<video>` pausado → canvas com o quadro → card com borda/sombra; rotação leve ao pousar.
- **Trigger · timing · easing:** scrub 1 tela; congelamento instantâneo com flash curto de 80 ms.
- **Entrada → saída:** vídeo → congela → vira foto → pousa na mesa de B.
- **Combina com:** IV-05, CI-07 · **Evite:** em vídeos sem um quadro forte.
- **Mobile:** igual. · **Reduced:** foto pousada estática.
- **Performance:** `drawImage(video)` uma vez.
- **Implementação:** poster do quadro exportado de antemão para não depender do decode.

### IV-02 · Vídeo Preso ao Scroll
`fam:image-video` `mech:video-scrub` `mat:film` `trig:scroll` `geo:timeline` `lvl:premium` `cost:M` `tech:video,gsap` `feel:controle,cinematográfico,tátil`
- **Conceito:** o scroll é a agulha do vídeo: rolar avança/retrocede o tempo; o último quadro do vídeo é o primeiro quadro da próxima seção.
- **Sensação:** controle do tempo, produto girando, processo em câmera lenta.
- **Aplicação:** produtos 3D, processos físicos, travessias de câmera.
- **Composição & layering:** vídeo sticky; texto em camadas ao longo do trilho (CI-06).
- **Trigger · timing · easing:** `currentTime = p * duration` suavizado; trilho de 2–4 telas.
- **Entrada → saída:** quadro 1 → scrub → último quadro = fundo de B.
- **Combina com:** CI-10, SP-04 · **Evite:** vídeos com keyframes espaçados (scrub engasga).
- **Mobile:** sequência de imagens (IV-06) ou vídeo menor; iOS pode não buscar suave. · **Reduced:** último quadro estático.
- **Performance:** codifique com keyframe a cada quadro (`-g 1`) ou use sequência de imagens.
- **Implementação:** `ffmpeg -i in.mp4 -g 1 -crf 23 out.mp4`; atualize `currentTime` no rAF com lerp.

### IV-03 · Fatias
`fam:image-video` `mech:slice-stagger` `mat:photo,paper` `trig:scroll,click` `geo:strips` `lvl:refined` `cost:S` `tech:css,gsap` `feel:editorial,rítmico,gráfico`
- **Conceito:** a imagem de B entra em fatias verticais que descem com atrasos diferentes (como tiras de papel), formando a foto inteira.
- **Sensação:** editorial, montagem gráfica.
- **Aplicação:** heros de cases, galerias, troca de imagem principal.
- **Composição & layering:** N fatias com a mesma imagem e `background-position` próprio; ordem do stagger pela composição (centro primeiro ou pela direção de leitura).
- **Trigger · timing · easing:** 900 ms; cada fatia 600 ms `power3.out`; stagger 40 ms.
- **Entrada → saída:** fatias caem → foto completa → as fatias somem (a imagem real assume).
- **Combina com:** TY-03 · **Evite:** mais de 12 fatias.
- **Mobile:** 5 fatias. · **Reduced:** imagem direta.
- **Performance:** backgrounds da mesma imagem (cache).
- **Implementação:** no fim, troque as fatias pela `<img>` real (acessível).

### IV-04 · Folha de Contato
`fam:image-video` `mech:zoom-out-select` `mat:film,contact-sheet` `trig:click,scroll` `geo:grid` `lvl:premium` `cost:M` `tech:gsap,flip` `feel:fotográfico,curadoria,bastidor`
- **Conceito:** a foto atual encolhe e se revela parte de uma folha de contato (os negativos vizinhos); uma marca de lápis circula o próximo quadro, que cresce para ser B.
- **Sensação:** curadoria, olhar do editor, bastidores.
- **Aplicação:** fotografia, cinema, portfólios de imagem.
- **Composição & layering:** grade de quadros com perfurações de filme; marca de lápis em SVG.
- **Trigger · timing · easing:** clique 1,6 s em 3 tempos (recuo · círculo · mergulho).
- **Entrada → saída:** foto → folha → círculo → nova foto.
- **Combina com:** CI-07, SP-12 · **Evite:** com SP-12 no mesmo site.
- **Mobile:** grade de 3 colunas. · **Reduced:** troca direta.
- **Performance:** miniaturas leves.
- **Implementação:** Flip entre estado grade e tela cheia; DrawSVG no círculo.

### IV-05 · Baralho de Fotos
`fam:image-video` `mech:card-deal` `mat:photo,cards` `trig:scroll,click` `geo:pile-to-layout` `lvl:premium` `cost:M` `tech:gsap,flip` `feel:tátil,casual,íntimo`
- **Conceito:** as fotos de B são distribuídas como cartas: saem de uma pilha, deslizam com rotação e pousam nos seus lugares, com sombra que diminui ao pousar.
- **Sensação:** álbum de família, mesa de trabalho, intimidade.
- **Aplicação:** galerias, depoimentos, cases, eventos.
- **Composição & layering:** pilha num ponto (a origem tem significado: a mão, o canto da mesa); destinos no grid.
- **Trigger · timing · easing:** 120 ms entre cartas; cada carta 700 ms `power3.out`; rotação final ±3°.
- **Entrada → saída:** pilha → distribuição → mesa composta.
- **Combina com:** IV-01, TY-12 · **Evite:** stagger genérico de cards (R7): precisa da pilha e da física de carta.
- **Mobile:** pilha que se desfaz por swipe. · **Reduced:** grid final.
- **Performance:** imagens com `decode()` antes.
- **Implementação:** Flip de "todas na pilha" para o grid.

### IV-06 · Flipbook
`fam:image-video` `mech:image-sequence` `mat:paper,frames` `trig:scroll,drag` `geo:timeline` `lvl:premium` `cost:M` `tech:canvas` `feel:artesanal,animação,controle`
- **Conceito:** uma sequência de imagens (ou desenhos) avança como um flipbook pelo scroll ou arrasto; a última página é a próxima seção.
- **Sensação:** animação feita à mão, controle tátil.
- **Aplicação:** produtos 360°, ilustração, processos, alternativa robusta ao IV-02 no mobile.
- **Composição & layering:** canvas desenhando o quadro `floor(p·n)`; borda de páginas na lateral (detalhe).
- **Trigger · timing · easing:** scrub; 24–60 quadros.
- **Entrada → saída:** página 1 → folheia → última.
- **Combina com:** CI-11 · **Evite:** sequências pesadas sem pré-carregamento.
- **Mobile:** ideal (melhor que vídeo). · **Reduced:** quadro final.
- **Performance:** WebP/AVIF; carregue progressivamente (quadros pares primeiro).
- **Implementação:** `createImageBitmap` + `drawImage`.

### IV-07 · Virada de Duotone
`fam:image-video` `mech:palette-remap` `mat:ink,print` `trig:scroll` `geo:global` `lvl:refined` `cost:S` `tech:svg-filter,css` `feel:gráfico,coeso,marca`
- **Conceito:** todas as imagens estão em duotone com as cores da seção; ao mudar de seção, o mapa de cores muda (as fotos são "reimpressas" com as tintas da próxima).
- **Sensação:** coesão gráfica, sistema de marca.
- **Aplicação:** sites com fotos heterogêneas, institucionais, editoriais.
- **Composição & layering:** filtro SVG `feColorMatrix` + `feComponentTransfer` com valores interpolados por `p`.
- **Trigger · timing · easing:** scrub entre seções; `sine.inOut`.
- **Entrada → saída:** paleta A → interpola → paleta B.
- **Combina com:** MK-03, NX-04 · **Evite:** em fotos de produto (cor real importa).
- **Mobile:** igual. · **Reduced:** paleta da seção direto.
- **Performance:** atualizar atributos do filtro por frame em poucas imagens.
- **Implementação:** `feComponentTransfer` com `tableValues` interpolados.

### IV-08 · Relevo 2.5D
`fam:image-video` `mech:depth-map-shift` `mat:photo,depth` `trig:scroll,cursor` `geo:z-from-depth` `lvl:experimental` `cost:M` `tech:webgl` `feel:imersivo,surpreendente,presença`
- **Conceito:** a foto ganha profundidade real (mapa de profundidade): a câmera gira levemente em torno do sujeito; na transição, a câmera "entra" pela profundidade até o fundo, que é a próxima cena.
- **Sensação:** a foto vira lugar.
- **Aplicação:** turismo, imobiliário, retratos, heros.
- **Composição & layering:** shader com deslocamento de `uv` por `depth * offset`; transição aumenta o offset e a escala do fundo.
- **Trigger · timing · easing:** scrub; cursor só como modificador sutil.
- **Entrada → saída:** foto 2.5D → câmera avança → atravessa o sujeito → B.
- **Combina com:** CI-02, CI-03 · **Evite:** parallax genérico em camadas sem mapa (R6).
- **Mobile:** giroscópio (com permissão) ou só scroll. · **Reduced:** foto plana.
- **Performance:** 2 texturas (cor + profundidade).
- **Implementação:** mapa de profundidade gerado por modelo (ex.: Depth Anything) fora do site.

### IV-09 · Decalque
`fam:image-video` `mech:trace-then-fill` `mat:line,photo` `trig:scroll,in-view` `geo:contours` `lvl:experimental` `cost:M` `tech:svg,canvas` `feel:artesanal,analítico,construtivo`
- **Conceito:** a foto de B aparece primeiro como contornos desenhados (decalque a lápis), depois os tons são preenchidos e por fim a foto real assume.
- **Sensação:** observação, desenho, entendimento.
- **Aplicação:** arquitetura, moda (croqui → foto), produto, ilustração.
- **Composição & layering:** SVG de contornos (gerado por edge detection ou desenhado); máscara de preenchimento.
- **Trigger · timing · easing:** scrub; traço 0–50%, tons 40–80%, foto 70–100%.
- **Entrada → saída:** papel → traço → tom → foto.
- **Combina com:** GX-01, ME-12 · **Evite:** fotos sem contornos claros.
- **Mobile:** igual. · **Reduced:** foto final com o traço por cima como ornamento.
- **Performance:** paths simplificados (< 200).
- **Implementação:** gerar contornos com potrace/edge detection offline.

### IV-10 · Polaroid
`fam:image-video` `mech:chemical-develop` `mat:instant-film` `trig:in-view,click` `geo:frame` `lvl:refined` `cost:S` `tech:css` `feel:nostálgico,afetivo,paciente`
- **Conceito:** a foto chega como filme instantâneo escuro-esverdeado e revela lentamente (contraste e cor emergindo de forma irregular, do centro para as bordas).
- **Sensação:** espera boa, afeto, momento.
- **Aplicação:** marcas afetivas, eventos, comunidades, "sobre nós".
- **Composição & layering:** imagem com `filter` animado (brightness, saturate, sepia) + máscara radial que expande.
- **Trigger · timing · easing:** 2,5–3 s `sine.out` (lento de propósito; a espera é o conteúdo).
- **Entrada → saída:** cartão escuro → imagem emerge → cor plena.
- **Combina com:** IV-05, CI-12 · **Evite:** em imagens críticas para a decisão (atrasa a informação).
- **Mobile:** igual. · **Reduced:** imagem final.
- **Performance:** filtros em 1 imagem: ok.
- **Implementação:** `@property --dev` + `filter` interpolado.
