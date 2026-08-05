import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, screenPadding, spacing } from '@/theme';

import { Text } from './Text';

/**
 * Marcador de tela ainda não construída.
 *
 * Existe só para que o shell de navegação seja navegável antes das telas
 * ficarem prontas. Deve sumir do projeto quando a última tela existir — se ele
 * sobreviver ao MVP, virou dívida.
 */
export function EmScaffold({ title }: { title: string }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + spacing['3xl'] }]}>
      <Text variant="display">{title}</Text>
      <Text variant="body" tone="secondary" style={styles.note}>
        Em construção.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: screenPadding,
  },
  note: {
    marginTop: spacing.sm,
  },
});
