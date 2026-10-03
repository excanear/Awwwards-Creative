# GL · WebGL / 3D / Shaders

Quando o material exige física de luz (refração, volume, tecido, ruído contínuo) ou 3D real, o shader é a ferramenta certa. Use **pontualmente**: um canvas por página, carregado na aproximação, com fallback em DOM. A técnica deve sumir atrás do conceito.

---

### GL-01 · Dissolução por Mapa
`fam:webgl` `mech:texture-displace-dissolve` `mat:any` `trig:click,scroll` `geo:noise-map` `lvl:premium` `cost:M` `tech:webgl` `feel:fluido,premium,sedoso`
- **Conceito:** duas imagens trocam através de um mapa (ruído, textura da marca, padrão de tecido): cada pixel desloca e troca quando `p` passa o valor do mapa naquele ponto.
- **Sensação:** sedoso, material, contínuo.
- **Aplicação:** galerias, heros com várias imagens, e-commerce de moda/luxo.
- **Composição & layering:** canvas sobre as imagens; o mapa é a assinatura (textura de papel, de mármore, do logo repetido).
- **Trigger · timing · easing:** 1,1 s `power2.inOut`; deslocamento máx. no meio.
- **Entrada → saída:** A → ondula pelo mapa → B.
- **Combina com:** GL-05, IV-03 · **Evite:** mapa de ruído genérico em todas as trocas (a assinatura é o mapa).
- **Mobile:** igual (1 passe). · **Reduced:** troca direta.
- **Performance:** 1 passe, 3 texturas.
- **Implementação:** `assets/engine/transitions/gl-displacement.js` (modos: dissolve, ripple, rgb, pixelate, twirl).

### GL-02 · Virada de Página
`fam:webgl` `mech:page-curl` `mat:paper` `trig:click,drag,scroll` `geo:corner` `lvl:award` `cost:L` `tech:webgl,three` `feel:editorial,tátil,livro`
- **Conceito:** a seção é uma página que vira de verdade: o canto curva, a sombra percorre a dobra, o verso aparece, e a página seguinte está embaixo.
- **Sensação:** livro, revista, publicação.
- **Aplicação:** editoras, catálogos, lookbooks, relatórios anuais.
- **Composição & layering:** malha plana subdividida com textura da seção; vértices curvados em torno de um cilindro que se move.
- **Trigger · timing · easing:** arrastar o canto (ideal) ou clique 1 s; scrub.
- **Entrada → saída:** canto levanta → curva → vira → assenta à esquerda.
- **Combina com:** SP-08, TY-13 · **Evite:** sem conceito editorial.
- **Mobile:** arrastar com o dedo (perfeito para toque). · **Reduced:** troca direta.
- **Performance:** textura da seção exige snapshot (html2canvas é lento): prefira seções desenhadas para isso.
- **Implementação:** vertex shader de curl em torno de cilindro (`theta = dist / radius`).

### GL-03 · Tecido ao Vento
`fam:webgl` `mech:cloth-sim` `mat:fabric` `trig:click,scroll` `geo:pinned-edge` `lvl:award` `cost:L` `tech:webgl,three` `feel:sensorial,leve,luxuoso`
- **Conceito:** a seção vira um tecido preso numa borda; o vento o ondula e o leva embora, revelando B.
- **Sensação:** leveza, moda, natureza.
- **Aplicação:** moda, têxtil, hotelaria, lançamentos.
- **Composição & layering:** malha com simulação verlet simples (ou deformação procedural), luz difusa para as dobras.
- **Trigger · timing · easing:** 1,5 s; vento cresce.
- **Entrada → saída:** plano → ondula → solta → voa → B.
- **Combina com:** ME-13 · **Evite:** em conteúdo denso.
- **Mobile:** deformação procedural (sem simulação). · **Reduced:** troca direta.
- **Performance:** malha 40×40.
- **Implementação:** procedural: `z = sin(x*f + t)*amp(x)`; amp cresce da borda presa para a solta.

