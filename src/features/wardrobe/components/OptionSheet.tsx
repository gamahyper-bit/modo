import { StyleSheet, View } from 'react-native';

import { BottomSheet, Button, Chip } from '@/components';
import { spacing } from '@/theme';

export type Option<T extends string> = {
  value: T;
  label: string;
};

type OptionSheetProps<T extends string> = {
  visible: boolean;
  title: string;
  options: Option<T>[];
  /** Um valor, ou vários quando o atributo aceita mais de um. */
  selected: T[];
  multiple?: boolean;
  onSelect: (values: T[]) => void;
  onClose: () => void;
};

/**
 * Correção de um atributo lido pela IA.
 *
 * Escolha única fecha ao toque: o usuário decidiu, não há o que confirmar.
 * Escolha múltipla precisa de um "Pronto", porque o gesto não indica sozinho
 * quando terminou.
 */
export function OptionSheet<T extends string>({
  visible,
  title,
  options,
  selected,
  multiple = false,
  onSelect,
  onClose,
}: OptionSheetProps<T>) {
  const toggle = (value: T) => {
    if (!multiple) {
      onSelect([value]);
      onClose();
      return;
    }

    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    // Nunca deixa esvaziar: um atributo sem valor nenhum é pior que um errado.
    if (next.length > 0) onSelect(next);
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title={title}>
      <View style={styles.options}>
        {options.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            selected={selected.includes(option.value)}
            onPress={() => toggle(option.value)}
          />
        ))}
      </View>

      {multiple ? (
        <View style={styles.done}>
          <Button label="Pronto" size="md" onPress={onClose} />
        </View>
      ) : null}
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
  done: {
    paddingBottom: spacing.md,
  },
});
