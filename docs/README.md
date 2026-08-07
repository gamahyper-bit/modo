# Documentação

```
docs/
  vision.md          pilares e princípios permanentes — quase não muda
  decisions.md       DEC-*, a ponte entre produto e engenharia
  changelog.md       o que mudou em cada versão
  brand/             quem o Modo é
  product/           o quê e por quê
  engineering/       como
```

## Comece por aqui

| Se você quer…                 | Leia                                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| entender o produto            | [`vision.md`](./vision.md) → [`brand/manifesto.md`](./brand/manifesto.md)                     |
| saber o que vem a seguir      | [`product/journeys.md`](./product/journeys.md) → [`product/backlog.md`](./product/backlog.md) |
| escrever qualquer texto       | [`brand/copy.md`](./brand/copy.md)                                                            |
| pegar uma tarefa              | [`engineering/process.md`](./engineering/process.md) → o item no backlog                      |
| mexer no código               | [`engineering/architecture.md`](./engineering/architecture.md)                                |
| mexer na interface            | [`engineering/design-system.md`](./engineering/design-system.md)                              |
| entender uma escolha estranha | [`decisions.md`](./decisions.md)                                                              |

## Marca

| Documento                              | Responde                                     |
| -------------------------------------- | -------------------------------------------- |
| [`manifesto.md`](./brand/manifesto.md) | por que o Modo existe e o que promete        |
| [`voice.md`](./brand/voice.md)         | como o Modo fala                             |
| [`visual.md`](./brand/visual.md)       | como o Modo se parece                        |
| [`copy.md`](./brand/copy.md)           | regras práticas para escrever qualquer texto |

## Produto

| Documento                              | Responde                                   |
| -------------------------------------- | ------------------------------------------ |
| [`product.md`](./product/product.md)   | o que é, o que não é, regras de produto    |
| [`journeys.md`](./product/journeys.md) | as cinco jornadas e o estado de cada uma   |
| [`epics.md`](./product/epics.md)       | os sete eixos de valor                     |
| [`roadmap.md`](./product/roadmap.md)   | versões, milestones e o que fecha cada uma |
| [`backlog.md`](./product/backlog.md)   | fonte única das entregas                   |

## Engenharia

| Documento                                                        | Responde                                         |
| ---------------------------------------------------------------- | ------------------------------------------------ |
| [`process.md`](./engineering/process.md)                         | git flow, DoR, DoD, estimativas                  |
| [`architecture.md`](./engineering/architecture.md)               | camadas, portas, estado, navegação               |
| [`design-system.md`](./engineering/design-system.md)             | tokens, componentes, armadilhas                  |
| [`architecture-review.md`](./engineering/architecture-review.md) | onde a arquitetura vai doer, e o que fazer antes |
| [`api.md`](./engineering/api.md)                                 | portas de serviço e Edge Functions               |
| [`database.md`](./engineering/database.md)                       | schema, RLS, Storage                             |

## Regras da documentação

**Nunca deixe para depois.** Toda entrega atualiza backlog, changelog e o que
mais tiver mudado, no mesmo PR. Documentação que não acompanha o código vira
mentira — e mentira atrapalha mais que ausência.

**Decisão nunca é apagada.** Quando muda, ganha entrada nova em `decisions.md` e
a antiga é marcada como Substituída.

**A visão quase não muda.** Se `vision.md` estiver mudando com frequência, ou o
produto perdeu o rumo ou o texto está descrevendo tática em vez de princípio.
