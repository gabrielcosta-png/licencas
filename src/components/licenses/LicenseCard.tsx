import { Link } from 'react-router-dom';
import {
  FileText,
  MapPin,
  Building2,
  Calendar,
  ChevronRight,
  ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { License } from '@/types/license';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface LicenseCardProps {
  license: License;
}

const statusConfig = {
  vigente: {
    label: 'Vigente',
    className: 'status-success',
  },
  vencida: {
    label: 'Vencida',
    className: 'status-danger',
  },
  em_renovacao: {
    label: 'Em Renovação',
    className: 'status-warning',
  },
  suspensa: {
    label: 'Suspensa',
    className: 'status-danger',
  },
};

const typeColors: Record<string, string> = {
  LP: 'bg-info/10 text-info border-info/20',
  LI: 'bg-warning/10 text-warning border-warning/20',
  LO: 'bg-success/10 text-success border-success/20',
  RLO: 'bg-accent/10 text-accent border-accent/20',
  LAS: 'bg-primary/10 text-primary border-primary/20',
  LAU: 'bg-muted text-muted-foreground border-border',
};

export function LicenseCard({ license }: LicenseCardProps) {
  const status = statusConfig[license.status];
  const progress =
    license.conditionantsCount > 0
      ? (license.completedConditionants / license.conditionantsCount) * 100
      : 0;

  const getDaysUntilExpiration = () => {
    const diff =
      new Date(license.expirationDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysUntil = getDaysUntilExpiration();

  return (
    <Link to={`/licencas/${license.id}`}>
      <div className="card-interactive p-5 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  {license.licenseNumber}
                </h3>
                <Badge
                  variant="outline"
                  className={cn('text-xs', typeColors[license.type])}
                >
                  {license.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {license.processNumber}
              </p>
            </div>
          </div>
          <div className={cn('status-badge', status.className)}>
            {status.label}
          </div>
        </div>

        {/* Enterprise Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-foreground font-medium truncate">
              {license.enterprise}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground truncate">
              {license.location}
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Emissão:</span>
            <span className="text-foreground">
              {new Date(license.issueDate).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">Validade:</span>
            <span
              className={cn(
                'font-medium',
                daysUntil < 0
                  ? 'text-destructive'
                  : daysUntil <= 90
                  ? 'text-warning'
                  : 'text-foreground'
              )}
            >
              {new Date(license.expirationDate).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>

        {/* Conditionants Progress */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-sm">
              <ClipboardList className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Condicionantes:</span>
              <span className="font-medium text-foreground">
                {license.completedConditionants}/{license.conditionantsCount}
              </span>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Órgão: {license.licensingBody}
          </span>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );
}
