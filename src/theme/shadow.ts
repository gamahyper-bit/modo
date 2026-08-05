import { Platform } from 'react-native';

type Shadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

const build = (
  y: number,
  blur: number,
  opacity: number,
  elevation: number
): Shadow => ({
  shadowColor: '#0D0D0D',
  shadowOffset: { width: 0, height: y },
  shadowOpacity: Platform.OS === 'android' ? 0 : opacity,
  shadowRadius: blur,
  elevation,
});

/**
 * Sombras quase imperceptíveis. Elevação aqui é sugestão de profundidade, não
 * efeito: o que separa as superfícies é o espaço e a borda de areia.
 */
export const shadow = {
  none: build(0, 0, 0, 0),
  /** Cards apoiados no canvas. */
  subtle: build(1, 3, 0.04, 1),
  /** Superfícies que flutuam: bottom sheet, barra de navegação. */
  raised: build(4, 16, 0.08, 4),
  /** Modais sobre o overlay. */
  overlay: build(12, 32, 0.12, 12),
} as const;

export type ShadowToken = keyof typeof shadow;
