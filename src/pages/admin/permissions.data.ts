import type { ColumnDef } from '@tanstack/react-table';
import { t } from 'i18next';

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
    header: t('permissions_data.age'),
    meta: {
      type: 'number',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'city',
    header: t('permissions_data.city'),
    meta: {
      type: 'autocomplete',
      placeholder: t('permissions_data.filter_by_city'),
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'dragonfruit', label: 'Dragon Fruit' },
        { value: 'elderberry', label: 'Elderberry' },
        { value: 'fig', label: 'Fig' },
        { value: 'grape', label: 'Grape' },
        { value: 'honeydew', label: 'Honeydew Melon' },
        { value: 'kiwi', label: 'Kiwi' },
        { value: 'lemon', label: 'Lemon' },
        { value: 'mango', label: 'Mango' },
        { value: 'nectarine', label: 'Nectarine' },
        { value: 'orange', label: 'Orange' },
        { value: 'papaya', label: 'Papaya' },
        { value: 'quince', label: 'Quince' },
        { value: 'raspberry', label: 'Raspberry' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'tangerine', label: 'Tangerine' },
        { value: 'ugli_fruit', label: 'Ugli Fruit' },
        { value: 'watermelon', label: 'Watermelon' },
      ],
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'state',
    header: t('permissions_data.state'),
    meta: {
      type: 'multiauto',
      placeholder: t('permissions_data.filter_by_state'),
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
        { value: 'dragonfruit', label: 'Dragon Fruit' },
        { value: 'elderberry', label: 'Elderberry' },
        { value: 'fig', label: 'Fig' },
        { value: 'grape', label: 'Grape' },
        { value: 'honeydew', label: 'Honeydew Melon' },
        { value: 'kiwi', label: 'Kiwi' },
        { value: 'lemon', label: 'Lemon' },
        { value: 'mango', label: 'Mango' },
        { value: 'nectarine', label: 'Nectarine' },
        { value: 'orange', label: 'Orange' },
        { value: 'papaya', label: 'Papaya' },
        { value: 'quince', label: 'Quince' },
        { value: 'raspberry', label: 'Raspberry' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'tangerine', label: 'Tangerine' },
        { value: 'ugli_fruit', label: 'Ugli Fruit' },
        { value: 'watermelon', label: 'Watermelon' },
      ],
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'startDate',
    header: t('permissions_data.start_date'),
    meta: {
      type: 'daterange',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'startTime',
    header: t('permissions_data.start_time'),
    meta: {
      type: 'timerange',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'createdAt',
    header: t('permissions_data.created_at'),
    meta: {
      type: 'datetimerange',
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'notes',
    header: t('permissions_data.notes'),
    meta: {
      type: 'text',
      colSpan: 2,
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'tags',
    header: t('permissions_data.tags'),
    cell: ({ row }) => row.original.tags.join(', '),
    meta: {
      type: 'multiple',
      placeholder: t('permissions_data.filter_by_tags'),
    },
  },
  {
    accessorKey: 'sample',
    header: t('permissions_data.sample'),
    meta: {
      type: 'text',
      colSpan: 2,
    },
    cell: EditableCell,
  },
];
