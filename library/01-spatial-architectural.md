# SP · Spatial / Architectural

A tela é um **lugar**. Transições espaciais movem o usuário através de um espaço com regras (portas, corredores, plantas, andares). Funcionam quando o conteúdo tem hierarquia física: dentro/fora, em cima/embaixo, antes/depois de uma passagem.

---

### SP-01 · Corte de Seção (A–A)
`fam:spatial` `mech:clip-line` `mat:paper,line` `trig:click,route` `geo:line-from-click` `lvl:premium` `cost:S` `tech:view-transitions,css,svg` `feel:precisão,técnico,editorial`
- **Conceito:** a linha de corte do desenho técnico (traço-ponto, setas, rótulo "A—A") é desenhada na altura do clique; a página fecha sobre essa linha e a próxima abre a partir dela, como a vista em corte.
- **Sensação:** precisão, alguém medindo e abrindo o objeto para mostrar o interior.
- **Aplicação:** page transitions de lista → detalhe em portfólios técnicos, arquitetura, engenharia, produto.
- **Composição & layering:** linha SVG por cima de tudo (z máx.); página antiga e nova em `::view-transition-old/new`; rótulos "A" nas extremidades.
- **Trigger · timing · easing:** clique; desenhar linha 280 ms `power2.out`; fechar 450 ms `--ease-chapter`; abrir 600 ms com 150 ms de overlap.
- **Entrada → saída:** linha nasce das bordas para o centro → página se comprime até a linha → nova página expande da linha para cima e para baixo.
- **Combina com:** GX-01, NX-01, TY-04 · **Evite:** com MK-12 no mesmo site (mesma geometria).
- **Mobile:** igual; linha mais grossa (2 px) e rótulos menores. · **Reduced:** navegação direta; a linha aparece estática 150 ms no destino.
- **Performance:** clip-path em snapshot de VT: barato.
- **Implementação:** `assets/engine/transitions/section-cut.js`; `--cut-y` = y do clique em %; keyframes de `inset()`.

### SP-02 · Planta que Deita
`fam:spatial` `mech:3d-rotate` `mat:paper` `trig:scroll` `geo:plane-to-floor` `lvl:award` `cost:M` `tech:css-3d,gsap,scrolltrigger` `feel:técnico,monumental,construtivo`
- **Conceito:** a seção (uma prancha) inclina para a isometria e deita como planta no chão; a próxima cena é construída sobre ela, em pé.
- **Sensação:** passar do desenho para a construção; o plano vira terreno.
- **Aplicação:** arquitetura, engenharia, produto que vai do conceito ao real, onboarding de processo.
- **Composição & layering:** contêiner com `perspective: 1600px`; prancha com `rotateX(55deg) rotateZ(-45deg)` no fim; próxima seção entra em pé na frente, sombra projetada sobre a planta.
- **Trigger · timing · easing:** scrub em 1,5–2 telas; rotação com `power2.inOut` dentro do render; sombra atrasada 20%.
- **Entrada → saída:** prancha frontal → inclina → deita e recua em z → elementos da próxima "levantam" da planta.
- **Combina com:** SP-13, ME-12, NX-11 · **Evite:** com SP-09 (dois giros 3D seguidos).
- **Mobile:** inclinação menor (35°/−30°), menos recuo. · **Reduced:** a prancha aparece já como planta pequena acima da próxima seção, estática.
- **Performance:** 1 camada 3D; cuidado com texto em 3D (borra): rasterize só durante o movimento.
- **Implementação:** GSAP em `rotationX`, `rotationZ`, `z`; `transform-style: preserve-3d` só no contêiner da cena.

### SP-03 · Portal (Atravessar)
`fam:spatial` `mech:mask-scale` `mat:frame,light` `trig:scroll,click,route` `geo:shape-from-content` `lvl:premium` `cost:S` `tech:css,gsap,view-transitions` `feel:íntimo,acolhedor,cerimonial`
- **Conceito:** uma abertura com a forma do símbolo da marca (arco, janela, fechadura, logo) contém a próxima cena; atravessá-la é crescer a máscara até a tela inteira.
- **Sensação:** entrar num lugar; convite.
- **Aplicação:** heros, entrada em detalhe (card → página), mudança de mundo.
- **Composição & layering:** fundo = cena atual; meio = máscara com a forma; dentro dela, a próxima cena em escala ligeiramente maior que contrai enquanto a máscara cresce (efeito de atravessar, não de zoom); frente = texto que cruza a borda e muda de cor (TY-02).
- **Trigger · timing · easing:** scrub 1–1,5 telas, ou clique 0,9 s `--ease-chapter`; conteúdo interno contra-escala de 1,15 → 1.
- **Entrada → saída:** porta pequena → cresce → bordas saem da tela → a cena interna é a nova seção.
- **Combina com:** TY-02, TY-03, ME-06, IN-10 · **Evite:** mais de um portal com a mesma forma em sequência.
- **Mobile:** a porta já ocupa ~80% da tela no primeiro quadro; travessia curta. · **Reduced:** a cena interna já em tela cheia; a forma vira moldura estática.
- **Performance:** `clip-path` ou `mask` com raio em variáveis CSS (`--r`) animadas: barato. Vídeo dentro: poster primeiro.
- **Implementação:** variáveis da caixa da porta em CSS; GSAP anima as variáveis. Entre rotas: `view-transition-name` igual no card e no hero.

