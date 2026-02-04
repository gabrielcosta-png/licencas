import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  AlertCircle,
  FileBarChart,
  FolderOpen,
  RefreshCw,
  Bell,
  Search,
  User,
  Settings,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mainMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Licenças', path: '/licencas' },
  { icon: ClipboardList, label: 'Condicionantes', path: '/condicionantes' },
  { icon: RefreshCw, label: 'Regularização', path: '/regularizacao' },
  { icon: AlertCircle, label: 'Alertas', path: '/alertas' },
  { icon: FileBarChart, label: 'Relatórios', path: '/relatorios' },
  { icon: FolderOpen, label: 'Documentos', path: '/documentos' },
];

export function TopNavigation() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-border/50">
      {/* Main Navigation Bar */}
      <div className="h-16 px-4 flex items-center gap-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">GLA</span>
        </NavLink>

        {/* Separator */}
        <div className="w-px h-8 bg-border/50 mx-2" />

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 flex-1">
          {mainMenuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="w-48 lg:w-64 pl-9 h-9 bg-muted/50 border-border/50 rounded-full text-sm focus:bg-muted"
            />
          </div>

          {/* Quick Add */}
          <Button
            size="sm"
            className="rounded-full gap-2 bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Licença</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-card border-border"
            >
              <div className="px-3 py-2 border-b border-border">
                <span className="text-sm font-semibold text-foreground">
                  Notificações
                </span>
              </div>
              <div className="py-2">
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Licença próxima do vencimento
                    </p>
                    <p className="text-xs text-muted-foreground">
                      LI-0567/2024 vence em 15 dias
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Nova licença cadastrada
                    </p>
                    <p className="text-xs text-muted-foreground">
                      LP-0892/2024 IBAMA
                    </p>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-primary hover:text-primary/80"
                >
                  Ver todas as notificações
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 hover:bg-muted/50"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-card border-border"
            >
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground">João Silva</p>
                <p className="text-xs text-muted-foreground">
                  joao@empresa.com
                </p>
              </div>
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2" />
                Meu Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-400 focus:text-red-400">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
