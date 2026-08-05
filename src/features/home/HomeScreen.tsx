import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Button,
  Chip,
  EmptyState,
  IconButton,
  Logo,
  Reveal,
  Text,
} from '@/components';
import { colors, screenPadding, spacing, staggerStep } from '@/theme';
import type { LookAdjustment } from '@/types/look';
import { OCCASION_LABELS, type Occasion } from '@/types/wardrobe';
import { greetingFor } from '@/utils/greeting';

import { AdjustSheet } from './components/AdjustSheet';
import { HeroCard, HeroCardSkeleton } from './components/HeroCard';
import { LookPieces } from './components/LookPieces';
import { useRecommendation } from './hooks/useRecommendation';

/** Virá da sessão do Supabase na etapa de autenticação. */
const MOCK_USER_NAME = 'Gabriel';

const ALL_OCCASIONS = Object.keys(OCCASION_LABELS) as Occasion[];

/**
 * A tela principal.
 *
 * Uma recomendação, e só. Não há lista, feed, carrossel ou "veja também" — o
 * produto revela a melhor escolha, e mostrar cinco alternativas ao lado dela
 * seria admitir que não sabe qual é a melhor.
 *
 * As outras ocasiões existem porque o dia muda, não porque a Home precise de
 * mais conteúdo: elas trocam a pergunta, não somam respostas.
 */
export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [adjusting, setAdjusting] = useState(false);
  const [pendingAdjustment, setPendingAdjustment] = useState<LookAdjustment>();

  const {
    look,
    occasion,
    isLoading,
    isRegenerating,
    isSaving,
    isSaved,
    error,
    regenerate,
    save,
    applyAdjustment,
    changeOccasion,
    retry,
  } = useRecommendation();

  const handleAdjust = (adjustment: LookAdjustment) => {
    setPendingAdjustment(adjustment);
    applyAdjustment(adjustment);
    setAdjusting(false);
    setPendingAdjustment(undefined);
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
        <View style={styles.header}>
          <Logo variant="mark" size={28} />
          <View style={styles.headerActions}>
            <IconButton icon="buscar" accessibilityLabel="Buscar" />
            <IconButton icon="notificacoes" accessibilityLabel="Novidades" />
          </View>
        </View>

        <Reveal>
          <Text variant="display">
            {greetingFor()}, {MOCK_USER_NAME}.
          </Text>
          <Text variant="body" tone="secondary" style={styles.subtitle}>
            Aqui está a melhor escolha para hoje.
          </Text>
        </Reveal>

        <View style={styles.hero}>
          {error ? (
            <EmptyState
              title={'Não consegui\nrevelar seu look\nagora.'}
              description="Verifique sua conexão e tente de novo."
              actionLabel="Tentar de novo"
              onAction={retry}
            />
          ) : isLoading || !look ? (
            <HeroCardSkeleton />
          ) : (
            <Reveal delay={staggerStep}>
              <HeroCard look={look} />
            </Reveal>
          )}
        </View>

        {look && !error ? (
          <>
            <View style={styles.actions}>
              <Button
                label="Gerar outro"
                variant="ghost"
                icon="gerarOutro"
                size="md"
                fullWidth={false}
                loading={isRegenerating}
                onPress={() => regenerate()}
              />
              <Button
                label="Ajustar"
                variant="ghost"
                icon="filtrar"
                size="md"
                fullWidth={false}
                onPress={() => setAdjusting(true)}
              />
              <IconButton
                icon="salvar"
                accessibilityLabel={isSaved ? 'Look salvo' : 'Salvar look'}
                variant={isSaved ? 'filled' : 'plain'}
                loading={isSaving}
                onPress={() => save(look.id)}
              />
            </View>

            <LookPieces garments={look.garments} />

            <View style={styles.occasions}>
              <Text variant="label" tone="secondary">
                Outras ocasiões
              </Text>
              <View style={styles.occasionList}>
                {ALL_OCCASIONS.filter((item) => item !== occasion).map((item) => (
                  <Chip
                    key={item}
                    label={OCCASION_LABELS[item]}
                    onPress={() => changeOccasion(item)}
                  />
                ))}
              </View>
            </View>
          </>
        ) : null}
      </ScrollView>

      <AdjustSheet
        visible={adjusting}
        onClose={() => setAdjusting(false)}
        onAdjust={handleAdjust}
        pending={pendingAdjustment}
      />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing['2xl'],
  },
  headerActions: {
    flexDirection: 'row',
    marginRight: -spacing.md,
  },
  subtitle: {
    marginTop: spacing.sm,
  },
  hero: {
    marginTop: spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginHorizontal: -spacing.sm,
  },
  occasions: {
    marginTop: spacing['3xl'],
    gap: spacing.lg,
  },
  occasionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
