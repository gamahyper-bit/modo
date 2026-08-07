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

| ID          | Nome                               | Epic   | Jor.   | Imp.  | Status        | Prio   | Est.  | Versão   |
| ----------- | ---------------------------------- | ------ | ------ | ----- | ------------- | ------ | ----- | -------- |
| MOD-001     | Fundação do projeto                | 06     | —      | 1     | Done          | P0     | M     | v0.1     |
| MOD-002     | Design tokens                      | 01     | —      | 2     | Done          | P0     | M     | v0.1     |
| MOD-003     | Sistema de Motion                  | 01     | —      | 2     | Done          | P1     | M     | v0.1     |
| MOD-004     | Iconografia própria                | 01     | —      | 3     | Done          | P1     | M     | v0.1     |
| MOD-005     | Componentes do design system       | 01     | —      | 4     | Done          | P0     | G     | v0.1     |
| MOD-006     | Galeria de componentes             | 07     | —      | 1     | Done          | P2     | P     | v0.1     |
| MOD-007     | Home e HeroCard                    | 02     | J2     | 5     | Done          | P0     | G     | v0.1     |
| MOD-008     | Camada de recomendação             | 02     | J2     | 3     | Done          | P0     | M     | v0.1     |
| MOD-009     | Detalhe do look                    | 02     | J2     | 4     | Done          | P1     | M     | v0.1     |
| MOD-010     | Armário                            | 03     | J3     | 4     | Done          | P0     | M     | v0.2     |
| MOD-011     | Adicionar peça                     | 03     | J3     | 5     | Done          | P0     | G     | v0.3     |
| MOD-012     | Motor determinístico               | 02     | J2     | 5     | Done          | P0     | M     | v0.2     |
| MOD-013     | Autenticação                       | 05     | J1     | 4     | Done          | P0     | G     | v0.1     |
| MOD-014     | Perfil                             | 05     | J5     | 2     | Done          | P2     | P     | v0.5     |
| MOD-015     | Aba Looks                          | 04     | J4     | 3     | Done          | P1     | P     | v0.5     |
| MOD-016     | Schema e RLS                       | 06     | J5     | 2     | Done          | P0     | M     | v0.6     |
| MOD-017     | Edge Function de leitura           | 06     | J3     | 2     | Done          | P0     | M     | v0.4     |
| MOD-018     | Ajustar não altera a recomendação  | 02     | J2     | 5     | Done          | P0     | M     | v0.2     |
| MOD-019     | Testes do motor                    | 07     | J2     | 2     | Done          | P0     | M     | v0.2     |
| MOD-021     | Ícone e splash da marca            | 01     | J1     | 3     | Done          | P1     | P     | v0.2     |
| MOD-020     | Integração contínua                | 07     | J5     | 1     | Done          | P1     | P     | v0.2     |
| MOD-022     | Detalhe da peça                    | 03     | J4     | 3     | Backlog       | P1     | M     | v0.3     |
| MOD-023     | Editar e remover peça              | 03     | J3     | 4     | Backlog       | P1     | M     | v0.2     |
| MOD-024     | Remoção de fundo                   | 03     | J3     | 5     | Backlog       | P0     | M     | v0.3     |
| MOD-025     | Integrar leitura da peça           | 03     | J3     | 5     | Backlog       | P0     | M     | v0.4     |
| MOD-026     | Ranqueamento e texto por IA        | 02     | J2     | 5     | Backlog       | P0     | G     | v0.4     |
| MOD-027     | Clima real                         | 02     | J2     | 4     | Backlog       | P1     | M     | v0.4     |
| MOD-028     | Persistência do armário            | 06     | J5     | 5     | Backlog       | P0     | M     | v0.6     |
| MOD-029     | Persistência dos looks             | 04     | J4     | 4     | Backlog       | P0     | M     | v0.6     |
| MOD-030     | Upload de fotos                    | 06     | J5     | 5     | Backlog       | P0     | M     | v0.6     |
| MOD-031     | Onboarding de estilo               | 05     | J1     | 4     | Backlog       | P1     | G     | v0.5     |
| MOD-032     | Preferências no perfil             | 05     | J1     | 2     | Backlog       | P2     | M     | v0.5     |
| MOD-033     | Development build                  | 06     | J5     | 3     | Backlog       | P0     | M     | v0.7     |
| MOD-034     | Auditoria de acessibilidade        | 07     | J5     | 3     | Backlog       | P1     | M     | v0.7     |
| MOD-035     | Beta fechado                       | 07     | J5     | 3     | Backlog       | P1     | M     | v0.7     |
| MOD-036     | Régua de agasalho                  | 02     | J2     | 3     | Backlog       | P2     | P     | v0.3     |
| MOD-037     | Revisão arquitetural               | 07     | J5     | 1     | Done          | P0     | M     | v0.3     |
| **MOD-038** | **Identidade de peça e de look**   | **06** | **J5** | **1** | **In Review** | **P0** | **M** | **v0.3** |
| **MOD-039** | **Separar escolha e fala do look** | **02** | **J2** | **1** | **Ready**     | **P0** | **M** | **v0.3** |
| **MOD-040** | **Injetar armário e clima**        | **02** | **J2** | **1** | **Ready**     | **P1** | **P** | **v0.3** |
| **MOD-041** | **Remover abstrações sem uso**     | **01** | **—**  | **1** | **Ready**     | **P1** | **P** | **v0.3** |
| **MOD-042** | **Telas não importam serviço**     | **07** | **—**  | **1** | **Ready**     | **P2** | **P** | **v0.3** |

