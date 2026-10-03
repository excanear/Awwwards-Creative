# DG · Distortion / Glitch

O erro como linguagem. Funciona quando o conteúdo fala de tecnologia, ruído, cultura digital, música, ou quando a marca quer **ruptura**. Sem esse motivo, glitch é o clichê mais barato da web. Regra: o glitch tem que ter **causa** (sinal, compressão, calor, velocidade) e **limite** (nunca > 3 flashes/s).

---

### DG-01 · Separação de Canais com Causa
`fam:glitch` `mech:rgb-split` `mat:signal,light` `trig:scroll-velocity,click` `geo:horizontal` `lvl:refined` `cost:S` `tech:css,svg-filter,webgl` `feel:digital,energético,vibrante`
- **Conceito:** os canais R, G e B se separam proporcionalmente a uma causa real (velocidade do scroll, intensidade do áudio, impacto), e se reúnem na nova cena.
- **Sensação:** sinal sob estresse, energia, velocidade.
- **Aplicação:** música, games, tecnologia, eventos.
- **Composição & layering:** 3 cópias com `mix-blend-mode: screen` e deslocamentos; ou shader com amostragem deslocada por canal.
- **Trigger · timing · easing:** deslocamento = `clamp(velocity * k)`, decaimento 300 ms.
- **Entrada → saída:** A estável → separação no pico da transição → troca → reunião.
- **Combina com:** IN-03, CI-04 · **Evite:** RGB split permanente/decorativo.
- **Mobile:** deslocamento menor. · **Reduced:** sem separação.
- **Performance:** shader de 1 passe ou 3 camadas.
- **Implementação:** `gl-displacement.js` com `mode: "rgb"` ou SVG `feOffset` por canal.

### DG-02 · Datamosh
`fam:glitch` `mech:feedback-smear` `mat:compression,video` `trig:click,scroll` `geo:motion-vectors` `lvl:award` `cost:L` `tech:webgl` `feel:caótico,artístico,underground`
- **Conceito:** imita a falha de compressão de vídeo: os pixels de A são arrastados pelo movimento de B (sem keyframe), até B "limpar" a tela com um quadro-chave.
- **Sensação:** videoarte, ruptura estética.
- **Aplicação:** música, moda experimental, arte digital.
- **Composição & layering:** dois buffers ping-pong; cada frame amostra o anterior deslocado por um campo de vetores (ruído ou fluxo de B).
- **Trigger · timing · easing:** 1–1,5 s; o "keyframe" de B entra em corte seco.
- **Entrada → saída:** A → arraste → borrão colorido → B limpa.
- **Combina com:** GL-06, DG-05 · **Evite:** em marcas institucionais.
- **Mobile:** meia resolução. · **Reduced:** corte direto.
- **Performance:** framebuffers; 1 contexto.
- **Implementação:** feedback buffer com `uv - flow(uv) * strength`.

### DG-03 · Rasgo de Varredura
`fam:glitch` `mech:scanline-tear` `mat:crt,signal` `trig:click,scroll` `geo:horizontal-slices` `lvl:premium` `cost:S` `tech:css,gsap` `feel:tenso,retro,urgente`
- **Conceito:** faixas horizontais de A deslocam lateralmente em quantidades diferentes (sinal perdendo sincronia), e se reconectam já mostrando B.
- **Sensação:** sinal instável, urgência, VHS.
- **Aplicação:** cyber, alertas, música, transições curtas de alta energia.
- **Composição & layering:** N faixas com `clip-path: inset()` e `x` independente (seed); alternância A/B por faixa.
- **Trigger · timing · easing:** 400–600 ms em 3–4 "solavancos" (`steps`).
- **Entrada → saída:** A → faixas rasgam → faixas de B entram → sincroniza.
- **Combina com:** DG-10, DG-01 · **Evite:** repetição em cada transição.
- **Mobile:** igual. · **Reduced:** troca direta.
- **Performance:** ≤ 16 faixas.
- **Implementação:** duplicar a seção em faixas só em seções leves; senão snapshot.

