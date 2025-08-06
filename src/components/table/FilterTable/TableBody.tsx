'use no memo';

import {
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
  useTheme,
} from '@mui/material';
import { flexRender, type Table } from '@tanstack/react-table';

import { getColumnPinningStyles } from './FilterTable.style';

interface TableBodyProps<T> {
  table: Table<T>;
  editedRow: number | null;
  setEditedRow: (index: number | null) => void;
  setOriginalRowData: (data: T | null) => void;
  onEdit?: (row: T) => void;
}

const TableBodyComponent = <T,>({
  table,
  editedRow,
  setEditedRow,
  setOriginalRowData,
}: TableBodyProps<T>) => {
  const theme = useTheme();

  return (
    <MuiTableBody>
      {table.getRowModel().rows.map((row, index) => (
        <TableRow
          key={row.id}
          data-row-index={index}
          onDoubleClick={() => {
            setOriginalRowData(row.original);
            setEditedRow(index);
          }}
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
        </TableRow>
      ))}
    </MuiTableBody>
  );
};

export const TableBody = TableBodyComponent;