**Em negrito:** a sprint v0.3, na ordem de execução.

---

## v0.2 — encerrada

| #   | Branch                         | Item    | Entregou                               |
| --- | ------------------------------ | ------- | -------------------------------------- |
| 1   | `fix/look-adjustments`         | MOD-018 | "Ajustar" passou a fazer o que promete |
| 2   | `feature/brand-assets`         | MOD-021 | o app deixou de ter ícone de template  |
| 3   | `feature/recommendation-tests` | MOD-019 | o motor parou de errar em silêncio     |
| 4   | `feature/ci`                   | MOD-020 | a definição de pronto virou máquina    |

**MOD-022 saiu da v0.2 para a v0.3.** Ele acrescenta valor, mas não desbloqueia
etapa nenhuma — e a revisão arquitetural reduz risco antes de Supabase, Gemini,
clima e imagens. O custo de mudar um contrato agora é um PR; depois das
integrações, cresce com o número de coisas que dependem dele.

---

## Sprint atual — v0.3

| #   | Branch                        | Item    | Estado                                 |
| --- | ----------------------------- | ------- | -------------------------------------- |
| 1   | `feature/architecture-review` | MOD-037 | ✅ mesclada                            |
| 2   | `feature/look-identity`       | MOD-038 | 🔄 em andamento                        |
| 3   | a definir                     | MOD-039 | separar escolha e fala do look         |
| 4   | a definir                     | MOD-040 | injetar armário e clima no serviço     |
| 5   | a definir                     | MOD-041 | remover abstrações sem uso             |
| 6   | a definir                     | MOD-042 | telas param de importar serviço direto |

Depois destes vêm as integrações, nesta ordem: **Supabase real → Gemini → clima
→ imagens**, e só então MOD-022 e as demais features de experiência.

**Uma simplificação por PR.** MOD-038 a MOD-042 saíram da revisão, e cada um
tem uma razão própria para existir — juntá-los faria um diff que ninguém revisa.
MOD-041 e MOD-042 são baratos e independentes: podem entrar em paralelo.

