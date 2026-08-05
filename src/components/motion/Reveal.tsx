import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { useReveal } from './useReveal';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  distance?: number;
  enabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Envolve qualquer conteúdo na entrada padrão do produto. */
export function Reveal({ children, delay, distance, enabled, style }: RevealProps) {
  const animatedStyle = useReveal({ delay, distance, enabled });

  return <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>;
}
