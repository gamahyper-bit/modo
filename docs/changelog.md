# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).
Versionamento por marcos do [roadmap](./product/roadmap.md), não semântico — o
produto ainda não tem API pública.

Toda feature mesclada atualiza este arquivo no mesmo PR.

---

## [Não lançado]

### Corrigido — o motor escolhia por acidente (MOD-019)

Quatro defeitos, todos encontrados pelos testes desta entrega. Três deles o
usuário sentia.

- **Uniforme misturado com peça comum.** DEC-011 dizia que peça de uniforme só
  entra quando não há alternativa, mas implementava isso como ordenação — e o
  fim da fila só protege a primeira variante. No segundo "gerar outro" do
  trabalho, a polo do uniforme vinha com calça de alfaiataria. Hoje é filtro por
  vaga (DEC-024): a peça sai dos candidatos sempre que aquela vaga tem
  alternativa comum.
- **"Gerar outro" alcançava duas das oito combinações.** A mesma variante
  escolhia a mesma posição em todas as listas, então as peças giravam em bloco e
  só o mínimo múltiplo comum dos tamanhos era alcançável. A variante virou um
  número em base mista, com um dígito por vaga (DEC-023) — percorrer as
  variantes passou a percorrer o produto.
- **A repetição era comparada pelo id, que carrega a variante.** Duas variantes
  caem na mesma combinação assim que uma lista dá a volta, então o produto
  anunciava um look novo entregando a mesma roupa com outro número. A comparação
  passou a ser por **assinatura** — ocasião, ajustes e peças (DEC-025).
- **A escolha herdava a ordem de chegada do armário.** Duas peças igualmente
  formais empatavam na régua, e quem decidia era a ordem da lista — do serviço,
  não do motor. Invisível hoje; depois do MOD-028 seria um look salvo parando de
  abrir porque o Postgres devolveu a bolsa antes do cinto. O empate passou a ser
  desfeito pelo id (DEC-023).

### Adicionado — cobertura do motor (MOD-019)

- **Sessenta testes**, contra trinta antes: uniforme, limiares de casaco e
  bermuda, armário incompleto, determinismo, independência da ordem do armário,
  ida e volta do id, e o alcance real de "gerar outro".
- **O teto de oito variantes saiu.** Era um número escrito à mão que cabia no
  armário de demonstração por coincidência; com duas camisas a mais, esconderia
  dezesseis das vinte e quatro combinações. Agora o laço percorre até a
  assinatura repetir, que é o momento exato em que não há mais o que mostrar.
- `npm test` entrou na Definition of Done e no template de PR.

### Alterado — arquitetura do motor (MOD-019)

- **`services/recommendation/lookId.ts`** passa a ser o dono do formato do id:
  escrita, leitura e assinatura no mesmo módulo (DEC-025). O formato vivia
  metade no compositor e metade no serviço de looks — duas metades que divergem
  no primeiro segmento novo, e o sintoma seria a tela acusando "peça não está
  mais no armário" sobre um look que existe.
- `rankFor` ficou com uma chave só: a regra de uniforme saiu da ordenação para
  um lugar onde ela é legível.
- **Revisão crítica de fim de MOD** entrou no processo: entre concluir um item e
  abrir a próxima branch, uma passada procurando o que virou conhecimento
  duplicado, número mágico ou caso especial que já é geral.

### Adicionado — identidade própria no aparelho (MOD-021)

- **Ícone, splash e favicon com a marca**, no lugar dos ativos de template do
  Expo. O símbolo FRAME em tinta sobre off-white; no Android, ícone adaptativo
  com camada da frente transparente e versão monocromática para o tema do
  sistema.
- **O ícone é um ativo próprio, não o logo reduzido** (DEC-022). A marca tem
  dois graus ópticos: `display` (traço 2,5 · M 32 · vão 30) para 40 pontos para
  cima, e `compacto` (traço 4 · M 35 · vão 26) para o launcher, a aba do
  navegador e o cabeçalho do app. As folgas dentro do vão passam de
  2,6 / 1,8 / 2,6 para 3,8 / 2,6 / 2,9 — abrir folga importa tanto quanto
  engrossar traço, porque espaço em branco é o que fecha primeiro quando a tinta
  espalha. `geometryFor(size)` escolhe sozinho.
- **A moldura passou a ser gerada por parâmetros**, e não escrita como literal
  de path: dois literais seriam duas formas que por acaso se parecem, e que
  divergiriam no primeiro ajuste. Um teste garante que o grau de marca continua
  produzindo exatamente o path original.
- **O `splash-icon.png` é o único ativo do sistema em grau de marca** — aparece
  a 160 pontos, tamanho em que o traço fino é qualidade e não fragilidade.
- **`npm run brand` gera todos os PNG** a partir de `theme/brand.ts`, a mesma
  geometria que o componente `Logo` desenha em tela (DEC-021). O M é tipografia
  real, então o gerador carrega a fonte de display do app — comprar a licença de
  PP Editorial New (DEC-001) troca o ícone junto.
- **Um teste compara os arquivos em disco com o que a geometria produz agora.**
  Mexer na marca e esquecer de regenerar deixa de ser possível em silêncio: é o
  jeito clássico de o ícone da tela inicial virar uma versão antiga do logo.
- As margens de cada ativo passaram a ser explícitas e justificadas: o iOS
  recorta em cantos arredondados a partir de uns 22% da borda, o Android usa uma
  máscara que muda por aparelho, e o favicon vive com 16 pixels.
- `assets/android-icon-background.png` removido — órfão, o `app.json` já pinta o
  fundo do ícone adaptativo por `backgroundColor`.
- Splash de 120 para 160 px de largura: com a marca em traço fino, 120 lia como
  inacabado.

### Corrigido — o traço do logo saía a 44% do peso

- **`Logo` escalava `strokeWidth` duas vezes.** O atributo está em unidades do
  `viewBox`, e o `viewBox` de 64 já é escalado para `size` pelo próprio SVG;
  converter à mão multiplicava por `size/64` de novo. No cabeçalho, que desenha
  a 28, o traço saía a 44% do desenhado. É a razão de a marca em tela sempre ter
  parecido mais fina que o ícone exportado — apareceu ao **medir** o traço
  renderizado para conferir o grau óptico, não a olho.

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
- **DEC-021** — ícone gerado a partir da geometria da marca.
- **DEC-022** — o ícone é um ativo próprio, não o logo reduzido.
- **DEC-023** — a escolha do look não depende de acidentes.
- **DEC-024** — uniforme é filtro por vaga, não ordenação.
- **DEC-025** — o id tem um dono, e a repetição se compara por assinatura.

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
