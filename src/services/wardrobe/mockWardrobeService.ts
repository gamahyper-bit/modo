import type { Garment, GarmentCategory, GarmentDraft } from '@/types/wardrobe';
import { CATEGORY_ORDER } from '@/types/wardrobe';

import { wardrobeSeed } from './seed';
import type { GarmentAnalysis, WardrobeFilter, WardrobeService } from './types';

const LATENCY_MS = 350;
/** A leitura da peça é o passo caro: é visão computacional, não consulta. */
const ANALYSIS_MS = 1600;

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Armário em memória.
 *
 * Some ao recarregar, e tudo bem: o ciclo que interessa validar — adicionar uma
 * peça e ver a Home mudar — acontece dentro de uma sessão.
 */
let garments: Garment[] = [...wardrobeSeed];
let nextId = wardrobeSeed.length + 1;

const matches = (garment: Garment, filter?: WardrobeFilter) => {
  if (!filter) return true;

  if (filter.category && garment.category !== filter.category) return false;

  if (filter.query) {
    const haystack = [garment.name, garment.color.name, garment.material ?? '']
      .join(' ')
      .toLowerCase();

    if (!haystack.includes(filter.query.trim().toLowerCase())) return false;
  }

  return true;
};

/**
 * Ordena por categoria e, dentro dela, pela ordem de entrada invertida — peça
 * nova aparece primeiro no seu grupo, que é onde o usuário vai procurá-la
 * logo depois de fotografar.
 */
const sorted = (list: Garment[]) =>
  [...list].sort((a, b) => {
    const byCategory =
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);

    if (byCategory !== 0) return byCategory;
    return garments.indexOf(b) - garments.indexOf(a);
  });

/**
 * Leitura simulada da peça.
 *
 * Devolve sempre a mesma sugestão porque não há visão computacional aqui — o
 * que precisa ser validado agora é o **fluxo**: a IA propõe, o usuário confere,
 * a peça entra. Quando a Edge Function com o Gemini existir, só este método
 * muda.
 */
const fakeAnalysis = (imageUri: string): GarmentAnalysis => ({
  imageUri,
  suggestion: {
    name: 'Camisa de algodão',
    category: 'camisa',
    color: { name: 'Preto', hex: '#0D0D0D' },
    material: 'Algodão',
    seasons: ['outono', 'inverno', 'primavera'],
    occasions: ['trabalho', 'noite'],
    isUniform: false,
    imageUri,
  },
});

export const mockWardrobeService: WardrobeService = {
  async list(filter?: WardrobeFilter): Promise<Garment[]> {
    await delay(LATENCY_MS);
    return sorted(garments.filter((garment) => matches(garment, filter)));
  },

  async countByCategory(): Promise<Record<GarmentCategory, number>> {
    await delay(LATENCY_MS / 2);

    const counts = Object.fromEntries(
      CATEGORY_ORDER.map((category) => [category, 0])
    ) as Record<GarmentCategory, number>;

    for (const garment of garments) counts[garment.category] += 1;
    return counts;
  },

  async add(draft: GarmentDraft): Promise<Garment> {
    await delay(LATENCY_MS);

    const garment: Garment = { ...draft, id: `g${nextId++}` };
    garments = [...garments, garment];
    return garment;
  },

  async remove(garmentId: string): Promise<void> {
    await delay(LATENCY_MS);
    garments = garments.filter((garment) => garment.id !== garmentId);
  },

  async analyze(imageUri: string): Promise<GarmentAnalysis> {
    await delay(ANALYSIS_MS);
    return fakeAnalysis(imageUri);
  },
};
