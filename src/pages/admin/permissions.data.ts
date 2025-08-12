import type { ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';

import type { Permission } from '@/types/admin/permission.d';

export const columns: ColumnDef<Permission>[] = [
  {
    accessorKey: 'name',
    header: t('permission.name'),
    meta: {
      type: 'text',
    },
  },
  {
    accessorKey: 'description',
    header: t('permission.description'),
    meta: {
      type: 'text',
    },
  },
  {
    accessorKey: 'module',
    header: t('permission.module'),
    meta: {
      type: 'text',
    },
  },
  {
    accessorKey: 'action',
    header: t('permission.action'),
    meta: {
      type: 'text',
    },
  },
];