### GL-04 · Bloco de Vidro
`fam:webgl` `mech:refraction-pass` `mat:glass,crystal` `trig:scroll,cursor` `geo:moving-slab` `lvl:award` `cost:L` `tech:webgl,three` `feel:luxuoso,preciso,luminoso`
- **Conceito:** um bloco de vidro (ou cristal, ou lente) atravessa a tela; o que está atrás dele é refratado, e depois que ele passa, a cena é outra.
- **Sensação:** material nobre, precisão óptica.
- **Aplicação:** joias, perfumes, arquitetura, tecnologia premium.
- **Composição & layering:** a cena (A atrás, B atrás na metade já passada) como textura; o vidro como malha com normal map.
- **Trigger · timing · easing:** scrub; o vidro se move `sine.inOut`.
- **Entrada → saída:** vidro entra → refrata A → ao passar, deixa B.
- **Combina com:** MK-04 · **Evite:** com MK-04 juntos (escolha o real ou o barato).
- **Mobile:** MK-04 (versão CSS). · **Reduced:** troca direta.
- **Performance:** render-to-texture da cena: caro; limite a mídia.
- **Implementação:** Three.js `MeshPhysicalMaterial` com `transmission`, ou shader de refração 2D por normal map.

### GL-05 · Planos que Curvam
`fam:webgl` `mech:velocity-bend` `mat:paper,image` `trig:scroll-velocity` `geo:scroll-axis` `lvl:premium` `cost:M` `tech:webgl,ogl` `feel:físico,fluido,responsivo`
- **Conceito:** as imagens são planos WebGL sincronizados com o DOM; curvam (como papel) proporcionalmente à velocidade do scroll; numa transição de seção, a curvatura máxima vira a dobra que leva à próxima.
- **Sensação:** papel solto, física, matéria.
- **Aplicação:** galerias, portfólios, listas de projetos.
- **Composição & layering:** DOM invisível dá posição; WebGL desenha.
- **Trigger · timing · easing:** velocidade suavizada; mola no fim.
- **Entrada → saída:** contínuo; na transição, o plano curva em 90° e a câmera passa.
- **Combina com:** DG-06, GL-01 · **Evite:** em toque (sem Lenis, perde sentido).
- **Mobile:** desligado. · **Reduced:** desligado.
- **Performance:** OGL, 1 canvas, planos subdivididos 16×16.
- **Implementação:** `position.z += sin(uv.y * PI) * velocity`.

### GL-06 · Rastro de Feedback
`fam:webgl` `mech:feedback-buffer` `mat:light,trail` `trig:cursor,scroll` `geo:path` `lvl:experimental` `cost:M` `tech:webgl` `feel:onírico,fluido,hipnótico`
- **Conceito:** a imagem é redesenhada sobre si mesma com leve deslocamento e decaimento, criando rastros; durante a transição, o rastro de A arrasta para dentro de B.
- **Sensação:** memória visual, sonho, longa exposição.
- **Aplicação:** música, arte, eventos noturnos.
- **Composição & layering:** dois framebuffers ping-pong.
- **Trigger · timing · easing:** 1–1,5 s; decaimento 0,9 → 0,96 no meio.
- **Entrada → saída:** A → rastros → B emerge do rastro.
- **Combina com:** DG-02 · **Evite:** em leitura.
- **Mobile:** meia resolução. · **Reduced:** troca direta.
- **Performance:** 2 FBOs.
- **Implementação:** `out = mix(prev(uv + flow), current, 1 - decay)`.

### GL-07 · Raios de Luz
`fam:webgl` `mech:god-rays` `mat:light,dust` `trig:scroll` `geo:light-source` `lvl:award` `cost:M` `tech:webgl` `feel:espiritual,épico,revelação`
- **Conceito:** uma fonte de luz atrás de A projeta raios volumétricos através das formas (letras, recortes); os raios crescem até a luz preencher tudo e a próxima seção nasce dela.
- **Sensação:** epifania, catedral, amanhecer.
- **Aplicação:** virada de ato, revelação, lançamento.
- **Composição & layering:** máscara de oclusão (as formas de A) + blur radial a partir da fonte.
- **Trigger · timing · easing:** scrub 1,5 telas; intensidade `power2.in`.
- **Entrada → saída:** contraluz → raios → branco/cor → B.
- **Combina com:** CI-12, MK-06 · **Evite:** mais de uma vez no site.
- **Mobile:** amostras menores (16). · **Reduced:** B direto.
- **Performance:** blur radial de 32–64 amostras em meia resolução.
- **Implementação:** shader de "light scattering" (pós-processo clássico).

