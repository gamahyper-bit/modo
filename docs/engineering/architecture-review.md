# Revisão arquitetural

**MOD-037.** Escrita antes de qualquer integração pesada — Supabase real, Gemini,
clima, imagens, sincronização. É a última janela em que mexer num contrato custa
um PR.

**Toda afirmação aqui aponta para um arquivo.** Onde não há evidência no código,
está escrito que é julgamento.

---

## Como foi feita

Leitura do código em `main` no commit `eadeea6`: 108 arquivos em `src/`, os
quatro em `supabase/`, e os dois de `scripts/`. As checagens de uso foram feitas
por busca, não por memória.

**O que não foi examinado:** desempenho, tamanho de bundle e acessibilidade. Não
são perguntas de contrato, e a acessibilidade já tem item próprio (MOD-034).

---

## O mapa, como ele está

```
app/          rotas — finas, só ligam rota a tela
features/     telas e a lógica delas
components/   design system
services/     portas para o mundo externo
theme/ types/ utils/ lib/
```

Cinco portas de serviço, cada uma com uma interface:

| Porta                   | Interface em                       | Implementações hoje |
| ----------------------- | ---------------------------------- | ------------------- |
| `AuthService`           | `services/auth/types.ts`           | demo **e** Supabase |
| `WardrobeService`       | `services/wardrobe/types.ts`       | memória             |
| `RecommendationService` | `services/recommendation/types.ts` | motor local         |
| `LookService`           | `services/looks/types.ts`          | memória             |
| `WeatherService`        | `services/weather/index.ts`        | valor fixo          |

**Só `AuthService` tem duas implementações de verdade.** As outras quatro têm uma,
e o `index.ts` delas é um `export const x = mockX` com um comentário prometendo
que ali é o ponto de troca. A promessa é razoável; o texto atual dá a entender
que a troca já existe.

---

## 1. Quais módulos sabem o que não deveriam

### `mockLookService` conhece as entranhas da recomendação

```ts
// src/services/looks/mockLookService.ts
import { composeLook } from '@/services/recommendation/composer';
import { parseLookId } from '@/services/recommendation/lookId';
```

A porta dos looks importa **módulos internos** da recomendação, não a porta dela.
`services/recommendation/index.ts` exporta `recommendationService`; nada disso é
usado aqui.

Não é descuido: é consequência de uma decisão mais funda — a de que um look é uma
**receita** que se recozinha, e não um registro. Ver a seção 2.

### Duas telas falam com serviços sem passar por hook

```ts
// src/features/looks/LooksScreen.tsx
import { lookService } from '@/services/looks';
// src/features/profile/ProfileScreen.tsx
import { wardrobeService } from '@/services/wardrobe';
```

Todo o resto do produto passa por um hook (`useRecommendation`, `useWardrobe`,
`useLook`, `useAddGarment`). Essas duas telas montam a própria `useQuery`. Não
quebra nada hoje; quebra a regra de que a tela não sabe de onde o dado vem, e é
o tipo de exceção que a próxima tela copia.

`AuthProvider` também importa `authService` direto — mas ali é o lugar certo: ele
**é** a camada que adapta a porta para a árvore de componentes.

### Duas telas sabem que existe modo de demonstração

```ts
// src/features/auth/LoginScreen.tsx e src/features/profile/ProfileScreen.tsx
import { hasBackend } from '@/lib/env';
```

Aqui eu **não** proponho mudança. As duas telas mostram ao usuário que ele está
em demonstração — é informação de produto, não detalhe de infraestrutura
vazando. Esconder isso atrás de outra abstração seria abstração por antecipação.

---

## 2. Onde os contratos são frágeis

### O conflito de identidade — o achado principal

O app e o banco discordam sobre **o que identifica uma peça e um look**.

|               | No app                            | No schema              |
| ------------- | --------------------------------- | ---------------------- |
| Peça          | `g1`, `g17` — `g${nextId++}`      | `uuid primary key`     |
| Look          | `l-trabalho-0-_-g1.g6.g9.g12.g13` | `uuid primary key`     |
| Peças do look | dentro do próprio id              | tabela `look_garments` |

Evidência: `mockWardrobeService.ts` (`id: \`g${nextId++}\``),
`recommendation/lookId.ts`, e `supabase/migrations/20260806000100_schema.sql`
(linhas 48–102).

O id do look foi desenhado para **carregar a composição inteira**, e é isso que
permite abrir o detalhe de um look sem banco nenhum (DEC-008, DEC-020, DEC-025).
O schema foi desenhado para o oposto: chave substituta e uma tabela de ligação.

**Os dois modelos não convivem.** Ou o look é uma receita reconstruída sob
demanda, ou é um registro guardado. MOD-028 e MOD-029 batem nisso de frente, e
descobrir na integração significa reescrever o schema ou o motor com pressa.

### O mesmo conflito, por outro lado: o look guarda texto

