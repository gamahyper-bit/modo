import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  BRAND_COMPACT,
  BRAND_DISPLAY,
  COMPACT_BELOW,
  framePathOf,
  geometryFor,
} from '../src/theme/brand.ts';

import { ASSETS_DIR, RECIPES, renderBrandAssets } from './brand-assets.ts';

/**
 * O ícone não pode divergir do logo.
 *
 * "Gerado por script" só vale enquanto alguém lembra de rodar o script. Este
 * teste torna o esquecimento visível: mudou a geometria da marca e não rodou
 * `npm run brand`, reprova.
 *
 * É o tipo de divergência que ninguém percebe olhando o app — o logo em tela
 * atualiza sozinho, o ícone da tela inicial fica no desenho antigo, e a
 * diferença só aparece quando alguém põe os dois lado a lado numa apresentação.
 */
describe('ativos da marca', () => {
  const rendered = renderBrandAssets();

  it('cobre ícone, splash e favicon', () => {
    expect([...rendered.keys()]).toEqual([
      'icon.png',
      'android-icon-foreground.png',
      'android-icon-monochrome.png',
      'splash-icon.png',
      'favicon.png',
    ]);
  });

  it.each(RECIPES)('$file está em dia com a geometria', ({ file }) => {
    const gravado = readFileSync(join(ASSETS_DIR, file));

    // Se isto falhar depois de mexer em `theme/brand.ts`, o conserto é
    // `npm run brand` — não afrouxar a comparação.
    expect(rendered.get(file)?.equals(gravado)).toBe(true);
  });

  it('o grau de marca continua sendo o desenho original', () => {
    // Este path é a marca como foi aprovada. A moldura passou a ser gerada a
    // partir de parâmetros para os dois graus serem a mesma forma em medidas
    // diferentes — e a geração não pode ter mexido no original de propósito
    // nenhum. Se isto falhar, alguém mudou a marca, não o ícone.
    expect(framePathOf(BRAND_DISPLAY)).toBe('M30 58 L6 58 L6 6 L58 6 L58 30');
  });

  it('o grau compacto é mais pesado e mais folgado que a marca', () => {
    // O ícone não é a marca reduzida: é mais traço, mais letra e mais vão. Se
    // algum destes se inverter, o ajuste óptico virou ruído.
    expect(BRAND_COMPACT.stroke).toBeGreaterThan(BRAND_DISPLAY.stroke);
    expect(BRAND_COMPACT.markSize).toBeGreaterThan(BRAND_DISPLAY.markSize);
    // Vão menor no número significa abertura maior.
    expect(BRAND_COMPACT.gap).toBeLessThan(BRAND_DISPLAY.gap);
  });

  it('o tamanho escolhe o grau', () => {
    expect(geometryFor(COMPACT_BELOW - 1)).toBe(BRAND_COMPACT);
    expect(geometryFor(COMPACT_BELOW)).toBe(BRAND_DISPLAY);
    // O cabeçalho do app desenha a 28 e é quem mais ganha com a troca.
    expect(geometryFor(28)).toBe(BRAND_COMPACT);
  });

  it('só o splash sai em grau de marca', () => {
    // Tudo que o sistema operacional mostra pequeno vai em compacto. O splash
    // aparece a 160 pontos, tamanho em que o traço fino é qualidade.
    const display = RECIPES.filter((recipe) => recipe.geometry === BRAND_DISPLAY);

    expect(display.map((recipe) => recipe.file)).toEqual(['splash-icon.png']);
  });

  it('o ícone do iOS é opaco e os do Android não são', () => {
    // iOS rejeita transparência no ícone da loja; o adaptativo do Android
    // depende dela para o sistema compor a camada de trás.
    const opaque = (file: string) =>
      RECIPES.find((recipe) => recipe.file === file)?.background !== undefined;

    expect(opaque('icon.png')).toBe(true);
    expect(opaque('favicon.png')).toBe(true);
    expect(opaque('android-icon-foreground.png')).toBe(false);
    expect(opaque('android-icon-monochrome.png')).toBe(false);
    expect(opaque('splash-icon.png')).toBe(false);
  });
});
