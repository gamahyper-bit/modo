import { StyleSheet, View } from 'react-native';

import { spacing } from '@/theme';

import { Button } from './Button';
import { Text } from './Text';

type EmptyStateProps = {
  /**
   * A afirmação. Escreva com quebras de linha propositais — este texto é
   * composto, não corrido:
   *
   *   'Seu guarda-roupa\ntem mais potencial\ndo que parece.'
   */
  title: string;
  /** O próximo passo, em uma linha. */
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
};

/**
 * Estado vazio — uma página de campanha, não um aviso de sistema.
 *
 * Alinhado à esquerda e em tipografia de display, porque um vazio centralizado
 * com ícone acima lê como erro. Aqui não há erro nenhum: há um convite. É a
 * primeira vez que o produto fala sozinho com o usuário, e precisa soar como a
 * capa de um editorial.
 *
 * Tom de voz — três regras para qualquer texto que passe por aqui:
 *
 * 1. O título **afirma um potencial**, não constata uma falta. "Seu
 *    guarda-roupa tem mais potencial do que parece", nunca "Nenhuma peça
 *    encontrada".
 * 2. A descrição diz **o que fazer**, em uma linha, sem explicar o produto.
 * 3. Sem desculpas, sem emoji, sem entusiasmo forçado. Sem exageros, sem
 *    promessas vazias.
 *
 * Sem ícone: a tipografia carrega sozinha. Um ícone aqui devolveria o estado ao
 * vocabulário de sistema do qual queremos sair.
 */
export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  loading = false,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text variant="display">{title}</Text>

      {description ? (
        <Text variant="body" tone="secondary" style={styles.description}>
          {description}
        </Text>
      ) : null}

      {actionLabel && onAction ? (
        <View style={styles.action}>
          <Button
            label={actionLabel}
            onPress={onAction}
            loading={loading}
            fullWidth={false}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing['3xl'],
  },
  description: {
    marginTop: spacing.lg,
    maxWidth: 280,
  },
  action: {
    marginTop: spacing['2xl'],
  },
});
