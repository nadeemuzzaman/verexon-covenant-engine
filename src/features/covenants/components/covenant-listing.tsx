import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { searchParamsCache } from '@/lib/searchparams';
import { covenantsQueryOptions } from '../api/queries';
import { CovenantTable } from './covenant-tables';

export default function CovenantListingPage() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const covenantTypes = searchParamsCache.get('covenantType');
  const statuses = searchParamsCache.get('status');
  const sort = searchParamsCache.get('sort');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(covenantTypes && { covenantTypes }),
    ...(statuses && { statuses }),
    ...(sort.length > 0 && { sort: JSON.stringify(sort) })
  };

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(covenantsQueryOptions(filters));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CovenantTable />
    </HydrationBoundary>
  );
}
