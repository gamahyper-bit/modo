import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { recommendationService } from '@/services/recommendation';
import type { LookAdjustment } from '@/types/look';
import type { Occasion } from '@/types/wardrobe';

const recommendationKey = (occasion: Occasion, adjustments: LookAdjustment[]) =>
  ['recommendation', occasion, ...adjustments] as const;

/**
 * A recomendação da Home.
 *
 * Guarda o histórico de looks já vistos para que "Gerar outro" nunca devolva o
 * mesmo — e por isso a exclusão vive aqui, não no serviço: é estado de sessão
 * do usuário, não conhecimento do backend.
 */
export function useRecommendation(initialOccasion: Occasion = 'trabalho') {
  const queryClient = useQueryClient();
  const [occasion, setOccasion] = useState<Occasion>(initialOccasion);
  const [adjustments, setAdjustments] = useState<LookAdjustment[]>([]);
  const seen = useRef<string[]>([]);

  const query = useQuery({
    queryKey: recommendationKey(occasion, adjustments),
    queryFn: async () => {
      const look = await recommendationService.getRecommendation({
        occasion,
        adjustments,
        excludeLookIds: seen.current,
      });

      seen.current = [...seen.current, look.id];
      return look;
    },
  });

  const regenerate = useMutation({
    mutationFn: () =>
      recommendationService.getRecommendation({
        occasion,
        adjustments,
        excludeLookIds: seen.current,
      }),
    onSuccess: (look) => {
      seen.current = [...seen.current, look.id];
      queryClient.setQueryData(recommendationKey(occasion, adjustments), look);
    },
  });

  const save = useMutation({
    mutationFn: (lookId: string) => recommendationService.saveLook(lookId),
  });

  const applyAdjustment = (adjustment: LookAdjustment) => {
    // Um ajuste é uma nova pergunta ao stylist: o histórico de vistos é
    // irrelevante para ela, e a resposta anterior deixa de valer.
    seen.current = [];
    setAdjustments([adjustment]);
  };

  const changeOccasion = (next: Occasion) => {
    seen.current = [];
    setAdjustments([]);
    setOccasion(next);
  };

  return {
    look: query.data,
    occasion,
    isLoading: query.isPending,
    isRegenerating: regenerate.isPending,
    isSaving: save.isPending,
    isSaved: save.isSuccess,
    error: query.error,
    regenerate: regenerate.mutate,
    save: save.mutate,
    applyAdjustment,
    changeOccasion,
    retry: query.refetch,
  };
}
