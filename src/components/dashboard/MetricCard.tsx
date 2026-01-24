// MetricCard component - Updated
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
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
  success: {
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
  warning: {
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    trendUp: 'text-amber-600',
    trendDown: 'text-amber-600',
  },
  danger: {
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
  },
  info: {
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    trendUp: 'text-emerald-600',
    trendDown: 'text-red-500',
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
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center gap-1.5 mt-2">
              {isPositive ? (
                <TrendingUp className={cn('w-4 h-4', styles.trendUp)} />
              ) : (
                <TrendingDown className={cn('w-4 h-4', styles.trendDown)} />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositive ? styles.trendUp : styles.trendDown
                )}
              >
                {isPositive ? '+' : ''}
                {trend.value}%
              </span>
              <span className="text-sm text-gray-400">{trend.label}</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center',
            styles.iconBg
          )}
        >
          <div className={cn(styles.iconColor)}>{icon}</div>
        </div>
      </div>
    </div>
  );
}
