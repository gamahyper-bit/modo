import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { duration, easing, press } from '@/theme';

type PressMotionOptions = {
  /** Desabilitado e carregando não respondem ao toque. */
  inactive?: boolean;
  /**
   * Opacidade de repouso do elemento — `disabledOpacity` quando desabilitado.
   *
   * Precisa entrar por aqui, e não como um `opacity` no array de estilo do
   * componente: o estilo animado também escreve `opacity`, e como ele vem por
   * último no array, venceria e apagaria o estado desabilitado.
   */
  baseOpacity?: number;
};

/**
 * Resposta de toque única para todo o produto.
 *
 * Todo componente pressionável consome este hook — é o que garante que um chip
 * e um botão primário cedam exatamente da mesma forma. Nenhum componente deve
 * escrever `withTiming` para um estado de press.
 */
export function usePressMotion({
  inactive = false,
  baseOpacity = 1,
}: PressMotionOptions = {}) {
  const progress = useSharedValue(0);
  const reduced = useReducedMotion();

  const animatedStyle = useAnimatedStyle(() => {
    const scale = 1 - progress.value * (1 - press.scale);
    const opacity = baseOpacity * (1 - progress.value * (1 - press.opacity));

    return {
      opacity,
      // Reduced motion elimina o deslocamento, mas mantém o retorno visual.
      transform: reduced ? [] : [{ scale }],
    };
  });

  // Sem `useCallback`: capturar o shared value num dep array o marca como
  // imutável para o React Compiler, e o modelo do Reanimated depende justamente
  // de mutá-lo. O custo de recriar os handlers a cada render é irrelevante.
  const onPressIn = () => {
    progress.value = withTiming(1, {
      duration: duration.instant,
      easing: easing.standard,
    });
  };

  const onPressOut = () => {
    progress.value = withTiming(0, {
      duration: duration.fast,
      easing: easing.standard,
    });
  };

  return {
    animatedStyle,
    pressHandlers: inactive ? {} : { onPressIn, onPressOut },
  };
}
