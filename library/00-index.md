# Biblioteca de transições: índice

145 conceitos em 12 famílias. Gerado por `node scripts/catalog.mjs --index`; não edite à mão (edite os arquivos da família e regenere).

Como usar: escolha pela **sensação** e pelo **verbo** da Motion Language, não pelo nome. Depois leia o card completo no arquivo da família (ou `node scripts/catalog.mjs --id XX-00`).

Níveis: `refined` · `premium` · `experimental` · `award` · `art`. Custo: `S` horas · `M` ~1 dia · `L` 2–3 dias · `XL` 3+ dias.

## SP · Spatial / Architectural (13) — `01-spatial-architectural.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| SP-01 | Corte de Seção (A–A) | clip-line | click, route | premium | S | view-transitions, css, svg | precisão, técnico, editorial |
| SP-02 | Planta que Deita | 3d-rotate | scroll | award | M | css-3d, gsap, scrolltrigger | técnico, monumental, construtivo |
| SP-03 | Portal (Atravessar) | mask-scale | scroll, click, route | premium | S | css, gsap, view-transitions | íntimo, acolhedor, cerimonial |
| SP-04 | Corredor de Molduras | camera-track | scroll | premium | M | gsap, scrolltrigger | galeria, sereno, percurso |
| SP-05 | Túnel em Perspectiva | z-travel | scroll | award | M | css-3d, gsap, scrolltrigger | jornada, tensão, imersivo |
| SP-06 | Descida de Camadas | vertical-stack-swap | scroll | award | L | gsap, scrolltrigger, svg | técnico, investigativo, profundo |
| SP-07 | Folha sobre Folha (Freeze & Cover) | cover-slide | scroll | premium | M | gsap, scrolltrigger | editorial, documental, sóbrio |
| SP-08 | Dobradura | fold | scroll, click | experimental | M | css-3d, gsap | artesanal, lúdico, editorial |
| SP-09 | Cubo de Cômodos | 3d-rotate | scroll, click | experimental | M | css-3d, gsap | arquitetônico, lúdico, exploração |
| SP-10 | Janela Interna (Droste) | nested-frames | scroll | experimental | M | css, gsap | onírico, hipnótico, infinito |
| SP-11 | Patamares | stepped-z | scroll | premium | S | css-3d, gsap | ordenado, monumental, ascensão |
| SP-12 | Maquete (Pull-back) | camera-pullback | scroll, click | award | M | gsap, flip | panorâmico, revelador, sistemático |
| SP-13 | Pop-up Book | hinge-stand-up | scroll | experimental | M | css-3d, gsap | lúdico, artesanal, surpresa |

## CI · Cinematic (12) — `02-cinematic.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| CI-01 | Match Cut de Forma | shape-handoff | scroll, click | premium | S | gsap, flip, view-transitions | elegante, inteligente, surpresa |
| CI-02 | Rack Focus | depth-of-field | scroll | premium | M | css-filter, webgl | íntimo, contemplativo, fotográfico |
| CI-03 | Dolly Zoom (Vertigo) | counter-scale | scroll | experimental | S | gsap | vertigem, tensão, revelação |
| CI-04 | Whip Pan | directional-blur-cut | click, scroll-threshold | premium | M | gsap, svg-filter, webgl | energético, urbano, impulso |
| CI-05 | Smash Cut com Silêncio | hard-cut-hold | scroll-threshold, click | refined | S | css | brutal, dramático, pausa |
| CI-06 | L-Cut / J-Cut Tipográfico | lead-lag | scroll | refined | S | css, gsap | fluido, narrativo, editorial |
| CI-07 | Diafragma de Lâminas | polygon-iris | click, scroll | premium | S | css, gsap | mecânico, fotográfico, preciso |
| CI-08 | Split Diopter | split-converge | scroll | premium | S | css, gsap | dualidade, tensão, comparação |
| CI-09 | Plano-Sequência (Oner) | continuous-camera | scroll | award | L | gsap, scrolltrigger, css-3d, webgl | imersivo, virtuoso, fluido |
| CI-10 | Letterbox (Mudança de Proporção) | aspect-change | scroll-threshold | refined | S | css, gsap | cinematográfico, cerimonial, foco |
| CI-11 | Montagem Staccato | rapid-cuts | scroll, click | premium | S | css, gsap | energético, rítmico, urgente |
| CI-12 | Queima de Exposição | overexpose | scroll, click | premium | M | css-filter, webgl | nostálgico, luminoso, epifania |

