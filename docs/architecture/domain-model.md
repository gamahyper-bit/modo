# Domain Model

A referência para as integrações que vêm — Supabase, Gemini, clima e imagens.
**Se este documento estiver certo, o resto se encaixa.**

---

## As entidades

| Entidade       | Identidade                    | Natureza        | Depende de IA |
| -------------- | ----------------------------- | --------------- | ------------- |
| **Garment**    | própria, atribuída pelo store | mutável         | ao nascer     |
| **LookRecipe** | própria, derivada do conteúdo | imutável        | nunca         |
| **Look**       | a da receita                  | projeção        | na fala       |
| **Weather**    | nenhuma                       | contexto do dia | nunca         |
| **Session**    | própria, do provedor          | mutável         | nunca         |

---

## Garment — a peça

**Tem identidade própria**, e ela vem de quem guarda: `g17` no armário em
memória, `uuid` no Postgres. O domínio trata o id como **opaco** — não interpreta,
não gera, não ordena por ele. É o que permite trocar o store sem tocar no motor.

**É mutável.** O usuário corrige a cor, o nome, a ocasião (MOD-023). O que não
muda é o id: corrigir uma peça não cria outra.

**Depende de IA ao nascer, não depois.** `GarmentAnalysis` é uma **sugestão** —
a IA lê a foto e propõe atributos, e nada entra no armário sem o usuário
confirmar. Depois disso a peça é dado do usuário, não saída de modelo.

---

## LookRecipe — a escolha

```ts
type LookRecipe = {
  occasion: Occasion;
  adjustments: LookAdjustment[];
  garmentIds: string[];
};
```

**É a entidade central, e a menos óbvia.** Um look **é uma receita**, não um
registro (DEC-028): para qual ocasião, sob qual pedido do usuário, com quais
peças. Nada mais.

**A identidade é derivada do conteúdo.** Duas receitas com os mesmos três campos
são a mesma receita — não existe "duas instâncias do mesmo look". Serializada,
vira o id que viaja pela rota, pelo cache e pelo banco:

```
l-trabalho-_-g1.g6.g9.g12.g13
l-trabalho-mais-elegante-g1.g5.g9.g12.g13
```

**É imutável.** Editar uma receita é escrever outra. Salvar duas vezes a mesma é
salvar uma vez.

**Nunca depende de IA.** É a regra mais importante deste documento. Se um texto
gerado por modelo participasse da identidade, dois looks idênticos seriam
diferentes por acaso, e nenhum look salvo sobreviveria a uma segunda chamada.

**O que ficou de fora, e por quê:**

| Fora da receita | Por quê                                                       |
| --------------- | ------------------------------------------------------------- |
| A variante      | é o botão que o motor gira para enumerar, não a escolha       |
| O clima         | influenciou a escolha; as peças já estão listadas             |
| O texto         | é consequência da escolha, e vai deixar de ser determinístico |
| A data          | duas manhãs iguais vestem a mesma coisa                       |

---

## Look — a projeção

`Look` é o que a tela recebe: a receita **resolvida** — peças de verdade em vez
de ids — mais o clima de agora e a fala do stylist.

**Não tem identidade própria.** Usa a da receita.

**É totalmente reconstruível**, e é reconstruído a cada exibição:

```
receita  +  armário de agora  +  clima  ─→  Look
```

Uma peça que saiu do armário é detectada por **ausência** ao resolver os ids —
não por refazer a escolha e torcer para o resultado bater.

**A fala depende de IA** — hoje templates em `copy.ts`, amanhã o Gemini
(MOD-026). Por isso `moment`, `mood`, `summary` e `rationale` são **derivados,
cacheáveis e descartáveis**: podem ser recalculados infinitas vezes, e duas
frases diferentes sobre as mesmas peças continuam sendo o mesmo look.

> A separação em duas camadas — **decisão** e **narrativa** — está descrita aqui
> e ainda não está no código. É o MOD-039.

---

## Weather — o contexto

**Não tem identidade.** É valor: temperatura e condição.

Entra na escolha (limiares de casaco e bermuda) e na fala ("montei para 12
graus"). Não entra na identidade: um look montado num dia frio é o mesmo look se
você o abrir num dia quente — as peças são as mesmas.

O clima **do dia em que o look foi salvo** fica registrado no banco, para que a
explicação possa ser reescrita com o clima que havia. É metadado de
reconstrução, não identidade.

---

## Session — quem está usando

**Identidade própria**, atribuída pelo provedor de autenticação. **Mutável**:
entra, sai, expira, renova. É a única entidade cujo ciclo de vida o app não
controla.

Não participa de nenhuma outra identidade. Duas pessoas com o mesmo armário
teriam os mesmos looks — o que é verdade, e é por isso que o isolamento é
responsabilidade da RLS, não do id.

---

## O que isso decide para cada integração

| Integração   | O que este modelo já responde                                                 |
| ------------ | ----------------------------------------------------------------------------- |
| **Supabase** | `looks` guarda `recipe_id` e nada de resultado; `id uuid` é chave de linha    |
| **Gemini**   | a IA escreve sobre uma receita pronta e **nunca** altera a receita            |
| **Clima**    | entra como valor na composição e na fala; fica registrado, não identifica     |
| **Imagens**  | a foto pertence à peça, não ao look — o look não tem foto própria a persistir |

---

## As regras, em cinco linhas

1. **Identidade é escolha, nunca narrativa.**
2. **Receita é imutável; look é projeção.**
3. **Tudo que a IA escreve é descartável.**
4. **Id de peça é opaco** — quem o gera é o store.
5. **Reconstruir nunca refaz a escolha** — resolve as peças que a receita nomeia.
