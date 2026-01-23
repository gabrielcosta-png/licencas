import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, FileText, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockConditionants, mockLicenses } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export function UpcomingDeadlines() {
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

  const getUrgencyStyles = (days: number) => {
    if (days < 0) return { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Atrasado' };
    if (days <= 30) return { bg: 'bg-warning/12', text: 'text-warning-foreground', label: 'Urgente' };
    if (days <= 90) return { bg: 'bg-info/10', text: 'text-info', label: 'Em breve' };
    return { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Normal' };
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="section-title">Próximos Prazos</h3>
        <Link to="/condicionantes">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 -mr-2 group">
            Ver todos
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {deadlines.map((item) => {
          const daysUntil = getDaysUntil(item.date);
          const urgency = getUrgencyStyles(daysUntil);
          const Icon = item.type === 'license' ? FileText : ClipboardList;

          return (
            <div
              key={`${item.type}-${item.id}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-border/40 transition-all duration-200 hover:bg-muted/30 hover:border-border cursor-pointer"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-muted">
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
              </div>
              <div className="text-right flex flex-col items-end gap-1.5">
                <div className={cn('px-2.5 py-1 rounded-full text-xs font-semibold', urgency.bg, urgency.text)}>
                  {daysUntil < 0 ? `${Math.abs(daysUntil)}d atraso` : `${daysUntil} dias`}
                </div>
                <p className="text-xs text-muted-foreground/70">
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