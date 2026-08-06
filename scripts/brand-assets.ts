import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Resvg } from '@resvg/resvg-js';

import {
  BRAND_GRID,
  FRAME_PATH,
  FRAME_STROKE,
  MARK_BASELINE,
  MARK_SIZE,
  MARK_X,
} from '../src/theme/brand.ts';
import { colors } from '../src/theme/colors.ts';

/**
 * Gera o ícone, o splash e o favicon a partir da geometria da marca.
 *
 * Roda com `npm run brand`. Existe para que o ícone da tela inicial nunca seja
 * uma versão desatualizada do logo: as constantes vêm de `theme/brand.ts`, as
 * mesmas que o componente `Logo` desenha em tela. Mexer na marca e esquecer de
 * regenerar deixa de ser possível sem o teste reprovar.
 *
 * O M é tipografia real, então o gerador precisa da fonte de display — a mesma
 * que o app embarca. Trocar a licença por PP Editorial New (DEC-001) troca o
 * ícone junto, e é o comportamento certo.
 */

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

export const ASSETS_DIR = join(root, 'assets');

const DISPLAY_FONT = join(
  root,
  'node_modules/@expo-google-fonts/instrument-serif/400Regular/InstrumentSerif_400Regular.ttf'
);

/** O nome pelo qual o `font-family` do SVG encontra o arquivo acima. */
const DISPLAY_FAMILY = 'Instrument Serif';

type Recipe = {
  file: string;
  /** Lado do PNG, em pixels. */
  size: number;
  /**
   * Que fração do lado o grid da marca ocupa.
   *
   * Não é a fração de tinta: o símbolo já tem folga dentro do próprio grid — a
   * moldura vai de 6 a 58 de 64 —, então a tinta ocupa cerca de 81% disto.
   */
  cover: number;
  /** Ausente = fundo transparente. */
  background?: string;
  color: string;
  why: string;
};

export const RECIPES: Recipe[] = [
  {
    file: 'icon.png',
    size: 1024,
    // A 74% a moldura cai a 20% da borda, dentro do recorte arredondado do iOS
    // — que corta a partir de cerca de 22%. Mais que isto e os cantos do
    // símbolo entram na curva da máscara.
    cover: 0.74,
    background: colors.background,
    color: colors.textPrimary,
    why: 'iOS e loja — sem transparência',
  },
  {
    file: 'android-icon-foreground.png',
    size: 512,
    // Bem menor que o do iOS, de propósito: o Android recorta a camada da
    // frente com uma máscara que muda de aparelho para aparelho, e só o miolo
    // é garantido.
    cover: 0.6,
    color: colors.textPrimary,
    why: 'camada da frente do ícone adaptativo, dentro da zona segura',
  },
  {
    file: 'android-icon-monochrome.png',
    size: 432,
    cover: 0.6,
    // A cor não importa: o Android usa só o alfa e pinta com o tema do usuário.
    // Fica em tinta para o arquivo continuar legível fora do aparelho.
    color: colors.textPrimary,
    why: 'ícone temático do Android 13 — o sistema tinge pelo alfa',
  },
  {
    file: 'splash-icon.png',
    size: 512,
    cover: 0.86,
    // Sem fundo: quem pinta o off-white é o `backgroundColor` do
    // expo-splash-screen. Um fundo aqui dentro apareceria como um quadrado de
    // tom levemente diferente sobre ele.
    color: colors.textPrimary,
    why: 'abertura do app — símbolo centrado, sem texto',
  },
  {
    file: 'favicon.png',
    size: 128,
    // Quase sem folga: numa aba de navegador o símbolo vive com 16 pixels.
    cover: 0.92,
    background: colors.background,
    color: colors.textPrimary,
    why: 'aba do navegador',
  },
];

const symbol = (color: string) => `
  <path
    d="${FRAME_PATH}"
    fill="none"
    stroke="${color}"
    stroke-width="${FRAME_STROKE}"
    stroke-linecap="square"
    stroke-linejoin="miter"
  />
  <text
    x="${MARK_X}"
    y="${MARK_BASELINE}"
    fill="${color}"
    font-size="${MARK_SIZE}"
    font-family="${DISPLAY_FAMILY}"
    text-anchor="middle"
  >M</text>
`;

/**
 * Centra o grid da marca numa tela maior, sem redesenhar nada.
 *
 * A folga não entra no path: entra no `viewBox`. É o que garante que a única
 * diferença entre o ícone e o logo em tela seja a margem ao redor.
 */
const document = ({ size, cover, background, color }: Recipe) => {
  const box = BRAND_GRID / cover;
  const inset = (box - BRAND_GRID) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${box} ${box}">
  ${background ? `<rect width="${box}" height="${box}" fill="${background}"/>` : ''}
  <g transform="translate(${inset} ${inset})">${symbol(color)}</g>
</svg>`;
};

/** Desenha todos os ativos em memória. O teste compara com o que está em disco. */
export function renderBrandAssets(): Map<string, Buffer> {
  const rendered = new Map<string, Buffer>();

  for (const recipe of RECIPES) {
    const renderer = new Resvg(document(recipe), {
      font: {
        fontFiles: [DISPLAY_FONT],
        loadSystemFonts: false,
        defaultFontFamily: DISPLAY_FAMILY,
      },
    });

    rendered.set(recipe.file, renderer.render().asPng());
  }

  return rendered;
}

/** Só quando chamado direto: `npm run brand`. */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [file, png] of renderBrandAssets()) {
    writeFileSync(join(ASSETS_DIR, file), png);

    const recipe = RECIPES.find((item) => item.file === file)!;
    console.log(`${file.padEnd(30)} ${recipe.size}px  ${recipe.why}`);
  }
}
