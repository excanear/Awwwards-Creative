# 05 · Anti-Repetition Engine

O maior inimigo de um site premiado não é o erro: é o **padrão**. Fade-up em todos os blocos, zoom no hover, parallax no hero, slide lateral entre seções. Este motor detecta a recaída e força a exploração de outra linguagem.

## 1. A lista vermelha (mecanismos-padrão)

Estes **não podem ser o mecanismo principal** de uma transição. Podem ser tempero (≤ 20% do movimento total, em camada secundária).

| Código | Padrão | Como aparece no código |
|---|---|---|
| R1 | **Fade** (opacidade sozinha) | `opacity: 0 → 1`, `autoAlpha`, `fadeIn`, `data-aos="fade"` |
| R2 | **Fade-up / slide-up** | `y: 40 → 0` + opacity, `translateY(20px)`, `fade-up`, `initial={{ y: 20 }}` |
| R3 | **Zoom / scale** | `scale: 0.8 → 1`, `scale: 1.1` no hover, Ken Burns sem motivo |
| R4 | **Slide lateral** | `x: -100% → 0` entre seções sem material ou física |
| R5 | **Blur-in** | `filter: blur(10px) → 0` |
| R6 | **Parallax genérico** | `data-speed`, `yPercent` em imagens de fundo, camadas com velocidades sem narrativa |
| R7 | **Stagger de cards** | grade de cards entrando um após o outro com fade-up |
| R8 | **Texto embaralhado** | scramble/decode de caracteres fora de contexto técnico |
| R9 | **Marquee infinito** | faixa de logos/texto correndo sem relação com o conteúdo |
| R10 | **Cursor blob** | círculo que segue o cursor e cresce em links, sem conceito |
| R11 | **Revelação por cortina sólida** | bloco de cor cobre e descobre a imagem (o "reveal" de template) |
| R12 | **Rotação 3D de card** | tilt no hover sem material |

Eles não são proibidos por serem feios. São proibidos como **resposta-padrão**, porque não dizem nada sobre o conteúdo.

## 2. O detector (rode antes de propor e antes de entregar)

Para cada direção proposta e para cada transição implementada, responda:

1. **Qual é o mecanismo principal?** Se está na lista vermelha → reprovado.
2. **Se eu trocar o conteúdo desta seção pelo de outra marca, a transição ainda faz sentido?** Se sim → genérica, reprovada.
3. **Ela repete uma família já usada neste site?** (ver Ledger) Se sim, sem operador de transformação → reprovada.
4. **Ela tem material, agente ou dado?** Se os três estão vazios → genérica.
5. **Ela tem origem e destino visíveis?** "Aparece do nada" → reprovada.

Em código existente: `node scripts/audit-motion.mjs <projeto>` conta os padrões R1–R12, calcula a proporção de clichê e o índice de diversidade, e sugere famílias que o projeto ainda não usou.

## 3. Matriz de substituição

Quando o reflexo pedir um padrão da lista vermelha, consulte a coluna da direita e escolha **a que conversa com o material** da Motion Language.

