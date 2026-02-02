import { useState, useMemo } from 'react';
import {
  Search,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Circle,
  Filter,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConditionantStatusCard } from '@/components/conditionants/ConditionantStatusCard';
import { ConditionantRow } from '@/components/conditionants/ConditionantRow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockConditionants } from '@/data/mockData';

export default function Conditionants() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredConditionants = useMemo(() => {
    return mockConditionants.filter((cond) => {
      const matchesSearch =
        !search ||
        cond.number.toLowerCase().includes(search.toLowerCase()) ||
        cond.originalText.toLowerCase().includes(search.toLowerCase()) ||
        cond.responsible.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' || cond.status === statusFilter;
      const matchesCategory =
        categoryFilter === 'all' || cond.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [search, statusFilter, categoryFilter]);

  const statusCounts = useMemo(() => {
    const counts = {
      all: mockConditionants.length,
      em_andamento: 0,
      cumprida: 0,
      em_atraso: 0,
      nao_iniciada: 0,
    };

    mockConditionants.forEach((cond) => {
      if (cond.status in counts) {
        counts[cond.status as keyof typeof counts]++;
      }
    });

    return counts;
  }, []);

  return (
    <MainLayout
      title="Condicionantes"
      subtitle="Acompanhe o cumprimento de todas as condicionantes"
    >
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <ConditionantStatusCard
          title="Cumpridas"
          value={statusCounts.cumprida}
          icon={CheckCircle2}
          variant="success"
          subtitle="No prazo"
        />
        <ConditionantStatusCard
          title="Em Andamento"
          value={statusCounts.em_andamento}
          icon={Clock}
          variant="info"
          subtitle="Em execução"
        />
        <ConditionantStatusCard
          title="Em Atraso"
          value={statusCounts.em_atraso}
          icon={AlertTriangle}
          variant="danger"
          subtitle="Ação imediata"
        />
        <ConditionantStatusCard
          title="Não Iniciadas"
          value={statusCounts.nao_iniciada}
          icon={Circle}
          variant="muted"
          subtitle="Aguardando início"
        />
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border p-4 mb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por número, texto ou responsável..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-gray-50 border-gray-200"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] bg-gray-50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="cumprida">Cumpridas</SelectItem>
                <SelectItem value="em_atraso">Em Atraso</SelectItem>
                <SelectItem value="nao_iniciada">Não Iniciadas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px] bg-gray-50">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="documental">Documental</SelectItem>
                <SelectItem value="operacional">Operacional</SelectItem>
                <SelectItem value="ambiental">Ambiental</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="monitoramento">Monitoramento</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Mais Filtros
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{filteredConditionants.length}</span>{' '}
          condicionante(s) encontrada(s)
        </p>
        <Select defaultValue="deadline">
          <SelectTrigger className="w-[180px] h-9 text-sm">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="deadline">Prazo mais próximo</SelectItem>
            <SelectItem value="number">Número</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="category">Categoria</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Conditionant List */}
      <div className="space-y-3">
        {filteredConditionants.map((cond) => (
          <ConditionantRow key={cond.id} conditionant={cond} />
        ))}
      </div>

      {filteredConditionants.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border">
          <p className="text-muted-foreground">
            Nenhuma condicionante encontrada com os filtros selecionados.
          </p>
        </div>
      )}
    </MainLayout>
  );
}