### SP-04 · Corredor de Molduras
`fam:spatial` `mech:camera-track` `mat:frame` `trig:scroll` `geo:horizontal-path` `lvl:premium` `cost:M` `tech:gsap,scrolltrigger` `feel:galeria,sereno,percurso`
- **Conceito:** o scroll vertical vira caminhada horizontal por um corredor de molduras (arcos, vitrines, quadros); cada moldura é um capítulo.
- **Sensação:** visita guiada, museu, vitrine de rua.
- **Aplicação:** serviços, coleções, etapas, cases curtos.
- **Composição & layering:** trilho horizontal fixo; molduras em primeiro plano passam mais rápido que o fundo (2 planos, não parallax decorativo: o fundo é a parede do corredor).
- **Trigger · timing · easing:** scrub, ~0,8 tela por moldura + pausa de 0,4 tela em cada uma (snap opcional).
- **Entrada → saída:** entra pela primeira moldura → atravessa → a última moldura se abre (SP-03) para a próxima seção.
- **Combina com:** SP-03, IV-02 · **Evite:** com IN-11 genérico na mesma página.
- **Mobile:** pilha vertical das molduras, ou swipe nativo com `scroll-snap-type: x mandatory`. · **Reduced:** lista vertical.
- **Performance:** um transform no trilho; vídeos só tocam na moldura ativa.
- **Implementação:** sticky track + `x` do trilho = `-(largura - viewport) * p`.

### SP-05 · Túnel em Perspectiva
`fam:spatial` `mech:z-travel` `mat:frame,light` `trig:scroll` `geo:z-depth` `lvl:award` `cost:M` `tech:css-3d,gsap,scrolltrigger` `feel:jornada,tensão,imersivo`
- **Conceito:** a câmera avança por um túnel; cada passo vem do fundo emoldurado, é lido no plano da tela e passa pela câmera.
- **Sensação:** progresso inevitável, travessia.
- **Aplicação:** "como funciona", processos de 3–6 etapas, linha do tempo.
- **Composição & layering:** `perspective` no palco; itens em `translateZ` escalonado; luz/cor do fundo escurece com a profundidade.
- **Trigger · timing · easing:** scrub 1 tela por etapa; cada item: z de −2000 → 0 (pausa) → +600 com opacidade só no último 15%.
- **Entrada → saída:** a seção anterior vira a boca do túnel → etapas → a última moldura é uma porta clara que a câmera atravessa (handoff de cor).
- **Combina com:** NX-11, SP-03, CI-03 · **Evite:** com GL-09 (dois mergulhos em z).
- **Mobile:** menos profundidade, etapas maiores. · **Reduced:** etapas empilhadas com a numeração.
- **Performance:** só transforms; limite a 6–8 itens no palco.
- **Implementação:** cada item lê `pItem = segment(p, i/n, (i+1.4)/n)` e mapeia para `z`.

### SP-06 · Descida de Camadas
`fam:spatial` `mech:vertical-stack-swap` `mat:layers` `trig:scroll` `geo:depth-rail` `lvl:award` `cost:L` `tech:gsap,scrolltrigger,svg` `feel:técnico,investigativo,profundo`
- **Conceito:** descer de uma superfície até o núcleo (aplicação → rede → SO → kernel → silício; pele → osso; solo → raiz); cada camada afunda enquanto a próxima sobe, e uma régua lateral marca a profundidade.
- **Sensação:** investigação, ir ao fundo das coisas.
- **Aplicação:** stack técnica, ciência, processo industrial, anatomia de produto.
- **Composição & layering:** desenho atual sobe e some para cima; próximo sobe de baixo; plaqueta lateral troca o nome da camada; ponto da cor de evento desce na régua.
- **Trigger · timing · easing:** scrub, 1 tela por camada + pausa de leitura.
- **Entrada → saída:** frase de abertura sozinha → camadas → no fundo, um objeto (letra, chip, semente) vira a superfície da próxima seção.
- **Combina com:** GX-12, TY-01, NX-07 · **Evite:** se outro site do estúdio já usa "descer pela pilha" (ver caso Guilherme).
- **Mobile:** régua no topo como barra horizontal. · **Reduced:** camadas em sequência, cada desenho no estado final.
- **Performance:** construa a cena na aproximação; desenhos em SVG/HTML, sem imagens grandes.
- **Implementação:** referência real: escanearcplx `BelowTheSurface.tsx` (timeline com batidas por camada).

