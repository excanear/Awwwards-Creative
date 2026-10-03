# IN · Interaction-driven (scroll, cursor, gesture)

O usuário não assiste: **causa**. Estas transições dão ao gesto um papel físico na ficção (puxar, segurar, limpar, iluminar). Regra de ouro: toda interação obrigatória tem saída automática ou alternativa; nada bloqueia quem só quer rolar.

---

### IN-01 · Arrastar com Limiar
`fam:interaction` `mech:drag-threshold-spring` `mat:any` `trig:drag` `geo:axis` `lvl:premium` `cost:S` `tech:pointer-events,gsap` `feel:tátil,controle,satisfatório`
- **Conceito:** o usuário arrasta um puxador (aba, borda, alça); a transição segue o dedo 1:1; abaixo de 35% volta com mola; acima (ou com velocidade alta), completa sozinha.
- **Sensação:** controle físico, decisão do usuário.
- **Aplicação:** antes/depois, abrir gavetas/abas, trocar itens no celular, cortinas.
- **Composição & layering:** qualquer transição `render(p)` pode ser dirigida pelo arrasto (é o driver `drag`).
- **Trigger · timing · easing:** 1:1 durante; completar 300–450 ms `power3.out`; voltar com spring.
- **Entrada → saída:** pega → arrasta → solta → completa ou volta.
- **Combina com:** ME-06, CI-08, GL-02 · **Evite:** arrasto como única forma de avançar.
- **Mobile:** é o ambiente natural (`touch-action` correto). · **Reduced:** botão que completa direto.
- **Performance:** Pointer Events + `setPointerCapture`.
- **Implementação:** `drag()` em `assets/engine/core/drive.js`.

### IN-02 · Segurar para Revelar
`fam:interaction` `mech:hold-charge` `mat:energy,pressure` `trig:hold` `geo:pressed-element` `lvl:experimental` `cost:S` `tech:pointer-events,gsap` `feel:intencional,tenso,recompensa`
- **Conceito:** pressionar e segurar carrega a transição (um anel enche, a tela pressiona); soltar antes cancela; completar dispara a passagem.
- **Sensação:** compromisso, intenção, ritual.
- **Aplicação:** entrar numa experiência, confirmar, conteúdo "secreto", games.
- **Composição & layering:** anel de progresso na cor de evento; a cena atual comprime levemente (pressão).
- **Trigger · timing · easing:** 900–1 400 ms de carga linear; liberação 500 ms `expo.out`.
- **Entrada → saída:** pressiona → carrega → libera → transição completa.
- **Combina com:** CI-12, LQ-05 · **Evite:** em ações frequentes.
- **Mobile:** ideal (`contextmenu` bloqueado no elemento). · **Reduced:** clique simples.
- **Performance:** trivial.
- **Implementação:** `hold()` em `core/drive.js`; teclado: segurar Enter/Espaço.

### IN-03 · Velocidade como Material
`fam:interaction` `mech:velocity-mapping` `mat:any` `trig:scroll-velocity` `geo:scroll-axis` `lvl:premium` `cost:S` `tech:gsap,lenis` `feel:responsivo,vivo,físico`
- **Conceito:** a velocidade do scroll é um parâmetro do material: esticar (borracha), embaçar direcional (vento), separar canais (sinal), acelerar uma esteira, aumentar o volume.
- **Sensação:** o site sente o gesto.
- **Aplicação:** modificador global coerente com o material da Motion Language.
- **Composição & layering:** um único valor de velocidade suavizado distribuído para as camadas.
- **Trigger · timing · easing:** `v = lerp(v, raw, 0.1)`; limites rígidos.
- **Entrada → saída:** contínuo.
- **Combina com:** DG-06, DG-01, GL-05 · **Evite:** mapear velocidade para tudo (escolha 1 propriedade).
- **Mobile:** desligado ou muito sutil. · **Reduced:** desligado.
- **Performance:** 1 leitura por frame.
- **Implementação:** `ScrollTrigger.getVelocity()` ou `lenis.velocity`.

### IN-04 · Lanterna
`fam:interaction` `mech:cursor-light-mask` `mat:light,dark` `trig:cursor` `geo:cursor-point` `lvl:experimental` `cost:S` `tech:css` `feel:misterioso,exploração,íntimo`
- **Conceito:** a seção está no escuro; o cursor é uma lanterna que ilumina um círculo; ao encontrar o objeto-chave (ou após explorar), a luz se acende inteira e leva à próxima.
- **Sensação:** exploração, segredo, escuro.
- **Aplicação:** mistério, terror, museus, "por trás das câmeras".
- **Composição & layering:** overlay escuro com `mask: radial-gradient` na posição do cursor; borda suave.
- **Trigger · timing · easing:** cursor `quickTo` 0,2 s; acender 800 ms.
- **Entrada → saída:** escuro → explorar → achou → luz → B.
- **Combina com:** MK-06, MK-02 · **Evite:** esconder conteúdo essencial sem saída.
- **Mobile:** luz segue o dedo, ou o giroscópio; acende sozinha após 4 s. · **Reduced:** cena acesa.
- **Performance:** máscara CSS.
- **Implementação:** variáveis `--mx`, `--my` no overlay.