| Reflexo | Pergunte | Substitutos (IDs da biblioteca) |
|---|---|---|
| Fade | o que **revela** isso no mundo da marca? Luz? Revelação química? Desembaçar? | MK-03 Revelação Fotoquímica, MK-06 Luz que Varre, LQ-11 Condensação, MK-11 Halftone, DG-08 Dither |
| Fade-up de texto | de onde a palavra **vem**? Debaixo de uma linha? De uma máquina? | TY-07 Linha de Leitura, TY-11 Tipos de Chumbo, ME-02 Split-Flap, ME-12 Plotter, TY-03 Eixo Variável |
| Zoom/scale | o que **se atravessa**? Uma porta, um glifo, uma lente? | SP-03 Portal, TY-01 Mergulho no Glifo, SP-10 Janela Interna, CI-03 Dolly Zoom, NX-08 Potências de Dez |
| Slide lateral | qual **objeto** desliza e por quê? Folha? Gaveta? Esteira? | SP-07 Folha sobre Folha, ME-04 Gaveta, ME-09 Esteira, SP-04 Corredor, IN-08 Carta Arremessada |
| Blur | o que **desfoca** com significado? Foco de câmera? Calor? Vidro? | CI-02 Rack Focus, DG-07 Ondulação de Calor, GL-04 Refração de Vidro, LQ-04 Névoa |
| Parallax | o que **existe em profundidade** na cena? | SP-05 Túnel, SP-11 Patamares, SP-13 Pop-up Book, IV-08 Relevo 2.5D, CI-03 Dolly Zoom |
| Stagger de cards | como esses itens **chegam** juntos na vida real? Dealt? Impressos? Montados? | IV-05 Baralho de Fotos, ME-11 Ímã, TY-10 Coluna que Reflui, ME-09 Esteira, GX-11 Truchet |
| Scramble | que **ofício** transforma um texto em outro? | TY-04 Tachado e Reescrita, TY-09 Revisão Editorial, ME-02 Split-Flap, TY-12 Recorte |
| Marquee | por que esse texto **se move**? É um letreiro? Uma esteira? Um ticker de dados? | TY-08 Letreiros Cruzados, ME-09 Esteira, GX-12 Dado Verdadeiro |
| Cursor blob | o cursor **é** o quê no mundo da marca? Lanterna? Lupa? Pincel? Pata? | IN-04 Lanterna, MK-02 Lente, IN-05 Rastro que Pinta, IN-12 Origem no Clique |
| Cortina sólida | que **superfície real** cobre e descobre? | MK-01 Persianas, ME-13 Cortina de Teatro, SP-08 Dobradura, MK-12 Lâmina Diagonal |
| Tilt 3D | o objeto tem **peso e eixo**? | ME-06 Dobradiça, IN-06 Giroscópio, GL-05 Planos que Curvam |

## 4. Motion Ledger: a memória do site

Cada projeto tem um `MOTION-LEDGER.md` na raiz (template em `assets/templates/motion-ledger.md`). Toda transição implementada entra numa linha:

```
| De → Para | Nome | Família | Mecanismo | Material | Trigger | Geometria | Agente | Ritmo | Nível |
```

Regras de diversidade aplicadas ao ledger:
- **Família:** nenhuma aparece mais que ⌈N/4⌉ vezes em N transições.
- **Adjacência:** duas transições consecutivas não compartilham família **nem** mecanismo.
- **Eixos:** duas transições quaisquer diferem em pelo menos 2 eixos.
- **Exceção legítima:** um verbo da Motion Language pode repetir (é a gramática), desde que mude a geometria ou o material da conjugação. Ex.: "atravessar" a porta no hero e "atravessar" a porta da raça na page transition; mesma palavra, outra frase.

## 5. Protocolo de recaída

Quando você perceber (ou o usuário disser) que está "tudo parecido":

1. Rode `audit-motion.mjs` e liste os R-códigos encontrados com contagem.
2. Leia o ledger e marque as famílias saturadas.
3. Para cada transição saturada, aplique **dois operadores** de `04-invention-engine.md` e escolha um substituto da matriz cuja família **não** está no ledger.
4. Reescreva só as 2–3 transições de maior visibilidade primeiro (hero → seção 2, viradas de cor, page transition). O resto pode ficar em Refined: contraste de nível também é ritmo.
5. Atualize o ledger.

## 6. Anti-repetição entre projetos

O repertório do estúdio também se esgota. Antes de propor, verifique se a ideia é a assinatura de um projeto anterior (ver `11-case-studies.md`): o Guilherme Antunes v1 foi descartado porque "descer pela pilha" era a cena central do escanearcplx. Um site novo não herda o conceito de outro; herda **princípios**.
