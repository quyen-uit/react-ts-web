'use no memo';
import type {
  Column,
  ColumnMeta,
  Table,
  TableMeta,
} from '@tanstack/react-table';

import { MultipleSelect } from '@/components/input';

import { SelectWrapper } from './SelectFilter.style';

export interface SingleSelectFilterProps<TData extends object, TValue> {
  column: Column<TData, TValue>;
  table: Table<TData>;
}
export function MultipleSelectFilter<TData extends object, TValue>({
  column,
  table,
}: SingleSelectFilterProps<TData, TValue>) {
  const { updateFilter } = table.options.meta as TableMeta<TData>;
  const { placeholder, options } = column.columnDef.meta as ColumnMeta<
    TData,
    TValue
  >;

  const selectedValues = (column.getFilterValue() as string[]) ?? [];

  return (
    <SelectWrapper>
      <MultipleSelect
        selectedValues={selectedValues}
        onChange={(values) => updateFilter(column.id, values)}
        options={options || []}
        placeholder={placeholder}
      />
    </SelectWrapper>
  );
}
