# Backlog

Fonte única de verdade das entregas do Modo. Nada entra em desenvolvimento sem
estar aqui primeiro.

**Convenções**

- **Status** — `Backlog` · `Ready` · `In Progress` · `In Review` · `Done` ·
  `Blocked`
- **Prioridade** — `P0` (bloqueia o produto) · `P1` (essencial ao MVP) ·
  `P2` (importante) · `P3` (desejável)
- **Estimativa** — `P` pequeno (até meio dia) · `M` médio (1–2 dias) ·
  `G` grande (3+ dias). Item `G` deve ser quebrado antes de virar branch.
- **Definição de pronto** — código, typecheck, lint, build, screenshot,
  documentação e changelog. Sem os sete, não é `Done`.

| ID      | Nome                              | Status  | Prio | Est. | Versão |
| ------- | --------------------------------- | ------- | ---- | ---- | ------ |
| MOD-001 | Fundação do projeto               | Done    | P0   | M    | v0.1   |
| MOD-002 | Design tokens                     | Done    | P0   | M    | v0.1   |
| MOD-003 | Sistema de Motion                 | Done    | P1   | M    | v0.1   |
| MOD-004 | Iconografia própria               | Done    | P1   | M    | v0.1   |
| MOD-005 | Componentes do design system      | Done    | P0   | G    | v0.1   |
| MOD-006 | Galeria de componentes            | Done    | P2   | P    | v0.1   |
| MOD-007 | Home e HeroCard                   | Done    | P0   | G    | v0.1   |
| MOD-008 | Camada de recomendação            | Done    | P0   | M    | v0.1   |
| MOD-009 | Detalhe do look                   | Done    | P1   | M    | v0.1   |
| MOD-010 | Armário                           | Done    | P0   | M    | v0.2   |
| MOD-011 | Adicionar peça                    | Done    | P0   | G    | v0.3   |
| MOD-012 | Motor determinístico              | Done    | P0   | M    | v0.2   |
| MOD-013 | Autenticação                      | Done    | P0   | G    | v0.1   |
| MOD-014 | Perfil                            | Done    | P2   | P    | v0.5   |
| MOD-015 | Aba Looks                         | Done    | P1   | P    | v0.5   |
| MOD-016 | Schema e RLS                      | Done    | P0   | M    | v0.6   |
| MOD-017 | Edge Function de leitura          | Done    | P0   | M    | v0.4   |
| MOD-018 | Ajustar não altera a recomendação | Ready   | P0   | P    | v0.2   |
| MOD-019 | Testes do motor                   | Ready   | P0   | M    | v0.2   |
| MOD-020 | Integração contínua               | Ready   | P1   | P    | v0.2   |
| MOD-021 | Ícone e splash da marca           | Ready   | P1   | P    | v0.2   |
| MOD-022 | Detalhe da peça                   | Backlog | P1   | M    | v0.2   |
| MOD-023 | Editar e remover peça             | Backlog | P1   | M    | v0.2   |
| MOD-024 | Remoção de fundo                  | Backlog | P0   | M    | v0.3   |
| MOD-025 | Integrar leitura da peça          | Backlog | P0   | M    | v0.4   |
| MOD-026 | Ranqueamento e texto por IA       | Backlog | P0   | G    | v0.4   |
| MOD-027 | Clima real                        | Backlog | P1   | M    | v0.4   |
| MOD-028 | Persistência do armário           | Backlog | P0   | M    | v0.6   |
| MOD-029 | Persistência dos looks            | Backlog | P0   | M    | v0.6   |
| MOD-030 | Upload de fotos                   | Backlog | P0   | M    | v0.6   |
| MOD-031 | Onboarding de estilo              | Backlog | P1   | G    | v0.5   |
| MOD-032 | Preferências no perfil            | Backlog | P2   | M    | v0.5   |
| MOD-033 | Development build                 | Backlog | P0   | M    | v0.7   |
| MOD-034 | Auditoria de acessibilidade       | Backlog | P1   | M    | v0.7   |
| MOD-035 | Beta fechado                      | Backlog | P1   | M    | v0.7   |

---

## Entregue

### MOD-001 — Fundação do projeto

**Objetivo.** Ter um projeto que compila, tipa e lint-a antes de existir
qualquer tela.

**Descrição.** Expo SDK 57, React Native 0.86, TypeScript estrito, Expo Router
com rotas em `src/app`, NativeWind alimentado pelos tokens, ESLint com regra de
fronteira entre features.

