import React from 'react';

import type { Column, Table } from '@tanstack/react-table';

import {
  datePickerSlotProps,
  dateTimePickerSlotProps,
  FilterContainer,
  NumberTextField,
  StyledTextField,
  timePickerSlotProps,
} from './Filter.styles';
import {
  CustomDatePicker,
  CustomDateTimePicker,
  CustomTimePicker,
  TernaryCheckbox,
} from '../../input';
import { MultipleSelectFilter } from '../FacetedFilter/MultipleSelectFilter';
import { SingleSelectFilter } from '../FacetedFilter/SingleSelectFilter';

export interface FilterProps<TData extends object, TValue> {
  column: Column<TData, TValue>;
  table: Table<TData>;
}

function Filter<TData extends object, TValue>({
  column,
  table,
}: FilterProps<TData, TValue>) {
  const columnFilterValue = column.getFilterValue();
  const { type } = column.columnDef.meta || {};
  const { updateFilter } = table.options.meta || {};

  const [from, setFrom] = React.useState<string | null>(
    (columnFilterValue as [string, string])?.[0] ?? null
  );
  const [to, setTo] = React.useState<string | null>(
    (columnFilterValue as [string, string])?.[1] ?? null
  );

  switch (type) {
    case 'number':
      return (
        <FilterContainer>
          <NumberTextField
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              updateFilter?.(column.id, [
                value,
                (columnFilterValue as [number, number])?.[1],
              ])
            }
            placeholder="From"
            variant="standard"
          />
          -
          <NumberTextField
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(e) =>
              updateFilter?.(column.id, [
                (columnFilterValue as [number, number])?.[0],
                e.target.value,
              ])
            }
            placeholder="To"
            variant="standard"
          />
        </FilterContainer>
      );
    case 'date':
      return (
        <FilterContainer>
          <CustomDatePicker
            value={from}
            onChange={(value) => setFrom(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter?.(column.id, [value?.toISOString(), to])
            }
            slotProps={datePickerSlotProps}
          />
          -
          <CustomDatePicker
            value={to}
            onChange={(value) => setTo(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter?.(column.id, [from, value?.toISOString()])
            }
            slotProps={datePickerSlotProps}
          />
        </FilterContainer>
      );
    case 'time':
      return (
        <FilterContainer>
          <CustomTimePicker
            value={from}
            onChange={(value) => setFrom(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter?.(column.id, [value?.toISOString(), to])
            }
            slotProps={timePickerSlotProps}
          />
          -
          <CustomTimePicker
            value={to}
            onChange={(value) => setTo(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter?.(column.id, [from, value?.toISOString()])
            }
            slotProps={timePickerSlotProps}
          />
        </FilterContainer>
      );
    case 'datetime':
      return (
        <FilterContainer>
          <CustomDateTimePicker
            value={from}
            onChange={(value) => setFrom(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter?.(column.id, [value?.toISOString(), to])
            }
            slotProps={dateTimePickerSlotProps}
          />
          -
          <CustomDateTimePicker
            value={to}
            onChange={(value) => setTo(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter?.(column.id, [from, value?.toISOString()])
            }
            slotProps={dateTimePickerSlotProps}
          />
        </FilterContainer>
      );
    case 'option':
      return <SingleSelectFilter column={column} table={table} />;
    case 'multiple':
      return <MultipleSelectFilter column={column} table={table} />;
    case 'boolean':
      return (
        <TernaryCheckbox
          sx={{ ml: -1, mb: -1.5 }}
          color="default"
          onValueChange={(value) => updateFilter?.(column.id, value)}
        />
      );
    case 'text':
    default:
      return (
        <StyledTextField
          value={(columnFilterValue ?? '') as string}
          onChange={(e) => updateFilter?.(column.id, e.target.value)}
          placeholder="Search..."
          variant="standard"
        />
      );
  }
}

export default Filter;
