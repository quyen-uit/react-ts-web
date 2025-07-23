import { Box, TextField } from '@mui/material';
import FacetedFilter from './faceted-filter';
import type { Column, Table } from '@tanstack/react-table';
import React from 'react';

interface FilterProps {
  column: Column<any, any>;
  table: Table<any>;
}

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
            placeholder="Min"
            variant="standard"
          />
          <TextField
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(e) =>
              updateFilter(column.id, [
                (columnFilterValue as [number, number])?.[0],
                e.target.value,
              ])
            }
            placeholder="Max"
            variant="standard"
          />
        </Box>
      );
    case 'date':
    case 'time':
    case 'datetime':
      return (
        <div>
          <TextField
            type={type}
            value={(columnFilterValue as [string, string])?.[0] ?? ''}
            onChange={(e) =>
              updateFilter(column.id, [e.target.value, (columnFilterValue as [string, string])?.[1]])
            }
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            type={type}
            value={(columnFilterValue as [string, string])?.[1] ?? ''}
            onChange={(e) =>
              updateFilter(column.id, [(columnFilterValue as [string, string])?.[0], e.target.value])
            }
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
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
