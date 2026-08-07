import type { Look, LookAdjustment, Weather } from '@/types/look';
import type { Garment, GarmentCategory, Occasion } from '@/types/wardrobe';

import { momentFor, moodFor, rationaleFor, summaryFor } from './copy';
import { lookIdFor } from './lookId';
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
 * Uniforme não se mistura: ou a vaga tem alternativa comum, ou é o uniforme.
 *
 * Uniforme se veste como conjunto. A calça do uniforme com uma camisa comum não
 * é um look, é um acidente — e era exatamente o que acontecia: a peça de
 * uniforme ia para o fim da fila, o que a protegia só na primeira variante.
 * Na segunda, "gerar outro" entregava a polo do trabalho com calça de
 * alfaiataria.
 *
 * Filtrar por vaga, e não ordenar, implementa o que DEC-011 já dizia: essas
 * peças **só** entram quando não há alternativa naquela categoria — que é
 * exatamente quando o usuário de fato vai de uniforme.
 */
const withoutUniform = (list: Garment[]) => {
  const regular = list.filter((garment) => !garment.isUniform);
  return regular.length > 0 ? regular : list;
};

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
    withoutUniform(
      eligible.filter((garment) => categories.includes(garment.category))
    );

  const offsetOf = (category: GarmentCategory) => tuning.offsets[category] ?? 0;

  // Camisa e camiseta disputam a mesma vaga. Qual vem primeiro é decidido pela
  // régua de formalidade, não por uma tabela por ocasião.
  const tops = inCategory('camisa', 'camiseta');
  const bottomCategory: GarmentCategory =
    felt >= SHORTS_THRESHOLD ? 'bermuda' : 'calca';
  const bottoms = inCategory(bottomCategory);
  const shoes = inCategory('calcado');
  const coats = inCategory('casaco');
  const extras = inCategory('acessorio');

  /**
   * A variante, decodificada em um índice por vaga.
   *
   * Antes a mesma variante escolhia a mesma posição em todas as listas, e as
   * peças giravam em bloco: com uma camisa, duas calças e dois calçados, as oito
   * combinações possíveis viravam duas alcançáveis. "Gerar outro" repetia com o
   * armário cheio de alternativas que ele não sabia alcançar.
   *
   * Aqui a variante é lida como um número em base mista — cada vaga consome o
   * seu dígito. Percorrer as variantes passa a percorrer o **produto** das
   * listas, e não o mínimo múltiplo comum delas.
   *
   * A ordem do consumo decide o que muda primeiro: a parte de cima gira mais
   * rápido porque é a que mais muda a leitura do look. E todas as cinco vagas
   * consomem, mesmo a do casaco num dia quente — assim a mesma variante
   * significa a mesma coisa independentemente do clima.
   */
  let remaining = variant;
  const indexIn = (list: Garment[]) => {
    if (list.length <= 1) return 0;

    const index = remaining % list.length;
    remaining = Math.floor(remaining / list.length);
    return index;
  };

  const topIndex = indexIn(tops);
  const bottomIndex = indexIn(bottoms);
  const shoeIndex = indexIn(shoes);
  const coatIndex = indexIn(coats);
  const extraIndex = indexIn(extras);

  const top = pick(tops, topIndex);
  const bottom = pick(bottoms, bottomIndex + offsetOf(bottomCategory));
  const shoe = pick(shoes, shoeIndex + offsetOf('calcado'));

  // Sem uma das três peças estruturais não existe look. Melhor não recomendar
  // do que recomendar pela metade.
  if (!top || !bottom || !shoe) return undefined;

  const coat =
    felt < COAT_THRESHOLD ? pick(coats, coatIndex + offsetOf('casaco')) : undefined;
  const extra = pick(extras, extraIndex);

  const garments = [top, bottom, coat, shoe, extra].filter(
    (garment): garment is Garment => garment !== undefined
  );

  const narration = { garments, occasion, weather, felt, adjustments };

  return {
    id: lookIdFor({ occasion, variant, adjustments }, garments),
    moment: momentFor(occasion, adjustments),
    mood: moodFor(occasion, variant),
    summary: summaryFor(narration),
    rationale: rationaleFor(narration),
    occasion,
    weather,
    garments,
  };
}
