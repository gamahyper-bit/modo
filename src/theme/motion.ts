import { Easing } from 'react-native-reanimated';

/**
 * "Revelar, não aparecer."
 *
 * Nada entra em cena com salto ou quique. Tudo desliza curto e desacelera —
 * o movimento precisa parecer que alguém posicionou a peça, não que o software
 * animou um elemento.
 *
 * Estes são os *tokens*. Quem os aplica é `src/components/motion`: nenhum
 * componente escreve `withTiming` por conta própria.
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

/**
 * Resposta ao toque. O elemento cede de leve — o suficiente para o dedo sentir,
 * pouco o bastante para não parecer brinquedo.
 */
export const press = {
  scale: 0.97,
  opacity: 0.9,
} as const;

/** Opacidade de um elemento desabilitado. */
export const disabledOpacity = 0.35;

/** Intervalo entre itens de uma sequência revelada (grid do armário, chips). */
export const staggerStep = 45;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
