import {
  FadeIn,
  FadeOut,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';

import { duration, easing, staggerStep } from '@/theme';

/**
 * Transições de layout — a gramática da curadoria.
 *
 * Quando uma recomendação é substituída, as peças que continuam no look
 * **deslizam** para a nova posição em vez de sumir e voltar. É a diferença
 * entre um stylist reorganizando a arara e um sistema recarregando uma lista:
 * o movimento comunica que houve escolha, não recarga.
 *
 * Para isso funcionar, cada peça precisa ser identificada pelo id da peça
 * (`key={garment.id}`) e não pelo índice. Com índice o Reanimated entende que
 * o item continua o mesmo e nada se move.
 */

/** A peça que permanece: desliza até o novo lugar. */
export const pieceLayout = LinearTransition.duration(duration.base)
  .easing(easing.reveal.factory())
  .reduceMotion(ReduceMotion.System);

/** A peça que entra: aparece já no lugar, escalonada pela posição. */
export const pieceEnter = (index: number) =>
  FadeIn.duration(duration.base)
    .delay(index * staggerStep)
    .reduceMotion(ReduceMotion.System);

/**
 * A peça que sai: some rápido e sem deslocamento.
 *
 * Curto de propósito — a saída não pode disputar atenção com a entrada, senão
 * a troca parece confusa em vez de deliberada.
 */
export const pieceExit = FadeOut.duration(duration.fast).reduceMotion(
  ReduceMotion.System
);
