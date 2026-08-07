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
 * A ordem em que o stylist alcança as peças.
 *
 * Duas chaves, nesta ordem:
 *
 *  1. **Uniforme por último**, mesmo onde é permitido. Uniforme se veste como
 *     conjunto: a calça do uniforme com uma camisa comum não é um look, é um
 *     acidente. No fim da fila, essas peças só entram quando não há
 *     alternativa — que é exatamente quando o usuário de fato vai de uniforme.
 *  2. **Distância até o alvo de formalidade.** Não "o mais formal": o mais
 *     próximo. Terno para tomar café é tão errado quanto moletom na reunião.
 *
 * Empate mantém a ordem do armário, porque `Array.prototype.sort` é estável
 * desde ES2019 — e ordem estável é o que faz o mesmo id de look reconstruir o
 * mesmo look.
 */
export function rankFor(target: number) {
  return (a: Garment, b: Garment) =>
    Number(a.isUniform) - Number(b.isUniform) ||
    Math.abs(formalityOf(a) - target) - Math.abs(formalityOf(b) - target);
}
