import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { LookBackdrop, Skeleton, Text, usePressMotion } from '@/components';
import { colors, screenPadding, spacing } from '@/theme';
import type { Look } from '@/types/look';
import { OCCASION_LABELS } from '@/types/wardrobe';

import { backdropItemsFor } from '@/utils/backdropItems';

type HeroCardProps = {
  look: Look;
  onPress?: () => void;
};

/**
 * O véu que dá contraste ao texto sem tirar luz da roupa.
 *
 * As paradas são **calculadas**, não escolhidas a olho. O olho não enxerga
 * degrau de cor num gradiente, mas enxerga mudança brusca de inclinação — é a
 * banda de Mach. Com meia dúzia de paradas manuais, o ponto onde a rampa
 * acelera vira uma linha nítida atravessando a imagem inteira.
 *
 * Amostrando uma curva de potência em muitas paradas, a variação de inclinação
 * entre paradas vizinhas fica pequena demais para ser percebida.
 */
const VEIL_STOPS = 14;
const VEIL_MAX_ALPHA = 0.88;
/** Expoente > 1 mantém o topo da imagem limpo e concentra o véu no rodapé. */
const VEIL_CURVE = 2.4;

const veil = Array.from({ length: VEIL_STOPS }, (_, index) => {
  const t = index / (VEIL_STOPS - 1);
  return {
    location: t,
    color: `rgba(13, 13, 13, ${(VEIL_MAX_ALPHA * t ** VEIL_CURVE).toFixed(4)})`,
  };
});

const VEIL_COLORS = veil.map((stop) => stop.color) as [string, string, ...string[]];
const VEIL_LOCATIONS = veil.map((stop) => stop.location) as [
  number,
  number,
  ...number[],
];

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
        <LookBackdrop items={backdropItemsFor(look.garments)} align="upper" />
      )}

      <LinearGradient
        colors={VEIL_COLORS}
        locations={VEIL_LOCATIONS}
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

        {/* `summary`, não `rationale`: uma frase inteira em vez da nota
            completa cortada com reticências. A nota abre no detalhe do look. */}
        <Text variant="body" tone="secondary" style={styles.rationale}>
          {look.summary}
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
        <Skeleton width="100%" height="100%" radius="none" />
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
    // Sangra até as bordas da tela: é o que separa uma página editorial de um
    // card. Canto arredondado e margem lateral são exatamente o que faz uma
    // imagem parecer um objeto dentro da interface em vez de ser a interface.
    marginHorizontal: -screenPadding,
    // A largura cresceu com a sangria, então a proporção encurta para o
    // conjunto continuar cabendo acima da dobra.
    aspectRatio: 1,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  legend: {
    padding: screenPadding,
    paddingBottom: spacing['2xl'],
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
