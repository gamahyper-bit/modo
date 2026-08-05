import Svg, { Path } from 'react-native-svg';

import { iconStroke } from '@/theme';

/**
 * Primitiva da família de ícones do Modo.
 *
 * Todo ícone próprio nasce daqui, e por isso compartilha exatamente a mesma
 * linguagem do logo FRAME:
 *
 * - **grid** 24×24, com 2px de margem viva (desenho útil em 20×20)
 * - **stroke** `iconStroke` em unidades do viewBox, portanto escalando junto
 *   com o ícone — exatamente como o Lucide faz
 * - **terminações** arredondadas, iguais às do Lucide — a família própria e a
 *   biblioteca precisam conviver na mesma tela sem denunciar a costura
 *
 * O traço nunca é preenchido: no FRAME o desenho contorna, não ocupa.
 */
export const GLYPH_GRID = 24;

type FrameGlyphProps = {
  /** Um ou mais paths no grid 24×24. */
  paths: readonly string[];
  size: number;
  color: string;
  strokeWidth?: number;
};

export function FrameGlyph({
  paths,
  size,
  color,
  strokeWidth = iconStroke,
}: FrameGlyphProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${GLYPH_GRID} ${GLYPH_GRID}`}
      fill="none"
    >
      {paths.map((d) => (
        <Path
          key={d}
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}
