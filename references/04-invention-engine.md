# 04 · Invention Engine: como inventar transições que não existem

A biblioteca é vocabulário, não cardápio. Transições premiadas quase nunca são um item de catálogo; são **combinações** de um mecanismo conhecido com um material, um gatilho ou um agente inesperado, justificadas pelo conteúdo. Este é o processo.

## 1. Os 6 eixos de uma transição

Toda transição pode ser descrita (e reinventada) por seis eixos. Mudar um eixo produz uma transição nova.

| Eixo | Pergunta | Valores (não exaustivo) |
|---|---|---|
| **M · Mecanismo** | como os pixels mudam? | máscara/clip, deslocamento (displace), dobra/dobradiça, morph, decomposição em partes, quantização, revelação por luz, física, re-layout (Flip), movimento de câmera, traço/desenho, substituição no lugar (flap), manipulação do tempo |
| **Ma · Material** | do que é feito o que muda? | papel, vidro, tinta, metal, tecido, luz, líquido, fumaça, areia, pixel, tipo de chumbo, filme fotográfico, pedra, sombra, dado |
| **T · Trigger** | o que dispara/controla? | scroll scrub, limiar de scroll, clique, hover, arrastar, segurar, velocidade, tempo ocioso, posição do cursor, inclinação do aparelho, troca de rota, evento de dado, teclado |
| **G · Geometria** | de onde nasce e para onde vai? | ponto (do clique), linha/eixo, borda, glifo/símbolo, grade, objeto do conteúdo, radial, diagonal, profundidade z, caminho (path) |
| **A · Agente** | quem causa a transição na ficção? | o usuário, um objeto da cena, o próprio conteúdo/dado, o símbolo da marca, o tempo, um personagem, a interface do navegador, a gravidade |
| **R · Ritmo** | como o tempo se comporta? | corte seco, staccato, legato, acelerando, desacelerando, respiração presa, scrub reversível, loop, rewind, câmera lenta, timelapse |

Uma transição genérica tem eixos genéricos: *mecanismo opacidade · material nenhum · trigger limiar · geometria nenhuma · agente nenhum · ritmo legato*. Esse é o "fade-in ao entrar na tela". Qualquer eixo preenchido com intenção já a tira do genérico.

## 2. Os 12 operadores

Aplique **dois ou mais** a um conceito de partida.

| Operador | O que faz | Exemplo |
|---|---|---|
| **TRANSPLANTAR** | traz o gesto de um ofício para a interface | a linha de corte A–A do desenho técnico vira page transition (SP-01) |
| **MATERIALIZAR** | dá material a um mecanismo abstrato | o wipe vira rodo em vidro molhado: a água escorre na borda (LQ-11 + MK-12) |
| **INVERTER CAUSA** | troca quem se move: mundo↔câmera, A sai ↔ B empurra, interface ↔ conteúdo | em vez de a seção subir, o chão desce e o usuário "cai" na próxima |
| **MUDAR ESCALA** | o micro vira macro ou o contrário | mergulhar no traço de uma letra até ele ser a página (TY-01); a página encolher até ser um ladrilho de um mapa (SP-12) |
| **FRACIONAR** | uma coisa vira N partes com comportamento próprio | a foto em fatias que caem com atrasos diferentes; o título em letras que viram partículas |
| **FUNDIR** | mecanismo de um conceito + material/geometria de outro de família distante | split-flap (mecânico) cujas abas são de tinta que escorre (líquido) |
| **RESTRINGIR** | limita a uma primitiva: só linhas, só uma cor, só um eixo | a transição inteira feita só com fios de 1 px que se desenham |
| **TEMPORALIZAR** | muda o comportamento do tempo | a seção anterior "rebobina" como VHS antes de sair; um freeze-frame que vira foto impressa |
| **QUEBRAR A MOLDURA** | envolve a UI do navegador ou do site | a barra de rolagem vira a régua da cena; o título da aba muda junto; o cursor carrega a próxima seção |
| **DADO VERDADEIRO** | a transição é dirigida por um dado real | a cota mede a largura real do nome na tela; a contagem é o número real de projetos |
| **PERSONIFICAR** | um elemento tem intenção: hesita, olha, espera | a aba da porta balança antes de abrir, como se algo estivesse do outro lado |
| **SINESTESIA** | traduz outro sentido em movimento | o peso da fonte (eixo wght) vira volume da voz; o ritmo de leitura vira tempo de corte |

## 3. Protocolo de invenção (siga em ordem)

1. **Verbo**: escolha o verbo da Motion Language que corresponde ao significado da passagem (ver tabela de conjugação em `02-motion-language.md`).
2. **Ponto de partida**: pegue um conceito da biblioteca que pratique esse verbo (`node scripts/catalog.mjs --feel <sensação>`).
3. **Operadores**: aplique dois operadores. Escreva o resultado em uma frase.
4. **Eixo distante**: troque um eixo por um valor de uma família distante (tabela de distância abaixo).
5. **Teste do conteúdo**: complete "esta transição acontece assim porque o conteúdo ___". Se a resposta for "porque fica bonito", volte ao 3.
6. **Teste de novidade**: se o resultado for igual a um item da biblioteca, aplique mais um operador ou troque mais um eixo.
7. **Teste de legibilidade**: durante a transição o usuário sabe onde está e para onde vai? Se não, simplifique um eixo (normalmente o ritmo ou a geometria).
8. **Nome**: 2–4 palavras evocativas, na língua do site ("A Revisão de Idioma", "O Corte A–A", "A Maré de Tinta").
9. **Beat sheet em 5 linhas**: entrada · antecipação · ação · clímax · saída.

