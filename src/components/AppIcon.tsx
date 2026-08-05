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

export type AppIconName = keyof typeof registry;

type AppIconProps = {
  name: AppIconName;
  /** Token da escala, ou um número quando o contexto exigir. */
  size?: IconSizeToken | number;
  /** Padrão: a cor do texto secundário. */
  color?: string;
  strokeWidth?: number;
};

export function AppIcon({
  name,
  size = 'lg',
  color = colors.textSecondary,
  strokeWidth = iconStroke,
}: AppIconProps) {
  const Glyph = registry[name];
  const resolvedSize = typeof size === 'number' ? size : iconSize[size];

  return <Glyph size={resolvedSize} color={color} strokeWidth={strokeWidth} />;
}
