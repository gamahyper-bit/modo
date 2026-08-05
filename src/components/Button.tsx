import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  colors,
  disabledOpacity,
  radius,
  spacing,
  type IconSizeToken,
} from '@/theme';

import { AppIcon, type AppIconName } from './AppIcon';
import { Loading } from './Loading';
import { Text } from './Text';
import { usePressMotion } from './motion';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: AppIconName;
  fullWidth?: boolean;
};

// Alturas próximas das do iOS. Botão alto demais ocupa peso que pertence ao
// conteúdo — e o conteúdo aqui é a roupa.
const heights: Record<ButtonSize, number> = { md: 40, lg: 48 };
const iconSizes: Record<ButtonSize, IconSizeToken> = { md: 'sm', lg: 'md' };

const surfaces: Record<ButtonVariant, object> = {
  primary: { backgroundColor: colors.accent },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: { backgroundColor: 'transparent' },
};

const contentTones = {
  primary: 'onAccent',
  secondary: 'primary',
  ghost: 'primary',
} as const;

const contentColors: Record<ButtonVariant, string> = {
  primary: colors.onAccent,
  secondary: colors.textPrimary,
  ghost: colors.textPrimary,
};

/**
 * Ação primária do produto.
 *
 * O estado `loading` mantém o rótulo ocupando o espaço com opacidade zero e
 * sobrepõe o indicador. É o que impede o botão de encolher no meio de uma
 * requisição — encolher é o detalhe que faz um app parecer barato.
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  icon,
  fullWidth = true,
}: ButtonProps) {
  const inactive = disabled || loading;
  const { animatedStyle, pressHandlers } = usePressMotion({
    inactive,
    baseOpacity: disabled ? disabledOpacity : 1,
  });

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      accessibilityLabel={label}
      disabled={inactive}
      onPress={onPress}
      {...pressHandlers}
      style={[
        styles.base,
        surfaces[variant],
        {
          height: heights[size],
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
          paddingHorizontal: variant === 'ghost' ? spacing.sm : spacing.xl,
        },
        animatedStyle,
      ]}
    >
      <View style={[styles.content, loading && styles.hidden]}>
        {icon ? (
          <AppIcon
            name={icon}
            size={iconSizes[size]}
            color={contentColors[variant]}
          />
        ) : null}
        <Text variant="action" tone={contentTones[variant]}>
          {label}
        </Text>
      </View>

      {loading ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={styles.center}>
            <Loading size={20} color={contentColors[variant]} />
          </View>
        </View>
      ) : null}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  // O rótulo continua medindo a caixa, só não é visto.
  hidden: {
    opacity: 0,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
