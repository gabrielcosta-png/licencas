import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { licensingBodies, licenseTypes } from '@/data/mockData';

interface LicenseFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  body: string;
  onBodyChange: (value: string) => void;
  onClearFilters: () => void;
}

export function LicenseFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  type,
  onTypeChange,
  body,
  onBodyChange,
  onClearFilters,
}: LicenseFiltersProps) {
  const hasActiveFilters = search || status || type || body;

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por número, empreendimento..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-40">
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

          <Select value={type} onValueChange={onTypeChange}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Tipo de Licença" />
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

          <Select value={body} onValueChange={onBodyChange}>
            <SelectTrigger className="w-40">
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

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          {search && (
            <Badge variant="secondary" className="gap-1">
              Busca: "{search}"
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onSearchChange('')}
              />
            </Badge>
          )}
          {status && status !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Status: {status}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onStatusChange('all')}
              />
            </Badge>
          )}
          {type && type !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Tipo: {type}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onTypeChange('all')}
              />
            </Badge>
          )}
          {body && body !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              Órgão: {body}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onBodyChange('all')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
