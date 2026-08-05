/**
 * Espaçamento em base 4. O produto respira: quando estiver em dúvida entre dois
 * degraus, use o maior.
 */
export const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
  '5xl': 96,
} as const;

/** Margem lateral padrão de qualquer tela. */
export const screenPadding = spacing.xl;

export type SpacingToken = keyof typeof spacing;
