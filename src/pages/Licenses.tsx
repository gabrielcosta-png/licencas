import { useState, useMemo } from 'react';
import { Plus, Upload, Download, Search, FileText, CheckCircle2, XCircle, Clock, AlertTriangle, SlidersHorizontal, X } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { LicenseRow } from '@/components/licenses/LicenseRow';
import { LicenseStatusCard } from '@/components/licenses/LicenseStatusCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockLicenses, licensingBodies, licenseTypes } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function Licenses() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [body, setBody] = useState('all');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredLicenses = useMemo(() => {
    return mockLicenses.filter((license) => {
      const matchesSearch =
        !search ||
        license.licenseNumber.toLowerCase().includes(search.toLowerCase()) ||
        license.enterprise.toLowerCase().includes(search.toLowerCase()) ||
        license.processNumber.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === 'all' || license.status === status;
      const matchesType = type === 'all' || license.type === type;
      const matchesBody = body === 'all' || license.licensingBody === body;

      return matchesSearch && matchesStatus && matchesType && matchesBody;
    });
  }, [search, status, type, body]);

  const statusCounts = useMemo(() => {
    return {
      total: mockLicenses.length,
      vigente: mockLicenses.filter((l) => l.status === 'vigente').length,
      vencida: mockLicenses.filter((l) => l.status === 'vencida').length,
      em_renovacao: mockLicenses.filter((l) => l.status === 'em_renovacao').length,
      expiringSoon: mockLicenses.filter((l) => {
        const days = Math.ceil(
          (new Date(l.expirationDate).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        );
        return days > 0 && days <= 90;
      }).length,
    };
  }, []);

  const handleStatusClick = (filterStatus: string) => {
    if (activeFilter === filterStatus) {
      setActiveFilter(null);
      setStatus('all');
    } else {
      setActiveFilter(filterStatus);
      setStatus(filterStatus === 'total' ? 'all' : filterStatus);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
    setType('all');
    setBody('all');
    setActiveFilter(null);
  };

  const hasActiveFilters = search || status !== 'all' || type !== 'all' || body !== 'all';

  return (
    <MainLayout
      title="Licenças Ambientais"
      subtitle="Gerencie todas as licenças do portfólio"
    >
      {/* Hero Section with Status Cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Visão Geral</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Clique nos cards para filtrar rapidamente
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
              Nova Licença
            </Button>
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Importar
            </Button>
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <LicenseStatusCard
            title="Total"
            value={statusCounts.total}
            icon={FileText}
            variant="info"
            subtitle="Licenças cadastradas"
            onClick={() => handleStatusClick('total')}
            isActive={activeFilter === 'total'}
          />
          <LicenseStatusCard
            title="Vigentes"
            value={statusCounts.vigente}
            icon={CheckCircle2}
            variant="success"
            subtitle="Em conformidade"
            onClick={() => handleStatusClick('vigente')}
            isActive={activeFilter === 'vigente'}
          />
          <LicenseStatusCard
            title="Vencidas"
            value={statusCounts.vencida}
            icon={XCircle}
            variant="danger"
            subtitle="Requer ação"
            onClick={() => handleStatusClick('vencida')}
            isActive={activeFilter === 'vencida'}
          />
          <LicenseStatusCard
            title="Em Renovação"
            value={statusCounts.em_renovacao}
            icon={Clock}
            variant="warning"
            subtitle="Aguardando órgão"
            onClick={() => handleStatusClick('em_renovacao')}
            isActive={activeFilter === 'em_renovacao'}
          />
          <LicenseStatusCard
            title="Vencendo"
            value={statusCounts.expiringSoon}
            icon={AlertTriangle}
            variant="warning"
            subtitle="Próximos 90 dias"
          />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número, empresa ou processo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-11 bg-card border-border/50 rounded-xl"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearch('')}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[140px] h-11 bg-card border-border/50 rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="vigente">Vigente</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
              <SelectItem value="em_renovacao">Em Renovação</SelectItem>
              <SelectItem value="suspensa">Suspensa</SelectItem>
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[120px] h-11 bg-card border-border/50 rounded-xl">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos tipos</SelectItem>
              {licenseTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={body} onValueChange={setBody}>
            <SelectTrigger className="w-[140px] h-11 bg-card border-border/50 rounded-xl">
              <SelectValue placeholder="Órgão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos órgãos</SelectItem>
              {licensingBodies.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-foreground gap-1"
            >
              <X className="w-4 h-4" />
              Limpar
            </Button>
          )}
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredLicenses.length} de {mockLicenses.length} licença(s)
          </span>
          {hasActiveFilters && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
              Filtrado
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
          <SlidersHorizontal className="w-4 h-4" />
          Ordenar
        </Button>
      </div>

      {/* License List */}
      <div className="space-y-3">
        {filteredLicenses.map((license) => (
          <LicenseRow key={license.id} license={license} />
        ))}
      </div>

      {/* Empty State */}
      {filteredLicenses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6">
            <FileText className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Nenhuma licença encontrada
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md">
            Ajuste os filtros de busca ou adicione uma nova licença ao portfólio.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClearFilters}>
              Limpar filtros
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nova Licença
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
