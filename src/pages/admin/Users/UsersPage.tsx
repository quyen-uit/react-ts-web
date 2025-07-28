import React from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { FilterTable } from '@/components/ui/table';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

const Users: React.FC = () => {
  const columns = React.useMemo<ColumnDef<User, any>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        meta: {
          type: 'number',
        },
      },
      {
        accessorKey: 'name',
        header: 'Name',
        meta: {
          type: 'text',
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        meta: {
          type: 'text',
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => dayjs(info.getValue()).format('YYYY-MM-DD'),
        meta: {
          type: 'date',
        },
      },
    ],
    []
  );

  const data = React.useMemo<User[]>(
    () => [
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
    ],
    []
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <FilterTable
        columns={columns}
        data={data}
        setData={function (value: React.SetStateAction<User[]>): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default Users;
