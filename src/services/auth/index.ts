import { hasBackend } from '@/lib/env';

import { demoAuthService } from './demoAuthService';
import { supabaseAuthService } from './supabaseAuthService';
import type { AuthService } from './types';

/**
 * Escolhe a implementação pela presença de configuração.
 *
 * Com as chaves do Supabase no ambiente, autenticação de verdade. Sem elas, o
 * modo de demonstração — que é o que mantém o produto testável e revisável
 * enquanto o backend não existe.
 */
export const authService: AuthService = hasBackend
  ? supabaseAuthService
  : demoAuthService;

export { DEMO_CODE } from './demoAuthService';
export type { AuthService } from './types';
