import { z } from 'zod';

/**
 * Configuração pública do app.
 *
 * Só entra aqui o que pode viver no bundle. Chave do Gemini e service role do
 * Supabase ficam nas Edge Functions — um bundle de React Native é extraível, e
 * segredo embarcado é segredo vazado.
 */
const schema = z.object({
  supabaseUrl: z.string().url({
    message: 'EXPO_PUBLIC_SUPABASE_URL ausente ou inválida. Veja .env.example.',
  }),
  supabaseAnonKey: z.string().min(1, {
    message: 'EXPO_PUBLIC_SUPABASE_ANON_KEY ausente. Veja .env.example.',
  }),
});

const parsed = schema.safeParse({
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
});

if (!parsed.success) {
  const problems = parsed.error.issues.map((issue) => `· ${issue.message}`);
  throw new Error(`Configuração inválida:\n${problems.join('\n')}`);
}

export const env = parsed.data;
