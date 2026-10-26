import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

// Illustrative figures for a representative borrower — wire to real
// covenant test data once the Covenants module tracks a "primary" facility.
const DSCR = {
  current: 1.45,
  covenantMinimum: 1.25
};

const LEVERAGE = {
  current: 3.1,
  covenantMaximum: 3.5,
  criticalThreshold: 0.9 // fraction of the covenant maximum treated as "critical" zone
};

const LIQUIDITY = {
  runwayMonths: 14
};

type RiskLevel = 'healthy' | 'watch' | 'breach';

const RISK_BADGE_CLASSNAME: Record<RiskLevel, string> = {
  healthy:
    'border-emerald-800/60 bg-emerald-950/50 text-emerald-400 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-400',
  watch:
    'border-amber-800/60 bg-amber-950/50 text-amber-400 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-400',
  breach:
    'border-rose-800/60 bg-rose-950/50 text-rose-400 dark:border-rose-800/60 dark:bg-rose-950/50 dark:text-rose-400'
};

const RISK_TEXT_CLASSNAME: Record<RiskLevel, string> = {
  healthy: 'text-emerald-400',
  watch: 'text-amber-400',
  breach: 'text-rose-400'
};

const RISK_BAR_CLASSNAME: Record<RiskLevel, string> = {
  healthy: 'bg-emerald-500',
  watch: 'bg-amber-500',
  breach: 'bg-rose-500'
};

function dscrRisk(headroom: number): RiskLevel {
  if (headroom <= 0) return 'breach';
  if (headroom < 0.1) return 'watch';
  return 'healthy';
}

function leverageRisk(utilization: number, criticalThreshold: number): RiskLevel {
  if (utilization >= 1) return 'breach';
  if (utilization >= criticalThreshold) return 'watch';
  return 'healthy';
}

function liquidityRisk(months: number): RiskLevel {
  if (months < 6) return 'breach';
  if (months < 12) return 'watch';
  return 'healthy';
}

export function CovenantHeadroomSection() {
  const dscrHeadroom = DSCR.current - DSCR.covenantMinimum;
  const dscrStatus = dscrRisk(dscrHeadroom);

  const leverageUtilization = LEVERAGE.current / LEVERAGE.covenantMaximum;
  const leverageStatus = leverageRisk(leverageUtilization, LEVERAGE.criticalThreshold);
  const leverageBarPct = Math.min(leverageUtilization, 1) * 100;

  const liquidityStatus = liquidityRisk(LIQUIDITY.runwayMonths);

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      {/* DSCR */}
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Debt Service Coverage Ratio</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {DSCR.current.toFixed(2)}x
          </CardTitle>
          <CardAction>
            <Badge variant='outline' className={RISK_BADGE_CLASSNAME[dscrStatus]}>
              <Icons.trendingUp />
              {dscrHeadroom >= 0 ? '+' : ''}
              {dscrHeadroom.toFixed(2)}x Headroom
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>
            Covenant minimum {DSCR.covenantMinimum.toFixed(2)}x
          </div>
          <div className={cn('text-muted-foreground', RISK_TEXT_CLASSNAME[dscrStatus])}>
            {dscrStatus === 'healthy' && 'Comfortably above covenant'}
            {dscrStatus === 'watch' && 'Narrow headroom — monitor closely'}
            {dscrStatus === 'breach' && 'Below covenant minimum'}
          </div>
        </CardFooter>
      </Card>

      {/* Leverage Ratio */}
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Leverage Ratio (Debt / EBITDA)</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {LEVERAGE.current.toFixed(2)}x
          </CardTitle>
          <CardAction>
            <Badge variant='outline' className={RISK_BADGE_CLASSNAME[leverageStatus]}>
              <Icons.adjustments />
              {Math.round(leverageUtilization * 100)}% of cap
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-2 text-sm'>
          <div className='relative h-1.5 w-full overflow-hidden rounded-full bg-muted'>
            <div
              className={cn(
                'absolute inset-y-0 left-0 rounded-full transition-all',
                RISK_BAR_CLASSNAME[leverageStatus]
              )}
              style={{ width: `${leverageBarPct}%` }}
            />
            <div
              className='absolute inset-y-0 w-px bg-foreground/40'
              style={{ left: `${LEVERAGE.criticalThreshold * 100}%` }}
              aria-hidden
            />
          </div>
          <div className='flex w-full items-center justify-between text-muted-foreground'>
            <span>Covenant maximum {LEVERAGE.covenantMaximum.toFixed(2)}x</span>
            <span className={RISK_TEXT_CLASSNAME[leverageStatus]}>
              {leverageStatus === 'healthy' && 'Within covenant'}
              {leverageStatus === 'watch' && 'Approaching cap'}
              {leverageStatus === 'breach' && 'Covenant breached'}
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* Liquidity Runway */}
      <Card className='@container/card'>
        <CardHeader>
          <CardDescription>Liquidity Runway</CardDescription>
          <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
            {LIQUIDITY.runwayMonths} months
          </CardTitle>
          <CardAction>
            <Badge variant='outline' className={RISK_BADGE_CLASSNAME[liquidityStatus]}>
              <Icons.clock />
              {liquidityStatus === 'healthy' && 'Adequate'}
              {liquidityStatus === 'watch' && 'Watch'}
              {liquidityStatus === 'breach' && 'Critical'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
          <div className='line-clamp-1 flex gap-2 font-medium'>Cash on hand vs. monthly burn</div>
          <div className='text-muted-foreground'>
            Based on current cash balance and trailing burn rate
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
