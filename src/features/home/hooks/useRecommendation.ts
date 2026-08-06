import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import { lookService } from '@/services/looks';
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

  // Salvar é persistência, não recomendação: passa pela porta dos looks e
  // avisa a aba Looks, que é onde o look vai aparecer.
  const save = useMutation({
    mutationFn: (lookId: string) => lookService.save(lookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['looks'] });
    },
  });

  const applyAdjustment = (adjustment: LookAdjustment) => {
    // Um ajuste é uma nova pergunta ao stylist: o histórico de vistos é
    // irrelevante para ela, e a resposta anterior deixa de valer.
    seen.current = [];
    // Um ajuste por vez. Pedir "mais elegante" e "está frio" juntos é uma
    // conversa, e o Modo não conversa — o usuário reage a uma resposta de cada
    // vez, e cada reação recomeça a pergunta.
    setAdjustments([adjustment]);
  };

  const clearAdjustment = () => {
    seen.current = [];
    setAdjustments([]);
  };

  const changeOccasion = (next: Occasion) => {
    seen.current = [];
    setAdjustments([]);
    setOccasion(next);
  };

  return {
    look: query.data,
    occasion,
    /** O ajuste em vigor, para a Home poder mostrá-lo e desfazê-lo. */
    activeAdjustment: adjustments[0],
    isLoading: query.isPending,
    isRegenerating: regenerate.isPending,
    isSaving: save.isPending,
    isSaved: save.isSuccess,
    error: query.error,
    regenerate: regenerate.mutate,
    save: save.mutate,
    applyAdjustment,
    clearAdjustment,
    changeOccasion,
    retry: query.refetch,
  };
}
