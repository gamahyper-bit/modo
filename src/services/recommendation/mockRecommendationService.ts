import { wardrobeService } from '@/services/wardrobe';
import { weatherService } from '@/services/weather';
import type { Look } from '@/types/look';

import { composeLook } from './composer';
import type { RecommendationRequest, RecommendationService } from './types';

/** Latência fingida — interface que nunca espera esconde defeito de estado. */
const LATENCY_MS = 700;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Quantas variantes tentar antes de desistir de fugir dos looks já vistos. */
const MAX_VARIANTS = 8;

/**
 * Implementação de demonstração da porta de recomendação.
 *
 * Já usa o motor determinístico de verdade sobre o armário de verdade — é por
 * isso que adicionar uma peça muda a Home. O que ainda é mock: a latência, o
 * texto (templates em vez do Gemini) e a ausência de ranqueamento entre
 * candidatos.
 */
export const mockRecommendationService: RecommendationService = {
  async getRecommendation({
    occasion = 'trabalho',
    excludeLookIds = [],
  }: RecommendationRequest): Promise<Look> {
    await delay(LATENCY_MS);

    const [wardrobe, weather] = await Promise.all([
      wardrobeService.list(),
      weatherService.current(),
    ]);

    let fallback: Look | undefined;

    for (let variant = 0; variant < MAX_VARIANTS; variant += 1) {
      const look = composeLook({ wardrobe, occasion, weather, variant });
      if (!look) continue;

      fallback ??= look;
      if (!excludeLookIds.includes(look.id)) return look;
    }

    // Esgotadas as variantes, repete a primeira em vez de falhar: a Home nunca
    // pode ficar sem um look.
    if (fallback) return fallback;

    throw new Error(
      'Seu armário ainda não tem peças suficientes para montar um look.'
    );
  },

  async saveLook(): Promise<void> {
    await delay(LATENCY_MS / 2);
  },
};