**Dependências.** —
**Prioridade.** P0 · **Estimativa.** M · **Status.** Done

**Critérios de aceite**

- [x] `tsc --noEmit` limpo com `strict` e `noUncheckedIndexedAccess`
- [x] `eslint --max-warnings 0` limpo
- [x] `expo export` gera bundle
- [x] Tokens conferidos no CSS compilado
- [x] Splash segurada até a tipografia carregar

---

### MOD-002 — Design tokens

**Objetivo.** Nenhum valor solto na interface.

**Descrição.** Cores, tipografia, spacing, radius, shadow, motion e ícones em
`src/theme`, expostos ao Tailwind sem duplicação.

**Dependências.** MOD-001
**Prioridade.** P0 · **Estimativa.** M · **Status.** Done

**Critérios de aceite**

- [x] Paleta FRAME e assinatura sálvia
- [x] Escala tipográfica com oito degraus
- [x] `tailwind.config.ts` importa de `src/theme`, não redefine
- [x] Componente `Text` aplica a escala inteira por variante

---

### MOD-003 — Sistema de Motion

**Objetivo.** Um único ritmo em todo o produto.

**Descrição.** `usePressMotion`, `useReveal`, `Stagger`, `useTransition`,
transições de layout e loops, centralizados em `src/components/motion`.

**Dependências.** MOD-002
**Prioridade.** P1 · **Estimativa.** M · **Status.** Done

**Critérios de aceite**

- [x] Nenhum componente escreve `withTiming` por conta própria
- [x] Teto de 280 ms verificado em runtime no `__DEV__`
- [x] Respeita "reduzir movimento" do sistema
- [x] Peça que permanece desliza em vez de piscar

---

### MOD-004 — Iconografia própria

**Objetivo.** Categorias de vestuário com desenho da marca.

**Descrição.** `FrameGlyph` no grid 24×24 do logo, oito glifos de vestuário,
`AppIcon` resolvendo a família própria e o Lucide sob um nome só.

**Dependências.** MOD-002
**Prioridade.** P1 · **Estimativa.** M · **Status.** Done

**Critérios de aceite**

- [x] Oito glifos compartilhando linha de ombro e de barra
- [x] Vocabulário do produto (`name="armario"`), não da biblioteca
- [x] Convivem com o Lucide sem denunciar a costura

---

### MOD-005 — Componentes do design system

**Objetivo.** Biblioteca completa, com todos os estados.

**Descrição.** 18 componentes: Text, Button, IconButton, Chip, Badge, Card,
ClothingCard, LookCard, LookBackdrop, Input, FieldRow, Search, Modal,
BottomSheet, Loading, Skeleton, EmptyState, Avatar, Toggle, BottomNavigation.

**Dependências.** MOD-002, MOD-003, MOD-004
**Prioridade.** P0 · **Estimativa.** G · **Status.** Done

**Critérios de aceite**

- [x] Default, Pressed, Disabled e Loading em todo componente interativo
- [x] Todos consomem `usePressMotion`
- [x] `ClothingCard` com quatro slots e três variantes
- [x] Loading não muda a largura do componente

---

### MOD-006 — Galeria de componentes

**Objetivo.** Ver uma regressão visual antes de ela chegar num fluxo.

**Dependências.** MOD-005
**Prioridade.** P2 · **Estimativa.** P · **Status.** Done

**Critérios de aceite**

- [x] Rota `/galeria` com todos os componentes em todos os estados
- [x] Base dos prints de revisão de UX

---

### MOD-007 — Home e HeroCard

**Objetivo.** A tese do produto numa tela: uma recomendação, e só.

**Dependências.** MOD-005, MOD-008
**Prioridade.** P0 · **Estimativa.** G · **Status.** Done

**Critérios de aceite**

- [x] Hero sangrando até as bordas, sem cara de card
- [x] Momento, leitura do stylist e dado, nessa ordem
- [x] Hierarquia de ações: Gerar outro, Ajustar, Salvar
- [x] Ações acima da dobra em 390×844
- [x] Skeleton com a caixa exata do conteúdo

---

### MOD-008 — Camada de recomendação

**Objetivo.** A interface conversar com um contrato, não com uma implementação.

**Dependências.** MOD-001
**Prioridade.** P0 · **Estimativa.** M · **Status.** Done

**Critérios de aceite**

