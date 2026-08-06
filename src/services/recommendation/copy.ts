import type { Weather } from '@/types/look';
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

const ARTICLES: Record<GarmentCategory, string> = {
  camisa: 'a',
  camiseta: 'a',
  calca: 'a',
  bermuda: 'a',
  casaco: 'o',
  calcado: 'o',
  acessorio: 'o',
};

const lower = (name: string) => name.charAt(0).toLowerCase() + name.slice(1);

/** "a camisa de algodão" — artigo pela categoria, nome em caixa baixa. */
export const describe = (garment: Garment) =>
  `${ARTICLES[garment.category]} ${lower(garment.name)}`;

/**
 * "pela camisa de algodão" — a contração de `por` com o artigo.
 *
 * Existe porque juntar preposição e artigo à mão produz "Comecei a camisa",
 * que é exatamente o tipo de erro que denuncia texto gerado por máquina.
 */
export const describeBy = (garment: Garment) =>
  `${ARTICLES[garment.category] === 'a' ? 'pela' : 'pelo'} ${lower(garment.name)}`;

export const momentFor = (occasion: Occasion): string =>
  occasion === 'noite' ? 'Para hoje à noite.' : 'Hoje.';

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

/** A frase da Home: começa pela peça que decidiu o look. */
export const summaryFor = (anchor: Garment, occasion: Occasion): string => {
  const openings: Record<Occasion, string> = {
    trabalho: `Comecei ${describeBy(anchor)}: ela resolve o dia sem pedir atenção.`,
    casual: `Comecei ${describeBy(anchor)}, que é o que você veste sem pensar.`,
    noite: `Comecei ${describeBy(anchor)}: à noite, menos peça é mais presença.`,
    encontro: `Comecei ${describeBy(anchor)} — confortável o bastante para você esquecer que está bem vestido.`,
    viagem: `Comecei ${describeBy(anchor)}, que aguenta o dia inteiro fora de casa.`,
  };

  return openings[occasion];
};

/** A nota completa do detalhe: peça âncora, o resto do conjunto e o clima. */
export const rationaleFor = (
  garments: Garment[],
  occasion: Occasion,
  weather: Weather
): string => {
  const [anchor, ...rest] = garments;
  if (!anchor) return '';

  const bottom = rest.find(
    (g) => g.category === 'calca' || g.category === 'bermuda'
  );
  const shoes = rest.find((g) => g.category === 'calcado');
  const coat = rest.find((g) => g.category === 'casaco');

  const parts = [summaryFor(anchor, occasion)];

  if (bottom) {
    parts.push(
      bottom.color.name === anchor.color.name
        ? `Mantive ${describe(bottom)} no mesmo tom: quando tudo conversa, ninguém repara na roupa e sim em você.`
        : `${describe(bottom).replace(/^./, (c) => c.toUpperCase())} em ${bottom.color.name.toLowerCase()} clareia o conjunto e evita que o look pese.`
    );
  }

  if (coat) {
    parts.push(
      `Com ${weather.temperature} graus, ${describe(coat)} dá conta sozinho — você não vai precisar carregar mais nada.`
    );
  }

  if (shoes) {
    parts.push(
      `${describe(shoes).replace(/^./, (c) => c.toUpperCase())} fecha tudo sem endurecer a barra da calça.`
    );
  }

  return parts.join(' ');
};
