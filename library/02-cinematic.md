# CI · Cinematic

A gramática do cinema tem 130 anos de transições testadas em plateias. Cada corte tem um nome e um efeito psicológico conhecido. Traduza-os para a web pelo **efeito**, não pela aparência.

---

### CI-01 · Match Cut de Forma
`fam:cinematic` `mech:shape-handoff` `mat:any` `trig:scroll,click` `geo:shared-shape` `lvl:premium` `cost:S` `tech:gsap,flip,view-transitions` `feel:elegante,inteligente,surpresa`
- **Conceito:** uma forma no fim de A (um círculo, uma linha, um rosto) coincide em posição e tamanho com uma forma diferente no início de B; o corte acontece com a forma parada.
- **Sensação:** "aha"; inteligência de montagem (o osso que vira nave).
- **Aplicação:** viradas de capítulo, comparação antes/depois, ligação entre produtos.
- **Composição & layering:** as duas formas alinhadas pixel a pixel; o resto da composição muda inteiro no corte.
- **Trigger · timing · easing:** scrub até o alinhamento; corte seco (ou 80 ms) no ponto de coincidência.
- **Entrada → saída:** a forma de A se move até a posição-alvo → corte → B se desenvolve a partir da forma.
- **Combina com:** TY-05, GX-02 · **Evite:** formas que não coincidem de verdade (vira só um corte).
- **Mobile:** recalcule o alinhamento por breakpoint. · **Reduced:** corte seco direto (já é sem movimento).
- **Performance:** trivial.
- **Implementação:** medir a caixa-alvo em B (`getBoundingClientRect` antes), animar a forma de A até ela, trocar camadas no frame exato.

### CI-02 · Rack Focus
`fam:cinematic` `mech:depth-of-field` `mat:lens,glass` `trig:scroll` `geo:z-planes` `lvl:premium` `cost:M` `tech:css-filter,webgl` `feel:íntimo,contemplativo,fotográfico`
- **Conceito:** o foco passa do primeiro plano (A) para o fundo (B): A desfoca enquanto B, que já estava lá fora de foco, fica nítido.
- **Sensação:** atenção mudando; olhar de fotógrafo.
- **Aplicação:** do texto para a imagem, de uma pessoa para o lugar, depoimentos.
- **Composição & layering:** B atrás de A desde o início (desfocada); A na frente; o blur é a transição (não fade).
- **Trigger · timing · easing:** scrub 1 tela; blur de A 0 → 12 px e de B 12 → 0 em `sine.inOut`, cruzados em 50%.
- **Entrada → saída:** A nítida com B borrada → foco viaja → B nítida, A vira bokeh e sai.
- **Combina com:** IV-08, CI-06 · **Evite:** usar blur fora desta lógica (R5).
- **Mobile:** blur máx. 6 px, ou substitua por escurecimento. · **Reduced:** B nítida direto; A some.
- **Performance:** `filter: blur` é caro em áreas grandes; prefira imagem pré-borrada em crossfade, ou um passe WebGL.
- **Implementação:** duas imagens (nítida + pré-desfocada) por plano com opacidade cruzada; ou shader de blur em 1 passe.

### CI-03 · Dolly Zoom (Vertigo)
`fam:cinematic` `mech:counter-scale` `mat:space` `trig:scroll` `geo:center` `lvl:experimental` `cost:S` `tech:gsap` `feel:vertigem,tensão,revelação`
- **Conceito:** o sujeito fica do mesmo tamanho enquanto o fundo se expande (ou contrai) ao redor: fundo escala num sentido, câmera no outro.
- **Sensação:** desconforto, percepção mudando, epifania.
- **Aplicação:** momento de revelação, virada de ato, problema → solução.
- **Composição & layering:** sujeito (recorte) fixo; fundo com escala 1 → 1,6 e perspectiva de linhas convergentes.
- **Trigger · timing · easing:** scrub 1 tela, `power1.inOut`.
- **Entrada → saída:** cena estável → fundo estica → no máximo, o fundo vira a próxima seção.
- **Combina com:** SP-05, NX-11 · **Evite:** em seções de leitura.
- **Mobile:** efeito menor (1 → 1,3). · **Reduced:** fundo final estático.
- **Performance:** 2 transforms.
- **Implementação:** sujeito sem transform; fundo `scale` + `perspective-origin` no centro do sujeito.

