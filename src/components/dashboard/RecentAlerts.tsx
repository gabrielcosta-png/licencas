import { Link } from 'react-router-dom';
import { AlertTriangle, Clock, FileWarning, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockAlerts } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const severityConfig = {
  low: {
    icon: Clock,
    className: 'status-info',
  },
  medium: {
    icon: Clock,
    className: 'status-warning',
  },
  high: {
    icon: AlertTriangle,
    className: 'status-warning',
  },
  critical: {
    icon: FileWarning,
    className: 'status-danger',
  },
};

export function RecentAlerts() {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">
          Alertas Recentes
        </h3>
        <Link to="/alertas">
          <Button variant="ghost" size="sm" className="text-primary">
            Ver todos
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {mockAlerts.slice(0, 4).map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className={cn(
                'flex items-start gap-3 p-3 rounded-lg border border-border/50 transition-colors hover:bg-muted/50',
                !alert.isRead && 'bg-primary/5 border-primary/20'
              )}
            >
              <div className={cn('status-badge', config.className)}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {alert.title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                  {alert.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Prazo: {new Date(alert.dueDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
