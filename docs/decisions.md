# Decision log

Decisões que custariam caro para redescobrir. Cada uma registra o motivo, o que
foi considerado e o que a decisão passou a custar.

Uma decisão nunca é apagada. Quando muda, ganha uma nova entrada que substitui a
anterior, e a antiga é marcada como **Substituída**.

---

## DEC-001 — Instrument Serif no lugar de PP Editorial New

**Data.** 2026-08-05 · **Status.** Ativa

O guia de marca especifica _PP Editorial New_ no display. É fonte comercial da
Pangram Pangram e não pode ser embarcada sem licença paga.

**Alternativas.** Comprar a licença (bloquearia o desenvolvimento até a compra);
usar uma sans no display (destruiria o caráter editorial da marca); Playfair
Display ou Bodoni Moda (mais decorativas, menos próximas do original).

**Impacto.** O display aponta para uma constante única em
`src/theme/typography.ts`. Comprar a licença depois é uma linha. Enquanto isso,
a marca renderiza com caráter equivalente e licença livre.

---

## DEC-002 — Recomendação em duas camadas

**Data.** 2026-08-05 · **Status.** Ativa

A escolha do look não é uma chamada de LLM. Um motor determinístico em
TypeScript filtra o armário por ocasião, estação, clima e regra de uniforme, e
monta candidatos válidos. A IA recebe candidatos já válidos e faz só o que LLM
faz bem: ranquear e escrever.

**Alternativas.** Mandar o armário inteiro para o Gemini e pedir um look
(simples de escrever, caro de operar, impossível de garantir); regras puras sem
IA (perde a voz de consultoria, que é o produto).

**Impacto.** Latência baixa, custo previsível, e a Home sempre entrega um look —
mesmo sem rede. É também a defesa contra o produto parecer "ChatGPT de moda": a
IA nunca escolhe sozinha.

---

## DEC-003 — O Gemini só é chamado por Edge Function

**Data.** 2026-08-05 · **Status.** Ativa

Nenhuma chamada à API do Gemini parte do app.

**Alternativas.** Chave no app com restrição por bundle id (contornável, e um
bundle de React Native é extraível); proxy próprio (mais infraestrutura para o
mesmo resultado).

**Impacto.** Uma ida e volta a mais por chamada. Em troca, a chave nunca sai do
servidor e trocar de modelo não exige publicar versão nova na loja.

---

## DEC-004 — Componentes com StyleSheet, telas com NativeWind

**Data.** 2026-08-05 · **Status.** Ativa

O design system usa `StyleSheet` alimentado pelos tokens. Classes utilitárias
ficam para layout de tela.

**Alternativas.** NativeWind em tudo (estilo animado precisa ser objeto, e
classe em string troca erro de compilação por erro silencioso em runtime);
StyleSheet em tudo (perde a agilidade de compor layout de tela).

**Impacto.** Duas formas de escrever estilo no mesmo projeto — custo real de
consistência, mitigado por uma regra clara de qual usar onde. Os tokens
continuam sendo fonte única nos dois casos.

---

## DEC-005 — Teto de 280 ms verificado em runtime

**Data.** 2026-08-05 · **Status.** Ativa

Nenhuma transição passa de 280 ms, e `motion.ts` derruba o app em
desenvolvimento se alguém subir uma duração acima disso.

**Alternativas.** Convenção documentada (some no terceiro PR); lint rule
(complexa para o ganho).

**Impacto.** A regra é verificável em vez de lembrada. Loops — indicador de
carga e skeleton — ficam de fora por não serem transições: um giro a 280 ms
pareceria pânico.

---

## DEC-006 — Família de ícones própria para vestuário

**Data.** 2026-08-05 · **Status.** Ativa

Interface vem do Lucide; vestuário é desenho nosso, no grid 24×24 do logo FRAME.

**Motivo.** O Lucide não tem calça, bermuda, casaco nem cabide. Aproximar com
"sacola" e "camisa para tudo" destruiria a leitura das categorias do armário.

**Alternativas.** Só tipografia, sem ícones (mais editorial, menos aderente ao
guia); comprar um conjunto pronto (nenhum com a mesma linguagem do logo).

