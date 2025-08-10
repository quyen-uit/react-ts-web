import '@tanstack/react-table';

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
      | 'boolean';
    placeholder?: string;
    colSpan?: number;
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
