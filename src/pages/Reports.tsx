import { MainLayout } from '@/components/layout/MainLayout';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const reportTypes = [
  {
    id: 'compliance',
    title: 'Relatório de Compliance',
    description:
      'Visão geral do status de conformidade ambiental de todas as licenças',
    icon: BarChart3,
    formats: ['PDF', 'Excel'],
  },
  {
    id: 'condicionantes',
    title: 'Relatório de Condicionantes',
    description:
      'Listagem detalhada de todas as condicionantes por status e prazo',
    icon: FileText,
    formats: ['PDF', 'Excel'],
  },
  {
    id: 'vencimentos',
    title: 'Calendário de Vencimentos',
    description: 'Cronograma de vencimentos de licenças e condicionantes',
    icon: Calendar,
    formats: ['PDF', 'Excel', 'ICS'],
  },
  {
    id: 'auditoria',
    title: 'Relatório de Auditoria',
    description: 'Log completo de ações e alterações para fins de auditoria',
    icon: FileSpreadsheet,
    formats: ['PDF', 'Excel'],
  },
];

export default function Reports() {
  return (
    <MainLayout
      title="Relatórios"
      subtitle="Gere relatórios para auditoria e análise"
    >
      {/* Filters */}
      <div className="card-elevated p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Empreendimento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os empreendimentos</SelectItem>
              <SelectItem value="1">Campo Atlântico Sul</SelectItem>
              <SelectItem value="2">FPSO Guanabara</SelectItem>
              <SelectItem value="3">Terminal GNL</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Órgão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os órgãos</SelectItem>
              <SelectItem value="ibama">IBAMA</SelectItem>
              <SelectItem value="cetesb">CETESB</SelectItem>
              <SelectItem value="inea">INEA</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="12">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Últimos 3 meses</SelectItem>
              <SelectItem value="6">Últimos 6 meses</SelectItem>
              <SelectItem value="12">Último ano</SelectItem>
              <SelectItem value="all">Todo o período</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="card-elevated p-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {report.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-2">
                    {report.formats.map((format) => (
                      <Button
                        key={format}
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {format}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Estatísticas Rápidas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-elevated p-4 text-center">
            <p className="text-3xl font-bold text-foreground">5</p>
            <p className="text-sm text-muted-foreground">Total de Licenças</p>
          </div>
          <div className="card-elevated p-4 text-center">
            <p className="text-3xl font-bold text-success">60%</p>
            <p className="text-sm text-muted-foreground">Taxa de Conformidade</p>
          </div>
          <div className="card-elevated p-4 text-center">
            <p className="text-3xl font-bold text-foreground">131</p>
            <p className="text-sm text-muted-foreground">Condicionantes</p>
          </div>
          <div className="card-elevated p-4 text-center">
            <p className="text-3xl font-bold text-warning">12</p>
            <p className="text-sm text-muted-foreground">Pendências</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
