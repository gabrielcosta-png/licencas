import { MainLayout } from '@/components/layout/MainLayout';
import {
  Settings as SettingsIcon,
  Bell,
  Users,
  Shield,
  Database,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Settings() {
  return (
    <MainLayout
      title="Configurações"
      subtitle="Gerencie preferências e configurações do sistema"
    >
      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="alerts" className="gap-2">
            <Bell className="w-4 h-4" />
            Alertas
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Mail className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Alerts Tab */}
        <TabsContent value="alerts">
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Configuração de Alertas
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Defina os prazos para alertas de vencimento de licenças e
              condicionantes.
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="alert-120">Primeiro alerta (dias)</Label>
                  <Input id="alert-120" type="number" defaultValue="120" />
                  <p className="text-xs text-muted-foreground">
                    Antecedência para o primeiro alerta
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-90">Segundo alerta (dias)</Label>
                  <Input id="alert-90" type="number" defaultValue="90" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-60">Terceiro alerta (dias)</Label>
                  <Input id="alert-60" type="number" defaultValue="60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alert-30">Alerta crítico (dias)</Label>
                  <Input id="alert-30" type="number" defaultValue="30" />
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-base font-medium text-foreground mb-4">
                  Tipos de Alerta
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Vencimento de Licenças
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Alertar sobre licenças próximas do vencimento
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Prazos de Condicionantes
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Alertar sobre condicionantes com prazo próximo
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        Condicionantes em Atraso
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Alertar sobre condicionantes vencidas
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Salvar Configurações</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Usuários do Sistema
                </h2>
                <p className="text-sm text-muted-foreground">
                  Gerencie os usuários e suas permissões
                </p>
              </div>
              <Button>Adicionar Usuário</Button>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: 'Ana Silva',
                  email: 'ana.silva@empresa.com',
                  role: 'Analista Ambiental',
                },
                {
                  name: 'Carlos Santos',
                  email: 'carlos.santos@empresa.com',
                  role: 'Gestor',
                },
                {
                  name: 'Maria Oliveira',
                  email: 'maria.oliveira@empresa.com',
                  role: 'Administrador',
                },
                {
                  name: 'João Pereira',
                  email: 'joao.pereira@empresa.com',
                  role: 'Consulta',
                },
              ].map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Select defaultValue={user.role.toLowerCase()}>
                      <SelectTrigger className="w-44">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrador">
                          Administrador
                        </SelectItem>
                        <SelectItem value="gestor">Gestor</SelectItem>
                        <SelectItem value="analista ambiental">
                          Analista Ambiental
                        </SelectItem>
                        <SelectItem value="consulta">Consulta</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Preferências de Notificação
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Configure como você deseja receber notificações
            </p>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Notificações por E-mail</p>
                    <p className="text-xs text-muted-foreground">
                      Receber alertas no e-mail cadastrado
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Notificações no Sistema
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Exibir alertas dentro da plataforma
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Resumo Diário</p>
                    <p className="text-xs text-muted-foreground">
                      Receber resumo diário de pendências por e-mail
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Resumo Semanal</p>
                    <p className="text-xs text-muted-foreground">
                      Receber resumo semanal de status por e-mail
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Salvar Preferências</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="card-elevated p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Configurações de Segurança
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Gerencie configurações de segurança e auditoria
            </p>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Autenticação de Dois Fatores
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Exigir 2FA para todos os usuários
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Log de Auditoria</p>
                    <p className="text-xs text-muted-foreground">
                      Registrar todas as ações no sistema
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Sessão Automática</p>
                    <p className="text-xs text-muted-foreground">
                      Encerrar sessão após período de inatividade
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">
                  Tempo de inatividade (minutos)
                </Label>
                <Input
                  id="session-timeout"
                  type="number"
                  defaultValue="30"
                  className="max-w-xs"
                />
              </div>

              <div className="flex justify-end">
                <Button>Salvar Configurações</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
