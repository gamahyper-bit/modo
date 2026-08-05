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
 * produto explica a escolha em vez de só exibir roupa.
 *
 * Voz: **um stylist falando do seu dia, não da composição.** Fala na primeira
 * pessoa, começa pela peça que decidiu o look e justifica pelo que ela resolve
 * na sua vida — não por vocabulário de moda. "Ancora o look", "abre o
 * contraste" e "quebra a formalidade" são laudo técnico: o usuário não sabe o
 * que fazer com isso.
 *
 * Regra prática: se a frase caberia numa etiqueta de vitrine, reescreva.
 */
export const lookFixtures: Look[] = [
  {
    id: 'l1',
    moment: 'Hoje.',
    mood: 'Confiante e contemporâneo.',
    summary:
      'Comecei pela camisa preta: ela aguenta o dia inteiro sem marcar nada.',
    rationale:
      'Comecei pela camisa preta: ela aguenta o dia inteiro sem marcar nada. A calça em areia clareia o conjunto e faz o preto parecer escolha, não uniforme. O tênis de couro é o que te deixa sair do trabalho e ir jantar sem passar em casa.',
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
    summary:
      'Deixei camiseta e calça discretas de propósito, para o casaco ser a única coisa que se nota.',
    rationale:
      'Deixei camiseta e calça bem discretas de propósito, para o casaco ser a única coisa que se nota. Com 18 graus e o céu fechado, a lã dá conta sozinha — você não vai precisar carregar mais nada.',
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
    summary: 'Preto inteiro resolve a noite sem exigir nenhum acessório.',
    rationale:
      'Preto inteiro resolve a noite sem exigir nenhum acessório — menos coisa para pensar antes de sair. O casaco é a única peça com textura, e à noite é isso que aparece, não a cor.',
    occasion: 'noite',
    weather: { temperature: 15, condition: 'frio' },
    garments: [garments.camisaPreta, garments.calcaPreta, garments.casacoGrafite],
  },
];
