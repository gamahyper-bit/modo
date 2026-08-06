import { z } from 'zod';

/**
 * Configuração pública do app.
 *
 * Só entra aqui o que pode viver no bundle. Chave do Gemini e service role do
 * Supabase ficam nas Edge Functions — um bundle de React Native é extraível, e
 * segredo embarcado é segredo vazado.
 *
 * **Ausência de configuração não é erro.** Sem as chaves do Supabase o app roda
 * em modo de demonstração, com dados em memória — é assim que o produto
 * continua testável antes do backend existir. Um `throw` aqui impediria
 * justamente isso.
 */
const schema = z.object({
  supabaseUrl: z.string().url(),
  supabaseAnonKey: z.string().min(1),
});

const parsed = schema.safeParse({
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
});

/** Configuração do Supabase, ou `undefined` em modo de demonstração. */
export const supabaseEnv = parsed.success ? parsed.data : undefined;

/**
 * Verdadeiro quando há backend configurado.
 *
 * É o interruptor que escolhe entre as implementações reais e as de
 * demonstração em cada porta de serviço.
 */
export const hasBackend = supabaseEnv !== undefined;