### SP-07 · Folha sobre Folha (Freeze & Cover)
`fam:spatial` `mech:cover-slide` `mat:paper` `trig:scroll` `geo:edge` `lvl:premium` `cost:M` `tech:gsap,scrolltrigger` `feel:editorial,documental,sóbrio`
- **Conceito:** a seção que sai congela e recua; a próxima é colocada por cima como uma folha nova, deslizando de lado (ou subindo), com cantos arredondados só na borda de ataque; a de trás é empurrada um pouco ao contrário.
- **Sensação:** um dossiê sendo montado, página sobre página.
- **Aplicação:** relatórios, portfólios, documentação, cases.
- **Composição & layering:** de trás: escala 0,88 + escurece + `x` −8%; nova: `x` 100% → 0 presa ao topo, `clip-path: inset(... round)`.
- **Trigger · timing · easing:** scrub em 2 telas; `power2.inOut` dentro do render.
- **Entrada → saída:** folha entra → cobre → a de trás some atrás dela (sem corte).
- **Combina com:** ME-07, NX-07 · **Evite:** usar em todas as seções (máximo ⌈N/4⌉).
- **Mobile:** sobe de baixo em vez de vir de lado. · **Reduced:** scroll normal; seções com borda superior arredondada.
- **Performance:** transforms; offsets removidos em `refreshInit`.
- **Implementação:** `direcao-awwwards/assets/templates/motion/FreezeBehind.tsx` + `SlideInSheet.tsx`.

### SP-08 · Dobradura
`fam:spatial` `mech:fold` `mat:paper` `trig:scroll,click` `geo:axis-crease` `lvl:experimental` `cost:M` `tech:css-3d,gsap` `feel:artesanal,lúdico,editorial`
- **Conceito:** a seção se dobra ao meio (ou em sanfona) sobre um vinco, revelando a próxima por trás; o verso da folha tem a cor da próxima seção.
- **Sensação:** papel físico, um folder sendo fechado, origami.
- **Aplicação:** editorial, marcas de papelaria, convites, menus, mudança de capítulo.
- **Composição & layering:** 2 metades (clones com clip de 50%), a de cima gira em `rotateX` no vinco; sombra no vinco; próxima seção atrás.
- **Trigger · timing · easing:** clique 0,9 s `power3.inOut` ou scrub 1,2 telas.
- **Entrada → saída:** vinco aparece (linha de luz) → metade dobra → verso colorido cobre → próxima revelada.
- **Combina com:** SP-13, TY-14 · **Evite:** com SP-02 (dois planos girando).
- **Mobile:** dobra horizontal (vinco vertical) para caber. · **Reduced:** corte direto com uma linha de vinco estática por 200 ms.
- **Performance:** clones são snapshot; não clone vídeos/iframes (substitua por poster).
- **Implementação:** `assets/engine/transitions/paper-fold.js`.

### SP-09 · Cubo de Cômodos
`fam:spatial` `mech:3d-rotate` `mat:room` `trig:scroll,click` `geo:corner` `lvl:experimental` `cost:M` `tech:css-3d,gsap` `feel:arquitetônico,lúdico,exploração`
- **Conceito:** seções são paredes de um mesmo cômodo; a transição é virar a esquina: a câmera gira 90° em torno da aresta.
- **Sensação:** mudar de parede numa exposição; continuidade espacial.
- **Aplicação:** galerias, imobiliário, coleções.
- **Composição & layering:** duas faces com `rotateY` em torno da aresta compartilhada; sombra na quina.
- **Trigger · timing · easing:** clique 1 s `--ease-chapter`; scrub 1 tela.
- **Entrada → saída:** a aresta se aproxima do centro → giro → nova parede frontal.
- **Combina com:** IV-04 · **Evite:** com SP-02.
- **Mobile:** giro em torno da aresta horizontal (para baixo). · **Reduced:** corte com uma linha de quina.
- **Performance:** 2 faces 3D; `backface-visibility: hidden`.
- **Implementação:** GSAP `rotationY` no contêiner com `transformOrigin` na aresta e `z` negativo de metade da largura.

