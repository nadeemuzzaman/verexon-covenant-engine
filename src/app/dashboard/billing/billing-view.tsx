'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/icons';
import { billingInfoContent } from '@/config/infoconfig';

export default function BillingView() {
  const plans = [
    { title: 'Starter', price: '$299/mo', desc: 'Single facility monitoring, monthly testing cycle.', current: false },
    { title: 'Pro Advisory', price: '$799/mo', desc: 'Up to 10 lending facilities, automated breach warnings.', current: true },
    { title: 'Enterprise', price: 'Custom', desc: 'Unlimited mandates, API access, Supabase sync & VPS scrapers.', current: false }
  ];

  return (
    <PageContainer
      infoContent={billingInfoContent}
      pageTitle='Billing & Subscription Plans'
      pageDescription='Manage advisory platform licensing and infrastructure capacity.'
    >
      <div className='space-y-6'>
        <Alert>
          <Icons.info className='h-4 w-4 text-emerald-500' />
          <AlertDescription>
            Active Tier: <strong className='text-foreground'>Pro Advisory Tier</strong>. All automated test pipelines, Supabase database connections, and Headless Playwright agents active.
          </AlertDescription>
        </Alert>

        <div className='grid gap-6 md:grid-cols-3'>
          {plans.map((p, idx) => (
            <Card key={idx} className={p.current ? 'border-primary ring-1 ring-primary' : ''}>
              <CardHeader>
                <div className='flex justify-between items-center'>
                  <CardTitle>{p.title}</CardTitle>
                  {p.current && <span className='text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded'>Active</span>}
                </div>
                <CardDescription className='text-2xl font-bold text-foreground mt-2'>{p.price}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-muted-foreground'>{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
