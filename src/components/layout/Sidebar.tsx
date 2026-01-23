import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Shield,
  BarChart3,
  FolderOpen,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
  LogOut,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/licencas', icon: FileText, label: 'Licenças' },
  { path: '/condicionantes', icon: ClipboardList, label: 'Condicionantes' },
  { path: '/regularizacao', icon: Shield, label: 'Regularização' },
  { path: '/relatorios', icon: BarChart3, label: 'Relatórios' },
  { path: '/documentos', icon: FolderOpen, label: 'Documentos' },
  { path: '/alertas', icon: Bell, label: 'Alertas' },
];

const bottomItems = [
  { path: '/configuracoes', icon: Settings, label: 'Configurações' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-20 px-5 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sidebar-primary to-accent">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-base font-bold text-sidebar-foreground tracking-tight">
                GLA
              </span>
              <span className="text-[11px] text-sidebar-foreground/50 font-medium">
                Gestão Ambiental
              </span>
            </div>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin">
        <p className={cn(
          "text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40 mb-4 px-4",
          collapsed && "sr-only"
        )}>
          Menu
        </p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          const linkContent = (
            <Link
              to={item.path}
              className={cn(
                'nav-link group',
                isActive ? 'nav-link-active' : 'nav-link-inactive'
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                !isActive && "group-hover:scale-110"
              )} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.path}>{linkContent}</div>;
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-5 border-t border-sidebar-border space-y-1.5">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          const linkContent = (
            <Link
              to={item.path}
              className={cn(
                'nav-link group',
                isActive ? 'nav-link-active' : 'nav-link-inactive'
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                !isActive && "group-hover:scale-110"
              )} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.path}>{linkContent}</div>;
        })}

        {/* User Section */}
        <div
          className={cn(
            'flex items-center gap-3 p-3 mt-4 rounded-xl bg-sidebar-accent/60 backdrop-blur-sm',
            collapsed && 'justify-center p-2'
          )}
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-sidebar-primary to-accent text-white">
            <User className="w-4 h-4" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                Ana Silva
              </p>
              <p className="text-[11px] text-sidebar-foreground/50 truncate">
                Analista Ambiental
              </p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-border rounded-lg"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
