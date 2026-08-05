/**
 * Tipografia FRAME: serifa editorial para revelar, sans para operar.
 *
 * O guia de marca especifica *PP Editorial New* no display. É uma fonte
 * comercial (Pangram Pangram) e não pode ser embarcada sem licença paga, então
 * o display aponta para Instrument Serif (SIL OFL), de caráter equivalente.
 * Ao adquirir a licença, troque apenas `fontFamily.display`.
 */
export const fontFamily = {
  display: 'InstrumentSerif_400Regular',
  displayItalic: 'InstrumentSerif_400Regular_Italic',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemiBold: 'Inter_600SemiBold',
} as const;

/**
 * Escala tipográfica. Poucos degraus, bem separados: hierarquia se faz com
 * salto, não com nuance.
 */
export const typography = {
  /** Splash e aberturas de onboarding. */
  displayLarge: {
    fontFamily: fontFamily.display,
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -0.6,
  },
  /** Saudação da Home, títulos de tela. */
  display: {
    fontFamily: fontFamily.display,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.4,
  },
  /** Nome do look, título de seção editorial. */
  title: {
    fontFamily: fontFamily.display,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  /** Cabeçalho de card, nome de peça. */
  headline: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  /** Texto corrente: explicações do stylist. */
  body: {
    fontFamily: fontFamily.sans,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: fontFamily.sans,
    fontSize: 13,
    lineHeight: 19,
    letterSpacing: 0,
  },
  /** Rótulos de seção em caixa alta — "INFORMAÇÕES", "PEÇAS DO LOOK". */
  label: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  /** Metadados discretos: contagem de itens, data, temperatura. */
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  /** Texto de botão. */
  action: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0,
  },
} as const;

export type TypographyToken = keyof typeof typography;
