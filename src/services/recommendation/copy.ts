import type { LookAdjustment, Weather } from '@/types/look';
import type { Garment, GarmentCategory, Occasion } from '@/types/wardrobe';

/**
 * A fala do stylist.
 *
 * Templates, e assume-se que sejam: é o texto que o Gemini vai escrever quando
 * a Edge Function existir. Enquanto isso, precisam sustentar a ilusão — falar
 * do dia do usuário, não da composição, e nunca soar como etiqueta de vitrine.
 *
 * Este arquivo inteiro desaparece quando a camada de IA entrar.
 */

/** Tudo que o texto precisa saber sobre o look que acabou de ser montado. */
export type Narration = {
  garments: Garment[];
  occasion: Occasion;
  weather: Weather;
  /** A temperatura com que o motor decidiu — difere da real sob ajuste. */
  felt: number;
  adjustments: LookAdjustment[];
};

/** Só o palpite de último caso, quando a peça chega sem nome. */
const CATEGORY_ARTICLES: Record<GarmentCategory, string> = {
  camisa: 'a',
  camiseta: 'a',
  calca: 'a',
  bermuda: 'a',
  casaco: 'o',
  calcado: 'o',
  acessorio: 'o',
};

/**
 * O artigo da peça — decidido pelo nome, não pela categoria.
 *
 * "Bota de camurça" e "tênis de couro" são os dois `calcado`, e a categoria não
 * sabe que um é feminino e o outro não. Enquanto o motor escolhia sempre o
 * tênis o erro ficou escondido; a régua de formalidade passou a alcançar a
 * bota e produziu "o bota de camurça" — exatamente o tipo de frase que denuncia
 * texto de máquina e derruba a ilusão do stylist.
 *
 * A regra é a do português: substantivo terminado em -a é feminino, e o gênero
 * está no núcleo do nome ("camisa polo", "óculos de sol"). Erra em exceções
 * raras — "echarpe" — e acerta em tudo que um armário costuma ter.
 */
const articleFor = (garment: Garment) => {
  const head = garment.name.trim().split(/\s+/)[0];
  if (!head) return CATEGORY_ARTICLES[garment.category];

  return head.toLowerCase().endsWith('a') ? 'a' : 'o';
};

/** Concorda o adjetivo com a peça: "dá conta sozinha" / "sozinho". */
const agreeing = (garment: Garment, stem: string) =>
  `${stem}${articleFor(garment) === 'a' ? 'a' : 'o'}`;

const lower = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

const capitalize = (text: string) => text.replace(/^./, (c) => c.toUpperCase());

/** "a camisa de algodão" — artigo pelo nome, nome em caixa baixa. */
export const describe = (garment: Garment) =>
  `${articleFor(garment)} ${lower(garment.name)}`;

/**
 * "pela camisa de algodão" — a contração de `por` com o artigo.
 *
 * Existe porque juntar preposição e artigo à mão produz "Comecei a camisa",
 * que é exatamente o tipo de erro que denuncia texto gerado por máquina.
 */
export const describeBy = (garment: Garment) =>
  `${articleFor(garment) === 'a' ? 'pela' : 'pelo'} ${lower(garment.name)}`;

/**
 * A resposta ao ajuste, no lugar da abertura editorial.
 *
 * Quando o usuário pede alguma coisa, a primeira linha do look deixa de ser
 * "Hoje." e passa a ser a confirmação de que o pedido chegou. É a parte mais
 * barata e mais importante do ajuste: mesmo nos armários pequenos, onde o
 * motor conclui que o look continua sendo o melhor, o usuário vê que foi
 * ouvido — e vê pelo mesmo canal por onde o resto do produto fala.
 */
const ACKNOWLEDGEMENTS: Record<LookAdjustment, string> = {
  'mais-elegante': 'Mais elegante.',
  'mais-casual': 'Mais leve.',
  'esta-frio': 'Para o frio.',
  'esta-calor': 'Para o calor.',
  'outra-calca': 'Outra calça.',
  'outro-calcado': 'Outro calçado.',
};

export const momentFor = (
  occasion: Occasion,
  adjustments: LookAdjustment[] = []
): string => {
  const last = adjustments[adjustments.length - 1];
  if (last) return ACKNOWLEDGEMENTS[last];

  return occasion === 'noite' ? 'Para hoje à noite.' : 'Hoje.';
};

const MOODS: Record<Occasion, string[]> = {
  trabalho: [
    'Confiante e contemporâneo.',
    'Preciso, sem esforço aparente.',
    'Sério na medida.',
  ],
  casual: ['Sóbrio, com folga.', 'Leve e resolvido.', 'Simples de propósito.'],
  noite: ['Discreto e preciso.', 'Contido, com presença.', 'Escuro e certeiro.'],
  encontro: [
    'Próximo, sem tentar demais.',
    'Cuidado que não se anuncia.',
    'Elegante e desarmado.',
  ],
  viagem: [
    'Prático sem parecer.',
    'Pronto para o dia inteiro.',
    'Leve de propósito.',
  ],
};

