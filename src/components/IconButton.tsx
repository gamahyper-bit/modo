import { Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors, disabledOpacity, radius, type IconSizeToken } from '@/theme';

import { AppIcon, type AppIconName } from './AppIcon';
import { Loading } from './Loading';
import { usePressMotion } from './motion';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type IconButtonVariant = 'plain' | 'outlined' | 'filled';

type IconButtonProps = {
  icon: AppIconName;
  /** Obrigatório: um botão só com ícone não se explica sozinho. */
  accessibilityLabel: string;
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: IconSizeToken;
  disabled?: boolean;
  loading?: boolean;
};

/** Área mínima de toque — abaixo disso o alvo é hostil ao dedo. */
const TOUCH_TARGET = 44;

const surfaces: Record<IconButtonVariant, object> = {
  plain: { backgroundColor: 'transparent' },
  outlined: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filled: { backgroundColor: colors.accent },
};

const tints: Record<IconButtonVariant, string> = {
  plain: colors.textPrimary,
  outlined: colors.textPrimary,
  filled: colors.onAccent,
};

export function IconButton({
  icon,
  accessibilityLabel,
  onPress,
  variant = 'plain',
  size = 'lg',
  disabled = false,
  loading = false,
}: IconButtonProps) {
  const inactive = disabled || loading;
  const { animatedStyle, pressHandlers } = usePressMotion({
    inactive,
    baseOpacity: disabled ? disabledOpacity : 1,
  });

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      {...pressHandlers}
      style={[styles.base, surfaces[variant], animatedStyle]}
    >
      {loading ? (
        <Loading size={20} color={tints[variant]} />
      ) : (
        <AppIcon name={icon} size={size} color={tints[variant]} />
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: TOUCH_TARGET,
    height: TOUCH_TARGET,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
