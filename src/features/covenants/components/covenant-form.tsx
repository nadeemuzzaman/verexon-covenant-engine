'use client';

import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useAppForm } from '@/lib/form';
import {
  covenantTypeOptions,
  operatorOptions,
  frequencyOptions,
  statusOptions
} from '@/features/covenants/constants/covenant-options';
import { covenantSchema, type CovenantFormValues } from '@/features/covenants/schemas/covenant';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createCovenantMutation, updateCovenantMutation } from '../api/mutations';
import type { Covenant } from '../api/types';

export default function CovenantForm({
  initialData,
  pageTitle
}: {
  initialData: Covenant | null;
  pageTitle: string;
}) {
  const router = useRouter();
  const isEdit = !!initialData;

  const createMutation = useMutation({
    ...createCovenantMutation,
    onSuccess: () => {
      toast.success('Covenant created');
      router.push('/dashboard/covenants');
    },
    onError: () => {
      toast.error("Couldn't create covenant. Try again.");
    }
  });

  const updateMutation = useMutation({
    ...updateCovenantMutation,
    onSuccess: () => {
      toast.success('Covenant updated');
      router.push('/dashboard/covenants');
    },
    onError: () => {
      toast.error("Couldn't update covenant. Try again.");
    }
  });

  const form = useAppForm({
    defaultValues: {
      client_name: initialData?.client_name ?? '',
      facility_name: initialData?.facility_name ?? '',
      covenant_type: initialData?.covenant_type ?? '',
      operator: initialData?.operator ?? '',
      threshold: initialData?.threshold,
      frequency: initialData?.frequency ?? '',
      next_test_date: initialData?.next_test_date
        ? new Date(initialData.next_test_date)
        : undefined,
      last_tested_value: initialData?.last_tested_value ?? undefined,
      status: initialData?.status ?? 'Pending',
      notes: initialData?.notes ?? ''
    } as CovenantFormValues,
    validators: {
      onSubmit: covenantSchema
    },
    onSubmit: ({ value }) => {
      const payload = {
        client_name: value.client_name,
        facility_name: value.facility_name,
        covenant_type: value.covenant_type,
        operator: value.operator as Covenant['operator'],
        threshold: value.threshold!,
        frequency: value.frequency,
        next_test_date: value.next_test_date!.toISOString(),
        last_tested_value: value.last_tested_value ?? null,
        status: value.status,
        notes: value.notes
      };

      if (isEdit) {
        updateMutation.mutate({ id: initialData.id, values: payload });
      } else {
        createMutation.mutate(payload);
      }
    }
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className='mx-auto w-full max-w-3xl'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>{pageTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className='space-y-8'
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <form.AppField
                name='client_name'
                children={(field) => (
                  <field.TextField label='Client Name' required placeholder='Acme Holdings Ltd.' />
                )}
              />

              <form.AppField
                name='facility_name'
                children={(field) => (
                  <field.TextField
                    label='Facility Name'
                    required
                    placeholder='Term Loan A Facility'
                  />
                )}
              />

              <form.AppField
                name='covenant_type'
                children={(field) => (
                  <field.SelectField
                    label='Covenant Type'
                    required
                    options={covenantTypeOptions}
                    placeholder='Select covenant type'
                  />
                )}
              />

              <form.AppField
                name='frequency'
                children={(field) => (
                  <field.SelectField
                    label='Test Frequency'
                    required
                    options={frequencyOptions}
                    placeholder='Select frequency'
                  />
                )}
              />

              <form.AppField
                name='operator'
                children={(field) => (
                  <field.SelectField
                    label='Test Operator'
                    required
                    options={operatorOptions}
                    placeholder='Select operator'
                  />
                )}
              />

              <form.AppField
                name='threshold'
                children={(field) => (
                  <field.TextField
                    label='Threshold'
                    required
                    type='number'
                    step={0.01}
                    placeholder='e.g. 2.50'
                  />
                )}
              />

              <form.AppField
                name='next_test_date'
                children={(field) => <field.DatePickerField label='Next Test Date' required />}
              />

              <form.AppField
                name='last_tested_value'
                children={(field) => (
                  <field.TextField
                    label='Last Tested Value'
                    type='number'
                    step={0.01}
                    placeholder='Leave blank if not yet tested'
                  />
                )}
              />

              <form.AppField
                name='status'
                children={(field) => (
                  <field.SelectField
                    label='Status'
                    required
                    options={statusOptions}
                    placeholder='Select status'
                  />
                )}
              />
            </div>

            <form.AppField
              name='notes'
              children={(field) => (
                <field.TextareaField
                  label='Notes'
                  placeholder='Testing or waiver context for this covenant'
                  maxLength={500}
                  rows={4}
                />
              )}
            />
          </FieldGroup>

          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={() => router.back()}>
              Cancel
            </Button>
            <LoadingButton loading={isPending} type='submit'>
              {isEdit ? 'Update Covenant' : 'Add Covenant'}
            </LoadingButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
