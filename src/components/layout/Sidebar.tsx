import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  AlertCircle,
  FileBarChart,
  FolderOpen,
  Settings,
  RefreshCw,
  Users,
  Cog,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Licenças', path: '/licencas' },
  { icon: ClipboardList, label: 'Condicionantes', path: '/condicionantes' },
  { icon: RefreshCw, label: 'Regularização', path: '/regularizacao' },
  { icon: AlertCircle, label: 'Alertas', path: '/alertas' },
];

const secondaryItems = [
  { icon: FileBarChart, label: 'Relatórios', path: '/relatorios' },
  { icon: FolderOpen, label: 'Documentos', path: '/documentos' },
];

const configItems = [
  { icon: Cog, label: 'Sistema', path: '/configuracoes' },
  { icon: Users, label: 'Usuários', path: '/configuracoes/usuarios' },
];

export function Sidebar() {
  const location = useLocation();

  const NavItem = ({
    item,
  }: {
    item: { icon: typeof LayoutDashboard; label: string; path: string };
  }) => {
    const isActive =
      location.pathname === item.path ||
      (item.path !== '/' && location.pathname.startsWith(item.path));
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        className={cn(
          'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-emerald-50 text-emerald-600'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        <Icon className="w-5 h-5" />
        <span>{item.label}</span>
      </NavLink>
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">GLA</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        {/* Menu Principal */}
        <div className="mb-6">
          <span className="px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Menu Principal
          </span>
          <div className="mt-3 space-y-1">
            {menuItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>
        </div>

        {/* Documentação */}
        <div className="mb-6">
          <span className="px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Documentação
          </span>
          <div className="mt-3 space-y-1">
            {secondaryItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>
        </div>

        {/* Configurações */}
        <div>
          <span className="px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Configurações
          </span>
          <div className="mt-3 space-y-1">
            {configItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">
              JA
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              João Albuquerque
            </p>
            <p className="text-xs text-gray-500 truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
