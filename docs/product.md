# Produto

## O que é

O Modo é um personal stylist digital. Ele transforma o guarda-roupa da pessoa em
recomendações de look.

> O Modo revela a melhor escolha.

## O que não é

Não é um organizador de roupas. Não é um gerador de combinações. Não é um chat.

O usuário **nunca conversa com uma IA**. A IA trabalha nos bastidores, e o
produto deve parecer que existe um stylist profissional cuidando dele.

**A sensação de "ChatGPT para moda" é o principal risco do produto.** A defesa é
arquitetural, não cosmética: a IA nunca escolhe o look sozinha — ela ranqueia e
escreve sobre candidatos que um motor determinístico já validou.

## Princípios

1. **A IA faz o trabalho, o usuário confirma.** Nenhuma tela mostra campo vazio
   quando poderia mostrar campo preenchido.
2. **Toda tela é extremamente simples.** Uma recomendação, não uma lista.
3. **Poucos campos.** Escolha, não digitação.
4. **Premium.** Espaço, tipografia forte, poucas ações.
5. Toda decisão de UX responde: reduz esforço? aumenta confiança? parece
   consultoria?

## Regras de produto

Estas não são preferências. São regras que a implementação precisa garantir.

| Regra                                         | Onde vive                            |
| --------------------------------------------- | ------------------------------------ |
| Uniforme nunca aparece em look casual         | `composer.ts`                        |
| Uniforme vai por último mesmo no trabalho     | `composer.ts` (DEC-011)              |
| Todo look tem explicação — nunca só roupa     | tipo `Look`, `rationale` obrigatório |
| Sem peça estrutural, não recomenda            | `composer.ts`                        |
| A Home sempre entrega um look, mesmo sem rede | camada determinística local          |
| Nada de senha em nenhum caminho de login      | `AuthService`                        |

## Tom de voz

Claro, direto, humano, inteligente, inspirador. O stylist entende, sugere e
confia.

**A regra prática:** o texto fala do dia do usuário, não da composição. "Ancora
o look", "abre o contraste" e "quebra a formalidade" são laudo técnico — o
usuário não sabe o que fazer com isso.

✅ _"Comecei pela camisa preta: ela aguenta o dia inteiro sem marcar nada."_
❌ _"A camisa preta ancora o look e a alfaiataria abre o contraste."_

Se a frase caberia numa etiqueta de vitrine, reescreva.

**Estado vazio é convite, não constatação.** "Seu guarda-roupa tem mais
potencial do que parece", nunca "Nenhuma peça encontrada".

## Telas

| Tela            | O que faz                                       |
| --------------- | ----------------------------------------------- |
| Login           | Entrada sem senha. Primeira impressão da marca. |
| Home            | Uma recomendação, com explicação e três ações.  |
| Detalhe do look | Onde a recomendação se justifica por inteiro.   |
| Armário         | A coleção, em duas colunas.                     |
| Nova peça       | Fotografe, deixe ler, confirme.                 |
| Looks           | O que foi salvo.                                |
| Perfil          | Quem você é para o produto, e sair.             |

## Identidade

**FRAME** — enquadrar para revelar o essencial.

Minimalista, editorial, muito espaço em branco, pouca informação. As roupas são
protagonistas. Nunca visual de marketplace. Nunca visual de startup de IA.

Referências: Apple, COS, Notion, Aesop, Arc Browser.

Detalhes de paleta, tipografia e motion em [`design-system.md`](./design-system.md).

## Fora de escopo até o v1.0

Compartilhamento social, comércio, múltiplos armários, recomendação para outra
pessoa. São produtos diferentes, e cada um deles diluiria a tese.