- [x] `RecommendationService` como porta
- [x] Implementação de demonstração com latência real
- [x] Troca de implementação em uma linha
- [x] "Gerar outro" nunca repete o look anterior

---

### MOD-009 — Detalhe do look

**Objetivo.** Onde a recomendação se justifica por inteiro.

**Dependências.** MOD-007
**Prioridade.** P1 · **Estimativa.** M · **Status.** Done

**Critérios de aceite**

- [x] Imagem sangrando do topo, ações flutuando sobre ela
- [x] Nota completa do stylist como conteúdo principal
- [x] Peças em lista, com nome e material
- [x] Salvar otimista, com reversão em falha
- [x] Look reconstruído a partir do próprio id

---

### MOD-010 — Armário

**Objetivo.** Uma coleção organizada, não um catálogo.

**Dependências.** MOD-005
**Prioridade.** P0 · **Estimativa.** M · **Status.** Done

**Critérios de aceite**

- [x] Grade de duas colunas com peça em retrato
- [x] Filtro por categoria, ocultando categorias vazias
- [x] Busca por nome, cor e material
- [x] Estado vazio editorial

---

### MOD-011 — Adicionar peça

**Objetivo.** A IA preenche, o usuário confirma.

**Dependências.** MOD-010
**Prioridade.** P0 · **Estimativa.** G · **Status.** Done

**Critérios de aceite**

- [x] Captura por câmera ou galeria
- [x] Estado de leitura com tempo real de espera
- [x] Confirmação sem nenhum campo vazio
- [x] Correção de categoria, cor, estações e ocasiões
- [x] Marcação de uniforme
- [x] Salvar invalida armário e recomendação

---

### MOD-012 — Motor determinístico

**Objetivo.** A escolha do look não depender de LLM.

**Dependências.** MOD-008, MOD-010
**Prioridade.** P0 · **Estimativa.** M · **Status.** Done

**Critérios de aceite**

- [x] Filtro por ocasião, estação e clima
- [x] Uniforme fora de look casual e no fim da fila no trabalho
- [x] Camisa antes de camiseta em trabalho, noite e encontro
- [x] Sem peça estrutural, não recomenda
- [x] Peça nova entra na recomendação (verificado pelo id do look)

---

### MOD-013 — Autenticação

**Objetivo.** Entrar sem senha, e continuar testável sem backend.

**Dependências.** MOD-005
**Prioridade.** P0 · **Estimativa.** G · **Status.** Done

**Critérios de aceite**

- [x] OTP por e-mail, Apple por token nativo, Google por OAuth
- [x] Modo de demonstração quando não há chaves
- [x] Guarda de rota sem piscar o login
- [x] Saudação da Home vem da sessão

---

### MOD-014 — Perfil

**Dependências.** MOD-013
**Prioridade.** P2 · **Estimativa.** P · **Status.** Done

**Critérios de aceite**

- [x] Identidade, resumo do armário e origem da sessão
- [x] Diz explicitamente quando os dados são de demonstração
- [x] Sair volta ao login

---

### MOD-015 — Aba Looks

**Dependências.** MOD-009
**Prioridade.** P1 · **Estimativa.** P · **Status.** Done

**Critérios de aceite**

- [x] Coluna única, não grade
- [x] Salvar na Home aparece aqui
- [x] Look que perdeu uma peça não aparece
- [x] Estado vazio

---

### MOD-016 — Schema e RLS

**Objetivo.** O contrato do backend existir antes do código que depende dele.

**Dependências.** —
**Prioridade.** P0 · **Estimativa.** M · **Status.** Done

**Critérios de aceite**

- [x] Enums para o vocabulário do produto
- [x] Perfil criado por gatilho junto com o usuário
- [x] RLS ligada em todas as tabelas antes de qualquer política
- [x] Bucket privado com caminho por dono
- [x] Seed espelhando o armário de demonstração

---

### MOD-017 — Edge Function de leitura

**Objetivo.** O Gemini nunca ser chamado pelo app.

**Dependências.** MOD-016
**Prioridade.** P0 · **Estimativa.** M · **Status.** Done

**Nota.** A função existe e está documentada, mas **não está integrada** ao app
nem publicada. A integração é MOD-025.

**Critérios de aceite**

- [x] Schema de saída obrigatório
- [x] Tradução para o formato do domínio
- [x] Chave só como secret
- [ ] Publicada e chamada pelo app → MOD-025

---

## Próximo

### MOD-018 — "Ajustar" não altera a recomendação

**Objetivo.** Corrigir um recurso que aparenta funcionar e não funciona.

