import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  MapPin,
  Building2,
  Calendar,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  MoreHorizontal,
  Play,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { License } from '@/types/license';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LicenseRowProps {
  license: License;
}

const statusConfig = {
  vigente: {
    label: 'Vigente',
    icon: CheckCircle2,
    gradient: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    ring: 'ring-emerald-500/30',
  },
  vencida: {
    label: 'Vencida',
    icon: XCircle,
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    ring: 'ring-red-500/30',
  },
  em_renovacao: {
    label: 'Em Renovação',
    icon: Clock,
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    ring: 'ring-amber-500/30',
  },
  suspensa: {
    label: 'Suspensa',
    icon: AlertTriangle,
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    ring: 'ring-red-500/30',
  },
};

const typeConfig: Record<string, { gradient: string; short: string }> = {
  LP: { gradient: 'from-blue-500 to-indigo-600', short: 'LP' },
  LI: { gradient: 'from-amber-500 to-orange-600', short: 'LI' },
  LO: { gradient: 'from-emerald-500 to-green-600', short: 'LO' },
  RLO: { gradient: 'from-purple-500 to-violet-600', short: 'RLO' },
  LAS: { gradient: 'from-cyan-500 to-teal-600', short: 'LAS' },
  LAU: { gradient: 'from-gray-500 to-slate-600', short: 'LAU' },
};

export function LicenseRow({ license }: LicenseRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = statusConfig[license.status];
  const StatusIcon = status.icon;
  const typeStyle = typeConfig[license.type] || typeConfig.LAU;

  const progress =
    license.conditionantsCount > 0
      ? (license.completedConditionants / license.conditionantsCount) * 100
      : 0;

  const getDaysUntilExpiration = () => {
    const diff = new Date(license.expirationDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysUntil = getDaysUntilExpiration();
  const isExpired = daysUntil < 0;
  const isExpiringSoon = daysUntil <= 90 && daysUntil >= 0;

  return (
    <div
      className={cn(
        'group relative rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-300',
        'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
        isExpanded && 'border-primary/30 shadow-lg shadow-primary/5'
      )}
    >
      {/* Status indicator bar */}
      <div className={cn('absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b', status.gradient)} />

      {/* Main Content */}
      <div className="pl-4">
        <div
          className="p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-4">
            {/* Type Badge */}
            <div className={cn(
              'relative w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg transition-transform group-hover:scale-105',
              typeStyle.gradient
            )}>
              <span className="text-lg font-bold text-white">{typeStyle.short}</span>
              {/* Play button overlay on hover */}
              <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {license.licenseNumber}
                </h3>
                <div className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1',
                  status.bg, status.text, status.ring
                )}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[150px]">{license.enterprise}</span>
                </span>
                <span className="hidden sm:flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[120px]">{license.location}</span>
                </span>
              </div>
            </div>

            {/* Conditionants Progress - Circular */}
            <div className="hidden md:flex flex-col items-center gap-1">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-muted/30"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${progress * 1.257} 125.7`}
                    className={cn(
                      progress >= 80 ? 'text-emerald-500' :
                      progress >= 50 ? 'text-amber-500' : 'text-red-500'
                    )}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">
                  {Math.round(progress)}%
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">Condicionantes</span>
            </div>

            {/* Expiration */}
            <div className="text-right hidden sm:block">
              <p className={cn(
                'text-lg font-semibold tabular-nums',
                isExpired ? 'text-red-400' : isExpiringSoon ? 'text-amber-400' : 'text-foreground'
              )}>
                {new Date(license.expirationDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
              <p className={cn(
                'text-xs',
                isExpired ? 'text-red-400' : isExpiringSoon ? 'text-amber-400' : 'text-muted-foreground'
              )}>
                {isExpired
                  ? `Vencida há ${Math.abs(daysUntil)} dias`
                  : daysUntil <= 90
                  ? `${daysUntil} dias restantes`
                  : 'Validade'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-8 w-8 transition-transform',
                  isExpanded && 'rotate-180'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                <ChevronDown className="w-4 h-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Ver Condicionantes
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="w-4 h-4 mr-2" />
                    Baixar PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
              {/* Details Column */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Informações
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Processo:</span>
                    <span className="font-medium text-foreground">{license.processNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Órgão:</span>
                    <span className="font-medium text-foreground">{license.licensingBody}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Emissão:</span>
                    <span className="font-medium text-foreground">
                      {new Date(license.issueDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conditionants Column */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Condicionantes
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Cumpridas
                    </span>
                    <span className="font-semibold text-foreground">{license.completedConditionants}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      Pendentes
                    </span>
                    <span className="font-semibold text-foreground">
                      {license.conditionantsCount - license.completedConditionants}
                    </span>
                  </div>
                </div>
                <Progress
                  value={progress}
                  className={cn(
                    'h-1.5',
                    progress >= 80 ? '[&>div]:bg-emerald-500' :
                    progress >= 50 ? '[&>div]:bg-amber-500' : '[&>div]:bg-red-500'
                  )}
                />
              </div>

              {/* Entrepreneur Column */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Empreendedor
                </h4>
                <div className="text-sm">
                  <p className="font-medium text-foreground">{license.entrepreneur}</p>
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {license.location}
                  </p>
                </div>
              </div>

              {/* Actions Column */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ações Rápidas
                </h4>
                <div className="flex flex-col gap-2">
                  <Link to={`/licencas/${license.id}`}>
                    <Button size="sm" className="w-full gap-2 bg-primary hover:bg-primary/90">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Ver Detalhes
                    </Button>
                  </Link>
                  <Link to={`/condicionantes?license=${license.id}`}>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <ClipboardList className="w-3.5 h-3.5" />
                      Condicionantes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
