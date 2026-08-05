import { View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

import { colors, fontFamily, spacing } from '@/theme';

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
 */
const GRID = 64;

/**
 * A moldura, aberta no quadrante inferior direito.
 *
 * O vão vai de (58,30) a (30,58) — largo o bastante para o M ocupá-lo inteiro.
 * Com uma abertura estreita o M encostava nas arestas e o símbolo lia como
 * erro de alinhamento; aqui ele **fecha** a moldura, que é exatamente o
 * conceito: enquadrar para revelar o essencial.
 */
const FRAME_PATH = 'M30 58 L6 58 L6 6 L58 6 L58 30';

/** Centro do vão. O M é posicionado nele, não no centro do quadro. */
const MARK_X = 44;
const MARK_BASELINE = 55;
const MARK_SIZE = 32;

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
  const stroke = (2.5 * size) / GRID;

  return (
    <View className="items-center">
      <Svg width={size} height={size} viewBox={`0 0 ${GRID} ${GRID}`} fill="none">
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
