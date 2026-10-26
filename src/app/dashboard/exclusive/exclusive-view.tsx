'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

export default function ExclusiveView() {
  return (
    <PageContainer>
      <div className='space-y-6'>
        <div>
          <h1 className='flex items-center gap-2 text-3xl font-bold tracking-tight'>
            <Icons.badgeCheck className='h-7 w-7 text-emerald-500' />
            Exclusive Executive Suite
          </h1>
          <p className='text-muted-foreground'>
            Advanced analytics, covenant stress testing, and real-time capital market monitoring.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Bespoke Covenant Monitoring Platform</CardTitle>
            <CardDescription>
              Verexon Advisory Pro & Enterprise tier active status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='text-sm text-muted-foreground space-y-2'>
              <p>✔ Real-time EBITDA & Debt Service Coverage Ratio (DSCR) monitoring enabled.</p>
              <p>✔ Multi-lender compliance reporting & automated warning engine active.</p>
              <p>✔ Headless audit trail logging connected.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
