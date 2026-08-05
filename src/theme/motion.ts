import { Easing } from 'react-native-reanimated';

/**
 * "Revelar, não aparecer."
 *
 * Nada entra em cena com salto ou quique. Tudo desliza curto e desacelera —
 * o movimento precisa parecer que alguém posicionou a peça, não que o software
 * animou um elemento.
 */
export const duration = {
  /** Feedback de toque. */
  instant: 120,
  fast: 180,
  /** Padrão para entradas e transições de estado. */
  base: 260,
  slow: 420,
  /** A revelação do look na Home. */
  reveal: 640,
} as const;

export const easing = {
  /** Entradas: começa rápido, assenta devagar. */
  reveal: Easing.bezier(0.16, 1, 0.3, 1),
  /** Transições simétricas de estado. */
  standard: Easing.bezier(0.4, 0, 0.2, 1),
  /** Saídas: some sem chamar atenção. */
  exit: Easing.bezier(0.4, 0, 1, 1),
} as const;

/** Deslocamento vertical padrão de uma entrada revelada. */
export const revealOffset = 12;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
