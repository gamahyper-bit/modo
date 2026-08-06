import {
  createContext,
  use,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { authService } from '@/services/auth';
import type { Session } from '@/types/session';

type AuthContextValue = {
  session?: Session;
  /** Verdadeiro enquanto a sessão guardada não foi lida. */
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * A sessão do app.
 *
 * Lê a sessão guardada na abertura e escuta mudanças — inclusive as que vêm de
 * fora, como um token expirando ou um logout em outra aba.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    authService.getSession().then((current) => {
      if (!active) return;
      setSession(current);
      setLoading(false);
    });

    const unsubscribe = authService.onSessionChange((next) => {
      if (active) setSession(next);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isLoading,
      signOut: () => authService.signOut(),
    }),
    [session, isLoading]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth(): AuthContextValue {
  const value = use(AuthContext);

  if (!value) {
    throw new Error('useAuth precisa estar dentro de AuthProvider.');
  }

  return value;
}
