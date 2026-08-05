import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import { AppIcon, type AppIconName } from './AppIcon';
import { Text } from './Text';

export type BadgeTone = 'neutral' | 'solid' | 'outline';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  icon?: AppIconName;
};

/**
 * Etiqueta informativa — "uniforme", "nunca usei", "na lavanderia".
 *
 * Diferente do Chip: badge não recebe toque. É leitura, não escolha.
 */
export function Badge({ label, tone = 'neutral', icon }: BadgeProps) {
  const tint = tone === 'solid' ? colors.onAccent : colors.textSecondary;

  return (
    <View style={[styles.base, surfaces[tone]]}>
      {icon ? <AppIcon name={icon} size={12} color={tint} /> : null}
      <Text variant="label" tone={tone === 'solid' ? 'onAccent' : 'secondary'}>
        {label}
      </Text>
    </View>
  );
}

const surfaces: Record<BadgeTone, object> = {
  neutral: { backgroundColor: colors.surfaceMuted },
  solid: { backgroundColor: colors.accent },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    height: 22,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
});
