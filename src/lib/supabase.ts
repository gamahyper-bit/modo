import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

import { supabaseEnv } from './env';

/**
 * Cliente do Supabase, ou `undefined` em modo de demonstração.
 *
 * A sessão é guardada com `AsyncStorage`. `detectSessionInUrl` só faz sentido na
 * web, onde o retorno do OAuth chega pela própria URL; no aparelho o retorno vem
 * por deep link e é tratado pelo serviço de autenticação.
 */
export const supabase: SupabaseClient | undefined = supabaseEnv
  ? createClient(supabaseEnv.supabaseUrl, supabaseEnv.supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: Platform.OS === 'web',
      },
    })
  : undefined;
