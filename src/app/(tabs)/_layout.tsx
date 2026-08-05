import { Tabs } from 'expo-router';

import { BottomNavigation, NAV_ITEMS } from '@/components';
import { colors } from '@/theme';

/**
 * Shell do app: quatro destinos, barra própria.
 *
 * A navegação do produto é o nosso componente, não a do React Navigation —
 * assim o estado ativo, o traço e o espaçamento seguem os tokens como qualquer
 * outra superfície.
 */

/**
 * Ponte entre o vocabulário do produto e o do roteador. A Home é `index` para o
 * Expo Router e `home` para o design system; a tradução mora aqui, e não dentro
 * do componente de navegação.
 */
const ROUTE_BY_KEY: Record<string, string> = {
  home: 'index',
  armario: 'armario',
  looks: 'looks',
  perfil: 'perfil',
};

const KEY_BY_ROUTE: Record<string, string> = Object.fromEntries(
  Object.entries(ROUTE_BY_KEY).map(([key, route]) => [route, key])
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
      tabBar={({ state, navigation }) => {
        const activeRoute = state.routes[state.index]?.name ?? 'index';

        return (
          <BottomNavigation
            items={NAV_ITEMS}
            activeKey={KEY_BY_ROUTE[activeRoute] ?? 'home'}
            onSelect={(key) => navigation.navigate(ROUTE_BY_KEY[key] ?? key)}
          />
        );
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="armario" />
      <Tabs.Screen name="looks" />
      <Tabs.Screen name="perfil" />
    </Tabs>
  );
}
