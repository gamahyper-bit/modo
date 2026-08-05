import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Button,
  ClothingCard,
  EmptyState,
  IconButton,
  LookBackdrop,
  Reveal,
  Skeleton,
  Text,
} from '@/components';
import { colors, screenPadding, spacing, staggerStep } from '@/theme';
import type { Look, WeatherCondition } from '@/types/look';
import { OCCASION_LABELS } from '@/types/wardrobe';
import { backdropItemsFor } from '@/utils/backdropItems';

import { useLook } from './hooks/useLook';

type LookScreenProps = {
  lookId: string;
  onClose: () => void;
};

const WEATHER_LABELS: Record<WeatherCondition, string> = {
  sol: 'Sol',
  nublado: 'Nublado',
  chuva: 'Chuva',
  frio: 'Frio',
};

/**
 * O detalhe do look.
 *
 * É onde a recomendação se justifica por inteiro. A Home entrega a escolha em
 * uma frase; aqui o usuário vem quando quer entender — e a nota completa do
 * stylist é o conteúdo principal da tela, não um rodapé.
 */
export function LookScreen({ lookId, onClose }: LookScreenProps) {
  const insets = useSafeAreaInsets();
  const { look, isLoading, error, isSaved, toggleSave, retry } = useLook(lookId);

  if (error) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + spacing['2xl'] }]}>
        <View style={styles.padded}>
          <EmptyState
            title={'Não consegui\nabrir este look.'}
            description="Verifique sua conexão e tente de novo."
            actionLabel="Tentar de novo"
            onAction={retry}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + spacing['3xl'] }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading || !look ? <LookSkeleton /> : <LookContent look={look} />}
      </ScrollView>

      {/* Voltar flutua sobre a imagem: a foto começa no topo absoluto da tela,
          e um cabeçalho sólido acima dela devolveria o look à condição de card. */}
      <View style={[styles.floatingBar, { top: insets.top + spacing.sm }]}>
        <IconButton
          icon="voltar"
          accessibilityLabel="Voltar"
          variant="outlined"
          onPress={onClose}
        />
        {look ? (
          <IconButton
            icon="salvar"
            accessibilityLabel={isSaved ? 'Remover dos salvos' : 'Salvar look'}
            variant={isSaved ? 'filled' : 'outlined'}
            onPress={toggleSave}
          />
        ) : null}
      </View>
    </View>
  );
}

function LookContent({ look }: { look: Look }) {
  const context = [
    OCCASION_LABELS[look.occasion],
    WEATHER_LABELS[look.weather.condition],
    `${look.weather.temperature}°C`,
  ].join(' · ');

  return (
    <>
      <View style={styles.frame}>
        {look.imageUri ? (
          <Image
            source={{ uri: look.imageUri }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={0}
            accessibilityIgnoresInvertColors
          />
        ) : (
          <LookBackdrop items={backdropItemsFor(look.garments)} />
        )}

        {/* Véu apenas no topo, para os botões flutuantes se destacarem. */}
        <LinearGradient
          colors={['rgba(13,13,13,0.12)', 'transparent']}
          locations={[0, 0.28]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </View>

      <Reveal style={styles.padded}>
        <Text variant="display">{look.moment}</Text>
        <Text variant="display" style={styles.mood}>
          {look.mood}
        </Text>
        <Text variant="label" tone="secondary" style={styles.context}>
          {context}
        </Text>
      </Reveal>

      <Reveal delay={staggerStep} style={styles.padded}>
        <View style={styles.divider} />
        <Text variant="body" style={styles.rationale}>
          {look.rationale}
        </Text>
      </Reveal>

      <Reveal delay={staggerStep * 2} style={styles.padded}>
        <Text variant="label" tone="secondary" style={styles.sectionLabel}>
          Peças do look
        </Text>
        <View style={styles.pieces}>
          {look.garments.map((garment) => (
            <ClothingCard
              key={garment.id}
              variant="list"
              name={garment.name}
              meta={`${garment.color.name}${garment.material ? ` · ${garment.material}` : ''}`}
              imageUri={garment.imageUri}
              placeholderIcon={garment.category}
            />
          ))}
        </View>
      </Reveal>

      <View style={[styles.padded, styles.actions]}>
        <Button label="Usar este look" icon="confirmar" />
      </View>
    </>
  );
}

function LookSkeleton() {
  return (
    <>
      <View style={styles.frame}>
        <Skeleton width="100%" height="100%" radius="none" />
      </View>
      <View style={styles.padded}>
        <Skeleton width="45%" height={38} />
        <View style={{ height: spacing.sm }} />
        <Skeleton width="85%" height={38} />
        <View style={{ height: spacing.lg }} />
        <Skeleton width="60%" height={14} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    paddingHorizontal: screenPadding,
  },
  floatingBar: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  frame: {
    // Mais alto que o hero da Home: aqui a imagem é o assunto, não a chamada.
    aspectRatio: 4 / 5,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  mood: {
    marginTop: -2,
  },
  context: {
    marginTop: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing['2xl'],
  },
  rationale: {
    marginTop: spacing.xl,
  },
  sectionLabel: {
    marginTop: spacing['3xl'],
  },
  pieces: {
    marginTop: spacing.lg,
    gap: spacing.lg,
  },
  actions: {
    marginTop: spacing['3xl'],
  },
});
