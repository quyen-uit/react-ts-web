'use no memo';
import type {
  Column,
  ColumnMeta,
  Table,
  TableMeta,
} from '@tanstack/react-table';

import { SingleSelect } from '@/components/input';

export interface SingleSelectFilterProps<TData extends object, TValue> {
  column: Column<TData, TValue>;
  table: Table<TData>;
}

export function SingleSelectFilter<TData extends object, TValue>({
  column,
  table,
}: SingleSelectFilterProps<TData, TValue>) {
  const facetedValues = column.getFacetedUniqueValues();
  const { updateFilter } = table.options.meta as TableMeta<TData>;
  const { placeholder } = column.columnDef.meta as ColumnMeta<TData, TValue>;
  const filterValue = column.getFilterValue();

  const options = Array.from(facetedValues.keys()).map((value) => ({
    value,
    label: value,
    count: facetedValues.get(value),
  }));

  return (
    <SingleSelect
      value={(filterValue as string) ?? ''}
      onChange={(value) => updateFilter(column.id, value)}
      options={options}
      placeholder={placeholder}
    />
  );
}
