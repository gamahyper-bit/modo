# Backlog

Fonte única de verdade das entregas. Nada entra em desenvolvimento sem estar
aqui e sem passar na [Definition of Ready](../engineering/process.md#definition-of-ready).

**Status** — `Backlog` (não passou na DoR) · `Ready` · `In Progress` ·
`In Review` · `Done` · `Blocked`
**Prioridade** — `P0` bloqueia · `P1` essencial · `P2` importante · `P3` desejável
**Estimativa** — `P` até meio dia · `M` 1–2 dias · `G` precisa ser quebrado
**Jornada** — qual [jornada](./journeys.md) o item aproxima de utilizável

**Impacto (1–5)** — o quanto o usuário sente:

|       | Significado                                                                                                      |
| ----- | ---------------------------------------------------------------------------------------------------------------- |
| **5** | muda a jornada central; sem isso o produto não cumpre a promessa                                                 |
| **4** | destrava uma jornada ou remove um atrito grande                                                                  |
| **3** | melhoria que o usuário percebe sem precisar procurar                                                             |
| **2** | polimento; percebido só na comparação                                                                            |
| **1** | invisível para o usuário — exige a justificativa da [regra do valor](../engineering/process.md#a-regra-do-valor) |

Impacto **não** é prioridade. Impacto mede o que o usuário sente; prioridade
mede o que bloqueia o projeto. Um item de impacto 1 pode ser P0 — a CI é
exatamente isso.

Cada item declara também o **valor** que entrega, em uma frase.

---

## Visão geral

| ID          | Nome                                  | Epic   | Jor.   | Imp.  | Status        | Prio   | Est.  | Versão   |
| ----------- | ------------------------------------- | ------ | ------ | ----- | ------------- | ------ | ----- | -------- |
| MOD-001     | Fundação do projeto                   | 06     | —      | 1     | Done          | P0     | M     | v0.1     |
| MOD-002     | Design tokens                         | 01     | —      | 2     | Done          | P0     | M     | v0.1     |
| MOD-003     | Sistema de Motion                     | 01     | —      | 2     | Done          | P1     | M     | v0.1     |
| MOD-004     | Iconografia própria                   | 01     | —      | 3     | Done          | P1     | M     | v0.1     |
| MOD-005     | Componentes do design system          | 01     | —      | 4     | Done          | P0     | G     | v0.1     |
| MOD-006     | Galeria de componentes                | 07     | —      | 1     | Done          | P2     | P     | v0.1     |
| MOD-007     | Home e HeroCard                       | 02     | J2     | 5     | Done          | P0     | G     | v0.1     |
| MOD-008     | Camada de recomendação                | 02     | J2     | 3     | Done          | P0     | M     | v0.1     |
| MOD-009     | Detalhe do look                       | 02     | J2     | 4     | Done          | P1     | M     | v0.1     |
| MOD-010     | Armário                               | 03     | J3     | 4     | Done          | P0     | M     | v0.2     |
| MOD-011     | Adicionar peça                        | 03     | J3     | 5     | Done          | P0     | G     | v0.3     |
| MOD-012     | Motor determinístico                  | 02     | J2     | 5     | Done          | P0     | M     | v0.2     |
| MOD-013     | Autenticação                          | 05     | J1     | 4     | Done          | P0     | G     | v0.1     |
| MOD-014     | Perfil                                | 05     | J5     | 2     | Done          | P2     | P     | v0.5     |
| MOD-015     | Aba Looks                             | 04     | J4     | 3     | Done          | P1     | P     | v0.5     |
| MOD-016     | Schema e RLS                          | 06     | J5     | 2     | Done          | P0     | M     | v0.6     |
| MOD-017     | Edge Function de leitura              | 06     | J3     | 2     | Done          | P0     | M     | v0.4     |
| **MOD-018** | **Ajustar não altera a recomendação** | **02** | **J2** | **5** | **In Review** | **P0** | **M** | **v0.2** |
| **MOD-019** | **Testes do motor**                   | **07** | **J2** | **2** | **Ready**     | **P0** | **P** | **v0.2** |
| **MOD-021** | **Ícone e splash da marca**           | **01** | **J1** | **3** | **Ready**     | **P1** | **P** | **v0.2** |
| **MOD-020** | **Integração contínua**               | **07** | **J5** | **1** | **Ready**     | **P1** | **P** | **v0.2** |
| MOD-022     | Detalhe da peça                       | 03     | J4     | 3     | Backlog       | P1     | M     | v0.2     |
| MOD-023     | Editar e remover peça                 | 03     | J3     | 4     | Backlog       | P1     | M     | v0.2     |
| MOD-024     | Remoção de fundo                      | 03     | J3     | 5     | Backlog       | P0     | M     | v0.3     |
| MOD-025     | Integrar leitura da peça              | 03     | J3     | 5     | Backlog       | P0     | M     | v0.4     |
| MOD-026     | Ranqueamento e texto por IA           | 02     | J2     | 5     | Backlog       | P0     | G     | v0.4     |
| MOD-027     | Clima real                            | 02     | J2     | 4     | Backlog       | P1     | M     | v0.4     |
| MOD-028     | Persistência do armário               | 06     | J5     | 5     | Backlog       | P0     | M     | v0.6     |
| MOD-029     | Persistência dos looks                | 04     | J4     | 4     | Backlog       | P0     | M     | v0.6     |
| MOD-030     | Upload de fotos                       | 06     | J5     | 5     | Backlog       | P0     | M     | v0.6     |
| MOD-031     | Onboarding de estilo                  | 05     | J1     | 4     | Backlog       | P1     | G     | v0.5     |
| MOD-032     | Preferências no perfil                | 05     | J1     | 2     | Backlog       | P2     | M     | v0.5     |
| MOD-033     | Development build                     | 06     | J5     | 3     | Backlog       | P0     | M     | v0.7     |
| MOD-034     | Auditoria de acessibilidade           | 07     | J5     | 3     | Backlog       | P1     | M     | v0.7     |
| MOD-035     | Beta fechado                          | 07     | J5     | 3     | Backlog       | P1     | M     | v0.7     |
| MOD-036     | Régua de agasalho                     | 02     | J2     | 3     | Backlog       | P2     | P     | v0.3     |

**Em negrito:** a sprint v0.2, na ordem de execução.

---

## Sprint atual — v0.2

| #   | Branch                         | Item    | Valor entregue                           |
| --- | ------------------------------ | ------- | ---------------------------------------- |
| 1   | `fix/look-adjustments`         | MOD-018 | "Ajustar" passa a fazer o que promete    |
| 2   | `feature/recommendation-tests` | MOD-019 | a recomendação para de errar em silêncio |
| 3   | `feature/brand-assets`         | MOD-021 | o app deixa de ter ícone de template     |
| 4   | `feature/ci`                   | MOD-020 | _(risco)_ nenhuma entrega quebra `main`  |

MOD-020 é **o único item de risco puro** da sprint, e por isso vai por último —
quando já reduziu a incerteza dos três anteriores.

---

## EPIC-02 — Recomendação

### MOD-018 — "Ajustar" não altera a recomendação · `In Review` · P0 · M

**Objetivo.** Quando o usuário diz "está frio", o próximo look precisa estar
mais quente.

**Valor.** Um recurso visível deixa de mentir. Hoje o usuário toca em "Mais
elegante", vê algo mudar por acaso e conclui que foi ouvido — não foi.

**Descrição.** `RecommendationRequest.adjustments` é declarado e passado pela
Home, mas nem `mockRecommendationService` nem `composeLook` o leem. O look às
vezes muda por coincidência de variante.

**Dependências.** MOD-012 (feito)
**Verificação.** Teste por ajuste, mais print antes/depois de "Está frio".

**Critérios de aceite**

- [x] `composeLook` recebe e aplica os ajustes
- [x] "Mais elegante" / "Mais casual" desloca a prioridade de categorias
- [x] "Está calor" / "Está frio" desloca o limiar de casaco e bermuda
- [x] "Outro tênis" / "Outra calça" troca só aquela peça, preservando o resto
- [x] Ajuste ativo fica visível na interface — o usuário sabe que está filtrando
- [x] Teste cobrindo cada ajuste

**Estimativa revisada de `P` para `M`.** A prioridade de categoria por ocasião
era uma tabela escrita à mão, e "mais elegante" não tinha em que se apoiar nela:
`camisa` antes de `camiseta` não distingue um tênis de corrida de uma bota de
camurça. Substituí a tabela por uma régua de formalidade (DEC-019). Foi mais
trabalho do que o previsto e é a razão de o item ter virado `M`.

**O que ficou de fora, e virou MOD-036.** "Está frio" num dia de 18 graus não
muda o look: o casaco já estava lá, e é o único que serve para trabalho. O
usuário vê que foi ouvido — o topo do look passa a ler "Para o frio." e a nota
explica a decisão — mas nenhuma peça troca. Trocar por uma peça **mais quente**
exige uma segunda régua, e essa régua é um item próprio.

---

### MOD-036 — Régua de agasalho · `Backlog` · P2 · P

**Objetivo.** "Está frio" trocar por uma peça mais quente, e não só por uma
peça a mais.

**Valor.** Fecha a metade que faltou do ajuste de clima. Hoje, num dia em que o
casaco já está no look, "está frio" responde com palavra e não com roupa — e
palavra sem roupa é a segunda melhor resposta.

**Descrição.** MOD-018 traduziu "está frio" em deslocamento de temperatura, e um
deslocamento só atravessa um limiar: põe ou tira o casaco. Falta a régua de
agasalho — a irmã da régua de formalidade — para o motor saber que um casaco de
lã é mais quente que uma jaqueta leve, e que uma camiseta de malha é mais fresca
que uma camisa de algodão.

**Dependências.** MOD-018
**Verificação.** Teste: num armário com dois casacos elegíveis, "está frio"
escolhe o mais quente. Print antes/depois.

**Critérios de aceite**

- [ ] `warmthOf` pontua a peça por categoria e material, como `formalityOf`
- [ ] "Está frio" e "está calor" ranqueiam candidatos além de mover o limiar
- [ ] A régua de formalidade continua decidindo quando as duas se cruzam, com a
      regra de desempate escrita
- [ ] Teste com dois casacos elegíveis

---

### MOD-026 — Ranqueamento e texto por IA · `Backlog` · P0 · G

**Objetivo.** A explicação do look deixar de ser template.

**Valor.** É a promessa central do produto: um stylist que escreve para você,
não um gerador que preenche lacunas.

**Não passa na DoR.** Item `G`. Quebrar em quatro antes de virar branch:
contrato da Edge Function · prompt e schema · integração no serviço · fallback
offline.

**Dependências.** MOD-012, MOD-018

**Critérios de aceite**

- [ ] Motor gera de 3 a 5 candidatos válidos
- [ ] Função ranqueia e escreve
- [ ] Falha ou ausência de rede cai no texto local, sem tela de erro
- [ ] Texto na voz do stylist, sem vocabulário de vitrine

---

### MOD-027 — Clima real · `Backlog` · P1 · M

**Objetivo.** A recomendação responder ao tempo lá fora, não a um valor fixo.

**Valor.** "Está frio" deixa de ser um botão e passa a ser uma coisa que o app
já sabia.

**Dependências.** MOD-012

**Critérios de aceite**

- [ ] Permissão de localização pedida no momento certo, com motivo
- [ ] Fonte de clima com cache diário
- [ ] Negar a permissão cai na estação do ano, sem erro

---

### Entregues

**MOD-007 — Home e HeroCard** · Done · Hero sangrando até as bordas; momento,
leitura e dado nessa ordem; ações acima da dobra em 390×844; skeleton com a
caixa exata.

**MOD-008 — Camada de recomendação** · Done · `RecommendationService` como
porta; implementação de demonstração com latência real; "Gerar outro" nunca
repete.

**MOD-009 — Detalhe do look** · Done · Nota completa do stylist como conteúdo
principal; salvar otimista; look reconstruído a partir do id.

**MOD-012 — Motor determinístico** · Done · Ocasião, estação, clima e regra de
uniforme; camisa antes de camiseta; sem peça estrutural não recomenda.

---

## EPIC-01 — Identidade

### MOD-021 — Ícone e splash da marca · `Ready` · P1 · P

**Objetivo.** Tirar o ícone do template Expo da tela inicial do aparelho.

**Valor.** É a primeira coisa que o usuário vê, antes mesmo de abrir o app. Um
ícone de template destrói em um segundo a impressão que o resto da interface
constrói.

**Descrição.** Derivar do componente `Logo`, que já é a fonte de verdade da
marca. Geração por script, para o ícone nunca divergir do logo.

**Dependências.** MOD-004 (feito)
**Verificação.** Print da tela inicial do simulador web e dos arquivos gerados.

**Critérios de aceite**

- [ ] Ícone iOS e Android derivados do `Logo`
- [ ] Splash com a marca sobre o off-white
- [ ] Favicon da web
- [ ] Geração reprodutível por script versionado

---

### Entregues

**MOD-002 — Design tokens** · Done · Paleta FRAME e assinatura sálvia; escala de
oito degraus; Tailwind importa, não redefine.

**MOD-003 — Sistema de Motion** · Done · Teto de 280 ms verificado em runtime;
respeita "reduzir movimento"; peça que permanece desliza.

**MOD-004 — Iconografia própria** · Done · Oito glifos no grid do logo,
compartilhando linha de ombro e de barra.

**MOD-005 — Componentes do design system** · Done · 18 componentes, quatro
estados cada; loading não muda a largura.

---

## EPIC-03 — Armário

### MOD-022 — Detalhe da peça · `Backlog` · P1 · M

**Objetivo.** Tocar numa peça do armário levar a algum lugar.

**Valor.** Hoje o toque não faz nada — o usuário testa uma vez e aprende que a
grade é decorativa.

**Não passa na DoR.** Falta definir o que a tela mostra além dos atributos:
histórico de uso depende de dado que ainda não existe.

**Dependências.** MOD-010

**Critérios de aceite**

- [ ] Rota `/peca/[id]` com foto e atributos
- [ ] Looks em que a peça aparece
- [ ] Caminho para editar

---

### MOD-023 — Editar e remover peça · `Backlog` · P1 · M

**Objetivo.** Corrigir uma leitura errada da IA depois de salvar.

**Valor.** Sem isto, um erro da IA é permanente — e uma peça errada contamina
toda recomendação que a usar.

**Dependências.** MOD-022

**Critérios de aceite**

- [ ] Editar reaproveita a tela de confirmação
- [ ] Remover pede confirmação
- [ ] Remoção invalida armário, recomendação e looks salvos

---

### MOD-024 — Remoção de fundo · `Backlog` · P0 · M

**Objetivo.** A peça sobre o palco branco, sem o quarto do usuário atrás.

**Valor.** É o que transforma um álbum de fotos num catálogo pessoal. Sem
recorte, o armário parece uma galeria bagunçada.

**Dependências.** MOD-017

**Critérios de aceite**

- [ ] Edge Function `remove-background`
- [ ] Devolve PNG com transparência
- [ ] Falha degrada para a foto original, não bloqueia o cadastro
- [ ] Print com peça real recortada

---

### MOD-025 — Integrar leitura da peça · `Backlog` · P0 · M

**Objetivo.** Trocar a análise mockada pela Edge Function.

**Valor.** A promessa "a IA preenche, você confirma" passa a ser verdade. Hoje
ela devolve sempre a mesma peça.

**Dependências.** MOD-017, MOD-024

**Critérios de aceite**

- [ ] Função publicada
- [ ] `wardrobeService.analyze` chama a função quando há backend
- [ ] Erro de rede mostra mensagem e mantém a foto
- [ ] Atributos reais numa peça fotografada de verdade

---

### Entregues

**MOD-010 — Armário** · Done · Grade de duas colunas; filtro ocultando
categorias vazias; busca; estado vazio editorial.

**MOD-011 — Adicionar peça** · Done · Captura, leitura, confirmação sem campo
vazio, marcação de uniforme; salvar invalida armário e recomendação.

---

## EPIC-04 — Coleção

### MOD-029 — Persistência dos looks · `Backlog` · P0 · M

**Objetivo.** Um look salvo sobreviver ao fechar do app.

**Valor.** Salvar algo que some é pior que não ter o botão.

**Dependências.** MOD-028

**Critérios de aceite**

- [ ] `supabaseLookService` implementando a porta
- [ ] Look salvo persiste com sua composição
- [ ] Peça removida não quebra o look salvo

---

### Entregues

**MOD-015 — Aba Looks** · Done · Coluna única; look que perdeu peça não aparece.

---

## EPIC-05 — Conta

### MOD-031 — Onboarding de estilo · `Backlog` · P1 · G

**Objetivo.** A recomendação conhecer o usuário desde o primeiro look.

**Valor.** Hoje a primeira recomendação é uma média. Com o onboarding, ela já
parece escolhida para aquela pessoa — que é a diferença entre "interessante" e
"eu volto amanhã".

**Não passa na DoR.** Item `G`. Quebrar em: cards de estilo · ocasiões · gravação
no perfil · influência no motor.

**Dependências.** MOD-013

**Critérios de aceite**

- [ ] Descoberta por cards visuais, sem formulário
- [ ] No máximo três telas
- [ ] Pulável, sem punir quem pula
- [ ] Preferências gravadas no perfil

---

### MOD-032 — Preferências no perfil · `Backlog` · P2 · M

**Objetivo.** Revisar o que foi dito no onboarding.

**Valor.** Gosto muda. Sem edição, a única saída é reinstalar.

**Dependências.** MOD-031

---

### Entregues

**MOD-013 — Autenticação** · Done · Três provedores; modo de demonstração;
guarda de rota sem piscar.

**MOD-014 — Perfil** · Done · Identidade, resumo do armário, origem da sessão.

---

## EPIC-06 — Plataforma

### MOD-028 — Persistência do armário · `Backlog` · P0 · M

**Objetivo.** O armário sobreviver ao fechar do app.

**Valor.** Fotografar vinte peças e perder tudo é o cenário que faz o usuário
desinstalar e não voltar.

**Dependências.** MOD-016

**Critérios de aceite**

- [ ] `supabaseWardrobeService` implementando a porta
- [ ] Peça sobrevive ao recarregar
- [ ] RLS verificada com dois usuários
- [ ] Tipos gerados por `supabase gen types`

---

### MOD-030 — Upload de fotos · `Backlog` · P0 · M

**Objetivo.** A foto da peça viver no Storage, não no aparelho.

**Valor.** Sem isto, trocar de aparelho perde todas as fotos.

**Dependências.** MOD-028

**Critérios de aceite**

- [ ] Upload em `<user_id>/<garment_id>.png`
- [ ] Leitura por URL assinada
- [ ] Falha de upload não perde a peça

---

### MOD-033 — Development build · `Backlog` · P0 · M

**Objetivo.** Testar no aparelho o que o Expo Go não roda.

**Valor.** Câmera e Sign in with Apple só existem de verdade em aparelho — até
lá, dois recursos centrais são código não verificado.

**Bloqueio externo.** Conta no Apple Developer Program e OAuth client do Google.

**Dependências.** MOD-013

**Critérios de aceite**

- [ ] Build de desenvolvimento iOS e Android
- [ ] Apple e Google funcionando em aparelho
- [ ] Câmera funcionando

---

### Entregues

**MOD-001 — Fundação do projeto** · Done · Expo SDK 57, TypeScript estrito,
Expo Router, ESLint com regra de fronteira entre features.

**MOD-016 — Schema e RLS** · Done · Enums do vocabulário; perfil por gatilho;
RLS antes das políticas; bucket privado.

**MOD-017 — Edge Function de leitura** · Done · Schema de saída obrigatório;
chave só como secret. **Integração pendente:** MOD-025.

---

## EPIC-07 — Confiança

### MOD-019 — Testes do motor · `Ready` · P0 · P

**Objetivo.** Mudar a regra de recomendação sem medo.

**Falha que impede.** O motor tem seis regras que se cruzam — uniforme, clima,
ocasião, prioridade de categoria, peça estrutural, variante. Uma mudança em
qualquer uma pode quebrar outra **em silêncio**: o app continua entregando um
look, só que o errado. Foi assim que a calça do uniforme apareceu combinada com
uma camisa comum, e só foi notada porque o id do look estava visível num teste
manual.

**Por que agora.** MOD-026 vai reescrever o motor. Sem rede, essa entrega é uma
aposta.

**Reduzido de `M` para `P` por MOD-018.** Um item que mexe no núcleo do motor
não podia esperar a rede chegar depois, então MOD-018 trouxe o runner e os
testes de ajuste junto com a mudança. Sobrou para cá o que MOD-018 não tocou —
e é justamente o que já quebrou uma vez em silêncio.

**Dependências.** MOD-018

**Critérios de aceite**

- [x] Runner configurado, rodando por `npm test` — feito em MOD-018
- [x] Cada ajuste do MOD-018 coberto — feito em MOD-018
- [ ] Uniforme por último no trabalho
- [ ] Casaco só abaixo do limiar; bermuda só acima
- [ ] Armário incompleto não gera look
- [ ] Id do look reconstrói o mesmo look, ajuste incluído
- [ ] "Gerar outro" nunca repete um look já visto
- [ ] `npm test` entra na Definition of Done

---

### MOD-020 — Integração contínua · `Ready` · P1 · P

**Objetivo.** A definição de pronto ser verificada por máquina.

**Falha que impede.** Sete critérios conferidos à mão não sobrevivem a dez PRs.
O modo de falha é conhecido: alguém abre um PR com lint sujo numa sexta-feira,
o revisor confia, e `main` deixa de ser estável — que é a única coisa que o
git flow inteiro existe para garantir.

**Por que agora.** A partir desta sprint são vários PRs por semana. O custo de
instalar a CI é o mesmo hoje e daqui a um mês; o custo de não ter cresce a cada
PR.

**Item de risco puro.** É o único da sprint sem valor perceptível, e por isso
vai por último.

**Dependências.** MOD-019

**Critérios de aceite**

- [ ] Workflow rodando typecheck, lint, testes e build em cada PR
- [ ] `main` protegida contra push direto
- [ ] PR sem CI verde não pode ser mesclado

---

### MOD-034 — Auditoria de acessibilidade · `Backlog` · P1 · M

**Objetivo.** O produto funcionar para quem não enxerga a tela.

**Valor.** Direto para quem depende de leitor de tela; indireto para todos —
auditoria de acessibilidade sempre revela hierarquia mal resolvida.

**Dependências.** MOD-005

**Critérios de aceite**

- [ ] Navegação completa por leitor de tela
- [ ] Contraste conferido em toda a paleta
- [ ] Alvos de toque de no mínimo 44 pt
- [ ] "Reduzir movimento" respeitado em todas as telas

---

### MOD-035 — Beta fechado · `Backlog` · P1 · M

**Objetivo.** Gente de fora usando.

**Valor.** É o primeiro momento em que descobrimos o que estávamos errando —
nenhuma revisão interna substitui.

**Dependências.** MOD-020, MOD-028, MOD-029, MOD-030, MOD-033

**Critérios de aceite**

- [ ] TestFlight e faixa interna do Google Play
- [ ] Relato de erro dentro do app
- [ ] Política de privacidade

---

### Entregues

**MOD-006 — Galeria de componentes** · Done · `/galeria` com todos os
componentes em todos os estados; base dos prints de revisão.
