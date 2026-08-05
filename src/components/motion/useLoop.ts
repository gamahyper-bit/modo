import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { loop } from '@/theme';

/** Giro contínuo do indicador de carga. */
export function useSpin() {
  const progress = useSharedValue(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: loop.spin, easing: Easing.linear }),
      -1,
      false
    );
  }, [progress]);

  return useAnimatedStyle(() => ({
    transform: reduced ? [] : [{ rotate: `${progress.value * 360}deg` }],
  }));
}

/**
 * Pulso do skeleton. Varia opacidade em faixa estreita: o placeholder deve
 * sinalizar espera sem competir com o conteúdo que já carregou ao lado.
 */
export function usePulse() {
  const progress = useSharedValue(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    progress.value = withRepeat(
      withTiming(1, { duration: loop.pulse, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [progress, reduced]);

  return useAnimatedStyle(() => ({
    opacity: 0.5 + progress.value * 0.35,
  }));
}
