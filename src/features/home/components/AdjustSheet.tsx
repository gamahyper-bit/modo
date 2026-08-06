import { StyleSheet, View } from 'react-native';

import { BottomSheet, Chip, Text } from '@/components';
import { spacing } from '@/theme';
import {
  ADJUSTMENT_GROUPS,
  ADJUSTMENT_LABELS,
  type LookAdjustment,
} from '@/types/look';

type AdjustSheetProps = {
  visible: boolean;
  onClose: () => void;
  onAdjust: (adjustment: LookAdjustment) => void;
  pending?: LookAdjustment;
  /** O ajuste já em vigor — aparece marcado, e tocar nele desfaz. */
  active?: LookAdjustment;
};

/**
 * Ajuste da recomendação.
 *
 * Cada opção é uma frase inteira que o usuário diria em voz alta para um
 * stylist — "está frio", "mais elegante". Nenhum controle, nenhum formulário:
 * o usuário reage, a IA refaz o trabalho.
 *
 * Dois grupos, porque são dois pedidos diferentes: **trocar** mira uma peça,
 * **refinar** mira o conjunto. Numa fileira só, os seis chips pareciam seis
 * filtros equivalentes.
 *
 * O ajuste em vigor aparece marcado. Sem isso o usuário reabre o sheet e não
 * tem como saber o que já pediu — e um pedido invisível é indistinguível de um
 * pedido ignorado.
 */
export function AdjustSheet({
  visible,
  onClose,
  onAdjust,
  pending,
  active,
}: AdjustSheetProps) {
  return (
    <BottomSheet visible={visible} onClose={onClose} title="Ajustar">
      <View style={styles.groups}>
        {ADJUSTMENT_GROUPS.map((group) => (
          <View key={group.title} style={styles.group}>
            <Text variant="label" tone="secondary">
              {group.title}
            </Text>
            <View style={styles.options}>
              {group.adjustments.map((adjustment) => (
                <Chip
                  key={adjustment}
                  label={ADJUSTMENT_LABELS[adjustment]}
                  selected={active === adjustment}
                  loading={pending === adjustment}
                  onPress={() => onAdjust(adjustment)}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  groups: {
    gap: spacing.xl,
    paddingBottom: spacing.lg,
  },
  group: {
    gap: spacing.md,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
