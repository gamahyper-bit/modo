import { StyleSheet, View } from 'react-native';

import { ClothingCard, Text } from '@/components';
import { spacing } from '@/theme';
import type { Garment } from '@/types/wardrobe';

type LookPiecesProps = {
  garments: Garment[];
  loading?: boolean;
};

/**
 * As peças que compõem a recomendação.
 *
 * Vive **abaixo** das ações, e isso é deliberado: elas comprovam a escolha, mas
 * quem chega na Home quer decidir, não auditar. Acima das ações elas empurravam
 * "Gerar outro" e "Ajustar" para fora da dobra num iPhone.
 */
export function LookPieces({ garments, loading = false }: LookPiecesProps) {
  return (
    <View style={styles.root}>
      <Text variant="label" tone="secondary">
        Peças do look
      </Text>

      <View style={styles.strip}>
        {loading
          ? [0, 1, 2, 3].map((index) => (
              <ClothingCard key={index} variant="compact" loading />
            ))
          : garments.map((garment) => (
              <ClothingCard
                key={garment.id}
                variant="compact"
                name={garment.name}
                imageUri={garment.imageUri}
                placeholderIcon={garment.category}
              />
            ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: spacing['2xl'],
    gap: spacing.lg,
  },
  strip: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
