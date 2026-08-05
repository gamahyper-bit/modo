import { Children, isValidElement, type ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { staggerStep } from '@/theme';

import { Reveal } from './Reveal';

type StaggerProps = {
  children: ReactNode;
  /** Intervalo entre os filhos. */
  step?: number;
  /** Atraso antes do primeiro filho. */
  initialDelay?: number;
  enabled?: boolean;
  itemStyle?: StyleProp<ViewStyle>;
};

/**
 * Revela os filhos em sequência — usado onde há uma lista curta com hierarquia,
 * como as opções de ajuste do look.
 *
 * Não use em listas longas: acima de ~8 itens a sequência vira espera. Grids do
 * armário revelam em bloco.
 */
export function Stagger({
  children,
  step = staggerStep,
  initialDelay = 0,
  enabled,
  itemStyle,
}: StaggerProps) {
  return (
    <>
      {Children.toArray(children)
        .filter(isValidElement)
        .map((child, index) => (
          <Reveal
            key={child.key ?? index}
            delay={initialDelay + index * step}
            enabled={enabled}
            style={itemStyle}
          >
            {child}
          </Reveal>
        ))}
    </>
  );
}
