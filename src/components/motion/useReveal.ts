import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { duration, easing, revealOffset } from '@/theme';

type RevealOptions = {
  /** Atraso em ms. Use `staggerStep` para sequências. */
  delay?: number;
  /** Distância vertical percorrida na entrada. */
  distance?: number;
  /** Segura a revelação até o conteúdo estar pronto. */
  enabled?: boolean;
};

/**
 * A entrada padrão do Modo: o elemento sobe alguns pixels e assenta.
 *
 * Com "reduzir movimento" ligado no sistema, resta apenas o fade — a informação
 * chega igual, sem deslocamento.
 */
export function useReveal({
  delay = 0,
  distance = revealOffset,
  enabled = true,
}: RevealOptions = {}) {
  const progress = useSharedValue(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled) {
      progress.value = 0;
      return;
    }

    progress.value = withDelay(
      delay,
      withTiming(1, { duration: duration.reveal, easing: easing.reveal })
    );
  }, [delay, enabled, progress]);

  return useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: reduced ? [] : [{ translateY: (1 - progress.value) * distance }],
  }));
}