**Cinco itens de risco puro numa sprint só** rompe o limite de um por sprint da
[regra do valor](../engineering/process.md#a-regra-do-valor), e é consciente.
Esta sprint é uma pausa declarada antes das integrações — o produto não anda, e
é para não andar. A regra volta a valer na seguinte.

---

## EPIC-02 — Recomendação

### MOD-018 — "Ajustar" não altera a recomendação · `Done` · P0 · M

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

### MOD-021 — Ícone e splash da marca · `Done` · P1 · P

**Objetivo.** Tirar o ícone do template Expo da tela inicial do aparelho.

**Valor.** É a primeira coisa que o usuário vê, antes mesmo de abrir o app. Um
ícone de template destrói em um segundo a impressão que o resto da interface
constrói.

**Descrição.** Derivar do componente `Logo`, que já é a fonte de verdade da
marca. Geração por script, para o ícone nunca divergir do logo.

**Dependências.** MOD-004 (feito)
**Verificação.** Print da tela inicial do simulador web e dos arquivos gerados.

**Critérios de aceite**

- [x] Ícone iOS e Android derivados do `Logo`
- [x] Splash com a marca sobre o off-white
- [x] Favicon da web
- [x] Geração reprodutível por script versionado

- [x] O ícone tratado como ativo próprio, com ajuste óptico para tamanho pequeno

**A geometria subiu para `theme/brand.ts`.** "Derivar do `Logo`" na prática
significava importar um componente React de dentro de um script Node, o que não
funciona. O que os dois precisam compartilhar não é o componente: são os
números. `Logo` desenha a partir deles em tela, o script desenha a partir deles
em PNG, e um teste compara os PNG em disco com o que a geometria produz agora —
esquecer de rodar `npm run brand` reprova.

**E a geometria virou duas** (DEC-022). O símbolo é traço fino fechado por um M
em serifa de contraste alto: grande é a marca inteira, pequeno o traço vira
cinza e as hastes finas somem antes dele. O ícone ganhou grau próprio — moldura
mais grossa, M maior, vão mais largo — e o `Logo` troca de grau abaixo de 40
pontos, então o cabeçalho do app ganhou junto.

**Um defeito antigo apareceu na medição.** `Logo` convertia `strokeWidth` para
pixels, mas o atributo está em unidades do `viewBox`, que o SVG já escala. O
traço saía a `size/64` do peso desenhado — 44% no cabeçalho. Só apareceu porque
medi o traço renderizado em vez de olhar.

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

### MOD-019 — Testes do motor · `Done` · P0 · M

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
- [x] Uniforme nunca aparece enquanto a vaga tem alternativa comum
- [x] Casaco só abaixo do limiar; bermuda só a partir dele
- [x] Armário incompleto não gera look
- [x] Id do look reconstrói o mesmo look, ajuste incluído
- [x] "Gerar outro" nunca repete um look já visto
- [x] `npm test` entra na Definition of Done

**Estimativa revisada de `P` para `M`.** O item era para ser só cobertura. A
cobertura encontrou quatro defeitos no motor, e três deles o usuário sentia —
consertar entrou no escopo, porque um teste que documenta o defeito em vez de
reprová-lo não serve para nada.

**O que os testes acharam**

| Defeito                                                        | Quem sentia                              |
| -------------------------------------------------------------- | ---------------------------------------- |
| Uniforme misturado com peça comum a partir da segunda variante | o usuário, e é a peça mais reconhecível  |
| "Gerar outro" alcançava 2 das 8 combinações                    | o usuário, a cada segundo toque          |
| Repetição comparada por id, que carrega a variante             | o usuário: look "novo" com a mesma roupa |
| A escolha herdava a ordem de chegada do armário                | ninguém ainda — quebraria com MOD-028    |

---

### MOD-037 — Revisão arquitetural · `Done` · P0 · M

**Objetivo.** Saber onde a arquitetura vai doer **antes** de conectar Supabase,
Gemini, clima e imagens — não depois.

**Falha que impede.** Integração pesada é o momento em que um contrato frágil
para de ser barato. Hoje toda porta tem uma implementação só; com duas, cada
suposição escondida vira um comportamento diferente entre demonstração e
produção — e a diferença aparece no aparelho de um testador, não aqui.

**Por que agora.** É a última janela em que refatorar custa um PR. Depois de
MOD-025 a MOD-030 haverá rede, banco e IA dependendo das mesmas interfaces.

**Descrição.** Um documento em `docs/engineering/`, escrito **a partir do código
existente** — não de hipóteses. Cada afirmação aponta para um arquivo.

**Dependências.** MOD-020
**Verificação.** O documento responde às cinco perguntas, e cada oportunidade de
simplificação vira item no backlog ou entra numa branch antes das integrações.

**Critérios de aceite**

- [x] Quais módulos conhecem detalhes que não deveriam conhecer
- [x] Onde há contratos frágeis ou difíceis de evoluir
- [x] Quais interfaces devem permanecer iguais até a v1.0
- [x] Quais decisões podem ser congeladas e quais seguem experimentais
- [x] O que impede o motor de ser independente da persistência
- [x] Toda abstração classificada em Essencial, Temporária ou Candidata à remoção
- [x] Toda simplificação encontrada vira item no backlog, com prioridade

**O documento.** [`engineering/architecture-review.md`](../engineering/architecture-review.md).

**O achado principal.** O app e o banco discordam sobre o que identifica uma peça
e um look. No app, a peça é `g1` e o look é `l-trabalho-0-_-g1.g6…`, uma receita
que se recozinha; no schema, os dois são `uuid` com tabela de ligação. MOD-028 e
MOD-029 batem nisso de frente.

**O segundo.** O mesmo conflito aparece antes da persistência: o schema congela
`moment`, `mood`, `summary` e `rationale`, e o app recalcula os quatro ao
reconstruir. Enquanto o texto é template, ninguém percebe. Com o Gemini em
MOD-026, duas chamadas iguais não devolvem a mesma frase — e o
`look.id !== lookId` de `rebuild` deixa de ser um teste confiável.

---

### MOD-038 — Identidade de peça e de look · `In Review` · P0 · M

**Objetivo.** Um look salvo continuar abrindo depois que o banco existir.

**Falha que impede.** O app identifica peça por `g${n}` e look por uma string que
carrega a composição inteira; o schema identifica os dois por `uuid`, com tabela
de ligação. São dois modelos incompatíveis do que é um look — receita que se
recozinha, ou registro que se guarda. Integrar sem resolver significa reescrever
schema ou motor com pressa.

**Por que agora.** Depois de MOD-028 haverá dados de gente real com um dos dois
formatos.

**Dependências.** MOD-037
**Verificação.** Teste de ida e volta com id no formato escolhido; migração
descrita, mesmo que não haja o que migrar.

**Critérios de aceite**

- [x] Uma decisão registrada: **o look é receita** (DEC-028)
- [x] `Garment.id` e `Look.id` com o mesmo formato no app e no schema
- [x] `mockLookService` deixa de importar `composeLook` — passa a conversar com
      a porta, não com as entranhas
- [x] `excludeLookIds` revisto: a assinatura sumiu, o id passou a ser ela
- [x] Domain Model escrito em
      [`architecture/domain-model.md`](../architecture/domain-model.md)

**A variante saiu do id.** Foi a consequência mais forte da decisão: ela é o
botão que o motor gira para enumerar combinações, não a escolha do usuário.
Enquanto esteve na identidade, duas variantes que caíam nas mesmas peças eram
dois looks para o produto e um só para quem veste — e foi por isso que MOD-019
precisou inventar uma "assinatura" paralela. Tirando a variante, **o id é a
assinatura**, e a assinatura sumiu do código.

**`rebuild` deixou de recompor.** Antes ele refazia a escolha inteira e conferia
se o id batia; agora resolve no armário as peças que a receita nomeia. Peça que
saiu é detectada por ausência. Era o que quebraria em MOD-026, quando o texto
deixar de ser determinístico.

---

### MOD-039 — Separar escolha e fala do look · `Ready` · P0 · M

**Objetivo.** O texto do stylist poder vir da IA sem quebrar o look salvo.

**Falha que impede.** `Look` guarda num tipo só o que foi escolhido — peças,
ocasião, clima — e o que o stylist disse. A escolha é determinística e
reproduzível; a fala vai virar não determinística e cara. Enquanto forem um tipo
só, guardar uma e recalcular a outra é impossível sem que a decisão vaze para as
telas.

**Dependências.** MOD-037
**Verificação.** Teste que reconstrói a escolha sem produzir a fala.

**Critérios de aceite**

- [ ] `Look` separado em escolha e fala, com nomes que digam isso
- [ ] Reconstruir um look não exige recalcular o texto
- [ ] `copy.ts` continua sendo a fala local, e o caminho para a IA fica claro

---

### MOD-040 — Injetar armário e clima no serviço · `Ready` · P1 · P

**Objetivo.** Recomendar a partir de um armário qualquer, não só do armário.

**Falha que impede.** `mockRecommendationService` alcança `wardrobeService` e
`weatherService` como singletons de módulo. O motor já é puro; quem prende é o
serviço em volta. O sintoma está escrito no próprio teste: _"este bloco cresce o
armário em memória e por isso vai por último"_.

**Dependências.** MOD-037
**Verificação.** Teste do serviço com armário próprio, sem tocar no global.

**Critérios de aceite**

- [ ] Armário e clima entram por parâmetro na criação do serviço
- [ ] O `index.ts` passa as implementações de verdade
- [ ] O teste do serviço não mexe mais no armário global

---

### MOD-041 — Remover abstrações sem uso · `Ready` · P1 · P

**Objetivo.** Tirar do caminho três componentes que ninguém usa.

**Falha que impede.** `Modal` é exportado no barril e usado por ninguém; `Badge`
só aparece na galeria; `EmScaffold` não é nem exportado. Componente na galeria
parece disponível, e o próximo que precisar de um selo vai usar o `Badge` — que
nasceu contrariando o PILAR-05, que diz que a interface não tem badge nem
contador.

**Dependências.** MOD-037

**Critérios de aceite**

- [ ] `Modal`, `Badge` e `EmScaffold` removidos, com o barril e a galeria juntos
- [ ] Nada mais no design system sem uso no produto

---

### MOD-042 — Telas não importam serviço · `Ready` · P2 · P

**Objetivo.** Uma regra só sobre de onde a tela tira dado.

**Falha que impede.** `LooksScreen` e `ProfileScreen` montam a própria `useQuery`
em cima do serviço; todo o resto passa por hook. É a exceção que a próxima tela
copia.

**Dependências.** MOD-037

**Critérios de aceite**

- [ ] `LooksScreen` e `ProfileScreen` passam por hook próprio
- [ ] `AuthProvider` continua como está — ali a porta é o lugar certo

---

### MOD-020 — Integração contínua · `Done` · P1 · P

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

- [x] Workflow rodando formatação, tipos, lint, testes e build em cada PR
- [x] `main` protegida contra push direto
- [ ] PR sem CI verde não pode ser mesclado — **depende de ligar o check
      obrigatório nas regras do repositório**, ver `engineering/process.md`

**O que a CI não verifica, e por quê.** Screenshot, documentação atualizada e
status no backlog continuam humanos. São critérios que dependem de julgamento, e
uma verificação automática ruim para eles é pior que conferir à mão: dá a
impressão de estar coberto.

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
