import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors, disabledOpacity, radius, spacing } from '@/theme';

import { AppIcon, type AppIconName } from './AppIcon';
import { Loading } from './Loading';
import { Text } from './Text';
import { usePressMotion } from './motion';

type ChipProps = {
  label: string;
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  /** Opcional — categorias e ajustes de clima ganham leitura instantânea. */
  icon?: AppIconName;
};

/**
 * Escolha rápida: filtros do armário e ajustes do look.
 *
 * O chip nunca é um botão disfarçado. Ele representa um estado que pode ser
 * ligado e desligado, e por isso se anuncia como `radio` para a acessibilidade.
 */
export function Chip({
  label,
  onPress,
  selected = false,
  disabled = false,
  loading = false,
  icon,
}: ChipProps) {
  const inactive = disabled || loading;
  const { animatedStyle, pressHandlers } = usePressMotion({ inactive });

  const tint = selected ? colors.onAccent : colors.textPrimary;

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected, disabled, busy: loading }}
        accessibilityLabel={label}
        disabled={inactive}
        onPress={onPress}
        {...pressHandlers}
        style={[
          styles.base,
          selected ? styles.selected : styles.unselected,
          { opacity: disabled ? disabledOpacity : 1 },
        ]}
      >
        <View style={[styles.content, loading && styles.hidden]}>
          {/* `md` e não `sm`: a família de vestuário perde leitura a 16px. */}
          {icon ? <AppIcon name={icon} size="md" color={tint} /> : null}
          <Text variant="bodySmall" tone={selected ? 'onAccent' : 'primary'}>
            {label}
          </Text>
        </View>

        {loading ? (
          <View style={styles.overlay} pointerEvents="none">
            <Loading size={16} color={tint} />
          </View>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 36,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselected: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selected: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  // Preserva a largura do rótulo enquanto o indicador ocupa o centro.
  hidden: {
    opacity: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
