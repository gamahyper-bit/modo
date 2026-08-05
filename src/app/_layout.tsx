import '../../global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppFonts } from '@/hooks/useAppFonts';
import { queryClient } from '@/lib/queryClient';
import { colors, duration } from '@/theme';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: duration.slow, fade: true });

export default function RootLayout() {
  const { fontsReady } = useAppFonts();

  // A splash só sai depois que a tipografia está pronta. Texto que troca de
  // fonte na frente do usuário denuncia o software.
  const onLayout = useCallback(() => {
    if (fontsReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsReady]);

  if (!fontsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayout}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
              animation: 'fade',
            }}
          />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
