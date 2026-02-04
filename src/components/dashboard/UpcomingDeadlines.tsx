import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar, ArrowRight } from 'lucide-react';

const licenses = [
  {
    id: 1,
    name: 'Licença Operação Terminal',
    code: 'LO-1234',
    category: 'Operação',
    days: 85,
    status: 'Estável',
    statusVariant: 'success' as const,
  },
  {
    id: 2,
    name: 'Licença Instalação Duto',
    code: 'LI-0567',
    category: 'Instalação',
    days: 15,
    status: 'Crítico',
    statusVariant: 'danger' as const,
  },
  {
    id: 3,
    name: 'Licença Prévia Refinaria',
    code: 'LP-0892',
    category: 'Prévia',
    days: 45,
    status: 'Atenção',
    statusVariant: 'warning' as const,
  },
  {
    id: 4,
    name: 'Renovação LO Plataforma',
    code: 'RLO-0321',
    category: 'Renovação',
    days: 70,
    status: 'Estável',
    statusVariant: 'success' as const,
  },
];

const statusStyles = {
  success: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    progressBg: 'bg-emerald-500',
  },
  warning: {
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    progressBg: 'bg-amber-500',
  },
  danger: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    border: 'border-red-500/30',
    progressBg: 'bg-red-500',
  },
};

export function UpcomingDeadlines() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Status das Licenças
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Próximos vencimentos
          </p>
        </div>
        <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors group">
          Ver todos
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="space-y-3">
        {licenses.map((license) => {
          const styles = statusStyles[license.statusVariant];
          const progress = Math.min(100, (license.days / 100) * 100);

          return (
            <div
              key={license.id}
              className="group p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-border/50"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left Section */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      styles.bg
                    )}
                  >
                    <span className={cn('text-xs font-bold', styles.text)}>
                      {license.code.split('-')[0]}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {license.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {license.code}
                      </span>
                      <span className="text-muted-foreground/50">•</span>
                      <span className="text-xs text-muted-foreground">
                        {license.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  {/* Days Badge */}
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <span
                      className={cn(
                        'text-sm font-medium',
                        license.days <= 30 ? 'text-red-400' : 'text-foreground'
                      )}
                    >
                      {license.days} dias
                    </span>
                  </div>

                  {/* Status Badge */}
                  <Badge
                    variant="secondary"
                    className={cn(
                      'font-medium border',
                      styles.bg,
                      styles.text,
                      styles.border
                    )}
                  >
                    {license.status}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      styles.progressBg
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
