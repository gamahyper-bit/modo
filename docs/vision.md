# Visão

Princípios permanentes do Modo. Diferente do resto da documentação, **este
arquivo quase não muda** — se ele estiver mudando com frequência, ou o produto
perdeu o rumo ou o texto está descrevendo tática em vez de princípio.

Quando uma decisão de produto ou de engenharia contrariar algo aqui, a decisão
está errada — não a visão.

---

## A tese

Todo dia, milhões de pessoas ficam paradas na frente do armário decidindo o que
vestir. Elas já têm roupa boa. O problema não é falta de peça: é falta de
alguém que saiba combiná-las.

**O Modo é esse alguém.**

> O Modo revela a melhor escolha.

---

## Os quatro pilares

As colunas que sustentam o produto. Se uma cair, o Modo vira outra coisa.

Cada pilar é uma escolha com um lado rejeitado — é o lado rejeitado que
transforma o pilar em régua, e não em slogan.

### PILAR-01 — Curadoria, não catálogo

O Modo **escolhe**. Não organiza, não lista, não ordena por relevância.

Um catálogo transfere a decisão de volta para o usuário e chama isso de
liberdade. Curadoria assume a decisão e responde por ela.

_Sustenta:_ EPIC-02 · _Ameaçado por:_ qualquer tela que mostre duas
recomendações lado a lado.

### PILAR-02 — Explicação, não sugestão

Toda escolha vem com o porquê. Sempre.

Sugerir sem explicar produz obediência ou descarte — nunca confiança. A
explicação é o que faz o usuário acreditar na **próxima** recomendação, e é o
único ativo que compõe com o tempo.

_Sustenta:_ EPIC-02, EPIC-04 · _Ameaçado por:_ qualquer atalho que entregue look
sem texto porque "o texto estava lento".

### PILAR-03 — Esforço mínimo, sempre

O trabalho é da máquina. Do usuário é só a confirmação.

Cada campo que pedimos é um usuário que desiste. Cada passo do cadastro é um
guarda-roupa que fica pela metade — e um armário incompleto produz recomendação
ruim, que destrói o PILAR-01.

_Sustenta:_ EPIC-03, EPIC-05 · _Ameaçado por:_ formulário, onboarding longo,
tela de configuração.

### PILAR-04 — Beleza como função

A estética não é acabamento. É o que faz alguém confiar a decisão do próprio
dia a um aplicativo.

Um produto feio pode estar certo e ainda assim não ser obedecido. No Modo,
polimento visual é requisito, não capricho.

_Sustenta:_ EPIC-01 · _Ameaçado por:_ "depois a gente melhora o visual".

---

## Os cinco princípios

Os pilares dizem **no que apostamos**. Os princípios dizem **como nos
comportamos** — são os pilares traduzidos em regra de todo dia.

### 1. A IA faz o trabalho. O usuário confirma.

Nenhuma tela pede o que poderia deduzir. Nenhum campo aparece vazio quando
poderia aparecer preenchido. Quando a IA erra, o usuário corrige — nunca
preenche do zero.

**O teste:** se uma tela pede mais de três decisões, ela está devolvendo ao
usuário o trabalho que o produto prometeu tirar dele.

### 2. Uma escolha, não uma lista.

A Home mostra **um** look. Não cinco, não um carrossel, não "veja também".

Mostrar alternativas lado a lado é admitir que não sabemos qual é a melhor — e
saber qual é a melhor é o produto inteiro.

**O teste:** se a tela precisou de rolagem horizontal, viramos catálogo.

### 3. Toda recomendação vem com o porquê.

O Modo nunca mostra roupa. Mostra uma escolha **e o motivo dela**.

A explicação não é enfeite: é o que separa uma consultoria de um gerador de
combinações, e é o que faz o usuário confiar na próxima recomendação.

**O teste:** um look sem explicação é um defeito, não uma versão simplificada.

### 4. A IA trabalha nos bastidores.

O usuário **nunca conversa com uma IA**. Não há chat, não há prompt, não há
"peça ao assistente".

O produto deve parecer que existe um stylist profissional cuidando dele. A
sensação de "ChatGPT para moda" é o maior risco existencial do Modo — e a
defesa contra ela é arquitetural, não cosmética: a IA nunca escolhe sozinha.

**O teste:** se a interface expõe que existe um modelo ali, perdemos.

### 5. As roupas são as protagonistas.

Muito espaço, tipografia forte, poucas ações. Nada de badge, contador, selo,
gradiente colorido ou botão flutuante.

A interface é a moldura — FRAME. Ela existe para desaparecer.

**O teste:** se um elemento da interface disputa atenção com a foto de uma
peça, ele sobra.

---

## O que o Modo não é

| Não é                  | Por quê                                                   |
| ---------------------- | --------------------------------------------------------- |
| Organizador de roupas  | Organizar é o meio. Revelar a escolha é o fim.            |
| Gerador de combinações | Combinação aleatória é ruído. Curadoria é produto.        |
| Chat de moda           | Conversar é esforço. O Modo existe para eliminar esforço. |
| Marketplace            | Não vendemos roupa. Fazemos render a que já existe.       |
| Rede social            | O armário de alguém é privado por definição.              |

---

## Como decidimos

Toda decisão de UX responde a três perguntas, nesta ordem:

1. **Isso reduz esforço?**
2. **Isso aumenta confiança?**
3. **Isso parece uma consultoria?**

Se a resposta a qualquer uma for "não", a decisão precisa de um argumento muito
bom para seguir.

E toda entrega responde a uma quarta:

4. **O que o usuário percebe?**

Trabalho que não muda nada para quem usa o produto precisa declarar qual risco
está removendo, e por que vale removê-lo agora.

---

## Compromissos permanentes

Estes valem independentemente de prazo, versão ou pressão.

- **Privacidade.** O armário é privado. Nenhuma leitura pública, nenhuma foto
  em URL adivinhável, nenhum dado de vestuário compartilhado com terceiros.
- **Sem segredo no cliente.** Nenhuma chave de IA no bundle, em nenhuma
  circunstância, por nenhum atalho de prazo.
- **O app sempre entrega um look.** Sem rede, sem backend, sem IA — a camada
  determinística local garante que a Home nunca fica vazia.
- **Nada de padrão escuro.** Sem notificação para forçar retorno, sem
  gamificação de uso, sem métrica de vaidade transformada em pressão.
- **Acessível.** Leitor de tela, contraste e "reduzir movimento" não são
  funcionalidade opcional.

---

## Sinais de que perdemos o rumo

Se algum destes aparecer, é hora de parar e revisar:

- A Home ganhou uma segunda recomendação "só para comparar".
- Alguém propôs um campo de texto livre para o usuário "pedir" um look.
- Um look foi entregue sem explicação porque "a explicação estava lenta".
- A tela de cadastro de peça cresceu para mais de um punhado de confirmações.
- A interface ganhou uma cor que não é neutra nem a assinatura.
- Uma chave de API foi para o app "só para testar".
