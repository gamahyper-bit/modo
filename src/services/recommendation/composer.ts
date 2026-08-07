import type { Look, LookAdjustment, Weather } from '@/types/look';
import type { Garment, GarmentCategory, Occasion } from '@/types/wardrobe';

import { momentFor, moodFor, rationaleFor, summaryFor } from './copy';
import { formalityTargetFor, rankFor } from './ranking';
import { tuningFor } from './tuning';

/**
 * O motor determinístico.
 *
 * A escolha do look **não** é uma chamada de LLM. Esta camada filtra o armário
 * por regra dura — ocasião, estação, clima, uniforme — e monta um conjunto
 * válido. Quando a IA entrar, ela recebe candidatos já válidos e faz só o que
 * LLM faz bem: ranquear e escrever.
 *
 * É o que mantém a latência baixa, o custo previsível e, principalmente, o que
 * garante que a Home sempre entregue um look — mesmo sem rede.
 */

/** Abaixo disso o look pede casaco. */
const COAT_THRESHOLD = 20;
/** Acima disso, calça comprida incomoda. */
const SHORTS_THRESHOLD = 26;

/** Marca a ausência de ajuste no id do look. */
const NO_ADJUSTMENT = '_';

type ComposeInput = {
  wardrobe: Garment[];
  occasion: Occasion;
  weather: Weather;
  /** Gira as escolhas a cada "Gerar outro". */
  variant: number;
  /** O que o usuário pediu sobre a recomendação anterior. */
  adjustments?: LookAdjustment[];
};

const pick = <T>(options: T[], index: number): T | undefined =>
  options.length === 0 ? undefined : options[index % options.length];

/**
 * Regra de uniforme: peça de uniforme só existe em look de trabalho.
 *
 * É uma regra do produto, não uma preferência — o usuário nunca deve ver a
 * calça do uniforme sugerida para um encontro.
 */
const allowedFor = (garment: Garment, occasion: Occasion) => {
  if (garment.isUniform && occasion !== 'trabalho') return false;
  return garment.occasions.includes(occasion);
};

/**
 * O segmento de ajuste do id.
 *
 * Precisa estar no id porque o detalhe do look reconstrói a partir dele. Sem
 * isso, abrir um look ajustado recomporia o look sem ajuste, o id não bateria e
 * a tela acusaria "peça não está mais no armário" — uma mentira, sobre um look
 * que existia meio segundo antes.
 */
const adjustmentSegment = (adjustments: LookAdjustment[]) =>
  adjustments.length > 0 ? adjustments.join('+') : NO_ADJUSTMENT;

export function composeLook({
  wardrobe,
  occasion,
  weather,
  variant,
  adjustments = [],
}: ComposeInput): Look | undefined {
  const tuning = tuningFor(adjustments);
  const target = formalityTargetFor(occasion, tuning.formality);

  /**
   * A temperatura com que o motor decide não é a do termômetro: é a que o
   * usuário disse sentir.
   *
   * `look.weather` continua carregando a leitura real, porque é ela que aparece
   * na tela — mentir sobre a previsão custaria mais confiança do que o ajuste
   * ganha. Quem explica a diferença é a nota do stylist.
   */
  const felt = weather.temperature + tuning.temperature;

  const eligible = wardrobe
    .filter((garment) => allowedFor(garment, occasion))
    .sort(rankFor(target));

  const inCategory = (...categories: GarmentCategory[]) =>
    eligible.filter((garment) => categories.includes(garment.category));

  const offsetOf = (category: GarmentCategory) => tuning.offsets[category] ?? 0;

  // Camisa e camiseta disputam a mesma vaga. Qual vem primeiro é decidido pela
  // régua de formalidade, não por uma tabela por ocasião.
  const tops = inCategory('camisa', 'camiseta');
  const bottomCategory: GarmentCategory =
    felt >= SHORTS_THRESHOLD ? 'bermuda' : 'calca';

  const top = pick(tops, variant);
  const bottom = pick(
    inCategory(bottomCategory),
    variant + offsetOf(bottomCategory)
  );
  const shoe = pick(inCategory('calcado'), variant + offsetOf('calcado'));

  // Sem uma das três peças estruturais não existe look. Melhor não recomendar
  // do que recomendar pela metade.
  if (!top || !bottom || !shoe) return undefined;

  const coat =
    felt < COAT_THRESHOLD
      ? pick(inCategory('casaco'), variant + offsetOf('casaco'))
      : undefined;
  const extra = pick(inCategory('acessorio'), variant + 1);

  const garments = [top, bottom, coat, shoe, extra].filter(
    (garment): garment is Garment => garment !== undefined
  );

  const narration = { garments, occasion, weather, felt, adjustments };

  return {
    // O id carrega a composição inteira — ocasião, variante, ajuste e peças. É
    // o que permite o detalhe reconstruir exatamente o mesmo look sem banco
    // nenhum, e o que faz um link direto para um look continuar funcionando.
    id: [
      'l',
      occasion,
      variant,
      adjustmentSegment(adjustments),
      garments.map((garment) => garment.id).join('.'),
    ].join('-'),
    moment: momentFor(occasion, adjustments),
    mood: moodFor(occasion, variant),
    summary: summaryFor(narration),
    rationale: rationaleFor(narration),
    occasion,
    weather,
    garments,
  };
}
