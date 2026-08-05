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
/**
 * Teto de 280ms para qualquer animação do produto. Acima disso o usuário deixa
 * de sentir resposta e passa a esperar — e esperar nunca parece premium.
 */
export const MAX_DURATION = 280;

export const duration = {
  /** Feedback de toque. */
  instant: 100,
  fast: 160,
  /** Padrão para entradas e transições de estado. */
  base: 220,
  slow: 280,
  /** A revelação do look na Home — o movimento mais longo que existe aqui. */
  reveal: 280,
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

/**
 * Animações contínuas — indicador de carga e pulso do skeleton.
 *
 * Loops não são transições: não levam o usuário de um estado a outro, apenas
 * sinalizam que algo está em curso. Por isso não respondem ao teto de 280ms —
 * um giro nessa velocidade pareceria pânico, não trabalho.
 */
export const loop = {
  spin: 900,
  pulse: 1400,
} as const;

/**
 * Intervalo entre itens de uma sequência revelada.
 *
 * Curto de propósito: com o teto de 280ms, uma sequência de 5 itens já termina
 * em 280 + 4×40 = 440ms. Sequências longas não cabem no ritmo do produto.
 */
export const staggerStep = 40;

// O teto vira regra verificável, não convenção esquecida no code review.
if (__DEV__) {
  const acima = Object.entries(duration).filter(
    ([, valor]) => valor > MAX_DURATION
  );

  if (acima.length > 0) {
    throw new Error(
      `Motion: duração acima do teto de ${MAX_DURATION}ms — ` +
        acima.map(([nome, valor]) => `${nome}=${valor}ms`).join(', ')
    );
  }
}

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
