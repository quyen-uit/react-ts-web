import type { ColumnDef } from '@tanstack/react-table';
import EditableCell from '@/components/table/EditableCell/EditableCell';

export type Permission = {
  id: number;
  age: number;
  city: string;
  state: string;
  startDate: string;
  startTime: string;
  createdAt: string;
  notes: string;
  tags: string[];
  sample: string;
};

export const data: Permission[] = [
  {
    id: 1,
    age: 24,
    city: 'New York',
    state: 'NY',
    startDate: '2024-01-15',
    startTime: '10:30',
    createdAt: '2024-01-15T10:30:00',
    notes: 'Initial setup',
    tags: ['urgent', 'new'],
    sample: 'Sample A',
  },
  {
    id: 2,
    age: 30,
    city: 'Los Angeles',
    state: 'CA',
    startDate: '2024-02-20',
    startTime: '14:00',
    createdAt: '2024-02-20T14:00:00',
    notes: 'Follow up required',
    tags: ['review'],
    sample: 'Sample B',
  },
  {
    id: 3,
    age: 45,
    city: 'Chicago',
    state: 'IL',
    startDate: '2024-03-10',
    startTime: '09:00',
    createdAt: '2024-03-10T09:00:00',
    notes: 'Approved',
    tags: ['completed'],
    sample: 'Sample C',
  },
  {
    id: 4,
    age: 22,
    city: 'Houston',
    state: 'TX',
    startDate: '2024-04-05',
    startTime: '11:45',
    createdAt: '2024-04-05T11:45:00',
    notes: 'Pending review',
    tags: ['review', 'new'],
    sample: 'Sample D',
  },
  {
    id: 5,
    age: 50,
    city: 'Phoenix',
    state: 'AZ',
    startDate: '2024-05-12',
    startTime: '16:20',
    createdAt: '2024-05-12T16:20:00',
    notes: 'High priority',
    tags: ['urgent'],
    sample: 'Sample E',
  },
];

export const columns: ColumnDef<Permission>[] = [
  {
    accessorKey: 'age',
    header: 'Age',
    meta: {
      type: 'boolean',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'city',
    header: 'City',
    meta: {
      type: 'option',
      placeholder: 'Filter by City',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'state',
    header: 'State',
    meta: {
      type: 'multiple',
      placeholder: 'Filter by State',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    meta: {
      type: 'date',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    meta: {
      type: 'time',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    meta: {
      type: 'datetime',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    meta: {
      type: 'text',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => row.original.tags.join(', '),
    meta: {
      type: 'multiple',
      placeholder: 'Filter by Tags',
    },
  },
  {
    accessorKey: 'sample',
    header: 'Sample',
    meta: {
      type: 'text',
    },
    cell: EditableCell,
  },
];
