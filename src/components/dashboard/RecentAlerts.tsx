import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    title: 'Nova licença cadastrada',
    subtitle: 'LP-0892/2024 IBAMA',
    time: '2 horas atrás',
    icon: FileText,
    gradient: 'from-blue-500/20 to-transparent',
    iconColor: 'text-blue-400',
  },
  {
    id: 2,
    title: 'Condicionante cumprida',
    subtitle: 'LO-1234/2023 - Cond. 5.1',
    time: '4 horas atrás',
    icon: CheckCircle,
    gradient: 'from-emerald-500/20 to-transparent',
    iconColor: 'text-emerald-400',
  },
  {
    id: 3,
    title: 'Prazo crítico',
    subtitle: 'LI-0567/2024 vence em 15 dias',
    time: '6 horas atrás',
    icon: AlertTriangle,
    gradient: 'from-amber-500/20 to-transparent',
    iconColor: 'text-amber-400',
  },
  {
    id: 4,
    title: 'Renovação solicitada',
    subtitle: 'LO-0789/2022 - Protocolo enviado',
    time: '1 dia atrás',
    icon: Clock,
    gradient: 'from-violet-500/20 to-transparent',
    iconColor: 'text-violet-400',
  },
];

export function RecentAlerts() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-foreground">
          Atividades recentes
        </h3>
        <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
          Ver todas
        </button>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className={cn(
                'group relative flex items-start gap-3 p-3 rounded-lg',
                'bg-gradient-to-r transition-all duration-300',
                'hover:bg-muted/30 cursor-pointer',
                activity.gradient
              )}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                  'bg-muted/50 transition-transform group-hover:scale-110'
                )}
              >
                <Icon className={cn('w-5 h-5', activity.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.subtitle}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
