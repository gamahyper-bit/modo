/**
 * Família de vestuário do Modo — desenhos próprios, no grid 24×24 do FRAME.
 *
 * O Lucide não tem calça, bermuda, casaco nem cabide, e aproximar com "sacola"
 * ou "camisa para tudo" destruiria a leitura das categorias do armário. Estes
 * glifos são parte da identidade, não um remendo.
 *
 * Constantes do grid — respeitadas por todas as peças, para que uma grade mista
 * de categorias leia como um conjunto e não como colagem:
 *
 *   y = 3.0   linha de ombro / cós
 *   y = 21.0  barra
 *   x = 12    eixo de simetria
 *   margem viva de 2px em todos os lados
 */

const SHOULDER_LINE =
  'M8.5 3 L4.2 4.9 L2.5 8.6 L6 10.4 L6 21 L18 21 L18 10.4 L21.5 8.6 L19.8 4.9 L15.5 3';

export const garmentPaths = {
  /** Camiseta: o ombro-base da família, com gola redonda. */
  camiseta: [SHOULDER_LINE, 'M8.5 3 C9.6 5.3 14.4 5.3 15.5 3'],

  /** Camisa: mesmo ombro, com colarinho em V e carcela central. */
  camisa: [SHOULDER_LINE, 'M8.5 3 L12 6.6 L15.5 3', 'M12 6.6 L12 21'],

  /**
   * Casaco: ombro ligeiramente mais largo e frente aberta — as duas lapelas
   * descem separadas, que é o que o distingue da camisa à primeira vista.
   */
  casaco: [
    'M8 3 L3.7 5 L2 8.9 L5.6 10.7 L5.6 21 L18.4 21 L18.4 10.7 L22 8.9 L20.3 5 L16 3',
    'M8 3 L10.7 7.4 L10.7 21',
    'M16 3 L13.3 7.4 L13.3 21',
  ],

  /** Calça: cós na linha de ombro, gancho no eixo, barra na linha de barra. */
  calca: ['M6 3 H18 L18.8 21 H13.2 L12 11 L10.8 21 H5.2 Z', 'M6 6.6 H18'],

  /** Bermuda: mesma cintura, barra recuada — a diferença é só o comprimento. */
  bermuda: ['M6 3 H18 L18.5 15.5 H13.2 L12 10.4 L10.8 15.5 H5.5 Z', 'M6 6.6 H18'],

  /** Calçado: perfil lateral, sola assentada na linha de barra. */
  calcado: [
    'M3 21 V13.4 C3 12.6 3.7 11.9 4.5 11.9 H7.4 L11.8 15.6 H19 C20.1 15.6 21 16.5 21 17.6 V21 Z',
    'M3 18.4 H21',
  ],

  /** Acessório: bolsa de alça — o mesmo vão do cabide, invertido. */
  acessorio: [
    'M6 8.4 H18 L19 21 H5 Z',
    'M9.2 8.4 V6.2 C9.2 4.7 10.4 3.4 12 3.4 C13.6 3.4 14.8 4.7 14.8 6.2 V8.4',
  ],

  /**
   * Cabide: marca do armário vazio. É o único glifo da família que não é uma
   * peça — representa a ausência dela.
   */
  cabide: [
    'M10.2 6.6 C10.2 5.6 11 4.8 12 4.8 C13 4.8 13.8 5.6 13.8 6.6 C13.8 8.2 12 8.2 12 10.2',
    'M12 10.2 L3.6 16.6 C2.9 17.1 3.3 18.4 4.2 18.4 H19.8 C20.7 18.4 21.1 17.1 20.4 16.6 Z',
  ],
} as const;

export type GarmentIconName = keyof typeof garmentPaths;
