# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
Versionamento por marcos do [roadmap](./product/roadmap.md), não semântico — o
produto ainda não tem API pública.

Toda feature mesclada atualiza este arquivo no mesmo PR.

---

## [Não lançado]

### Corrigido — "Ajustar" passa a ajustar (MOD-018)

- **O ajuste chega ao motor.** `composeLook` lê `adjustments` e os traduz em
  três parâmetros — formalidade, temperatura sentida, salto de categoria — por
  uma tabela única em `services/recommendation/tuning.ts` (DEC-018). Antes o
  campo era declarado no contrato, passado pela Home e lido por ninguém: o look
  mudava de vez em quando, por coincidência de variante, e o usuário concluía
  que tinha sido ouvido.
- **"Mais elegante" e "mais casual" mexem no look inteiro.** No trabalho, a
  calça reta vira alfaiataria; no casual, a camiseta vira camisa de linho;
  "mais casual" no trabalho troca a bota pelo tênis.
- **"Está calor" tira o casaco; "está frio" o põe** num dia que ainda não
  pedia. A temperatura na tela continua sendo a do termômetro — quem explica a
  diferença é a nota do stylist, não um dado adulterado.
- **"Outro calçado" e "outra calça" trocam só aquela peça**, com o resto do
  look intacto.
- **O pedido fica visível.** O topo do look passa a ler "Para o frio.", a nota
  explica o que foi feito com o pedido, um chip marcado mostra o ajuste em vigor
  até o usuário desfazê-lo, e o sheet reabre com a opção já marcada.
- **Artigo pelo nome da peça, não pela categoria.** A régua alcançou a bota de
  camurça e produziu "o bota de camurça". O erro já existia em "o jaqueta leve"
  e "o bolsa de couro" — nunca tinha aparecido porque o motor nunca escolhia
  essas peças.
- **A ocasião "Viagem" não montava look nenhum.** Nenhuma calça e nenhum calçado
  do armário de demonstração estavam marcados para viagem, e sem peça estrutural
  o motor não recomenda — o chip da Home entregava a tela de erro. Duas peças
  reetiquetadas resolvem; o teste novo cobre as cinco ocasiões para que não
  volte a acontecer em silêncio. Encontrado pelos testes desta entrega.

### Alterado — refinamentos de UX do ajuste

- **"Você pediu" virou "Ajuste"** na Home. Mesmo vocabulário do sheet, que se
  chama "Ajustar".
- **O sheet tem dois grupos: _Trocar peças_ e _Refinar o look_.** Trocar mira
  uma peça, refinar mira o conjunto — numa fileira só, os seis chips pareciam
  seis filtros equivalentes e o usuário descobria a diferença tocando. A
  separação é a mesma que o motor já fazia entre salto de categoria e
  deslocamento de régua.
- **"Outro tênis" virou "Outro calçado".** O rótulo nomeava o modelo, e o modelo
  passou a ser uma bota assim que a régua de formalidade entrou.
- **Fala do stylist mais curta.** Uma oração, uma vírgula, ponto — quem já
  decidiu não precisa de subordinadas. "Você pediu mais elegante, então fui
  atrás do que o seu armário tem de mais formal para hoje" virou "Subi o tom com
  o que você tem de mais formal"; "o casaco dá conta sozinho — você não vai
  precisar carregar mais nada" virou "o casaco dá conta sozinho". Um teste
  limita a frase da Home a 80 caracteres em toda ocasião e todo ajuste, porque
  a saída fácil quando o texto cresce é truncar, e o tipo `Look` proíbe truncar.

### Adicionado — testes

- **Runner de testes** (`npm test`, Vitest). O motor é TypeScript puro, sem
  import de React Native, então testar a regra não exige ambiente de
  renderização. Era para ser MOD-019; veio antes porque MOD-018 mexeu no núcleo
  do motor, e mudar o núcleo sem rede é aposta.
- Dezenove testes, um por ajuste — mais a garantia de que nenhum ajuste
  ressuscita o uniforme fora do trabalho.

### Alterado

- **Régua de formalidade no lugar da tabela de prioridade por ocasião**
  (DEC-019). "Camisa antes de camiseta no trabalho" deixa de ser uma linha
  escrita à mão e passa a ser consequência de camisa ser mais formal. O look
  padrão de trabalho mudou de tênis branco para bota de camurça.
- **O id do look carrega o ajuste** (DEC-020):
  `l-<ocasião>-<variante>-<ajustes>-<peças>`. Sem isso, abrir o detalhe de um
  look ajustado acusaria "peça não está mais no armário" sobre um look que
  existia meio segundo antes.
- **J2 (a manhã) fecha em v0.4, não em v0.2.** O ajuste era o último item de
  produto da jornada, mas o clima real é MOD-027. A data anterior media o item,
  não a jornada.

### Decisões

- **DEC-018** — ajuste é parâmetro do motor, não caso especial.
- **DEC-019** — régua de formalidade no lugar da prioridade por ocasião.
- **DEC-020** — o ajuste entra no id do look.

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
