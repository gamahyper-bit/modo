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

/** Uma peça antes de existir: o que a IA detectou e o usuário confirmou. */
export type GarmentDraft = Omit<Garment, 'id'>;

/**
 * Cores oferecidas na confirmação.
 *
 * Curta de propósito: o usuário corrige uma leitura da IA, não escolhe numa
 * cartela. Mais opções aqui significam mais tempo numa tela que deveria ser um
 * "sim, está certo".
 */
export const GARMENT_COLORS: GarmentColor[] = [
  { name: 'Preto', hex: '#0D0D0D' },
  { name: 'Grafite', hex: '#1A1A1A' },
  { name: 'Cinza', hex: '#6B6B6B' },
  { name: 'Areia', hex: '#E7E2DA' },
  { name: 'Branco', hex: '#F7F5F2' },
  { name: 'Marinho', hex: '#1F2A3C' },
  { name: 'Caramelo', hex: '#8A6242' },
  { name: 'Verde', hex: '#5E6B57' },
];

/** Plural, como aparece nos filtros do armário. */
export const CATEGORY_LABELS: Record<GarmentCategory, string> = {
  camiseta: 'Camisetas',
  camisa: 'Camisas',
  casaco: 'Casacos',
  calca: 'Calças',
  bermuda: 'Bermudas',
  calcado: 'Calçados',
  acessorio: 'Acessórios',
};

/** Singular, como aparece na confirmação de uma peça. */
export const CATEGORY_NAMES: Record<GarmentCategory, string> = {
  camiseta: 'Camiseta',
  camisa: 'Camisa',
  casaco: 'Casaco',
  calca: 'Calça',
  bermuda: 'Bermuda',
  calcado: 'Calçado',
  acessorio: 'Acessório',
};

export const SEASON_LABELS: Record<Season, string> = {
  primavera: 'Primavera',
  verao: 'Verão',
  outono: 'Outono',
  inverno: 'Inverno',
};

/** Ordem de exibição no armário: do corpo para fora, depois os pés. */
export const CATEGORY_ORDER: GarmentCategory[] = [
  'camiseta',
  'camisa',
  'casaco',
  'calca',
  'bermuda',
  'calcado',
  'acessorio',
];

export const OCCASION_LABELS: Record<Occasion, string> = {
  trabalho: 'Trabalho',
  casual: 'Casual',
  noite: 'Noite',
  encontro: 'Encontro',
  viagem: 'Viagem',
};
