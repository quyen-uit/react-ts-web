import { Box, TextField, styled } from '@mui/material';
import FacetedFilter from './FacetedFilter';
import type { Column, Table } from '@tanstack/react-table';
import React from 'react';
import { shouldForwardProp } from '@mui/system';
import dayjs, { Dayjs } from 'dayjs';
import CustomDateTimePicker from '../input/CustomDateTimePicker';

interface FilterProps {
  column: Column<any, any>;
  table: Table<any>;
}

const FilterTextField = styled(TextField, { shouldForwardProp })(({
  theme,
  type,
}) => {
  let width = 120;
  if (type === 'time') width = 64;
  else if (['number', 'date'].includes(type ?? '')) width = 100;

  return {
    width,
    '& .MuiInputBase-root': {
      fontSize: theme.typography.fontSize,
    },
  };
});

const Filter: React.FC<FilterProps> = ({ column, table }) => {
  const columnFilterValue = column.getFilterValue();
  const { type } = column.columnDef.meta || {};
  const { updateFilter } = table.options.meta as any;
  const [dateTime, setDateTime] = React.useState<Dayjs | null>(dayjs());

  switch (type) {
    case 'number':
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <FilterTextField
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(value) =>
              updateFilter(column.id, [
                value,
                (columnFilterValue as [number, number])?.[1],
              ])
            }
            placeholder="From"
            variant="standard"
          />
          -
          <FilterTextField
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(e) =>
              updateFilter(column.id, [
                (columnFilterValue as [number, number])?.[0],
                e.target.value,
              ])
            }
            placeholder="To"
            variant="standard"
          />
        </Box>
      );
    case 'date':
    case 'time':
    case 'datetime':
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <CustomDateTimePicker
            value={dateTime}
            onChange={setDateTime}
            slotProps={{
              textField: {
                variant: 'standard', // or 'filled', 'standard'
                label: '',
                sx: {
                  '& .MuiInputAdornment-root': {
                    ml: 0,
                  },
                },
              },
            }}
          ></CustomDateTimePicker>
          -
          <FilterTextField
            type={type}
            value={(columnFilterValue as [string, string])?.[1] ?? ''}
            onChange={(e) =>
              updateFilter(column.id, [
                (columnFilterValue as [string, string])?.[0],
                e.target.value,
              ])
            }
            variant="standard"
          />
        </Box>
      );
    case 'option':
    case 'multiple':
      return <FacetedFilter column={column} table={table} />;
    case 'text':
    default:
      return (
        <FilterTextField
          value={(columnFilterValue ?? '') as string}
          onChange={(e) => updateFilter(column.id, e.target.value)}
          placeholder="Search..."
          variant="standard"
        />
      );
  }
};

export default Filter;
