import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockConditionants, mockLicenses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function UpcomingDeadlines() {
  // Combine license expirations and conditionant deadlines
  const deadlines = [
    ...mockLicenses
      .filter((l) => l.status === 'vigente' || l.status === 'em_renovacao')
      .map((l) => ({
        id: l.id,
        type: 'license' as const,
        title: `Vencimento: ${l.licenseNumber}`,
        subtitle: l.enterprise,
        date: l.expirationDate,
      })),
    ...mockConditionants
      .filter((c) => c.status !== 'cumprida' && c.status !== 'nao_aplicavel')
      .map((c) => {
        const license = mockLicenses.find((l) => l.id === c.licenseId);
        return {
          id: c.id,
          type: 'conditionant' as const,
          title: `Condicionante ${c.number}`,
          subtitle: license?.licenseNumber || '',
          date: c.deadline,
        };
      }),
  ]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const getDaysUntil = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getUrgencyClass = (days: number) => {
    if (days < 0) return 'status-danger';
    if (days <= 30) return 'status-warning';
    if (days <= 90) return 'status-info';
    return 'status-muted';
  };

  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">
          Próximos Prazos
        </h3>
        <Link to="/condicionantes">
          <Button variant="ghost" size="sm" className="text-primary">
            Ver todos
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {deadlines.map((item) => {
          const daysUntil = getDaysUntil(item.date);
          const urgencyClass = getUrgencyClass(daysUntil);

          return (
            <div
              key={`${item.type}-${item.id}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className={cn('text-xs', urgencyClass)}>
                  {daysUntil < 0
                    ? `${Math.abs(daysUntil)}d atraso`
                    : `${daysUntil}d`}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(item.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
