import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, duration, easing, radius, spacing } from '@/theme';

import { Text } from './Text';
import { useTransition } from './motion';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

/** Arraste além disso e a folha entende que você quer fechá-la. */
const DISMISS_DISTANCE = 96;

/**
 * Folha inferior — o lugar das escolhas do produto ("Ajustar", filtros,
 * seleção de categoria).
 *
 * Fica ao alcance do polegar e devolve o controle sem tirar a tela de baixo do
 * campo de visão: o usuário continua vendo o look enquanto o ajusta.
 */
export function BottomSheet({
  visible,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const progress = useTransition(visible);
  const drag = useSharedValue(0);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      // Entrada e arraste somam no mesmo eixo: a folha nunca "pula" ao
      // trocar de um para o outro.
      { translateY: (1 - progress.value) * 320 + drag.value },
    ],
  }));

  const pan = Gesture.Pan()
    .onChange((event) => {
      drag.value = Math.max(0, drag.value + event.changeY);
    })
    .onEnd(() => {
      if (drag.value > DISMISS_DISTANCE) {
        runOnJS(onClose)();
        drag.value = 0;
        return;
      }

      drag.value = withTiming(0, {
        duration: duration.fast,
        easing: easing.standard,
      });
    });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]}>
          <Pressable
            style={styles.backdrop}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Fechar"
          />
        </Animated.View>

        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.sheet,
              { paddingBottom: insets.bottom + spacing.xl },
              sheetStyle,
            ]}
          >
            <View style={styles.handle} />
            {title ? (
              <Text variant="title" style={styles.title}>
                {title}
              </Text>
            ) : null}
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius['2xl'],
    borderTopRightRadius: radius['2xl'],
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.border,
  },
  title: {
    // Perto da alça e perto do conteúdo. A folha sobe ocupando pouca altura, e
    // um título boiando no meio de dois vazios fazia o topo parecer que ainda
    // estava carregando alguma coisa.
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
});
