# TY · Typographic / Editorial

O texto não é carga a ser revelada: é **matéria** que pode ser cortada, esticada, riscada, composta e atravessada. Esta família é a que mais eleva sites sem mídia boa.

---

### TY-01 · Mergulho no Glifo
`fam:typographic` `mech:extreme-scale` `mat:ink,paper` `trig:scroll` `geo:glyph-stroke` `lvl:award` `cost:M` `tech:gsap,canvas-measure` `feel:monumental,inteligente,imersivo`
- **Conceito:** todas as palavras saem, uma letra fica, e a câmera mergulha no traço dela até que o traço (com a cor da próxima seção) seja a tela inteira.
- **Sensação:** atravessar a própria linguagem da marca; continuidade perfeita.
- **Aplicação:** virada de ato, saída de manifesto, letra inicial do nome da marca.
- **Composição & layering:** fundo = cor de A; letra = cor do fundo de B; escala centrada no meio do traço mais grosso (medido).
- **Trigger · timing · easing:** scrub 1,5–2 telas; escala exponencial (`max^p`) para velocidade constante; palavras saem nos primeiros 25%.
- **Entrada → saída:** frase → só a letra → zoom → o traço é a página B (sem corte).
- **Combina com:** SP-06, TY-05, CI-05 · **Evite:** com SP-10 ou SP-03 em sequência.
- **Mobile:** escala máxima menor; mesma letra. · **Reduced:** a letra grande estática como abertura de B.
- **Performance:** um transform; `will-change` só durante; arredondar origem em pixel inteiro (100×+ amplifica meio pixel).
- **Implementação:** `assets/engine/transitions/glyph-dive.js` (mede o traço desenhando o glifo num canvas).

### TY-02 · Título que Atravessa
`fam:typographic` `mech:dual-render-clip` `mat:ink,light` `trig:scroll` `geo:shape-boundary` `lvl:premium` `cost:S` `tech:css,gsap` `feel:inteligente,elegante,integrado`
- **Conceito:** o título é renderizado duas vezes (cor A fora da forma, cor B dentro); conforme uma forma (porta, faixa, imagem) se move, cada letra muda de cor ao cruzar a fronteira.
- **Sensação:** texto e imagem são um só objeto; craft visível.
- **Aplicação:** heros com mídia em máscara, transições de cor de fundo.
- **Composição & layering:** camada 1 = título cor tinta; camada 2 = mesmo título cor leite, recortado pela mesma máscara da mídia.
- **Trigger · timing · easing:** segue a forma (a transição dela governa).
- **Entrada → saída:** fronteira atravessa o texto → no fim, o texto está inteiro na cor B.
- **Combina com:** SP-03, MK-07 · **Evite:** fonte muito fina (o corte some).
- **Mobile:** igual. · **Reduced:** estado final.
- **Performance:** duplicar só o título (não a seção).
- **Implementação:** mesma `clip-path`/`mask` aplicada à mídia e à cópia do título, ambos com as mesmas variáveis CSS.

### TY-03 · Eixo Variável
`fam:typographic` `mech:font-axis` `mat:type` `trig:scroll,hover` `geo:baseline` `lvl:premium` `cost:S` `tech:css,gsap,splittext` `feel:voz,elástico,expressivo`
- **Conceito:** a transição é a fonte mudando de forma: largura, peso, inclinação ou optical size esticam/comprimem entre seções.
- **Sensação:** a marca falando mais alto ou mais baixo; voz.
- **Aplicação:** títulos de capítulo, heros, marcas com fonte variável própria.
- **Composição & layering:** título único; eixo `wdth`/`wght` animado; linhas sobem de dentro de uma máscara.
- **Trigger · timing · easing:** scrub ou uma vez ao entrar (0,9 s `--ease-enter`).
- **Entrada → saída:** título largo e leve → comprime e pesa → vira o título de B (mesma posição).
- **Combina com:** TY-05, SP-03 · **Evite:** animar eixo em parágrafos (reflow caro).
- **Mobile:** igual, amplitude menor. · **Reduced:** estado final.
- **Performance:** `font-variation-settings` re-shape de texto; restringir a 1–3 linhas.
- **Implementação:** `@property --wdth` + `font-variation-settings: "wdth" var(--wdth)`; ou GSAP em `fontVariationSettings`.

