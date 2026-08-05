import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Skeleton, Text, usePressMotion } from '@/components';
import { colors, radius, spacing } from '@/theme';
import type { Look } from '@/types/look';
import { OCCASION_LABELS } from '@/types/wardrobe';

import { LookBackdrop } from './LookBackdrop';

type HeroCardProps = {
  look: Look;
  onPress?: () => void;
};

/**
 * A recomendação do dia — componente exclusivo da Home.
 *
 * É a tese do produto em um objeto. Três tempos, sempre nesta ordem:
 *
 *   1. **O visual.** Ocupa a maior parte da tela e não divide espaço com nada.
 *   2. **A voz.** "Hoje." situa, a leitura do stylist afirma, o dado fecha.
 *   3. **O porquê.** A explicação vem logo abaixo, em texto corrido, e é o que
 *      separa uma consultoria de um gerador de combinações. Nunca é opcional.
 *
 * As peças não entram aqui: elas vêm depois das ações, em `LookPieces`.
 */
export function HeroCard({ look, onPress }: HeroCardProps) {
  const { animatedStyle, pressHandlers } = usePressMotion({
    inactive: !onPress,
  });

  const context = `${OCCASION_LABELS[look.occasion]} · ${look.weather.temperature}°C`;

  const visual = (
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
        <LookBackdrop garments={look.garments} />
      )}

      {/* Véu para o texto respirar sem a roupa perder luz.
          Quatro paradas, e não duas: uma rampa linear de alfa sobre um fundo
          claro denuncia o ponto onde começa — lê como aresta. As paradas
          intermediárias curvam a rampa e dissolvem a entrada. */}
      <LinearGradient
        colors={[
          'transparent',
          'rgba(13,13,13,0.06)',
          'rgba(13,13,13,0.34)',
          'rgba(13,13,13,0.86)',
        ]}
        locations={[0, 0.42, 0.72, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View style={styles.legend}>
        <Text variant="display" tone="inverse">
          {look.moment}
        </Text>
        <Text variant="display" tone="inverse" style={styles.mood}>
          {look.mood}
        </Text>
        <Text variant="caption" tone="inverse" style={styles.context}>
          {context}
        </Text>
      </View>
    </View>
  );

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={`${look.moment} ${look.mood}`}
        accessibilityHint={look.rationale}
        onPress={onPress}
        {...pressHandlers}
      >
        {visual}

        {/* Três linhas, não a explicação inteira: com o texto completo aqui,
            "Gerar outro" e "Ajustar" caem abaixo da dobra num iPhone — e a
            Home existe justamente para revelar e deixar agir. O argumento
            completo abre no detalhe do look. */}
        <Text
          variant="body"
          tone="secondary"
          numberOfLines={3}
          style={styles.rationale}
        >
          {look.rationale}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

/** Skeleton com a caixa exata do HeroCard. */
export function HeroCardSkeleton() {
  return (
    <View>
      <View style={styles.frame}>
        <Skeleton width="100%" height="100%" radius="lg" />
      </View>
      <View style={styles.rationale}>
        <Skeleton width="100%" height={15} />
        <View style={{ height: spacing.sm }} />
        <Skeleton width="92%" height={15} />
        <View style={{ height: spacing.sm }} />
        <Skeleton width="60%" height={15} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    // 5:6 e não 4:5: o card precisa dominar a tela sem empurrar as ações para
    // fora dela.
    aspectRatio: 5 / 6,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  legend: {
    padding: spacing.xl,
  },
  mood: {
    marginTop: -2,
  },
  context: {
    marginTop: spacing.md,
    opacity: 0.7,
  },
  rationale: {
    marginTop: spacing.lg,
  },
});