### DG-04 · Pixel Sort
`fam:glitch` `mech:sort-by-luminance` `mat:pixel` `trig:scroll,click` `geo:columns` `lvl:experimental` `cost:M` `tech:canvas,webgl` `feel:artístico,algorítmico,fluido`
- **Conceito:** os pixels de A escorrem ordenados por luminância em colunas (algoritmo de pixel sorting), formando gradientes; o processo reverso monta B.
- **Sensação:** algoritmo à mostra, estética generativa.
- **Aplicação:** arte digital, fotografia experimental, tecnologia criativa.
- **Composição & layering:** canvas; limiar de brilho animado por `p` define quais trechos são ordenados.
- **Trigger · timing · easing:** scrub; limiar `sine.inOut`.
- **Entrada → saída:** A → sorting cresce → B "desordena" em foto.
- **Combina com:** LQ-08 · **Evite:** em imagens de pessoas (distorção desagradável).
- **Mobile:** imagem menor. · **Reduced:** troca direta.
- **Performance:** pré-compute os estados em canvas offscreen; ou aproximação em shader.
- **Implementação:** ordenar trechos por coluna uma vez; interpolar posição por `p`.

### DG-05 · Queda de Bitrate
`fam:glitch` `mech:block-quantize` `mat:compression,pixel` `trig:scroll,click` `geo:block-grid` `lvl:experimental` `cost:M` `tech:webgl,canvas` `feel:digital,irônico,transição-de-estado`
- **Conceito:** a qualidade de A cai (blocos JPEG cada vez maiores), no pior ponto troca para B em blocos, e a qualidade sobe até nítida.
- **Sensação:** conexão ruim, digital cru, "carregando o futuro".
- **Aplicação:** tecnologia, streaming, conteúdo sobre internet.
- **Composição & layering:** shader de pixelização com tamanho de bloco `2^(k·sin(πp))`.
- **Trigger · timing · easing:** 800 ms; simétrico.
- **Entrada → saída:** nítido → blocos → troca → nítido.
- **Combina com:** DG-08 · **Evite:** pixelização suave (perde o caráter de compressão).
- **Mobile:** igual. · **Reduced:** troca direta.
- **Performance:** shader trivial.
- **Implementação:** `gl-displacement.js` com `mode: "pixelate"`.

### DG-06 · Elasticidade de Velocidade
`fam:distortion` `mech:velocity-stretch` `mat:rubber,image` `trig:scroll-velocity` `geo:scroll-axis` `lvl:premium` `cost:S` `tech:gsap,webgl` `feel:responsivo,físico,vivo`
- **Conceito:** imagens e blocos esticam/inclinam na direção do scroll proporcionalmente à velocidade, e assentam com mola quando o scroll para.
- **Sensação:** o conteúdo tem massa; a página responde ao gesto.
- **Aplicação:** galerias, listas de projetos, modificador geral de sites com Lenis.
- **Composição & layering:** `skewY`/`scaleY` por velocidade; versão WebGL curva os planos (GL-05).
- **Trigger · timing · easing:** velocidade suavizada (`lerp 0.1`); limite 6°/8%.
- **Entrada → saída:** é um modificador contínuo; marca as passagens rápidas.
- **Combina com:** IN-03, GL-05 · **Evite:** em texto longo (distorce leitura).
- **Mobile:** desligado (scroll nativo). · **Reduced:** desligado.
- **Performance:** 1 transform por item visível.
- **Implementação:** `ScrollTrigger.getVelocity()` + `gsap.quickTo`.