## TY · Typographic / Editorial (15) — `03-typographic-editorial.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| TY-01 | Mergulho no Glifo | extreme-scale | scroll | award | M | gsap, canvas-measure | monumental, inteligente, imersivo |
| TY-02 | Título que Atravessa | dual-render-clip | scroll | premium | S | css, gsap | inteligente, elegante, integrado |
| TY-03 | Eixo Variável | font-axis | scroll, hover | premium | S | css, gsap, splittext | voz, elástico, expressivo |
| TY-04 | Tachado e Reescrita | strike-rewrite | click, route | premium | S | css, gsap | editorial, honesto, técnico |
| TY-05 | Palavra-Ponte | word-persist | scroll | premium | S | gsap, flip | narrativo, inteligente, fluido |
| TY-06 | Colapso de Entreletra | tracking-to-grid | scroll | experimental | M | gsap, splittext | sistemático, arquitetônico, surpresa |
| TY-07 | Linha de Leitura | progressive-ink | scroll | refined | S | css, gsap, scroll-timeline | sereno, editorial, atento |
| TY-08 | Letreiros Cruzados | opposed-drift | scroll | premium | S | gsap | urbano, monumental, comercial |
| TY-09 | Revisão Editorial | proof-marks | scroll, click | experimental | M | svg, gsap | editorial, inteligente, artesanal |
| TY-10 | Coluna que Reflui | reflow-flip | scroll, click | premium | M | gsap, flip, splittext | sistemático, elegante, editorial |
| TY-11 | Tipos de Chumbo | drop-compose | scroll, click | experimental | M | gsap | artesanal, tátil, peso |
| TY-12 | Recorte (Ransom) | fragment-assemble | scroll | experimental | M | gsap, splittext | punk, editorial, colagem |
| TY-13 | Sumário Vivo | index-expand | click, scroll | premium | M | gsap, flip, view-transitions | editorial, organizado, navegação |
| TY-14 | Nota de Rodapé que Vira Página | marker-expand | click, hover | experimental | S | css, gsap, view-transitions | curioso, erudito, íntimo |
| TY-15 | Decodificação Contextual | char-substitution | scroll, click | refined | S | js | técnico, digital, precisão |

## MK · Masking / Optical (12) — `04-masking-optical.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| MK-01 | Persianas | slat-mask | scroll, click | refined | S | css, gsap | arquitetônico, rítmico, preciso |
| MK-02 | Lente | circle-clip-follow | cursor, click | premium | S | css, gsap | curioso, investigativo, íntimo |
| MK-03 | Revelação Fotoquímica | sweep-develop | scroll, in-view | premium | S | css-property, gsap | artesanal, técnico, revelação |
| MK-04 | Prisma | refracted-slices | scroll, click | experimental | M | css, gsap, webgl | luminoso, fragmentado, luxuoso |
| MK-05 | Sombra Primeiro | shadow-precede | scroll | experimental | S | css, gsap | misterioso, teatral, antecipação |
| MK-06 | Luz que Varre | light-sweep | scroll, click | premium | S | css, gsap | cerimonial, revelação, luxuoso |
| MK-07 | Recorte por Texto | text-knockout | scroll | premium | S | css, gsap | monumental, editorial, impacto |
| MK-08 | Ladrilhos que Viram | tile-flip | click, scroll | premium | M | css-3d, gsap | sistemático, lúdico, mosaico |
| MK-09 | Fresta | crack-open | scroll | refined | S | css, gsap | íntimo, suspense, convite |
| MK-10 | Reflexo | mirror-become | scroll | experimental | M | css, gsap, svg-filter | sereno, onírico, simétrico |
| MK-11 | Meio-Tom | halftone-grow | scroll, click | premium | M | css, canvas | gráfico, retro, impresso |
| MK-12 | Lâmina Diagonal | blade-split | click, scroll | refined | S | css, gsap | decisivo, afiado, energético |

