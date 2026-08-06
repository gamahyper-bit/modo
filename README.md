# Modo

Personal stylist digital. O Modo transforma o guarda-roupa em recomendações de
look — a IA trabalha nos bastidores, o usuário apenas confirma.

> O Modo revela a melhor escolha.

## Estado atual

O ciclo principal do produto funciona ponta a ponta, com dados de demonstração:

```
Login → Home (uma recomendação) → Detalhe do look
                ↑                        ↓
          Home atualizada            Salvar → Looks
                ↑
Armário → Adicionar peça → IA lê → Você confirma → Armário
```

| Feito                                            | Falta                        |
| ------------------------------------------------ | ---------------------------- |
| Design system (17 componentes, 4 estados cada)   | Onboarding de estilo         |
| Família de ícones de vestuário própria           | Backend ligado de verdade    |
| Home + HeroCard                                  | Remoção de fundo             |
| Detalhe do look                                  | Clima real (`expo-location`) |
| Armário + captura + confirmação                  | Detalhe da peça              |
| Motor de recomendação determinístico             | Testes automatizados         |
| Auth (e-mail, Google, Apple) + modo demonstração | Ícone e splash da marca      |
| Schema, RLS e Edge Function do Supabase          |                              |

## Rodando

```bash
npm install
npm run web        # confere layout e tokens rapidamente, sem simulador
```

Sem `.env.local`, o app roda em **modo de demonstração**: armário, looks e
sessão vivem em memória e somem ao recarregar. No login, qualquer e-mail serve
e o código é `000000` — a própria tela informa.

Com backend:

```bash
cp .env.example .env.local     # preencha as chaves do Supabase
npm start
```

O app precisa de um **development build** (não roda completo no Expo Go) porque
usa Sign in with Apple e o módulo de câmera:

```bash
npm run prebuild
npm run ios        # requer macOS
npm run android
```

## Arquitetura

```
src/
  app/          rotas (Expo Router — o SDK 57 detecta src/app automaticamente)
  components/   design system, sem regra de negócio
  features/     auth, home, look, looks, wardrobe, profile — independentes
  services/     auth, wardrobe, recommendation, looks, weather
  hooks/        hooks compartilhados
  lib/          env, cliente Supabase, query client
  theme/        design tokens
  types/        tipos de domínio
  utils/        funções puras
supabase/
  migrations/   schema e policies
  functions/    Edge Functions — a única camada que fala com o Gemini
  seed.sql      armário de demonstração
```

Regra de dependência: `features/*` consome `components`, `services`, `hooks`,
`lib` e `theme` — **nunca** outra feature. O ESLint bloqueia importações que
furam o índice público de uma feature.

### Serviços: uma porta, duas implementações

Cada serviço é uma interface com uma implementação de demonstração e (quando
existe) uma real. O `index.ts` de cada pasta é o **único ponto de troca**:

```ts
export const wardrobeService: WardrobeService = mockWardrobeService;
```

A escolha entre demonstração e Supabase é feita por `hasBackend`, que só olha se
as chaves existem no ambiente. Nenhuma tela sabe qual implementação está ativa.

### Como a recomendação funciona

A escolha do look **não** é uma chamada de LLM. São duas camadas:

1. **Motor determinístico** (`services/recommendation/composer.ts`) — filtra o
   armário por ocasião, estação, clima e regra de uniforme, e monta o conjunto.
   Camisa antes de camiseta no trabalho; casaco só abaixo de 20 °C; bermuda só
   acima de 26 °C; sem uma das três peças estruturais, não recomenda.
2. **Gemini** (Edge Function) — receberá candidatos já válidos e fará só o que
   LLM faz bem: ranquear e escrever. Hoje o texto vem de `copy.ts`, que
   desaparece quando essa camada entrar.

Isso mantém a latência baixa, o custo previsível, e garante que a Home sempre
entregue um look — mesmo sem rede.

O id do look carrega ocasião, variante e peças (`l-trabalho-0-g1.g6.g9`), então
o detalhe reconstrói exatamente o mesmo look sem banco nenhum.

### Regra de uniforme

Peça marcada como uniforme **nunca** entra em look que não seja de trabalho. E
mesmo no trabalho ela vai para o fim da fila: uniforme se veste como conjunto, e
a calça do uniforme com uma camisa comum não é um look, é um acidente.

### Segredos

Nada sensível vive no app. Variáveis `EXPO_PUBLIC_*` vão para o bundle e são
extraíveis — a chave do Gemini e a service role do Supabase ficam como secrets
das Edge Functions:

```bash
supabase secrets set GEMINI_API_KEY=...
```

## Design system

Tokens em `src/theme` são a fonte única de verdade; o `tailwind.config.ts` só os
expõe como classes. Nenhum valor solto na interface.

Componentes usam `StyleSheet` alimentado pelos tokens, não NativeWind: estilo
animado já precisa ser objeto, e classe em string troca erro de compilação por
erro silencioso em runtime. Classes utilitárias ficam para layout de tela.

Paleta FRAME: `#0D0D0D` · `#1A1A1A` · `#6B6B6B` · `#E7E2DA` · `#F7F5F2`, mais a
assinatura sálvia `#5E6B57`, restrita a foco, seleção, confirmação e carga.

**Motion.** Toda animação nasce em `src/components/motion` — nenhum componente
escreve `withTiming` por conta própria. Teto de **280 ms** para qualquer
transição, verificado em runtime: uma duração acima disso derruba o app em
desenvolvimento. Loops (indicador de carga, skeleton) ficam de fora por não
serem transições.

**Tipografia.** O guia de marca especifica _PP Editorial New_ no display, uma
fonte comercial da Pangram Pangram que não pode ser embarcada sem licença paga.
O display usa **Instrument Serif** (SIL OFL) até a licença ser adquirida — a
troca é uma linha em `src/theme/typography.ts`.

**Ícones.** Interface vem do Lucide; vestuário é desenho próprio, no grid 24×24
do logo FRAME (`src/components/icons`). O Lucide não tem calça, casaco nem
cabide, e aproximar destruiria a leitura das categorias do armário.

## Galeria

A rota `/galeria` mostra todos os componentes em todos os estados. É dela que
saem os prints de revisão de UX.

## Banco de dados

```bash
supabase start
supabase db reset      # aplica migrations e roda o seed
```

`supabase/seed.sql` espelha `src/services/wardrobe/seed.ts`, para que o app com
backend comece exatamente como o modo de demonstração.

RLS está ligada em **todas** as tabelas antes de qualquer política, para que um
esquecimento resulte em "ninguém vê nada" e não no contrário.

## Scripts

| Script              | O que faz                                 |
| ------------------- | ----------------------------------------- |
| `npm start`         | Metro + Expo dev server                   |
| `npm run web`       | app no navegador                          |
| `npm run prebuild`  | gera `ios/` e `android/` para o dev build |
| `npm run typecheck` | `tsc --noEmit`                            |
| `npm run lint`      | ESLint, zero warnings                     |
| `npm run format`    | Prettier                                  |