### IN-05 · Rastro que Pinta
`fam:interaction` `mech:cursor-paint-reveal` `mat:paint,ink` `trig:cursor` `geo:cursor-path` `lvl:experimental` `cost:M` `tech:canvas` `feel:criativo,lúdico,autoral`
- **Conceito:** o rastro do cursor pinta a próxima seção sobre a atual (pinceladas revelam B); quando a cobertura passa de um limiar, B completa.
- **Sensação:** o usuário cria a passagem.
- **Aplicação:** marcas criativas, arte, educação, portfólios de ilustração.
- **Composição & layering:** canvas máscara com pincel texturizado; B por baixo com `mask-image` do canvas (ou canvas desenhando B).
- **Trigger · timing · easing:** interação; completar 900 ms.
- **Entrada → saída:** pinceladas → cobertura → B completa.
- **Combina com:** LQ-11, LQ-01 · **Evite:** exigir interação (complete ao rolar).
- **Mobile:** dedo. · **Reduced:** B direto.
- **Performance:** canvas em meia resolução; `toDataURL` caro: desenhe B no canvas com `source-in`.
- **Implementação:** pincel = imagem de textura com rotação pela direção do movimento.

### IN-06 · Inclinação
`fam:interaction` `mech:device-tilt` `mat:any` `trig:gyroscope` `geo:device-axis` `lvl:experimental` `cost:S` `tech:deviceorientation` `feel:físico,lúdico,presença`
- **Conceito:** inclinar o celular move a cena (espiar atrás da porta, rolar uma bolinha, escorrer líquido); uma inclinação forte completa a transição.
- **Sensação:** o aparelho é um objeto do mundo.
- **Aplicação:** mobile-first lúdico, campanhas.
- **Composição & layering:** `beta/gamma` normalizados → `p` ou parâmetros da cena.
- **Trigger · timing · easing:** suavização 0,15; limiar de 25°.
- **Entrada → saída:** inclina → cena reage → limiar → completa.
- **Combina com:** IV-08, ME-05 · **Evite:** depender disso (permissão iOS, mesa).
- **Mobile:** é o alvo; peça permissão num gesto. · **Reduced:** desligado.
- **Performance:** trivial.
- **Implementação:** `DeviceOrientationEvent.requestPermission()` no iOS.

### IN-07 · Snap Magnético
`fam:interaction` `mech:scroll-snap-settle` `mat:magnet` `trig:scroll` `geo:section-boundaries` `lvl:refined` `cost:S` `tech:css,gsap` `feel:preciso,controlado,editorial`
- **Conceito:** perto do fim de uma transição, o scroll é atraído para o estado assentado (snap suave), evitando quadros intermediários parados.
- **Sensação:** precisão, nada fica "meio".
- **Aplicação:** cenas com estados discretos (slides, capítulos).
- **Composição & layering:** snap só nos pontos de repouso do beat sheet.
- **Trigger · timing · easing:** `snap: { snapTo: labels, duration: {min:.2,max:.6}, ease: "power1.inOut" }`.
- **Entrada → saída:** solta o scroll → assenta no estado mais próximo.
- **Combina com:** ME-03, ME-01 · **Evite:** snap agressivo em leitura livre (sensação de sequestro).
- **Mobile:** `scroll-snap` CSS nativo. · **Reduced:** snap sem animação.
- **Performance:** trivial.
- **Implementação:** ScrollTrigger `snap` com labels da timeline.

### IN-08 · Carta Arremessada
`fam:interaction` `mech:fling-card` `mat:card,paper` `trig:drag,swipe` `geo:throw-direction` `lvl:premium` `cost:S` `tech:pointer-events,gsap` `feel:decisivo,lúdico,rápido`
- **Conceito:** a seção/item é uma carta que o usuário arremessa para fora (com rotação proporcional à velocidade); a de baixo sobe para o lugar.
- **Sensação:** decisão rápida, descarte, baralho.
- **Aplicação:** seleções, quizzes, galerias no celular.
- **Composição & layering:** pilha com as próximas cartas levemente menores e deslocadas.
- **Trigger · timing · easing:** inércia real; volta com spring se fraco.
- **Entrada → saída:** arrasta → solta → voa com rotação → próxima sobe.
- **Combina com:** IV-05 · **Evite:** em conteúdo que não é escolha.
- **Mobile:** ideal. · **Reduced:** botões "próximo".
- **Performance:** 3 cartas no DOM.
- **Implementação:** driver `drag` com velocidade; `rotation = vx * 0.05`.

