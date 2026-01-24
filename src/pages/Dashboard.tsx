import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
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
    <MainLayout title="Dashboard Overview">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <MetricCard
          title="Total de Licenças"
          value={mockMetrics.totalLicenses}
          icon={<FileText className="w-6 h-6" />}
          trend={{ value: 12.5, label: 'vs último mês' }}
          variant="info"
        />
        <MetricCard
          title="Licenças Vigentes"
          value={mockMetrics.validLicenses}
          icon={<CheckCircle2 className="w-6 h-6" />}
          trend={{ value: 8.5, label: 'vs último mês' }}
          variant="success"
        />
        <MetricCard
          title="Vencendo em 30 dias"
          value={mockMetrics.expiringIn30Days}
          icon={<Clock className="w-6 h-6" />}
          trend={{ value: -5, label: 'vs último mês' }}
          variant="warning"
        />
        <MetricCard
          title="Licenças Vencidas"
          value={mockMetrics.expiredLicenses}
          icon={<AlertTriangle className="w-6 h-6" />}
          trend={{ value: 12, label: 'novos este mês' }}
          variant="danger"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <LicenseStatusChart />
        </div>
        <ConditionantProgressChart />
      </div>

      {/* Activities and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentAlerts />
        <div className="lg:col-span-2">
          <UpcomingDeadlines />
        </div>
      </div>
    </MainLayout>
  );
}
