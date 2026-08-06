import type { AuthProvider, Session } from '@/types/session';

import type { AuthService } from './types';

const LATENCY_MS = 600;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/** O código que o modo de demonstração aceita. Aparece na própria tela. */
export const DEMO_CODE = '000000';

let session: Session | undefined;
const listeners = new Set<(session: Session | undefined) => void>();

const emit = () => {
  for (const listener of listeners) listener(session);
};

/** "gabriel.gama@email.com" -> "Gabriel Gama" */
const nameFromEmail = (email: string): string =>
  email
    .split('@')[0]!
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ') || 'Você';

const start = (email: string, provider: AuthProvider): Session => {
  session = {
    provider,
    user: { id: 'demo-user', name: nameFromEmail(email), email },
  };

  emit();
  return session;
};

/**
 * Autenticação de demonstração.
 *
 * Existe para o produto continuar testável antes do Supabase — e para que a
 * revisão de UX não dependa de caixa de entrada nem de conta Apple. Aceita
 * qualquer e-mail e um código fixo, que a própria tela informa.
 *
 * A sessão vive em memória: some ao recarregar, como todo o resto do modo de
 * demonstração.
 */
export const demoAuthService: AuthService = {
  async getSession() {
    return session;
  },

  onSessionChange(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  async signInWithEmail() {
    await delay(LATENCY_MS);
  },

  async verifyEmailCode(email, code) {
    await delay(LATENCY_MS);

    if (code !== DEMO_CODE) {
      throw new Error('Código incorreto.');
    }

    return start(email, 'email');
  },

  async signInWith(provider) {
    await delay(LATENCY_MS);
    return start(`${provider}@modo.app`, provider);
  },

  async signOut() {
    await delay(LATENCY_MS / 2);
    session = undefined;
    emit();
  },
};
