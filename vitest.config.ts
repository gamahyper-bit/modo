import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

/**
 * Testes do motor, e só do motor.
 *
 * `composeLook` e as tabelas ao redor dele são TypeScript puro: nenhum import
 * de React Native, nenhum componente, nenhuma tela. É de propósito — é o que
 * permite testar a regra sem carregar um ambiente de renderização, e é o que
 * mantém a decisão do look separada da interface que a mostra.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
