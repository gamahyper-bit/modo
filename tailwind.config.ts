import type { Config } from 'tailwindcss';

import { colors, palette } from './src/theme/colors';
import { radius } from './src/theme/radius';
import { spacing } from './src/theme/spacing';
import { fontFamily, typography } from './src/theme/typography';

/**
 * O Tailwind não define tokens — ele apenas expõe os de `src/theme` como
 * classes. Fonte única de verdade: qualquer valor novo nasce em `src/theme`.
 *
 * Não importe `src/theme/index.ts` aqui: ele reexporta `motion`, que depende do
 * Reanimated e não carrega fora do runtime do app.
 */

const toRem = (px: number) => `${px}px`;

const fontSize = Object.fromEntries(
  Object.entries(typography).map(([token, style]) => [
    token,
    [
      toRem(style.fontSize),
      {
        lineHeight: toRem(style.lineHeight),
        letterSpacing: toRem(style.letterSpacing),
      },
    ],
  ])
) as Config['theme'] extends { fontSize: infer T } ? T : never;

export default {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    // Substitui a escala do Tailwind: só existem as cores da marca.
    colors: { ...palette, ...colors, transparent: 'transparent' },
    spacing: Object.fromEntries(
      Object.entries(spacing).map(([token, value]) => [token, toRem(value)])
    ),
    borderRadius: Object.fromEntries(
      Object.entries(radius).map(([token, value]) => [token, toRem(value)])
    ),
    fontFamily: {
      display: [fontFamily.display],
      'display-italic': [fontFamily.displayItalic],
      sans: [fontFamily.sans],
      medium: [fontFamily.sansMedium],
      semibold: [fontFamily.sansSemiBold],
    },
    fontSize,
    extend: {},
  },
  plugins: [],
} satisfies Config;