### TY-04 · Tachado e Reescrita
`fam:typographic` `mech:strike-rewrite` `mat:ink,paper` `trig:click,route` `geo:per-line` `lvl:premium` `cost:S` `tech:css,gsap` `feel:editorial,honesto,técnico`
- **Conceito:** cada linha visível é riscada (como revisão de texto), depois o novo texto é escrito por cima, da esquerda para a direita, no mesmo lugar.
- **Sensação:** revisão, correção, documento vivo.
- **Aplicação:** troca de idioma, troca de filtro/aba, "antes pensávamos X, agora Y".
- **Composição & layering:** traços (cor de evento) por linha de texto; o texto novo revela com `clip-path: inset(0 100% 0 0)` → 0.
- **Trigger · timing · easing:** clique; riscos 320 ms em stagger de 20 ms por linha; reescrita 500 ms.
- **Entrada → saída:** texto A → riscado → apagado (traço permanece 100 ms) → texto B escrito → traço some.
- **Combina com:** SP-01, TY-09 · **Evite:** com textos longos fora da tela (limite a linhas visíveis, ≤ 80).
- **Mobile:** igual. · **Reduced:** troca direta.
- **Performance:** meça linhas com `Range.getClientRects()`.
- **Implementação:** `assets/engine/transitions/strike-rewrite.js`.

### TY-05 · Palavra-Ponte
`fam:typographic` `mech:word-persist` `mat:type` `trig:scroll` `geo:word-position` `lvl:premium` `cost:S` `tech:gsap,flip` `feel:narrativo,inteligente,fluido`
- **Conceito:** a última palavra de A permanece quando o resto sai, viaja e cresce, e se torna o título (ou a primeira palavra) de B.
- **Sensação:** pensamento contínuo; uma ideia leva à outra.
- **Aplicação:** manifestos, narrativas em capítulos, storytelling de produto.
- **Composição & layering:** palavra destacada em camada própria; Flip da posição em A para a posição em B.
- **Trigger · timing · easing:** scrub; o resto sai em 0–30%; a palavra viaja 30–80%.
- **Entrada → saída:** frase → só a palavra → ela vira o título → B constrói ao redor.
- **Combina com:** TY-01, CI-01 · **Evite:** palavra sem peso semântico ("e", "para").
- **Mobile:** igual. · **Reduced:** a palavra repetida em destaque no título de B.
- **Performance:** Flip de 1 elemento.
- **Implementação:** `Flip.getState(word)` → move para o container de B → `Flip.from` dentro de uma timeline com scrub.

### TY-06 · Colapso de Entreletra
`fam:typographic` `mech:tracking-to-grid` `mat:type` `trig:scroll` `geo:columns` `lvl:experimental` `cost:M` `tech:gsap,splittext` `feel:sistemático,arquitetônico,surpresa`
- **Conceito:** as letras de uma palavra se afastam (tracking) até se distribuírem pela largura da tela, e cada letra vira a coluna/cabeçalho de uma coluna do grid da próxima seção.
- **Sensação:** a palavra contém a estrutura do que vem.
- **Aplicação:** seções em colunas (5 serviços = 5 letras? use quando bater), tabelas, índices.
- **Composição & layering:** letras em spans; cada uma desliza para o x de uma coluna; o conteúdo da coluna desce dela.
- **Trigger · timing · easing:** scrub 1,2 telas; `power2.inOut`.
- **Entrada → saída:** palavra compacta → letras espalham → colunas brotam.
- **Combina com:** TY-10 · **Evite:** forçar quando a contagem não bate (use as letras como guias, não como 1:1).
- **Mobile:** letras viram linhas (eixo vertical). · **Reduced:** grid final com as letras como cabeçalhos.
- **Performance:** spans com transform.
- **Implementação:** SplitText chars + `x` alvo medido das colunas.

### TY-07 · Linha de Leitura
`fam:typographic` `mech:progressive-ink` `mat:ink,light` `trig:scroll` `geo:reading-order` `lvl:refined` `cost:S` `tech:css,gsap,scroll-timeline` `feel:sereno,editorial,atento`
- **Conceito:** a frase está na tela em tom apagado e acende palavra a palavra no ritmo do scroll, como se fosse lida em voz alta.
- **Sensação:** leitura guiada, ênfase calma.
- **Aplicação:** manifestos, bio, declarações, pausas entre cenas pesadas.
- **Composição & layering:** texto grande, cor base 25% de contraste → cor plena; palavra-chave na cor de evento.
- **Trigger · timing · easing:** scrub 1–1,5 telas; cada palavra com janela de 2–3 palavras de sobreposição.
- **Entrada → saída:** frase apagada → acende → a última palavra fica (gancho para TY-05).
- **Combina com:** TY-05, LQ-01 (a tinta escorre) · **Evite:** em parágrafos longos.
- **Mobile:** igual. · **Reduced:** texto em cor plena.
- **Performance:** opacidade/cor por span; contraste da cor base ≥ 3:1 para não perder legibilidade.
- **Implementação:** CSS scroll-driven (`animation-timeline: view()`) com `animation-range` por palavra, ou GSAP stagger com scrub.

