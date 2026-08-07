import type { Garment, GarmentCategory, Occasion } from '@/types/wardrobe';

/**
 * A régua de formalidade.
 *
 * Cinco níveis, de 0 (moletom) a 4 (alfaiataria). Existe por dois motivos.
 *
 * O primeiro é dar em que se apoiar a "mais elegante" e "mais casual". A única
 * coisa que o motor sabia sobre uma peça era a categoria, e categoria não
 * distingue um tênis de corrida de uma bota de camurça — os dois são `calcado`.
 *
 * O segundo é que ela **substitui** a tabela de prioridade de categoria por
 * ocasião. Camisa vinha antes de camiseta no trabalho porque estava escrito na
 * tabela; agora vem porque camisa é mais formal e trabalho pede formalidade.
 * Uma regra no lugar de cinco linhas — e uma regra que responde a ajuste.
 */

const MIN = 0;
const MAX = 4;

const clamp = (value: number) => Math.min(MAX, Math.max(MIN, value));

/** Onde cada categoria começa, antes de material e feitio opinarem. */
const CATEGORY_FORMALITY: Record<GarmentCategory, number> = {
  camisa: 3,
  calca: 3,
  casaco: 2,
  calcado: 2,
  acessorio: 2,
  camiseta: 1,
  bermuda: 1,
};

/**
 * Palavras que movem a peça na régua.
 *
 * Lê nome e material juntos porque é assim que a peça é nomeada na vida real:
 * "bota" está no nome, "camurça" no material, e as duas dizem a mesma coisa.
 *
 * Uma peça pode acionar os dois lados — "tênis de couro" é formal pelo
 * material e casual pelo feitio — e nesse caso fica onde a categoria a
 * colocou. É o resultado certo: um tênis de couro é exatamente o calçado
 * mediano.
 */
const FORMAL = /alfaiataria|social|lã|linho|couro|camurça|bota|seda|blazer/i;
const CASUAL = /moletom|jeans|tênis|malha|piquê|polo|capuz|corrida|esportiv/i;

export function formalityOf(garment: Garment): number {
  const text = `${garment.name} ${garment.material ?? ''}`;

  return clamp(
    CATEGORY_FORMALITY[garment.category] +
      (FORMAL.test(text) ? 1 : 0) -
      (CASUAL.test(text) ? 1 : 0)
  );
}

/** Onde a ocasião cai na régua, antes de o usuário pedir qualquer coisa. */
const OCCASION_FORMALITY: Record<Occasion, number> = {
  trabalho: 3,
  noite: 3,
  encontro: 3,
  casual: 1,
  viagem: 1,
};

/** O alvo do look: a ocasião, deslocada pelo que o usuário pediu. */
export const formalityTargetFor = (occasion: Occasion, shift: number) =>
  clamp(OCCASION_FORMALITY[occasion] + shift);

/**
 * A ordem em que o stylist alcança as peças: **a mais próxima do alvo**.
 *
 * Não "a mais formal" — a mais próxima. Terno para tomar café é tão errado
 * quanto moletom na reunião.
 *
 * **O empate é desfeito pelo id**, e não pela ordem de chegada. Duas peças
 * igualmente formais são igualmente boas para a regra, então quem escolhia era
 * a ordem em que o armário chegou — e essa ordem é do serviço, não do motor.
 * Hoje é o mock, ordenado por categoria; amanhã é o Postgres, que não promete
 * ordem nenhuma sem `ORDER BY`. O sintoma seria um look salvo parar de abrir
 * porque o banco devolveu a bolsa antes do cinto.
 *
 * A ordem entre ids é arbitrária — `g10` vem antes de `g2` — e isso não
 * importa: o que importa é que seja **sempre a mesma**.
 *
 * A regra de uniforme **não** vive mais aqui. Ela era uma segunda chave de
 * ordenação que empurrava a peça para o fim da fila, o que só a protegia na
 * primeira variante; hoje é um filtro por vaga no compositor, que é o que
 * DEC-011 sempre quis dizer.
 */
export function rankFor(target: number) {
  return (a: Garment, b: Garment) =>
    Math.abs(formalityOf(a) - target) - Math.abs(formalityOf(b) - target) ||
    a.id.localeCompare(b.id);
}