**Impacto.** Oito glifos para manter. Em troca, as categorias são parte da
identidade e não um remendo. `AppIcon` esconde a costura: a tela pede
`name="calca"` sem saber de onde vem o desenho.

---

## DEC-007 — Sálvia como cor de assinatura

**Data.** 2026-08-06 · **Status.** Ativa

`#5E6B57`, restrita a foco de campo, item selecionado, confirmação e indicador
de carga. Nunca em botão, texto corrido ou fundo.

**Alternativas.** Azul petróleo (frio; brigaria com a base quente de areia e
off-white); seguir sem cor de assinatura (paleta acromática não cria memória).

**Impacto.** Um ponto de identidade que o usuário quase não percebe
conscientemente. Escuro o suficiente para sobreviver como traço fino sobre o
off-white.

---

## DEC-008 — O id do look carrega a composição

**Data.** 2026-08-06 · **Status.** Ativa

`l-<ocasião>-<variante>-<peças>`. O detalhe reconstrói o look a partir do id.

**Alternativas.** Guardar toda recomendação no banco (a maioria nunca é
revisitada, e viraria lixo); cache em memória (link direto pararia de funcionar
depois de fechar o app).

**Impacto.** Zero escrita para recomendações efêmeras, e link direto funciona.
Custo: se uma peça sair do armário, o look correspondente deixa de abrir — o que
é tratado como "este look usava uma peça que não está mais no armário".

---

## DEC-009 — Modo de demonstração como cidadão de primeira classe

**Data.** 2026-08-06 · **Status.** Ativa

Sem chaves do Supabase no ambiente, o app roda inteiro com dados em memória.
`hasBackend` escolhe a implementação em cada porta de serviço.

**Alternativas.** Exigir Supabase para rodar (bloquearia revisão de UX e o
primeiro `git clone`); dados falsos misturados ao código real (impossível de
remover depois).

**Impacto.** `lib/env.ts` deixou de tratar ausência de configuração como erro.
Cada serviço mantém duas implementações — custo de manutenção real, pago pela
capacidade de revisar o produto sem infraestrutura.

---

## DEC-010 — Grade do armário em duas colunas

**Data.** 2026-08-06 · **Status.** Ativa

**Motivo.** Três colunas é vocabulário de marketplace: a peça vira miniatura e a
tela vira estoque. Com duas, cada peça tem tamanho de retrato e o conjunto lê
como coleção.

**Impacto.** Menos peças acima da dobra. É a troca que "coleção, não catálogo"
exige, e foi decisão explícita de produto.

---

## DEC-011 — Uniforme por último, mesmo onde é permitido

**Data.** 2026-08-06 · **Status.** Ativa

Peça de uniforme nunca entra em look que não seja de trabalho, e mesmo no
trabalho vai para o fim da fila de escolha.

**Motivo.** A primeira regra sozinha produzia a calça do uniforme combinada com
uma camisa comum. Uniforme se veste como conjunto; misturado, não é um look.

**Impacto.** Uniforme só aparece quando não há alternativa — que é exatamente
quando a pessoa de fato vai de uniforme.

---

## DEC-012 — Git flow com main protegida

**Data.** 2026-08-06 · **Status.** Ativa

`main` sempre estável. Todo desenvolvimento em `feature/*`, `fix/*` ou
`refactor/*`, com PR e revisão antes do merge.

**Contexto.** A `main` não existia: todo o trabalho até aqui vivia numa única
branch de sessão. Ela foi criada a partir do último estado verificado
(`ba57ae4`), que tem typecheck, lint, build e fluxo completo conferidos.

**Impacto.** Nenhuma entrega futura toca `main` diretamente. Enquanto MOD-020
não existir, a proteção depende de disciplina; depois dela, de CI.

---

## DEC-013 — Todo PR entrega valor perceptível

**Data.** 2026-08-06 · **Status.** Ativa

Toda entrega precisa mudar alguma coisa para quem usa o app. Trabalho puramente
técnico não está proibido, mas passa a exigir justificativa: qual falha concreta
impede, e por que agora. No máximo **um** item de risco puro por sprint.

**Motivo.** Um projeto com processo bom e sem entrega visível parece produtivo e
não é. A régua deixa de ser "o backlog andou" e passa a ser "o produto ficou
melhor".

