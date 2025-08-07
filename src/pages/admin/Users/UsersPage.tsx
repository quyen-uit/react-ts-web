import React from 'react';

import { type ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { FilterTable } from '@/components/table';
import EditableCell from '@/components/table/EditableCell/EditableCell';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

const Users: React.FC = () => {
  const { t } = useTranslation();
  const columns = React.useMemo<ColumnDef<User, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: t('users_page.table.id'),
        meta: {
          type: 'number',
        },
        cell: EditableCell,
      },
      {
        accessorKey: 'name',
        header: t('users_page.table.name'),
        meta: {
          type: 'text',
        },
        cell: EditableCell,
      },
      {
        accessorKey: 'email',
        header: t('users_page.table.email'),
        meta: {
          type: 'text',
        },
        cell: EditableCell,
      },
      {
        accessorKey: 'createdAt',
        header: t('users_page.table.created_at'),
        cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD'),
        meta: {
          type: 'date',
        },
      },
    ],
    []
  );

  const [data, setData] = React.useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: '2023-01-15T10:00:00Z',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      createdAt: '2023-02-20T14:30:00Z',
    },
    {
      id: 3,
      name: 'Sam Wilson',
      email: 'sam.wilson@example.com',
      createdAt: '2023-03-10T08:45:00Z',
    },
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('users_page.title')}</h1>
      <FilterTable
        columns={columns}
        data={data}
        setData={setData}
        title={t('users_page.title')}
      />
    </div>
  );
};

export default Users;
