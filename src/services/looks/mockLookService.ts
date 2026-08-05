import { lookFixtures } from '@/services/recommendation/fixtures';
import type { Look } from '@/types/look';

import type { LookService } from './types';

const LATENCY_MS = 450;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Coleção salva do usuário, em memória — some ao recarregar, e tudo bem. */
const saved = new Set<string>();

/**
 * Implementação de demonstração da porta dos looks.
 *
 * Quando o Supabase entrar, este arquivo sai e nenhuma tela muda.
 */
export const mockLookService: LookService = {
  async getById(lookId: string): Promise<Look> {
    await delay(LATENCY_MS);

    const look = lookFixtures.find((item) => item.id === lookId);

    if (!look) {
      throw new Error('Look não encontrado.');
    }

    return look;
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
