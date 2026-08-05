/** Categorias do armário. Espelham a família de ícones de vestuário. */
export type GarmentCategory =
  'camiseta' | 'camisa' | 'casaco' | 'calca' | 'bermuda' | 'calcado' | 'acessorio';

export type Season = 'primavera' | 'verao' | 'outono' | 'inverno';

export type Occasion = 'trabalho' | 'casual' | 'noite' | 'encontro' | 'viagem';

export type GarmentColor = {
  /** Nome legível — "Preto", "Areia". */
  name: string;
  hex: string;
};

export type Garment = {
  id: string;
  name: string;
  category: GarmentCategory;
  color: GarmentColor;
  material?: string;
  seasons: Season[];
  occasions: Occasion[];
  /**
   * Peça de uniforme de trabalho.
   *
   * Regra de produto: uniforme nunca entra em look casual. A checagem é do
   * motor de recomendação, não da interface.
   */
  isUniform: boolean;
  /** Foto já recortada, com fundo transparente. Ausente enquanto não há backend. */
  imageUri?: string;
};

export const OCCASION_LABELS: Record<Occasion, string> = {
  trabalho: 'Trabalho',
  casual: 'Casual',
  noite: 'Noite',
  encontro: 'Encontro',
  viagem: 'Viagem',
};
