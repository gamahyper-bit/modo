import { mockRecommendationService } from './mockRecommendationService';
import type { RecommendationService } from './types';

/**
 * Ponto único de troca entre mock e backend.
 *
 * A interface importa `recommendationService` e nada mais. Trocar a
 * implementação é uma linha aqui — nenhuma tela, hook ou componente muda.
 */
export const recommendationService: RecommendationService =
  mockRecommendationService;

export type { RecommendationRequest, RecommendationService } from './types';