## LQ · Liquid / Organic / Atmospheric (11) — `05-liquid-organic-atmospheric.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| LQ-01 | Mancha de Tinta | noise-displaced-mask | click, scroll | experimental | M | svg-filter, gsap | artesanal, orgânico, expressivo |
| LQ-02 | Maré | wave-path-rise | scroll | premium | S | svg, gsap | sereno, fluido, natural |
| LQ-03 | Metaball (Goo) | gooey-merge | scroll, click | experimental | M | svg-filter, gsap | lúdico, orgânico, tátil |
| LQ-04 | Névoa | noise-alpha | scroll | experimental | M | webgl, canvas | misterioso, onírico, silencioso |
| LQ-05 | Gota e Ondulação | ripple-distort | click | experimental | M | webgl, svg-filter | sensorial, calmo, preciso |
| LQ-06 | Crescimento | branching-growth | scroll | experimental | M | svg, canvas | vivo, natural, paciente |
| LQ-07 | Vapor | curl-particles | scroll, hover | experimental | L | webgl, canvas | calor, sensorial, efêmero |
| LQ-08 | Derretimento | column-drip | scroll | experimental | M | canvas, webgl | surreal, quente, irônico |
| LQ-09 | Respiração | breath-scale | scroll, idle | refined | S | css, gsap | calmo, humano, meditativo |
| LQ-10 | Pólen | letter-disperse | scroll | experimental | M | gsap, splittext | leve, poético, efêmero |
| LQ-11 | Condensação | fog-wipe | cursor, drag, idle | experimental | M | canvas | íntimo, tátil, curioso |

## ME · Mechanical / Physical (13) — `06-mechanical-physical.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| ME-01 | Tambor | cylinder-rotate | scroll | premium | M | css-3d, gsap | mecânico, sequencial, preciso |
| ME-02 | Split-Flap | flap-flip | click, in-view, scroll | premium | M | css-3d, js | nostálgico, viagem, informação |
| ME-03 | Catraca | ratchet-step | scroll | premium | S | gsap | preciso, discreto, confiável |
| ME-04 | Gaveta de Arquivo | drawer-slide | scroll, click | premium | M | css-3d, gsap | documental, organizado, tátil |
| ME-05 | Gravidade | rigid-body-fall | scroll-threshold, click | experimental | L | js-physics, gsap | lúdico, caótico, libertador |
| ME-06 | Dobradiça (Aba) | hinge-swing | scroll, click, drag | premium | S | css-3d, gsap | lúdico, acolhedor, doméstico |
| ME-07 | Carimbo | stamp-impact | scroll, click, in-view | premium | S | css, gsap | oficial, decisivo, documental |
| ME-08 | Elástico | tether-spring | scroll, drag | experimental | M | svg, gsap | lúdico, tenso, resistência |
| ME-09 | Esteira | conveyor | scroll | premium | M | gsap, flip | produtivo, industrial, abundante |
| ME-10 | Sanfona | accordion-compress | scroll | experimental | M | css-3d, gsap | compacto, engenhoso, editorial |
| ME-11 | Ímã | attract-to-slots | scroll, click | experimental | M | gsap, flip | ordem, magnético, sistemático |
| ME-12 | Plotter | pen-plot | scroll, in-view | premium | M | svg, gsap | técnico, preciso, construtivo |
| ME-13 | Cortina de Teatro | cloth-pull | click, scroll | experimental | M | svg, webgl, css | teatral, cerimonial, espetáculo |

## DG · Distortion / Glitch (10) — `07-distortion-glitch.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| DG-01 | Separação de Canais com Causa | rgb-split | scroll-velocity, click | refined | S | css, svg-filter, webgl | digital, energético, vibrante |
| DG-02 | Datamosh | feedback-smear | click, scroll | award | L | webgl | caótico, artístico, underground |
| DG-03 | Rasgo de Varredura | scanline-tear | click, scroll | premium | S | css, gsap | tenso, retro, urgente |
| DG-04 | Pixel Sort | sort-by-luminance | scroll, click | experimental | M | canvas, webgl | artístico, algorítmico, fluido |
| DG-05 | Queda de Bitrate | block-quantize | scroll, click | experimental | M | webgl, canvas | digital, irônico, transição-de-estado |
| DG-06 | Elasticidade de Velocidade | velocity-stretch | scroll-velocity | premium | S | gsap, webgl | responsivo, físico, vivo |
| DG-07 | Ondulação de Calor | heat-haze | scroll, time | experimental | M | svg-filter, webgl | quente, miragem, tensão |
| DG-08 | Dithering | ordered-dither | scroll, click | experimental | M | canvas, webgl | retro, gráfico, preciso |
| DG-09 | Vórtice | twirl-drain | click, scroll | experimental | M | webgl | hipnótico, sumidouro, intenso |
| DG-10 | Desligar o CRT | crt-collapse | click, route | refined | S | css, gsap | retro, final, humor |