### CI-04 · Whip Pan
`fam:cinematic` `mech:directional-blur-cut` `mat:speed` `trig:click,scroll-threshold` `geo:horizontal` `lvl:premium` `cost:M` `tech:gsap,svg-filter,webgl` `feel:energético,urbano,impulso`
- **Conceito:** a câmera chicoteia para o lado: A borra direcionalmente, um quadro de puro rastro, B chega borrada e assenta.
- **Sensação:** energia, mudança brusca de assunto, montagem esportiva.
- **Aplicação:** troca de produto/categoria, carrosséis de campanha, moda, esporte.
- **Composição & layering:** A e B lado a lado num trilho; blur direcional (SVG `feGaussianBlur stdDeviation="40 0"`) proporcional à velocidade.
- **Trigger · timing · easing:** clique 450 ms; `expo.in` até o meio, `expo.out` depois; blur pico no meio.
- **Entrada → saída:** micro-antecipação para o lado oposto (8 px) → chicote → B assenta com 4 px de overshoot.
- **Combina com:** CI-11, IN-03 · **Evite:** em leitura densa; repetir em todas as trocas.
- **Mobile:** ligado ao swipe (velocidade real do dedo). · **Reduced:** troca direta.
- **Performance:** filtro SVG só durante a transição; ou motion blur barato com 3 cópias semitransparentes deslocadas.
- **Implementação:** trilho com `x`; `feGaussianBlur` com `stdDeviation` atualizado no render.

### CI-05 · Smash Cut com Silêncio
`fam:cinematic` `mech:hard-cut-hold` `mat:void` `trig:scroll-threshold,click` `geo:none` `lvl:refined` `cost:S` `tech:css` `feel:brutal,dramático,pausa`
- **Conceito:** corte seco de uma cena cheia para um quadro quase vazio (preto, uma palavra), segurado por um tempo; depois a próxima cena.
- **Sensação:** choque, silêncio, ênfase máxima por contraste.
- **Aplicação:** manifesto, dado chocante, virada de ato.
- **Composição & layering:** uma tela só com uma palavra/número; nada mais.
- **Trigger · timing · easing:** limiar de scroll; corte em 0 ms; segura 0,8–1,2 tela (scroll) ou 900 ms.
- **Entrada → saída:** cena cheia → preto + palavra → a palavra é a âncora de onde a próxima cena nasce.
- **Combina com:** TY-05, CI-12 · **Evite:** mais de 1 vez por site.
- **Mobile:** igual. · **Reduced:** igual (já é estático).
- **Performance:** zero.
- **Implementação:** seção de 100svh fixa com a palavra; troca via `data-state` no limiar.

### CI-06 · L-Cut / J-Cut Tipográfico
`fam:cinematic` `mech:lead-lag` `mat:text` `trig:scroll` `geo:layer-offset` `lvl:refined` `cost:S` `tech:css,gsap` `feel:fluido,narrativo,editorial`
- **Conceito:** como o som que começa antes do corte: o texto de B chega enquanto a imagem de A ainda está na tela (J-cut), ou o texto de A permanece sobre a imagem de B (L-cut).
- **Sensação:** fluidez narrativa; as seções conversam.
- **Aplicação:** qualquer passagem entre seção de imagem e seção de texto.
- **Composição & layering:** camadas de texto desacopladas das de imagem, com offset de 20–40% do trilho.
- **Trigger · timing · easing:** scrub; texto adiantado em 0,3 tela.
- **Entrada → saída:** imagem A + título de B entrando → imagem troca → título já assentado.
- **Combina com:** quase tudo; é um modificador · **Evite:** sobreposição ilegível (contraste!).
- **Mobile:** offset menor. · **Reduced:** ordem de leitura normal.
- **Performance:** trivial.
- **Implementação:** dois `segment()` defasados no mesmo `render(p)`.

