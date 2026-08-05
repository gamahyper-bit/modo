import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bookmark,
  Calendar,
  Camera,
  ChartNoAxesColumn,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleQuestionMark,
  CloudRain,
  Ellipsis,
  Heart,
  House,
  Image as ImageIcon,
  LayoutGrid,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shirt,
  SlidersHorizontal,
  Snowflake,
  Sun,
  Trash2,
  User,
  X,
} from 'lucide-react-native';

import { colors, iconSize, iconStroke, type IconSizeToken } from '@/theme';

import { FrameGlyph } from './icons/FrameGlyph';
import { garmentPaths, type GarmentIconName } from './icons/garmentPaths';

/**
 * Vocabulário de ícones do produto.
 *
 * A interface pede `name="armario"`, não `<Shirt />`. Trocar de biblioteca de
 * ícones — ou substituir um desenho — passa a ser uma alteração neste arquivo,
 * e em nenhum outro.
 */
const registry = {
  // Navegação
  home: House,
  armario: Shirt,
  looks: Heart,
  perfil: User,

  // Ações
  adicionar: Plus,
  buscar: Search,
  filtrar: SlidersHorizontal,
  fechar: X,
  confirmar: Check,
  voltar: ChevronLeft,
  avancar: ChevronRight,
  expandir: ChevronDown,
  anterior: ArrowLeft,
  proximo: ArrowRight,
  mais: Ellipsis,
  gerarOutro: RefreshCw,
  salvar: Bookmark,
  editar: Pencil,
  excluir: Trash2,

  // Captura
  camera: Camera,
  galeria: ImageIcon,

  // Contexto
  grade: LayoutGrid,
  calendario: Calendar,
  estatisticas: ChartNoAxesColumn,
  notificacoes: Bell,
  configuracoes: Settings,
  ajuda: CircleQuestionMark,
  sair: LogOut,

  // Clima
  calor: Sun,
  frio: Snowflake,
  chuva: CloudRain,
} as const;

export type AppIconName = keyof typeof registry | GarmentIconName;

type AppIconProps = {
  name: AppIconName;
  /** Token da escala, ou um número quando o contexto exigir. */
  size?: IconSizeToken | number;
  /** Padrão: a cor do texto secundário. */
  color?: string;
  strokeWidth?: number;
};

const isGarment = (name: AppIconName): name is GarmentIconName =>
  name in garmentPaths;

export function AppIcon({
  name,
  size = 'lg',
  color = colors.textSecondary,
  strokeWidth = iconStroke,
}: AppIconProps) {
  const resolvedSize = typeof size === 'number' ? size : iconSize[size];

  // As duas famílias convivem sob um único nome: a tela não sabe — nem precisa
  // saber — qual glifo é desenho nosso e qual vem do Lucide.
  if (isGarment(name)) {
    return (
      <FrameGlyph
        paths={garmentPaths[name]}
        size={resolvedSize}
        color={color}
        strokeWidth={strokeWidth}
      />
    );
  }

  const Glyph = registry[name];

  return <Glyph size={resolvedSize} color={color} strokeWidth={strokeWidth} />;
}
