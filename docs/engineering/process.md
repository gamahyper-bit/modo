# Processo

Como o trabalho entra, anda e sai do projeto.

---

## Git flow

`main` é sempre estável. Nunca recebe commit direto.

```
main → feature/nome → PR → review → merge (squash) → delete branch
```

**Prefixos**

| Prefixo     | Quando                             |
| ----------- | ---------------------------------- |
| `feature/`  | funcionalidade nova                |
| `fix/`      | defeito em algo que já existe      |
| `refactor/` | mudança interna sem efeito visível |

Nome curto, em inglês, com hífen: `fix/look-adjustments`,
`feature/recommendation-tests`.

**Merge por squash.** O histórico de `main` conta uma entrega por linha. O
detalhe fica no PR.

**A branch morre com o merge.** Ligue _Settings → General → Automatically delete
head branches_ para que isso aconteça sozinho.

---

## O ciclo de uma entrega

1. O item existe no backlog e passa na **Definition of Ready**
2. Cria a branch a partir de `main` atualizada
3. Muda o status para `In Progress` no backlog
4. Desenvolve
5. Abre o PR usando o template
6. Muda o status para `In Review`
7. Aguarda aprovação
8. Merge, apaga a branch
9. Atualiza changelog e marca `Done`

Nenhum passo é opcional. O 1 e o 9 são os que mais somem sob pressão, e são
justamente os que fazem o backlog continuar valendo alguma coisa.

---

## Definition of Ready

Um item só entra numa sprint quando **todos** estes forem verdade.

- [ ] **Pertence a um epic.** Se não couber em nenhum, está fora do produto ou
      falta um epic.
- [ ] **Serve a uma jornada.** Qual das
      [jornadas](../product/journeys.md) esta entrega aproxima de utilizável.
      Item que não serve nenhuma é candidato a sair do backlog.
- [ ] **Objetivo em uma frase**, do ponto de vista do usuário — não da
      implementação.
- [ ] **Valor declarado.** O que o usuário percebe depois desta entrega. Se
      nada, ver a regra do valor abaixo.
- [ ] **Confiança ou percepção de qualidade.** Qual dos dois esta entrega
      aumenta, e como. É o critério permanente de revisão — ver abaixo.
- [ ] **Impacto de 1 a 5** atribuído, com a escala do
      [backlog](../product/backlog.md).
- [ ] **Hipótese de produto declarada.** O que esta entrega permite descobrir —
      ver abaixo.
- [ ] **Critérios de aceite verificáveis.** Cada um precisa ser respondível com
      sim ou não por outra pessoa.
- [ ] **Dependências resolvidas ou identificadas**, com o item que as resolve.
- [ ] **Estimativa** P, M ou G. Item `G` é quebrado **antes** de virar branch.
- [ ] **Forma de verificação definida:** print, teste, medição.
- [ ] **Nenhuma pergunta aberta** que mude o escopo.

Item que não passa fica em `Backlog`. Item que passa vira `Ready`.

---

## Planejamento orientado por jornadas

**Não planejamos por tela. Planejamos por jornada.**

Uma tela pronta não é valor. Valor é o usuário conseguir ir do começo ao fim de
uma intenção sem travar. Cinco telas bonitas com um buraco entre elas valem
menos que três telas simples que se conectam.

As cinco jornadas estão em [`journeys.md`](../product/journeys.md), com o estado
de cada uma. Consequências práticas:

1. Todo item do backlog declara a jornada que serve.
2. Todo PR responde qual jornada aproximou de utilizável.
3. **Preferimos fechar uma jornada a avançar quatro pela metade.**
4. Uma tela pronta sem jornada fechada não conta como entrega.

A sprint deixa de ser descrita como "entrega o Armário e o Perfil" e passa a ser
"leva J2 de Frágil para Utilizável".

---

## A hipótese de produto

Todo PR responde: **qual hipótese de produto esta entrega valida?**

Uma hipótese é uma afirmação que pode estar errada e que a entrega permite
testar. Não é o objetivo repetido com outras palavras.

❌ _"A hipótese é que o usuário quer ajustar o look."_ — isso é o objetivo.
✅ _"Hipótese: o usuário confia mais na recomendação quando o ajuste responde de
forma previsível. Se depois disso ele continuar gerando outro várias vezes antes
de aceitar, o problema não é o ajuste — é a recomendação inicial."_

A hipótese boa tem três partes:

