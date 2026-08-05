import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { colors, disabledOpacity, radius, spacing, typography } from '@/theme';

import { Loading } from './Loading';
import { Text } from './Text';

type InputProps = Omit<TextInputProps, 'style' | 'editable'> & {
  label?: string;
  /** Mensagem de erro. Presente = campo inválido. */
  error?: string;
  disabled?: boolean;
  /** Validação em curso — e-mail sendo verificado, por exemplo. */
  loading?: boolean;
};

/**
 * Campo de texto livre.
 *
 * Use com parcimônia: o Modo pede pouco ao usuário, e a maior parte do cadastro
 * é escolha, não digitação. Para escolha, use `FieldRow`.
 *
 * O foco engrossa a borda para preto em vez de acender uma cor de destaque — a
 * paleta não tem cor de destaque, e o contraste já basta.
 */
export function Input({
  label,
  error,
  disabled = false,
  loading = false,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ opacity: disabled ? disabledOpacity : 1 }}>
      {label ? (
        <Text variant="label" tone="secondary" style={styles.label}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.field,
          focused && styles.fieldFocused,
          error ? styles.fieldError : null,
        ]}
      >
        <TextInput
          style={styles.input}
          editable={!disabled && !loading}
          placeholderTextColor={colors.textSecondary}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityLabel={label}
          {...rest}
        />
        {loading ? <Loading size={16} color={colors.textSecondary} /> : null}
      </View>

      {error ? (
        <Text variant="caption" tone="secondary" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.sm,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 52,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fieldFocused: {
    borderColor: colors.signature,
  },
  fieldError: {
    borderColor: colors.textPrimary,
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    ...typography.body,
  },
  error: {
    marginTop: spacing.sm,
  },
});
