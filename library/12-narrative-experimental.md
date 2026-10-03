# NX · Narrative / Experimental / Meta

As transições mais raras: aquelas em que **a ideia é a transição**. Não são efeitos visuais; são decisões de roteiro (o site mede a si mesmo, muda de estado, rima, tem um personagem). Exigem Content DNA forte e quase sempre combinam outra família como execução.

---

### NX-01 · O Site se Mede
`fam:narrative` `mech:live-measurement` `mat:line,data` `trig:load,resize,scroll` `geo:element-bounds` `lvl:art` `cost:M` `tech:js,svg` `feel:inteligente,técnico,autorreferente`
- **Conceito:** cotas, réguas e anotações medem os elementos reais da página na tela do visitante (largura do nome em px, altura das maiúsculas, distância entre seções); as transições são as cotas se desenhando e atualizando.
- **Sensação:** precisão, autoconsciência, "isso foi feito para a minha tela".
- **Aplicação:** engenharia, arquitetura, design de produto, tipografia.
- **Composição & layering:** SVG de cotas sobre o conteúdo; terminais com o símbolo da marca.
- **Trigger · timing · easing:** desenho com curva de caneta; atualização no resize (com tween curto).
- **Entrada → saída:** cota se desenha → número conta até o valor real → cota recolhe/vira divisória da próxima.
- **Combina com:** GX-01, ME-12, SP-01 · **Evite:** medidas falsas.
- **Mobile:** menos cotas, números menores. · **Reduced:** cotas desenhadas com o valor.
- **Performance:** medir no resize com debounce.
- **Implementação:** `ResizeObserver` + `getBoundingClientRect` → linhas SVG. Ref.: Guilherme Antunes `Cota.tsx`.

### NX-02 · Quebrar a Moldura
`fam:narrative` `mech:browser-ui-involve` `mat:interface` `trig:scroll,route` `geo:browser-chrome` `lvl:experimental` `cost:S` `tech:js` `feel:irônico,surpreendente,meta`
- **Conceito:** a transição envolve elementos fora do "palco": o título da aba muda junto, o favicon anima, a barra de rolagem é estilizada como régua/elemento da cena, o cursor do sistema vira objeto da história.
- **Sensação:** o site sabe que é um site; cumplicidade.
- **Aplicação:** marcas irreverentes, estúdios, portfólios.
- **Composição & layering:** `document.title`, favicon dinâmico (canvas → data URL), `::-webkit-scrollbar` / `scrollbar-color`.
- **Trigger · timing · easing:** a cada mudança de capítulo.
- **Entrada → saída:** a seção muda → a aba "responde".
- **Combina com:** NX-09, ME-02 · **Evite:** título piscando (irrita e prejudica acessibilidade).
- **Mobile:** só título/scroll indicator próprio. · **Reduced:** título muda sem animação.
- **Performance:** trivial.
- **Implementação:** favicon com canvas 32×32 atualizado no máximo 4×/s.

### NX-03 · Rima
`fam:narrative` `mech:bookend-echo` `mat:master-object` `trig:scroll` `geo:mirror-structure` `lvl:award` `cost:S` `tech:any` `feel:completo,satisfatório,autoral`
- **Conceito:** a última transição do site repete a primeira em outro estado (a prancha dele → a prancha em branco do visitante; a capa assinada → o termo assinado; a porta que abre → a porta pela qual se vai para casa).
- **Sensação:** fechamento, obra completa.
- **Aplicação:** todo site Award-Level.
- **Composição & layering:** mesmo objeto, mesma posição, estado oposto.
- **Trigger · timing · easing:** espelhado do hero (mesma curva, sentido inverso).
- **Entrada → saída:** fim → objeto do início reaparece → agora é do usuário.
- **Combina com:** qualquer · **Evite:** rima só de cor (é fraca).
- **Mobile:** igual. · **Reduced:** igual estático.
- **Performance:** —
- **Implementação:** reutilize o componente do hero com props de estado.

