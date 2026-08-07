import { wardrobeService } from '@/services/wardrobe';
import { weatherService } from '@/services/weather';
import type { Look } from '@/types/look';

import { composeLook } from './composer';
import { signatureOf } from './lookId';
import type { RecommendationRequest, RecommendationService } from './types';

/** Latência fingida — interface que nunca espera esconde defeito de estado. */
const LATENCY_MS = 700;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Trava de segurança, não regra de produto.
 *
 * O motor é periódico — cada peça é escolhida por `variante % tamanho da lista`
 * —, então a sequência de looks fecha um ciclo sozinha e a busca abaixo para
 * por conta própria. Este teto existe só para o caso de alguém mudar a escolha
 * para algo não periódico e transformar o laço em espera infinita.
 */
const VARIANT_CEILING = 512;

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
    adjustments = [],
    excludeLookIds = [],
  }: RecommendationRequest): Promise<Look> {
    await delay(LATENCY_MS);

    const [wardrobe, weather] = await Promise.all([
      wardrobeService.list(),
      weatherService.current(),
    ]);

    const seen = new Set(excludeLookIds.map(signatureOf));
    const produced = new Set<string>();
    let fallback: Look | undefined;

    /**
     * Percorre as variantes até o ciclo fechar.
     *
     * A comparação é por **assinatura**, não por id: o id carrega a variante, e
     * variantes distintas caem na mesma combinação assim que uma das listas dá
     * a volta. Comparando por id, o laço nunca reconhecia a repetição — ia até
     * o teto e, pior, "gerar outro" anunciava um look novo entregando a mesma
     * roupa com outro número no id.
     *
     * Reencontrar uma assinatura já produzida **neste laço** significa que a
     * volta completou e que não existe mais alternativa nenhuma. Nunca que
     * paramos cedo: é o que sustenta a promessa de não repetir enquanto houver
     * o que mostrar.
     */
    for (let variant = 0; variant < VARIANT_CEILING; variant += 1) {
      const look = composeLook({
        wardrobe,
        occasion,
        weather,
        variant,
        adjustments,
      });

      // Sem peça estrutural não há look em nenhuma variante — nada a percorrer.
      if (!look) break;

      const signature = signatureOf(look.id);
      if (produced.has(signature)) break;

      produced.add(signature);
      fallback ??= look;

      if (!seen.has(signature)) return look;
    }

    // Todas as alternativas já foram vistas. Repetir a primeira é melhor do que
    // falhar: a Home nunca pode ficar sem um look.
    if (fallback) return fallback;

    throw new Error(
      'Seu armário ainda não tem peças suficientes para montar um look.'
    );
  },
};
