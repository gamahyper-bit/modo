/**
 * Ícones lineares, traço constante. Nunca preenchidos, nunca coloridos —
 * o ícone indica, a roupa fala.
 */
export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const;

/** Traço fino: o desenho tem que sumir ao lado da fotografia. */
export const iconStroke = 1.5;

export type IconSizeToken = keyof typeof iconSize;