`node scripts/invent.mjs` automatiza os passos 2–4 e devolve sementes; o julgamento (5–9) é seu.

## 4. Distância entre famílias (para o FUNDIR e o passo 4)

Quanto mais distantes as famílias, mais inédito o híbrido, e mais cuidado com a legibilidade.

| | SP | CI | TY | MK | LQ | ME | DG | IV | GX | GL | IN | NX |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **SP** spatial | · | 1 | 2 | 1 | 3 | 2 | 3 | 2 | 2 | 1 | 2 | 2 |
| **TY** typographic | 2 | 2 | · | 1 | 3 | 2 | 2 | 2 | 2 | 3 | 2 | 1 |
| **ME** mechanical | 2 | 2 | 2 | 2 | 3 | · | 3 | 2 | 2 | 2 | 1 | 2 |
| **LQ** liquid | 3 | 2 | 3 | 1 | · | 3 | 2 | 2 | 1 | 1 | 2 | 2 |
| **DG** glitch | 3 | 1 | 2 | 2 | 2 | 3 | · | 1 | 2 | 1 | 2 | 2 |

(Excerto. 1 = vizinhas, 3 = distantes. A matriz completa 12×12 está em `scripts/invent.mjs`, constante `DISTANCE`.) Híbridos com distância 3 (TY×LQ, SP×DG, ME×LQ, SP×LQ, ME×DG) são as minas de transições inéditas.

## 5. Exemplos de derivação (inventados com este método)

**"A Maré de Tinta" (TY × LQ, distância 3)**
Partida: TY-07 Linha de Leitura (palavras acendem ao ler). Operadores: MATERIALIZAR (o acender é tinta), MUDAR ESCALA (a tinta da última palavra transborda). Eixo distante: geometria vira "da última letra lida". Conteúdo: a seção de manifesto termina e a tinta das palavras que você leu escorre para baixo e vira o fundo escuro da próxima seção. *Acontece assim porque o manifesto "tinge" o resto do site.*

**"O Arquivo Morto" (ME × NX)**
Partida: ME-04 Gaveta de Arquivo. Operadores: QUEBRAR A MOLDURA (a barra de rolagem é o puxador da gaveta), DADO VERDADEIRO (a etiqueta da gaveta mostra o número real de itens). Conteúdo: ao chegar ao fim da lista de projetos, a seção inteira se fecha como gaveta e a próxima é a gaveta de baixo, que abre. *Porque o conteúdo é um acervo.*

**"Revelação por Respiro" (LQ × MK)**
Partida: LQ-11 Condensação. Operadores: PERSONIFICAR (a tela "embaça" quando o usuário para de rolar, como respiração no vidro), INVERTER CAUSA (a inatividade, não a ação, revela). Conteúdo: num site de spa/bem-estar, parar é o que revela; o texto da próxima seção aparece onde o vapor se desfaz. *Porque a marca vende pausa.*

**"Corte de Seção" (SP × TY, real, Guilherme Antunes)**
Partida: MK-12 Lâmina Diagonal. Operadores: TRANSPLANTAR (linha de corte da prancha técnica, traço-ponto com setas e "A–A"), geometria = altura do clique. Conteúdo: o site é uma prancha; ver um projeto é "cortar" a prancha naquele ponto.

**"A Revisão de Idioma" (TY × NX, real, Guilherme Antunes)**
Partida: TY-15 Decodificação (descartada por clichê). Operadores: TRANSPLANTAR (marca de revisão editorial), TEMPORALIZAR (primeiro risca tudo, depois reescreve). Conteúdo: trocar de idioma é revisar o documento, não "embaralhar letras".

**"Esteira de Pedidos" (ME × IV)**
Partida: ME-09 Esteira. Operadores: DADO VERDADEIRO (as comandas da esteira são pedidos reais do cardápio), FRACIONAR (cada item sai da esteira para seu lugar na grade da próxima seção, Flip). Conteúdo: restaurante delivery; a próxima seção (cardápio) é montada pelos próprios pedidos.

**"Pixel que Esfria" (DG × LQ)**
Partida: DG-08 Dithering. Operadores: MATERIALIZAR (o pixel é metal que esfria: laranja → cinza ao se quantizar), RITMO desacelerando. Conteúdo: metalúrgica/fundição; a seção de processo "esfria" em grade de pixels que vira a malha da seção de produtos.

## 6. Matriz rápida de geração (para quando faltar ideia)

Escolha uma linha de cada coluna, em voz alta, e force uma frase:

```
[verbo da marca] + [mecanismo] + feito de [material] + disparado por [trigger]
+ nascendo de [geometria] + causado por [agente] + no ritmo [ritmo]
```

"**Carimbar** + **quantização** + feito de **tinta** + disparado por **clique** + nascendo do **ponto do clique** + causado pelo **usuário** + no ritmo **staccato**" → ao clicar num item, o ponto vira um carimbo cuja tinta se espalha em grade de meio-tom (halftone) até cobrir a tela com a cor da página seguinte; ao assentar, os pontos se fecham na imagem do hero dela.

## 7. Critérios de um bom invento

- **Uma frase explica.** "A tinta das palavras escorre e vira o fundo da próxima seção."
- **Tem origem e destino visíveis.** Nunca começa ou termina "no ar".
- **O material obedece à física dele.** Tinta não volta para o pote sem rastro; papel não estica.
- **Funciona sem o efeito** (reduced-motion): o significado sobrevive num estado estático.
- **Não precisa de legenda.** Se precisar explicar o que aconteceu, falhou.