### NX-04 · Hora Real
`fam:narrative` `mech:time-of-day-state` `mat:light,sky` `trig:time,load` `geo:global` `lvl:experimental` `cost:S` `tech:js,css` `feel:vivo,pessoal,poético`
- **Conceito:** o horário real do visitante (ou da marca) define a luz do site; as transições entre seções avançam o dia (manhã → noite), e o fim do site é o "agora".
- **Sensação:** o site vive no mesmo tempo que eu.
- **Aplicação:** hotelaria, café, rádio, marcas locais, portfólios com "hora em São Paulo".
- **Composição & layering:** tokens de cor interpolados por hora; sombras com ângulo do sol.
- **Trigger · timing · easing:** scrub ao longo do site + estado inicial pela hora real.
- **Entrada → saída:** cada seção é um período do dia.
- **Combina com:** NX-11, IV-07 · **Evite:** prejudicar contraste à noite.
- **Mobile:** igual. · **Reduced:** cor da hora sem transições.
- **Performance:** CSS variables.
- **Implementação:** `Intl.DateTimeFormat` com fuso da marca; paleta em keyframes de cor.

### NX-05 · Rebobinar
`fam:narrative` `mech:time-reverse` `mat:tape,film` `trig:scroll-up,click` `geo:timeline` `lvl:experimental` `cost:M` `tech:gsap` `feel:nostálgico,lúdico,reflexivo`
- **Conceito:** voltar (scroll para cima ou botão) rebobina as cenas em velocidade com estética de fita (linhas, aceleração); avançar é "play".
- **Sensação:** controle do tempo, memória.
- **Aplicação:** histórias de marca, linhas do tempo, aniversários.
- **Composição & layering:** overlay de "rewind" (◀◀, linhas) apenas quando a velocidade negativa passa um limiar.
- **Trigger · timing · easing:** velocidade de scroll negativa.
- **Entrada → saída:** rolando para cima rápido → rewind visível → para → cena.
- **Combina com:** DG-03, IV-02 · **Evite:** em sites de consulta.
- **Mobile:** sutil. · **Reduced:** sem overlay.
- **Performance:** trivial.
- **Implementação:** `ScrollTrigger` direction + velocity.

### NX-06 · Objeto-Fio
`fam:narrative` `mech:persistent-traveler` `mat:master-object` `trig:scroll` `geo:path-through-site` `lvl:award` `cost:M` `tech:gsap,flip` `feel:coeso,narrativo,autoral`
- **Conceito:** um objeto (o símbolo, um personagem, uma linha, uma bolinha) atravessa todas as seções e participa de cada transição em um papel diferente: moldura, divisória, cursor, botão, ponto final.
- **Sensação:** um fio condutor; o site é uma história só.
- **Aplicação:** todo site com objeto-mestre forte.
- **Composição & layering:** o objeto vive numa camada fixa acima das seções; Flip entre "âncoras" de cada seção.
- **Trigger · timing · easing:** scrub; o objeto chega antes do conteúdo da seção (ele guia).
- **Entrada → saída:** objeto na âncora A → viaja → se transforma na função de B.
- **Combina com:** NX-03, CI-09 · **Evite:** objeto que só "segue" sem mudar de papel.
- **Mobile:** viagens mais curtas. · **Reduced:** objeto estático em cada âncora.
- **Performance:** 1 elemento.
- **Implementação:** âncoras `data-anchor`; `Flip.fit(obj, anchor)` por seção dentro de uma timeline com scrub.

### NX-07 · Documento que se Preenche
`fam:narrative` `mech:form-fill` `mat:paper,ink` `trig:scroll` `geo:fields` `lvl:award` `cost:M` `tech:gsap` `feel:oficial,progressivo,narrativo`
- **Conceito:** o site é um documento (relatório, ficha, receita, contrato, laudo) e cada seção preenche um campo dele; as transições são campos sendo preenchidos, carimbados, assinados.
- **Sensação:** progresso concreto, credibilidade.
- **Aplicação:** serviços profissionais, portfólios técnicos, saúde, jurídico.
- **Composição & layering:** o documento persiste (miniatura lateral ou cabeçalho) e cresce a cada seção.
- **Trigger · timing · easing:** scrub; preenchimento como digitação/caligrafia.
- **Entrada → saída:** campo vazio → preenchido → próxima seção é o próximo campo.
- **Combina com:** ME-07, SP-07, NX-03 · **Evite:** formulário de verdade escondido em ficção (acessibilidade).
- **Mobile:** documento como cabeçalho compacto. · **Reduced:** documento completo.
- **Performance:** texto.
- **Implementação:** campos com `data-field`; conteúdo real.

