import { StyleSheet, View } from 'react-native';

import { BottomSheet, Chip } from '@/components';
import { spacing } from '@/theme';
import { ADJUSTMENT_LABELS, type LookAdjustment } from '@/types/look';

type AdjustSheetProps = {
  visible: boolean;
  onClose: () => void;
  onAdjust: (adjustment: LookAdjustment) => void;
  pending?: LookAdjustment;
  /** O ajuste já em vigor — aparece marcado, e tocar nele desfaz. */
  active?: LookAdjustment;
};

const ADJUSTMENTS = Object.keys(ADJUSTMENT_LABELS) as LookAdjustment[];

/**
 * Ajuste da recomendação.
 *
 * Cada opção é uma frase inteira que o usuário diria em voz alta para um
 * stylist — "está frio", "mais elegante". Nenhum controle, nenhum formulário:
 * o usuário reage, a IA refaz o trabalho.
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
      <View style={styles.options}>
        {ADJUSTMENTS.map((adjustment) => (
          <Chip
            key={adjustment}
            label={ADJUSTMENT_LABELS[adjustment]}
            selected={active === adjustment}
            loading={pending === adjustment}
            onPress={() => onAdjust(adjustment)}
          />
        ))}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
});
