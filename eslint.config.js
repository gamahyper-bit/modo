const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    // Edge Functions rodam em Deno, com globais e imports próprios: o ESLint do
    // app não tem como julgá-las.
    ignores: [
      'dist/*',
      '.expo/*',
      'node_modules/*',
      'android/*',
      'ios/*',
      'supabase/functions/*',
    ],
  },
  {
    // Arquivos de configuração rodam no Node, fora do bundle: `require` é o
    // formato correto ali.
    files: ['*.config.ts', '*.config.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    rules: {
      // Uma feature nunca alcança outra: a comunicação passa por services/hooks.
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*'],
              message:
                'Importe apenas o índice público da feature (@/features/<nome>), nunca seus arquivos internos.',
            },
          ],
        },
      ],
    },
  },
]);
