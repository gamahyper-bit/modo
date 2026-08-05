import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

import { AppIcon, type AppIconName } from './AppIcon';
import { Text } from './Text';

export type NavItem = {
  key: string;
  label: string;
  icon: AppIconName;
};

type BottomNavigationProps = {
  items: readonly NavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
};

/**
 * Navegação principal — quatro destinos, sem botão central.
 *
 * Adicionar peça vive dentro do Armário, onde a ação faz sentido no contexto.
 * Um botão flutuante no meio da barra é vocabulário de rede social e roubaria
 * o peso visual que pertence ao conteúdo.
 *
 * O estado ativo é só contraste: preto contra cinza. Sem pílula, sem
 * sublinhado, sem ícone preenchido.
 */
export function BottomNavigation({
  items,
  activeKey,
  onSelect,
}: BottomNavigationProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.bar, { paddingBottom: insets.bottom + spacing.sm }]}
      accessibilityRole="tablist"
    >
      {items.map((item) => {
        const active = item.key === activeKey;
        const tint = active ? colors.textPrimary : colors.textSecondary;

        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={item.label}
            onPress={() => onSelect(item.key)}
            style={styles.item}
          >
            <AppIcon name={item.icon} size="lg" color={tint} />
            <Text variant="caption" tone={active ? 'primary' : 'secondary'}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Os quatro destinos do Modo. */
export const NAV_ITEMS: readonly NavItem[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'armario', label: 'Armário', icon: 'camisa' },
  { key: 'looks', label: 'Looks', icon: 'looks' },
  { key: 'perfil', label: 'Perfil', icon: 'perfil' },
];

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
});
