import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  AlertCircle,
  FileBarChart,
  FolderOpen,
  RefreshCw,
  Users,
  Cog,
  Plus,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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

const footerLinks = [
  'Legal',
  'Segurança',
  'Privacidade',
  'Cookies',
  'Sobre',
  'Acessibilidade',
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
          'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
        )}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="truncate">{item.label}</span>
      </NavLink>
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-black flex flex-col">
      {/* Library Header */}
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white">GLA</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Card */}
      <div className="mx-2 mb-2 bg-sidebar-accent/50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-sidebar-foreground">
            Menu Principal
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <nav className="space-y-0.5">
          {menuItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>
      </div>

      {/* Secondary Navigation Card */}
      <div className="mx-2 mb-2 bg-sidebar-accent/50 rounded-lg p-3 flex-1 overflow-y-auto scrollbar-thin">
        <div className="mb-3">
          <span className="text-sm font-semibold text-sidebar-foreground">
            Documentação
          </span>
        </div>
        <nav className="space-y-0.5 mb-6">
          {secondaryItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* CTA Card */}
        <div className="bg-sidebar-accent rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-sidebar-foreground mb-1">
            Crie sua primeira licença
          </h4>
          <p className="text-xs text-sidebar-foreground/60 mb-3">
            É fácil, vamos te ajudar.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="text-xs font-semibold bg-white text-black hover:bg-white/90 rounded-full px-4"
          >
            Criar licença
          </Button>
        </div>

        {/* Secondary CTA */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-sidebar-foreground mb-1">
            Que tal revisar as condicionantes?
          </h4>
        </div>

        {/* Settings Links */}
        <nav className="space-y-0.5">
          <NavLink
            to="/configuracoes"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
              location.pathname === '/configuracoes'
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
            )}
          >
            <Cog className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Configurações</span>
          </NavLink>
          <NavLink
            to="/configuracoes/usuarios"
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
              location.pathname === '/configuracoes/usuarios'
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
            )}
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Usuários</span>
          </NavLink>
        </nav>
      </div>

      {/* Footer Links */}
      <div className="p-4 pt-2">
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[11px] text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Language Selector */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-sidebar-foreground/30 text-sidebar-foreground text-xs gap-2 hover:border-sidebar-foreground hover:bg-transparent"
        >
          <Globe className="w-4 h-4" />
          Português do Brasil
        </Button>
      </div>
    </aside>
  );
}
