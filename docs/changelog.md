# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
Versionamento por marcos do [roadmap](./product/roadmap.md), não semântico — o
produto ainda não tem API pública.

Toda feature mesclada atualiza este arquivo no mesmo PR.

---

## [Não lançado]

### Adicionado — marca e jornadas

- `docs/brand/` — manifesto, tom de voz, linguagem visual e diretrizes de copy.
  O tom de voz saiu de `product.md` e ganhou tratamento completo, com regras por
  elemento de interface e um checklist antes de subir texto.
- `docs/product/journeys.md` — cinco jornadas com estado declarado. Nenhuma está
  utilizável; todas param no mesmo lugar, os dados somem ao recarregar.
- **Quatro pilares** em `vision.md`, acima dos cinco princípios. Cada um carrega
  o lado rejeitado — é ele que transforma o pilar em régua e não em slogan.
- Campo **Impacto (1–5)** e campo **Jornada** em todos os 35 itens do backlog.
- Pergunta obrigatória no template de PR: _qual hipótese de produto esta entrega
  valida?_ — com exigência de declarar o que a **refutaria**.

### Alterado

- DoR ganhou três critérios: jornada servida, impacto atribuído e hipótese
  declarada.
- Planejamento passa a ser descrito por jornada, não por tela.

### Decisões

- **DEC-015** — quatro pilares acima dos princípios.
- **DEC-016** — planejamento orientado por jornadas.
- **DEC-017** — impacto separado de prioridade.

### Adicionado — organização

- `docs/vision.md` — os cinco princípios permanentes, os compromissos que valem
  independentemente de prazo, e os sinais de que o produto perdeu o rumo.
- `docs/product/epics.md` — sete eixos de valor, cobrindo os 35 itens do
  backlog.
- `docs/engineering/process.md` — git flow, Definition of Ready, Definition of
  Done, estimativas e milestones.
- Milestones por versão no roadmap (`v0.2` a `v1.0`).
- Índice da documentação em `docs/README.md`.

### Alterado

- Documentação separada entre `docs/product/` (o quê e por quê) e
  `docs/engineering/` (como). Visão, decisões e changelog ficam na raiz por
  atravessarem os dois (DEC-014).
- Backlog reorganizado por epic, com campo de valor em cada item.
- Sprint v0.2 reordenada: MOD-018, MOD-019, MOD-021, MOD-020. O ícone da marca
  subiu à frente da CI por entregar valor perceptível (DEC-013).

### Decisões

- **DEC-013** — todo PR entrega valor perceptível; item de risco puro precisa
  declarar qual falha impede, e é limitado a um por sprint.
- **DEC-014** — documentação separada entre produto e engenharia.

### Anterior

- Documentação de projeto inicial em `/docs`.
- Branch `main` como linha estável, criada a partir de `ba57ae4`.
- **MOD-018 descoberto** — "Ajustar" não altera a recomendação. `adjustments` é
  declarado e passado, mas nem o serviço nem o motor o leem. Registrado como P0.

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
