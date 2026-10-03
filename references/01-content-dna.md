# 01 · Content DNA: ler antes de mover

O movimento certo já está escondido no conteúdo. Esta etapa extrai o que vai ditar cada transição. Faça por escrito (pode ser no topo do `MOTION-LEDGER.md` do projeto).

## 1. Fontes de leitura (nesta ordem)

1. **O conteúdo real**: textos, dados, fotos, vídeos, a ordem das seções. Não o layout.
2. **A marca**: logo, cores oficiais, tipografia, tom de voz, o que ela vende e para quem.
3. **O código existente**: que motion já existe (rode `scripts/audit-motion.mjs`), stack, restrições.
4. **O contexto de uso**: desktop ou celular primeiro? Público com pressa (e-commerce) ou com tempo (portfólio)?

## 2. O formulário

```
MARCA        · o que faz, em uma frase sem adjetivos
PÚBLICO      · quem chega, com que pressa, em que aparelho
OBJETO-MESTRE· a coisa física/cultural que só essa marca tem (porta de pet, prancha técnica,
               relatório de pentest, comanda, receita, partitura, mapa, rótulo, maquete)
SÍMBOLO      · a forma mínima que pode atravessar o site (arco, barra "/", ponto, corte, aspas)
MATERIAL     · de que o mundo da marca é feito (papel, vidro, aço, tecido, tinta, luz, água, pixel)
VERBOS       · o que a marca FAZ com o material (dobrar, medir, carimbar, destilar, costurar...)
TEMPO        · o ritmo natural do ofício (instantâneo, artesanal, cerimonial, industrial, orgânico)
TENSÃO       · o conflito que o site resolve (caos → ordem, protótipo → produção, rua → casa)
SEÇÕES       · para cada uma: a verdade que ela prova, a energia (alta/média/baixa), o que entrega
               para a próxima
RESTRIÇÕES   · mídia que falta, peso, prazo, acessibilidade, CMS, framework
```

## 3. Perguntas que destravam o conceito

- Se este site fosse um **objeto**, qual seria? E o que se faz com esse objeto (abrir, folhear, montar, acender)?
- Qual é o **gesto profissional** de quem trabalha aqui? (o desenhista cota, o legista examina, o barista extrai, o alfaiate mede). Esse gesto é uma transição.
- Qual é o **antes e depois** que o cliente vive? (com fome → servido; protótipo → deploy; rua → casa). O site inteiro pode ser essa travessia.
- O que, no conteúdo, é **dado verdadeiro** que pode virar imagem? (o hexdump da requisição real, a medida real do nome na tela, as datas reais da carreira). Artefato verdadeiro > ilustração.
- Qual **palavra** a marca repete? Ela pode virar a palavra-ponte entre seções.
- O que **não pode** acontecer? (um banco não pode parecer instável; uma marca infantil não pode ser agressiva; um site jurídico não pode brincar com legibilidade).

## 4. Verdade da seção

Para cada seção, uma linha: **"Esta seção prova que ___"**. A transição de entrada dramatiza essa prova; a de saída entrega o fio para a próxima.

Exemplos:
- Raças de filhote → "existe um filhote para o seu jeito de viver" → a frase sobre você ocupa a tela e se dobra num rótulo, o filhote aparece. (PillePet)
- Stack técnica → "ele sabe descer até o metal" → descida por camadas da aplicação ao silício. (escanearcplx)
- Trabalhos → "os projetos estão em produção" → cada um entra como planta em cianotipia e é revelado em cor real por uma varredura. (Guilherme Antunes)

## 5. Mapa de energia

Desenhe a curva do site como trilha sonora: `calmo · sobe · clímax · respira · sobe · fecha`. Regras:
- Nunca dois clímax seguidos. Depois de uma cena pesada, uma pausa tipográfica calma.
- O hero é **estático e forte** no primeiro quadro (LCP), o movimento começa no primeiro gesto.
- O fechamento **rima** com a abertura (mesmo objeto, outro estado).
- Transições de alta energia ficam nas viradas de ato (mudança de cor de fundo, de mundo, de modo).

## 6. Saída desta etapa

Um bloco curto com: conceito em uma frase, objeto-mestre, símbolo, material, 3 verbos candidatos, mapa de energia com as seções, e as restrições. Só então siga para a Motion Language.
