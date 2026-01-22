import { useState, useMemo } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ConditionantTable } from '@/components/conditionants/ConditionantTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockConditionants } from '@/data/mockData';
import { ConditionantStatus } from '@/types/license';

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
    const counts: Record<string, number> = {
      all: mockConditionants.length,
      em_andamento: 0,
      cumprida: 0,
      em_atraso: 0,
      nao_iniciada: 0,
    };

    mockConditionants.forEach((cond) => {
      if (counts[cond.status] !== undefined) {
        counts[cond.status]++;
      }
    });

    return counts;
  }, []);

  return (
    <MainLayout
      title="Condicionantes"
      subtitle="Acompanhe o cumprimento de todas as condicionantes"
    >
      {/* Status Tabs */}
      <Tabs
        value={statusFilter}
        onValueChange={setStatusFilter}
        className="mb-6"
      >
        <TabsList className="bg-muted/50">
          <TabsTrigger value="all" className="gap-2">
            Todas
            <span className="text-xs bg-background px-1.5 py-0.5 rounded">
              {statusCounts.all}
            </span>
          </TabsTrigger>
          <TabsTrigger value="em_andamento" className="gap-2">
            Em Andamento
            <span className="text-xs bg-background px-1.5 py-0.5 rounded">
              {statusCounts.em_andamento}
            </span>
          </TabsTrigger>
          <TabsTrigger value="cumprida" className="gap-2">
            Cumpridas
            <span className="text-xs bg-background px-1.5 py-0.5 rounded">
              {statusCounts.cumprida}
            </span>
          </TabsTrigger>
          <TabsTrigger value="em_atraso" className="gap-2">
            Em Atraso
            <span className="text-xs bg-background px-1.5 py-0.5 rounded text-destructive">
              {statusCounts.em_atraso}
            </span>
          </TabsTrigger>
          <TabsTrigger value="nao_iniciada" className="gap-2">
            Não Iniciadas
            <span className="text-xs bg-background px-1.5 py-0.5 rounded">
              {statusCounts.nao_iniciada}
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar condicionante..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-44">
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

        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar
        </Button>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredConditionants.length} condicionante(s) encontrada(s)
        </p>
      </div>

      {/* Table */}
      <ConditionantTable conditionants={filteredConditionants} />
    </MainLayout>
  );
}
