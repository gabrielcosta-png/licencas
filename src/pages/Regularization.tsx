import { MainLayout } from '@/components/layout/MainLayout';
import { Shield, FileWarning, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { mockLicenses, mockConditionants } from '@/data/mockData';

const regularizationOptions = [
  {
    id: 'renovacao',
    title: 'Renovação de Licença',
    description: 'Protocolar pedido de renovação antes do vencimento',
    icon: Clock,
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    id: 'cumprimento',
    title: 'Cumprimento Tardio',
    description: 'Regularizar condicionante após o prazo original',
    icon: FileWarning,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    id: 'oficio',
    title: 'Ofício Justificativo',
    description: 'Protocolar justificativa formal junto ao órgão',
    icon: Shield,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: 'plano',
    title: 'Plano de Ação',
    description: 'Elaborar plano de regularização ambiental',
    icon: CheckCircle2,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

export default function Regularization() {
  const expiredLicenses = mockLicenses.filter((l) => l.status === 'vencida');
  const delayedConditionants = mockConditionants.filter(
    (c) => c.status === 'em_atraso'
  );

  const pendingItems = [
    ...expiredLicenses.map((l) => ({
      id: l.id,
      type: 'license' as const,
      title: `Licença Vencida: ${l.licenseNumber}`,
      subtitle: l.enterprise,
      dueDate: l.expirationDate,
      severity: 'critical' as const,
    })),
    ...delayedConditionants.map((c) => {
      const license = mockLicenses.find((l) => l.id === c.licenseId);
      return {
        id: c.id,
        type: 'conditionant' as const,
        title: `Condicionante ${c.number} em Atraso`,
        subtitle: license?.licenseNumber || '',
        dueDate: c.deadline,
        severity: 'high' as const,
      };
    }),
  ];

  return (
    <MainLayout
      title="Regularização Ambiental"
      subtitle="Gerencie pendências e ações corretivas"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card-elevated p-5 border-l-4 border-l-destructive">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <FileWarning className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {expiredLicenses.length}
              </p>
              <p className="text-sm text-muted-foreground">Licenças Vencidas</p>
            </div>
          </div>
        </div>
        <div className="card-elevated p-5 border-l-4 border-l-warning">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {delayedConditionants.length}
              </p>
              <p className="text-sm text-muted-foreground">
                Condicionantes Atrasadas
              </p>
            </div>
          </div>
        </div>
        <div className="card-elevated p-5 border-l-4 border-l-info">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-info/10">
              <Shield className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">
                Ações em Andamento
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Items */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Itens Pendentes de Regularização
          </h2>

          {pendingItems.length === 0 ? (
            <div className="card-elevated p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
              <h3 className="text-lg font-medium text-foreground mb-1">
                Tudo em dia!
              </h3>
              <p className="text-sm text-muted-foreground">
                Não há pendências de regularização no momento.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingItems.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className={cn(
                    'card-elevated p-4 flex items-center gap-4',
                    item.severity === 'critical' && 'border-l-4 border-l-destructive'
                  )}
                >
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      item.severity === 'critical'
                        ? 'bg-destructive/10'
                        : 'bg-warning/10'
                    )}
                  >
                    <FileWarning
                      className={cn(
                        'w-5 h-5',
                        item.severity === 'critical'
                          ? 'text-destructive'
                          : 'text-warning'
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Vencimento:{' '}
                      {new Date(item.dueDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Badge
                    variant={
                      item.severity === 'critical' ? 'destructive' : 'secondary'
                    }
                  >
                    {item.type === 'license' ? 'Licença' : 'Condicionante'}
                  </Badge>
                  <Button size="sm" className="gap-1">
                    Regularizar
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Regularization Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Opções de Regularização
          </h2>

          <div className="space-y-3">
            {regularizationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className="card-interactive p-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn('p-2 rounded-lg', option.bgColor)}>
                      <Icon className={cn('w-5 h-5', option.color)} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {option.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
