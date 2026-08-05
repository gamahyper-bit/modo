import {
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';

import { colors, typography, type TypographyToken } from '@/theme';

const tones = {
  primary: colors.textPrimary,
  secondary: colors.textSecondary,
  inverse: colors.textInverse,
  onAccent: colors.onAccent,
} as const;

export type TextTone = keyof typeof tones;

type TextProps = RNTextProps & {
  /** Degrau da escala tipográfica. Não existe texto fora da escala. */
  variant?: TypographyToken;
  tone?: TextTone;
};

/**
 * Todo texto do produto passa por aqui.
 *
 * O componente existe para que tamanho, entrelinha, tracking e caixa cheguem
 * sempre juntos e sempre do token — `<Text variant="label">` não tem como
 * esquecer o `letterSpacing` que faz um rótulo em caixa alta funcionar.
 */
export function Text({
  variant = 'body',
  tone = 'primary',
  style,
  ...rest
}: TextProps) {
  return (
    <RNText
      style={[typography[variant] as TextStyle, { color: tones[tone] }, style]}
      {...rest}
    />
  );
}
