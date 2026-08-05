import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme';

import { Text } from './Text';

type AvatarProps = {
  name?: string;
  imageUri?: string;
  size?: number;
};

/** Iniciais quando não há foto — nunca um ícone genérico de pessoa. */
function initials(name?: string) {
  if (!name) return '';

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ name, imageUri, size = 56 }: AvatarProps) {
  const box = { width: size, height: size, borderRadius: radius.full };

  if (imageUri) {
    return (
      <Image
        source={{ uri: imageUri }}
        style={box}
        contentFit="cover"
        transition={0}
        accessibilityIgnoresInvertColors
        accessibilityLabel={name}
      />
    );
  }

  return (
    <View style={[styles.fallback, box]} accessibilityLabel={name}>
      <Text variant="headline" tone="secondary">
        {initials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: colors.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