```sql
-- supabase/migrations/20260806000100_schema.sql
moment text not null,
mood text not null,
summary text not null,
rationale text not null,
```

O schema **congela a fala do stylist**. `mockLookService.rebuild` faz o contrário:
recompõe o look e recalcula o texto por `copy.ts`, comparando o id para detectar
peça que saiu do armário.

Enquanto o texto é template determinístico, recompor devolve a mesma frase e
ninguém percebe a diferença. **Com MOD-026 o texto passa a vir do Gemini** — e
duas chamadas com a mesma entrada não devolvem a mesma frase. Aí:

- reconstruir um look salvo devolve um texto diferente do que o usuário salvou;
- e o `look.id !== lookId` de `rebuild` deixa de ser um teste confiável.

**Este contrato quebra em MOD-026, antes mesmo da persistência.**

### `Look` mistura dado e fala

```ts
// src/types/look.ts
export type Look = {
  // o que foi escolhido — determinístico, reproduzível
  id: string;
  occasion: Occasion;
  weather: Weather;
  garments: Garment[];

  // o que o stylist disse — vai virar não determinístico e caro
  moment: string;
  mood: string;
  summary: string;
  rationale: string;
};
```

Um tipo, duas naturezas, dois ciclos de vida. A escolha é determinística e
reproduzível; a fala vai virar não determinística e cara. Separá-los é o que
torna possível guardar uma e recalcular a outra — ou o inverso — sem que a
decisão contamine as telas.

### `excludeLookIds` diz mais do que precisa

```ts
// src/services/recommendation/types.ts
excludeLookIds?: string[];
```

O serviço só usa a **assinatura** desses ids (`signatureOf`). O contrato pede os
ids inteiros, e quando isso virar uma chamada de rede vai mandar uma lista
crescente de strings longas — expondo o formato interno do id para o outro lado
da rede sem necessidade.

### O que **não** é frágil

`WardrobeService` e `AuthService` estão bem. São verbos sobre substantivos do
domínio, sem vocabulário de implementação em nenhum dos dois. `AuthService` já
provou que aguenta duas implementações, porque tem duas.

---

## 3. O que provavelmente fica igual até a v1.0

Julgamento, não medição — mas apoiado em quais contratos já sobreviveram a
mudanças.

| Contrato                  | Aposta    | Por quê                                                                  |
| ------------------------- | --------- | ------------------------------------------------------------------------ |
| `AuthService`             | Alta      | já tem duas implementações e não mudou para acomodar a segunda           |
| `WardrobeService`         | Alta      | verbos de domínio; `analyze` já prevê a Edge Function                    |
| `Garment`, `GarmentDraft` | Alta      | mudaram uma vez em oito sprints, para acrescentar `isUniform`            |
| `composeLook`             | Alta      | função pura de entrada→saída; MOD-026 acrescenta camada, não substitui   |
| `Tuning` (3 eixos)        | Média     | aguenta ajuste novo que caiba nos eixos; um "sem estampa" pede um quarto |
| `RecommendationService`   | Média     | o request vai mudar (`excludeLookIds`), o retorno provavelmente não      |
| `Look`                    | **Baixa** | mistura dado e fala; MOD-026 força a separação                           |
| Formato do id do look     | **Baixa** | incompatível com o schema; um dos dois cede                              |
| `LookService`             | **Baixa** | os verbos sobrevivem, mas `getById` muda de significado                  |

---

## 4. O que congelar e o que segue experimental

**Congelável agora** — nada nas integrações que vêm por aí pressiona estas:

- A separação em portas com uma interface por serviço (DEC-002 e vizinhas).
- A recomendação em duas camadas: motor determinístico decide, IA ranqueia e
  escreve. É a defesa arquitetural contra o produto virar "ChatGPT de moda", e
  ela precisa ser inegociável.
- O motor não conversar com rede. `composeLook` é síncrono e puro, e é o que
  garante que a Home entregue look sem conexão.
- Os tokens de tema como fonte única, e a geometria da marca gerando os ativos.
- A régua de formalidade como mecanismo de ajuste (DEC-019, DEC-023).

**Experimental — não construir em cima sem revisitar:**

- O id do look como receita. Ver seção 2.
- `Look` como um tipo só.
- A escala de formalidade 0–4 e os pesos de `ranking.ts`. Funcionam para
  dezesseis peças; ninguém testou com duzentas, e o cálculo sai de palavras no
  nome e no material — com MOD-025 quem preenche esses campos passa a ser a IA.
- Os limiares de 20 °C e 26 °C. São chutes razoáveis sobre um clima fixo em 18
  graus; com MOD-027 eles encontram o mundo real pela primeira vez.
- `queryClient` com `retry: 2`. Nenhum mock falha, então essa política nunca
  rodou de verdade.

---

## 5. O que prende o motor à persistência

