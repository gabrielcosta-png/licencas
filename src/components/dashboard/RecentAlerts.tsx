import { Link } from 'react-router-dom';
import { AlertTriangle, Clock, FileWarning, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockAlerts } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const severityConfig = {
  low: {
    icon: Clock,
    className: 'bg-info/10 text-info',
  },
  medium: {
    icon: Clock,
    className: 'bg-warning/12 text-warning-foreground',
  },
  high: {
    icon: AlertTriangle,
    className: 'bg-warning/12 text-warning-foreground',
  },
  critical: {
    icon: FileWarning,
    className: 'bg-destructive/10 text-destructive',
  },
};

export function RecentAlerts() {
  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="section-title">Alertas Recentes</h3>
        <Link to="/alertas">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 -mr-2 group">
            Ver todos
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
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
                'flex items-start gap-4 p-4 rounded-xl border border-border/40 transition-all duration-200 hover:bg-muted/30 hover:border-border cursor-pointer',
                !alert.isRead && 'bg-primary/3 border-primary/15'
              )}
            >
              <div className={cn('p-2.5 rounded-xl', config.className)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {alert.title}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                  {alert.description}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-2">
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