import type { Look } from '@/types/look';

import { lookFixtures } from './fixtures';
import type { RecommendationRequest, RecommendationService } from './types';

/** Latência fingida — interface que nunca espera esconde defeito de estado. */
const LATENCY_MS = 700;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Implementação de demonstração da porta de recomendação.
 *
 * Existe para validar UX, identidade e interação antes do backend. Não tem
 * regra de moda nenhuma: apenas devolve fixtures respeitando ocasião e
 * exclusões, com atraso, para que os estados de carga apareçam de verdade.
 *
 * Quando o motor real entrar, este arquivo sai e nenhuma tela muda.
 */
export const mockRecommendationService: RecommendationService = {
  async getRecommendation({
    occasion,
    excludeLookIds = [],
  }: RecommendationRequest): Promise<Look> {
    await delay(LATENCY_MS);

    const candidates = lookFixtures.filter((look) => {
      if (occasion && look.occasion !== occasion) return false;
      return !excludeLookIds.includes(look.id);
    });

    // Esgotadas as opções novas, recomeça o ciclo em vez de falhar: sem rede,
    // sem repertório ou sem backend, a Home nunca fica sem um look.
    const pool = candidates.length > 0 ? candidates : lookFixtures;
    const chosen = pool[Math.floor(Math.random() * pool.length)];

    if (!chosen) {
      throw new Error('Nenhum look disponível.');
    }

    return chosen;
  },

  async saveLook(): Promise<void> {
    await delay(LATENCY_MS / 2);
  },
};
