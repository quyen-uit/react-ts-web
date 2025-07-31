import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
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
      value: any;
      label: string;
    }[];
  }

  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    updateFilter: (columnId: string, value: any) => void;
    isEditing?: boolean;
  }
}
