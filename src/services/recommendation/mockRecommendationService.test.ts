import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { wardrobeService } from '@/services/wardrobe';
import type { Look } from '@/types/look';
import type { GarmentDraft } from '@/types/wardrobe';

import { mockRecommendationService } from './mockRecommendationService';

/**
 * A promessa de "Gerar outro".
 *
 * O botão diz que existe outra escolha. Se ele devolve a roupa de ontem com um
 * número diferente no id, o produto mentiu — e mentiu na ação que o usuário mais
 * usa quando a recomendação não serviu.
 *
 * O serviço tem latência fingida de propósito (interface que nunca espera
 * esconde defeito de estado), então os testes adiantam o relógio em vez de
 * esperar por ele.
 */

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

/** Resolve a promessa do serviço adiantando a latência fingida. */
const recommend = async (excludeLookIds: string[] = []): Promise<Look> => {
  const pending = mockRecommendationService.getRecommendation({
    occasion: 'trabalho',
    excludeLookIds,
  });

  await vi.advanceTimersByTimeAsync(5_000);
  return pending;
};

/**
 * Repete "Gerar outro" como a Home faz: guarda o que já viu e pede outro.
 *
 * Para quando um id se repete — que é o momento em que o produto ficou sem
 * alternativas. Comparar por id passou a bastar quando a variante saiu da
 * identidade do look: antes, dois ids diferentes podiam vestir a mesma roupa, e
 * este laço precisava de uma assinatura paralela para enxergar isso.
 */
const generateUntilRepeat = async (limit = 64) => {
  const seen: string[] = [];

  for (let round = 0; round < limit; round += 1) {
    const look = await recommend(seen);

    if (seen.includes(look.id)) return { seen, repeated: true };
    seen.push(look.id);
  }

  return { seen, repeated: false };
};

describe('gerar outro', () => {
  it('nunca repete enquanto houver alternativa', async () => {
    const { seen } = await generateUntilRepeat();

    expect(new Set(seen).size).toBe(seen.length);
  });

  it('alcança todas as combinações do armário, não só algumas', async () => {
    // No armário de demonstração, o trabalho tem uma camisa, duas calças, dois
    // calçados, um casaco e dois acessórios: 1 × 2 × 2 × 1 × 2 = 8 looks.
    //
    // Antes, a mesma variante escolhia a mesma posição em todas as listas e só
    // o mínimo múltiplo comum era alcançável — duas das oito. O usuário via o
    // botão repetir com seis alternativas guardadas que ele não sabia alcançar.
    const { seen } = await generateUntilRepeat();

    expect(seen).toHaveLength(8);
  });

  it('repete em vez de falhar quando acaba o que mostrar', async () => {
    // A Home nunca pode ficar sem look. Esgotadas as alternativas, o certo é
    // repetir a primeira — não a tela de erro.
    const { seen } = await generateUntilRepeat();
    const exhausted = await recommend(seen);

    expect(exhausted.garments.length).toBeGreaterThanOrEqual(3);
  });

  it('nunca oferece peça de uniforme quando há alternativa comum', async () => {
    const { seen } = await generateUntilRepeat();

    for (const lookId of seen) {
      expect(lookId).not.toContain('g15');
      expect(lookId).not.toContain('g16');
    }
  });
});

describe('armário maior', () => {
  // Este bloco cresce o armário em memória e por isso vai por último: o serviço
  // lê do mesmo módulo que os testes acima.
  const draft = (name: string): GarmentDraft => ({
    name,
    category: 'camisa',
    color: { name: 'Preto', hex: '#0D0D0D' },
    material: 'Algodão',
    seasons: ['outono', 'inverno', 'primavera'],
    occasions: ['trabalho'],
    isUniform: false,
  });

  it('não para na oitava variante', async () => {
    // O teto anterior era um oito escrito à mão, e cabia no armário de
    // demonstração por coincidência. Com duas camisas a mais são vinte e quatro
    // combinações, e o oito passaria a esconder dezesseis delas.
    vi.useRealTimers();
    await wardrobeService.add(draft('Camisa listrada'));
    await wardrobeService.add(draft('Camisa de popeline'));
    vi.useFakeTimers();

    const { seen } = await generateUntilRepeat();

    expect(seen).toHaveLength(24);
  });
});
