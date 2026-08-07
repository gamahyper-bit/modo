import { recommendationService } from '@/services/recommendation';
import type { Look } from '@/types/look';

import type { LookService } from './types';

const LATENCY_MS = 450;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Coleção salva do usuário, em memória — some ao recarregar, e tudo bem.
 *
 * **Guarda receitas, não looks.** Um look salvo é o id de uma receita; as peças,
 * o texto e o clima são reconstruídos na hora de mostrar. É o que faz um look
 * salvo continuar certo depois de o armário mudar — e o que vai permitir que a
 * fala do stylist seja reescrita pela IA sem tocar em nada guardado (DEC-028).
 *
 * Ordenada: o mais recente primeiro, que é como a aba Looks apresenta.
 */
const saved: string[] = [];

/**
 * Esta porta cuida de **quais** receitas o usuário guardou. Reproduzir a receita
 * é trabalho de quem decide, e é por isso que a reconstrução vem da porta da
 * recomendação em vez de o serviço de looks conhecer o motor por dentro.
 */
export const mockLookService: LookService = {
  async getById(lookId: string): Promise<Look> {
    await delay(LATENCY_MS);
    return recommendationService.rebuild(lookId);
  },

  async listSaved(): Promise<Look[]> {
    await delay(LATENCY_MS);

    // Um look salvo pode ter perdido uma peça desde então. Nesse caso ele
    // simplesmente não aparece — mostrar um look que não existe mais seria pior
    // que a ausência dele.
    const looks = await Promise.all(
      saved.map((id) => recommendationService.rebuild(id).catch(() => undefined))
    );

    return looks.filter((look): look is Look => look !== undefined);
  },

  async save(lookId: string): Promise<void> {
    await delay(LATENCY_MS);
    if (!saved.includes(lookId)) saved.unshift(lookId);
  },

  async remove(lookId: string): Promise<void> {
    await delay(LATENCY_MS);
    const index = saved.indexOf(lookId);
    if (index >= 0) saved.splice(index, 1);
  },

  async isSaved(lookId: string): Promise<boolean> {
    return saved.includes(lookId);
  },
};
