# 06 · Continuidade narrativa: o site como um filme sem costuras

Uma seção bonita isolada é um slide. Um site premiado é um **plano-sequência editado**: cada corte tem motivo e cada cena entrega algo à seguinte.

## 1. O handoff

Toda transição tem um **objeto de passagem**: algo que existe no último quadro de A e no primeiro de B.

| Tipo de handoff | O que passa | Exemplo |
|---|---|---|
| **Cor** | o fundo de saída de A = fundo de entrada de B | a cena escurece até o azul exato da próxima |
| **Forma** (match cut) | uma forma de A vira uma forma de B | o arco da porta vira a moldura da foto da raça |
| **Objeto** | um elemento atravessa a fronteira | a foto do card cresce e vira o hero da página (Flip / View Transition) |
| **Palavra** | a última palavra de A é o título de B | TY-05 Palavra-Ponte |
| **Posição** | o foco do olho fica no mesmo ponto | o clique acontece em y=60%; a próxima abre a partir de y=60% |
| **Material** | o mesmo material muda de estado | o papel vira planta, a planta vira tela em produção |
| **Som/ritmo** | a cadência continua | o tick do split-flap vira o passo da próxima lista |

**Regra:** pelo menos um handoff por transição; dois em viradas de ato.

## 2. Estrutura em atos

Pense o site em 3–5 atos. Mudanças de ato são marcadas por **mudança de estado do mundo** (cor de fundo, material, modo), e é aí que entram as transições de maior energia.

```
ATO I    abertura · conceito apresentado (hero estático + primeiro gesto)
ATO II   desenvolvimento · provas (seções de conteúdo, ritmo alternado)
VIRADA   o mundo muda de estado (deploy, anoitecer, travessia)
ATO III  consequência · prova social, trabalhos, dados
FECHO    rima com a abertura · convite
```

## 3. Ritmo e alternância

- **Alternar o eixo dominante:** se uma seção é dominada por profundidade (z), a próxima por plano (x/y), a seguinte por tipografia.
- **Alternar a densidade:** cena cheia → pausa tipográfica → cena cheia.
- **Alternar o trigger:** scroll scrub → clique → scrub → arrastar. O usuário sente variedade sem perceber o motivo.
- **Pausas de leitura:** em cenas fixas, ~0,6 tela parada depois de cada batida de conteúdo. O movimento serve à leitura, não o contrário.
- **Nunca dois clímax seguidos.**

## 4. Rima abertura/fechamento

O último plano repete o primeiro em outro estado:
- a prancha desenhada do hero → a prancha em branco do contato (para o projeto do visitante);
- a capa assinada do relatório → o termo assinado e carimbado;
- a porta que se abre → a porta pela qual o filhote vai para casa.

## 5. O objeto-fio

Um elemento que atravessa o site inteiro (NX-06): o símbolo da marca, um personagem, uma linha. Ele aparece em todas as transições em papéis diferentes (moldura, cursor, divisor, loader, 404). É o que transforma N transições em uma linguagem.

## 6. Page transitions

Entre páginas o mesmo verbo vale. Se dentro da home "atravessar" é a porta, entre a home e a página de raça também é a porta (o arco do card cresce até ser o hero da página nova; voltar faz o caminho inverso). Ferramentas: View Transitions API (`document.startViewTransition`, nomes compartilhados por elemento) + GSAP para o miolo; fallback: navegação normal.

Regras:
- A transição de ida e a de volta são **espelhadas**, não iguais.
- Clique com modificador (Ctrl/Cmd/Shift), `target=_blank` e download nunca são interceptados.
- Timeout de segurança (2–2,5 s): se a página nova não chegou, mostre-a assim mesmo.
- Navbar, cursor e elementos persistentes recebem `view-transition-name` próprio para não piscar.
- A rota nova abre no topo (ou no ponto certo), com qualquer smooth scroll ainda em curso cancelado.

## 7. Costuras

Uma costura vazando (1 px de branco, um canto que mostra o `html`, um quadro com a cor errada) destrói a continuidade. Previna:
- fundo do `html` acompanha a cor da seção visível (`data-page-tone`);
- seções adjacentes com o mesmo fundo exato na emenda;
- folhas com cantos arredondados sobem sobre a anterior (margem negativa do raio);
- meça capturando dezenas de quadros durante a rolagem; só declare resolvido com 0 px.

## 8. Checklist de continuidade (por transição)

- [ ] Existe ao menos um handoff, e ele está no beat sheet.
- [ ] A cor no último quadro de A é exatamente a do primeiro de B (ou a mudança é o evento).
- [ ] O olho do usuário tem um ponto de foco contínuo.
- [ ] Ida e volta funcionam; a volta não é um "pulo".
- [ ] Não há dois clímax seguidos; a energia segue o mapa.
- [ ] O objeto-fio aparece (quando o site tem um).
