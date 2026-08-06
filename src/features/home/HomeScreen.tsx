import { router } from 'expo-router';
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
import { useAuth } from '@/features/auth';
import { colors, screenPadding, spacing, staggerStep } from '@/theme';
import { firstNameOf } from '@/types/session';
import { ADJUSTMENT_LABELS, type LookAdjustment } from '@/types/look';
import { OCCASION_LABELS, type Occasion } from '@/types/wardrobe';
import { greetingFor } from '@/utils/greeting';

import { AdjustSheet } from './components/AdjustSheet';
import { HeroCard, HeroCardSkeleton } from './components/HeroCard';
import { LookPieces } from './components/LookPieces';
import { useRecommendation } from './hooks/useRecommendation';

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
  const { session } = useAuth();
  const [adjusting, setAdjusting] = useState(false);
  const [pendingAdjustment, setPendingAdjustment] = useState<LookAdjustment>();

  const {
    look,
    occasion,
    activeAdjustment,
    isLoading,
    isRegenerating,
    isSaving,
    isSaved,
    error,
    regenerate,
    save,
    applyAdjustment,
    clearAdjustment,
    changeOccasion,
    retry,
  } = useRecommendation();

  const handleAdjust = (adjustment: LookAdjustment) => {
    setPendingAdjustment(adjustment);
    // Tocar de novo no ajuste que já está valendo desfaz. É a mesma gramática
    // do chip em qualquer outro lugar do app: ele liga e desliga.
    if (adjustment === activeAdjustment) clearAdjustment();
    else applyAdjustment(adjustment);
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
        {/* Sem busca: não há o que buscar numa tela de uma recomendação só.
            A busca pertence ao Armário, onde existe volume. */}
        <View style={styles.header}>
          <Logo variant="mark" size={28} />
          <IconButton icon="notificacoes" accessibilityLabel="Novidades" />
        </View>

        <Reveal>
          <Text variant="display">
            {greetingFor()}
            {session ? `, ${firstNameOf(session.user)}` : ''}.
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
              <HeroCard
                look={look}
                onPress={() => router.push(`/look/${look.id}`)}
              />
            </Reveal>
          )}
        </View>

        {look && !error ? (
          <>
            {/* Três pesos, três papéis. "Gerar outro" é o que o usuário faz
                quando a resposta não serviu, e é a ação que mantém o produto
                útil — ela carrega o peso visual. "Ajustar" é o caminho mais
                fino, para quem quer corrigir em vez de trocar. "Salvar" é
                consequência, não decisão: só um ícone. */}
            <View style={styles.actions}>
              <View style={styles.primaryAction}>
                <Button
                  label="Gerar outro"
                  icon="gerarOutro"
                  size="md"
                  loading={isRegenerating}
                  onPress={() => regenerate()}
                />
              </View>
              <Button
                label="Ajustar"
                variant="secondary"
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

            {/* O pedido do usuário fica na tela até ele desfazer. Um ajuste
                que some depois de aplicado deixa o usuário sem saber se o look
                que está vendo é o de sempre ou o que ele pediu — e essa dúvida
                é a mesma coisa que não ter sido ouvido. */}
            {activeAdjustment ? (
              <View style={styles.adjustment}>
                <Text variant="label" tone="secondary">
                  Ajuste
                </Text>
                <Chip
                  label={ADJUSTMENT_LABELS[activeAdjustment]}
                  selected
                  onPress={clearAdjustment}
                />
              </View>
            ) : null}

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
        active={activeAdjustment}
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
    // O alvo de toque tem 44px com o ícone centrado; sem este recuo o ícone
    // pareceria afastado da margem em relação ao logo.
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
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  primaryAction: {
    flex: 1,
  },
  adjustment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
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