**Alternativas.** Alternar sprints de produto e de plataforma (cria períodos
inteiros sem valor visível); nenhuma regra (a manutenção sempre perde para o
urgente, até a qualidade cobrar a fatura de uma vez).

**Impacto.** Muda a ordenação: quando um item de risco disputa espaço com um de
produto, o de produto vai primeiro. Foi o que reordenou a sprint v0.2 — o ícone
da marca subiu à frente da CI.

O risco desta regra é adiar indefinidamente o trabalho invisível. A defesa é o
EPIC-07 existir: ele dá um lugar declarado a esse trabalho, e o limite de um por
sprint garante que ele nunca é zero.

---

## DEC-014 — Documentação separada entre produto e engenharia

**Data.** 2026-08-06 · **Status.** Ativa

`docs/product/` responde **o que** e **por quê**. `docs/engineering/` responde
**como**. Visão, decisões e changelog ficam na raiz, porque atravessam os dois.

**Motivo.** Os dois públicos leem em momentos diferentes. Quem decide escopo não
deveria atravessar detalhe de RLS; quem vai implementar não deveria caçar o
critério de aceite dentro de um documento de arquitetura.

**Alternativas.** Pasta única (funcionava com nove arquivos, não com trinta);
separar por versão (transforma documento vivo em arquivo morto).

**Impacto.** O decision log **não** foi dividido de propósito: uma decisão como
"grade de duas colunas" é de produto e de engenharia ao mesmo tempo, e separá-la
obrigaria a escolher um lado ou a duplicar. Ele é a ponte, e fica na raiz.

---

## DEC-015 — Quatro pilares acima dos princípios

**Data.** 2026-08-06 · **Status.** Ativa

Curadoria (não catálogo) · Explicação (não sugestão) · Esforço mínimo · Beleza
como função. Os cinco princípios passam a ser a tradução operacional deles.

**Motivo.** Os princípios diziam como nos comportamos, mas não no que
apostamos. Faltava a camada que explica **por que** uma tela sem explicação é um
defeito e não uma versão simplificada.

**Cada pilar carrega um lado rejeitado.** É o lado rejeitado que transforma o
pilar em régua: "curadoria" sozinho é slogan; "curadoria, não catálogo" reprova
uma tela com duas recomendações lado a lado.

**Alternativas.** Deixar só os cinco princípios (não separava aposta de
comportamento); usar os pilares no lugar deles (perderia as regras práticas do
dia a dia).

**Impacto.** Toda decisão de escopo passa a poder ser checada contra quatro
frases curtas. Os quatro foram **derivados** do material acumulado, não ditados
— se algum estiver errado, corrigir aqui é barato e corrigir depois de dez
sprints não é.

---

## DEC-016 — Planejamento orientado por jornadas

**Data.** 2026-08-06 · **Status.** Ativa

O planejamento deixa de ser por tela e passa a ser por jornada do usuário. Cinco
jornadas declaradas, cada uma com estado (`Quebrada`, `Frágil`, `Utilizável`,
`Boa`). Toda entrega declara qual jornada aproxima de utilizável.

**Motivo.** Sete telas prontas e nenhuma jornada utilizável era o estado real do
produto — e a régua anterior não mostrava isso. Uma tela pronta parece progresso;
um buraco entre duas telas não aparece em lugar nenhum.

**Alternativas.** Continuar por tela (mede produção, não utilidade); medir por
funcionalidade (mesmo problema com outro nome).

**Impacto.** A sprint passa a ser descrita como "leva J2 de Frágil para
Utilizável". Preferimos fechar uma jornada a avançar quatro pela metade.

**A tensão que isso cria.** Fechar J5 (confiar no produto) exigiria parar tudo e
fazer backend, congelando o produto por uma versão inteira. Por isso J2 fecha
primeiro: é a jornada que dá sentido às outras e está a um item de distância.

---

## DEC-017 — Impacto separado de prioridade

**Data.** 2026-08-06 · **Status.** Ativa

Cada item ganha **impacto de 1 a 5** — o quanto o usuário sente — além da
prioridade.

**Motivo.** Prioridade estava carregando dois significados ao mesmo tempo: "o
quanto isso importa para o usuário" e "o quanto isso bloqueia o projeto". São
coisas diferentes, e misturá-las escondia exatamente o tipo de item que a regra
do valor quer expor.

