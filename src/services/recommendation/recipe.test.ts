import { describe, expect, it } from 'vitest';

import { wardrobeSeed } from '@/services/wardrobe/seed';
import type { LookAdjustment, Weather } from '@/types/look';

import { composeLook } from './composer';
import { type LookRecipe, parseRecipeId, recipeIdFor } from './recipe';

/**
 * O contrato da receita.
 *
 * A receita é a **identidade** do look: para qual ocasião, sob qual pedido, com
 * quais peças. É a única coisa que sobrevive entre a Home e o detalhe — não há
 * banco, não há cache, e um link direto precisa continuar funcionando depois de
 * fechar o app.
 */

const MILD: Weather = { temperature: 18, condition: 'nublado' };

const garmentIds = wardrobeSeed.slice(0, 3).map((garment) => garment.id);

describe('ida e volta', () => {
  it.each<LookRecipe>([
    { occasion: 'trabalho', adjustments: [], garmentIds },
    { occasion: 'casual', adjustments: ['mais-elegante'], garmentIds },
    // `mais-elegante` tem hífen, e o id é separado por hífen. É a razão de a
    // leitura ser por segmento e não por expressão regular.
    { occasion: 'noite', adjustments: ['mais-elegante', 'esta-frio'], garmentIds },
  ])('preserva $occasion com $adjustments', (recipe) => {
    expect(parseRecipeId(recipeIdFor(recipe))).toEqual(recipe);
  });

  it('o id de um look composto volta na receita que o compôs', () => {
    const adjustments: LookAdjustment[] = ['mais-casual'];
    const look = composeLook({
      wardrobe: wardrobeSeed,
      occasion: 'trabalho',
      weather: MILD,
      variant: 5,
      adjustments,
    })!;

    expect(parseRecipeId(look.id)).toEqual({
      occasion: 'trabalho',
      adjustments,
      garmentIds: look.garments.map((garment) => garment.id),
    });
  });
});

describe('a variante ficou fora da identidade', () => {
  const compose = (variant: number) =>
    composeLook({
      wardrobe: wardrobeSeed,
      occasion: 'trabalho',
      weather: MILD,
      variant,
    })!;

  it('não aparece no id', () => {
    // Ela é o botão que o motor gira para enumerar combinações, não parte da
    // escolha. O usuário nunca ouviu falar dela.
    expect(compose(3).id).not.toContain('-3-');
  });

  it('duas variantes com as mesmas peças produzem o mesmo look', () => {
    // No armário de demonstração o trabalho tem oito combinações, então a
    // variante 8 veste igual à 0. Antes eram dois ids, e o produto anunciava um
    // look novo entregando a roupa de ontem.
    const first = compose(0);
    const wrapped = compose(8);

    expect(wrapped.garments).toEqual(first.garments);
    expect(wrapped.id).toBe(first.id);
  });

  it('e dizem exatamente a mesma coisa', () => {
    // A fala é derivada da receita. Se ela variasse com a variante, o mesmo
    // look leria de dois jeitos — o produto mudando de opinião sem motivo.
    expect(compose(8)).toEqual(compose(0));
  });
});

describe('o que não é id de look', () => {
  it.each([
    ['', 'vazio'],
    ['l', 'só o prefixo'],
    ['l-trabalho', 'sem ajustes nem peças'],
    ['l-trabalho-_', 'sem peças'],
    ['x-trabalho-_-g1.g2', 'prefixo errado'],
    ['looks/42', 'outra coisa qualquer'],
  ])('recusa %j (%s)', (lookId) => {
    expect(parseRecipeId(lookId)).toBeUndefined();
  });
});

describe('o que muda o look', () => {
  const base: LookRecipe = { occasion: 'trabalho', adjustments: [], garmentIds };

  it.each([
    ['a ocasião', { ...base, occasion: 'casual' } as LookRecipe],
    ['o ajuste', { ...base, adjustments: ['esta-frio'] } as LookRecipe],
    ['as peças', { ...base, garmentIds: garmentIds.slice(0, 2) }],
    ['a ordem das peças', { ...base, garmentIds: [...garmentIds].reverse() }],
  ])('%s muda a identidade', (_label, other) => {
    expect(recipeIdFor(other)).not.toBe(recipeIdFor(base));
  });
});
