import { ScrollView, StyleSheet } from 'react-native';

import { Chip } from '@/components';
import { screenPadding, spacing } from '@/theme';
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type GarmentCategory,
} from '@/types/wardrobe';

type CategoryFilterProps = {
  value: GarmentCategory | 'todas';
  onChange: (value: GarmentCategory | 'todas') => void;
  counts?: Record<GarmentCategory, number>;
};

/**
 * Filtro por categoria.
 *
 * Categorias vazias não aparecem: um armário sem bermuda nenhuma não deve
 * exibir um filtro que só leva a lugar nenhum. O armário mostra o que o usuário
 * tem, não o que poderia ter.
 */
export function CategoryFilter({ value, onChange, counts }: CategoryFilterProps) {
  const available = CATEGORY_ORDER.filter(
    (category) => (counts?.[category] ?? 0) > 0
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      <Chip
        label="Todas"
        selected={value === 'todas'}
        onPress={() => onChange('todas')}
      />
      {available.map((category) => (
        <Chip
          key={category}
          label={CATEGORY_LABELS[category]}
          icon={category}
          selected={value === category}
          onPress={() => onChange(category)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
    paddingHorizontal: screenPadding,
  },
});
