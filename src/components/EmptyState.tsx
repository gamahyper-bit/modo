import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/theme';

import { AppIcon, type AppIconName } from './AppIcon';
import { Button } from './Button';
import { Text } from './Text';

type EmptyStateProps = {
  /** Uma frase afirmativa. Nunca uma constatação de falta. */
  title: string;
  /** O próximo passo, em uma linha. */
  description?: string;
  icon?: AppIconName;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
};

/**
 * Estado vazio.
 *
 * Tom de voz da marca: claro, direto, humano — o stylist entende, sugere e
 * confia. Na prática, três regras para qualquer texto que passe por aqui:
 *
 * 1. O título **convida**, não constata. "Comece pelo essencial", não "Nenhuma
 *    peça encontrada".
 * 2. A descrição diz **o que fazer** e o que vem depois. Uma linha.
 * 3. Nada de desculpas, emoji ou entusiasmo forçado. Sem exageros, sem
 *    promessas vazias.
 *
 * O ícone é da família própria, em traço fino e cor de borda: ele situa, não
 * ilustra.
 */
export function EmptyState({
  title,
  description,
  icon = 'cabide',
  actionLabel,
  onAction,
  loading = false,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <AppIcon name={icon} size={40} color={colors.borderStrong} />

      <View style={styles.copy}>
        <Text variant="title" style={styles.centered}>
          {title}
        </Text>
        {description ? (
          <Text variant="body" tone="secondary" style={styles.centered}>
            {description}
          </Text>
        ) : null}
      </View>

      {actionLabel && onAction ? (
        <Button
          label={actionLabel}
          onPress={onAction}
          loading={loading}
          fullWidth={false}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing['3xl'],
    gap: spacing.xl,
  },
  copy: {
    alignItems: 'center',
    gap: spacing.sm,
    maxWidth: 300,
  },
  centered: {
    textAlign: 'center',
  },
});
