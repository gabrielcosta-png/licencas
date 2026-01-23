import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  {
    name: 'Cumpridas',
    value: 77,
    color: 'hsl(158, 50%, 42%)',
  },
  {
    name: 'Em Andamento',
    value: 38,
    color: 'hsl(200, 80%, 50%)',
  },
  {
    name: 'Não Iniciadas',
    value: 4,
    color: 'hsl(220, 10%, 75%)',
  },
  {
    name: 'Em Atraso',
    value: 12,
    color: 'hsl(0, 65%, 55%)',
  },
];

const total = data.reduce((acc, curr) => acc + curr.value, 0);

export function ConditionantProgressChart() {
  return (
    <div className="card-elevated p-6 h-[360px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="section-title">Condicionantes por Status</h3>
        <span className="text-sm text-muted-foreground">{total} total</span>
      </div>
      
      <ResponsiveContainer width="100%" height="calc(100% - 60px)">
        <BarChart 
          data={data} 
          layout="vertical" 
          barSize={28}
          margin={{ left: 10, right: 20 }}
        >
          <XAxis 
            type="number" 
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fontSize: 13, fill: 'hsl(var(--foreground))', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px',
              padding: '8px 12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            cursor={{ fill: 'hsl(var(--muted) / 0.5)' }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}