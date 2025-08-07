import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<> {
    type?:
      | 'number'
      | 'date'
      | 'time'
      | 'datetime'
      | 'option'
      | 'text'
      | 'multiple'
      | 'boolean';
    placeholder?: string;
    options?: {
      value: unknown;
      label: string;
    }[];
  }
  interface TableMeta<> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    updateFilter: (columnId: string, value: unknown) => void;
    isEditing?: boolean;
  }
}
