import type { DimensionValue } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors, radius as radiusTokens, type RadiusToken } from '@/theme';

import { usePulse } from './motion';

type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: RadiusToken;
};

/**
 * Placeholder de carregamento.
 *
 * Sempre ocupa exatamente a caixa do conteúdo que vai substituir — skeleton com
 * dimensão diferente do resultado troca uma espera por um salto de layout, que
 * é pior.
 */
export function Skeleton({
  width = '100%',
  height = 16,
  radius = 'sm',
}: SkeletonProps) {
  const pulseStyle = usePulse();

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radiusTokens[radius],
          backgroundColor: colors.surfaceMuted,
        },
        pulseStyle,
      ]}
    />
  );
}
