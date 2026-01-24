import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const licenses = [
  {
    id: 1,
    name: 'Licença Operação Terminal',
    code: 'LO-1234',
    category: 'Operação',
    progress: 85,
    total: '85 dias',
    status: 'Estável',
    statusColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 2,
    name: 'Licença Instalação Duto',
    code: 'LI-0567',
    category: 'Instalação',
    progress: 15,
    total: '15 dias',
    status: 'Crítico',
    statusColor: 'bg-red-100 text-red-700',
  },
  {
    id: 3,
    name: 'Licença Prévia Refinaria',
    code: 'LP-0892',
    category: 'Prévia',
    progress: 45,
    total: '45 dias',
    status: 'Atenção',
    statusColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 4,
    name: 'Renovação LO Plataforma',
    code: 'RLO-0321',
    category: 'Renovação',
    progress: 70,
    total: '70 dias',
    status: 'Estável',
    statusColor: 'bg-emerald-100 text-emerald-700',
  },
];

export function UpcomingDeadlines() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">
          Status das Licenças
        </h3>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          Ver todos
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Licença
              </th>
              <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dias Restantes
              </th>
              <th className="pb-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {licenses.map((license) => (
              <tr key={license.id} className="group">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {license.code.split('-')[0]}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {license.name}
                    </span>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-sm text-gray-500">{license.code}</span>
                </td>
                <td className="py-4">
                  <span className="text-sm text-gray-500">
                    {license.category}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3 min-w-32">
                    <span className="text-sm text-gray-900 w-16">
                      {license.total}
                    </span>
                    <Progress
                      value={license.progress}
                      className={cn(
                        'h-1.5 flex-1',
                        license.progress < 30
                          ? '[&>div]:bg-red-500'
                          : license.progress < 50
                          ? '[&>div]:bg-amber-500'
                          : '[&>div]:bg-emerald-500'
                      )}
                    />
                  </div>
                </td>
                <td className="py-4">
                  <Badge
                    variant="secondary"
                    className={cn(
                      'font-medium border-0',
                      license.statusColor
                    )}
                  >
                    {license.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
