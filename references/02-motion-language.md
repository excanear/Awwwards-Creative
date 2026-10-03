# 02 · Motion Language: a gramática do movimento

Uma Motion Language é um sistema pequeno e rígido que torna todas as transições de um site parte da mesma língua. Sites premiados não têm "muitas animações"; têm **poucas palavras usadas com precisão**.

## Os 7 componentes

### 1. Verbos (3, no máximo 4)
Ações que a marca executa. Toda transição é uma conjugação de um verbo.
- PillePet: **balançar** (mudar de conteúdo), **atravessar** (entrar em algo), **espiar** (convidar).
- Guilherme Antunes: **desenhar** (stroke), **encaixar** (snap CAD de 2–3 px), **construir** (contorno → preenchimento → real).
- escanearcplx: **carimbar**, **anotar**, **descer** (camadas), **folha sobre folha**.

Cada verbo tem um significado fixo. Se "atravessar" significa entrar em algo, ele nunca é usado para sair.

### 2. Material
Do que é feito o mundo e como ele reage: papel (dobra, desliza, tem verso), vidro (refrata, reflete), tinta (escorre, mancha, seca), metal (pesa, faz clique), luz (varre, revela, ofusca), líquido (ondula, une, escorre), pixel (quantiza, quebra). O material decide **o que é permitido**: papel não estica, vidro não dobra, tinta não volta atrás sem rastro.

### 3. Física
- **Massa:** leve (respostas rápidas, overshoot) ou pesada (aceleração lenta, sem overshoot).
- **Atrito:** escorrega (decaimento longo) ou trava (parada seca com micro-encaixe).
- **Elasticidade:** nenhuma (rigidez editorial) a muita (marca lúdica).
- **Gravidade:** existe? As coisas caem, ou flutuam?

### 4. Curvas (2 a 3, nomeadas)
Uma curva-assinatura para entradas, uma para transições de capítulo, opcional uma para micro-feedback. Registrada como `CustomEase` no GSAP e espelhada em CSS.

| Caráter | Curva | Uso |
|---|---|---|
| Editorial, confiante | `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out suave) | entradas |
| Cinemático, cerimonial | `cubic-bezier(0.76, 0, 0.24, 1)` | viradas de capítulo |
| Mecânico, preciso | `steps()` + overshoot de 2 px, ou `power4.out` curto | encaixes, flaps |
| Orgânico | `sine.inOut` longo + ruído | líquidos, respiração |
| Lúdico | spring (massa 1, rigidez 180, amortecimento 12) | flaps, cartas |
| Brutal | `linear` + cortes secos (sem ease) | glitch, smash cut |

### 5. Tempo (escala de durações e de scroll)
- Tempo por clique: `fast 0.25–0.4s` (feedback), `base 0.6–0.9s` (revelações), `slow 1.1–1.6s` (viradas).
- Tempo por scroll: medido em **telas**. Uma transição de capítulo pede 1,5–2,5 telas; uma batida de conteúdo, ~1 tela + pausa de leitura.
- Stagger: um valor só (0.04–0.08s). Mais que isso parece lento; menos parece bloco.

### 6. Cor de evento
Uma cor reservada ao **momento de mudança** (carimbo vermelho, azul de cianotipia, magenta do logo). Ela aparece no instante da transição e em nenhum lugar decorativo. É o "acorde" do site.

### 7. Proibições
Liste o que a marca nunca faz. Ex.: "nunca fade puro", "nada gira mais de 15°", "nada salta", "nada aparece sem vir de algum lugar", "só a cor de evento pode piscar". Proibições produzem estilo mais do que permissões.

## Do verbo à transição: a tabela de conjugação

Para cada par de seções, escolha o verbo pelo **significado** da passagem:

| Passagem | Pergunta | Exemplo de verbo |
|---|---|---|
| Entrar em detalhe | o que se abre? | atravessar, mergulhar, desdobrar |
| Mudar de assunto | o que vira? | balançar, girar, virar a página |
| Subir de intensidade | o que acende? | acender, revelar, ampliar |
| Respirar | o que assenta? | pousar, encaixar, recolher |
| Mudar de mundo/modo | o que muda de estado? | deploy, anoitecer, revelar o filme |
| Fechar | o que rima com a abertura? | assinar, carimbar, a prancha em branco |

## Tokens no código

Toda Motion Language vira um módulo único (ver `assets/engine/core/tokens.js`):

```js
export const LANGUAGE = {
  verbs: { cross: "atravessar", swing: "balançar", peek: "espiar" },
  material: "paper",
  ease: { enter: [0.22, 1, 0.36, 1], chapter: [0.76, 0, 0.24, 1], snap: "power4.out" },
  duration: { fast: 0.35, base: 0.8, slow: 1.3 },
  stagger: 0.06,
  screens: { chapter: 2, beat: 1, readPause: 0.6 },
  eventColor: "var(--color-event)",
};
```

CSS espelha as curvas em custom properties (`--ease-enter`, `--ease-chapter`). Nenhum componente define curva ou duração própria; se precisar, o token está faltando.

## Checklist de uma Motion Language pronta

- [ ] Cabe em meia página.
- [ ] Os verbos têm significados que não se sobrepõem.
- [ ] Material e física dizem o que é proibido.
- [ ] Duas curvas nomeadas, com equivalente CSS e GSAP.
- [ ] Escala de tempo em segundos **e** em telas de scroll.
- [ ] Cor de evento com regra de uso.
- [ ] Pelo menos 3 proibições.
- [ ] Uma frase que explica a Motion Language para um cliente leigo.

Use o template `assets/templates/motion-language.md`.
