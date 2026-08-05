import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState, IconButton, Reveal, Search, Text } from '@/components';
import { colors, screenPadding, spacing } from '@/theme';

import { CategoryFilter } from './components/CategoryFilter';
import { GarmentGrid } from './components/GarmentGrid';
import { useWardrobe } from './hooks/useWardrobe';

/**
 * O armário.
 *
 * Uma coleção organizada, não um estoque: duas colunas, muito respiro e a peça
 * em tamanho de retrato. Nada de contadores por categoria, selos ou etiquetas
 * de status — o que o usuário precisa ver aqui é a roupa.
 */
export function WardrobeScreen() {
  const insets = useSafeAreaInsets();
  const [searching, setSearching] = useState(false);
  const {
    garments,
    isLoading,
    counts,
    total,
    category,
    setCategory,
    query,
    setQuery,
    isEmpty,
  } = useWardrobe();

  const closeSearch = () => {
    setQuery('');
    setSearching(false);
  };

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, styles.padded]}>
          <View>
            <Text variant="display">Armário</Text>
            {!isEmpty ? (
              <Text variant="caption" tone="secondary" style={styles.count}>
                {total} {total === 1 ? 'peça' : 'peças'}
              </Text>
            ) : null}
          </View>

          <View style={styles.headerActions}>
            <IconButton
              icon="adicionar"
              accessibilityLabel="Adicionar peça"
              onPress={() => router.push('/peca/nova')}
            />
            <IconButton
              icon={searching ? 'fechar' : 'buscar'}
              accessibilityLabel={searching ? 'Fechar busca' : 'Buscar peça'}
              onPress={() => (searching ? closeSearch() : setSearching(true))}
            />
          </View>
        </View>

        {isEmpty ? (
          <View style={styles.padded}>
            <EmptyState
              title={'Seu guarda-roupa\ntem mais potencial\ndo que parece.'}
              description="Fotografe as peças que você mais usa."
              actionLabel="Adicionar primeira peça"
              onAction={() => router.push('/peca/nova')}
            />
          </View>
        ) : (
          <>
            {searching ? (
              <Reveal style={[styles.padded, styles.search]}>
                <Search value={query} onChangeText={setQuery} autoFocus />
              </Reveal>
            ) : null}

            <View style={styles.filter}>
              <CategoryFilter
                value={category}
                onChange={setCategory}
                counts={counts}
              />
            </View>

            <View style={styles.padded}>
              {!isLoading && garments.length === 0 ? (
                <Text variant="body" tone="secondary" style={styles.noResults}>
                  Nenhuma peça encontrada.
                </Text>
              ) : (
                <GarmentGrid garments={garments} loading={isLoading} />
              )}
            </View>
          </>
        )}
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
    paddingBottom: spacing['3xl'],
  },
  padded: {
    paddingHorizontal: screenPadding,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // O alvo de toque tem 44px com o ícone centrado; sem o recuo o último ícone
    // pareceria afastado da margem.
    marginRight: -spacing.md,
  },
  headerActions: {
    flexDirection: 'row',
  },
  count: {
    marginTop: spacing.xs,
  },
  search: {
    marginTop: spacing.xl,
  },
  filter: {
    marginTop: spacing.xl,
    marginBottom: spacing['2xl'],
  },
  noResults: {
    paddingVertical: spacing['2xl'],
  },
});