**Impacto.** A CI é P1 e impacto 1: bloqueia o projeto, invisível para o
usuário. Antes, a prioridade sozinha a fazia parecer relevante para quem usa o
app. Agora a distância entre as duas colunas é o próprio sinal de alerta.

---

## DEC-018 — Ajuste é parâmetro do motor, não caso especial

**Data.** 2026-08-06 · **Status.** Ativa

Cada `LookAdjustment` é traduzido, por uma tabela única em
`services/recommendation/tuning.ts`, em três parâmetros do motor: deslocamento
na régua de formalidade, graus somados à temperatura, e salto dentro de uma
categoria. `composeLook` não sabe que ajustes existem — só lê os três números.

**Motivo.** O caminho óbvio era um `if` por ajuste dentro do compositor. Seis
ajustes viram seis ramos, e o sétimo — quando ele existir — vira o sétimo. Pior:
dois ajustes ao mesmo tempo passam a depender da ordem dos ramos, que ninguém
escreveu de propósito.

**Alternativas.** Ramos no compositor (não compõe, não testa isolado);
recomposição em cima do look anterior (precisaria carregar o look anterior no
contrato do serviço, e o serviço deixaria de ser sem estado).

**Impacto.** Um ajuste novo é uma linha na tabela. Ajustes somam: dois pedidos
na mesma direção empurram mais, e opostos se cancelam — sem que ninguém escreva
essa regra em lugar nenhum. A tabela é testável sem motor e o motor é testável
sem tabela.

**O que custou.** Os três parâmetros são um vocabulário fixo. Um ajuste futuro
que não caiba neles — "sem estampa", "sem essa peça hoje" — vai exigir um
parâmetro novo, e é aí que a decisão precisa ser revisitada em vez de forçada.

---

## DEC-019 — Régua de formalidade no lugar da prioridade por ocasião

**Data.** 2026-08-06 · **Status.** Ativa

A tabela `TOP_PRIORITY`, que dizia camisa antes de camiseta no trabalho e o
inverso no casual, foi substituída por uma régua de formalidade de 0 a 4.
Cada peça recebe uma nota por categoria, nome e material; cada ocasião tem um
alvo; o motor escolhe **a peça mais próxima do alvo**, não a mais formal.

**Motivo.** "Mais elegante" não tinha em que se apoiar. A única coisa que o
motor sabia sobre uma peça era a categoria, e categoria não distingue um tênis
de corrida de uma bota de camurça — os dois são `calcado`. Sem uma régua, o
ajuste só poderia reordenar categorias, e o calçado ficaria de fora dele.

**Alternativas.** Um campo `formalidade` na peça (mais um campo para o usuário
confirmar, contra o PILAR-03); manter a tabela e tratar calçado à parte (dois
mecanismos para o mesmo problema).

**Impacto.** A tabela por ocasião deixou de existir: camisa vem antes de
camiseta no trabalho porque camisa é mais formal e trabalho pede formalidade —
uma regra no lugar de cinco linhas. O look padrão de trabalho mudou de tênis
branco para bota de camurça, que é a escolha certa e não era a que estava sendo
feita.

**O que custou.** A nota sai de palavras no nome e no material, então uma peça
mal nomeada é mal pontuada. É aceitável enquanto a leitura da peça é mock; com
MOD-025 a IA passa a preencher esses campos, e a régua fica tão boa quanto ela.

**Efeito colateral que revelou um defeito.** Ao alcançar a bota, a régua
produziu "o bota de camurça": o artigo saía da categoria, e `calcado` é
masculino. O artigo passou a sair do nome da peça. O erro existia antes — em
"o jaqueta leve", "o bolsa de couro" — e nunca tinha aparecido porque o motor
nunca escolhia essas peças.

---

## DEC-020 — O ajuste entra no id do look

**Data.** 2026-08-06 · **Status.** Ativa · **Substitui** parte de DEC-010

O id passa de `l-<ocasião>-<variante>-<peças>` para
`l-<ocasião>-<variante>-<ajustes>-<peças>`, com `_` marcando a ausência de
ajuste. A leitura é por segmento, não por expressão regular: os ajustes têm
hífen no próprio nome.

