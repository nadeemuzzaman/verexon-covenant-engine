'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import type { Covenant } from '../api/types';
import { notFound } from 'next/navigation';
import CovenantForm from './covenant-form';
import { covenantByIdOptions } from '../api/queries';

type TCovenantViewPageProps = {
  covenantId: string;
};

export default function CovenantViewPage({ covenantId }: TCovenantViewPageProps) {
  if (covenantId === 'new') {
    return <CovenantForm initialData={null} pageTitle='Register New Covenant' />;
  }

  return <EditCovenantView covenantId={Number(covenantId)} />;
}

function EditCovenantView({ covenantId }: { covenantId: number }) {
  const { data } = useSuspenseQuery(covenantByIdOptions(covenantId));

  if (!data?.success || !data?.covenant) {
    notFound();
  }

  return <CovenantForm initialData={data.covenant as Covenant} pageTitle='Edit Covenant' />;
}
