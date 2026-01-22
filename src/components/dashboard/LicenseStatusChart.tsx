import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Vigentes', value: 3, color: 'hsl(152, 55%, 40%)' },
  { name: 'Em Renovação', value: 1, color: 'hsl(38, 92%, 50%)' },
  { name: 'Vencidas', value: 1, color: 'hsl(0, 72%, 51%)' },
];

export function LicenseStatusChart() {
  return (
    <div className="card-elevated p-5 h-80">
      <h3 className="text-base font-semibold text-foreground mb-4">
        Status das Licenças
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: 'var(--shadow-md)',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