## IV · Image / Video (10) — `08-image-video.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| IV-01 | Congelar e Imprimir | freeze-to-print | scroll, click | premium | M | gsap, video, canvas | memória, nostálgico, tátil |
| IV-02 | Vídeo Preso ao Scroll | video-scrub | scroll | premium | M | video, gsap | controle, cinematográfico, tátil |
| IV-03 | Fatias | slice-stagger | scroll, click | refined | S | css, gsap | editorial, rítmico, gráfico |
| IV-04 | Folha de Contato | zoom-out-select | click, scroll | premium | M | gsap, flip | fotográfico, curadoria, bastidor |
| IV-05 | Baralho de Fotos | card-deal | scroll, click | premium | M | gsap, flip | tátil, casual, íntimo |
| IV-06 | Flipbook | image-sequence | scroll, drag | premium | M | canvas | artesanal, animação, controle |
| IV-07 | Virada de Duotone | palette-remap | scroll | refined | S | svg-filter, css | gráfico, coeso, marca |
| IV-08 | Relevo 2.5D | depth-map-shift | scroll, cursor | experimental | M | webgl | imersivo, surpreendente, presença |
| IV-09 | Decalque | trace-then-fill | scroll, in-view | experimental | M | svg, canvas | artesanal, analítico, construtivo |
| IV-10 | Polaroid | chemical-develop | in-view, click | refined | S | css | nostálgico, afetivo, paciente |

## GX · Generative / SVG / Canvas (12) — `09-generative-svg-canvas.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| GX-01 | Traço de Caneta | stroke-draw | scroll, in-view | refined | S | svg, gsap | construtivo, preciso, artesanal |
| GX-02 | Morph de Silhueta | path-morph | scroll, click | premium | M | svg, gsap-morphsvg | fluido, inteligente, metamorfose |
| GX-03 | Partículas que Formam | particle-resample | scroll, click | experimental | M | canvas, webgl | mágico, tecnológico, transformação |
| GX-04 | Estilhaço Voronoi | voronoi-shatter | click | experimental | L | canvas, webgl | dramático, ruptura, violento |
| GX-05 | Campo de Pontos | dot-field-wave | scroll, cursor | premium | M | canvas | tecnológico, calmo, sistema |
| GX-06 | Campo de Fluxo | flow-field-trails | scroll | experimental | M | canvas | orgânico, generativo, artístico |
| GX-07 | Ramificação | l-system | scroll | experimental | M | svg, canvas | crescimento, lógico, natural |
| GX-08 | Curvas de Nível | isolines-rise | scroll | experimental | M | canvas, svg | topográfico, calmo, exploração |
| GX-09 | Autômato Celular | cellular-automaton | click, scroll | experimental | M | canvas, webgl | científico, vivo, algorítmico |
| GX-10 | Constelação | graph-connect | scroll | premium | M | svg, canvas | inteligente, conectado, sistêmico |
| GX-11 | Ladrilhos Truchet | tile-rotate-pattern | click, scroll | experimental | M | svg, canvas | gráfico, ornamental, lúdico |
| GX-12 | Artefato Verdadeiro | real-data-stream | scroll, event | art | M | js, svg, canvas | autêntico, técnico, revelador |

## GL · WebGL / 3D (11) — `10-webgl-3d.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| GL-01 | Dissolução por Mapa | texture-displace-dissolve | click, scroll | premium | M | webgl | fluido, premium, sedoso |
| GL-02 | Virada de Página | page-curl | click, drag, scroll | award | L | webgl, three | editorial, tátil, livro |
| GL-03 | Tecido ao Vento | cloth-sim | click, scroll | award | L | webgl, three | sensorial, leve, luxuoso |
| GL-04 | Bloco de Vidro | refraction-pass | scroll, cursor | award | L | webgl, three | luxuoso, preciso, luminoso |
| GL-05 | Planos que Curvam | velocity-bend | scroll-velocity | premium | M | webgl, ogl | físico, fluido, responsivo |
| GL-06 | Rastro de Feedback | feedback-buffer | cursor, scroll | experimental | M | webgl | onírico, fluido, hipnótico |
| GL-07 | Raios de Luz | god-rays | scroll | award | M | webgl | espiritual, épico, revelação |
| GL-08 | Estilhaço 3D | triangle-explode | click, scroll | experimental | L | webgl, three | energético, explosivo, dramático |
| GL-09 | Portal com Stencil | stencil-world | scroll, cursor | award | XL | three | imersivo, mágico, exploração |
| GL-10 | Blob SDF | sdf-morph | scroll, cursor | experimental | M | webgl | orgânico, futurista, hipnótico |
| GL-11 | Nuvem de Pontos da Foto | photo-to-pointcloud | scroll | experimental | M | webgl | tecnológico, revelador, volumétrico |

