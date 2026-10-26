export type { Covenant, CovenantOperator } from '@/constants/mock-api-covenants';

export type CovenantFilters = {
  page?: number;
  limit?: number;
  covenantTypes?: string;
  statuses?: string;
  search?: string;
  sort?: string;
};

export type CovenantsResponse = {
  success: boolean;
  time: string;
  message: string;
  total_covenants: number;
  offset: number;
  limit: number;
  covenants: import('@/constants/mock-api-covenants').Covenant[];
};

export type CovenantByIdResponse = {
  success: boolean;
  time: string;
  message: string;
  covenant: import('@/constants/mock-api-covenants').Covenant;
};

export type CovenantMutationPayload = {
  client_name: string;
  facility_name: string;
  covenant_type: string;
  operator: import('@/constants/mock-api-covenants').CovenantOperator;
  threshold: number;
  frequency: string;
  next_test_date: string;
  last_tested_value: number | null;
  status: string;
  notes: string;
};