### SP-10 · Janela Interna (Droste)
`fam:spatial` `mech:nested-frames` `mat:frame` `trig:scroll` `geo:recursive-center` `lvl:experimental` `cost:M` `tech:css,gsap` `feel:onírico,hipnótico,infinito`
- **Conceito:** a próxima seção já está visível numa janela dentro da atual, que tem outra janela dentro, e outra; a câmera atravessa uma camada por vez (efeito Droste).
- **Sensação:** profundidade infinita, uma coisa contendo a próxima.
- **Aplicação:** sequências de produtos/edições, "o que há dentro de", timeline de versões.
- **Composição & layering:** 3–4 molduras aninhadas centradas; cada uma contém o conteúdo da seção seguinte em miniatura.
- **Trigger · timing · easing:** scrub; escala exponencial (`scale = k^p`) para velocidade perceptual constante.
- **Entrada → saída:** moldura N ocupa a tela → a N+1 já aparece no centro → repete.
- **Combina com:** NX-08 · **Evite:** com SP-03 e TY-01 no mesmo site (três mergulhos).
- **Mobile:** 2 níveis só. · **Reduced:** seções em sequência, cada uma com a miniatura da seguinte estática.
- **Performance:** só transforms; mantenha 3 níveis renderizados.
- **Implementação:** escala logarítmica: `s = Math.pow(ratio, p)`; origem arredondada a pixel.

### SP-11 · Patamares
`fam:spatial` `mech:stepped-z` `mat:stone,paper` `trig:scroll` `geo:stairs` `lvl:premium` `cost:S` `tech:css-3d,gsap` `feel:ordenado,monumental,ascensão`
- **Conceito:** o conteúdo está em degraus; a transição desce (ou sobe) um degrau: o patamar atual afunda em z e a próxima seção se apoia no degrau de baixo.
- **Sensação:** progressão por níveis, hierarquia.
- **Aplicação:** planos/pricing, níveis de maturidade, carreira.
- **Composição & layering:** planos com `translateZ` e `translateY` escalonados, aresta iluminada em cada degrau.
- **Trigger · timing · easing:** scrub, `power1.inOut`.
- **Entrada → saída:** patamar atual → passo para baixo (aresta passa pela câmera) → novo patamar.
- **Combina com:** TY-03, ME-03 · **Evite:** parallax genérico disfarçado (o degrau precisa ser visível).
- **Mobile:** degraus em 2D (deslocamento + sombra). · **Reduced:** blocos com bordas de degrau estáticas.
- **Performance:** barato.
- **Implementação:** GSAP sobre um contêiner `preserve-3d` com 3 planos.

### SP-12 · Maquete (Pull-back)
`fam:spatial` `mech:camera-pullback` `mat:map,grid` `trig:scroll,click` `geo:tile-in-grid` `lvl:award` `cost:M` `tech:gsap,flip` `feel:panorâmico,revelador,sistemático`
- **Conceito:** a câmera recua e revela que a seção era um ladrilho num mapa/grade maior; viaja pela maquete e mergulha no ladrilho da próxima.
- **Sensação:** visão de sistema, "tudo faz parte de algo".
- **Aplicação:** sumário do site, ecossistema de produtos, mapa de cases.
- **Composição & layering:** grade de miniaturas (snapshots ou versões simplificadas) com a seção atual em escala 1; escala do mundo inteiro anima.
- **Trigger · timing · easing:** clique 1,4 s em 3 tempos (recuo `power2.out` · viagem `sine.inOut` · mergulho `power3.in`).
- **Entrada → saída:** seção → encolhe em ladrilho → pan → cresce no ladrilho alvo.
- **Combina com:** TY-13, NX-13 · **Evite:** com SP-10.
- **Mobile:** grade de 2 colunas, viagem vertical. · **Reduced:** salto direto com o mapa mostrado 300 ms estático.
- **Performance:** miniaturas como imagens/elementos leves, não clones completos.
- **Implementação:** GSAP Flip entre estado "mapa" e estado "tela cheia"; o mundo inteiro é um transform.

### SP-13 · Pop-up Book
`fam:spatial` `mech:hinge-stand-up` `mat:paper,cardboard` `trig:scroll` `geo:floor-hinges` `lvl:experimental` `cost:M` `tech:css-3d,gsap` `feel:lúdico,artesanal,surpresa`
- **Conceito:** a próxima seção chega deitada e seus elementos se levantam do papel como num livro pop-up, cada um em sua dobradiça.
- **Sensação:** maravilha infantil, objeto físico.
- **Aplicação:** marcas infantis, educação, turismo, lançamentos lúdicos.
- **Composição & layering:** chão inclinado (`rotateX 60°`), elementos com `transform-origin: bottom` saindo de −90° para 0 em stagger por profundidade.
- **Trigger · timing · easing:** scrub 1,2 telas; cada elemento com overshoot leve (`back.out(1.4)` no render).
- **Entrada → saída:** página deitada → peças levantam (de trás para frente) → câmera endireita.
- **Combina com:** SP-02, SP-08 · **Evite:** em marcas sérias.
- **Mobile:** menos peças, ângulo menor. · **Reduced:** peças em pé, estáticas.
- **Performance:** ≤ 12 peças.
- **Implementação:** GSAP `rotationX` com `transformOrigin: "50% 100%"`.
