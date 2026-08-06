import { View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

import {
  BRAND_GRID,
  FRAME_PATH,
  FRAME_STROKE,
  MARK_BASELINE,
  MARK_SIZE,
  MARK_X,
  colors,
  fontFamily,
  spacing,
} from '@/theme';

import { Text } from './Text';

/**
 * Marca FRAME.
 *
 * O conceito é enquadrar para revelar o essencial: o quadro se abre no canto
 * inferior direito e é o próprio M que fecha a composição. O vão não é
 * decoração — é o que dá ao símbolo a leitura de "moldura", e não de "caixa".
 *
 * O M é tipografia real (a serifa de display do produto), não um path: trocar a
 * fonte de display troca a marca junto, como deve ser.
 *
 * A geometria vive em `theme/brand.ts`, e não aqui, porque o ícone do app e o
 * splash são gerados a partir dela pelo mesmo conjunto de números.
 */
type LogoProps = {
  /** `mark` = só o símbolo. `wordmark` = símbolo + MODO. */
  variant?: 'mark' | 'wordmark';
  size?: number;
  color?: string;
};

export function Logo({
  variant = 'wordmark',
  size = 64,
  color = colors.textPrimary,
}: LogoProps) {
  // O traço acompanha a escala do símbolo, como na família de ícones.
  const stroke = (FRAME_STROKE * size) / BRAND_GRID;

  return (
    <View className="items-center">
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${BRAND_GRID} ${BRAND_GRID}`}
        fill="none"
      >
        <Path
          d={FRAME_PATH}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <SvgText
          x={MARK_X}
          y={MARK_BASELINE}
          fill={color}
          fontSize={MARK_SIZE}
          fontFamily={fontFamily.display}
          textAnchor="middle"
        >
          M
        </SvgText>
      </Svg>

      {variant === 'wordmark' && (
        <Text
          variant="label"
          tone="primary"
          style={{ marginTop: spacing.sm, letterSpacing: 4 }}
        >
          Modo
        </Text>
      )}
    </View>
  );
}
