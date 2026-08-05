import type { Look, LookAdjustment } from '@/types/look';
import type { Occasion } from '@/types/wardrobe';

export type RecommendationRequest = {
  occasion?: Occasion;
  /** Ajustes pedidos pelo usuário sobre a recomendação anterior. */
  adjustments?: LookAdjustment[];
  /** Looks já vistos — "Gerar outro" não pode devolver o mesmo. */
  excludeLookIds?: string[];
};

/**
 * A porta da recomendação.
 *
 * A interface conversa **só** com este contrato. Hoje ele é atendido por dados
 * mockados; amanhã, pelo motor determinístico local somado à Edge Function que
 * fala com o Gemini. Nenhuma tela precisa saber a diferença — e é isso que
 * permite validar UX agora sem ficar preso a integração externa.
 */
export interface RecommendationService {
  /** A recomendação principal da Home. */
  getRecommendation(request: RecommendationRequest): Promise<Look>;

  /** Guarda o look na coleção do usuário. */
  saveLook(lookId: string): Promise<void>;
}
