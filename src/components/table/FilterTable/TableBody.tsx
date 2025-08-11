'use no memo';
import { useEffect, useState } from 'react';

import { TableBody as MuiTableBody, Typography } from '@mui/material';
import { flexRender, type Table } from '@tanstack/react-table';

import { showConfirmAlert } from '@/components/alert';

import { StyledTableCell, StyledTableRow } from './FilterTable.style';

interface TableBodyProps<T> {
  table: Table<T>;
  density: number;
  editedRow: number | null;
  setEditedRow: (index: number | null) => void;
  originalRowData: T | null;
  setOriginalRowData: (data: T | null) => void;
  onEdit?: (row: T) => void;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
}

const TableBodyComponent = <T,>({
  table,
  editedRow,
  setEditedRow,
  originalRowData,
  setOriginalRowData,
  setData,
  density,
}: TableBodyProps<T>) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editedRow !== null && !isAlertOpen) {
        const tableRow = document.querySelector(
          `[data-row-index="${editedRow}"]`
        );
        if (tableRow && !tableRow.contains(event.target as Node)) {
          setIsAlertOpen(true);
          showConfirmAlert({
            title: 'Exit Edit Mode?',
            text: 'Are you sure you want to exit without saving?',
            onConfirm: () => {
              if (editedRow !== null && originalRowData) {
                setData((prev) =>
                  prev.map((row, index) =>
                    index === editedRow ? originalRowData : row
                  )
                );
              }
              setEditedRow(null);
              setOriginalRowData(null);
              setIsAlertOpen(false);
            },
            onCancel: () => {
              setIsAlertOpen(false);
            },
          });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    editedRow,
    isAlertOpen,
    originalRowData,
    setData,
    setEditedRow,
    setOriginalRowData,
  ]);

  return (
    <MuiTableBody>
      {table.getRowModel().rows.map((row, index) => (
        <StyledTableRow
          key={row.id}
          data-row-index={index}
          onDoubleClick={() => {
            setOriginalRowData(row.original);
            setEditedRow(index);
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <StyledTableCell
              key={cell.id}
              column={cell.column}
              density={density}
            >
              {editedRow === index ? (
                <Typography noWrap data-lines={2}>
                  {flexRender(cell.column.columnDef.cell, {
                    ...cell.getContext(),
                    isEditing: true,
                  })}
                </Typography>
              ) : (
                flexRender(cell.column.columnDef.cell, cell.getContext())
              )}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))}
    </MuiTableBody>
  );
};

export const TableBody = TableBodyComponent;
// export const TableBody = React.memo(
//   TableBodyComponent,
//   (prev, next) => prev.table.options.data === next.table.options.data
// ) as typeof TableBodyComponent;
