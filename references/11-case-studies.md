# 11 · Casos de estudo: o método aplicado

Três projetos do estúdio, lidos como **princípios** e não como receitas. Nenhum deles deve ser copiado num site novo; o que se transfere é o raciocínio.

---

## PillePet: "Todo lugar novo é uma portinha"

**Marca:** loja de filhotes em Guarulhos. **Público:** famílias, celular primeiro, decisão emocional.
**Objeto-mestre:** a porta de pet (o arco por onde o filhote entra em casa).
**Motion Language:** verbos **balançar** (mudar de conteúdo: a aba presa na dobradiça), **atravessar** (entrar em algo: o arco cresce até a tela cheia), **espiar** (convite: algo aparece por trás de uma borda). Material: o papel/plástico da aba, leve, com dobradiça. Curva: `cubic-bezier(0.22, 1, 0.36, 1)`, durações 0,6/0,9/1,2 s, stagger 0,08, scrub 0,6. Cor de evento: o magenta do logo.

**Transições-chave (IDs da biblioteca):**
- Hero, **A Portinha** (SP-03): o vídeo vive dentro do arco; o scroll atravessa a porta (arco → tela cheia). O título é desenhado duas vezes (tinta na página, leite recortado no arco), então cada palavra muda de cor ao cruzar a porta (TY-02). O título estica no eixo de largura (TY-03).
- Intro, 1,6 s, só na primeira visita, pulável: a aba balança com o carregamento real e a porta abre (ME-06). Puro CSS, decidido antes do primeiro paint.
- Raças, **Para Quem É**: uma frase sobre você ocupa a tela, se dobra num rótulo e o filhote que combina sobe (TY-05 + ME-06).
- Serviços, **O Corredor**: viagem horizontal por três arcos (SP-04); no celular, pilha vertical.
- Como funciona, **A Travessia**: túnel em perspectiva CSS; cada passo vem do fundo emoldurado por uma porta, passa pela câmera; o azul escurece até a noite e a câmera atravessa a porta de leite onde as lojas surgem (SP-05 + NX-11).
- Lojas, **O Letreiro**: os nomes das lojas como letreiros de fachada, a foto vista através das letras, derivando em sentidos opostos (MK-07 + TY-08).
- Page transition: o arco do card cresce até ser o hero da página da raça (View Transitions com nome compartilhado); voltar faz o caminho inverso (SP-03 entre rotas).
- 404: "Esse filhote escapou pela portinha", porta vazia, aba balançando, rastro de patas (NX-09).
- Cursor: pata sobre fotos, "Ver" sobre links de raça, só em ponteiro fino.

**Princípios extraídos:**
1. **O conceito não pode ficar só na abertura.** A primeira versão tinha a porta só no hero; a nota de criatividade subiu quando ela virou gramática do site inteiro (transição, page transition, 404, cursor, OG, intro).
2. **Três gestos com significado fixo** valem mais que dez efeitos.
3. **O primeiro quadro precisa ser autoral**, não "título à esquerda, mídia à direita".
4. **Conteúdo é o teto da nota.** Sem foto dirigida, nenhum código chega a SOTY; o briefing de fotografia faz parte da direção de motion (o capítulo que amplia os olhos pede 5 000 px).
5. **Performance é parte do craft:** motor carregado depois do `load`, cenas construídas na aproximação, versão estática de cada cena.

---

## escanearcplx.com: "Um relatório de pentest, página a página"

**Marca:** portfólio de um engenheiro de segurança ofensiva. **Público:** recrutadores e técnicos, desktop primeiro.
**Objeto-mestre:** o relatório/dossiê (capa, sumário, escopo, achados, carimbo AUTORIZADO, termo assinado).
**Motion Language:** física de documento: **folha sobre folha** (a nova página é colocada por cima da anterior, que congela e recua), **carimbar**, **anotar** (palavras sublinhadas em vermelho), **descer** (camadas da máquina). Cor de evento: vermelho de carimbo. Voz editorial em serif.

**Transições-chave:**
- **Freeze & cover** (SP-07): a seção que sai congela, recua (0,88) e escurece; a nova desliza de lado presa no topo, recortada a uma tela com cantos arredondados só na borda de ataque; a de trás é empurrada ~8% para o lado oposto. Duas telas de scroll por entrada ("uma tela ficou rápido demais").
- **Um Clique até o Silício** (SP-06 + GX-12): uma ação (enviar um formulário) descendo a máquina inteira: o clique vira código, o código vira bytes (hexdump do texto real da requisição), uma tabela de processos, memória do kernel, o chip. Cada camada afunda enquanto a próxima sobe; uma régua de profundidade marca o anel.
- **O Mergulho no C** (TY-01): todas as palavras saem, só o "C" fica, e a câmera mergulha no traço da letra até ele ser a tela inteira. O traço é papel sobre tinta: o papel ampliado **já é** a página dos achados seguinte, sem costura. Centro do traço medido desenhando o glifo num canvas.

