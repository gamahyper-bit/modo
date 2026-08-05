import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors, disabledOpacity, duration, easing, radius } from '@/theme';

type ToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  accessibilityLabel: string;
  disabled?: boolean;
};

const TRACK_WIDTH = 44;
const TRACK_HEIGHT = 26;
const KNOB = 20;
const INSET = (TRACK_HEIGHT - KNOB) / 2;

/**
 * Interruptor de duas posições.
 *
 * Ligado usa a cor de assinatura, não o preto: preto aqui competiria com os
 * botões primários da tela, e este controle é ajuste, não decisão.
 */
export function Toggle({
  value,
  onChange,
  accessibilityLabel,
  disabled = false,
}: ToggleProps) {
  const progress = useDerivedValue(() =>
    withTiming(value ? 1 : 0, {
      duration: duration.fast,
      easing: easing.standard,
    })
  );

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: progress.value > 0.5 ? colors.signature : colors.surfaceMuted,
  }));

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * (TRACK_WIDTH - KNOB - INSET * 2) }],
  }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      onPress={() => onChange(!value)}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.track,
          trackStyle,
          { opacity: disabled ? disabledOpacity : 1 },
        ]}
      >
        <Animated.View style={[styles.knob, knobStyle]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: radius.full,
    padding: INSET,
    justifyContent: 'center',
  },
  knob: {
    width: KNOB,
    height: KNOB,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },
});