**Motivo.** O detalhe do look reconstrói a partir do id e confere se o id bate.
Sem o ajuste no id, abrir um look ajustado recomporia o look sem ajuste, os ids
não bateriam e a tela acusaria "esse look usava uma peça que não está mais no
armário" — uma mentira, sobre um look que existia meio segundo antes.

**Alternativas.** Guardar o look num cache por id (o id deixaria de ser
autossuficiente, que é a única razão de ele existir); códigos curtos em vez dos
nomes dos ajustes (id ilegível, e a legibilidade do id já pagou por si mais de
uma vez em depuração).

**Impacto.** O id continua sendo tudo que o motor precisa para produzir o mesmo
look de novo, sem banco. Ids gerados antes desta mudança deixam de resolver —
não custa nada, porque nada é persistido ainda. Depois de MOD-029 custaria, e é
por isso que a mudança precisava vir antes dela.

---

## DEC-021 — Ícone gerado a partir da geometria da marca

**Data.** 2026-08-06 · **Status.** Ativa

O símbolo FRAME vira números em `src/theme/brand.ts` — grid, path da moldura,
espessura do traço, posição e corpo do M. O componente `Logo` desenha a partir
deles em tela; `scripts/brand-assets.ts` desenha a partir deles em PNG, por
`npm run brand`. Um teste compara os arquivos em disco com o que a geometria
produz agora.

**Motivo.** Ícone de app é o ativo que mais envelhece sem ninguém notar. O logo
em tela acompanha o código; o PNG da tela inicial fica no desenho do dia em que
foi exportado, e a diferença só aparece quando alguém põe os dois lado a lado
numa apresentação. O item pedia "derivar do `Logo`" — na prática isso
significaria importar um componente React dentro de um script Node, que não
funciona. O que os dois precisam compartilhar não é o componente: são os
números.

**Alternativas.** Exportar do Figma (o desenho passa a viver fora do
repositório, e a divergência vira invisível de novo); renderizar o componente
com React Native Web e capturar por navegador (funciona, mas amarra a geração da
marca a um navegador headless — dependência pesada demais para desenhar cinco
quadrados).

**Impacto.** Mudar a marca é mudar um número e rodar um comando. O teste torna o
esquecimento visível. A cadeia continua até a tipografia: o M é fonte real, e
comprar a licença de PP Editorial New (DEC-001) troca o ícone junto.

**O que custou.** Uma dependência de desenvolvimento a mais (`@resvg/resvg-js`,
SVG→PNG) e `allowImportingTsExtensions` no tsconfig, para o script rodar direto
no Node sem etapa de build. O teste compara bytes, então subir a versão do
renderizador vai reprovar — e o conserto é `npm run brand`, que é exatamente o
que se quer que aconteça.

**Um efeito colateral bom.** As margens de cada ativo passaram a ser explícitas
e justificadas no código: o iOS recorta em cantos arredondados a partir de uns
22% da borda, o Android recorta a camada da frente com máscara variável, e o
favicon vive com 16 pixels. Antes eram três arquivos sem procedência.

---

## DEC-022 — O ícone é um ativo próprio, não o logo reduzido

**Data.** 2026-08-07 · **Status.** Ativa · **Estende** DEC-021

A geometria da marca passa a ter **dois graus ópticos**. `BRAND_DISPLAY` é a
marca como foi desenhada; `BRAND_COMPACT` engrossa a moldura de 2,5 para 4,
aumenta o M de 32 para 35 e abre o vão de 30 para 26. `geometryFor(size)`
escolhe pelo tamanho, com o corte em 40 pontos.

**Motivo.** O símbolo é traço fino fechado por um M em serifa de contraste alto.
Grande, é a marca inteira; pequeno, o traço vira cinza e as hastes finas somem
antes dele. A redução não degrada o desenho de forma uniforme — degrada
justamente as duas coisas que fazem o símbolo ser reconhecível.

**As folgas contam tanto quanto o traço.** Engrossar a moldura sem abrir o vão
piora: as pontas quadradas avançam para dentro da abertura e encostam no M. As
folgas do vão saíram de 2,6 / 1,8 / 2,6 para 3,8 / 2,6 / 2,9. Espaço em branco é
o que fecha primeiro quando a tinta espalha.

