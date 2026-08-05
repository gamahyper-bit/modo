import Animated from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { colors } from '@/theme';

import { useSpin } from './motion';

type LoadingProps = {
  size?: number;
  color?: string;
};

const RADIUS = 9;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
/** Mais encorpado que o traço dos ícones: a 16px um arco de 1.5 desaparece. */
const STROKE = 2.25;
/** Um terço da volta — abaixo disso o giro lê como risco, não como progresso. */
const ARC = 0.32;
/** A trilha é presença, não informação: fica no limiar do perceptível. */
const TRACK_OPACITY = 0.18;

/**
 * Indicador de carga do produto — não o spinner do sistema, que tem a cara da
 * plataforma e não a do Modo.
 *
 * A trilha de fundo existe para que o indicador se identifique **parado**. Só o
 * arco girando funciona em movimento, mas num frame congelado — um print de
 * revisão, uma captura do usuário, o primeiro quadro do render — ele lê como um
 * traço solto.
 *
 * A trilha gira junto com o arco, e isso não tem consequência: um círculo
 * completo é simétrico à rotação.
 */
export function Loading({ size = 20, color = colors.textPrimary }: LoadingProps) {
  const spinStyle = useSpin();

  return (
    <Animated.View style={[{ width: size, height: size }, spinStyle]}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle
          cx={12}
          cy={12}
          r={RADIUS}
          stroke={color}
          strokeWidth={STROKE}
          opacity={TRACK_OPACITY}
        />
        <Circle
          cx={12}
          cy={12}
          r={RADIUS}
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${CIRCUMFERENCE * ARC} ${CIRCUMFERENCE}`}
        />
      </Svg>
    </Animated.View>
  );
}
