/**
 * Raios contidos. Cantos muito arredondados leem como marketplace;
 * o FRAME quer aresta calma, não bolha.
 */
export const radius = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  '2xl': 28,
  /** Chips, avatares e o botão central da navegação. */
  full: 999,
} as const;

export type RadiusToken = keyof typeof radius;
