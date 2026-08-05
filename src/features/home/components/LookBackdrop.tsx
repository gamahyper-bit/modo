import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { AppIcon, type AppIconName } from '@/components';
import { palette, spacing } from '@/theme';
import type { Garment } from '@/types/wardrobe';

type LookBackdropProps = {
  garments: Garment[];
};

/** As categorias já são os nomes dos glifos da família de vestuário. */
const glyphFor = (garment: Garment): AppIconName => garment.category;

/**
 * O visual do look enquanto não existe fotografia.
 *
 * Não é um placeholder cinza nem uma imagem de banco: é a composição das peças
 * do próprio look, desenhadas na linguagem do FRAME sobre um fundo quente.
 * Comunica exatamente o que o look é, sem fingir uma foto que não temos — e
 * some sozinho no dia em que `imageUri` chegar do backend.
 *
 * As peças alternam altura para compor como uma vitrine, não como uma lista.
 */
export function LookBackdrop({ garments }: LookBackdropProps) {
  const composition = garments.slice(0, 4);

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[palette.sand, palette.canvas, palette.sand]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.composition}>
        {composition.map((garment, index) => (
          <View
            key={garment.id}
            style={[styles.piece, index % 2 === 1 && styles.pieceLowered]}
          >
            <AppIcon
              name={glyphFor(garment)}
              size={68}
              color={palette.ink}
              strokeWidth={1}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  composition: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    // Bem apagado: é cenário, não conteúdo. A tipografia continua conduzindo.
    opacity: 0.28,
  },
  piece: {
    alignItems: 'center',
  },
  pieceLowered: {
    marginTop: spacing['2xl'],
  },
});
