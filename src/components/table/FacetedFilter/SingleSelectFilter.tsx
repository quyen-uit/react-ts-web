import type { Column, Table } from '@tanstack/react-table';
import React from 'react';
import { SingleSelect } from '../../input/SingleSelect/SingleSelect';

interface SingleSelectFilterProps {
  column: Column<any, any>;
  table: Table<any>;
}

export const SingleSelectFilter: React.FC<SingleSelectFilterProps> = ({
  column,
  table,
}) => {
  const facetedValues = column.getFacetedUniqueValues();
  const { updateFilter } = table.options.meta as any;
  const { placeholder } = column.columnDef.meta as any;
  const filterValue = column.getFilterValue();

  const options = Array.from(facetedValues.keys()).map((value: any) => ({
    value,
    label: value,
    count: facetedValues.get(value),
  }));

  return (
    <SingleSelect
      value={filterValue}
      onChange={(value) => updateFilter(column.id, value)}
      options={options}
      placeholder={placeholder}
    />
  );
};
