import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Tela de fundação — existe para provar que tokens, tipografia e NativeWind
 * estão de pé. Será substituída pelo splash + guarda de sessão na etapa de Auth.
 */
export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 justify-end bg-background px-xl"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 48 }}
    >
      <Text className="font-display text-displayLarge text-textPrimary">
        Seu estilo.
      </Text>
      <Text className="font-display text-displayLarge text-textPrimary">
        Revelado.
      </Text>

      <Text className="mt-lg max-w-[280px] font-sans text-body text-textSecondary">
        O Modo combina o que você tem e revela a melhor escolha para cada momento.
      </Text>

      <View className="mt-2xl h-[1px] w-2xl bg-borderStrong" />
    </View>
  );
}
