import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { colors, disabledOpacity, radius, spacing } from '@/theme';

import { AppIcon, type AppIconName } from './AppIcon';
import { Skeleton } from './Skeleton';
import { Text } from './Text';
import { usePressMotion } from './motion';

export type ClothingCardVariant = 'grid' | 'list' | 'compact';
export type ClothingCardSelection = 'none' | 'selectable' | 'selected';

/**
 * Os quatro cantos do palco da peça.
 *
 * Slots existem para que o card cresça sem inchar a assinatura: badge de
 * uniforme, contador de usos, marcador de lavanderia e favorito entram como
 * conteúdo, não como uma prop booleana nova a cada funcionalidade.
 */
export type ClothingCardSlots = {
  topLeft?: ReactNode;
  topRight?: ReactNode;
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
};

type ClothingCardProps = {
  /** Foto já recortada, com fundo transparente. */
  imageUri?: string;
  name?: string;
  /** Linha de apoio: "Preto · Trabalho". */
  meta?: string;
  variant?: ClothingCardVariant;
  selection?: ClothingCardSelection;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  slots?: ClothingCardSlots;
  style?: StyleProp<ViewStyle>;
  /**
   * Legenda sob a peça. Desligada no grid por padrão: numa grade de três
   * colunas o nome trunca, e nome truncado informa menos que nome nenhum —
   * no armário a peça se identifica pela própria foto.
   */
  showCaption?: boolean;
  /**
   * Glifo exibido enquanto não há foto. Passe a categoria da peça: um cabide
   * genérico numa fileira de quatro peças não distingue nada.
   */
  placeholderIcon?: AppIconName;
};

// Miniaturas em retrato, na mesma proporção 3:4 do grid.
const COMPACT_WIDTH = 48;
const COMPACT_HEIGHT = 64;
const LIST_THUMB_WIDTH = 60;
const LIST_THUMB_HEIGHT = 80;

/**
 * O componente principal do Modo.
 *
 * A peça é fotografada sem fundo e apoiada num palco branco — é o recorte que
 * transforma um guarda-roupa fotografado em catálogo pessoal. Nada de moldura
 * pesada, nada de sombra dramática: o produto é a roupa.
 */
export function ClothingCard({
  imageUri,
  name,
  meta,
  variant = 'grid',
  selection = 'none',
  onPress,
  onLongPress,
  disabled = false,
  loading = false,
  slots,
  style,
  showCaption = variant === 'list',
  placeholderIcon = 'cabide',
}: ClothingCardProps) {
  const inactive = disabled || loading || !onPress;
  const { animatedStyle, pressHandlers } = usePressMotion({ inactive });

  const selecting = selection !== 'none';
  const selected = selection === 'selected';

  if (loading) {
    return (
      <ClothingCardSkeleton
        variant={variant}
        showCaption={showCaption}
        style={style}
      />
    );
  }

  const stage = (
    <View
      style={[
        styles.stage,
        variant === 'compact' && styles.stageCompact,
        variant === 'list' && styles.stageList,
        selected && styles.stageSelected,
      ]}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.photo}
          contentFit="contain"
          transition={0}
          accessibilityIgnoresInvertColors
        />
      ) : (
        <View style={styles.placeholder}>
          {/* Grande no grid: sem foto, um glifo pequeno no meio de um card de
              retrato deixa o cartão parecendo vazio em vez de aguardando. */}
          <AppIcon
            name={placeholderIcon}
            size={variant === 'grid' ? 76 : 'lg'}
            color={colors.border}
          />
        </View>
      )}

      {slots?.topLeft ? (
        <View style={[styles.slot, styles.topLeft]}>{slots.topLeft}</View>
      ) : null}

      {/* Em modo de seleção o canto superior direito pertence ao indicador. */}
      {selecting ? (
        <View style={[styles.slot, styles.topRight]}>
          <SelectionMark selected={selected} />
        </View>
      ) : slots?.topRight ? (
        <View style={[styles.slot, styles.topRight]}>{slots.topRight}</View>
      ) : null}

      {slots?.bottomLeft ? (
        <View style={[styles.slot, styles.bottomLeft]}>{slots.bottomLeft}</View>
      ) : null}

      {slots?.bottomRight ? (
        <View style={[styles.slot, styles.bottomRight]}>{slots.bottomRight}</View>
      ) : null}
    </View>
  );

  const caption =
    !showCaption || variant === 'compact' ? null : (
      <View style={variant === 'list' ? styles.captionList : styles.caption}>
        {name ? (
          <Text variant="headline" numberOfLines={1}>
            {name}
          </Text>
        ) : null}
        {meta ? (
          <Text variant="caption" tone="secondary" numberOfLines={1}>
            {meta}
          </Text>
        ) : null}
      </View>
    );

  const body =
    variant === 'list' ? (
      <View style={styles.row}>
        {stage}
        {caption}
      </View>
    ) : (
      <>
        {stage}
        {caption}
      </>
    );

  const container = [
    variant === 'compact' ? styles.compact : styles.container,
    { opacity: disabled ? disabledOpacity : 1 },
    style,
  ];

  if (inactive) {
    return <View style={container}>{body}</View>;
  }

  return (
    <Animated.View style={[container, animatedStyle]}>
      <Pressable
        accessibilityRole={selecting ? 'checkbox' : 'button'}
        accessibilityState={{ disabled, checked: selecting ? selected : undefined }}
        accessibilityLabel={name ?? 'Peça do armário'}
        accessibilityHint={meta}
        onPress={onPress}
        onLongPress={onLongPress}
        {...pressHandlers}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}

