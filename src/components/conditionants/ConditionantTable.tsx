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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Conditionant } from '@/types/license';
import { mockLicenses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ConditionantTableProps {
  conditionants: Conditionant[];
}

const statusConfig = {
  nao_iniciada: {
    label: 'Não Iniciada',
    className: 'status-muted',
  },
  em_andamento: {
    label: 'Em Andamento',
    className: 'status-info',
  },
  cumprida: {
    label: 'Cumprida',
    className: 'status-success',
  },
  em_atraso: {
    label: 'Em Atraso',
    className: 'status-danger',
  },
  nao_aplicavel: {
    label: 'N/A',
    className: 'status-muted',
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

const periodicityLabels: Record<string, string> = {
  unica: 'Única',
  mensal: 'Mensal',
  trimestral: 'Trimestral',
  semestral: 'Semestral',
  anual: 'Anual',
  continua: 'Contínua',
};

export function ConditionantTable({ conditionants }: ConditionantTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getDaysUntil = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="card-elevated overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12"></TableHead>
            <TableHead className="table-header">Nº</TableHead>
            <TableHead className="table-header">Licença</TableHead>
            <TableHead className="table-header">Categoria</TableHead>
            <TableHead className="table-header">Periodicidade</TableHead>
            <TableHead className="table-header">Prazo</TableHead>
            <TableHead className="table-header">Responsável</TableHead>
            <TableHead className="table-header">Status</TableHead>
            <TableHead className="table-header w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conditionants.map((cond) => {
            const license = mockLicenses.find((l) => l.id === cond.licenseId);
            const status = statusConfig[cond.status];
            const daysUntil = getDaysUntil(cond.deadline);
            const isExpanded = expandedRows.has(cond.id);

            return (
              <Collapsible key={cond.id} asChild open={isExpanded}>
                <>
                  <TableRow
                    className={cn(
                      'transition-colors hover:bg-muted/50',
                      cond.status === 'em_atraso' && 'bg-destructive/5'
                    )}
                  >
                    <TableCell>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8"
                          onClick={() => toggleRow(cond.id)}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </TableCell>
                    <TableCell className="font-medium">{cond.number}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {license?.licenseNumber}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {categoryLabels[cond.category]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {periodicityLabels[cond.periodicity]}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {new Date(cond.deadline).toLocaleDateString('pt-BR')}
                        </span>
                        <span
                          className={cn(
                            'text-xs',
                            daysUntil < 0
                              ? 'text-destructive'
                              : daysUntil <= 30
                              ? 'text-warning'
                              : 'text-muted-foreground'
                          )}
                        >
                          {daysUntil < 0
                            ? `${Math.abs(daysUntil)} dias de atraso`
                            : `${daysUntil} dias restantes`}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{cond.responsible}</TableCell>
                    <TableCell>
                      <div className={cn('status-badge', status.className)}>
                        {status.label}
                      </div>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={9} className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-1">
                              Texto da Condicionante
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {cond.originalText}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button size="sm" variant="outline">
                              <Upload className="w-4 h-4 mr-2" />
                              Anexar Evidência
                            </Button>
                            <Button size="sm" variant="outline">
                              <History className="w-4 h-4 mr-2" />
                              Histórico ({cond.history.length})
                            </Button>
                            <span className="text-xs text-muted-foreground">
                              {cond.evidences.length} evidências anexadas
                            </span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </CollapsibleContent>
                </>
              </Collapsible>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