**O motor já está solto.** `composeLook` recebe `wardrobe`, `weather`,
`occasion`, `variant` e `adjustments`, e devolve um `Look`. Não importa serviço
nenhum, não é assíncrono, não sabe de onde as peças vieram. Os testes o exercitam
com armários montados à mão.

**Quem está preso é o serviço em volta dele:**

```ts
// src/services/recommendation/mockRecommendationService.ts
import { wardrobeService } from '@/services/wardrobe';
import { weatherService } from '@/services/weather';
```

`mockRecommendationService` **alcança** dois singletons de módulo em vez de
recebê-los. Consequências concretas, não hipotéticas:

1. Testar o serviço exige mexer no armário global. Está escrito no próprio teste:
   _"este bloco cresce o armário em memória e por isso vai por último"_
   (`mockRecommendationService.test.ts`).
2. A implementação Supabase vai repetir o mesmo alcance, e as duas ficarão
   amarradas à mesma escolha de origem de dados.
3. Não dá para recomendar a partir de um armário que não seja **o** armário — o
   que MOD-031 (onboarding) provavelmente vai querer.

**A correção é pequena e vale a pena antes das integrações:** as dependências
entram por parâmetro na criação do serviço, e o `index.ts` — que já é o ponto de
composição — passa as de verdade.

---

## 6. Classificação

Pela regra nova: **nenhuma abstração permanece por antecipação.** Cada uma se
justifica por uso atual, ou por uso planejado e documentado no backlog.

### Essencial

| Abstração                | Justificada por                                   |
| ------------------------ | ------------------------------------------------- |
| `AuthService`            | duas implementações vivas                         |
| `WardrobeService`        | MOD-025, MOD-028, MOD-030                         |
| `RecommendationService`  | MOD-026                                           |
| `LookService`            | MOD-029                                           |
| `WeatherService`         | MOD-027                                           |
| `composeLook` e vizinhos | o produto inteiro                                 |
| `lookId`                 | reconstrução sem banco; um dono só para o formato |
| Camada `components/`     | 20 componentes, todos em uso no produto           |
| Sistema de Motion        | teto de 280 ms verificado em runtime              |
| `theme/`                 | fonte única de tokens e da geometria da marca     |

### Temporária — some ou muda com uma integração nomeada

| Abstração                                                                            | Sai em                                                                        |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `copy.ts`                                                                            | MOD-026                                                                       |
| `mockWardrobeService`, `mockLookService`, `mockRecommendationService`, mock de clima | permanecem como modo de demonstração, mas deixam de ser a única implementação |
| `wardrobeSeed`                                                                       | vira dado de teste quando houver armário real                                 |
| `DEMO_CODE` e o aviso no login                                                       | MOD-013 real, quando o Supabase entrar                                        |

O modo de demonstração **não** é dívida: é o que mantém revisão de UX possível
sem infraestrutura, e o que faz o app rodar numa máquina recém-clonada. Está no
roadmap da v0.6 como coisa que sobrevive.

### Candidata à remoção

Três abstrações existem sem nenhum uso no produto:

| Abstração                   | Situação                                                                                                 |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| `components/Modal.tsx`      | exportado no barril, **usado por ninguém**. O `<Modal>` que aparece em `BottomSheet` é o do React Native |
| `components/Badge.tsx`      | usado **só na galeria**. Nenhuma tela de produto o mostra                                                |
| `components/EmScaffold.tsx` | não é nem exportado pelo barril. O comentário dele já previa: _"se ele sobreviver ao MVP, virou dívida"_ |

`Badge` é o caso interessante: ele foi feito para contadores e selos — e o
PILAR-05 diz que a interface não tem badge nem contador. Ele nasceu contrariando
um princípio, e a galeria manteve a aparência de que ele serve para alguma coisa.

---

## 7. O que fazer, em ordem

Cada linha vira um item no backlog e uma PR própria.

| Ordem | Item    | O quê                                                                   | Antes de    |
| ----- | ------- | ----------------------------------------------------------------------- | ----------- |
| 1     | MOD-038 | Resolver o conflito de identidade de peça e de look                     | MOD-028/029 |
| 2     | MOD-039 | Separar `Look` em escolha e fala                                        | MOD-026     |
| 3     | MOD-040 | Injetar armário e clima no serviço de recomendação                      | MOD-026/027 |
| 4     | MOD-041 | Remover `Modal`, `Badge` e `EmScaffold`                                 | —           |
| 5     | MOD-042 | Telas param de importar serviço direto (`LooksScreen`, `ProfileScreen`) | —           |

**O que ficou de fora de propósito:** `excludeLookIds` some junto com MOD-038 ou
MOD-039 — é sintoma dos dois, não item. E os `index.ts` que prometem troca sem
tê-la só precisam de comentário honesto, o que cabe em qualquer uma das PRs
acima.

**MOD-041 e MOD-042 são baratos e independentes.** Podem entrar em paralelo com
os três primeiros, que são os que de fato desbloqueiam as integrações.
