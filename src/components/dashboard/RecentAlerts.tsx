import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'Nova licença cadastrada',
    subtitle: 'LP-0892/2024 IBAMA',
    time: '2 horas atrás',
    icon: FileText,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 2,
    title: 'Condicionante cumprida',
    subtitle: 'LO-1234/2023 - Cond. 5.1',
    time: '4 horas atrás',
    icon: CheckCircle,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    id: 3,
    title: 'Prazo crítico',
    subtitle: 'LI-0567/2024 vence em 15 dias',
    time: '6 horas atrás',
    icon: AlertTriangle,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    id: 4,
    title: 'Renovação solicitada',
    subtitle: 'LO-0789/2022 - Protocolo enviado',
    time: '1 dia atrás',
    icon: Clock,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
];

export function RecentAlerts() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full">
      <h3 className="text-base font-semibold text-gray-900 mb-5">
        Atividades recentes
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.iconBg}`}
              >
                <Icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">{activity.subtitle}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
