import { Box, TextField, useTheme } from '@mui/material';
import type { Column, Table } from '@tanstack/react-table';
import React from 'react';
import {
  CustomDatePicker,
  CustomDateTimePicker,
  CustomTimePicker,
} from '../../input';
import FacetedFilter from '../FacetedFilter/FacetedFilter';

interface FilterProps {
  column: Column<any, any>;
  table: Table<any>;
}

const Filter: React.FC<FilterProps> = ({ column, table }) => {
  const theme = useTheme();
  const fontSize = theme.typography.fontSize;

  const columnFilterValue = column.getFilterValue();
  const { type } = column.columnDef.meta || {};
  const { updateFilter } = table.options.meta as any;

  const [from, setFrom] = React.useState<string | null>(
    (columnFilterValue as [string, string])?.[0] ?? null
  );
  const [to, setTo] = React.useState<string | null>(
    (columnFilterValue as [string, string])?.[1] ?? null
  );

  const getSxTextFieldPicker = (width: number) => ({
    width: width,
    '& .MuiPickersInputBase-root': {
      fontSize: fontSize,
    },
  });

  switch (type) {
    case 'number':
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
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
            sx={{
              width: 64,
              '& .MuiInputBase-root': {
                fontSize: fontSize,
              },
            }}
          />
          -
          <TextField
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
            sx={{
              width: 64,
              '& .MuiInputBase-root': {
                fontSize: fontSize,
              },
            }}
          />
        </Box>
      );
    case 'date':
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <CustomDatePicker
            value={from}
            onChange={(value) => setFrom(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter(column.id, [value?.toISOString(), to])
            }
            slotProps={{
              textField: {
                variant: 'standard',
                placeholder: 'From',
                sx: getSxTextFieldPicker(160),
              },
              field: {
                clearable: true,
              },
            }}
          />
          -
          <CustomDatePicker
            value={to}
            onChange={(value) => setTo(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter(column.id, [from, value?.toISOString()])
            }
            slotProps={{
              textField: {
                variant: 'standard',
                placeholder: 'To',
                sx: getSxTextFieldPicker(160),
              },
              field: {
                clearable: true,
              },
            }}
          />
        </Box>
      );
    case 'time':
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <CustomTimePicker
            value={from}
            onChange={(value) => setFrom(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter(column.id, [value?.toISOString(), to])
            }
            slotProps={{
              textField: {
                variant: 'standard',
                placeholder: 'From',
                sx: getSxTextFieldPicker(96),

                field: {
                  clearable: true,
                },
              },
            }}
          />
          -
          <CustomTimePicker
            value={to}
            onChange={(value) => setTo(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter(column.id, [from, value?.toISOString()])
            }
            slotProps={{
              textField: {
                variant: 'standard',
                placeholder: 'To',
                sx: getSxTextFieldPicker(96),
              },
            }}
          />
        </Box>
      );
    case 'datetime':
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <CustomDateTimePicker
            value={from}
            onChange={(value) => setFrom(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter(column.id, [value?.toISOString(), to])
            }
            slotProps={{
              textField: {
                variant: 'standard',
                placeholder: 'From',
                sx: getSxTextFieldPicker(200),
              },
            }}
          />
          -
          <CustomDateTimePicker
            value={to}
            onChange={(value) => setTo(value?.toISOString() ?? null)}
            onAccept={(value) =>
              updateFilter(column.id, [from, value?.toISOString()])
            }
            slotProps={{
              textField: {
                variant: 'standard',
                placeholder: 'To',
                sx: getSxTextFieldPicker(200),
              },
            }}
          />
        </Box>
      );
    case 'option':
    case 'multiple':
      return <FacetedFilter column={column} table={table} />;
    case 'text':
    default:
      return (
        <TextField
          value={(columnFilterValue ?? '') as string}
          onChange={(e) => updateFilter(column.id, e.target.value)}
          placeholder="Search..."
          variant="standard"
        />
      );
  }
};

export default Filter;
