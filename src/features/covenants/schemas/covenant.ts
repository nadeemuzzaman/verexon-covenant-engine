import * as z from 'zod';

export const covenantSchema = z.object({
  client_name: z.string().min(2, 'Client name must be at least 2 characters.'),
  facility_name: z.string().min(2, 'Facility name must be at least 2 characters.'),
  covenant_type: z.string().min(1, 'Please select a covenant type.'),
  operator: z.string().min(1, 'Please select a test operator.'),
  threshold: z.number({ message: 'Threshold is required.' }),
  frequency: z.string().min(1, 'Please select a test frequency.'),
  next_test_date: z.date({ message: 'Next test date is required.' }),
  last_tested_value: z.union([z.number(), z.undefined()]),
  status: z.string().min(1, 'Please select a status.'),
  notes: z.string().max(500, 'Notes must be 500 characters or fewer.')
});

export type CovenantFormValues = {
  client_name: string;
  facility_name: string;
  covenant_type: string;
  operator: string;
  threshold: number | undefined;
  frequency: string;
  next_test_date: Date | undefined;
  last_tested_value: number | undefined;
  status: string;
  notes: string;
};
