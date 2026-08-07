import { View } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';

import {
  BRAND_GRID,
  type BrandGeometry,
  colors,
  fontFamily,
  framePathOf,
  geometryFor,
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
 * A geometria vive em `theme/brand.ts`, e não aqui, porque o ícone do app é
 * gerado a partir dela pelo mesmo conjunto de números.
 *
 * **O desenho muda com o tamanho.** Abaixo de 40 pontos o componente troca para
 * o grau compacto — moldura mais grossa, M maior, vão mais largo. Não é uma
 * marca diferente: é a mesma marca desenhada para sobreviver ao pixel. O
 * cabeçalho do app usa 28, então quem mais ganha com isso é a própria tela
 * principal.
 */
type LogoProps = {
  /** `mark` = só o símbolo. `wordmark` = símbolo + MODO. */
  variant?: 'mark' | 'wordmark';
  size?: number;
  color?: string;
  /** Força um grau óptico. Por padrão, decide pelo tamanho. */
  geometry?: BrandGeometry;
};

export function Logo({
  variant = 'wordmark',
  size = 64,
  color = colors.textPrimary,
  geometry,
}: LogoProps) {
  const brand = geometry ?? geometryFor(size);

  return (
    <View className="items-center">
      <Svg
        width={size}
        height={size}
        viewBox={`0 0 ${BRAND_GRID} ${BRAND_GRID}`}
        fill="none"
      >
        {/* `strokeWidth` está em unidades do viewBox, não em pixels: o
            `viewBox` de 64 já é escalado para `size` pelo próprio SVG.
            Converter aqui escalava duas vezes, e o traço saía a 44% do peso
            desenhado no cabeçalho — foi o que fez a marca em tela parecer
            sempre mais fina que o ícone gerado. */}
        <Path
          d={framePathOf(brand)}
          stroke={color}
          strokeWidth={brand.stroke}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <SvgText
          x={brand.markX}
          y={brand.markBaseline}
          fill={color}
          fontSize={brand.markSize}
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
