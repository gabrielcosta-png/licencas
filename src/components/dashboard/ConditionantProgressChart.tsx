import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Cumpridas', value: 40, color: '#10b981' },
  { name: 'Em Andamento', value: 30, color: '#f59e0b' },
  { name: 'Atrasadas', value: 20, color: '#ef4444' },
  { name: 'Não Iniciadas', value: 10, color: '#8b5cf6' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: payload[0].payload.color }}
          />
          <span className="text-sm text-foreground font-medium">
            {payload[0].name}
          </span>
        </div>
        <p className="text-lg font-bold text-foreground mt-1">
          {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

export function ConditionantProgressChart() {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const completed = data.find((d) => d.name === 'Cumpridas')?.value || 0;

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-foreground">Categorias</h3>
        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
          Total: 100%
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative h-44 w-44 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">
              {completed}%
            </span>
            <span className="text-xs text-muted-foreground">Cumpridas</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {data.map((item) => (
            <div
              key={item.name}
              className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.name}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
