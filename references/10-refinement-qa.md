# 10 · Refinamento e QA: de "funciona" a "premiável"

A diferença entre 7 e 8,5 no júri está quase toda aqui. Implementar é metade; a outra metade são passes de refinamento com olho de editor.

## 1. Os 9 passes (nesta ordem)

1. **Passe de significado.** Assista à transição sem som e sem contexto. Ela diz o que deveria? Se precisa de explicação, simplifique o mecanismo.
2. **Passe de timing.** A transição cabe na atenção? Por clique: 0,6–1,4 s. Por scroll: o usuário não precisa rolar "demais" para nada acontecer (antecipação ≤ 15% do trilho).
3. **Passe de antecipação.** Antes da ação principal, um gesto pequeno na direção oposta ou uma pausa (a aba hesita, a lâmina recua 2 px, a tinta junta na borda). 5–10% do tempo.
4. **Passe de overlap.** Nenhuma camada começa exatamente quando a outra termina. Sobreposição de 20–40%. Movimento em bloco único parece template.
5. **Passe de assentamento.** O fim desacelera e **assenta** (settle): micro-overshoot de 1–3 px em materiais rígidos, nenhum em líquidos, mola curta em lúdicos. Um fim abrupto parece bug.
6. **Passe de handoff.** Capture o último quadro de A e o primeiro de B lado a lado. Cor exata? Posição do foco? Objeto de passagem visível?
7. **Passe de detalhe secundário.** Um elemento pequeno reage à transição principal (a navbar troca de tema, o cursor muda, o número do capítulo vira, a sombra acompanha). É o que faz o júri dizer "craft".
8. **Passe de borda.** Rolar rápido, rolar devagar, inverter no meio, redimensionar no meio, trocar de aba no meio, recarregar no meio da página.
9. **Passe de corte.** Remova um elemento da transição. Se ninguém sentir falta, ele não deveria estar lá.

## 2. Verificação por quadros

Como a transição é `render(p)`, verifique por capturas determinísticas:

```js
// Playwright: capture os quadros-chave do beat sheet
for (const p of [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]) {
  await page.evaluate((p) => window.__transition.render(p), p);
  await page.screenshot({ path: `frames/t-${p}.png` });
}
```

Em cenas de scroll: role até `start + p * (end - start)` com `window.scrollTo` (desligue o smooth scroll no teste) e espere dois frames.

Monte uma **folha de contato** (os quadros lado a lado) e avalie como um storyboard: cada quadro sozinho deveria ser uma composição aceitável. Quadros intermediários feios (meio cortado, texto ilegível por muito tempo, sobreposição suja) são o defeito mais comum de transições amadoras.

O laboratório `assets/engine/lab/index.html` tem um slider de `p` e expõe `window.__transition` para exatamente isso.

## 3. Critérios do júri aplicados a uma transição

| Critério | Pergunta |
|---|---|
| Design (40%) | Cada quadro intermediário é uma boa composição? O material é crível? |
| Usabilidade (20%) | O usuário sabe onde está? Pode interromper? Funciona no celular e com teclado? |
| Criatividade (20%) | Isso existe em outro site? É uma combinação nova? Nasce do conteúdo? |
| Conteúdo (20%) | A transição revela algo verdadeiro sobre a marca/dado? |

## 4. Sinais de que está genérico (mesmo sem cair na lista vermelha)

- Todas as transições duram o mesmo e usam a mesma curva (sem hierarquia).
- Tudo entra de baixo.
- O movimento não tem direção de leitura (entra contra o sentido de leitura sem motivo).
- O material não reage (papel que desliza como vidro, tinta que some como fade).
- Os quadros intermediários não foram desenhados, só os extremos.

## 5. Relatório de entrega

Ao terminar, entregue em português claro:
1. **A cena como o usuário vê**, quadro a quadro (não o código).
2. **Por que assim** (ligação com o conteúdo, uma frase).
3. **As três versões**: desktop, mobile, reduced-motion, e o que muda em cada.
4. **Folha de contato** ou capturas dos quadros-chave.
5. **Números**: duração/telas de scroll, peso adicionado, fps medido, Lighthouse se aplicável.
6. **Ledger atualizado** e o que fica proibido para as próximas transições.
7. **O que ficou pendente** (mídia faltando, teste em aparelho real, texto marcado como sugestão).
