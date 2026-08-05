import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { colors, disabledOpacity, radius, spacing } from '@/theme';

import { AppIcon } from './AppIcon';
import { Skeleton } from './Skeleton';
import { Text } from './Text';
import { usePressMotion } from './motion';

export type LookCardLayout = 'hero' | 'stacked';

type LookCardProps = {
  /**
   * A leitura emocional do look — "Confiante e contemporâneo".
   * Vem antes de tudo: é o que o stylist diz, e é o que convence.
   */
  mood: string;
  /** Contexto de apoio: ocasião, clima, data. */
  context?: string;
  imageUri?: string;
  layout?: LookCardLayout;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * O look recomendado.
 *
 * A hierarquia é deliberada: **emoção primeiro, ocasião depois**. "Trabalho" é
 * um dado; "Confiante e contemporâneo" é a consultoria. Invertendo isso o card
 * vira etiqueta de categoria e o produto perde a voz de stylist.
 */
export function LookCard({
  mood,
  context,
  imageUri,
  layout = 'hero',
  onPress,
  disabled = false,
  loading = false,
  style,
}: LookCardProps) {
  const inactive = disabled || loading || !onPress;
  const { animatedStyle, pressHandlers } = usePressMotion({ inactive });

  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <Skeleton width="100%" height="100%" radius="lg" />
      </View>
    );
  }

  const legend = (
    <View style={layout === 'hero' ? styles.legendHero : styles.legendStacked}>
      <Text
        variant="title"
        tone={layout === 'hero' ? 'inverse' : 'primary'}
        numberOfLines={2}
      >
        {mood}
      </Text>
      {context ? (
        <Text
          variant="label"
          tone={layout === 'hero' ? 'inverse' : 'secondary'}
          style={layout === 'hero' ? styles.contextHero : undefined}
        >
          {context}
        </Text>
      ) : null}
    </View>
  );

  const body = (
    <View style={styles.frame}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={0}
          accessibilityIgnoresInvertColors
        />
      ) : (
        <View style={styles.placeholder} />
      )}

      {layout === 'hero' ? (
        <>
          {/* Véu apenas no rodapé: o suficiente para o texto respirar sem
              escurecer a roupa, que é a protagonista. */}
          <LinearGradient
            colors={['transparent', 'rgba(13,13,13,0.72)']}
            locations={[0.45, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <View style={styles.heroFooter}>
            {legend}
            <View style={styles.action}>
              <AppIcon name="avancar" size="md" color={colors.textPrimary} />
            </View>
          </View>
        </>
      ) : null}
    </View>
  );

  const content =
    layout === 'hero' ? (
      body
    ) : (
      <>
        {body}
        {legend}
      </>
    );

  const container = [
    styles.container,
    layout === 'stacked' && styles.containerStacked,
    { opacity: disabled ? disabledOpacity : 1 },
    style,
  ];

  if (inactive) {
    return <View style={container}>{content}</View>;
  }

  return (
    <Animated.View style={[container, animatedStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={mood}
        accessibilityHint={context}
        onPress={onPress}
        {...pressHandlers}
      >
        {content}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 3 / 4,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  containerStacked: {
    aspectRatio: undefined,
  },
  frame: {
    aspectRatio: 3 / 4,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surfaceMuted,
  },
  heroFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.lg,
    padding: spacing.xl,
  },
  legendHero: {
    flex: 1,
    gap: spacing.xs,
  },
  legendStacked: {
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  contextHero: {
    opacity: 0.75,
  },
  action: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
