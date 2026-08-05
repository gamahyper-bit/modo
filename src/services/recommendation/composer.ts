import type { Look, Weather } from '@/types/look';
import type { Garment, GarmentCategory, Occasion } from '@/types/wardrobe';

import { momentFor, moodFor, rationaleFor, summaryFor } from './copy';

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
};

const pick = <T>(options: T[], variant: number): T | undefined =>
  options.length === 0 ? undefined : options[variant % options.length];

/**
 * Filtra por categoria **respeitando a ordem pedida**.
 *
 * A ordem dos argumentos é prioridade de estilo, não conveniência: pedir
 * `('camisa', 'camiseta')` significa que camisa vem antes na fila de escolha.
 */
const byCategory = (list: Garment[], ...categories: GarmentCategory[]) =>
  categories.flatMap((category) =>
    list.filter((garment) => garment.category === category)
  );

/**
 * Que parte de cima o stylist alcança primeiro.
 *
 * Para trabalho, noite e encontro, camisa antes de camiseta — é regra de
 * vestir, não preferência do código. No casual e na viagem, o inverso.
 */
const TOP_PRIORITY: Record<Occasion, GarmentCategory[]> = {
  trabalho: ['camisa', 'camiseta'],
  noite: ['camisa', 'camiseta'],
  encontro: ['camisa', 'camiseta'],
  casual: ['camiseta', 'camisa'],
  viagem: ['camiseta', 'camisa'],
};

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

export function composeLook({
  wardrobe,
  occasion,
  weather,
  variant,
}: ComposeInput): Look | undefined {
  const eligible = wardrobe
    .filter((garment) => allowedFor(garment, occasion))
    // Uniforme por último, mesmo onde é permitido.
    //
    // Uniforme se veste como conjunto: a calça do uniforme com uma camisa
    // comum não é um look, é um acidente. Deixando essas peças no fim da fila,
    // elas só entram quando não há alternativa — que é exatamente quando o
    // usuário de fato vai de uniforme.
    .sort((a, b) => Number(a.isUniform) - Number(b.isUniform));

  const tops = byCategory(eligible, ...TOP_PRIORITY[occasion]);
  const bottoms = byCategory(
    eligible,
    weather.temperature >= SHORTS_THRESHOLD ? 'bermuda' : 'calca'
  );
  const shoes = byCategory(eligible, 'calcado');
  const coats = byCategory(eligible, 'casaco');
  const extras = byCategory(eligible, 'acessorio');

  const top = pick(tops, variant);
  const bottom = pick(bottoms, variant);
  const shoe = pick(shoes, variant);

  // Sem uma das três peças estruturais não existe look. Melhor não recomendar
  // do que recomendar pela metade.
  if (!top || !bottom || !shoe) return undefined;

  const coat =
    weather.temperature < COAT_THRESHOLD ? pick(coats, variant) : undefined;
  const extra = pick(extras, variant + 1);

  const garments = [top, bottom, coat, shoe, extra].filter(
    (garment): garment is Garment => garment !== undefined
  );

  return {
    // O id carrega a composição inteira — ocasião, variante e peças. É o que
    // permite o detalhe reconstruir exatamente o mesmo look sem banco nenhum,
    // e o que faz um link direto para um look continuar funcionando.
    id: `l-${occasion}-${variant}-${garments.map((g) => g.id).join('.')}`,
    moment: momentFor(occasion),
    mood: moodFor(occasion, variant),
    summary: summaryFor(top, occasion),
    rationale: rationaleFor(garments, occasion, weather),
    occasion,
    weather,
    garments,
  };
}
