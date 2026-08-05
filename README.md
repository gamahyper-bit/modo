# Modo

Personal stylist digital. O Modo transforma o guarda-roupa em recomendações de
look — a IA trabalha nos bastidores, o usuário apenas confirma.

> O Modo revela a melhor escolha.

## Stack

React Native · Expo SDK 57 · TypeScript · Expo Router · NativeWind ·
Supabase (Auth / Storage / Database) · Gemini via Edge Functions ·
React Query · React Hook Form + Zod · Reanimated · Lucide

## Rodando

```bash
npm install
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

`npm run web` sobe uma versão web útil para conferir layout e tokens
rapidamente, sem simulador.

## Arquitetura

```
src/
  app/          rotas (Expo Router — o SDK 57 detecta src/app automaticamente)
  components/   design system, sem regra de negócio
  features/     auth, onboarding, wardrobe, look, profile — independentes
  services/     supabase, storage, IA, clima
  hooks/        hooks compartilhados
  lib/          clientes e configuração
  theme/        design tokens
  types/        tipos de domínio
  utils/        funções puras
supabase/
  migrations/   schema e policies
  functions/    Edge Functions (única camada que fala com o Gemini)
```

Regra de dependência: `features/*` consome `components`, `services`, `hooks`,
`lib` e `theme` — **nunca** outra feature. O ESLint bloqueia importações que
furam o índice público de uma feature.

### Como a recomendação funciona

A escolha do look **não** é uma chamada de LLM. São duas camadas:

1. **Motor determinístico** (TypeScript, no dispositivo) — filtra o armário por
   ocasião, estação, clima e regra de uniforme, e monta candidatos válidos.
2. **Gemini** (Edge Function) — recebe candidatos já válidos, ranqueia e escreve
   a explicação.

Isso mantém a latência baixa, o custo previsível, e garante que o app sempre
entregue um look mesmo sem rede.

### Segredos

Nada sensível vive no app. Variáveis `EXPO_PUBLIC_*` vão para o bundle e são
extraíveis — a chave do Gemini e a service role do Supabase ficam como secrets
das Edge Functions.

## Design system

Tokens em `src/theme` são a fonte única de verdade; o `tailwind.config.ts` só os
expõe como classes. Nenhum valor solto na interface.

Paleta FRAME: `#0D0D0D` · `#1A1A1A` · `#6B6B6B` · `#E7E2DA` · `#F7F5F2`.

**Tipografia:** o guia de marca especifica _PP Editorial New_ no display, uma
fonte comercial da Pangram Pangram que não pode ser embarcada sem licença paga.
O display usa **Instrument Serif** (SIL OFL) até a licença ser adquirida —
a troca é uma linha em `src/theme/typography.ts`.

## Scripts

| Script              | O que faz                                 |
| ------------------- | ----------------------------------------- |
| `npm start`         | Metro + Expo dev server                   |
| `npm run web`       | app no navegador                          |
| `npm run prebuild`  | gera `ios/` e `android/` para o dev build |
| `npm run typecheck` | `tsc --noEmit`                            |
| `npm run lint`      | ESLint, zero warnings                     |
| `npm run format`    | Prettier                                  |