### IN-09 · Pinça para Mergulhar
`fam:interaction` `mech:pinch-zoom-enter` `mat:lens,map` `trig:pinch,wheel-ctrl` `geo:pinch-center` `lvl:experimental` `cost:M` `tech:pointer-events` `feel:exploração,controle,mapa`
- **Conceito:** fazer pinça (ou Ctrl+roda) sobre um item amplia-o, e passar do limiar entra na página dele (a escala continua como transição).
- **Sensação:** mapa, microscópio, ir fundo.
- **Aplicação:** mapas, galerias densas, arquivos, dados.
- **Composição & layering:** escala centrada no ponto médio dos dedos.
- **Trigger · timing · easing:** 1:1; completa acima de 2,5×.
- **Entrada → saída:** pinça → amplia → limiar → página do item.
- **Combina com:** NX-08, SP-12 · **Evite:** como único caminho (sempre um clique alternativo).
- **Mobile:** natural. · **Reduced:** clique.
- **Performance:** transform.
- **Implementação:** dois pointers, distância relativa → escala.

### IN-10 · Índice com Prévia
`fam:interaction` `mech:hover-preview-expand` `mat:image,type` `trig:hover,click` `geo:list-row` `lvl:premium` `cost:M` `tech:gsap,flip,view-transitions` `feel:editorial,elegante,curadoria`
- **Conceito:** uma lista tipográfica de itens; o hover mostra a imagem do item (com entrada própria, não fade); o clique expande a imagem da prévia até virar o hero da página.
- **Sensação:** curadoria, revista, elegância.
- **Aplicação:** portfólios, arquivos, listas de projetos (padrão Awwwards bem resolvido).
- **Composição & layering:** prévia ancorada ao cursor ou a um ponto fixo da composição; transição de entrada da prévia por máscara (MK-01, MK-09) e não fade.
- **Trigger · timing · easing:** hover 250 ms; clique 900 ms (Flip/VT da prévia até o hero).
- **Entrada → saída:** lista → prévia → clique → prévia cresce → página.
- **Combina com:** TY-13, SP-03 · **Evite:** prévia que segue o cursor com atraso exagerado (enjoo).
- **Mobile:** lista com miniatura fixa; toque abre direto. · **Reduced:** clique abre direto.
- **Performance:** pré-carregar prévias com `fetchPriority="low"` só no desktop.
- **Implementação:** `view-transition-name` na prévia ativa e no hero do destino.

### IN-11 · Eixo Trocado (honesto)
`fam:interaction` `mech:scroll-axis-remap` `mat:space` `trig:scroll` `geo:horizontal` `lvl:refined` `cost:S` `tech:gsap,scrolltrigger` `feel:percurso,linha-do-tempo,leitura`
- **Conceito:** o scroll vertical move o conteúdo na horizontal **apenas** quando o conteúdo é intrinsecamente horizontal (linha do tempo, régua, trilho, panorama).
- **Sensação:** seguir uma linha, viajar.
- **Aplicação:** linhas do tempo, réguas de carreira, panoramas.
- **Composição & layering:** indicador de progresso horizontal (a própria régua).
- **Trigger · timing · easing:** scrub linear.
- **Entrada → saída:** entra pela esquerda → percorre → sai pela direita para a próxima seção.
- **Combina com:** SP-04, NX-13 · **Evite:** horizontal sem motivo (o clássico "scroll hijack").
- **Mobile:** swipe nativo ou vertical. · **Reduced:** lista vertical.
- **Performance:** 1 transform.
- **Implementação:** sticky + `x = -(w - vw) * p`.

### IN-12 · Origem no Clique
`fam:interaction` `mech:radial-from-pointer` `mat:any` `trig:click` `geo:click-point` `lvl:refined` `cost:S` `tech:css,view-transitions` `feel:responsivo,causal,preciso`
- **Conceito:** qualquer transição de clique nasce exatamente do ponto onde o usuário clicou (a forma de revelação, a onda, a tinta, a lente), deixando a causa visível.
- **Sensação:** causa e efeito; o site responde ao usuário.
- **Aplicação:** modificador para MK-08, LQ-01, LQ-05, TY-14, page transitions.
- **Composição & layering:** passa `x, y` do `pointerdown` para a transição; teclado usa o centro do elemento.
- **Trigger · timing · easing:** igual à transição base.
- **Entrada → saída:** igual à transição base.
- **Combina com:** MK-02, MK-08, LQ-01, LQ-05 · **Evite:** origem no centro da tela quando houve clique (perde causalidade).
- **Mobile:** ponto do toque. · **Reduced:** sem origem (troca direta).
- **Performance:** trivial.
- **Implementação:** `--ox`, `--oy` em CSS; todos os módulos aceitam `origin: {x, y}`.
