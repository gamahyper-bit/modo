import { describe, expect, it } from 'vitest';

import { wardrobeSeed } from '@/services/wardrobe/seed';
import type { LookAdjustment, Weather } from '@/types/look';
import type { Occasion } from '@/types/wardrobe';

import { composeLook } from './composer';
import { type LookIdParts, lookIdFor, parseLookId, signatureOf } from './lookId';

/**
 * O contrato do id.
 *
 * O id é a única coisa que sobrevive entre a Home e o detalhe do look: não há
 * banco, não há cache, e um link direto precisa continuar funcionando depois de
 * fechar o app. Se escrita e leitura discordarem em um caractere, a tela acusa
 * "peça não está mais no armário" sobre um look que existe.
 */

const MILD: Weather = { temperature: 18, condition: 'nublado' };

const garments = wardrobeSeed.slice(0, 3);

describe('ida e volta', () => {
  it('preserva ocasião, variante e ausência de ajuste', () => {
    const parts: LookIdParts = {
      occasion: 'trabalho',
      variant: 0,
      adjustments: [],
    };

    expect(parseLookId(lookIdFor(parts, garments))).toEqual(parts);
  });

  it('preserva um ajuste', () => {
    const parts: LookIdParts = {
      occasion: 'casual',
      variant: 3,
      adjustments: ['mais-elegante'],
    };

    expect(parseLookId(lookIdFor(parts, garments))).toEqual(parts);
  });

  it('preserva vários ajustes, apesar do hífen no nome deles', () => {
    // `mais-elegante` tem hífen, e o id é separado por hífen. É a razão de a
    // leitura ser por segmento e não por expressão regular.
    const adjustments: LookAdjustment[] = ['mais-elegante', 'esta-frio'];
    const occasion: Occasion = 'noite';
    const parts: LookIdParts = { occasion, variant: 12, adjustments };

    expect(parseLookId(lookIdFor(parts, garments))).toEqual(parts);
  });

  it('o id de um look composto volta nos parâmetros que o compuseram', () => {
    const look = composeLook({
      wardrobe: wardrobeSeed,
      occasion: 'trabalho',
      weather: MILD,
      variant: 5,
      adjustments: ['mais-casual'],
    });

    expect(parseLookId(look!.id)).toEqual({
      occasion: 'trabalho',
      variant: 5,
      adjustments: ['mais-casual'],
    });
  });
});

describe('o que não é id de look', () => {
  it.each([
    ['', 'vazio'],
    ['l', 'só o prefixo'],
    ['l-trabalho', 'sem variante'],
    ['l-trabalho-0-_', 'sem peças'],
    ['x-trabalho-0-_-g1.g2', 'prefixo errado'],
    ['l-trabalho-abc-_-g1.g2', 'variante que não é número'],
    ['l-trabalho--1-_-g1.g2', 'variante negativa'],
    ['looks/42', 'outra coisa qualquer'],
  ])('recusa %j (%s)', (lookId) => {
    expect(parseLookId(lookId)).toBeUndefined();
  });
});

describe('assinatura', () => {
  it('ignora a variante — dois ids podem vestir a mesma roupa', () => {
    // É o caso real: no armário de demonstração, o trabalho tem oito
    // combinações, então a variante 8 veste igual à 0 com outro número no id.
    const compose = (variant: number) =>
      composeLook({
        wardrobe: wardrobeSeed,
        occasion: 'trabalho',
        weather: MILD,
        variant,
      })!;

    const first = compose(0);
    const wrapped = compose(8);

    expect(wrapped.id).not.toBe(first.id);
    expect(signatureOf(wrapped.id)).toBe(signatureOf(first.id));
  });

  it('separa ocasiões, ajustes e peças diferentes', () => {
    const base = lookIdFor(
      { occasion: 'trabalho', variant: 0, adjustments: [] },
      garments
    );

    const other = lookIdFor(
      { occasion: 'casual', variant: 0, adjustments: [] },
      garments
    );
    const adjusted = lookIdFor(
      { occasion: 'trabalho', variant: 0, adjustments: ['esta-frio'] },
      garments
    );
    const fewer = lookIdFor(
      { occasion: 'trabalho', variant: 0, adjustments: [] },
      garments.slice(0, 2)
    );

    expect(signatureOf(other)).not.toBe(signatureOf(base));
    expect(signatureOf(adjusted)).not.toBe(signatureOf(base));
    expect(signatureOf(fewer)).not.toBe(signatureOf(base));
  });
});