function SelectionMark({ selected }: { selected: boolean }) {
  return (
    <View style={[styles.mark, selected && styles.markSelected]}>
      {selected ? (
        <AppIcon name="confirmar" size={12} color={colors.onSignature} />
      ) : null}
    </View>
  );
}

/** Skeleton com exatamente a caixa do card — espera não pode virar salto. */
function ClothingCardSkeleton({
  variant,
  showCaption,
  style,
}: {
  variant: ClothingCardVariant;
  showCaption: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  if (variant === 'compact') {
    return (
      <View style={[styles.compact, style]}>
        <Skeleton width={COMPACT_WIDTH} height={COMPACT_HEIGHT} radius="md" />
      </View>
    );
  }

  if (variant === 'list') {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.row}>
          <Skeleton
            width={LIST_THUMB_WIDTH}
            height={LIST_THUMB_HEIGHT}
            radius="md"
          />
          <View style={styles.captionList}>
            <Skeleton width="70%" height={17} />
            <View style={{ height: spacing.xs }} />
            <Skeleton width="45%" height={12} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.stageSkeleton}>
        <Skeleton width="100%" height="100%" radius="lg" />
      </View>
      {showCaption ? (
        <View style={styles.caption}>
          <Skeleton width="80%" height={17} />
          <View style={{ height: spacing.xs }} />
          <Skeleton width="50%" height={12} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  compact: {
    width: COMPACT_WIDTH,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  stage: {
    // Retrato, não quadrado: a roupa é vertical e o quadrado a comprimia. E o
    // respiro que sobrava nas laterais virava moldura em vez de ar.
    aspectRatio: 3 / 4,
    backgroundColor: colors.garmentStage,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    // Padding mínimo: a foto ocupa praticamente todo o card. A peça é a
    // protagonista, o palco é só o que a sustenta.
    padding: spacing.sm,
    overflow: 'hidden',
  },
  stageCompact: {
    width: COMPACT_WIDTH,
    height: COMPACT_HEIGHT,
    borderRadius: radius.md,
    padding: spacing.xs,
  },
  stageList: {
    width: LIST_THUMB_WIDTH,
    height: LIST_THUMB_HEIGHT,
    borderRadius: radius.md,
    padding: spacing.xs,
  },
  stageSelected: {
    borderColor: colors.signature,
    borderWidth: 1.5,
  },
  stageSkeleton: {
    aspectRatio: 3 / 4,
  },
  photo: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slot: {
    position: 'absolute',
  },
  topLeft: { top: spacing.sm, left: spacing.sm },
  topRight: { top: spacing.sm, right: spacing.sm },
  bottomLeft: { bottom: spacing.sm, left: spacing.sm },
  bottomRight: { bottom: spacing.sm, right: spacing.sm },
  caption: {
    marginTop: spacing.sm,
    gap: 2,
  },
  captionList: {
    flex: 1,
    gap: 2,
  },
  mark: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markSelected: {
    backgroundColor: colors.signature,
    borderColor: colors.signature,
  },
});
