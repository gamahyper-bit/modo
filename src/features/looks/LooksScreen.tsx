import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState, LookCard, Reveal, Skeleton, Text } from '@/components';
import { lookService } from '@/services/looks';
import { colors, screenPadding, spacing, staggerStep } from '@/theme';
import { OCCASION_LABELS } from '@/types/wardrobe';
import { backdropItemsFor } from '@/utils/backdropItems';

/**
 * Os looks salvos.
 *
 * Uma coluna, não uma grade: cada look é uma composição inteira, e reduzi-lo a
 * miniatura o transformaria de recomendação em item de lista. Aqui o usuário
 * revisita uma escolha, não navega um acervo.
 */
export function LooksScreen() {
  const insets = useSafeAreaInsets();

  const looks = useQuery({
    queryKey: ['looks', 'saved'],
    queryFn: () => lookService.listSaved(),
  });

  const saved = looks.data ?? [];

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing['2xl'] },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="display">Looks</Text>
        {saved.length > 0 ? (
          <Text variant="caption" tone="secondary" style={styles.count}>
            {saved.length} {saved.length === 1 ? 'salvo' : 'salvos'}
          </Text>
        ) : null}

        {looks.isPending ? (
          <View style={styles.list}>
            <Skeleton width="100%" height={420} radius="lg" />
          </View>
        ) : saved.length === 0 ? (
          <EmptyState
            title={'Os looks que você\nguardar ficam aqui.'}
            description="Toque no marcador quando uma recomendação merecer voltar."
          />
        ) : (
          <View style={styles.list}>
            {saved.map((look, index) => (
              <Reveal key={look.id} delay={index * staggerStep}>
                <LookCard
                  moment={look.moment}
                  mood={look.mood}
                  context={`${OCCASION_LABELS[look.occasion]} · ${look.weather.temperature}°C`}
                  imageUri={look.imageUri}
                  backdrop={backdropItemsFor(look.garments)}
                  onPress={() => router.push(`/look/${look.id}`)}
                />
              </Reveal>
            ))}
          </View>
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
    paddingHorizontal: screenPadding,
    paddingBottom: spacing['3xl'],
  },
  count: {
    marginTop: spacing.xs,
  },
  list: {
    marginTop: spacing['2xl'],
    gap: spacing['2xl'],
  },
});
