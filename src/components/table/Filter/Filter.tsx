'use no memo';
import React from 'react';

import type { Column, Table } from '@tanstack/react-table';
import dayjs from 'dayjs';

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
  CustomDateRangePicker,
  CustomDateTimePicker,
  CustomDateTimeRangePicker,
  CustomTimePicker,
  CustomTimeRangePicker,
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

  const [from, to] = React.useMemo(
    () => (columnFilterValue as [string, string]) || [],
    [columnFilterValue]
  );

  switch (type) {
    case 'daterange':
      return (
        <CustomDateRangePicker
          value={{
            startDate: from ? dayjs(from) : null,
            endDate: to ? dayjs(to) : null,
          }}
          onChange={(range) => {
            const newFrom = range.startDate?.toISOString() ?? null;
            const newTo = range.endDate?.toISOString() ?? null;
            updateFilter?.(column.id, [newFrom, newTo]);
          }}
          slotProps={datePickerSlotProps}
        />
      );
    case 'timerange':
      return (
        <CustomTimeRangePicker
          value={{
            startTime: from ? dayjs(from) : null,
            endTime: to ? dayjs(to) : null,
          }}
          onChange={(range) => {
            const newFrom = range.startTime?.toISOString() ?? null;
            const newTo = range.endTime?.toISOString() ?? null;
            updateFilter?.(column.id, [newFrom, newTo]);
          }}
          slotProps={timePickerSlotProps}
        />
      );
    case 'datetimerange':
      return (
        <CustomDateTimeRangePicker
          value={{
            startDateTime: from ? dayjs(from) : null,
            endDateTime: to ? dayjs(to) : null,
          }}
          onChange={(range) => {
            const newFrom = range.startDateTime?.toISOString() ?? null;
            const newTo = range.endDateTime?.toISOString() ?? null;
            updateFilter?.(column.id, [newFrom, newTo]);
          }}
          slotProps={dateTimePickerSlotProps}
        />
      );
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
        <CustomDatePicker
          value={from ? dayjs(from) : null}
          onChange={() => {}}
          onAccept={(value) => updateFilter?.(column.id, value?.toISOString())}
          slotProps={datePickerSlotProps}
        />
      );
    case 'time':
      return (
        <CustomTimePicker
          value={from ? dayjs(from) : null}
          onChange={() => {}}
          onAccept={(value) => updateFilter?.(column.id, value?.toISOString())}
          slotProps={timePickerSlotProps}
        />
      );
    case 'datetime':
      return (
        <CustomDateTimePicker
          value={from ? dayjs(from) : null}
          onChange={() => {}}
          onAccept={(value) => updateFilter?.(column.id, value?.toISOString())}
          slotProps={dateTimePickerSlotProps}
        />
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
