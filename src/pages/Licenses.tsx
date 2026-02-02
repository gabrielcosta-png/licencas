import { useState, useMemo } from 'react';
import { Plus, Upload, Download, Search, FileText, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
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

export default function Licenses() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [body, setBody] = useState('all');

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

  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
    setType('all');
    setBody('all');
  };

  const hasActiveFilters = search || status !== 'all' || type !== 'all' || body !== 'all';

  return (
    <MainLayout
      title="Licenças Ambientais"
      subtitle="Gerencie todas as licenças do portfólio"
    >
      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <LicenseStatusCard
          title="Total"
          value={statusCounts.total}
          icon={FileText}
          variant="info"
          subtitle="Licenças cadastradas"
        />
        <LicenseStatusCard
          title="Vigentes"
          value={statusCounts.vigente}
          icon={CheckCircle2}
          variant="success"
          subtitle="Em conformidade"
        />
        <LicenseStatusCard
          title="Vencidas"
          value={statusCounts.vencida}
          icon={XCircle}
          variant="danger"
          subtitle="Requer ação"
        />
        <LicenseStatusCard
          title="Em Renovação"
          value={statusCounts.em_renovacao}
          icon={Clock}
          variant="warning"
          subtitle="Aguardando órgão"
        />
        <LicenseStatusCard
          title="Vencendo em 90 dias"
          value={statusCounts.expiringSoon}
          icon={AlertTriangle}
          variant="warning"
          subtitle="Atenção necessária"
        />
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Licença
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Importar PDF
          </Button>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por número, empresa ou processo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="vigente">Vigente</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
              <SelectItem value="em_renovacao">Em Renovação</SelectItem>
              <SelectItem value="suspensa">Suspensa</SelectItem>
            </SelectContent>
          </Select>

          {/* Type */}
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {licenseTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Licensing Body */}
          <Select value={body} onValueChange={setBody}>
            <SelectTrigger>
              <SelectValue placeholder="Órgão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os órgãos</SelectItem>
              {licensingBodies.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters & Clear */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {filteredLicenses.length} de {mockLicenses.length} licença(s)
            </p>
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Limpar filtros
            </Button>
          </div>
        )}
      </div>

      {/* Results Count (when no active filters) */}
      {!hasActiveFilters && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {filteredLicenses.length} licença(s) encontrada(s)
          </p>
        </div>
      )}

      {/* License List */}
      <div className="space-y-4">
        {filteredLicenses.map((license) => (
          <LicenseRow key={license.id} license={license} />
        ))}
      </div>

      {/* Empty State */}
      {filteredLicenses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl border border-gray-100">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Nenhuma licença encontrada
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm">
            Ajuste os filtros de busca ou adicione uma nova licença ao portfólio.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClearFilters}>
              Limpar filtros
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Licença
            </Button>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
