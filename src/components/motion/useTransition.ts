import { useEffect } from 'react';
import {
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { duration, easing } from '@/theme';

/**
 * Progresso 0↔1 dirigido por um booleano.
 *
 * É a base de tudo que entra e sai de cena — modal, bottom sheet, overlay. O
 * componente lê o progresso e decide o que fazer com ele (opacidade,
 * deslocamento), mas quem controla o tempo é sempre o sistema de Motion.
 */
export function useTransition(visible: boolean): SharedValue<number> {
  const progress = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, {
      duration: visible ? duration.base : duration.fast,
      easing: visible ? easing.reveal : easing.exit,
    });
  }, [visible, progress]);

  return progress;
}
