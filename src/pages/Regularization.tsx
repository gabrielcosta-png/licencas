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
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 'cumprimento',
    title: 'Cumprimento Tardio',
    description: 'Regularizar condicionante após o prazo original',
    icon: FileWarning,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    id: 'oficio',
    title: 'Ofício Justificativo',
    description: 'Protocolar justificativa formal junto ao órgão',
    icon: Shield,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
  },
  {
    id: 'plano',
    title: 'Plano de Ação',
    description: 'Elaborar plano de regularização ambiental',
    icon: CheckCircle2,
    color: 'text-violet-600',
    bgColor: 'bg-violet-100',
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
    <MainLayout title="Regularização Ambiental">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm border-l-4 border-l-red-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <FileWarning className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {expiredLicenses.length}
              </p>
              <p className="text-sm text-gray-500">Licenças Vencidas</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm border-l-4 border-l-amber-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {delayedConditionants.length}
              </p>
              <p className="text-sm text-gray-500">
                Condicionantes Atrasadas
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-500">
                Ações em Andamento
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Items */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-semibold text-gray-900">
            Itens Pendentes de Regularização
          </h2>

          {pendingItems.length === 0 ? (
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Tudo em dia!
              </h3>
              <p className="text-sm text-gray-500">
                Não há pendências de regularização no momento.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingItems.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className={cn(
                    'bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-4',
                    item.severity === 'critical' && 'border-l-4 border-l-red-500'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      item.severity === 'critical'
                        ? 'bg-red-100'
                        : 'bg-amber-100'
                    )}
                  >
                    <FileWarning
                      className={cn(
                        'w-5 h-5',
                        item.severity === 'critical'
                          ? 'text-red-600'
                          : 'text-amber-600'
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
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
                  <Button size="sm" className="gap-1 bg-emerald-600 hover:bg-emerald-700">
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
          <h2 className="text-base font-semibold text-gray-900">
            Opções de Regularização
          </h2>

          <div className="space-y-3">
            {regularizationOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.id}
                  className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', option.bgColor)}>
                      <Icon className={cn('w-5 h-5', option.color)} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {option.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
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
