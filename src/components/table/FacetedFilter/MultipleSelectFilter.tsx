import type { Column, Table } from '@tanstack/react-table';
import React from 'react';
import { MultipleSelect } from '../../input/MultipleSelect/MultipleSelect';

interface MultipleSelectFilterProps {
  column: Column<any, any>;
  table: Table<any>;
}

export const MultipleSelectFilter: React.FC<MultipleSelectFilterProps> = ({
  column,
  table,
}) => {
  const facetedValues = column.getFacetedUniqueValues();
  const { updateFilter } = table.options.meta as any;
  const { placeholder } = column.columnDef.meta as any;

  const selectedValues = (column.getFilterValue() as string[]) ?? [];

  const options = Array.from(facetedValues.keys()).map((value: any) => ({
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
};
