import { TextField } from '@mui/material';
import type { Column } from '@tanstack/react-table';
import React from 'react';

interface FilterProps {
  column: Column<any, any>;
}

const Filter: React.FC<FilterProps> = ({ column }) => {
  const columnFilterValue = column.getFilterValue();

  switch (column.columnDef.meta?.type) {
    case 'number':
      return (
        <div>
          <TextField
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value,
                old?.[1],
              ])
            }
            placeholder="Min"
          />
          <TextField
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value,
              ])
            }
            placeholder="Max"
          />
        </div>
      );
    case 'date':
    case 'time':
    case 'datetime':
      return (
        <div>
          <TextField
            type={column.columnDef.meta.type}
            value={(columnFilterValue as [string, string])?.[0] ?? ''}
            onChange={(e) =>
              column.setFilterValue((old: [string, string]) => [
                e.target.value,
                old?.[1],
              ])
            }
          />
          <TextField
            type={column.columnDef.meta.type}
            value={(columnFilterValue as [string, string])?.[1] ?? ''}
            onChange={(e) =>
              column.setFilterValue((old: [string, string]) => [
                old?.[0],
                e.target.value,
              ])
            }
          />
        </div>
      );
    default:
      return (
        <TextField
          value={(columnFilterValue ?? '') as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder="Search..."
        />
      );
  }
};

export default Filter;