**Alternativas.** Só engrossar o traço (o M continuaria quebrando, e a colisão
com a moldura apareceria); desenhar um ícone diferente, sem moldura (resolveria
a legibilidade e destruiria o reconhecimento — a moldura **é** a marca);
aceitar a perda abaixo de 40 (é o launcher, o lugar de maior exposição do
produto).

**Impacto.** A moldura passou a ser gerada por parâmetros em vez de escrita como
um literal de path — dois literais seriam duas formas que por acaso se parecem, e
que divergiriam no primeiro ajuste. Um teste garante que o grau de marca
continua produzindo exatamente `M30 58 L6 58 L6 6 L58 6 L58 30`: se aquilo mudar,
alguém mexeu na marca, não no ícone.

**Efeito colateral: um defeito de anos.** Ao medir o traço renderizado no
cabeçalho para conferir o grau, o valor deu 3 px onde deveriam ser 5. O `Logo`
convertia `strokeWidth` para pixels, mas `strokeWidth` está em unidades do
`viewBox` — e o `viewBox` de 64 já é escalado para `size` pelo próprio SVG. O
traço saía a `size/64` do peso desenhado: 44% no cabeçalho. É a razão de a marca
em tela sempre ter parecido mais fina que o ícone exportado, e ninguém tinha
medido para descobrir.

**O que custou.** Duas geometrias para manter em vez de uma. O risco real não é
o custo — é a tentação de deixá-las divergir com o tempo até virarem duas
marcas. O teste que compara traço, corpo e vão entre os dois graus existe para
que a divergência seja uma escolha explícita, e não um acúmulo.

---

## DEC-023 — A escolha do look não depende de acidentes

**Data.** 2026-08-07 · **Status.** Ativa

Duas mudanças no motor, com a mesma raiz: o look que sai precisa ser função da
**regra**, e não de fatos incidentais.

**A variante virou base mista.** Antes, a mesma variante escolhia a mesma
posição em todas as listas — as peças giravam em bloco. Com uma camisa, duas
calças, dois calçados e dois acessórios existem oito combinações, e só duas eram
alcançáveis: o período de um giro em bloco é o mínimo múltiplo comum dos
tamanhos, não o produto. Hoje a variante é lida como um número em base mista e
cada vaga consome o seu dígito, então percorrer as variantes percorre o produto.

**O empate de formalidade é desfeito pelo id.** Duas peças igualmente formais
são igualmente boas para a régua, então quem escolhia era a ordem em que o
armário chegou. Essa ordem é do serviço, não do motor: hoje é o mock, ordenado
por categoria; amanhã é o Postgres, que não promete ordem nenhuma sem `ORDER
BY`. O sintoma seria um look salvo parar de abrir porque o banco devolveu a
bolsa antes do cinto.

**Motivo.** O primeiro defeito era visível e o usuário sentia: "Gerar outro"
repetia com seis alternativas guardadas que ele não sabia alcançar. O segundo é
invisível hoje e só apareceria depois do MOD-028, quando já houvesse looks
salvos para quebrar — foi encontrado por um teste que compara o look montado a
partir do armário com o montado a partir do armário invertido.

**Alternativas.** Sortear em vez de enumerar (perde o determinismo, e sem
determinismo o id não reconstrói); guardar a lista de looks já mostrados no
serviço (estado de sessão dentro de uma porta que vai virar rede).

**Impacto.** O trabalho passou de duas para oito combinações no armário de
demonstração. O `ORDER BY` do Postgres deixa de importar para a recomendação.

---

## DEC-024 — Uniforme é filtro por vaga, não ordenação

**Data.** 2026-08-07 · **Status.** Ativa · **Substitui a implementação de** DEC-011

Peça de uniforme sai da lista de candidatos de uma vaga sempre que aquela vaga
tem alternativa comum. Só quando a categoria inteira é de uniforme é que ela
entra.

