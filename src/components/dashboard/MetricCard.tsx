import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: {
    icon: 'bg-primary/8 text-primary',
    iconRing: 'ring-primary/10',
    trend: 'text-muted-foreground',
  },
  success: {
    icon: 'bg-success/8 text-success',
    iconRing: 'ring-success/10',
    trend: 'text-success',
  },
  warning: {
    icon: 'bg-warning/10 text-warning-foreground',
    iconRing: 'ring-warning/10',
    trend: 'text-warning-foreground',
  },
  danger: {
    icon: 'bg-destructive/8 text-destructive',
    iconRing: 'ring-destructive/10',
    trend: 'text-destructive',
  },
};

export function MetricCard({
  title,
  value,
  icon,
  trend,
  variant = 'default',
  className,
}: MetricCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn('metric-card animate-fade-in group hover:shadow-lg transition-all duration-300', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-4xl font-bold text-foreground tracking-tight">{value}</p>
          {trend && (
            <div className="flex items-center gap-2 pt-1">
              {trend.value > 0 ? (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/10">
                  <TrendingUp className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs font-semibold text-success">+{trend.value}%</span>
                </div>
              ) : trend.value < 0 ? (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/10">
                  <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                  <span className="text-xs font-semibold text-destructive">{trend.value}%</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted">
                  <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground">0%</span>
                </div>
              )}
              <span className="text-xs text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn(
          'p-4 rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-105',
          styles.icon,
          styles.iconRing
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}