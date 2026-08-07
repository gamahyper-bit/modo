# Epics

Sete temas permanentes. Diferente das versões do roadmap — que são fatias de
tempo — os epics são **eixos de valor** que atravessam todas as versões.

Todo item do backlog pertence a exatamente um epic. Um item que não couber em
nenhum é sinal de que está fora do produto, ou de que falta um epic.

| Epic    | Nome         | Valor para o usuário                     | Itens  |
| ------- | ------------ | ---------------------------------------- | ------ |
| EPIC-01 | Identidade   | "este app tem cara de coisa boa"         | 5      |
| EPIC-02 | Recomendação | "ele acerta, e me explica"               | 7      |
| EPIC-03 | Armário      | "minhas roupas estão aqui, sem trabalho" | 6      |
| EPIC-04 | Coleção      | "o que funcionou, eu guardo"             | 2      |
| EPIC-05 | Conta        | "ele me conhece"                         | 4      |
| EPIC-06 | Plataforma   | "não perco nada"                         | 6      |
| EPIC-07 | Confiança    | "posso depender disso"                   | 5      |
|         |              | **Total**                                | **35** |

---

## EPIC-01 — Identidade

**O que é.** A marca virando interface: tokens, tipografia, iconografia, motion
e os componentes que dão ao produto sensação de objeto caro.

**Valor.** A primeira impressão. O Modo pede confiança antes de provar qualquer
coisa — a identidade é o que compra essa confiança.

**Pronto quando.** Quem abre o app pela primeira vez não consegue dizer se foi
feito por uma pessoa ou por uma equipe grande.

MOD-002 · MOD-003 · MOD-004 · MOD-005 · MOD-021

---

## EPIC-02 — Recomendação

**O que é.** O motor determinístico, a camada de IA que ranqueia e escreve, o
clima, e as telas que apresentam a escolha.

**Valor.** É o produto. Todo o resto existe para alimentar ou apresentar isto.

**Pronto quando.** O usuário abre o app de manhã, lê uma frase e se veste.

MOD-007 · MOD-008 · MOD-009 · MOD-012 · MOD-018 · MOD-026 · MOD-027 · MOD-036

---

## EPIC-03 — Armário

**O que é.** Catalogar o guarda-roupa sem que isso vire trabalho: captura,
leitura por IA, confirmação, grade, busca, edição.

**Valor.** É o custo de entrada do produto. Cada atrito aqui é um usuário que
desiste antes da primeira recomendação.

**Pronto quando.** Fotografar vinte peças é tarefa de dez minutos, não de uma
tarde.

MOD-010 · MOD-011 · MOD-022 · MOD-023 · MOD-024 · MOD-025

---

## EPIC-04 — Coleção

**O que é.** O que o usuário guarda, e o histórico do que já usou.

**Valor.** Faz a relação com o produto durar mais que um dia. Sem isto, cada
abertura recomeça do zero.

**Pronto quando.** O usuário volta a um look de três semanas atrás porque
lembrou dele.

MOD-015 · MOD-029

---

## EPIC-05 — Conta

**O que é.** Entrar, ser reconhecido, ensinar o produto sobre seu estilo.

**Valor.** É o que transforma "um app de moda" em "o meu stylist".

**Pronto quando.** A recomendação do primeiro dia já reflete o gosto da pessoa,
e não uma média.

MOD-013 · MOD-014 · MOD-031 · MOD-032

---

## EPIC-06 — Plataforma

**O que é.** Fundação do projeto, persistência, fotos, builds — tudo que faz o
produto existir fora de uma sessão.

**Valor.** Invisível quando funciona, fatal quando falha. Perder um armário
inteiro é perder o usuário para sempre.

**Pronto quando.** O usuário troca de aparelho e encontra tudo no lugar.

MOD-001 · MOD-016 · MOD-017 · MOD-028 · MOD-030 · MOD-033

---

## EPIC-07 — Confiança

**O que é.** Galeria de componentes, testes, integração contínua,
acessibilidade, beta.

**Valor.** Não é visível para o usuário — e é justamente por isso que precisa de
epic próprio. Sem um lugar declarado, este trabalho é sempre adiado, e a
qualidade cai por acúmulo silencioso.

**Regra deste epic.** Todo item precisa declarar **qual falha concreta ele
impede**. Não "melhora a qualidade", mas "evita que a regra de uniforme quebre
sem ninguém perceber".

**Pronto quando.** Alguém novo no projeto consegue mexer no motor de
recomendação sem medo.

MOD-006 · MOD-019 · MOD-020 · MOD-034 · MOD-035 · MOD-037
