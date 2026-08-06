/**
 * A geometria da marca.
 *
 * Fonte única do símbolo FRAME. O componente `Logo` desenha a partir daqui, e o
 * script que gera ícone, splash e favicon lê exatamente as mesmas constantes —
 * é o que impede o ícone da tela inicial de virar uma versão desatualizada da
 * marca sem ninguém perceber.
 *
 * Se algum número aqui mudar, `npm run brand` regenera tudo.
 */

/** O grid do símbolo. Todas as medidas abaixo vivem dentro dele. */
export const BRAND_GRID = 64;

/**
 * A moldura, aberta no quadrante inferior direito.
 *
 * O vão vai de (58,30) a (30,58) — largo o bastante para o M ocupá-lo inteiro.
 * Com uma abertura estreita o M encostava nas arestas e o símbolo lia como erro
 * de alinhamento; aqui ele **fecha** a moldura, que é exatamente o conceito:
 * enquadrar para revelar o essencial.
 */
export const FRAME_PATH = 'M30 58 L6 58 L6 6 L58 6 L58 30';

/** No grid de 64. Acompanha a escala, como na família de ícones. */
export const FRAME_STROKE = 2.5;

/** Centro do vão. O M é posicionado nele, não no centro do quadro. */
export const MARK_X = 44;
export const MARK_BASELINE = 55;
export const MARK_SIZE = 32;