**Princípios extraídos:**
1. **Um objeto governa o site.** Cada seção é uma página do mesmo documento.
2. **Artefatos verdadeiros > ilustrações.** O hexdump é a requisição real; a tabela de processos é plausível e marcada como ilustrativa quando necessário.
3. **O zoom extremo só funciona com handoff de material**: ampliar o traço até ele virar o fundo da próxima seção. Zoom sem destino é clichê; zoom que **vira** a próxima superfície é match cut.
4. **Abertura e fechamento rimam** (capa assinada → termo assinado).
5. **Engenharia de costura:** medir quadro a quadro; geometria arredondada para pixel inteiro em zooms de 100×+.

---

## Guilherme Antunes: "Do protótipo ao deploy"

**Marca:** engenheiro full-stack/DevOps que também desenha interface. **Público:** clientes e recrutadores.
**Objeto-mestre:** a prancha técnica de engenharia (moldura, cotas, carimbo de prancha, lista de materiais, cianotipia).
**Motion Language:** **desenhar** (linhas com `stroke-dashoffset` e curva de caneta: firme e desacelerando), **encaixar** (micro-snap de CAD de 2–3 px), **construir** (contorno → preenchimento → real). Proibido: carimbo, papel caindo, assinatura (linguagem física do escanearcplx). Cor de evento: azul de cianotipia `#1F3FD6`. Um verde só para o ponto "em produção".

**Transições-chave:**
- **A Prancha** (NX-01 + SP-02): uma cota real mede a largura do nome na tela do visitante e termina nas barras "/" do logo; ao rolar, a prancha inclina para a isometria e deita como planta, e a próxima cena é construída por cima.
- **Do Protótipo ao Deploy** (NX-11): uma única interface atravessa esboço → wireframe → componente → integração → infra → deploy; no quadro do deploy, a página inteira acende para o modo produção (papel → tinta) e a navbar troca junto.
- **Em Produção** (MK-03): cada projeto entra em cianotipia; uma linha de cota varre a tela e, por onde passa, a planta vira a tela real em cores. Implementado com `@property --reveal` transicionado por CSS.
- **O Corte A–A** (SP-01): page transition home ↔ projeto; uma linha de corte (traço-ponto, setas, "A—A") é desenhada na altura do clique; a página fecha nessa linha e a próxima abre a partir dela.
- **A Revisão de Idioma** (TY-04): ao trocar de idioma, cada linha visível é riscada e a tradução é escrita por cima, da esquerda para a direita, no mesmo lugar.
- **A Prancha em Branco** (NX-03): o fecho rima com o hero: o mesmo carimbo de prancha, vazio, é o formulário de contato.

**Princípios extraídos:**
1. **Evite o conceito do projeto vizinho.** A v1 ("descer pela pilha até o metal") colidia com o escanearcplx e foi descartada; a paleta também colidia. Os dois sites viraram par e contraponto: relatório de quem testa × prancha de quem constrói.
2. **O gesto profissional é a transição** (cotar, cortar, revisar, revelar a cópia heliográfica).
3. **Dado verdadeiro como espetáculo:** a cota mede a tela real; a lista de materiais vem do uso real nos projetos.
4. **Proibições definem estilo** tanto quanto verbos.
5. **Page transitions falam a mesma língua** das transições de seção.

---

## O que os três têm em comum (o método)

| Princípio | PillePet | escanearcplx | Guilherme |
|---|---|---|---|
| Objeto-mestre | porta de pet | relatório | prancha técnica |
| Símbolo que atravessa | arco | carimbo / página | barra "/" como terminal de cota |
| Mudança de estado do mundo | azul → noite → leite | superfície → silício | papel → produção |
| Artefato verdadeiro | olhos medidos nas fotos | hexdump real | cota com a medida real |
| Rima abertura/fecho | porta que abre / filhote vai para casa | capa / termo assinado | prancha dele / prancha do visitante |
| Page transition própria | arco cresce | — (página única) | corte A–A, revisão de idioma |
| Cor de evento | magenta | vermelho de carimbo | azul de cianotipia |

Se um site novo não tem uma linha preenchida em cada coluna desta tabela, ele ainda não está no nível Award.
