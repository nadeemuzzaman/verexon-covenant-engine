import { auth } from '@clerk/nextjs/server';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import CovenantListingPage from '@/features/covenants/components/covenant-listing';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import type { SearchParams } from 'nuqs/server';
import { covenantsInfoContent } from '@/features/covenants/info-content';

export const metadata = {
  title: 'Dashboard: Covenants'
};

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: PageProps) {
  await auth.protect();

  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer
      pageTitle='Covenants'
      pageDescription='Track financial covenant compliance across client lending facilities.'
      infoContent={covenantsInfoContent}
      pageHeaderAction={
        <Link
          href='/dashboard/covenants/new'
          className={cn(buttonVariants(), 'text-xs md:text-sm')}
        >
          <Icons.add className='mr-2 h-4 w-4' /> Add Covenant
        </Link>
      }
    >
      <CovenantListingPage />
    </PageContainer>
  );
}