## IN · Interaction-driven (12) — `11-interaction-driven.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| IN-01 | Arrastar com Limiar | drag-threshold-spring | drag | premium | S | pointer-events, gsap | tátil, controle, satisfatório |
| IN-02 | Segurar para Revelar | hold-charge | hold | experimental | S | pointer-events, gsap | intencional, tenso, recompensa |
| IN-03 | Velocidade como Material | velocity-mapping | scroll-velocity | premium | S | gsap, lenis | responsivo, vivo, físico |
| IN-04 | Lanterna | cursor-light-mask | cursor | experimental | S | css | misterioso, exploração, íntimo |
| IN-05 | Rastro que Pinta | cursor-paint-reveal | cursor | experimental | M | canvas | criativo, lúdico, autoral |
| IN-06 | Inclinação | device-tilt | gyroscope | experimental | S | deviceorientation | físico, lúdico, presença |
| IN-07 | Snap Magnético | scroll-snap-settle | scroll | refined | S | css, gsap | preciso, controlado, editorial |
| IN-08 | Carta Arremessada | fling-card | drag, swipe | premium | S | pointer-events, gsap | decisivo, lúdico, rápido |
| IN-09 | Pinça para Mergulhar | pinch-zoom-enter | pinch, wheel-ctrl | experimental | M | pointer-events | exploração, controle, mapa |
| IN-10 | Índice com Prévia | hover-preview-expand | hover, click | premium | M | gsap, flip, view-transitions | editorial, elegante, curadoria |
| IN-11 | Eixo Trocado (honesto) | scroll-axis-remap | scroll | refined | S | gsap, scrolltrigger | percurso, linha-do-tempo, leitura |
| IN-12 | Origem no Clique | radial-from-pointer | click | refined | S | css, view-transitions | responsivo, causal, preciso |

## NX · Narrative / Experimental (14) — `12-narrative-experimental.md`

| ID | Conceito | Mecanismo | Trigger | Nível | Custo | Tech | Sensação |
|---|---|---|---|---|---|---|---|
| NX-01 | O Site se Mede | live-measurement | load, resize, scroll | art | M | js, svg | inteligente, técnico, autorreferente |
| NX-02 | Quebrar a Moldura | browser-ui-involve | scroll, route | experimental | S | js | irônico, surpreendente, meta |
| NX-03 | Rima | bookend-echo | scroll | award | S | any | completo, satisfatório, autoral |
| NX-04 | Hora Real | time-of-day-state | time, load | experimental | S | js, css | vivo, pessoal, poético |
| NX-05 | Rebobinar | time-reverse | scroll-up, click | experimental | M | gsap | nostálgico, lúdico, reflexivo |
| NX-06 | Objeto-Fio | persistent-traveler | scroll | award | M | gsap, flip | coeso, narrativo, autoral |
| NX-07 | Documento que se Preenche | form-fill | scroll | award | M | gsap | oficial, progressivo, narrativo |
| NX-08 | Potências de Dez | scale-journey | scroll | award | L | gsap, webgl | épico, científico, perspectiva |
| NX-09 | Erro Narrativo | story-error | route | premium | S | any | humor, humano, marca |
| NX-10 | Narrador Tipográfico | persistent-caption | scroll | premium | S | gsap | íntimo, literário, guiado |
| NX-11 | Mudança de Estado do Mundo | world-state-switch | scroll-threshold | art | M | css, gsap | épico, transformador, clímax |
| NX-12 | Câmera Subjetiva | pov-camera | scroll | award | L | css-3d, gsap, video | empático, imersivo, emocional |
| NX-13 | Mapa e Território | route-travel | scroll, click | premium | M | svg, gsap | jornada, orientação, exploração |
| NX-14 | Inventário | count-transform | scroll | premium | S | gsap | concreto, prova, abundância |