### CI-07 · Diafragma de Lâminas
`fam:cinematic` `mech:polygon-iris` `mat:metal,lens` `trig:click,scroll` `geo:radial-center` `lvl:premium` `cost:S` `tech:css,gsap` `feel:mecânico,fotográfico,preciso`
- **Conceito:** a íris clássica, mas com as lâminas de um diafragma de câmera: um polígono que gira enquanto fecha (ou abre), com arestas retas.
- **Sensação:** obturador, foto tirada, precisão óptica.
- **Aplicação:** fotografia, câmeras, ótica, "capturar o momento", galerias.
- **Composição & layering:** clip-path polígono de 6–8 vértices no `from`, girando ~60° enquanto o raio vai a zero; `to` por baixo.
- **Trigger · timing · easing:** clique 700 ms `power3.inOut`; scrub 1 tela.
- **Entrada → saída:** abertura total → fecha girando → (opcional: segura fechado 80 ms, "clique") → abre já na nova cena.
- **Combina com:** IV-01, IV-04 · **Evite:** íris circular padrão (é clichê de cartoon).
- **Mobile:** igual. · **Reduced:** corte com flash de 120 ms da cor de evento.
- **Performance:** clip-path poligonal: barato.
- **Implementação:** `assets/engine/transitions/aperture.js`.

### CI-08 · Split Diopter
`fam:cinematic` `mech:split-converge` `mat:lens` `trig:scroll` `geo:vertical-split` `lvl:premium` `cost:S` `tech:css,gsap` `feel:dualidade,tensão,comparação`
- **Conceito:** a tela se divide; uma metade continua em A, a outra já mostra B; a divisória se move até B ocupar tudo.
- **Sensação:** duas realidades ao mesmo tempo; comparação.
- **Aplicação:** antes/depois, problema/solução, duas personas, dois produtos.
- **Composição & layering:** `clip-path: inset()` complementares; a divisória é uma linha com leve refração.
- **Trigger · timing · easing:** scrub, com uma parada no meio (as duas metades lidas juntas).
- **Entrada → saída:** A → divisória entra → pausa em 50/50 → B toma a tela.
- **Combina com:** IN-01 (arrastar a divisória) · **Evite:** slider "antes/depois" de template sem pausa narrativa.
- **Mobile:** divisão horizontal (em cima/embaixo). · **Reduced:** as duas metades lado a lado, estáticas.
- **Performance:** barato.
- **Implementação:** `--split` em %, dois `inset()`.

### CI-09 · Plano-Sequência (Oner)
`fam:cinematic` `mech:continuous-camera` `mat:world` `trig:scroll` `geo:path` `lvl:award` `cost:L` `tech:gsap,scrolltrigger,css-3d,webgl` `feel:imersivo,virtuoso,fluido`
- **Conceito:** não há cortes: um único movimento de câmera atravessa várias seções que são lugares de um mesmo mundo contínuo.
- **Sensação:** virtuosismo, imersão total.
- **Aplicação:** heros longos, storytelling de marca, lançamento.
- **Composição & layering:** um mundo grande (DOM em 3D ou cena WebGL) com as seções posicionadas ao longo de um caminho; a câmera segue uma curva.
- **Trigger · timing · easing:** scrub longo; velocidade de câmera variando (desacelera em cada "estação").
- **Entrada → saída:** cada seção é uma parada; a saída da última encosta na próxima seção comum.
- **Combina com:** NX-06 · **Evite:** em sites de consulta rápida.
- **Mobile:** caminho mais curto, menos estações. · **Reduced:** as estações como seções comuns.
- **Performance:** o mundo inteiro precisa caber; carregue estações por proximidade.
- **Implementação:** caminho como curva (Catmull-Rom) parametrizada por `p`; câmera = transform inverso.