1. **A afirmação** — o que acreditamos.
2. **O que confirmaria** — qual comportamento indicaria que estávamos certos.
3. **O que refutaria** — e este é o que quase sempre falta. Uma hipótese que não
   pode ser refutada não é hipótese, é torcida.

**Por que isso importa.** O produto ainda não tem usuários, então nenhuma
hipótese será medida agora. O valor está em **escrever o critério antes** — é o
que impede racionalizar qualquer resultado depois como sucesso.

---

## A regra do valor

**Todo PR entrega valor perceptível para o produto.**

Perceptível significa: alguém que usa o app nota a diferença — uma tela nova, um
defeito que sumiu, algo que ficou mais rápido, mais bonito ou mais confiável.

### O critério de revisão

Toda entrega responde, em uma frase: **isto aumenta a confiança do usuário ou a
percepção de qualidade do produto?**

São os dois eixos que o Modo tem para vender, e nenhum outro. Não vendemos
funcionalidade — vendemos que a escolha do dia pode ser terceirizada. Quem não
confia não obedece, e quem acha o produto tosco não confia.

|                            | O que é                                         | Exemplo                                          |
| -------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| **Confiança**              | o usuário acredita que o produto sabe o que faz | o ajuste responder de forma previsível (MOD-018) |
| **Percepção de qualidade** | o produto parece feito por gente que se importa | o ícone deixar de ser template (MOD-021)         |

Um item pode servir os dois, e os melhores servem. O que não pode é não servir
nenhum e passar assim mesmo — nesse caso ele cai na justificativa abaixo, e no
limite de um por sprint.

**Este critério é permanente.** Não é da sprint v0.2: vale para toda revisão
daqui em diante, e uma entrega que não responde a pergunta não está pronta para
revisão.

Trabalho puramente técnico não está proibido. Está **sujeito a justificativa**:
um item sem valor perceptível precisa declarar

1. **Qual falha concreta ele impede.** Não "melhora a qualidade" — mas "evita
   que a regra de uniforme quebre sem ninguém perceber".
2. **Por que agora.** O que muda se ficar para a próxima versão.

E vale o limite: **no máximo um item sem valor perceptível por sprint.** Acima
disso, a sprint virou manutenção e o produto parou.

Na prática, a regra tem uma consequência de ordenação: quando um item de risco
disputa espaço com um de produto, o de produto vai primeiro — o de risco entra
no fim da sprint, quando já reduziu a incerteza do que veio antes.

---

## A revisão crítica de fim de MOD

**Concluir um item não é abrir a próxima branch.** Entre um e outro há uma
passada procurando o que pode ser **simplificado ou generalizado** no que acabou
de entrar.

Três perguntas, nesta ordem:

1. **Alguma coisa ficou sabida em dois lugares?** Duas cópias de uma regra
   divergem — é questão de quando. Se o mesmo conhecimento aparece duas vezes,
   ele quer um módulo.
2. **Algum número mágico sobrou?** Um literal sem nome é uma decisão que ninguém
   registrou. Ou vira constante com o motivo ao lado, ou vira cálculo.
3. **Algum caso especial virou caso geral?** Dois `if` que fazem a mesma coisa
   com nomes diferentes costumam ser um parâmetro esperando para nascer.

O que sair daí ou entra na branch seguinte — quando for do mesmo assunto — ou
vira item no backlog. **O que não pode é ficar na cabeça de quem escreveu.**

**Por que agora e não depois.** O backend real e a camada de IA vão dobrar a
superfície do motor. Cada duplicação que sobreviver até lá custa o dobro para
desfazer, e a essa altura já terá gente dependendo dela.

---

## Nenhuma abstração por antecipação

**Toda abstração justifica a existência por um uso atual, ou por um uso planejado
e documentado no backlog.** "Talvez seja útil" não é justificativa.

Na prática, cada interface, serviço e camada é classificável como:

| Classe                  | O que significa                                             |
| ----------------------- | ----------------------------------------------------------- |
| **Essencial**           | tem uso hoje, e tirar quebra o produto                      |
| **Temporária**          | tem uso hoje e some — ou muda — numa integração **nomeada** |
| **Candidata à remoção** | não tem uso, ou só aparece na galeria                       |

Uma abstração `Temporária` precisa apontar o item do backlog que a encerra. Sem
item, ela é candidata à remoção — foi criada por antecipação e a antecipação não
virou plano.

