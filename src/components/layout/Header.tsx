import { Bell, Search, Home, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockAlerts } from '@/data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title }: HeaderProps) {
  const unreadAlerts = mockAlerts.filter((a) => !a.isRead);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left: Navigation */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/40 text-foreground hover:bg-black/60"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-black/40 text-foreground hover:bg-black/60"
          onClick={() => navigate(1)}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-sidebar-accent text-foreground hover:bg-sidebar-accent/80 ml-2"
          onClick={() => navigate('/')}
        >
          <Home className="w-5 h-5" />
        </Button>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="O que você quer buscar?"
            className="w-full pl-12 pr-4 h-12 bg-sidebar-accent border-0 rounded-full text-sm placeholder:text-muted-foreground focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-foreground text-sm font-semibold"
        >
          Suporte
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground h-10 w-10"
            >
              <Bell className="w-5 h-5" />
              {unreadAlerts.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-sidebar-accent border-sidebar-border">
            <DropdownMenuLabel className="flex items-center justify-between text-foreground">
              <span>Notificações</span>
              <Badge variant="secondary" className="text-xs bg-emerald-500/20 text-emerald-400">
                {unreadAlerts.length} novas
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-sidebar-border" />
            {mockAlerts.slice(0, 4).map((alert) => (
              <DropdownMenuItem
                key={alert.id}
                className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-sidebar-accent/50"
              >
                <div className="flex items-center gap-2">
                  {!alert.isRead && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  )}
                  <span className="text-sm font-medium text-foreground">{alert.title}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {alert.description}
                </p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-sidebar-border" />
            <DropdownMenuItem className="text-center text-emerald-400 font-medium justify-center">
              Ver todas as notificações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-sidebar-accent hover:bg-sidebar-accent/80"
            >
              <User className="w-5 h-5 text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-sidebar-accent border-sidebar-border">
            <DropdownMenuLabel className="text-foreground">João Albuquerque</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-sidebar-border" />
            <DropdownMenuItem className="text-muted-foreground focus:text-foreground focus:bg-sidebar-accent/50">
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="text-muted-foreground focus:text-foreground focus:bg-sidebar-accent/50">
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-sidebar-border" />
            <DropdownMenuItem className="text-muted-foreground focus:text-foreground focus:bg-sidebar-accent/50">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