**Descrição.** `RecommendationRequest.adjustments` é declarado e passado, mas
nem `mockRecommendationService` nem `composeLook` o leem. Ao tocar em "Mais
elegante" ou "Está frio", o estado muda, a query refaz e o look às vezes muda —
por coincidência de variante, não por causa do ajuste.

É o pior tipo de defeito: convence o usuário de que foi ouvido quando não foi.

**Dependências.** MOD-012
**Prioridade.** P0 · **Estimativa.** P · **Status.** Ready

**Critérios de aceite**

- [ ] `composeLook` recebe e aplica os ajustes
- [ ] "Mais elegante" / "Mais casual" desloca a prioridade de categorias
- [ ] "Está calor" / "Está frio" desloca o limiar de casaco e bermuda
- [ ] "Outro tênis" / "Outra calça" troca só aquela peça, preservando o resto
- [ ] Teste cobrindo cada ajuste
- [ ] Screenshot antes e depois de um ajuste

---

### MOD-019 — Testes do motor

**Objetivo.** Proteger a lógica que mais cresce e mais dói se quebrar.

**Descrição.** Suíte para `composeLook` e para as regras de armário. Sem
framework de teste no projeto ainda — a tarefa inclui escolher e configurar.

**Dependências.** MOD-012
**Prioridade.** P0 · **Estimativa.** M · **Status.** Ready

**Critérios de aceite**

- [ ] Runner configurado e rodando por `npm test`
- [ ] Uniforme nunca em look casual
- [ ] Uniforme por último no trabalho
- [ ] Casaco só abaixo do limiar; bermuda só acima
- [ ] Armário incompleto não gera look
- [ ] Id do look reconstrói o mesmo look

---

### MOD-020 — Integração contínua

**Objetivo.** A definição de pronto ser verificada por máquina, não por
disciplina.

**Dependências.** MOD-019
**Prioridade.** P1 · **Estimativa.** P · **Status.** Ready

**Critérios de aceite**

- [ ] Workflow rodando typecheck, lint, testes e build em cada PR
- [ ] `main` protegida contra push direto
- [ ] PR sem CI verde não pode ser mesclado

---

### MOD-021 — Ícone e splash da marca

**Objetivo.** Tirar o ícone do template Expo da tela inicial.

**Descrição.** Derivar do componente `Logo`, que já é a fonte de verdade da
marca.

**Dependências.** MOD-004
**Prioridade.** P1 · **Estimativa.** P · **Status.** Ready

**Critérios de aceite**

- [ ] Ícone iOS e Android derivados do `Logo`
- [ ] Splash com a marca sobre o off-white
- [ ] Favicon da web
- [ ] Geração reprodutível por script

---

### MOD-022 — Detalhe da peça

**Objetivo.** Tocar numa peça do armário levar a algum lugar.

**Dependências.** MOD-010
**Prioridade.** P1 · **Estimativa.** M · **Status.** Backlog

**Critérios de aceite**

- [ ] Rota `/peca/[id]` com foto, atributos e histórico de uso
- [ ] Looks em que a peça aparece
- [ ] Caminho para editar

---

### MOD-023 — Editar e remover peça

**Dependências.** MOD-022
**Prioridade.** P1 · **Estimativa.** M · **Status.** Backlog

**Critérios de aceite**

- [ ] Editar reaproveita a tela de confirmação
- [ ] Remover pede confirmação
- [ ] Remoção invalida armário, recomendação e looks salvos

---

### MOD-024 — Remoção de fundo

**Objetivo.** A peça sobre o palco branco, sem o quarto do usuário atrás.

**Descrição.** Edge Function própria, separada da leitura de atributos: uma
falha de recorte não pode derrubar a catalogação.

**Dependências.** MOD-017
**Prioridade.** P0 · **Estimativa.** M · **Status.** Backlog

**Critérios de aceite**

- [ ] Edge Function `remove-background`
- [ ] Devolve PNG com transparência
- [ ] Falha degrada para a foto original, não bloqueia o cadastro
- [ ] Screenshot com peça real recortada

---

### MOD-025 — Integrar leitura da peça

**Objetivo.** Trocar a análise mockada pela Edge Function.

**Dependências.** MOD-017, MOD-024
**Prioridade.** P0 · **Estimativa.** M · **Status.** Backlog

**Critérios de aceite**

