'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { workspacesInfoContent } from '@/config/infoconfig';

export default function WorkspacesView() {
  const workspaces = [
    { id: '1', name: 'Verexon Advisory - Primary', role: 'Owner', members: 12, plan: 'Enterprise' },
    { id: '2', name: 'Capital Markets & Trading', role: 'Admin', members: 8, plan: 'Pro' },
    { id: '3', name: 'Client Portfolios & Compliance', role: 'Member', members: 24, plan: 'Pro' }
  ];

  return (
    <PageContainer
      pageTitle='Workspaces'
      pageDescription='Manage your active advisory workspaces, client mandates, and team permissions.'
      infoContent={workspacesInfoContent}
    >
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-medium'>Active Workspaces</h3>
            <p className='text-sm text-muted-foreground'>Switch context or manage team access across entities.</p>
          </div>
          <Button size='sm'>
            <Icons.add className='mr-2 h-4 w-4' /> Create Workspace
          </Button>
        </div>

        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {workspaces.map((ws) => (
            <Card key={ws.id} className='hover:border-primary/50 transition-colors cursor-pointer'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-base'>{ws.name}</CardTitle>
                  <span className='rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary'>
                    {ws.plan}
                  </span>
                </div>
                <CardDescription>Role: {ws.role}</CardDescription>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='flex justify-between text-xs text-muted-foreground'>
                  <span>{ws.members} Active Team Members</span>
                  <span className='text-emerald-500 font-medium'>Active</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
