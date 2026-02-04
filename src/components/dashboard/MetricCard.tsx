import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const variantStyles = {
  default: {
    gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    glow: 'group-hover:shadow-blue-500/20',
    trendUp: 'text-emerald-400',
    trendDown: 'text-red-400',
  },
  success: {
    gradient: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/20',
    trendUp: 'text-emerald-400',
    trendDown: 'text-red-400',
  },
  warning: {
    gradient: 'from-amber-500/20 via-amber-500/10 to-transparent',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    glow: 'group-hover:shadow-amber-500/20',
    trendUp: 'text-amber-400',
    trendDown: 'text-amber-400',
  },
  danger: {
    gradient: 'from-red-500/20 via-red-500/10 to-transparent',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
    glow: 'group-hover:shadow-red-500/20',
    trendUp: 'text-emerald-400',
    trendDown: 'text-red-400',
  },
  info: {
    gradient: 'from-violet-500/20 via-violet-500/10 to-transparent',
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
    glow: 'group-hover:shadow-violet-500/20',
    trendUp: 'text-emerald-400',
    trendDown: 'text-red-400',
  },
};

export function MetricCard({
  title,
  value,
  icon,
  trend,
  variant = 'default',
}: MetricCardProps) {
  const styles = variantStyles[variant];
  const isPositive = trend && trend.value >= 0;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl p-5 transition-all duration-300',
        'bg-card border border-border/50',
        'hover:border-primary/30 hover:shadow-lg',
        styles.glow
      )}
    >
      {/* Gradient Background */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-100',
          styles.gradient
        )}
      />

      {/* Content */}
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <div className="flex items-center gap-1.5 mt-3">
              <div
                className={cn(
                  'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                  isPositive ? 'bg-emerald-500/20' : 'bg-red-500/20'
                )}
              >
                {isPositive ? (
                  <TrendingUp className={cn('w-3 h-3', styles.trendUp)} />
                ) : (
                  <TrendingDown className={cn('w-3 h-3', styles.trendDown)} />
                )}
                <span className={isPositive ? styles.trendUp : styles.trendDown}>
                  {isPositive ? '+' : ''}
                  {trend.value}%
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
            styles.iconBg
          )}
        >
          <div className={cn(styles.iconColor)}>{icon}</div>
        </div>
      </div>
    </div>
  );
}
