/**
 * Sistema de Motion.
 *
 * Toda animação do Modo nasce aqui. Um componente que precise de um movimento
 * novo ganha um preset neste módulo — nunca um `withTiming` avulso no arquivo
 * da tela. É o que mantém o produto com um único ritmo.
 */
export { Reveal } from './Reveal';
export { Stagger } from './Stagger';
export { useReveal } from './useReveal';
export { usePressMotion } from './usePressMotion';
