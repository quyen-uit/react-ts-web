import { Box, TextField } from '@mui/material';
import FacetedFilter from './FacetedFilter';
import type { Column, Table } from '@tanstack/react-table';
import React from 'react';

interface FilterProps {
  column: Column<any, any>;
  table: Table<any>;
}

const commonInputSx = {
  minWidth: 120,
  '& .MuiInputBase-root': {
    fontSize: 14,
  },
};

const commonSmallInputSx = {
  minWidth: 96,
  '& .MuiInputBase-root': {
    fontSize: 14,
  },
};

const Filter: React.FC<FilterProps> = ({ column, table }) => {
  const columnFilterValue = column.getFilterValue();
  const { type } = column.columnDef.meta || {};
  const { updateFilter } = table.options.meta as any;

  switch (type) {
    case 'number':
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(e) =>
              updateFilter(column.id, [
                e.target.value,
                (columnFilterValue as [number, number])?.[1],
              ])
            }
            placeholder="From"
            variant="standard"
            sx={commonSmallInputSx}
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
            sx={commonSmallInputSx}
          />
        </Box>
      );
    case 'date':
    case 'time':
    case 'datetime':
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            type={type}
            value={(columnFilterValue as [string, string])?.[0] ?? ''}
            onChange={(e) =>
              updateFilter(column.id, [
                e.target.value,
                (columnFilterValue as [string, string])?.[1],
              ])
            }
            variant="standard"
            sx={commonInputSx}
          />
          -
          <TextField
            type={type}
            value={(columnFilterValue as [string, string])?.[1] ?? ''}
            onChange={(e) =>
              updateFilter(column.id, [
                (columnFilterValue as [string, string])?.[0],
                e.target.value,
              ])
            }
            variant="standard"
            sx={commonInputSx}
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
          sx={commonInputSx}
        />
      );
  }
};

export default Filter;
