import { useState } from 'react';
import {
  FileText,
  Upload,
  MoreHorizontal,
  Eye,
  Edit,
  History,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Circle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Conditionant } from '@/types/license';
import { mockLicenses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ConditionantRowProps {
  conditionant: Conditionant;
}

const statusConfig = {
  nao_iniciada: {
    label: 'Não Iniciada',
    icon: Circle,
    className: 'bg-gray-100 text-gray-600',
    progress: 0,
  },
  em_andamento: {
    label: 'Em Andamento',
    icon: Clock,
    className: 'bg-blue-100 text-blue-700',
    progress: 50,
  },
  cumprida: {
    label: 'Cumprida',
    icon: CheckCircle2,
    className: 'bg-emerald-100 text-emerald-700',
    progress: 100,
  },
  em_atraso: {
    label: 'Em Atraso',
    icon: AlertTriangle,
    className: 'bg-red-100 text-red-700',
    progress: 25,
  },
  nao_aplicavel: {
    label: 'N/A',
    icon: Circle,
    className: 'bg-gray-100 text-gray-500',
    progress: 0,
  },
};

const categoryLabels: Record<string, string> = {
  documental: 'Documental',
  operacional: 'Operacional',
  ambiental: 'Ambiental',
  legal: 'Legal',
  social: 'Social',
  monitoramento: 'Monitoramento',
};

const categoryColors: Record<string, string> = {
  documental: 'bg-purple-100 text-purple-700',
  operacional: 'bg-orange-100 text-orange-700',
  ambiental: 'bg-green-100 text-green-700',
  legal: 'bg-blue-100 text-blue-700',
  social: 'bg-pink-100 text-pink-700',
  monitoramento: 'bg-cyan-100 text-cyan-700',
};

const periodicityLabels: Record<string, string> = {
  unica: 'Única',
  mensal: 'Mensal',
  trimestral: 'Trimestral',
  semestral: 'Semestral',
  anual: 'Anual',
  continua: 'Contínua',
};

export function ConditionantRow({ conditionant }: ConditionantRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const license = mockLicenses.find((l) => l.id === conditionant.licenseId);
  const status = statusConfig[conditionant.status];
  const StatusIcon = status.icon;

  const getDaysUntil = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysUntil = getDaysUntil(conditionant.deadline);

  return (
    <div
      className={cn(
        'bg-white rounded-xl border transition-all duration-200',
        conditionant.status === 'em_atraso' && 'border-red-200 bg-red-50/30',
        isExpanded && 'shadow-md'
      )}
    >
      {/* Main Row */}
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Expand Button */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 shrink-0 mt-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>

          {/* Number and Status */}
          <div className="flex items-center gap-3 min-w-[140px]">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                {conditionant.number}
              </span>
            </div>
            <div
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                status.className
              )}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{status.label}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <Badge
                variant="outline"
                className={cn('text-xs border-0', categoryColors[conditionant.category])}
              >
                {categoryLabels[conditionant.category]}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {periodicityLabels[conditionant.periodicity]}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {conditionant.originalText}
            </p>
          </div>

          {/* Deadline */}
          <div className="text-right min-w-[120px]">
            <div className="flex items-center justify-end gap-1.5 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>{new Date(conditionant.deadline).toLocaleDateString('pt-BR')}</span>
            </div>
            <span
              className={cn(
                'text-xs font-medium',
                daysUntil < 0
                  ? 'text-red-600'
                  : daysUntil <= 30
                  ? 'text-amber-600'
                  : 'text-muted-foreground'
              )}
            >
              {daysUntil < 0
                ? `${Math.abs(daysUntil)}d em atraso`
                : `${daysUntil}d restantes`}
            </span>
          </div>

          {/* Responsible */}
          <div className="flex items-center gap-2 min-w-[180px]">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-sm truncate">{conditionant.responsible}</span>
          </div>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="w-4 h-4 mr-2" />
                Anexar evidência
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <History className="w-4 h-4 mr-2" />
                Ver histórico
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="ml-12 border-t pt-4 space-y-4">
            {/* License Info */}
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Licença:</span>
              <span className="font-medium">{license?.licenseNumber}</span>
              <span className="text-muted-foreground">-</span>
              <span className="text-muted-foreground">{license?.enterprise}</span>
            </div>

            {/* Full Text */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Texto da Condicionante
              </h4>
              <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                {conditionant.originalText}
              </p>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progresso</span>
                <span className="text-sm text-muted-foreground">{status.progress}%</span>
              </div>
              <Progress value={status.progress} className="h-2" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button size="sm" className="gap-2">
                <Upload className="w-4 h-4" />
                Anexar Evidência
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <History className="w-4 h-4" />
                Histórico ({conditionant.history.length})
              </Button>
              <span className="text-xs text-muted-foreground ml-auto">
                {conditionant.evidences.length} evidências anexadas
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
