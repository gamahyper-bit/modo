/**
 * A geometria da marca — em dois graus ópticos.
 *
 * O símbolo FRAME é uma moldura de traço fino fechada por um M em serifa. Isso
 * funciona muito bem grande e falha de um jeito específico pequeno: o traço da
 * moldura afina até sumir, e as hastes finas da serifa desaparecem antes dele.
 * Reduzir o mesmo desenho não resolve — a redução **é** o problema.
 *
 * Então há dois desenhos, não um:
 *
 * - `BRAND_DISPLAY` — a marca. Cabeçalho, splash, qualquer lugar em que o
 *   símbolo apareça acima de uns 40 pontos.
 * - `BRAND_COMPACT` — o ícone. Moldura mais grossa, M maior, vão mais largo
 *   para o M não encostar na moldura engordada. É o que vai para o launcher, a
 *   aba do navegador e o cabeçalho do app.
 *
 * As diferenças são **ópticas, não de identidade**: mesmo grid, mesma moldura
 * aberta no mesmo canto, mesmo M em serifa. Alguém olhando os dois lado a lado
 * vê a mesma marca; alguém olhando um de cada vez não percebe que são dois
 * desenhos, que é exatamente o objetivo.
 *
 * Mexeu aqui? `npm run brand` regenera os PNG, e o teste reprova se esquecer.
 */

/** O grid do símbolo. Todas as medidas abaixo vivem dentro dele. */
export const BRAND_GRID = 64;

export type BrandGeometry = {
  /** Distância da moldura até a borda do grid. */
  inset: number;
  /**
   * Onde a moldura se abre, nos dois eixos.
   *
   * Valor **menor** significa vão **maior**: a linha de baixo para antes e a
   * da direita desce menos. O vão precisa acompanhar o corpo do M — moldura
   * mais grossa com M maior no mesmo vão vira colisão, não marca.
   */
  gap: number;
  /** Espessura da moldura. */
  stroke: number;
  /** Centro horizontal do M — o centro do vão, não o do quadro. */
  markX: number;
  markBaseline: number;
  markSize: number;
};

/**
 * A marca, como foi desenhada.
 *
 * O vão vai de (58,30) a (30,58) — largo o bastante para o M ocupá-lo inteiro.
 * Com uma abertura estreita o M encostava nas arestas e o símbolo lia como erro
 * de alinhamento; aqui ele **fecha** a moldura, que é exatamente o conceito:
 * enquadrar para revelar o essencial.
 */
export const BRAND_DISPLAY: BrandGeometry = {
  inset: 6,
  gap: 30,
  stroke: 2.5,
  markX: 44,
  markBaseline: 55,
  markSize: 32,
};

/**
 * O ícone — um ativo próprio, não uma redução.
 *
 * Cada número responde a uma falha concreta em tamanho pequeno:
 *
 * | Ajuste          | Por quê                                                    |
 * | --------------- | ---------------------------------------------------------- |
 * | traço 2,5 → 4   | a 40 px, 2,5 não chega a um pixel e meio: a moldura vira cinza |
 * | M 32 → 35       | a serifa tem contraste alto, e as hastes finas somem antes do traço da moldura |
 * | vão 30 → 26     | moldura mais grossa come o vão pelas pontas quadradas       |
 * | recuo 6 → 5     | o traço mais grosso cresce para fora; o recuo menor devolve a margem |
 * | base 55 → 54,5  | a folga entre o pé do M e a linha de baixo era a primeira a fechar |
 *
 * As folgas dentro do vão saíram de 2,6 / 1,8 / 2,6 para 3,8 / 2,6 / 2,9
 * (esquerda, baixo, direita). Espaço em branco é o que fecha primeiro quando a
 * tinta espalha — abrir folga importa tanto quanto engrossar traço.
 *
 * **O que não muda:** o grid, o canto em que a moldura abre, e o M ser
 * tipografia real. Lado a lado é visivelmente a mesma marca; um de cada vez,
 * ninguém percebe que são dois desenhos.
 */
export const BRAND_COMPACT: BrandGeometry = {
  inset: 5,
  gap: 26,
  stroke: 4,
  markX: 43,
  markBaseline: 54.5,
  markSize: 35,
};

/**
 * Acima disto o símbolo é a marca; abaixo, é o ícone.
 *
 * 40 pontos é onde o traço de `BRAND_DISPLAY` cruza um pixel e meio numa tela
 * de densidade 3 — o ponto em que ele deixa de ser uma linha e vira um tom de
 * cinza.
 */
export const COMPACT_BELOW = 40;

export const geometryFor = (size: number): BrandGeometry =>
  size < COMPACT_BELOW ? BRAND_COMPACT : BRAND_DISPLAY;

/**
 * A moldura, aberta no quadrante inferior direito.
 *
 * Gerada, e não escrita à mão, porque os dois graus precisam ser a mesma forma
 * com medidas diferentes. Dois literais de path seriam duas formas que por
 * acaso se parecem — e que divergiriam no primeiro ajuste.
 */
export const framePathOf = ({ inset, gap }: BrandGeometry): string => {
  const far = BRAND_GRID - inset;

  return `M${gap} ${far} L${inset} ${far} L${inset} ${inset} L${far} ${inset} L${far} ${gap}`;
};
