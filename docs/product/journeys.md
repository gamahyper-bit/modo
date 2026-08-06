# Jornadas

**O planejamento é orientado por jornadas, não por telas.**

Uma tela pronta não é valor. Valor é o usuário conseguir ir do começo ao fim de
uma intenção sem travar. Cinco telas bonitas com um buraco entre elas valem
menos que três telas simples que se conectam.

Toda entrega declara **qual jornada ela aproxima de utilizável ponta a ponta**.

---

## Estados

`Quebrada` — trava em algum ponto · `Frágil` — funciona com dados de
demonstração ou depende de sorte · `Utilizável` — vai do começo ao fim ·
`Boa` — vai do começo ao fim e é agradável

|        | Jornada             | Estado   | Fecha em |
| ------ | ------------------- | -------- | -------- |
| **J1** | Primeiro uso        | Frágil   | v0.3     |
| **J2** | A manhã             | Frágil   | v0.4     |
| **J3** | Crescer o armário   | Frágil   | v0.3     |
| **J4** | Reencontrar um look | Frágil   | v0.6     |
| **J5** | Confiar no produto  | Quebrada | v0.6     |

Nenhuma jornada está `Utilizável` ainda. Todas param no mesmo lugar: os dados
somem ao recarregar. J2 tem um segundo motivo, e é dela sozinha: o clima é fixo
em 18 graus.

---

## J1 — Primeiro uso

> _Baixei o app. Em quanto tempo ele me é útil?_

```
instalar → entrar → montar um armário mínimo → primeira recomendação
```

**Onde está.** Login funciona. O armário começa com peças de demonstração, o que
esconde o problema real: **não sabemos quanto tempo leva montar um armário do
zero**, nem quantas peças são o mínimo para a primeira recomendação não ser
constrangedora.

**O que falta.** MOD-024 (recorte), MOD-025 (leitura real), MOD-031
(onboarding), MOD-028 (persistir).

**Fecha quando.** Alguém instala, fotografa dez peças e recebe uma recomendação
que faz sentido — em menos de dez minutos.

**Métrica que importa.** Peças até a primeira recomendação aceita.

---

## J2 — A manhã

> _Acordei. O que eu visto?_

```
abrir → ver o look → entender o porquê → ajustar se preciso → vestir
```

**É a jornada central do produto.** Todas as outras existem para alimentá-la.

**Onde está.** Os cinco passos funcionam. Ajustar passou a funcionar em
MOD-018: o ajuste vira parâmetro do motor, o look muda de forma previsível e o
pedido fica visível na tela até o usuário desfazer.

Continua `Frágil` por um motivo só, e ele é grande: **o clima é fixo.** São
sempre 18 graus nublados. A recomendação está certa para um dia que não é o de
hoje, e "está frio" é a única maneira de o usuário corrigir isso — corrigir à
mão o que o produto prometeu fazer sozinho é o oposto do PILAR-03.

**O que falta.** MOD-027 (clima real), MOD-026 (texto por IA), MOD-036 (régua
de agasalho).

**Fecha quando.** O clima do dia já está considerado antes de o usuário pedir.

**A data mudou de v0.2 para v0.4.** MOD-018 fechou o ajuste, mas o clima real é
MOD-027, que está em v0.4 — a jornada não podia fechar antes dele. A data
anterior media o item, não a jornada; é exatamente o erro que planejar por
jornada existe para evitar.

**Métrica que importa.** Quantas vezes o usuário precisa gerar outro antes de
aceitar.

---

## J3 — Crescer o armário

> _Comprei uma peça. Quero que ele saiba._

```
fotografar → a IA lê → confirmar → ver a peça influenciar a recomendação
```

**Onde está.** O ciclo inteiro funciona — verificado de ponta a ponta. Mas a
leitura devolve sempre a mesma peça e o fundo não é removido, então a promessa
"a IA preenche, você confirma" ainda é encenação.

**O que falta.** MOD-024, MOD-025, MOD-030 (upload), MOD-023 (corrigir depois).

**Fecha quando.** Uma peça fotografada em casa aparece recortada, com atributos
corretos, e muda a recomendação do dia seguinte.

**Métrica que importa.** Quantos atributos o usuário precisa corrigir.

---

## J4 — Reencontrar um look

> _Aquele look de duas semanas atrás. Onde está?_

```
salvar → encontrar → reusar
```

**Onde está.** Salvar e listar funcionam. Some ao recarregar.

**O que falta.** MOD-029 (persistir), MOD-022 (detalhe da peça).

**Fecha quando.** Um look salvo há um mês abre com as peças certas.

---

## J5 — Confiar no produto

> _Posso deixar meu guarda-roupa aqui?_

```
usar por semanas → trocar de aparelho → encontrar tudo no lugar
```

**A jornada mais longa e a menos visível.** É a que decide se o produto é um
brinquedo ou uma ferramenta.

**Onde está.** Quebrada. Tudo vive em memória.

**O que falta.** MOD-028, MOD-029, MOD-030, MOD-033, MOD-035.

**Fecha quando.** Alguém usa por um mês, troca de celular e não perde nada.

---

## Como isso muda o planejamento

**Antes.** "Esta sprint entrega o Armário e o Perfil."
**Agora.** "Esta sprint leva J2 de Frágil para Utilizável."

Consequências práticas:

1. **Todo item do backlog declara a jornada que serve.** Item que não serve
   nenhuma é candidato a sair.
2. **Todo PR responde qual jornada aproximou de utilizável.**
3. **Preferimos fechar uma jornada a avançar quatro pela metade.** Quatro
   jornadas frágeis é o estado de hoje, e ele não é utilizável por ninguém.
4. **Uma tela pronta sem jornada fechada não conta como entrega.**

**A tensão que isso cria, e que aceito conscientemente:** fechar J5 exigiria
parar tudo e fazer backend, o que congelaria o produto por uma versão inteira.
Por isso J2 fecha primeiro — é a jornada que dá sentido a todas as outras, e a
única que já está a um item de distância.
