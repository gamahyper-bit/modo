# Roadmap

Versões, não datas. Uma versão fecha quando seus critérios estão cumpridos —
não quando o calendário vira.

Cada versão tem uma **milestone no GitHub** de mesmo nome. Todo PR aponta para a
milestone da versão que ajuda a fechar: é ela que responde "quanto falta para
esta sair" — pergunta que o backlog não responde bem.

| Versão | Tema         | Milestone | Estado          |
| ------ | ------------ | --------- | --------------- |
| v0.1   | Fundação     | —         | ✅ Fechada      |
| v0.2   | Armário      | `v0.2`    | 🔄 Em andamento |
| v0.3   | Captura      | `v0.3`    | ◻︎               |
| v0.4   | IA           | `v0.4`    | ◻︎               |
| v0.5   | Looks        | `v0.5`    | ◻︎               |
| v0.6   | Backend      | `v0.6`    | ◻︎               |
| v0.7   | Beta fechado | `v0.7`    | ◻︎               |
| v1.0   | Lançamento   | `v1.0`    | ◻︎               |

Os [epics](./epics.md) cortam as versões na perpendicular: versão é fatia de
tempo, epic é eixo de valor.

---

## v0.1 — Fundação ✅

**Tese.** O produto existir como objeto antes de existir como funcionalidade.

MOD-001 · MOD-002 · MOD-003 · MOD-004 · MOD-005 · MOD-006 · MOD-007 · MOD-008 ·
MOD-009 · MOD-013

**Fechada com:** design system completo, identidade aplicada, Home entregando
uma recomendação, detalhe do look e autenticação com modo de demonstração.

---

## v0.2 — Armário 🔄

**Tese.** O produto ter dados de verdade e uma lógica confiável em cima deles.

MOD-010 ✅ · MOD-012 ✅ · MOD-022 · MOD-023

**Sprint em execução, nesta ordem**

| #   | Branch                         | Item    | O que o usuário percebe                  |
| --- | ------------------------------ | ------- | ---------------------------------------- |
| 1   | `fix/look-adjustments`         | MOD-018 | "Ajustar" passa a fazer o que promete    |
| 2   | `feature/brand-assets`         | MOD-021 | o app deixa de ter ícone de template     |
| 3   | `feature/recommendation-tests` | MOD-019 | a recomendação para de errar em silêncio |
| 4   | `feature/ci`                   | MOD-020 | _(risco)_ nenhuma entrega quebra `main`  |

**Fecha quando**

- ~~"Ajustar" alterar de fato a recomendação~~ — MOD-018
- ~~O app tiver ícone próprio~~ — MOD-021
- ~~O motor tiver cobertura de teste~~ — MOD-019
- ~~A CI verificar a definição de pronto por máquina~~ — MOD-020
- Tocar numa peça levar ao detalhe dela

**MOD-021 passou na frente de MOD-019.** MOD-018 trouxe o runner e a cobertura
dos ajustes junto, então MOD-019 encolheu para o que sobrou e deixou de ser o
próximo passo natural. Entre um item de produto pronto para entregar e um de
cobertura reduzida, a regra do valor manda o produto na frente.

**Por que a CI continua por último.** Ela é o único item da sprint sem valor
perceptível. Vindo depois dos testes, ela também nasce sabendo o que precisa
verificar — instalar CI antes de os testes existirem seria instalar metade dela
duas vezes.

---

## v0.3 — Captura ◻︎

**Tese.** A foto virar peça catalogada sem trabalho do usuário.

MOD-011 ✅ · MOD-037 · MOD-024 · MOD-036

**Abre com uma pausa.** MOD-037 é uma revisão arquitetural, e vem **antes** de
qualquer integração pesada — Supabase real, Gemini, clima, imagens,
sincronização. É a última janela em que mexer num contrato custa um PR: com duas
implementações por porta, cada suposição escondida vira comportamento diferente
entre demonstração e produção, e a diferença aparece no aparelho de um testador.

**Fecha quando**

- A revisão arquitetural estiver escrita, e o que ela achar, resolvido ou no
  backlog com prioridade
- O fundo for removido de verdade
- Uma peça fotografada em casa aparecer recortada no armário
- "Está frio" trocar por uma peça mais quente, e não só acrescentar uma
- Falha de recorte degradar para a foto original, sem bloquear o cadastro

---

## v0.4 — IA ◻︎

**Tese.** A promessa do produto — um stylist, não um gerador.

MOD-017 ✅ · MOD-025 · MOD-026 · MOD-027

**Fecha quando**

- Os atributos vierem do Gemini, não de um mock
- O texto do look for escrito pela IA sobre candidatos válidos
- O clima real influenciar a recomendação
- Sem rede, o app continuar entregando look e explicação locais

**Risco principal.** É aqui que o produto pode passar a parecer "ChatGPT de
moda". A defesa é arquitetural e já está de pé: a IA nunca escolhe sozinha, ela
ranqueia o que o motor determinístico validou.

---

## v0.5 — Looks ◻︎

**Tese.** A relação com o produto durar mais que um dia.

MOD-014 ✅ · MOD-015 ✅ · MOD-031 · MOD-032

**Fecha quando**

- O onboarding descobrir estilo sem formulário
- As preferências influenciarem a recomendação
- O perfil permitir revisá-las

---

## v0.6 — Backend ◻︎

**Tese.** Os dados sobreviverem ao fechar do app.

MOD-016 ✅ · MOD-028 · MOD-029 · MOD-030

**Fecha quando**

- Armário, looks e fotos persistirem no Supabase
- RLS verificada com dois usuários reais
- O modo de demonstração continuar funcionando sem chaves

**Nota.** O modo de demonstração não morre nesta versão. Ele é o que mantém
revisão de UX possível sem infraestrutura, e o que faz o app rodar em qualquer
máquina recém-clonada.

---

## v0.7 — Beta fechado ◻︎

MOD-033 · MOD-034 · MOD-035

**Fecha quando**

- Build de desenvolvimento rodando em aparelho, com Apple e Google reais
- Acessibilidade auditada
- Testadores externos usando com relato de erro dentro do app

---

## v1.0 — Lançamento ◻︎

**Fecha quando**

- Nenhum P0 aberto
- Onboarding, captura, recomendação e coleção completos
- Fontes licenciadas ou substituídas em definitivo
- Política de privacidade e fichas das lojas publicadas
- Custo por usuário do Gemini medido e previsível

**Fora de escopo do v1.0.** Compartilhamento social, comércio, múltiplos
armários e recomendação para outra pessoa. São produtos diferentes.
