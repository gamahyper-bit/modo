/**
 * Paleta FRAME.
 *
 * Cinco valores, e só. O contraste cria hierarquia, o espaço cria respiro.
 * Nenhuma cor de destaque: a roupa é o único elemento colorido da tela.
 */
export const palette = {
  ink: '#0D0D0D',
  graphite: '#1A1A1A',
  gray: '#6B6B6B',
  sand: '#E7E2DA',
  canvas: '#F7F5F2',
  surface: '#FFFFFF',

  /**
   * Sálvia — a cor de assinatura.
   *
   * Não é cor de marca nem de botão: aparece só em sinais de sistema (foco,
   * seleção, confirmação, carga). Verde dessaturado porque a base do Modo é
   * quente; um azul petróleo seria frio e brigaria com a areia em vez de
   * assentar nela.
   *
   * Escuro o suficiente para sobreviver como traço fino sobre o off-white.
   */
  sage: '#5E6B57',
} as const;

/**
 * Nomes semânticos. A interface consome estes, nunca a paleta crua —
 * assim um ajuste de marca não vira uma varredura de busca e substituição.
 */
export const colors = {
  background: palette.canvas,
  surface: palette.surface,
  surfaceMuted: palette.sand,

  border: palette.sand,
  borderStrong: palette.gray,

  textPrimary: palette.ink,
  textSecondary: palette.gray,
  textInverse: palette.canvas,

  /** Ações primárias e superfícies invertidas. */
  accent: palette.ink,
  onAccent: palette.canvas,

  /**
   * Assinatura. Reservada a quatro usos: foco de campo, item selecionado,
   * confirmação e indicador de carga. Nunca em botão, texto corrido ou fundo —
   * ela deve ser notada sem ser percebida.
   */
  signature: palette.sage,
  onSignature: palette.canvas,

  overlay: 'rgba(13, 13, 13, 0.32)',
  /** Fundo das peças recortadas — o recorte é transparente, o palco é neutro. */
  garmentStage: palette.surface,
} as const;

export type PaletteToken = keyof typeof palette;
export type ColorToken = keyof typeof colors;
