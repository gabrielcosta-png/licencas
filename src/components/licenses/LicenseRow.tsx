import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  MapPin,
  Building2,
  Calendar,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { License } from '@/types/license';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface LicenseRowProps {
  license: License;
}

const statusConfig = {
  vigente: {
    label: 'Vigente',
    icon: CheckCircle2,
    className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  vencida: {
    label: 'Vencida',
    icon: XCircle,
    className: 'bg-red-100 text-red-700 border-red-200',
  },
  em_renovacao: {
    label: 'Em Renovação',
    icon: Clock,
    className: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  suspensa: {
    label: 'Suspensa',
    icon: AlertTriangle,
    className: 'bg-red-100 text-red-700 border-red-200',
  },
};

const typeColors: Record<string, { bg: string; text: string }> = {
  LP: { bg: 'bg-blue-100', text: 'text-blue-700' },
  LI: { bg: 'bg-amber-100', text: 'text-amber-700' },
  LO: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  RLO: { bg: 'bg-purple-100', text: 'text-purple-700' },
  LAS: { bg: 'bg-cyan-100', text: 'text-cyan-700' },
  LAU: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

export function LicenseRow({ license }: LicenseRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = statusConfig[license.status];
  const StatusIcon = status.icon;
  const typeStyle = typeColors[license.type] || typeColors.LAU;
  
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
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Header Row */}
      <div
        className="p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4">
          {/* Expand/Collapse Icon */}
          <button className="mt-1 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
          </button>

          {/* License Icon */}
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', typeStyle.bg)}>
            <FileText className={cn('w-6 h-6', typeStyle.text)} />
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-lg font-semibold text-gray-900">
                {license.licenseNumber}
              </h3>
              <Badge className={cn('text-xs font-medium border', typeStyle.bg, typeStyle.text)}>
                {license.type}
              </Badge>
              <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border', status.className)}>
                <StatusIcon className="w-3.5 h-3.5" />
                {status.label}
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span className="font-medium text-gray-700">{license.enterprise}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {license.location}
              </span>
            </div>
          </div>

          {/* Right Side - Expiration */}
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Validade</span>
            </div>
            <p className={cn(
              'text-lg font-semibold',
              isExpired ? 'text-red-600' : isExpiringSoon ? 'text-amber-600' : 'text-gray-900'
            )}>
              {new Date(license.expirationDate).toLocaleDateString('pt-BR')}
            </p>
            {!isExpired && daysUntil <= 90 && (
              <p className={cn(
                'text-xs font-medium',
                isExpiringSoon ? 'text-amber-600' : 'text-gray-500'
              )}>
                {daysUntil} dias restantes
              </p>
            )}
            {isExpired && (
              <p className="text-xs font-medium text-red-600">
                Vencida há {Math.abs(daysUntil)} dias
              </p>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 ml-[4.5rem]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <ClipboardList className="w-4 h-4" />
              <span>Condicionantes</span>
              <span className="font-semibold text-gray-900">
                {license.completedConditionants}/{license.conditionantsCount}
              </span>
            </div>
            <span className={cn(
              'text-sm font-semibold',
              progress >= 80 ? 'text-emerald-600' : progress >= 50 ? 'text-amber-600' : 'text-red-600'
            )}>
              {Math.round(progress)}%
            </span>
          </div>
          <Progress 
            value={progress} 
            className={cn(
              'h-2',
              progress >= 80 ? '[&>div]:bg-emerald-500' : progress >= 50 ? '[&>div]:bg-amber-500' : '[&>div]:bg-red-500'
            )}
          />
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
            {/* Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">Detalhes</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Processo</span>
                  <span className="font-medium text-gray-900">{license.processNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Órgão</span>
                  <span className="font-medium text-gray-900">{license.licensingBody}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Empreendedor</span>
                  <span className="font-medium text-gray-900">{license.entrepreneur}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Emissão</span>
                  <span className="font-medium text-gray-900">
                    {new Date(license.issueDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>

            {/* Conditionants Summary */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">Condicionantes</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    Cumpridas
                  </span>
                  <span className="font-semibold text-gray-900">{license.completedConditionants}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    Pendentes
                  </span>
                  <span className="font-semibold text-gray-900">
                    {license.conditionantsCount - license.completedConditionants}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    Total
                  </span>
                  <span className="font-semibold text-gray-900">{license.conditionantsCount}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">Ações</h4>
              <div className="flex flex-col gap-2">
                <Link to={`/licencas/${license.id}`}>
                  <Button variant="default" size="sm" className="w-full gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Ver Detalhes
                  </Button>
                </Link>
                <Link to={`/condicionantes?license=${license.id}`}>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <ClipboardList className="w-4 h-4" />
                    Ver Condicionantes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