### NX-08 · Potências de Dez
`fam:narrative` `mech:scale-journey` `mat:world` `trig:scroll` `geo:center-zoom` `lvl:award` `cost:L` `tech:gsap,webgl` `feel:épico,científico,perspectiva`
- **Conceito:** cada seção é uma ordem de grandeza (do átomo à galáxia, do produto à cidade, do pixel ao ecossistema); a transição é a mudança de escala contínua entre elas.
- **Sensação:** perspectiva, maravilha, escala.
- **Aplicação:** ciência, impacto social, logística global, infraestrutura.
- **Composição & layering:** cada escala contém a próxima no centro (como SP-10, mas com mudança de escala física real e rótulo da potência).
- **Trigger · timing · easing:** scrub; escala exponencial.
- **Entrada → saída:** escala 10ⁿ → mergulho/recuo → 10ⁿ⁺¹ com rótulo.
- **Combina com:** SP-10, TY-01 · **Evite:** com SP-10 e TY-01 juntos.
- **Mobile:** menos níveis. · **Reduced:** níveis em sequência com rótulos.
- **Performance:** carregar níveis vizinhos apenas.
- **Implementação:** `scale = 10^(p * levels)` com troca de camada a cada potência.

### NX-09 · Erro Narrativo
`fam:narrative` `mech:story-error` `mat:master-object` `trig:route` `geo:any` `lvl:premium` `cost:S` `tech:any` `feel:humor,humano,marca`
- **Conceito:** a 404 (ou erro de rede, ou estado vazio) é uma cena do conceito ("Esse filhote escapou pela portinha"; "prancha não encontrada"), com transição de volta que reusa o verbo da marca.
- **Sensação:** humanidade, cuidado com detalhes.
- **Aplicação:** todo site premiável (o júri procura).
- **Composição & layering:** objeto-mestre em estado "errado" (porta vazia, prancha em branco).
- **Trigger · timing · easing:** a mesma linguagem do site.
- **Entrada → saída:** erro → ação → volta à home com a transição-assinatura.
- **Combina com:** NX-02, ME-05 · **Evite:** piada genérica de 404.
- **Mobile:** igual. · **Reduced:** estático.
- **Performance:** leve.
- **Implementação:** `not-found.tsx` com o componente do objeto-mestre.

### NX-10 · Narrador Tipográfico
`fam:narrative` `mech:persistent-caption` `mat:type,voice` `trig:scroll` `geo:fixed-caption` `lvl:premium` `cost:S` `tech:gsap` `feel:íntimo,literário,guiado`
- **Conceito:** uma legenda persistente (uma voz) narra as transições: frases curtas que mudam entre seções, como legendas de documentário, antecipando o que vem.
- **Sensação:** alguém conta a história; intimidade.
- **Aplicação:** storytelling de marca, documentários, causas.
- **Composição & layering:** legenda fixa no rodapé da tela, mudando por TY-04, ME-02 ou máscara de linha.
- **Trigger · timing · easing:** troca no início de cada transição (J-cut).
- **Entrada → saída:** legenda anuncia → a cena acontece.
- **Combina com:** CI-06, CI-10 · **Evite:** repetir o que a seção já diz.
- **Mobile:** legenda menor, acima da zona do polegar. · **Reduced:** legendas como subtítulos de seção.
- **Performance:** texto.
- **Implementação:** `aria-live="polite"` com cuidado (pode ser verborrágico): prefira `aria-hidden` se o conteúdo repete.

