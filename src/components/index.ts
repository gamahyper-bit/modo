/**
 * Design system do Modo.
 *
 * Regra da camada: estes componentes não conhecem regra de negócio, não fazem
 * requisição e não importam nada de `features/`. Recebem dados e devolvem
 * interface.
 *
 * Estilo é `StyleSheet` alimentado por `@/theme` — nunca valor solto, nunca
 * classe do NativeWind aqui dentro. Classes utilitárias ficam para o layout das
 * telas; um componente de biblioteca precisa que o erro apareça na compilação,
 * não em runtime.
 */
export { AppIcon } from './AppIcon';
export type { AppIconName } from './AppIcon';

export { Avatar } from './Avatar';
export { Badge } from './Badge';
export type { BadgeTone } from './Badge';
export { BottomNavigation, NAV_ITEMS } from './BottomNavigation';
export type { NavItem } from './BottomNavigation';
export { BottomSheet } from './BottomSheet';
export { Button } from './Button';
export type { ButtonSize, ButtonVariant } from './Button';
export { Card } from './Card';
export { Chip } from './Chip';
export { ClothingCard } from './ClothingCard';
export type {
  ClothingCardSelection,
  ClothingCardSlots,
  ClothingCardVariant,
} from './ClothingCard';
export { EmptyState } from './EmptyState';
export { FieldRow } from './FieldRow';
export { IconButton } from './IconButton';
export type { IconButtonVariant } from './IconButton';
export { Input } from './Input';
export { Loading } from './Loading';
export { Logo } from './Logo';
export { LookCard } from './LookCard';
export type { LookCardLayout } from './LookCard';
export { Modal } from './Modal';
export { Search } from './Search';
export { Skeleton } from './Skeleton';
export { Text } from './Text';
export type { TextTone } from './Text';

export { Reveal, Stagger } from './motion';
