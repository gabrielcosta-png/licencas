import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'Cumpridas',
    value: 77,
    fill: 'hsl(152, 55%, 40%)',
  },
  {
    name: 'Em Andamento',
    value: 38,
    fill: 'hsl(205, 85%, 50%)',
  },
  {
    name: 'Não Iniciadas',
    value: 4,
    fill: 'hsl(210, 15%, 70%)',
  },
  {
    name: 'Em Atraso',
    value: 12,
    fill: 'hsl(0, 72%, 51%)',
  },
];

export function ConditionantProgressChart() {
  return (
    <div className="card-elevated p-5 h-80">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Condicionantes por Status
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} layout="vertical" barSize={24}>
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis type="number" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
          <YAxis
            type="category"
            dataKey="name"
            width={100}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-md)',
            }}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
