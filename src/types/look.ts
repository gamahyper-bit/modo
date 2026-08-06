import type { Garment, Occasion } from './wardrobe';

export type WeatherCondition = 'sol' | 'nublado' | 'chuva' | 'frio';

export type Weather = {
  /** Graus Celsius. */
  temperature: number;
  condition: WeatherCondition;
};

/** Os ajustes que o usuário pode pedir sobre uma recomendação. */
export type LookAdjustment =
  | 'outro-calcado'
  | 'outra-calca'
  | 'mais-elegante'
  | 'mais-casual'
  | 'esta-calor'
  | 'esta-frio';

export const ADJUSTMENT_LABELS: Record<LookAdjustment, string> = {
  // "Outro tênis" nomeava a peça errada assim que a régua de formalidade passou
  // a alcançar a bota. A categoria não muda com a escolha; o modelo, sim.
  'outro-calcado': 'Outro calçado',
  'outra-calca': 'Outra calça',
  'mais-elegante': 'Mais elegante',
  'mais-casual': 'Mais casual',
  'esta-calor': 'Está calor',
  'esta-frio': 'Está frio',
};

/**
 * Os dois pedidos que o usuário faz, e eles não são a mesma coisa.
 *
 * **Trocar** é sobre uma peça: "essa não, outra". **Refinar** é sobre o
 * conjunto: "todo ele mais elegante", "todo ele mais quente". Misturados numa
 * fileira só de chips, os seis pareciam seis filtros equivalentes, e o usuário
 * tinha de descobrir a diferença tocando.
 *
 * A separação não é cosmética: é a mesma que o motor já fazia. Trocar vira
 * salto dentro de uma categoria; refinar vira deslocamento de uma régua que
 * atravessa o look inteiro (DEC-018).
 */
export const ADJUSTMENT_GROUPS: {
  title: string;
  adjustments: LookAdjustment[];
}[] = [
  {
    title: 'Trocar peças',
    adjustments: ['outro-calcado', 'outra-calca'],
  },
  {
    title: 'Refinar o look',
    adjustments: ['mais-elegante', 'mais-casual', 'esta-calor', 'esta-frio'],
  },
];

export type Look = {
  id: string;
  /** Abertura editorial — "Hoje.", "Sexta à noite." */
  moment: string;
  /** A leitura do stylist — "Confiante e contemporâneo." */
  mood: string;
  /**
   * A frase que a Home mostra — uma só, inteira, nunca truncada.
   *
   * Reticências no meio da fala do stylist quebram justamente a ilusão que o
   * produto vende. Se não cabe, encurte o texto: não corte a frase.
   */
  summary: string;
  /**
   * A nota completa: por que estas peças, juntas, funcionam. Aparece no
   * detalhe do look.
   *
   * Obrigatória. O Modo nunca mostra roupa sem explicar a escolha — é a
   * diferença entre uma consultoria e um gerador de combinações.
   */
  rationale: string;
  occasion: Occasion;
  weather: Weather;
  garments: Garment[];
  /** Foto do look montado. Ausente enquanto não há backend. */
  imageUri?: string;
};
