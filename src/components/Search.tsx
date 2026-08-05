import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { colors, disabledOpacity, radius, spacing, typography } from '@/theme';

import { AppIcon } from './AppIcon';
import { Loading } from './Loading';

type SearchProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Busca em curso no servidor. */
  loading?: boolean;
  onSubmit?: () => void;
};

/** Busca do armário. Um campo, sem filtros embutidos — filtro é Chip. */
export function Search({
  value,
  onChangeText,
  placeholder = 'Buscar no armário',
  disabled = false,
  loading = false,
  onSubmit,
}: SearchProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.field,
        focused && styles.focused,
        { opacity: disabled ? disabledOpacity : 1 },
      ]}
    >
      <AppIcon name="buscar" size="md" color={colors.textSecondary} />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        editable={!disabled}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        accessibilityLabel={placeholder}
      />

      {loading ? <Loading size={16} color={colors.textSecondary} /> : null}

      {!loading && value.length > 0 ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Limpar busca"
          onPress={() => onChangeText('')}
          hitSlop={12}
        >
          <AppIcon name="fechar" size="sm" color={colors.textSecondary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    height: 48,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  focused: {
    borderColor: colors.textPrimary,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    ...typography.body,
  },
});
