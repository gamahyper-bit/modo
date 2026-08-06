# Arquitetura

## Camadas

```
app/          rotas — finas, só ligam rota a tela
  ↓
features/     telas e a lógica delas
  ↓
components/   design system — sem regra de negócio
services/     portas para o mundo externo
  ↓
theme/ types/ utils/ lib/
```

**Regra de dependência.** `features/*` consome `components`, `services`,
`hooks`, `lib`, `theme`, `types` e `utils` — **nunca** outra feature. O ESLint
bloqueia importações que furam o índice público de uma feature:

```js
group: ['@/features/*/*'],
```

Quando duas features precisam da mesma coisa, ela sobe: `LookBackdrop` nasceu em
`features/home` e mudou para `components` quando o detalhe do look passou a
usá-lo. Na subida ficou agnóstico de domínio — recebe ícones, não peças, e a
tradução virou `utils/backdropItems`.

## Serviços: uma porta, duas implementações

Todo acesso ao mundo externo passa por uma interface. O `index.ts` de cada pasta
é o **único ponto de troca**:

```
services/wardrobe/
  types.ts                  ← a porta
  mockWardrobeService.ts    ← demonstração
  supabaseWardrobeService.ts ← real (MOD-028)
  index.ts                  ← escolhe
```

```ts
export const wardrobeService: WardrobeService = hasBackend
  ? supabaseWardrobeService
  : mockWardrobeService;
```

Nenhuma tela sabe qual implementação está ativa. Trocar mock por backend é uma
linha, por serviço.

**Portas existentes**

| Porta                   | Demonstração            | Real        |
| ----------------------- | ----------------------- | ----------- |
| `AuthService`           | memória                 | ✅ Supabase |
| `WardrobeService`       | memória                 | MOD-028     |
| `RecommendationService` | motor local + templates | MOD-026     |
| `LookService`           | memória                 | MOD-029     |
| `WeatherService`        | valor fixo              | MOD-027     |

## Recomendação

Duas camadas (DEC-002):

```
armário  →  motor determinístico  →  candidatos válidos  →  IA  →  look
            (TypeScript, local)                          (Edge Function)
```

**Camada 1 — `services/recommendation/composer.ts`**

Filtra por ocasião, estação e clima; aplica a regra de uniforme; escolhe parte
de cima, parte de baixo, calçado e, conforme o clima, casaco e acessório.

- casaco abaixo de 20 °C; bermuda acima de 26 °C
- camisa antes de camiseta em trabalho, noite e encontro; o inverso no casual e
  na viagem
- uniforme fora de look casual e no fim da fila no trabalho (DEC-011)
- sem uma das três peças estruturais, não recomenda

**Camada 2 — hoje `copy.ts`, amanhã Edge Function**

Escreve `moment`, `mood`, `summary` e `rationale`. Quando MOD-026 entrar, este
arquivo desaparece.

**Identidade do look.** `l-<ocasião>-<variante>-<peças>` (DEC-008). O motor é
determinístico, então o mesmo id recompõe o mesmo look — sem banco.

## Motion

Tudo em `src/components/motion`. Nenhum componente escreve `withTiming`.

| Hook                                       | Para quê                                      |
| ------------------------------------------ | --------------------------------------------- |
| `usePressMotion`                           | resposta de toque, igual em todo pressionável |
| `useReveal` / `Reveal`                     | entrada padrão                                |
| `Stagger`                                  | sequência em listas curtas                    |
| `useTransition`                            | progresso 0↔1 para modal e bottom sheet       |
| `useSpin` / `usePulse`                     | loops                                         |
| `pieceLayout` / `pieceEnter` / `pieceExit` | reorganização de peças                        |

Teto de 280 ms verificado em runtime (DEC-005). Loops ficam de fora.

**Reorganização de peças.** A chave precisa ser o id da peça. Com índice, o
Reanimated entende que o item continua o mesmo e nada desliza.

## Estado

React Query para tudo que vem de serviço. Nada de store global.

**Invalidações que importam**

| Ação           | Invalida                              | Por quê                           |
| -------------- | ------------------------------------- | --------------------------------- |
| Adicionar peça | `wardrobe`, `recommendation`          | a recomendação nasce do armário   |
| Salvar look    | `looks`                               | a aba Looks lista o que foi salvo |
| Remover peça   | `wardrobe`, `recommendation`, `looks` | MOD-023                           |

**Estado de sessão fica no hook, não no serviço.** O histórico de looks já
vistos, que faz "Gerar outro" não repetir, vive em `useRecommendation` — é
estado do usuário naquela sessão, não conhecimento do backend.

## Segredos

Variáveis `EXPO_PUBLIC_*` vão para o bundle e são extraíveis. Chave do Gemini e
service role do Supabase ficam como secrets das Edge Functions (DEC-003).

`lib/env.ts` **não** lança erro quando falta configuração: ausência de chave é o
modo de demonstração (DEC-009).

## Navegação

Expo Router, rotas em `src/app` (auto-detectado pelo SDK 57).

```
_layout.tsx        providers + guarda de sessão
login.tsx
galeria.tsx        superfície de revisão
(tabs)/
  _layout.tsx      barra própria, não a do React Navigation
  index.tsx        Home
  armario.tsx
  looks.tsx
  perfil.tsx
look/[id].tsx
peca/nova.tsx
```

A guarda redireciona em efeito, não com `<Redirect>`: avaliado no corpo do
layout, ele brigaria com a navegação em curso e piscaria o login durante a
leitura da sessão guardada.

O vocabulário do produto e o do roteador são traduzidos em `(tabs)/_layout.tsx`
— a Home é `index` para o roteador e `home` para o design system.

## Verificação

Sem simulador iOS em Linux, a revisão visual usa React Native Web:

```bash
npx expo export --platform web
# servir o export e dirigir com Playwright em 390×844
```

Fiel em layout, tipografia, cor e espaçamento. Aproxima sombras nativas e safe
areas. Não substitui teste em aparelho — que chega com MOD-033.
