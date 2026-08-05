import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { palette, spacing } from '@/theme';

import { AppIcon, type AppIconName } from './AppIcon';
import { pieceEnter, pieceExit, pieceLayout } from './motion';

export type BackdropItem = {
  /** Identidade estável do item — é ela que faz a peça deslizar em vez de piscar. */
  key: string;
  icon: AppIconName;
};

type LookBackdropProps = {
  items: BackdropItem[];
  /** Quantas peças cabem na composição. */
  limit?: number;
  /**
   * Onde a composição se apoia.
   *
   * `upper` sobe as peças para fora da área escurecida por um véu de rodapé —
   * use quando houver um. `center` distribui no frame inteiro, para quando a
   * imagem não divide espaço com texto sobreposto.
   */
  align?: 'center' | 'upper';
};

/**
 * O cenário de um look enquanto não existe fotografia.
 *
 * Não é um placeholder cinza nem uma imagem de banco: é a composição das
 * próprias peças, desenhadas na linguagem do FRAME sobre um fundo quente.
 * Comunica o que o look é sem fingir uma foto que não temos — e some sozinho no
 * dia em que a imagem real chegar do backend.
 *
 * Ao trocar de look, as peças que permanecem **deslizam** até a nova posição e
 * só as demais entram e saem. É a leitura de curadoria: alguém reorganizou a
 * arara, o sistema não recarregou uma lista.
 *
 * Recebe ícones, não peças: o design system não conhece o domínio.
 */
export function LookBackdrop({
  items,
  limit = 4,
  align = 'center',
}: LookBackdropProps) {
  const composition = items.slice(0, limit);

  return (
    <View style={[styles.root, align === 'upper' && styles.rootUpper]}>
      {/* Duas paradas, sem inversão de sentido: um gradiente que para de
          clarear e volta a escurecer cria uma dobra que o olho lê como linha. */}
      <LinearGradient
        colors={[palette.canvas, palette.sand]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.composition}>
        {composition.map((item, index) => (
          <Animated.View
            key={item.key}
            layout={pieceLayout}
            entering={pieceEnter(index)}
            exiting={pieceExit}
            style={[styles.piece, index % 2 === 1 && styles.pieceLowered]}
          >
            <AppIcon
              name={item.icon}
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
    // Como filho em fluxo, o cenário dividia a altura com a legenda e cobria só
    // a parte de cima do frame — a borda inferior dele virava uma linha nítida
    // atravessando a imagem, com o fundo liso do frame aparecendo embaixo. O
    // cenário precisa ocupar o frame inteiro, como a fotografia ocupará.
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  rootUpper: {
    // Mais abaixo as peças entrariam na área escurecida pelo véu de rodapé e
    // sumiriam contra ele.
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