**Motivo.** DEC-011 dizia a coisa certa — "essas peças só entram quando não há
alternativa" — e implementava outra: uma segunda chave de ordenação que empurrava
o uniforme para o fim da fila. Fim da fila protege a primeira variante e mais
nada. Na segunda, "gerar outro" entregava a polo do trabalho com calça de
alfaiataria; na terceira, a calça do uniforme com camisa comum. **É exatamente o
acidente que a decisão original existia para impedir**, e ele estava acontecendo
desde que o botão existe.

**Alternativas.** Marcar o look inteiro como "de uniforme" e compor os dois
mundos separados (mais expressivo, e resolve o dia em que houver dois uniformes
— não é hoje); deixar como estava e documentar a mistura como aceitável (é a
peça que o usuário mais reconhece como errada).

**Impacto.** `rankFor` ficou com uma chave só, e a regra saiu da ordenação para
um lugar onde ela é legível. No armário de demonstração o uniforme deixou de
aparecer no trabalho, porque há camisa e calça comuns — que é o comportamento
que a decisão sempre descreveu.

---

## DEC-025 — O id tem um dono, e a repetição se compara por assinatura

**Data.** 2026-08-07 · **Status.** Ativa · **Estende** DEC-020

O formato do id do look vive em `services/recommendation/lookId.ts` — escrita,
leitura e assinatura no mesmo módulo. E "já mostrei este look?" passa a comparar
a **assinatura** (`ocasião-ajustes-peças`), não o id inteiro.

**Motivo.** O formato nasceu com o compositor escrevendo e o serviço de looks
lendo, cada um com a sua metade da regra — e duas metades de um formato divergem
no primeiro segmento novo. Foi o que aconteceu em MOD-018: acrescentar o ajuste
exigiu mexer nos dois lados, e errar em um deles produziria a tela acusando "peça
não está mais no armário" sobre um look que existe.

**A assinatura resolve um defeito mais sutil.** O id carrega a variante, então
duas variantes que caem na mesma combinação são dois ids para a mesma roupa.
Comparando por id, "Gerar outro" anunciava um look novo entregando a roupa de
ontem com outro número — e o laço que procura alternativas nunca reconhecia que
tinha dado a volta.

**Alternativas.** Tirar a variante do id (o texto do stylist depende dela);
normalizar o id para a menor variante equivalente (esconde a variante real e
complica a reconstrução).

**Impacto.** Um lugar só sabe o formato, e um teste faz a ida e a volta. O
serviço percorre variantes até a assinatura repetir, o que substitui um teto de
oito escrito à mão que cabia no armário de demonstração por coincidência.

---

## DEC-026 — A Definition of Done é o que a CI roda

**Data.** 2026-08-07 · **Status.** Ativa

`.github/workflows/ci.yml` executa, em todo PR para `main`, os seis passos que
até aqui eram conferidos à mão: instalar com o lock, formatação, tipos, lint,
testes e build. A ordem é de custo crescente — o que reprova barato vem antes.

**Motivo.** Sete critérios manuais não sobrevivem a dez PRs. O modo de falha é
conhecido e não tem nada de exótico: alguém abre um PR com lint sujo numa
sexta-feira, o revisor confia, e `main` deixa de ser estável — que é a única
coisa que o git flow inteiro existe para garantir.

**`npm ci`, e não `npm install`.** Instala exatamente o que está no lock. Um PR
que só passa porque resolveu uma versão diferente da que o revisor viu não
passou, e a diferença aparece na máquina de outra pessoa.

**O que ficou de fora, de propósito.** Screenshot, documentação atualizada e
status no backlog continuam humanos. São critérios de julgamento, e uma
verificação automática ruim para eles é pior do que nenhuma: passa a impressão
de estar coberto.

**Alternativas.** Rodar tudo em paralelo (mais rápido, mas o log fica confuso e o
custo de um PR errado é seis jobs vermelhos em vez de um passo); rodar só nos
pushes para `main` (descobrir o problema depois do merge é descobrir tarde).

**Impacto.** A CI só vira barreira quando o check `Definition of Done` for
exigido nas regras do repositório. Enquanto não for, o workflow roda, mostra o
resultado e não impede nada — o que é pior que não ter CI, porque parece que
tem.

**O que custou.** O Node ficou preso na major 22: `scripts/brand-assets.ts` roda
direto no Node, sem etapa de build, e isso depende do apagamento de tipos que só
existe a partir do 22.

---

