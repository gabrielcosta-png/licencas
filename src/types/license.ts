export type LicenseType = 'LP' | 'LI' | 'LO' | 'RLO' | 'LAS' | 'LAU' | 'Outro';

export type LicenseStatus = 'vigente' | 'vencida' | 'em_renovacao' | 'suspensa';

export type ConditionantStatus = 
  | 'nao_iniciada' 
  | 'em_andamento' 
  | 'cumprida' 
  | 'em_atraso' 
  | 'nao_aplicavel';

export type ConditionantCategory = 
  | 'documental' 
  | 'operacional' 
  | 'ambiental' 
  | 'legal' 
  | 'social' 
  | 'monitoramento';

export type ConditionantPeriodicity = 
  | 'unica' 
  | 'mensal' 
  | 'trimestral' 
  | 'semestral' 
  | 'anual' 
  | 'continua';

export type UserRole = 'admin' | 'analista' | 'gestor' | 'consulta';

export interface License {
  id: string;
  processNumber: string;
  licenseNumber: string;
  type: LicenseType;
  licensingBody: string;
  enterprise: string;
  entrepreneur: string;
  location: string;
  issueDate: string;
  expirationDate: string;
  status: LicenseStatus;
  conditionantsCount: number;
  completedConditionants: number;
  createdAt: string;
  updatedAt: string;
}

export interface Conditionant {
  id: string;
  licenseId: string;
  number: string;
  originalText: string;
  category: ConditionantCategory;
  periodicity: ConditionantPeriodicity;
  deadline: string;
  responsible: string;
  status: ConditionantStatus;
  evidences: Evidence[];
  history: HistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface Evidence {
  id: string;
  conditionantId: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
  description?: string;
}

export interface HistoryEntry {
  id: string;
  action: string;
  userId: string;
  userName: string;
  timestamp: string;
  details?: string;
}

export interface RegularizationAction {
  id: string;
  licenseId?: string;
  conditionantId?: string;
  type: 'renovacao' | 'cumprimento_tardio' | 'oficio' | 'novo_processo' | 'plano_acao';
  strategy: string;
  status: 'pendente' | 'em_andamento' | 'concluida';
  startDate: string;
  endDate?: string;
  documents: string[];
  notes: string;
}

export interface DashboardMetrics {
  totalLicenses: number;
  validLicenses: number;
  expiredLicenses: number;
  expiringIn30Days: number;
  totalConditionants: number;
  completedConditionants: number;
  delayedConditionants: number;
  inProgressConditionants: number;
}

export interface Alert {
  id: string;
  type: 'license_expiring' | 'conditionant_deadline' | 'conditionant_delayed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  entityId: string;
  entityType: 'license' | 'conditionant';
  dueDate: string;
  createdAt: string;
  isRead: boolean;
}
