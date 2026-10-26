'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import type { Covenant } from '../../api/types';
import type { ColumnDef } from '@tanstack/react-table';
import type { DataTableFeatures } from '@/lib/data-table-features';
import { Icons, type Icon } from '@/components/icons';
import { format } from 'date-fns';
import { CellAction } from './cell-action';
import { COVENANT_TYPE_OPTIONS, STATUS_OPTIONS } from './options';

const STATUS_ICON: Record<string, Icon> = {
  Compliant: Icons.circleCheck,
  Breach: Icons.xCircle,
  Waived: Icons.clock,
  Pending: Icons.clock
};

// Executive financial-status palette — light-mode tones alongside the dark-mode
// variants so the badges stay legible across every theme preset, not just dark.
const STATUS_CLASSNAME: Record<string, string> = {
  Compliant:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-400',
  Breach:
    'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800/60 dark:bg-rose-950/50 dark:text-rose-400',
  Waived: 'border-border bg-muted text-muted-foreground',
  Pending:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-400'
};

export const columns: ColumnDef<DataTableFeatures, Covenant>[] = [
  {
    id: 'client_name',
    accessorKey: 'client_name',
    header: ({ column }) => <DataTableColumnHeader column={column} label='Client' />,
    cell: ({ row }) => (
      <div className='flex flex-col'>
        <span className='font-medium'>{row.original.client_name}</span>
        <span className='text-muted-foreground text-xs'>{row.original.facility_name}</span>
      </div>
    ),
    meta: {
      label: 'Client',
      placeholder: 'Search client, facility, covenant type...',
      variant: 'text',
      icon: Icons.text
    },
    enableColumnFilter: true
  },
  {
    id: 'covenant_type',
    accessorKey: 'covenant_type',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} label='Covenant' />,
    cell: ({ row }) => (
      <span>
        {row.original.covenant_type} {row.original.operator} {row.original.threshold}x
      </span>
    ),
    enableColumnFilter: true,
    meta: {
      label: 'Covenant Type',
      variant: 'multiSelect',
      options: COVENANT_TYPE_OPTIONS
    }
  },
  {
    accessorKey: 'frequency',
    header: 'FREQUENCY'
  },
  {
    id: 'next_test_date',
    accessorKey: 'next_test_date',
    header: ({ column }) => <DataTableColumnHeader column={column} label='Next Test' />,
    cell: ({ cell }) => format(new Date(cell.getValue<Covenant['next_test_date']>()), 'PP')
  },
  {
    accessorKey: 'last_tested_value',
    header: 'LAST VALUE',
    cell: ({ cell }) => {
      const value = cell.getValue<Covenant['last_tested_value']>();
      return value === null || value === undefined ? (
        <span className='text-muted-foreground'>—</span>
      ) : (
        <span>{value}x</span>
      );
    }
  },
  {
    id: 'status',
    accessorKey: 'status',
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} label='Status' />,
    cell: ({ cell }) => {
      const status = cell.getValue<Covenant['status']>();
      const Icon = STATUS_ICON[status] ?? Icons.circle;
      return (
        <Badge variant='outline' className={STATUS_CLASSNAME[status]}>
          <Icon />
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    meta: {
      label: 'Status',
      variant: 'multiSelect',
      options: STATUS_OPTIONS
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
