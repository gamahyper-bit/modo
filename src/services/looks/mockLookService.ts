import { composeLook } from '@/services/recommendation/composer';
import { wardrobeService } from '@/services/wardrobe';
import { weatherService } from '@/services/weather';
import type { Look } from '@/types/look';
import type { Occasion } from '@/types/wardrobe';

import type { LookService } from './types';

const LATENCY_MS = 450;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Coleção salva do usuário, em memória — some ao recarregar, e tudo bem. */
const saved = new Set<string>();

/**
 * Reconstrói o look a partir do próprio id.
 *
 * O id é `l-<ocasião>-<variante>-<peças>`, ou seja, carrega tudo que o motor
 * precisa para produzir o mesmo look de novo. Isso dispensa banco e faz um link
 * direto para um look continuar funcionando depois de fechar o app — desde que
 * as peças ainda existam no armário.
 */
async function rebuild(lookId: string): Promise<Look> {
  const match = /^l-([a-z]+)-(\d+)-(.+)$/.exec(lookId);

  if (!match) {
    throw new Error('Look não encontrado.');
  }

  const [, occasion, variant] = match;

  const [wardrobe, weather] = await Promise.all([
    wardrobeService.list(),
    weatherService.current(),
  ]);

  const look = composeLook({
    wardrobe,
    occasion: occasion as Occasion,
    weather,
    variant: Number(variant),
  });

  // O motor é determinístico, então recompor com os mesmos parâmetros devolve o
  // mesmo look. Se o id não bate, alguma peça saiu do armário desde então.
  if (!look || look.id !== lookId) {
    throw new Error('Este look usava uma peça que não está mais no armário.');
  }

  return look;
}

export const mockLookService: LookService = {
  async getById(lookId: string): Promise<Look> {
    await delay(LATENCY_MS);
    return rebuild(lookId);
  },

  async save(lookId: string): Promise<void> {
    await delay(LATENCY_MS);
    saved.add(lookId);
  },

  async remove(lookId: string): Promise<void> {
    await delay(LATENCY_MS);
    saved.delete(lookId);
  },

  async isSaved(lookId: string): Promise<boolean> {
    return saved.has(lookId);
  },
};
