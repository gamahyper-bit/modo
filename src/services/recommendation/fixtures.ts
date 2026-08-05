import type { Look } from '@/types/look';
import type { Garment } from '@/types/wardrobe';

/**
 * Armário de demonstração.
 *
 * Peças reais o bastante para julgar a interface: nomes que existem, cores da
 * paleta neutra que o produto assume, e um uniforme para exercitar a regra de
 * exclusão em looks casuais.
 */
const garments = {
  camisaPreta: {
    id: 'g1',
    name: 'Camisa de algodão',
    category: 'camisa',
    color: { name: 'Preto', hex: '#0D0D0D' },
    material: 'Algodão',
    seasons: ['outono', 'inverno'],
    occasions: ['trabalho', 'noite'],
    isUniform: false,
  },
  calcaAreia: {
    id: 'g2',
    name: 'Calça de alfaiataria',
    category: 'calca',
    color: { name: 'Areia', hex: '#E7E2DA' },
    material: 'Lã fria',
    seasons: ['outono', 'inverno', 'primavera'],
    occasions: ['trabalho', 'encontro'],
    isUniform: false,
  },
  tenisBranco: {
    id: 'g3',
    name: 'Tênis de couro',
    category: 'calcado',
    color: { name: 'Branco', hex: '#F7F5F2' },
    material: 'Couro',
    seasons: ['primavera', 'verao', 'outono'],
    occasions: ['casual', 'trabalho', 'encontro'],
    isUniform: false,
  },
  casacoGrafite: {
    id: 'g4',
    name: 'Casaco de lã',
    category: 'casaco',
    color: { name: 'Grafite', hex: '#1A1A1A' },
    material: 'Lã',
    seasons: ['outono', 'inverno'],
    occasions: ['trabalho', 'noite', 'encontro'],
    isUniform: false,
  },
  camisetaAreia: {
    id: 'g5',
    name: 'Camiseta de malha',
    category: 'camiseta',
    color: { name: 'Areia', hex: '#E7E2DA' },
    material: 'Algodão pima',
    seasons: ['primavera', 'verao'],
    occasions: ['casual', 'viagem'],
    isUniform: false,
  },
  calcaPreta: {
    id: 'g6',
    name: 'Calça reta',
    category: 'calca',
    color: { name: 'Preto', hex: '#0D0D0D' },
    material: 'Sarja',
    seasons: ['outono', 'inverno'],
    occasions: ['casual', 'noite'],
    isUniform: false,
  },
  bolsaCouro: {
    id: 'g7',
    name: 'Bolsa de couro',
    category: 'acessorio',
    color: { name: 'Grafite', hex: '#1A1A1A' },
    material: 'Couro',
    seasons: ['primavera', 'verao', 'outono', 'inverno'],
    occasions: ['trabalho', 'viagem'],
    isUniform: false,
  },
} satisfies Record<string, Garment>;

/**
 * Recomendações de demonstração.
 *
 * A `rationale` é a peça mais importante de cada fixture: é ela que prova que o
 * produto explica a escolha em vez de só exibir roupa. Escrita na voz do
 * stylist — afirma, não sugere; justifica com o que está na peça, não com
 * adjetivos soltos.
 */
export const lookFixtures: Look[] = [
  {
    id: 'l1',
    moment: 'Hoje.',
    mood: 'Confiante e contemporâneo.',
    rationale:
      'A camisa preta ancora o look e a alfaiataria em areia abre o contraste sem endurecer. O tênis de couro tira o peso da formalidade — é o que faz a peça de trabalho funcionar depois do expediente.',
    occasion: 'trabalho',
    weather: { temperature: 18, condition: 'nublado' },
    garments: [
      garments.camisaPreta,
      garments.calcaAreia,
      garments.tenisBranco,
      garments.bolsaCouro,
    ],
  },
  {
    id: 'l2',
    moment: 'Hoje.',
    mood: 'Sóbrio, com folga.',
    rationale:
      'Camiseta e calça na mesma família de neutros deixam o casaco de lã ser a única voz. Com 18 graus e céu fechado, a lã resolve a temperatura sem exigir uma segunda camada.',
    occasion: 'casual',
    weather: { temperature: 18, condition: 'nublado' },
    garments: [
      garments.camisetaAreia,
      garments.calcaPreta,
      garments.casacoGrafite,
      garments.tenisBranco,
    ],
  },
  {
    id: 'l3',
    moment: 'Para hoje à noite.',
    mood: 'Discreto e preciso.',
    rationale:
      'Preto sobre preto encurta a silhueta e dispensa acessório. O casaco de lã fecha a composição e é a única peça com textura — de noite, textura substitui cor.',
    occasion: 'noite',
    weather: { temperature: 15, condition: 'frio' },
    garments: [garments.camisaPreta, garments.calcaPreta, garments.casacoGrafite],
  },
];
