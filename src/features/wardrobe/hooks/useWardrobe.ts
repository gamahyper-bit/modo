import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { wardrobeService } from '@/services/wardrobe';
import type { GarmentCategory } from '@/types/wardrobe';

export const wardrobeKeys = {
  all: ['wardrobe'] as const,
  list: (category: GarmentCategory | 'todas', query: string) =>
    ['wardrobe', 'list', category, query] as const,
  counts: () => ['wardrobe', 'counts'] as const,
};

/** O armário com filtro de categoria e busca. */
export function useWardrobe() {
  const [category, setCategory] = useState<GarmentCategory | 'todas'>('todas');
  const [query, setQuery] = useState('');

  const garments = useQuery({
    queryKey: wardrobeKeys.list(category, query),
    queryFn: () =>
      wardrobeService.list({
        category: category === 'todas' ? undefined : category,
        query: query || undefined,
      }),
  });

  const counts = useQuery({
    queryKey: wardrobeKeys.counts(),
    queryFn: () => wardrobeService.countByCategory(),
  });

  const total = counts.data
    ? Object.values(counts.data).reduce((sum, count) => sum + count, 0)
    : 0;

  return {
    garments: garments.data ?? [],
    isLoading: garments.isPending,
    error: garments.error,
    counts: counts.data,
    total,
    category,
    setCategory,
    query,
    setQuery,
    /** Verdadeiro só quando o armário está vazio de fato, não filtrado. */
    isEmpty: total === 0 && !counts.isPending,
  };
}
