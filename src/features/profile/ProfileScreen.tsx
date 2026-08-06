import { useQuery } from '@tanstack/react-query';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar, Button, Card, FieldRow, Text } from '@/components';
import { useAuth } from '@/features/auth';
import { hasBackend } from '@/lib/env';
import { wardrobeService } from '@/services/wardrobe';
import { colors, screenPadding, spacing } from '@/theme';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/types/wardrobe';

/**
 * Perfil.
 *
 * Não é um painel: é uma página de conta. O que o usuário faz aqui é conferir
 * quem ele é para o produto e sair — as preferências de estilo que vão moldar a
 * recomendação chegam no onboarding, e é lá que serão editadas.
 */
export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { session, signOut } = useAuth();

  const counts = useQuery({
    queryKey: ['wardrobe', 'counts'],
    queryFn: () => wardrobeService.countByCategory(),
  });

  const total = counts.data
    ? Object.values(counts.data).reduce((sum, value) => sum + value, 0)
    : 0;

  const largest = counts.data
    ? [...CATEGORY_ORDER].sort(
        (a, b) => (counts.data[b] ?? 0) - (counts.data[a] ?? 0)
      )[0]
    : undefined;

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing['2xl'] },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.identity}>
          <Avatar name={session?.user.name} imageUri={session?.user.avatarUrl} />
          <View style={styles.identityCopy}>
            <Text variant="title">{session?.user.name ?? 'Você'}</Text>
            <Text variant="caption" tone="secondary">
              {session?.user.email}
            </Text>
          </View>
        </View>

        <Text variant="label" tone="secondary" style={styles.sectionLabel}>
          Seu armário
        </Text>
        <Card>
          <FieldRow label="Peças" value={String(total)} />
          <FieldRow
            label="Categoria mais forte"
            value={largest ? CATEGORY_LABELS[largest] : '—'}
            last
          />
        </Card>

        <Text variant="label" tone="secondary" style={styles.sectionLabel}>
          Conta
        </Text>
        <Card>
          <FieldRow
            label="Entrou com"
            value={
              session?.provider === 'google'
                ? 'Google'
                : session?.provider === 'apple'
                  ? 'Apple'
                  : 'E-mail'
            }
          />
          <FieldRow
            label="Dados"
            value={hasBackend ? 'Sincronizados' : 'Demonstração'}
            last
          />
        </Card>

        {!hasBackend ? (
          <Text variant="caption" tone="secondary" style={styles.demoNote}>
            Sem backend configurado, o armário e os looks vivem só nesta sessão.
          </Text>
        ) : null}

        <View style={styles.signOut}>
          <Button
            label="Sair da conta"
            variant="ghost"
            icon="sair"
            onPress={signOut}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: screenPadding,
    paddingBottom: spacing['3xl'],
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  identityCopy: {
    flex: 1,
    gap: 2,
  },
  sectionLabel: {
    marginTop: spacing['2xl'],
    marginBottom: spacing.md,
  },
  demoNote: {
    marginTop: spacing.lg,
  },
  signOut: {
    marginTop: spacing['2xl'],
    alignItems: 'flex-start',
  },
});