- [ ] Função publicada
- [ ] `wardrobeService.analyze` chama a função quando há backend
- [ ] Erro de rede mostra mensagem e mantém a foto
- [ ] Atributos reais numa peça fotografada de verdade

---

### MOD-026 — Ranqueamento e texto por IA

**Objetivo.** A segunda camada da recomendação.

**Descrição.** Edge Function que recebe candidatos já válidos do motor
determinístico e devolve o escolhido mais `moment`, `mood`, `summary` e
`rationale`. `copy.ts` deixa de existir.

**Dependências.** MOD-012, MOD-018
**Prioridade.** P0 · **Estimativa.** G · **Status.** Backlog

**Nota.** Item grande. Quebrar antes de virar branch:
contrato da função · prompt e schema · integração · fallback offline.

**Critérios de aceite**

- [ ] Motor gera de 3 a 5 candidatos válidos
- [ ] Função ranqueia e escreve
- [ ] Falha ou ausência de rede cai no texto local, sem tela de erro
- [ ] Texto na voz do stylist, sem vocabulário de vitrine

---

### MOD-027 — Clima real

**Dependências.** MOD-012
**Prioridade.** P1 · **Estimativa.** M · **Status.** Backlog

**Critérios de aceite**

- [ ] Permissão de localização pedida no momento certo, com motivo
- [ ] Fonte de clima com cache diário
- [ ] Negar a permissão cai na estação do ano, sem erro

---

### MOD-028 — Persistência do armário

**Dependências.** MOD-016
**Prioridade.** P0 · **Estimativa.** M · **Status.** Backlog

**Critérios de aceite**

- [ ] `supabaseWardrobeService` implementando a porta
- [ ] Peça sobrevive ao recarregar
- [ ] RLS verificada com dois usuários

---

### MOD-029 — Persistência dos looks

**Dependências.** MOD-028
**Prioridade.** P0 · **Estimativa.** M · **Status.** Backlog

**Critérios de aceite**

- [ ] `supabaseLookService` implementando a porta
- [ ] Look salvo persiste com sua composição
- [ ] Peça removida não quebra o look salvo

---

### MOD-030 — Upload de fotos

**Dependências.** MOD-028
**Prioridade.** P0 · **Estimativa.** M · **Status.** Backlog

**Critérios de aceite**

- [ ] Upload para o bucket privado em `<user_id>/<garment_id>.png`
- [ ] Leitura por URL assinada
- [ ] Falha de upload não perde a peça

---

### MOD-031 — Onboarding de estilo

**Objetivo.** A recomendação conhecer o usuário desde o primeiro look.

**Dependências.** MOD-013
**Prioridade.** P1 · **Estimativa.** G · **Status.** Backlog

**Nota.** Item grande. Quebrar em: cards de estilo · ocasiões · gravação no
perfil · influência no motor.

**Critérios de aceite**

- [ ] Descoberta por cards visuais, sem formulário
- [ ] No máximo três telas
- [ ] Pulável, sem punir quem pula
- [ ] Preferências gravadas no perfil

---

### MOD-032 — Preferências no perfil

**Dependências.** MOD-031
**Prioridade.** P2 · **Estimativa.** M · **Status.** Backlog

---

### MOD-033 — Development build

**Objetivo.** Testar no aparelho o que o Expo Go não roda.

**Dependências.** MOD-013
**Prioridade.** P0 · **Estimativa.** M · **Status.** Backlog

**Bloqueio externo.** Conta no Apple Developer Program e OAuth client do Google.

**Critérios de aceite**

- [ ] Build de desenvolvimento iOS e Android
- [ ] Sign in with Apple funcionando em aparelho
- [ ] Google funcionando em aparelho
- [ ] Câmera funcionando

---

### MOD-034 — Auditoria de acessibilidade

**Dependências.** MOD-005
**Prioridade.** P1 · **Estimativa.** M · **Status.** Backlog

**Critérios de aceite**

- [ ] Navegação completa por leitor de tela
- [ ] Contraste conferido em toda a paleta
- [ ] Alvos de toque de no mínimo 44 pt
- [ ] "Reduzir movimento" respeitado em todas as telas

---

### MOD-035 — Beta fechado

**Dependências.** MOD-020, MOD-028, MOD-029, MOD-030, MOD-033
**Prioridade.** P1 · **Estimativa.** M · **Status.** Backlog

**Critérios de aceite**

- [ ] TestFlight e faixa interna do Google Play
- [ ] Relato de erro dentro do app
- [ ] Política de privacidade