### TY-08 · Letreiros Cruzados
`fam:typographic` `mech:opposed-drift` `mat:signage` `trig:scroll` `geo:horizontal-bands` `lvl:premium` `cost:S` `tech:gsap` `feel:urbano,monumental,comercial`
- **Conceito:** nomes enormes como letreiros de fachada atravessam a tela em sentidos opostos, com a foto vista através das letras; o cruzamento é a passagem para a próxima seção.
- **Sensação:** rua, comércio, presença física.
- **Aplicação:** lojas, endereços, marcas, nomes de produtos.
- **Composição & layering:** 2 linhas de texto gigante; `background-clip: text` com a foto; deriva presa ao scroll (não marquee automático).
- **Trigger · timing · easing:** scrub; velocidade proporcional ao scroll (para quando o scroll para).
- **Entrada → saída:** letreiros entram cruzando → no centro, alinham → próxima seção entra pela faixa entre eles.
- **Combina com:** MK-07 · **Evite:** marquee infinito automático (R9).
- **Mobile:** uma linha por vez. · **Reduced:** letreiros parados, centralizados.
- **Performance:** texto com imagem de fundo: uma imagem só, otimizada.
- **Implementação:** `x` ligado ao scroll com sentidos opostos.

### TY-09 · Revisão Editorial
`fam:typographic` `mech:proof-marks` `mat:ink,paper` `trig:scroll,click` `geo:inline` `lvl:experimental` `cost:M` `tech:svg,gsap` `feel:editorial,inteligente,artesanal`
- **Conceito:** a página é "editada" diante do usuário com marcas de revisão (deleção, inserção com circunflexo, inversão, "stet"); o resultado da edição é a próxima seção.
- **Sensação:** pensamento em processo; editora, jornalismo.
- **Aplicação:** editoras, agências de conteúdo, redação, "como pensamos".
- **Composição & layering:** SVG de marcas desenhadas à mão sobre o texto; palavras se movem para as posições corrigidas.
- **Trigger · timing · easing:** scrub; cada marca é desenhada (stroke) e então executada.
- **Entrada → saída:** texto A → marcas → palavras se rearranjam (Flip) → texto B limpo.
- **Combina com:** TY-04, GX-01 · **Evite:** marcas ilegíveis ou sem lógica real de revisão.
- **Mobile:** menos marcas. · **Reduced:** texto final com 1 marca estática como ornamento.
- **Performance:** SVG pequeno.
- **Implementação:** paths das marcas com DrawSVG/`stroke-dashoffset` + Flip nas palavras.

### TY-10 · Coluna que Reflui
`fam:typographic` `mech:reflow-flip` `mat:type` `trig:scroll,click` `geo:grid-to-grid` `lvl:premium` `cost:M` `tech:gsap,flip,splittext` `feel:sistemático,elegante,editorial`
- **Conceito:** o mesmo texto reflui de uma composição para outra (de uma coluna larga para três estreitas, de bloco para lista): as palavras viajam aos novos lugares.
- **Sensação:** sistema editorial vivo, tipografia como layout.
- **Aplicação:** troca de modos de visualização, transição para tabela/índice.
- **Composição & layering:** palavras com Flip; layout final aplicado por classe.
- **Trigger · timing · easing:** clique 0,8 s; stagger por posição de linha.
- **Entrada → saída:** layout A → palavras voam → layout B assenta.
- **Combina com:** TY-06, TY-13 · **Evite:** com textos > 200 palavras (custo e caos).
- **Mobile:** só as linhas visíveis. · **Reduced:** troca direta.
- **Performance:** Flip em até ~200 nós.
- **Implementação:** `Flip.getState(words)` → mudar classe → `Flip.from(state, { stagger, absolute: true })`.

### TY-11 · Tipos de Chumbo
`fam:typographic` `mech:drop-compose` `mat:metal,lead` `trig:scroll,click` `geo:baseline` `lvl:experimental` `cost:M` `tech:gsap` `feel:artesanal,tátil,peso`
- **Conceito:** as letras caem uma a uma, pesadas, num componedor (como tipos móveis), batem na linha de base com recuo curto, e a linha composta é o título de B.
- **Sensação:** peso, tradição, ofício gráfico.
- **Aplicação:** gráficas, editoras, cervejarias, marcas artesanais.
- **Composição & layering:** letras com `y` de −120% e leve rotação; batida com 2 px de recuo; som opcional.
- **Trigger · timing · easing:** clique/entrada; 60 ms de stagger; `power4.in` na queda, `back.out(3)` curto no assentamento.
- **Entrada → saída:** linha vazia com a régua → letras caem → linha travada (um "clique" visual).
- **Combina com:** ME-07, ME-03 · **Evite:** em fontes leves (sem peso visual).
- **Mobile:** igual. · **Reduced:** linha final.
- **Performance:** SplitText chars.
- **Implementação:** GSAP timeline com stagger; espelhar as letras (tipo móvel é espelhado) por 1 frame antes de cair é um detalhe de craft.

