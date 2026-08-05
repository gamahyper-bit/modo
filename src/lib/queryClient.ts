import { QueryClient } from '@tanstack/react-query';

/**
 * O armário muda pouco e a recomendação é cara de produzir: cache generoso,
 * refetch contido. Nada de recarregar a tela toda vez que o app volta do fundo.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
