'use no memo';
import type {
  Column,
  ColumnMeta,
  Table,
  TableMeta,
} from '@tanstack/react-table';

import { MultipleSelect } from '@/components/input';

export interface SingleSelectFilterProps<TData extends object, TValue> {
  column: Column<TData, TValue>;
  table: Table<TData>;
}
export function MultipleSelectFilter<TData extends object, TValue>({
  column,
  table,
}: SingleSelectFilterProps<TData, TValue>) {
  const facetedValues = column.getFacetedUniqueValues();
  const { updateFilter } = table.options.meta as TableMeta<TData>;
  const { placeholder } = column.columnDef.meta as ColumnMeta<TData, TValue>;

  const selectedValues = (column.getFilterValue() as string[]) ?? [];

  const options = Array.from(facetedValues.keys()).map((value) => ({
    value,
    label: value,
    count: facetedValues.get(value),
  }));

  return (
    <MultipleSelect
      selectedValues={selectedValues}
      onChange={(values) => updateFilter(column.id, values)}
      options={options}
      placeholder={placeholder}
    />
  );
}
