# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
Versionamento por marcos do [roadmap](./roadmap.md), não semântico — o produto
ainda não tem API pública.

Toda feature mesclada atualiza este arquivo no mesmo PR.

---

## [Não lançado]

### Adicionado

- Documentação de projeto em `/docs`: backlog, roadmap, arquitetura, produto,
  decision log, design system, API, banco e este changelog.
- Branch `main` como linha estável, criada a partir de `ba57ae4`.

### Descoberto

- **MOD-018** — "Ajustar" não altera a recomendação. `adjustments` é declarado e
  passado, mas nem o serviço nem o motor o leem. O look às vezes muda por
  coincidência de variante. Registrado como P0.

---

## [v0.1] — 2026-08-06 · Fundação

Primeira versão navegável do produto, com dados de demonstração.

### Adicionado

**Fundação**

- Expo SDK 57, React Native 0.86, TypeScript estrito, Expo Router com rotas em
  `src/app`.
- Design tokens em `src/theme` como fonte única; `tailwind.config.ts` apenas os
  expõe.

**Design system**

- 18 componentes, todos com Default, Pressed, Disabled e Loading.
- Sistema de Motion centralizado, com teto de 280 ms verificado em runtime.
- Família própria de ícones de vestuário no grid do logo FRAME.
- Galeria em `/galeria` como superfície de revisão.

**Telas**

- Login sem senha, com e-mail, Google e Apple.
- Home com uma recomendação, explicação e três ações.
- Detalhe do look com a nota completa do stylist.
- Armário em duas colunas, com filtro e busca.
- Adicionar peça: fotografar, deixar ler, confirmar.
- Looks salvos e Perfil.

**Lógica**

- Motor determinístico de recomendação: ocasião, estação, clima e regra de
  uniforme.
- Ciclo completo verificado: adicionar peça altera a recomendação da Home.

**Backend**

- Schema, RLS e seed do Supabase.
- Edge Function `analyze-garment` escrita (integração pendente, MOD-025).

### Decisões

DEC-001 a DEC-012 — ver [decision log](./decisions.md).

### Notas

- Sem chaves do Supabase, o app roda em **modo de demonstração**: dados em
  memória, código de login `000000`.
- Fonte de display é Instrument Serif; a do guia de marca é comercial (DEC-001).
- Ícone e splash ainda são os do template Expo (MOD-021).
- Sem testes automatizados (MOD-019) e sem CI (MOD-020).
