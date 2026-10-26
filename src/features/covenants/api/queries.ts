import { queryOptions } from '@tanstack/react-query';
import { getCovenants, getCovenantById } from './service';
import type { Covenant, CovenantFilters } from './types';

export type { Covenant };

export const covenantKeys = {
  all: ['covenants'] as const,
  list: (filters: CovenantFilters) => [...covenantKeys.all, 'list', filters] as const,
  detail: (id: number) => [...covenantKeys.all, 'detail', id] as const
};

export const covenantsQueryOptions = (filters: CovenantFilters) =>
  queryOptions({
    queryKey: covenantKeys.list(filters),
    queryFn: () => getCovenants(filters)
  });

export const covenantByIdOptions = (id: number) =>
  queryOptions({
    queryKey: covenantKeys.detail(id),
    queryFn: () => getCovenantById(id)
  });