### DG-07 · Ondulação de Calor
`fam:distortion` `mech:heat-haze` `mat:air,heat` `trig:scroll,time` `geo:rising` `lvl:experimental` `cost:M` `tech:svg-filter,webgl` `feel:quente,miragem,tensão`
- **Conceito:** o ar esquenta: A ondula como miragem (distorção vertical subindo), a distorção intensifica até B surgir da miragem.
- **Sensação:** calor, deserto, cozinha, motor, febre.
- **Aplicação:** churrascarias, automotivo, energia, verão.
- **Composição & layering:** `feTurbulence` com `baseFrequency` vertical baixo e animação de `seed`/offset; `feDisplacementMap`.
- **Trigger · timing · easing:** scrub; intensidade `sin(πp)`.
- **Entrada → saída:** A nítida → ondula → B se forma → assenta.
- **Combina com:** LQ-07 · **Evite:** usar como blur (R5).
- **Mobile:** sem filtro (troque por leve skew animado). · **Reduced:** troca direta.
- **Performance:** filtro SVG animado é caro: área limitada ou WebGL.
- **Implementação:** shader `uv.x += sin(uv.y*40. - t*4.) * amp * p`.

### DG-08 · Dithering
`fam:glitch` `mech:ordered-dither` `mat:pixel,print` `trig:scroll,click` `geo:bayer-grid` `lvl:experimental` `cost:M` `tech:canvas,webgl` `feel:retro,gráfico,preciso`
- **Conceito:** a transição acontece por uma matriz de Bayer: cada pixel troca de A para B quando `p` passa o limiar daquela célula, criando padrões de dither de 1 bit.
- **Sensação:** computação antiga, impressão, nostalgia técnica precisa.
- **Aplicação:** tecnologia retrô, games, editorial, marcas monocromáticas.
- **Composição & layering:** canvas sobre a cena; pixels grandes (2–4 px CSS) para o padrão ser visível.
- **Trigger · timing · easing:** 900 ms linear (o padrão já organiza a percepção).
- **Entrada → saída:** A → padrão xadrez emergindo → B.
- **Combina com:** MK-11, DG-05 · **Evite:** pixel de 1 px (vira cinza).
- **Mobile:** pixel de 3 px. · **Reduced:** troca direta.
- **Performance:** `ImageData` em resolução reduzida + `image-rendering: pixelated`.
- **Implementação:** `assets/engine/transitions/dither.js`.

### DG-09 · Vórtice
`fam:distortion` `mech:twirl-drain` `mat:liquid,space` `trig:click,scroll` `geo:radial-center` `lvl:experimental` `cost:M` `tech:webgl` `feel:hipnótico,sumidouro,intenso`
- **Conceito:** A gira e é sugada para um ponto (redemoinho), B é expelida do mesmo ponto girando ao contrário.
- **Sensação:** buraco negro, ralo, transporte.
- **Aplicação:** ficção, games, transições "para outra dimensão".
- **Composição & layering:** shader twirl `angle = strength * (1 - r/R)`.
- **Trigger · timing · easing:** 1 s; `power2.in` sugar / `power2.out` expelir.
- **Entrada → saída:** A → gira → ponto → B gira ao contrário → assenta.
- **Combina com:** GL-08 · **Evite:** uso casual (é muito forte).
- **Mobile:** igual. · **Reduced:** troca direta.
- **Performance:** 1 passe.
- **Implementação:** `gl-displacement.js` com `mode: "twirl"`.

### DG-10 · Desligar o CRT
`fam:glitch` `mech:crt-collapse` `mat:crt,phosphor` `trig:click,route` `geo:center-line-dot` `lvl:refined` `cost:S` `tech:css,gsap` `feel:retro,final,humor`
- **Conceito:** a tela desliga como televisão de tubo: comprime verticalmente até uma linha brilhante, a linha vira um ponto, apaga; a próxima "liga" no processo inverso.
- **Sensação:** fim de transmissão, retrô, encerrar.
- **Aplicação:** sair de um vídeo, 404, encerramentos, trocas de "canal".
- **Composição & layering:** `scaleY` → linha com `brightness(3)`; `scaleX` → ponto; fundo preto.
- **Trigger · timing · easing:** 500 ms desligar (`power3.in`), 120 ms preto, 450 ms ligar.
- **Entrada → saída:** A → linha → ponto → preto → ponto → linha → B.
- **Combina com:** DG-03 · **Evite:** em sites sem tom retrô/humor.
- **Mobile:** igual. · **Reduced:** corte direto.
- **Performance:** trivial.
- **Implementação:** `assets/engine/transitions/crt.js`.
