import type { ReactNode } from 'react';
import { Modal as RNModal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { colors, radius, spacing } from '@/theme';

import { IconButton } from './IconButton';
import { Text } from './Text';
import { useTransition } from './motion';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  /** Toque fora fecha. Desligue em decisões destrutivas. */
  dismissOnBackdrop?: boolean;
};

/**
 * Diálogo centrado — confirmações e decisões curtas.
 *
 * Para escolhas com mais de duas opções use `BottomSheet`: a mão alcança o
 * rodapé, não o centro da tela.
 */
export function Modal({
  visible,
  onClose,
  title,
  children,
  dismissOnBackdrop = true,
}: ModalProps) {
  const progress = useTransition(visible);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const panelStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    // Sobe alguns pixels ao entrar: revelar, não aparecer.
    transform: [{ translateY: (1 - progress.value) * 8 }],
  }));

  return (
    <RNModal
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
            onPress={dismissOnBackdrop ? onClose : undefined}
            accessibilityRole="button"
            accessibilityLabel="Fechar"
          />
        </Animated.View>

        <Animated.View style={[styles.panel, panelStyle]}>
          <View style={styles.header}>
            {title ? <Text variant="title">{title}</Text> : <View />}
            <IconButton
              icon="fechar"
              accessibilityLabel="Fechar"
              onPress={onClose}
            />
          </View>
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
