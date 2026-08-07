import type { LookAdjustment } from '@/types/look';
import type { Garment, Occasion } from '@/types/wardrobe';

/**
 * A receita de um look — a identidade dele.
 *
 * ```
 * l-<ocasião>-<ajustes>-<peças>
 *
 * l-trabalho-_-g1.g6.g9.g12.g13              sem ajuste
 * l-trabalho-mais-elegante-g1.g5.g9.g12.g13  a calça reta virou alfaiataria
 * ```
 *
 * **Um look é uma receita, não um registro** (DEC-028). O que o identifica é a
 * escolha: para qual ocasião, sob qual pedido do usuário, com quais peças. Nada
 * do que o stylist **diz** entra aqui — o texto é derivado da receita, e duas
 * frases diferentes sobre as mesmas peças continuam sendo o mesmo look.
 *
 * **A variante ficou de fora.** Ela é o botão que o motor gira para enumerar
 * combinações, não parte da escolha. Enquanto ela esteve no id, duas variantes
 * que caíam nas mesmas peças eram dois looks para o produto e um só para o
 * usuário — e foi preciso uma "assinatura" paralela para desfazer a confusão.
 * Tirando a variante, o id **é** a assinatura.
 */

const PREFIX = 'l';

/** Marca a ausência de ajuste. Um segmento vazio quebraria a contagem. */
const NO_ADJUSTMENT = '_';

/** Separa ajustes entre si; `-` não serve, os nomes já têm hífen. */
const ADJUSTMENT_SEPARATOR = '+';

/** Separa as peças entre si. */
const GARMENT_SEPARATOR = '.';

/** Quantos segmentos existem antes do de ajustes. */
const FIXED_SEGMENTS = 2;

export type LookRecipe = {
  occasion: Occasion;
  adjustments: LookAdjustment[];
  /** As peças escolhidas, na ordem em que o look se lê. */
  garmentIds: string[];
};

export const recipeOf = (
  occasion: Occasion,
  adjustments: LookAdjustment[],
  garments: Garment[]
): LookRecipe => ({
  occasion,
  adjustments,
  garmentIds: garments.map((garment) => garment.id),
});

export function recipeIdFor({
  occasion,
  adjustments,
  garmentIds,
}: LookRecipe): string {
  return [
    PREFIX,
    occasion,
    adjustments.length > 0 ? adjustments.join(ADJUSTMENT_SEPARATOR) : NO_ADJUSTMENT,
    garmentIds.join(GARMENT_SEPARATOR),
  ].join('-');
}

/**
 * Lê a receita de volta, ou `undefined` se não for um id de look.
 *
 * A leitura é por segmento, e não por expressão regular, porque os ajustes têm
 * hífen no próprio nome (`mais-elegante`) e a expressão precisaria adivinhar
 * onde um termina e o próximo começa. Aqui a conta é direta: ocasião é o segundo
 * segmento, peças é o último, ajustes é tudo que sobra no meio.
 *
 * **A receita volta inteira** — inclusive as peças. É o que permite reconstruir
 * um look sem recompô-lo: as peças se resolvem no armário de agora, e uma que
 * não estiver mais lá é detectada por ausência, não por comparação de ids.
 */
export function parseRecipeId(lookId: string): LookRecipe | undefined {
  const segments = lookId.split('-');
  if (segments.length < FIXED_SEGMENTS + 2) return undefined;

  const [prefix, occasion] = segments;
  if (prefix !== PREFIX || !occasion) return undefined;

  const garments = segments[segments.length - 1];
  if (!garments) return undefined;

  const adjustments = segments.slice(FIXED_SEGMENTS, -1).join('-');

  return {
    occasion: occasion as Occasion,
    adjustments:
      adjustments === NO_ADJUSTMENT
        ? []
        : (adjustments.split(ADJUSTMENT_SEPARATOR) as LookAdjustment[]),
    garmentIds: garments.split(GARMENT_SEPARATOR),
  };
}
