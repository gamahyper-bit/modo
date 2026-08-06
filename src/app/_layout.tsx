import '../../global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, useAuth } from '@/features/auth';
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
          <AuthProvider>
            <StatusBar style="dark" />
            <SessionGate />
          </AuthProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

/**
 * Guarda de rota.
 *
 * Redireciona em efeito, e não com `<Redirect>`, porque a decisão depende de
 * onde o usuário já está: um `<Redirect>` avaliado no corpo do layout brigaria
 * com a navegação em curso e piscaria a tela de login durante a leitura da
 * sessão guardada.
 */
function SessionGate() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const onLogin = segments[0] === 'login';

  useEffect(() => {
    if (isLoading) return;

    if (!session && !onLogin) {
      router.replace('/login');
      return;
    }

    if (session && onLogin) {
      router.replace('/');
    }
  }, [session, isLoading, onLogin, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'fade',
      }}
    />
  );
}