### GL-08 · Estilhaço 3D
`fam:webgl` `mech:triangle-explode` `mat:glass,paper` `trig:click,scroll` `geo:mesh-triangles` `lvl:experimental` `cost:L` `tech:webgl,three` `feel:energético,explosivo,dramático`
- **Conceito:** A é uma malha de triângulos que explode em z (cada triângulo com rotação e velocidade próprias) e se recompõe em B.
- **Sensação:** desmontar e remontar, transformação total.
- **Aplicação:** tecnologia, games, lançamentos.
- **Composição & layering:** malha com atributos por triângulo (centro, direção aleatória); vertex shader desloca por `p`.
- **Trigger · timing · easing:** 1,2 s; `power2.in` explode, `power3.out` recompõe.
- **Entrada → saída:** A → explode → nuvem → recompõe B.
- **Combina com:** GX-04, DG-09 · **Evite:** com GX-04 no mesmo site.
- **Mobile:** menos triângulos. · **Reduced:** troca direta.
- **Performance:** tudo no vertex shader.
- **Implementação:** geometria não indexada com atributo `aCenter`; troca de textura no pico.

### GL-09 · Portal com Stencil
`fam:webgl` `mech:stencil-world` `mat:space` `trig:scroll,cursor` `geo:frame-into-3d` `lvl:award` `cost:XL` `tech:three` `feel:imersivo,mágico,exploração`
- **Conceito:** uma moldura na página é uma janela para um mundo 3D (só visível dentro dela); a câmera atravessa a moldura e passa a viver dentro desse mundo, que é a próxima seção.
- **Sensação:** outro mundo, imersão total.
- **Aplicação:** produtos 3D, games, arquitetura, experiências de marca.
- **Composição & layering:** stencil buffer ou render target dentro da moldura.
- **Trigger · timing · easing:** scrub 2 telas.
- **Entrada → saída:** moldura → câmera avança → atravessa → mundo em tela cheia.
- **Combina com:** SP-03 (versão DOM), CI-09 · **Evite:** sem conteúdo 3D próprio.
- **Mobile:** vídeo pré-renderizado da travessia. · **Reduced:** imagem do mundo.
- **Performance:** cena 3D completa: carregue sob demanda.
- **Implementação:** Three.js com `stencilRef` ou `MeshPortalMaterial` (drei, em React).

### GL-10 · Blob SDF
`fam:webgl` `mech:sdf-morph` `mat:liquid,mercury` `trig:scroll,cursor` `geo:center` `lvl:experimental` `cost:M` `tech:webgl` `feel:orgânico,futurista,hipnótico`
- **Conceito:** um objeto líquido (raymarched SDF) muda de forma entre seções (esfera → cubo arredondado → forma da marca) e cresce até virar o fundo da próxima.
- **Sensação:** matéria inteligente, fluidez tecnológica.
- **Aplicação:** IA, tecnologia, cosméticos.
- **Composição & layering:** canvas central; SDFs interpolados por `p` com `smin`.
- **Trigger · timing · easing:** scrub; interpolação `smoothstep`.
- **Entrada → saída:** forma A → morph → escala → fundo B.
- **Combina com:** LQ-03 · **Evite:** blob decorativo sem relação com o conteúdo.
- **Mobile:** menos passos de raymarch (48). · **Reduced:** imagem estática.
- **Performance:** raymarch em meia resolução.
- **Implementação:** `mix(sdA(p), sdB(p), t)` + iluminação simples.

### GL-11 · Nuvem de Pontos da Foto
`fam:webgl` `mech:photo-to-pointcloud` `mat:light,data` `trig:scroll` `geo:z-from-luminance` `lvl:experimental` `cost:M` `tech:webgl` `feel:tecnológico,revelador,volumétrico`
- **Conceito:** a foto de A vira nuvem de pontos (z pela luminância ou profundidade), gira para mostrar o volume, e os pontos se reassentam na foto de B.
- **Sensação:** escaneamento, dados por trás da imagem.
- **Aplicação:** tecnologia de imagem, saúde, arquitetura (scan 3D), retratos.
- **Composição & layering:** um ponto por pixel amostrado (a cada 2–4 px).
- **Trigger · timing · easing:** scrub; rotação da câmera `sine.inOut`.
- **Entrada → saída:** foto → ganha volume → gira → reassenta como B.
- **Combina com:** GX-03, IV-08 · **Evite:** com GX-03 em sequência.
- **Mobile:** amostragem a cada 6 px. · **Reduced:** troca direta.
- **Performance:** 50–100k pontos em WebGL ok.
- **Implementação:** posições em grid; z de textura no vertex shader; cor misturada por `p`.