export const moodFor = (occasion: Occasion, variant: number): string => {
  const options = MOODS[occasion];
  return options[variant % options.length] ?? options[0]!;
};

/**
 * A abertura: começa pela peça que decidiu o look.
 *
 * Uma oração, uma vírgula, ponto. O stylist fala como quem já decidiu — quem
 * está decidindo é que precisa de subordinadas.
 */
export const openingFor = (anchor: Garment, occasion: Occasion): string => {
  const openings: Record<Occasion, string> = {
    trabalho: `Comecei ${describeBy(anchor)}: resolve o dia sem pedir atenção.`,
    casual: `Comecei ${describeBy(anchor)} — é o que você veste sem pensar.`,
    noite: `Comecei ${describeBy(anchor)}: à noite, menos peça é mais presença.`,
    encontro: `Comecei ${describeBy(anchor)}: você esquece que está bem vestido.`,
    viagem: `Comecei ${describeBy(anchor)} — aguenta o dia inteiro fora de casa.`,
  };

  return openings[occasion];
};

/**
 * O que o ajuste fez, dito por quem fez.
 *
 * Cada frase descreve o **critério aplicado**, nunca o resultado obtido — o
 * motor não compara com o look anterior, então dizer "troquei a bota pelo
 * tênis" seria uma afirmação que ninguém verificou. Descrever o critério é
 * verdade em todos os casos, inclusive no armário pequeno onde a melhor
 * resposta continua sendo a mesma peça.
 *
 * A frase do clima é a que mais trabalha: ela é o único lugar onde o usuário
 * descobre por que o look mudou enquanto o termômetro na tela continua igual.
 */
const noteFor = (adjustment: LookAdjustment, narration: Narration): string => {
  const { weather, felt } = narration;

  switch (adjustment) {
    case 'mais-elegante':
      return 'Subi o tom com o que você tem de mais formal.';
    case 'mais-casual':
      return 'Tirei o peso, mantive o cuidado.';
    case 'esta-frio':
    case 'esta-calor':
      return `Montei para ${felt} graus, não para os ${weather.temperature} do termômetro.`;
    case 'outra-calca':
      return 'Troquei só a calça. O resto já estava certo.';
    case 'outro-calcado':
      return 'Troquei só o calçado. O resto já estava certo.';
  }
};

const lastNoteOf = (narration: Narration): string | undefined => {
  const last = narration.adjustments[narration.adjustments.length - 1];
  return last ? noteFor(last, narration) : undefined;
};

/**
 * A frase da Home — uma só, inteira, nunca truncada.
 *
 * Quando há ajuste, ela **é** a resposta ao ajuste. É a única linha de texto
 * que a Home mostra, e depois de o usuário pedir alguma coisa, explicar o que
 * foi feito com o pedido vale mais do que reapresentar a peça âncora. A
 * abertura não se perde: continua abrindo a nota completa no detalhe.
 */
export const summaryFor = (narration: Narration): string => {
  const note = lastNoteOf(narration);
  if (note) return note;

  const [anchor] = narration.garments;
  return anchor ? openingFor(anchor, narration.occasion) : '';
};

/** A nota completa do detalhe: peça âncora, o resto do conjunto e o clima. */
export const rationaleFor = (narration: Narration): string => {
  const { garments, occasion, weather } = narration;
  const [anchor, ...rest] = garments;
  if (!anchor) return '';

  const bottom = rest.find(
    (g) => g.category === 'calca' || g.category === 'bermuda'
  );
  const shoes = rest.find((g) => g.category === 'calcado');
  const coat = rest.find((g) => g.category === 'casaco');

  const parts = [openingFor(anchor, occasion)];

  if (bottom) {
    parts.push(
      bottom.color.name === anchor.color.name
        ? `Mantive ${describe(bottom)} no mesmo tom — ninguém repara na roupa, repara em você.`
        : `${capitalize(describe(bottom))} em ${bottom.color.name.toLowerCase()} clareia o conjunto.`
    );
  }

  if (coat) {
    parts.push(
      `Com ${weather.temperature} graus, ${describe(coat)} dá conta ${agreeing(coat, 'sozinh')}.`
    );
  }

  if (shoes) {
    parts.push(`${capitalize(describe(shoes))} fecha sem endurecer a barra.`);
  }

  // O ajuste fecha a nota: o usuário lê a recomendação e, no fim, o que o
  // pedido dele mudou nela.
  const note = lastNoteOf(narration);
  if (note) parts.push(note);

  return parts.join(' ');
};
