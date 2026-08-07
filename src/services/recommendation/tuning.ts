import type { LookAdjustment } from '@/types/look';
import type { GarmentCategory } from '@/types/wardrobe';

/**
 * O que cada ajuste faz com o motor.
 *
 * Este arquivo é a resposta inteira à pergunta "o que acontece quando o usuário
 * toca em 'Está frio'". Antes dele os ajustes chegavam ao serviço e paravam
 * ali: a interface prometia que o usuário tinha sido ouvido e o motor não ouvia
 * nada — o look mudava de vez em quando, por coincidência de variante.
 *
 * Uma tabela só, três eixos. Nenhum ajuste inventa um mecanismo próprio.
 */

export type Tuning = {
  /** Deslocamento na régua de formalidade. Positivo pede peça mais formal. */
  formality: number;
  /** Graus somados à leitura do termômetro — o corpo do usuário contra a API. */
  temperature: number;
  /**
   * Avança a escolha dentro de uma categoria e deixa o resto do look intocado.
   *
   * É o que faz "outro calçado" trocar só o calçado: todas as outras vagas
   * continuam sendo decididas pela mesma variante, então continuam iguais.
   */
  offsets: Partial<Record<GarmentCategory, number>>;
};

export const NEUTRAL_TUNING: Tuning = {
  formality: 0,
  temperature: 0,
  offsets: {},
};

/**
 * Um degrau na régua quase nunca muda a escolha — dois mudam.
 *
 * A régua tem cinco níveis e as peças de um armário real se concentram no
 * meio. Com um degrau, "mais elegante" devolveria o mesmo look na maioria dos
 * armários — que é exatamente o defeito que este ajuste existe para corrigir.
 */
const FORMALITY_STEP = 2;

/**
 * Quanto o "está frio" do usuário vale contra o termômetro.
 *
 * Seis graus atravessam qualquer um dos dois limiares do motor — casaco abaixo
 * de 20, bermuda a partir de 26 — partindo de uma temperatura amena. Menos que
 * isso e o ajuste vira decorativo em metade dos dias do ano.
 */
const TEMPERATURE_STEP = 6;

const EFFECTS: Record<LookAdjustment, Partial<Tuning>> = {
  'mais-elegante': { formality: FORMALITY_STEP },
  'mais-casual': { formality: -FORMALITY_STEP },
  'esta-frio': { temperature: -TEMPERATURE_STEP },
  'esta-calor': { temperature: TEMPERATURE_STEP },
  // "Outra calça" move também a bermuda: para o motor as duas disputam a mesma
  // vaga do look, e qual delas aparece é decisão do clima, não do usuário.
  'outra-calca': { offsets: { calca: 1, bermuda: 1 } },
  'outro-calcado': { offsets: { calcado: 1 } },
};

const mergeOffsets = (
  base: Tuning['offsets'],
  extra: Tuning['offsets'] = {}
): Tuning['offsets'] => {
  const merged = { ...base };

  for (const [category, offset] of Object.entries(extra)) {
    const key = category as GarmentCategory;
    merged[key] = (merged[key] ?? 0) + offset;
  }

  return merged;
};

/**
 * Acumula os ajustes pedidos numa única configuração do motor.
 *
 * Soma em vez de sobrescrever: dois pedidos na mesma direção empurram mais que
 * um, e pedidos opostos se cancelam — que é o comportamento que o usuário
 * espera de qualquer coisa que se comporte como um controle.
 */
export function tuningFor(adjustments: LookAdjustment[]): Tuning {
  return adjustments.reduce<Tuning>((tuning, adjustment) => {
    const effect = EFFECTS[adjustment];

    return {
      formality: tuning.formality + (effect.formality ?? 0),
      temperature: tuning.temperature + (effect.temperature ?? 0),
      offsets: mergeOffsets(tuning.offsets, effect.offsets),
    };
  }, NEUTRAL_TUNING);
}