**Por quê.** Um sistema pequeno e claro se evolui; um sistema genérico antes da
hora se contorna. Generalidade escrita antes do segundo caso de uso quase sempre
adivinha o eixo errado, e o custo não é o código — é que todo mundo passa a
programar em volta do palpite.

**Onde isso é aplicado:** na [revisão crítica de fim de MOD](#a-revisão-crítica-de-fim-de-mod)
e em toda revisão arquitetural.

---

## Definition of Done

Uma tarefa só é `Done` com os oito:

- [ ] Código implementado
- [ ] `npm run typecheck` limpo
- [ ] `npm run lint` limpo
- [ ] `npm test` verde
- [ ] Build funcionando (`npx expo export --platform web`)
- [ ] Screenshot atualizado
- [ ] Documentação atualizada
- [ ] `docs/changelog.md` atualizado

Mais dois específicos do projeto, quando se aplicarem:

- [ ] Status alterado em `docs/product/backlog.md`
- [ ] Componente novo adicionado à `/galeria`

**Quem verifica é a CI**, não a boa vontade de quem revisa. Sete critérios
conferidos à mão não sobrevivem a dez PRs.

---

## Pull request

Use o [template](../../.github/pull_request_template.md). Sete seções:
objetivo, arquivos alterados, decisões, riscos, como testar, screenshots,
checklist.

**Sobre riscos.** "Nenhum" é resposta válida, desde que seja verdade. O que não
é aceitável é a seção em branco.

**Sobre screenshots.** Toda mudança visual precisa de print em 390×844. Ajuste
em algo existente precisa de antes e depois.

**PR pequeno.** Dez PRs pequenos valem mais que um gigante. Se o diff passou de
uns poucos arquivos coesos, provavelmente eram duas entregas.

---

## Estimativas

|     | Tamanho | Significado                                                  |
| --- | ------- | ------------------------------------------------------------ |
| `P` | pequeno | até meio dia; um arquivo ou um comportamento                 |
| `M` | médio   | um a dois dias; uma tela ou um serviço                       |
| `G` | grande  | três ou mais; **precisa ser quebrado antes de virar branch** |

`G` não é uma estimativa — é um aviso de que o item ainda não foi pensado o
bastante.

---

## Milestones

Cada versão do roadmap tem uma milestone no GitHub de mesmo nome (`v0.2`,
`v0.3`…). Todo PR aponta para a milestone da versão que ele ajuda a fechar.

A milestone responde uma pergunta que o backlog não responde bem: **quanto falta
para esta versão sair.**

Criar as milestones exige acesso de escrita às configurações do repositório:

```bash
gh api repos/gamahyper-bit/modo/milestones -f title=v0.2 \
  -f description="Armário — motor confiável e identidade completa"
```

---

## Integração contínua

`.github/workflows/ci.yml` roda em todo PR para `main` e em todo push para
`main`. Na ordem, e a ordem importa: o que reprova mais barato vem primeiro.

| Passo      | Comando                          |
| ---------- | -------------------------------- |
| Instalar   | `npm ci`                         |
| Formatação | `npm run format:check`           |
| Tipos      | `npm run typecheck`              |
| Lint       | `npm run lint`                   |
| Testes     | `npm test`                       |
| Build      | `npx expo export --platform web` |

**`npm ci`, não `npm install`.** Instala exatamente o que está no lock: um PR
que só passa porque resolveu uma versão diferente da que o revisor viu não
passou.

**Os testes cobrem mais do que código.** `scripts/brand-assets.test.ts` compara
os PNG em disco com o que a geometria da marca produz agora — mexer em
`theme/brand.ts` sem rodar `npm run brand` reprova aqui.

**O que a CI ainda não verifica:** screenshot, documentação atualizada e status
no backlog. São critérios da Definition of Done que dependem de julgamento, e
inventar uma verificação automática ruim para eles seria pior que conferir à
mão.

### O que precisa ser ligado no GitHub

A CI só vira barreira quando a regra de proteção de `main` exigir o check:

_Settings → Rules → Rulesets → `main` → Require status checks to pass_, com
**`Definition of Done`** marcado.

Sem isso o workflow roda, mostra o resultado e não impede nada — o que é pior
que não ter CI, porque parece que tem.

## Verificação visual

Não há simulador iOS em Linux. A revisão usa React Native Web:

```bash
npx expo export --platform web
# servir o export e dirigir com Playwright em 390×844
```

Fiel em layout, tipografia, cor e espaçamento. Aproxima sombras nativas e safe
areas. Não substitui aparelho — que chega com MOD-033.
