import type { Garment, GarmentCategory, GarmentDraft } from '@/types/wardrobe';

export type WardrobeFilter = {
  category?: GarmentCategory;
  /** Busca por nome, cor ou material. */
  query?: string;
};

/**
 * O que a IA devolve depois de olhar a foto.
 *
 * É uma **sugestão**, não um fato: a tela apresenta como preenchido e o usuário
 * confirma. Nada aqui entra no armário sem passar por ele.
 */
export type GarmentAnalysis = {
  /** Foto com o fundo removido. */
  imageUri: string;
  suggestion: GarmentDraft;
};

/**
 * A porta do armário.
 *
 * `analyze` é a única operação que hoje seria uma Edge Function falando com o
 * Gemini — remoção de fundo e leitura de atributos. As demais serão Postgres.
 */
export interface WardrobeService {
  list(filter?: WardrobeFilter): Promise<Garment[]>;
  countByCategory(): Promise<Record<GarmentCategory, number>>;
  add(draft: GarmentDraft): Promise<Garment>;
  remove(garmentId: string): Promise<void>;
  analyze(imageUri: string): Promise<GarmentAnalysis>;
}
