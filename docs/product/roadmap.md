# Roadmap

Versões, não datas. Uma versão fecha quando seus critérios estão cumpridos —
não quando o calendário vira.

Cada versão tem uma **milestone no GitHub** de mesmo nome. Todo PR aponta para a
milestone da versão que ajuda a fechar: é ela que responde "quanto falta para
esta sair" — pergunta que o backlog não responde bem.

| Versão | Tema         | Milestone | Estado          |
| ------ | ------------ | --------- | --------------- |
| v0.1   | Fundação     | —         | ✅ Fechada      |
| v0.2   | Armário      | `v0.2`    | ✅ Fechada      |
| v0.3   | Fundação II  | `v0.3`    | 🔄 Em andamento |
| v0.4   | Captura e IA | `v0.4`    | ◻︎               |
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

## v0.2 — Armário ✅

**Tese.** O produto ter dados de verdade e uma lógica confiável em cima deles.

MOD-010 · MOD-012 · MOD-018 · MOD-019 · MOD-020 · MOD-021

**Fechada com**

| Item    | O que o usuário percebe                   |
| ------- | ----------------------------------------- |
| MOD-018 | "Ajustar" passou a fazer o que promete    |
| MOD-021 | o app deixou de ter ícone de template     |
| MOD-019 | a recomendação parou de errar em silêncio |
| MOD-020 | _(risco)_ nenhuma entrega quebra `main`   |

**MOD-022 e MOD-023 saíram para depois.** Acrescentam valor e não desbloqueiam
nada. A revisão arquitetural reduz risco antes das integrações, e essa é a troca
certa.

**MOD-021 passou na frente de MOD-019** porque MOD-018 já tinha trazido o runner
e a cobertura dos ajustes. **A CI foi por último** porque é o único item sem
valor perceptível — e vindo depois dos testes, nasceu sabendo o que verificar.

---

## v0.3 — Fundação II 🔄

**Tese.** A arquitetura aguentar os serviços reais antes de eles chegarem.

MOD-037 · MOD-038 · MOD-039 · MOD-040 · MOD-041 · MOD-042

**É uma pausa declarada.** O produto não anda nesta versão, e é para não andar.
Seis itens sem valor perceptível seguidos rompem o limite da regra do valor, de
propósito: o custo de mudar um contrato agora é um PR, e depois das integrações
cresce com o número de coisas que dependem dele.

**Fecha quando**

- ~~A revisão arquitetural estiver escrita, e o que ela achar, no backlog com
  prioridade~~ — MOD-037
- O conflito de identidade de peça e de look estiver resolvido
- A escolha e a fala do look forem coisas separadas
- O serviço de recomendação receber armário e clima em vez de alcançá-los
- Nenhuma abstração sem uso continuar exportada

---

## A ordem depois da v0.3

Definida junto com a revisão, e ela **inverte** o que as versões abaixo diziam:

1. **Supabase real** — MOD-028, MOD-029, MOD-030
2. **Gemini** — MOD-025, MOD-026
3. **Clima real** — MOD-027
4. **Imagens** — MOD-024, MOD-036
5. **Experiência** — MOD-022, MOD-023, e o resto

O motivo é o achado principal da revisão: o conflito de identidade só se resolve
de verdade quando existe um banco do outro lado. Adiar a persistência para depois
da IA deixaria MOD-038 verificado só no papel.

> ⚠️ **As versões v0.4 a v0.6 abaixo ainda descrevem a ordem antiga** — IA antes
> de backend. Renumerá-las é decisão de produto, não de engenharia, e não fiz por
> conta própria. A ordem que vale é a desta seção.

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
