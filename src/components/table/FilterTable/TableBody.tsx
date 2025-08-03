import React from 'react';

import { Save as SaveIcon, Edit as EditIcon } from '@mui/icons-material';
import {
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  IconButton,
  useTheme,
} from '@mui/material';
import { flexRender, type Table } from '@tanstack/react-table';

import { getColumnPinningStyles } from './FilterTable.style';

interface TableBodyProps<T> {
  table: Table<T>;
  editedRow: number | null;
  setEditedRow: (index: number | null) => void;
  onEdit?: (row: T) => void;
  density: 'compact' | 'standard' | 'comfortable';
}

const TableBodyComponent = <T,>({
  table,
  editedRow,
  setEditedRow,
  onEdit,
  density,
}: TableBodyProps<T>) => {
  const theme = useTheme();
  const getPadding = () => {
    switch (density) {
      case 'compact':
        return '8px';
      case 'comfortable':
        return '24px';
      case 'standard':
      default:
        return '16px';
    }
  };

  return (
    <MuiTableBody>
      {table.getRowModel().rows.map((row, index) => (
        <TableRow
          key={row.id}
          data-row-index={index}
          onDoubleClick={() => setEditedRow(index)}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.action.hover,
            },
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              sx={{
                ...getColumnPinningStyles(theme, cell.column),
                padding: getPadding(),
              }}
            >
              {editedRow === index
                ? flexRender(cell.column.columnDef.cell, {
                    ...cell.getContext(),
                    isEditing: true,
                  })
                : flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
          <TableCell>
            {editedRow === index ? (
              <IconButton onClick={() => setEditedRow(null)}>
                <SaveIcon />
              </IconButton>
            ) : (
              onEdit && (
                <IconButton onClick={() => onEdit(row.original)}>
                  <EditIcon />
                </IconButton>
              )
            )}
          </TableCell>
        </TableRow>
      ))}
    </MuiTableBody>
  );
};

export const TableBody = React.memo(
  TableBodyComponent
) as typeof TableBodyComponent;
