import type { BackdropItem } from '@/components';
import type { Garment } from '@/types/wardrobe';

/**
 * Traduz peças do domínio para o cenário do design system.
 *
 * Fica em `utils` e não dentro de uma feature porque Home e detalhe do look
 * usam o mesmo cenário — e uma feature nunca importa de outra.
 *
 * As categorias já são os nomes dos glifos da família de vestuário, e a chave é
 * o id da peça: é ela que faz a peça deslizar em vez de piscar quando o look
 * muda.
 */
export const backdropItemsFor = (garments: Garment[]): BackdropItem[] =>
  garments.map((garment) => ({ key: garment.id, icon: garment.category }));
