import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ClipboardList,
  TrendingUp,
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { LicenseStatusChart } from '@/components/dashboard/LicenseStatusChart';
import { ConditionantProgressChart } from '@/components/dashboard/ConditionantProgressChart';
import { RecentAlerts } from '@/components/dashboard/RecentAlerts';
import { UpcomingDeadlines } from '@/components/dashboard/UpcomingDeadlines';
import { mockMetrics } from '@/data/mockData';

export default function Dashboard() {
  return (
    <MainLayout
      title="Dashboard"
      subtitle="Visão geral do sistema de gestão ambiental"
    >
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/70">
          Licenças Ambientais
        </h2>
      </div>
      
      {/* Metrics Grid - Licenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        <MetricCard
          title="Total de Licenças"
          value={mockMetrics.totalLicenses}
          icon={<FileText className="w-6 h-6" />}
          variant="default"
        />
        <MetricCard
          title="Licenças Vigentes"
          value={mockMetrics.validLicenses}
          icon={<CheckCircle2 className="w-6 h-6" />}
          trend={{ value: 0, label: 'vs mês anterior' }}
          variant="success"
        />
        <MetricCard
          title="Vencendo em 30 dias"
          value={mockMetrics.expiringIn30Days}
          icon={<Clock className="w-6 h-6" />}
          variant="warning"
        />
        <MetricCard
          title="Licenças Vencidas"
          value={mockMetrics.expiredLicenses}
          icon={<AlertTriangle className="w-6 h-6" />}
          variant="danger"
        />
      </div>

      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/70">
          Condicionantes
        </h2>
      </div>

      {/* Conditionants Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        <MetricCard
          title="Total Condicionantes"
          value={mockMetrics.totalConditionants}
          icon={<ClipboardList className="w-6 h-6" />}
          variant="default"
        />
        <MetricCard
          title="Cumpridas"
          value={mockMetrics.completedConditionants}
          icon={<CheckCircle2 className="w-6 h-6" />}
          trend={{ value: 5, label: 'este mês' }}
          variant="success"
        />
        <MetricCard
          title="Em Andamento"
          value={mockMetrics.inProgressConditionants}
          icon={<TrendingUp className="w-6 h-6" />}
          variant="default"
        />
        <MetricCard
          title="Em Atraso"
          value={mockMetrics.delayedConditionants}
          icon={<AlertTriangle className="w-6 h-6" />}
          trend={{ value: -2, label: 'vs mês anterior' }}
          variant="danger"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <LicenseStatusChart />
        <ConditionantProgressChart />
      </div>

      {/* Alerts and Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAlerts />
        <UpcomingDeadlines />
      </div>
    </MainLayout>
  );
}