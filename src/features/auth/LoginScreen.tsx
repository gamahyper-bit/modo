import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Input, Logo, Reveal, Text } from '@/components';
import { hasBackend } from '@/lib/env';
import { authService, DEMO_CODE } from '@/services/auth';
import { colors, screenPadding, spacing, staggerStep } from '@/theme';
import type { AuthProvider } from '@/types/session';

type Step = 'escolher' | 'codigo';

/**
 * Entrada no Modo.
 *
 * Nenhuma senha. E-mail recebe um código, Apple e Google resolvem sozinhos — o
 * produto promete tirar trabalho do usuário, e não pode começar pedindo que ele
 * invente e memorize mais uma.
 *
 * A primeira tela do app é também a primeira impressão da marca: a mesma
 * afirmação do splash, em serifa, com muito ar.
 */
export function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<Step>('escolher');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pending, setPending] = useState<AuthProvider>();
  const [error, setError] = useState<string>();

  const run = async (provider: AuthProvider, action: () => Promise<unknown>) => {
    setPending(provider);
    setError(undefined);

    try {
      await action();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não consegui entrar.');
    } finally {
      setPending(undefined);
    }
  };

  const sendCode = () =>
    run('email', async () => {
      await authService.signInWithEmail(email.trim());
      setStep('codigo');
    });

  const verify = () =>
    run('email', () => authService.verifyEmailCode(email.trim(), code.trim()));

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top, paddingBottom: insets.bottom + spacing['2xl'] },
      ]}
    >
      <View style={styles.brand}>
        {/* Ancorado na mesma margem da afirmação: logo centrado com texto à
            esquerda quebra o eixo que sustenta a página. */}
        <Reveal style={styles.logo}>
          <Logo variant="mark" size={44} />
        </Reveal>

        <Reveal delay={staggerStep} style={styles.statement}>
          <Text variant="displayLarge">Seu estilo.</Text>
          <Text variant="displayLarge">Revelado.</Text>
          <Text variant="body" tone="secondary" style={styles.subtitle}>
            O Modo combina o que você tem e revela a melhor escolha para cada
            momento.
          </Text>
        </Reveal>
      </View>

      <Reveal delay={staggerStep * 2}>
        {step === 'escolher' ? (
          <View style={styles.actions}>
            {Platform.OS === 'ios' ? (
              <Button
                label="Continuar com a Apple"
                variant="secondary"
                loading={pending === 'apple'}
                disabled={pending !== undefined}
                onPress={() => run('apple', () => authService.signInWith('apple'))}
              />
            ) : null}

            <Button
              label="Continuar com o Google"
              variant="secondary"
              loading={pending === 'google'}
              disabled={pending !== undefined}
              onPress={() => run('google', () => authService.signInWith('google'))}
            />

            <Input
              label="Ou entre com seu e-mail"
              placeholder="voce@email.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              error={error}
            />

            <Button
              label="Enviar código"
              loading={pending === 'email'}
              disabled={email.trim().length < 5 || pending !== undefined}
              onPress={sendCode}
            />
          </View>
        ) : (
          <View style={styles.actions}>
            <Input
              label={`Código enviado para ${email.trim()}`}
              placeholder="000000"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              error={error}
            />

            {!hasBackend ? (
              <Text variant="caption" tone="secondary">
                Modo de demonstração: o código é {DEMO_CODE}.
              </Text>
            ) : null}

            <Button
              label="Entrar"
              loading={pending === 'email'}
              disabled={code.trim().length < 6 || pending !== undefined}
              onPress={verify}
            />

            <Button
              label="Usar outro e-mail"
              variant="ghost"
              disabled={pending !== undefined}
              onPress={() => {
                setStep('escolher');
                setCode('');
                setError(undefined);
              }}
            />
          </View>
        )}
      </Reveal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: screenPadding,
    justifyContent: 'space-between',
  },
  brand: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'flex-start',
  },
  statement: {
    marginTop: spacing['2xl'],
  },
  subtitle: {
    marginTop: spacing.lg,
    maxWidth: 300,
  },
  actions: {
    gap: spacing.md,
  },
});
