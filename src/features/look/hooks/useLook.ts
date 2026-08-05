import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { lookService } from '@/services/looks';

const lookKey = (lookId: string) => ['look', lookId] as const;
const savedKey = (lookId: string) => ['look', lookId, 'saved'] as const;

/** O look e seu estado de coleção. */
export function useLook(lookId: string) {
  const queryClient = useQueryClient();

  const look = useQuery({
    queryKey: lookKey(lookId),
    queryFn: () => lookService.getById(lookId),
  });

  const saved = useQuery({
    queryKey: savedKey(lookId),
    queryFn: () => lookService.isSaved(lookId),
  });

  const toggleSave = useMutation({
    mutationFn: (next: boolean) =>
      next ? lookService.save(lookId) : lookService.remove(lookId),
    // Salvar precisa parecer instantâneo: o usuário toca e o ícone responde,
    // sem esperar a rede confirmar o óbvio.
    onMutate: async (next) => {
      await queryClient.cancelQueries({ queryKey: savedKey(lookId) });
      const previous = queryClient.getQueryData<boolean>(savedKey(lookId));
      queryClient.setQueryData(savedKey(lookId), next);
      return { previous };
    },
    onError: (_error, _next, context) => {
      queryClient.setQueryData(savedKey(lookId), context?.previous ?? false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: savedKey(lookId) });
    },
  });

  return {
    look: look.data,
    isLoading: look.isPending,
    error: look.error,
    isSaved: saved.data ?? false,
    toggleSave: () => toggleSave.mutate(!(saved.data ?? false)),
    retry: look.refetch,
  };
}
