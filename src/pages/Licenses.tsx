import { useState, useMemo } from 'react';
import { Plus, Upload, Download } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { LicenseCard } from '@/components/licenses/LicenseCard';
import { LicenseFilters } from '@/components/licenses/LicenseFilters';
import { Button } from '@/components/ui/button';
import { mockLicenses } from '@/data/mockData';

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

  const handleClearFilters = () => {
    setSearch('');
    setStatus('all');
    setType('all');
    setBody('all');
  };

  return (
    <MainLayout
      title="Licenças Ambientais"
      subtitle="Gerencie todas as licenças do portfólio"
    >
      {/* Actions */}
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
      <div className="mb-6">
        <LicenseFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          type={type}
          onTypeChange={setType}
          body={body}
          onBodyChange={setBody}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredLicenses.length} licença(s) encontrada(s)
        </p>
      </div>

      {/* License Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredLicenses.map((license) => (
          <LicenseCard key={license.id} license={license} />
        ))}
      </div>

      {filteredLicenses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">
            Nenhuma licença encontrada
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Ajuste os filtros ou adicione uma nova licença.
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Licença
          </Button>
        </div>
      )}
    </MainLayout>
  );
}
