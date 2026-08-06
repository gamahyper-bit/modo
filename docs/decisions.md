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
