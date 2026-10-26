import { Icons } from '@/components/icons';

export const metadata = {
  title: 'Setup Required'
};

const REQUIRED_ENV_VARS = ['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY'];

export default function SetupRequiredPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-6'>
      <div className='w-full max-w-md rounded-xl border border-border bg-card p-8 text-card-foreground shadow-sm'>
        <div className='mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
          <Icons.lock className='size-5' />
        </div>
        <h1 className='text-xl font-semibold tracking-tight'>Authentication setup required</h1>
        <p className='mt-2 text-sm text-muted-foreground'>
          This deployment doesn&apos;t have Clerk authentication configured yet, so the dashboard is
          disabled until it is. Add the following environment variables in your deployment platform,
          then redeploy:
        </p>
        <ul className='mt-4 space-y-2'>
          {REQUIRED_ENV_VARS.map((name) => (
            <li
              key={name}
              className='rounded-md border border-border bg-muted px-3 py-2 font-mono text-xs text-foreground'
            >
              {name}
            </li>
          ))}
        </ul>
        <p className='mt-4 text-xs text-muted-foreground'>
          Get these from your{' '}
          <a
            href='https://dashboard.clerk.com/last-active?path=api-keys'
            className='underline underline-offset-2 hover:text-foreground'
            target='_blank'
            rel='noopener noreferrer'
          >
            Clerk dashboard
          </a>{' '}
          under API Keys. No code changes are needed — authentication activates automatically once
          these are set.
        </p>
      </div>
    </div>
  );
}
