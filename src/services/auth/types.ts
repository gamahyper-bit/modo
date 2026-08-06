import type { AuthProvider, Session } from '@/types/session';

/**
 * A porta de autenticação.
 *
 * `signInWithEmail` envia um código; `verifyEmailCode` o confere. É um fluxo de
 * dois passos de propósito: senha é mais um campo para o usuário preencher, e o
 * produto promete o contrário.
 *
 * Google e Apple resolvem em uma chamada só porque o provedor cuida do resto.
 */
export interface AuthService {
  /** Sessão atual, ou `undefined`. Lida do armazenamento seguro na abertura. */
  getSession(): Promise<Session | undefined>;

  /** Notifica login e logout — inclusive os que acontecem em outra aba. */
  onSessionChange(listener: (session: Session | undefined) => void): () => void;

  signInWithEmail(email: string): Promise<void>;
  verifyEmailCode(email: string, code: string): Promise<Session>;

  signInWith(provider: Exclude<AuthProvider, 'email'>): Promise<Session>;

  signOut(): Promise<void>;
}
