import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { AppIcon, type AppIconName } from '@/components';
import { pieceEnter, pieceExit, pieceLayout } from '@/components/motion';
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
 * Ao trocar de recomendação, as peças que permanecem **deslizam** até a nova
 * posição e só as demais entram e saem. É a leitura de curadoria: alguém
 * reorganizou a arara, o sistema não recarregou uma lista.
 */
export function LookBackdrop({ garments }: LookBackdropProps) {
  const composition = garments.slice(0, 4);

  return (
    <View style={styles.root}>
      {/* Duas paradas, sem inversão de sentido.
          A versão anterior ia areia → off-white → areia: o ponto onde o
          gradiente para de clarear e volta a escurecer é uma dobra de
          derivada, e o olho a lê como uma linha nítida cruzando a imagem
          inteira (banda de Mach). Gradiente de cenário nunca deve mudar de
          direção. */}
      <LinearGradient
        colors={[palette.canvas, palette.sand]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.composition}>
        {composition.map((garment, index) => (
          <Animated.View
            // Chave é a peça, nunca o índice: com índice o Reanimated entende
            // que o item continua o mesmo e nada desliza.
            key={garment.id}
            layout={pieceLayout}
            entering={pieceEnter(index)}
            exiting={pieceExit}
            style={[styles.piece, index % 2 === 1 && styles.pieceLowered]}
          >
            <AppIcon
              name={glyphFor(garment)}
              size={68}
              color={palette.ink}
              strokeWidth={1}
            />
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    // Absoluto, não `flex: 1`.
    //
    // Como filho em fluxo, o cenário dividia a altura com a legenda e cobria
    // só a parte de cima do frame — a borda inferior dele virava uma linha
    // nítida atravessando a imagem, com o fundo liso do frame aparecendo
    // embaixo. O cenário precisa ocupar o frame inteiro, exatamente como a
    // fotografia ocupa quando existe.
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    // Centrado apenas no terço superior: mais abaixo as peças entrariam na
    // área escurecida pelo véu e sumiriam contra ele.
    paddingBottom: '36%',
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
