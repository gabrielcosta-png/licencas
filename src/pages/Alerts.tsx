import { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  Clock,
  FileWarning,
  CheckCircle2,
  Settings,
  Filter,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { mockAlerts } from '@/data/mockData';

const severityConfig = {
  low: {
    icon: Clock,
    label: 'Baixa',
    className: 'status-info',
    borderColor: 'border-l-info',
  },
  medium: {
    icon: Clock,
    label: 'Média',
    className: 'status-warning',
    borderColor: 'border-l-warning',
  },
  high: {
    icon: AlertTriangle,
    label: 'Alta',
    className: 'status-warning',
    borderColor: 'border-l-warning',
  },
  critical: {
    icon: FileWarning,
    label: 'Crítica',
    className: 'status-danger',
    borderColor: 'border-l-destructive',
  },
};

export default function Alerts() {
  const [filter, setFilter] = useState('all');
  const [showRead, setShowRead] = useState(true);

  const filteredAlerts = mockAlerts.filter((alert) => {
    if (!showRead && alert.isRead) return false;
    if (filter === 'all') return true;
    return alert.severity === filter;
  });

  const unreadCount = mockAlerts.filter((a) => !a.isRead).length;

  return (
    <MainLayout
      title="Alertas e Notificações"
      subtitle="Acompanhe prazos críticos e pendências"
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              {unreadCount} não lido(s)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="show-read"
              checked={showRead}
              onCheckedChange={setShowRead}
            />
            <label htmlFor="show-read" className="text-sm text-muted-foreground">
              Mostrar lidos
            </label>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Marcar todos como lidos
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            Configurar Alertas
          </Button>
        </div>
      </div>

      {/* Severity Filter */}
      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="critical" className="text-destructive">
            Críticos
          </TabsTrigger>
          <TabsTrigger value="high">Alta</TabsTrigger>
          <TabsTrigger value="medium">Média</TabsTrigger>
          <TabsTrigger value="low">Baixa</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Alert Settings Info */}
      <div className="card-elevated p-4 mb-6 flex items-center justify-between bg-muted/30">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Configuração de Alertas</p>
            <p className="text-xs text-muted-foreground">
              Alertas configurados para 120, 90, 60 e 30 dias antes do vencimento
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          Editar
        </Button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="card-elevated p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
            <h3 className="text-lg font-medium text-foreground mb-1">
              Nenhum alerta
            </h3>
            <p className="text-sm text-muted-foreground">
              Não há alertas para exibir com os filtros atuais.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;

            return (
              <div
                key={alert.id}
                className={cn(
                  'card-elevated p-4 border-l-4 transition-colors',
                  config.borderColor,
                  !alert.isRead && 'bg-primary/5'
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn('status-badge', config.className)}>
                    <Icon className="w-4 h-4" />
                    {config.label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">
                        {alert.title}
                      </h3>
                      {!alert.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>
                        Prazo:{' '}
                        {new Date(alert.dueDate).toLocaleDateString('pt-BR')}
                      </span>
                      <span>
                        Criado em:{' '}
                        {new Date(alert.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {alert.entityType === 'license'
                          ? 'Licença'
                          : 'Condicionante'}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </MainLayout>
  );
}