## DEC-027 — Nenhuma abstração por antecipação

**Data.** 2026-08-07 · **Status.** Ativa

Toda abstração justifica a existência por um **uso atual**, ou por um **uso
planejado e documentado no backlog**. Cada interface, serviço e camada é
classificável em `Essencial`, `Temporária` ou `Candidata à remoção` — e
`Temporária` precisa apontar o item que a encerra.

**Motivo.** Generalidade escrita antes do segundo caso de uso quase sempre
adivinha o eixo errado. O custo não é o código: é que todo mundo passa a
programar em volta do palpite, e desfazê-lo depois exige mexer em tudo que se
apoiou nele.

**A revisão arquitetural achou três casos**, todos no design system: `Modal`
exportado e usado por ninguém, `Badge` visível só na galeria, `EmScaffold` nem
exportado. `Badge` é o mais instrutivo — foi feito para contador e selo, que o
PILAR-05 proíbe. Nasceu contrariando um princípio, e a galeria deu a ele a
aparência de que servia para alguma coisa.

**Alternativas.** Deixar como estava e limpar antes do lançamento (é quando
ninguém tem tempo); marcar como obsoleto em vez de remover (obsoleto que fica é
igual a não obsoleto).

**Impacto.** A galeria deixa de ser lugar seguro para componente sem uso: estar
lá passa a ser evidência de disponibilidade, não desculpa para existir.

**O que custou.** Um pouco de retrabalho quando um caso de uso aparecer para
algo que foi removido. Aceito: reescrever um componente pequeno é mais barato
que carregar cinco anos de abstrações que ninguém sabe se estão em uso.

---

## DEC-028 — Um look é uma receita, não um registro

**Data.** 2026-08-07 · **Status.** Ativa · **Substitui** DEC-020 e DEC-025

O motor produz uma **receita reprodutível**: ocasião, ajustes e peças. É isso
que identifica um look, é isso que o banco guarda, e é a partir disso que tudo
o mais é derivado.

Em consequência:

- a identidade é determinística e vem do conteúdo — duas receitas iguais são o
  mesmo look, e não duas instâncias dele;
- reconstruir produz exatamente as mesmas peças enquanto o armário for
  compatível;
- **texto gerado por IA nunca participa da identidade**;
- `moment`, `mood`, `summary` e `rationale` passam a ser derivados, cacheáveis e
  descartáveis;
- **a variante saiu do id.** Ela é o botão que o motor gira para enumerar
  combinações, não a escolha.

**Motivo.** A revisão arquitetural (MOD-037) achou o app e o banco discordando
sobre o que identifica um look: no app, uma string que carrega a composição; no
schema, um `uuid` com tabela de ligação. Dois modelos incompatíveis do mesmo
conceito, e MOD-028/029 bateriam neles de frente.

O segundo motivo é mais fundo e independe de persistência. `rebuild` **recompunha
o look inteiro** e conferia se o id batia. Isso só funciona enquanto o texto for
determinístico — com o Gemini, duas chamadas com a mesma entrada não devolvem a
mesma frase, e a comparação deixaria de significar o que significava.

**Alternativas.** Look como registro, com o texto congelado no banco (perde-se a
capacidade de reescrever a explicação, e um look salvo vira uma fotografia que
envelhece); guardar receita **e** resultado (duas verdades sobre a mesma coisa, e
a pergunta "qual está certa" sem resposta).

**Impacto — o que sumiu.** Tirar a variante do id eliminou a "assinatura"
paralela criada em DEC-025: dois ids diferentes não podem mais vestir a mesma
roupa, então **o id é a assinatura**. E `mockLookService` deixou de importar o
compositor: ele guarda ids de receita, e quem reproduz a receita é a porta da
recomendação, por `rebuild`.

**O que custou.** A fala do stylist escolhia a leitura pela variante, e precisou
de outra âncora — passou a derivar das próprias peças, o que é mais correto: o
mesmo conjunto lê do mesmo jeito.

**O que fica em aberto.** As peças aparecem duas vezes no banco — dentro de
`recipe_id` e em `look_garments`. É deliberado: a string é a identidade que
viaja, as linhas são a integridade que o Postgres sabe verificar. Se divergirem,
quem manda é `recipe_id`.
