import '@tanstack/react-table';
import type { Option } from './types/common';

declare module '@tanstack/react-table' {
  interface ColumnMeta<> {
    type?:
      | 'number'
      | 'date'
      | 'daterange'
      | 'time'
      | 'timerange'
      | 'datetime'
      | 'datetimerange'
      | 'option'
      | 'text'
      | 'multiple'
      | 'boolean'
      | 'autocomplete'
      | 'multiauto';
    placeholder?: string;
    colSpan?: number;
    options?: Option[];
  }
  interface TableMeta<> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    updateFilter: (columnId: string, value: unknown) => void;
    isEditing?: boolean;
  }
}
