import type { LookAdjustment } from '@/types/look';
import type { Garment, Occasion } from '@/types/wardrobe';

/**
 * O id do look — escrita e leitura, no mesmo lugar.
 *
 * ```
 * l-<ocasião>-<variante>-<ajustes>-<peças>
 *
 * l-trabalho-0-_-g1.g6.g9.g12.g13              sem ajuste
 * l-trabalho-0-mais-elegante-g1.g5.g9.g12.g13  a calça reta virou alfaiataria
 * ```
 *
 * O id carrega tudo que o motor precisa para produzir o mesmo look de novo, e é
 * isso que permite abrir o detalhe de um look sem banco nenhum — e que faz um
 * link direto continuar funcionando depois de fechar o app.
 *
 * **Por que um módulo só.** O formato nasceu com o compositor escrevendo e o
 * serviço de looks lendo, cada um com a sua metade da regra. Duas metades de um
 * formato são duas metades que divergem: bastava alguém acrescentar um segmento
 * de um lado para o outro passar a ler errado — e o sintoma seria a tela
 * acusando "peça não está mais no armário" sobre um look que existe.
 */

const PREFIX = 'l';

/** Marca a ausência de ajuste. Um segmento vazio quebraria a contagem. */
const NO_ADJUSTMENT = '_';

/** Separa ajustes entre si; `-` não serve, os nomes já têm hífen. */
const ADJUSTMENT_SEPARATOR = '+';

/** Separa as peças entre si. */
const GARMENT_SEPARATOR = '.';

/** Quantos segmentos fixos existem antes do de peças. */
const FIXED_SEGMENTS = 3;

export type LookIdParts = {
  occasion: Occasion;
  variant: number;
  adjustments: LookAdjustment[];
};

export function lookIdFor(
  { occasion, variant, adjustments }: LookIdParts,
  garments: Garment[]
): string {
  return [
    PREFIX,
    occasion,
    variant,
    adjustments.length > 0 ? adjustments.join(ADJUSTMENT_SEPARATOR) : NO_ADJUSTMENT,
    garments.map((garment) => garment.id).join(GARMENT_SEPARATOR),
  ].join('-');
}

/**
 * Lê o id de volta, ou devolve `undefined` se ele não for um id de look.
 *
 * A leitura é por segmento, e não por expressão regular, porque os ajustes têm
 * hífen no próprio nome (`mais-elegante`) e a expressão precisaria adivinhar
 * onde um termina e o próximo começa. Aqui a conta é direta: ocasião é o
 * segundo segmento, peças é o último, e ajustes é tudo que sobra no meio.
 *
 * O que **não** volta são as peças. Elas estão no id, mas quem as reconstrói é
 * o motor a partir do armário de agora — é assim que um look salvo com uma peça
 * que saiu do armário é detectado, comparando o id recomposto com o original.
 */
/**
 * A composição, sem a variante: `<ocasião>-<ajustes>-<peças>`.
 *
 * Dois ids diferentes podem vestir a mesma roupa. O id carrega a variante, e
 * variantes distintas caem na mesma combinação assim que uma das listas dá a
 * volta — pelo id, `l-trabalho-1-…` e `l-trabalho-7-…` são dois looks; pelo
 * espelho, são o mesmo.
 *
 * É por esta assinatura que "gerar outro" decide se já mostrou algo. Comparar
 * por id fazia o produto anunciar um look novo entregando a roupa de ontem.
 */
export function signatureOf(lookId: string): string {
  const segments = lookId.split('-');
  return [segments[1], ...segments.slice(FIXED_SEGMENTS)].join('-');
}

export function parseLookId(lookId: string): LookIdParts | undefined {
  const segments = lookId.split('-');
  if (segments.length < FIXED_SEGMENTS + 2) return undefined;

  const [prefix, occasion, variant] = segments;
  if (prefix !== PREFIX || !occasion || !variant) return undefined;

  const parsedVariant = Number(variant);
  if (!Number.isInteger(parsedVariant) || parsedVariant < 0) return undefined;

  const adjustments = segments.slice(FIXED_SEGMENTS, -1).join('-');

  return {
    occasion: occasion as Occasion,
    variant: parsedVariant,
    adjustments:
      adjustments === NO_ADJUSTMENT
        ? []
        : (adjustments.split(ADJUSTMENT_SEPARATOR) as LookAdjustment[]),
  };
}