### NX-11 · Mudança de Estado do Mundo
`fam:narrative` `mech:world-state-switch` `mat:light,material` `trig:scroll-threshold` `geo:global` `lvl:art` `cost:M` `tech:css,gsap` `feel:épico,transformador,clímax`
- **Conceito:** num quadro preciso, o mundo inteiro do site muda de estado (papel → produção, dia → noite, rua → casa, rascunho → publicado): fundo, tipografia, UI, cursor, tudo junto. É a virada do filme.
- **Sensação:** clímax, transformação, "agora é outro jogo".
- **Aplicação:** a virada de ato; uma vez por site.
- **Composição & layering:** tokens de tema trocados no `html` (`data-world`); a transição visual (acender, revelar, deploy) acontece por cima.
- **Trigger · timing · easing:** limiar no scrub; troca de tema em 1 frame sob a cobertura da transição.
- **Entrada → saída:** gesto-gatilho (apertar "deploy", atravessar a porta) → mundo muda → resto do site no novo estado.
- **Combina com:** SP-05, CI-03, GL-07 · **Evite:** mais de uma vez (perde força).
- **Mobile:** igual. · **Reduced:** troca de tema sem animação.
- **Performance:** trocar variáveis CSS é barato; evite repintar tudo com `backdrop-filter`.
- **Implementação:** `data-world` no `html` + navbar observando `data-nav-theme`.

### NX-12 · Câmera Subjetiva
`fam:narrative` `mech:pov-camera` `mat:world` `trig:scroll` `geo:first-person` `lvl:award` `cost:L` `tech:css-3d,gsap,video` `feel:empático,imersivo,emocional`
- **Conceito:** as transições são vistas do ponto de vista de um personagem da história (o filhote chegando em casa, o pedido saindo da cozinha, o pacote viajando), não de um observador.
- **Sensação:** empatia, estar dentro.
- **Aplicação:** marcas com protagonista não-humano, logística, pets, produtos.
- **Composição & layering:** altura de câmera do personagem; movimentos com "passo" (bob leve), olhar que se fixa.
- **Trigger · timing · easing:** scrub; movimentos com o ritmo do personagem.
- **Entrada → saída:** cada seção é um lugar que o personagem atravessa.
- **Combina com:** CI-09, SP-03 · **Evite:** enjoo (bob forte, rotação).
- **Mobile:** vídeo pré-gravado em POV. · **Reduced:** imagens dos lugares.
- **Performance:** depende da mídia.
- **Implementação:** vídeo POV com scrub (IV-02) ou CSS 3D com câmera baixa.

### NX-13 · Mapa e Território
`fam:narrative` `mech:route-travel` `mat:map,paper` `trig:scroll,click` `geo:route` `lvl:premium` `cost:M` `tech:svg,gsap` `feel:jornada,orientação,exploração`
- **Conceito:** o site tem um mapa (literal ou abstrato); cada transição é uma viagem por uma rota desenhada no mapa até o próximo lugar, que é a próxima seção.
- **Sensação:** jornada, orientação, sei onde estou.
- **Aplicação:** turismo, logística, processos, carreiras, lojas físicas.
- **Composição & layering:** mapa SVG em camada fixa ou em cada transição; a rota se desenha (GX-01) e um marcador viaja.
- **Trigger · timing · easing:** scrub; viagem `sine.inOut`.
- **Entrada → saída:** ponto A no mapa → rota → ponto B → zoom no lugar (B).
- **Combina com:** GX-08, SP-12 · **Evite:** mapa decorativo sem lugares reais.
- **Mobile:** mapa em tela cheia por transição. · **Reduced:** mapa estático com a rota completa.
- **Performance:** SVG simples.
- **Implementação:** MotionPath no marcador + `stroke-dashoffset` na rota.

### NX-14 · Inventário
`fam:narrative` `mech:count-transform` `mat:data,objects` `trig:scroll` `geo:count` `lvl:premium` `cost:S` `tech:gsap` `feel:concreto,prova,abundância`
- **Conceito:** a transição é uma contagem real que se transforma em objetos: "40+ projetos" vira 40 marcas que se organizam na grade de trabalhos; "25 credenciais" viram 25 selos.
- **Sensação:** prova concreta, abundância verificável.
- **Aplicação:** números de impacto, portfólios, credenciais.
- **Composição & layering:** número grande → se desfaz em N unidades (pontos/ícones) → unidades viram os itens de B.
- **Trigger · timing · easing:** contagem 1 s `power2.out`; explosão em unidades 600 ms; Flip para a grade.
- **Entrada → saída:** número → unidades → grade de B.
- **Combina com:** ME-11, GX-03 · **Evite:** números inventados ou arredondados para cima.
- **Mobile:** menos unidades (agrupe de 5 em 5). · **Reduced:** número + grade.
- **Performance:** N ≤ 200 unidades.
- **Implementação:** gerar N elementos leves; Flip para os alvos medidos.
