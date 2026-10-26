import { mutationOptions } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { createCovenant, updateCovenant, deleteCovenant } from './service';
import { covenantKeys } from './queries';
import type { CovenantMutationPayload } from './types';

export const createCovenantMutation = mutationOptions({
  mutationFn: (data: CovenantMutationPayload) => createCovenant(data),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: covenantKeys.all });
  }
});

export const updateCovenantMutation = mutationOptions({
  mutationFn: ({ id, values }: { id: number; values: CovenantMutationPayload }) =>
    updateCovenant(id, values),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: covenantKeys.all });
  }
});

export const deleteCovenantMutation = mutationOptions({
  mutationFn: (id: number) => deleteCovenant(id),
  onSuccess: () => {
    getQueryClient().invalidateQueries({ queryKey: covenantKeys.all });
  }
});