### CI-10 · Letterbox (Mudança de Proporção)
`fam:cinematic` `mech:aspect-change` `mat:film` `trig:scroll-threshold` `geo:horizontal-bars` `lvl:refined` `cost:S` `tech:css,gsap` `feel:cinematográfico,cerimonial,foco`
- **Conceito:** barras pretas entram e mudam a proporção da tela (para 2.39:1) ao entrar num momento "filme"; saem ao voltar ao site.
- **Sensação:** "agora é cinema"; atenção.
- **Aplicação:** vídeo de marca, depoimento, manifesto.
- **Composição & layering:** duas barras fixas; a navbar se esconde; legenda tipográfica dentro da barra inferior.
- **Trigger · timing · easing:** limiar; 600 ms `--ease-chapter`.
- **Entrada → saída:** barras fecham → cena → barras abrem na próxima seção.
- **Combina com:** IV-02, CI-06 · **Evite:** usar sem conteúdo cinematográfico real.
- **Mobile:** barras mais finas (em retrato, proporção 4:5 em vez de 2.39). · **Reduced:** barras estáticas.
- **Performance:** trivial (scaleY).
- **Implementação:** barras com `scaleY` e `transform-origin` nas bordas.

### CI-11 · Montagem Staccato
`fam:cinematic` `mech:rapid-cuts` `mat:frames` `trig:scroll,click` `geo:none` `lvl:premium` `cost:S` `tech:css,gsap` `feel:energético,rítmico,urgente`
- **Conceito:** uma sequência rápida de quadros (4–8 imagens, 80–120 ms cada) como montagem soviética, terminando no quadro da próxima seção.
- **Sensação:** ritmo, abundância, energia.
- **Aplicação:** portfólio com muitos trabalhos, moda, eventos, música.
- **Composição & layering:** quadros empilhados, um visível por vez; o último é o hero de B.
- **Trigger · timing · easing:** clique: steps; scroll: cada 0,1 tela troca um quadro (é um flipbook preso ao scroll).
- **Entrada → saída:** A → rajada de cortes → B assenta (o último corte segura).
- **Combina com:** IV-06, CI-04 · **Evite:** acima de 3 trocas por segundo com alto contraste (fotossensibilidade).
- **Mobile:** igual com imagens menores. · **Reduced:** só o quadro final.
- **Performance:** pré-carregar as imagens; usar sprites ou `<img>` com decode antes.
- **Implementação:** índice = `floor(p * n)`; `img.decode()` antes de liberar.

### CI-12 · Queima de Exposição
`fam:cinematic` `mech:overexpose` `mat:light,film` `trig:scroll,click` `geo:hotspot` `lvl:premium` `cost:M` `tech:css-filter,webgl` `feel:nostálgico,luminoso,epifania`
- **Conceito:** a imagem superexpõe a partir de um ponto quente (como filme queimando ou luz estourando) até o branco/cor; a próxima cena revela ao baixar a exposição.
- **Sensação:** memória, revelação, luz demais.
- **Aplicação:** marcas de luz/foto/memória, virada emocional.
- **Composição & layering:** gradiente radial aditivo (`mix-blend-mode: screen`) crescendo + `brightness` subindo; grão de filme por cima.
- **Trigger · timing · easing:** 900 ms; subida `power2.in`, descida `power2.out`.
- **Entrada → saída:** ponto quente aparece → toma a tela → branco segura 1 quadro → B com exposição voltando ao normal.
- **Combina com:** IV-10, NX-04 · **Evite:** flash branco puro rápido (vira "estouro" barato e agride).
- **Mobile:** igual. · **Reduced:** transição de cor curta.
- **Performance:** `filter: brightness` em tela cheia é aceitável por < 1 s; WebGL para versão com grão real.
- **Implementação:** overlay com `radial-gradient` animado por custom properties + `brightness` no `from`.
