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
