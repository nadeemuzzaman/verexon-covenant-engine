import { auth } from '@clerk/nextjs/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { covenantByIdOptions } from '@/features/covenants/api/queries';
import PageContainer from '@/components/layout/page-container';
import CovenantViewPage from '@/features/covenants/components/covenant-view-page';

export const metadata = {
  title: 'Dashboard: Covenant View'
};

type PageProps = { params: Promise<{ covenantId: string }> };

export default async function Page(props: PageProps) {
  await auth.protect();

  const params = await props.params;
  const queryClient = getQueryClient();

  if (params.covenantId !== 'new') {
    void queryClient.prefetchQuery(covenantByIdOptions(Number(params.covenantId)));
  }

  return (
    <PageContainer>
      <div className='flex-1 space-y-4'>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CovenantViewPage covenantId={params.covenantId} />
        </HydrationBoundary>
      </div>
    </PageContainer>
  );
}
