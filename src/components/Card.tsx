import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { colors, radius, shadow, spacing } from '@/theme';

import { usePressMotion } from './motion';

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  /** Sem padding quando o conteúdo sangra até a borda (foto, por exemplo). */
  padded?: boolean;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

/**
 * Superfície base. Todo agrupamento visual do produto nasce daqui, para que a
 * relação entre borda, raio e sombra seja idêntica em toda parte.
 */
export function Card({
  children,
  onPress,
  padded = true,
  elevated = false,
  style,
  accessibilityLabel,
}: CardProps) {
  const { animatedStyle, pressHandlers } = usePressMotion({
    inactive: !onPress,
  });

  const surface = [
    styles.base,
    padded && styles.padded,
    elevated ? shadow.subtle : null,
    style,
  ];

  if (!onPress) {
    return <Animated.View style={surface}>{children}</Animated.View>;
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        {...pressHandlers}
        style={surface}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  padded: {
    padding: spacing.lg,
  },
});
