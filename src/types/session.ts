export type AuthProvider = 'email' | 'google' | 'apple';

export type User = {
  id: string;
  /** Nome de exibição. A Home cumprimenta com o primeiro nome. */
  name: string;
  email: string;
  avatarUrl?: string;
};

export type Session = {
  user: User;
  provider: AuthProvider;
};

/** Primeiro nome — é assim que o produto se dirige ao usuário. */
export const firstNameOf = (user: User): string =>
  user.name.trim().split(/\s+/)[0] ?? user.name;