### TY-12 · Recorte (Ransom)
`fam:typographic` `mech:fragment-assemble` `mat:paper,print` `trig:scroll` `geo:scattered-to-line` `lvl:experimental` `cost:M` `tech:gsap,splittext` `feel:punk,editorial,colagem`
- **Conceito:** letras recortadas de fontes, tamanhos e papéis diferentes chegam espalhadas e se colam em linha formando o título; a colagem é a transição.
- **Sensação:** colagem, zine, voz plural.
- **Aplicação:** cultura, música, moda, coletivos, campanhas.
- **Composição & layering:** cada letra com fundo de papel, rotação e fonte próprias; sombra curta.
- **Trigger · timing · easing:** scrub; posições iniciais aleatórias com seed fixa.
- **Entrada → saída:** fragmentos → assentam em linha (com leve desalinhamento final) → a linha "encaixa" na fonte oficial.
- **Combina com:** IV-05 · **Evite:** em marcas corporativas.
- **Mobile:** menos letras. · **Reduced:** colagem final.
- **Performance:** spans.
- **Implementação:** seed determinística para posições; `gsap.utils.random` com seed própria.

### TY-13 · Sumário Vivo
`fam:typographic` `mech:index-expand` `mat:type` `trig:click,scroll` `geo:list-item` `lvl:premium` `cost:M` `tech:gsap,flip,view-transitions` `feel:editorial,organizado,navegação`
- **Conceito:** o sumário/índice é a interface; o item clicado expande e vira a seção (o número do capítulo cresce e vira o cabeçalho).
- **Sensação:** livro, publicação, navegação por estrutura.
- **Aplicação:** sites editoriais, documentação, portfólios em lista.
- **Composição & layering:** a linha do índice (número + título + página) é o elemento compartilhado; o resto da lista desliza para fora.
- **Trigger · timing · easing:** clique 0,9 s; Flip na linha; lista sai em 30%.
- **Entrada → saída:** lista → linha cresce → página aberta; voltar recolhe na mesma linha.
- **Combina com:** IN-10, SP-12 · **Evite:** com IN-10 no mesmo índice (escolha um).
- **Mobile:** igual. · **Reduced:** navegação direta, foco no título.
- **Performance:** Flip de poucos nós.
- **Implementação:** `view-transition-name` na linha e no cabeçalho do destino.

### TY-14 · Nota de Rodapé que Vira Página
`fam:typographic` `mech:marker-expand` `mat:paper` `trig:click,hover` `geo:inline-marker` `lvl:experimental` `cost:S` `tech:css,gsap,view-transitions` `feel:curioso,erudito,íntimo`
- **Conceito:** um número sobrescrito no texto expande e vira uma página inteira (a nota de rodapé ganha o palco).
- **Sensação:** curiosidade recompensada; profundidade opcional.
- **Aplicação:** ensaios, pesquisas, cases detalhados, "saiba mais".
- **Composição & layering:** o marcador (círculo com número) é a origem; a página nasce dele com `clip-path: circle()`.
- **Trigger · timing · easing:** clique 700 ms `power3.inOut`.
- **Entrada → saída:** marcador pulsa → círculo cresce → página; fechar volta ao marcador.
- **Combina com:** IN-12, TY-13 · **Evite:** em navegação principal.
- **Mobile:** abre como folha de baixo para cima. · **Reduced:** abre direto.
- **Performance:** barato.
- **Implementação:** `clip-path: circle(r at x y)` com origem no marcador.

### TY-15 · Decodificação Contextual
`fam:typographic` `mech:char-substitution` `mat:data` `trig:scroll,click` `geo:per-char` `lvl:refined` `cost:S` `tech:js` `feel:técnico,digital,precisão`
- **Conceito:** os caracteres passam por estados intermediários até o texto final, **mas** os estados vêm do domínio (hex do próprio texto, código Morse, notação química, coordenadas), não de símbolos aleatórios.
- **Sensação:** tradução de linguagem técnica para humana.
- **Aplicação:** segurança, dados, ciência, só quando o domínio justifica.
- **Composição & layering:** fonte mono; largura fixa por caractere para não reflowar.
- **Trigger · timing · easing:** 600–900 ms; da esquerda para a direita.
- **Entrada → saída:** texto em forma técnica (ex.: `0x4F 0x6C 0x61`) → resolve para "Ola".
- **Combina com:** GX-12 · **Evite:** scramble aleatório (R8) e uso fora de contexto técnico.
- **Mobile:** igual. · **Reduced:** texto final; a forma técnica pode aparecer como legenda.
- **Performance:** atualizar `textContent` por frame é barato para < 100 caracteres.
- **Implementação:** gerar a sequência de estados por caractere a partir do dado real; `aria-label` com o texto final.
