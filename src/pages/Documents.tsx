import { useState } from 'react';
import {
  FolderOpen,
  FileText,
  Upload,
  Search,
  ChevronRight,
  Download,
  Eye,
  MoreHorizontal,
  Folder,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  modified?: string;
  children?: FolderItem[];
}

const folderStructure: FolderItem[] = [
  {
    id: '1',
    name: 'LO-2023-001 - Campo Atlântico Sul',
    type: 'folder',
    children: [
      { id: '1-1', name: 'Licença', type: 'folder' },
      { id: '1-2', name: 'Condicionantes', type: 'folder' },
      { id: '1-3', name: 'Evidências', type: 'folder' },
      { id: '1-4', name: 'Regularização', type: 'folder' },
    ],
  },
  {
    id: '2',
    name: 'LI-2022-045 - FPSO Guanabara',
    type: 'folder',
    children: [
      { id: '2-1', name: 'Licença', type: 'folder' },
      { id: '2-2', name: 'Condicionantes', type: 'folder' },
      { id: '2-3', name: 'Evidências', type: 'folder' },
    ],
  },
  {
    id: '3',
    name: 'LO-2021-089 - Terminal GNL',
    type: 'folder',
    children: [
      { id: '3-1', name: 'Licença', type: 'folder' },
      { id: '3-2', name: 'Condicionantes', type: 'folder' },
      { id: '3-3', name: 'Regularização', type: 'folder' },
    ],
  },
];

const recentFiles = [
  {
    id: 'f1',
    name: 'PCA_Revisado_2024.pdf',
    license: 'LO-2023-001',
    size: '2.4 MB',
    modified: '2024-03-20',
    user: 'Ana Silva',
  },
  {
    id: 'f2',
    name: 'Relatório_Efluentes_Fev2024.xlsx',
    license: 'LI-2022-045',
    size: '856 KB',
    modified: '2024-03-18',
    user: 'Carlos Santos',
  },
  {
    id: 'f3',
    name: 'Ofício_IBAMA_001_2024.pdf',
    license: 'LO-2021-089',
    size: '1.2 MB',
    modified: '2024-03-15',
    user: 'Ana Silva',
  },
];

export default function Documents() {
  const [search, setSearch] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  return (
    <MainLayout
      title="Documentos"
      subtitle="Organize evidências e documentos por licença"
    >
      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar documentos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Enviar Documento
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Folder Structure */}
        <div className="lg:col-span-2">
          <div className="card-elevated">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 p-4 border-b border-border">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-muted-foreground"
                onClick={() => setCurrentPath([])}
              >
                <FolderOpen className="w-4 h-4" />
                Raiz
              </Button>
              {currentPath.map((path, index) => (
                <div key={path} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                  >
                    {path}
                  </Button>
                </div>
              ))}
            </div>

            {/* Folders */}
            <div className="p-4 space-y-2">
              {folderStructure.map((folder) => (
                <div
                  key={folder.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => setCurrentPath([folder.name])}
                >
                  <Folder className="w-5 h-5 text-primary" />
                  <span className="flex-1 font-medium text-foreground">
                    {folder.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {folder.children?.length || 0} itens
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Files */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Arquivos Recentes
          </h2>

          <div className="space-y-2">
            {recentFiles.map((file) => (
              <div key={file.id} className="card-elevated p-3">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {file.license} • {file.size}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {file.user} •{' '}
                      {new Date(file.modified).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
