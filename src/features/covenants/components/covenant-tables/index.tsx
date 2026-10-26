'use client';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { useSuspenseQuery } from '@tanstack/react-query';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { getSortingStateParser } from '@/lib/data-table-parsers';
import { covenantsQueryOptions } from '../../api/queries';
import { columns } from './columns';

export function CovenantTable() {
  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    name: parseAsString,
    covenantType: parseAsString,
    status: parseAsString,
    // Same parser as the server searchParamsCache, so the prefetched query key matches
    sort: getSortingStateParser().withDefault([])
  });

  const filters = {
    page: params.page,
    limit: params.perPage,
    ...(params.name && { search: params.name }),
    ...(params.covenantType && { covenantTypes: params.covenantType }),
    ...(params.status && { statuses: params.status }),
    ...(params.sort.length > 0 && { sort: JSON.stringify(params.sort) })
  };

  const { data } = useSuspenseQuery(covenantsQueryOptions(filters));

  const pageCount = Math.ceil(data.total_covenants / params.perPage);

  const { table } = useDataTable({
    data: data.covenants,
    columns,
    pageCount,
    shallow: true,
    debounceMs: 500,
    initialState: {
      columnPinning: { start: [], end: ['actions'] }
    }
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
