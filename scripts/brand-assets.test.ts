import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

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
