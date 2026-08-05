import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors, disabledOpacity, spacing } from '@/theme';

import { AppIcon } from './AppIcon';
import { Loading } from './Loading';
import { Text } from './Text';
import { usePressMotion } from './motion';

type FieldRowProps = {
  label: string;
  /** Valor atual. Ausente = o campo ainda espera uma escolha. */
  value?: string;
  placeholder?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  /** Amostra de cor, miniatura — o que ajudar a ler o valor de relance. */
  adornment?: ReactNode;
  /** Última linha de um grupo não desenha divisor. */
  last?: boolean;
};

/**
 * Linha de escolha — o padrão de formulário do Modo.
 *
 * O cadastro de peça é sempre "a IA preencheu, você confere": o valor já chega
 * escrito e o toque abre a correção. Uma linha com rótulo à esquerda e valor à
 * direita comunica isso; uma caixa de input vazia comunicaria o contrário.
 */
export function FieldRow({
  label,
  value,
  placeholder = 'Escolher',
  onPress,
  disabled = false,
  loading = false,
  adornment,
  last = false,
}: FieldRowProps) {
  const inactive = disabled || loading || !onPress;
  const { animatedStyle, pressHandlers } = usePressMotion({ inactive });

  const content = (
    <View style={[styles.row, !last && styles.divider]}>
      <Text variant="body" tone="secondary">
        {label}
      </Text>

      <View style={styles.value}>
        {loading ? (
          <Loading size={16} color={colors.textSecondary} />
        ) : (
          <>
            {adornment}
            <Text variant="body" tone={value ? 'primary' : 'secondary'}>
              {value ?? placeholder}
            </Text>
            {onPress ? (
              <AppIcon name="avancar" size="sm" color={colors.textSecondary} />
            ) : null}
          </>
        )}
      </View>
    </View>
  );

  if (inactive) {
    return (
      <View style={{ opacity: disabled ? disabledOpacity : 1 }}>{content}</View>
    );
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value ?? placeholder}`}
        onPress={onPress}
        {...pressHandlers}
      >
        {content}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 52,
    paddingVertical: spacing.md,
    gap: spacing.lg,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
  },
});
