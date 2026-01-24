import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const data = [
  { month: 'Jan', vigentes: 32, vencidas: 4 },
  { month: 'Fev', vigentes: 34, vencidas: 3 },
  { month: 'Mar', vigentes: 38, vencidas: 2 },
  { month: 'Abr', vigentes: 36, vencidas: 3 },
  { month: 'Mai', vigentes: 40, vencidas: 2 },
  { month: 'Jun', vigentes: 42, vencidas: 1 },
  { month: 'Jul', vigentes: 45, vencidas: 2 },
];

type Period = 'Mês' | 'Semana' | 'Dia';

export function LicenseStatusChart() {
  const [period, setPeriod] = useState<Period>('Mês');

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-gray-900">
          Controle de Licenças
        </h3>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {(['Mês', 'Semana', 'Dia'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                period === p
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-gray-600">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="vigentes"
              name="Licenças Vigentes"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="vencidas"
              name="Licenças Vencidas"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
