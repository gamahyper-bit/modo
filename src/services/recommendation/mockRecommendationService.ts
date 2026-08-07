import { wardrobeService } from '@/services/wardrobe';
import { weatherService } from '@/services/weather';
import type { Look } from '@/types/look';
import type { Garment } from '@/types/wardrobe';

import { composeLook, lookFrom } from './composer';
import { parseRecipeId } from './recipe';
import type { RecommendationRequest, RecommendationService } from './types';

/** Latência fingida — interface que nunca espera esconde defeito de estado. */
const LATENCY_MS = 700;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Trava de segurança, não regra de produto.
 *
 * O motor é periódico — cada vaga é escolhida por um dígito da variante em base
 * mista —, então a sequência de looks fecha um ciclo sozinha e a busca abaixo
 * para por conta própria. Este teto existe só para o caso de alguém mudar a
 * escolha para algo não periódico e transformar o laço em espera infinita.
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

    const seen = new Set(excludeLookIds);
    const produced = new Set<string>();
    let fallback: Look | undefined;

    /**
     * Percorre as variantes até o ciclo fechar.
     *
     * A comparação é por id, e isso passou a bastar quando a variante saiu da
     * identidade do look (DEC-028): duas variantes que caem nas mesmas peças
     * produzem o mesmo id, então reencontrar um id já produzido **neste laço**
     * significa que a volta completou e não existe mais alternativa nenhuma.
     *
     * Nunca que paramos cedo: é o que sustenta a promessa de não repetir
     * enquanto houver o que mostrar.
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
      if (produced.has(look.id)) break;

      produced.add(look.id);
      fallback ??= look;

      if (!seen.has(look.id)) return look;
    }

    // Todas as alternativas já foram vistas. Repetir a primeira é melhor do que
    // falhar: a Home nunca pode ficar sem um look.
    if (fallback) return fallback;

    throw new Error(
      'Seu armário ainda não tem peças suficientes para montar um look.'
    );
  },

  /**
   * Reconstrói o look de uma receita.
   *
   * **Não recompõe.** A receita já diz quais peças formam o look; o trabalho
   * aqui é procurá-las no armário de agora e remontar o objeto. Peça que não
   * está mais lá é detectada por ausência — não por refazer a escolha inteira e
   * torcer para o id bater, que era como funcionava e que deixaria de funcionar
   * assim que o texto do stylist virasse não determinístico.
   */
  async rebuild(lookId: string): Promise<Look> {
    const recipe = parseRecipeId(lookId);
    if (!recipe) throw new Error('Look não encontrado.');

    const [wardrobe, weather] = await Promise.all([
      wardrobeService.list(),
      weatherService.current(),
    ]);

    const byId = new Map(wardrobe.map((garment) => [garment.id, garment]));
    const garments: Garment[] = [];

    for (const garmentId of recipe.garmentIds) {
      const garment = byId.get(garmentId);

      if (!garment) {
        throw new Error('Este look usava uma peça que não está mais no armário.');
      }

      garments.push(garment);
    }

    return lookFrom(recipe, garments, weather);
  },
};
