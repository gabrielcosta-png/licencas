import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface LicenseStatusCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: 'success' | 'warning' | 'danger' | 'info' | 'muted';
  subtitle?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const variantStyles = {
  success: {
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    border: 'border-emerald-500/30',
    activeBorder: 'border-emerald-500',
    icon: 'bg-emerald-500 text-white',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
  warning: {
    gradient: 'from-amber-500/20 to-amber-600/5',
    border: 'border-amber-500/30',
    activeBorder: 'border-amber-500',
    icon: 'bg-amber-500 text-white',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/20',
  },
  danger: {
    gradient: 'from-red-500/20 to-red-600/5',
    border: 'border-red-500/30',
    activeBorder: 'border-red-500',
    icon: 'bg-red-500 text-white',
    text: 'text-red-400',
    glow: 'shadow-red-500/20',
  },
  info: {
    gradient: 'from-blue-500/20 to-blue-600/5',
    border: 'border-blue-500/30',
    activeBorder: 'border-blue-500',
    icon: 'bg-blue-500 text-white',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/20',
  },
  muted: {
    gradient: 'from-gray-500/20 to-gray-600/5',
    border: 'border-gray-500/30',
    activeBorder: 'border-gray-500',
    icon: 'bg-gray-500 text-white',
    text: 'text-gray-400',
    glow: 'shadow-gray-500/20',
  },
};

export function LicenseStatusCard({
  title,
  value,
  icon: Icon,
  variant,
  subtitle,
  onClick,
  isActive,
}: LicenseStatusCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-2xl p-5 transition-all duration-300 cursor-pointer overflow-hidden group',
        'bg-gradient-to-br border',
        styles.gradient,
        isActive ? styles.activeBorder : styles.border,
        'hover:scale-[1.02] hover:shadow-lg',
        isActive && `shadow-lg ${styles.glow}`
      )}
    >
      {/* Background glow effect */}
      <div className={cn(
        'absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-50',
        variant === 'success' && 'bg-emerald-500',
        variant === 'warning' && 'bg-amber-500',
        variant === 'danger' && 'bg-red-500',
        variant === 'info' && 'bg-blue-500',
        variant === 'muted' && 'bg-gray-500'
      )} />

      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn('text-4xl font-bold tracking-tight', styles.text)}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground/70">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          'w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110',
          styles.icon
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
