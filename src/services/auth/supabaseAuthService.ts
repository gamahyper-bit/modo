import * as AppleAuthentication from 'expo-apple-authentication';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { supabase } from '@/lib/supabase';
import type { Session, User } from '@/types/session';

import type { AuthService } from './types';

const client = () => {
  if (!supabase) {
    throw new Error('Supabase não configurado. Veja .env.example.');
  }

  return supabase;
};

type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: { full_name?: string; name?: string; avatar_url?: string };
  app_metadata?: { provider?: string };
};

/**
 * O Supabase devolve o nome em lugares diferentes conforme o provedor: o Google
 * usa `full_name`, o Apple manda `name` só no primeiro login, e o e-mail não
 * manda nada. Cair para a parte local do e-mail é o último recurso.
 */
const toUser = (user: SupabaseUser): User => ({
  id: user.id,
  email: user.email ?? '',
  name:
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split('@')[0] ??
    'Você',
  avatarUrl: user.user_metadata?.avatar_url,
});

const toSession = (user: SupabaseUser): Session => ({
  user: toUser(user),
  provider:
    user.app_metadata?.provider === 'google'
      ? 'google'
      : user.app_metadata?.provider === 'apple'
        ? 'apple'
        : 'email',
});

/** Para onde o provedor devolve o usuário depois do consentimento. */
const redirectTo = Linking.createURL('/login');

export const supabaseAuthService: AuthService = {
  async getSession() {
    const { data } = await client().auth.getSession();
    return data.session ? toSession(data.session.user) : undefined;
  },

  onSessionChange(listener) {
    const { data } = client().auth.onAuthStateChange((_event, session) => {
      listener(session ? toSession(session.user) : undefined);
    });

    return () => data.subscription.unsubscribe();
  },

  async signInWithEmail(email) {
    const { error } = await client().auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    if (error) throw new Error(error.message);
  },

  async verifyEmailCode(email, code) {
    const { data, error } = await client().auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    });

    if (error) throw new Error(error.message);
    if (!data.session) throw new Error('Não foi possível entrar.');

    return toSession(data.session.user);
  },

  async signInWith(provider) {
    // Apple: token nativo. É o caminho exigido pela App Store quando o app
    // oferece outro login social, e só existe em aparelho iOS — precisa de
    // development build, não roda no Expo Go.
    if (provider === 'apple' && Platform.OS === 'ios') {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!credential.identityToken) {
        throw new Error('A Apple não devolveu um token.');
      }

      const { data, error } = await client().auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });

      if (error) throw new Error(error.message);
      if (!data.session) throw new Error('Não foi possível entrar.');

      return toSession(data.session.user);
    }

    // Google: OAuth pelo navegador do sistema. Evita uma dependência nativa a
    // mais e funciona nas três plataformas.
    const { data, error } = await client().auth.signInWithOAuth({
      provider,
      options: { redirectTo, skipBrowserRedirect: true },
    });

    if (error) throw new Error(error.message);
    if (!data.url) throw new Error('Não foi possível abrir o provedor.');

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    if (result.type !== 'success') {
      throw new Error('Login cancelado.');
    }

    // O retorno traz os tokens no fragmento da URL.
    const fragment = result.url.split('#')[1] ?? '';
    const params = new URLSearchParams(fragment);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (!accessToken || !refreshToken) {
      throw new Error('O provedor não devolveu a sessão.');
    }

    const { data: session, error: sessionError } = await client().auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (sessionError) throw new Error(sessionError.message);
    if (!session.session) throw new Error('Não foi possível entrar.');

    return toSession(session.session.user);
  },

  async signOut() {
    const { error } = await client().auth.signOut();
    if (error) throw new Error(error.message);
  },
};
