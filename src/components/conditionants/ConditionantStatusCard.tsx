import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ConditionantStatusCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: 'success' | 'warning' | 'danger' | 'info' | 'muted';
  subtitle?: string;
}

const variantStyles = {
  success: {
    bg: 'bg-emerald-50',
    icon: 'bg-emerald-100 text-emerald-600',
    text: 'text-emerald-600',
  },
  warning: {
    bg: 'bg-amber-50',
    icon: 'bg-amber-100 text-amber-600',
    text: 'text-amber-600',
  },
  danger: {
    bg: 'bg-red-50',
    icon: 'bg-red-100 text-red-600',
    text: 'text-red-600',
  },
  info: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-100 text-blue-600',
    text: 'text-blue-600',
  },
  muted: {
    bg: 'bg-gray-50',
    icon: 'bg-gray-100 text-gray-600',
    text: 'text-gray-600',
  },
};

export function ConditionantStatusCard({
  title,
  value,
  icon: Icon,
  variant,
  subtitle,
}: ConditionantStatusCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn('rounded-xl p-5 transition-all', styles.bg)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn('text-3xl font-bold mt-1', styles.text)}>{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', styles.icon)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