## Por sensação (atalhos)

- **editorial**: SP-01, SP-07, SP-08, CI-06, TY-04, TY-07, TY-09, TY-10, TY-12, TY-13, MK-07, ME-10, IV-03, GL-02, IN-07, IN-10
- **lúdico**: SP-08, SP-09, SP-13, MK-08, LQ-03, ME-05, ME-06, ME-08, GX-11, IN-05, IN-06, IN-08, NX-05
- **preciso**: CI-07, MK-01, LQ-05, ME-01, ME-03, ME-12, DG-08, GX-01, GL-04, IN-07, IN-12
- **técnico**: SP-01, SP-02, SP-06, TY-04, TY-15, MK-03, ME-12, GX-12, NX-01
- **íntimo**: SP-03, CI-02, TY-14, MK-02, MK-09, LQ-11, IV-05, IN-04, NX-10
- **artesanal**: SP-08, SP-13, TY-09, TY-11, MK-03, LQ-01, IV-06, IV-09, GX-01
- **fluido**: CI-06, CI-09, TY-05, LQ-02, DG-04, GX-02, GL-01, GL-05, GL-06
- **tátil**: TY-11, LQ-03, LQ-11, ME-04, IV-01, IV-02, IV-05, GL-02, IN-01
- **inteligente**: CI-01, TY-01, TY-02, TY-05, TY-09, GX-02, GX-10, NX-01
- **imersivo**: SP-05, CI-09, TY-01, IV-08, GL-09, NX-12
- **exploração**: SP-09, GX-08, GL-09, IN-04, IN-09, NX-13
- **monumental**: SP-02, SP-11, TY-01, TY-08, MK-07
- **sistemático**: SP-12, TY-06, TY-10, MK-08, ME-11
- **energético**: CI-04, CI-11, MK-12, DG-01, GL-08
- **nostálgico**: CI-12, ME-02, IV-01, IV-10, NX-05
- **gráfico**: MK-11, DG-08, IV-03, IV-07, GX-11
- **vivo**: LQ-06, DG-06, GX-09, IN-03, NX-04
- **construtivo**: SP-02, ME-12, IV-09, GX-01
- **cerimonial**: SP-03, CI-10, MK-06, ME-13
- **sereno**: SP-04, TY-07, MK-10, LQ-02
- **tensão**: SP-05, CI-03, CI-08, DG-07
- **onírico**: SP-10, MK-10, LQ-04, GL-06
- **hipnótico**: SP-10, DG-09, GL-06, GL-10
- **elegante**: CI-01, TY-02, TY-10, IN-10
- **revelação**: CI-03, MK-03, MK-06, GL-07
- **narrativo**: CI-06, TY-05, NX-06, NX-07
- **luxuoso**: MK-04, MK-06, GL-03, GL-04
- **retro**: MK-11, DG-03, DG-08, DG-10
- **orgânico**: LQ-01, LQ-03, GX-06, GL-10
- **calmo**: LQ-05, LQ-09, GX-05, GX-08
- **responsivo**: DG-06, GL-05, IN-03, IN-12
- **físico**: DG-06, GL-05, IN-03, IN-06
- **controle**: IV-02, IV-06, IN-01, IN-09
- **documental**: SP-07, ME-04, ME-07
- **arquitetônico**: SP-09, TY-06, MK-01
- **revelador**: SP-12, GX-12, GL-11
- **surpresa**: SP-13, CI-01, TY-06
- **fotográfico**: CI-02, CI-07, IV-04
- **dramático**: CI-05, GX-04, GL-08
- **rítmico**: CI-11, MK-01, IV-03
- **luminoso**: CI-12, MK-04, GL-04
- **curioso**: TY-14, MK-02, LQ-11
- **digital**: TY-15, DG-01, DG-05
- **misterioso**: MK-05, LQ-04, IN-04
- **decisivo**: MK-12, ME-07, IN-08
- **natural**: LQ-02, LQ-06, GX-07
- **sensorial**: LQ-05, LQ-07, GL-03
- **irônico**: LQ-08, DG-05, NX-02
- **tenso**: ME-08, DG-03, IN-02
- **artístico**: DG-02, DG-04, GX-06
- **tecnológico**: GX-03, GX-05, GL-11
- **épico**: GL-07, NX-08, NX-11
- **autoral**: IN-05, NX-03, NX-06
