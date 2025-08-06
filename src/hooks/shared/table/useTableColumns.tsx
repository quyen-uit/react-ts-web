import { useMemo, type ReactElement } from 'react';

import { Edit, Delete } from '@mui/icons-material';
import { Box, Checkbox, IconButton } from '@mui/material';
import { type ColumnDef, type Row } from '@tanstack/react-table';

import { COLUMN_SIZES } from '@/shared/constants/table.constants';

interface UseTableColumnsProps<T extends { id: string | number }> {
  columns: ColumnDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (ids: string[]) => void;
  renderRowActions?: (row: Row<T>) => ReactElement<typeof IconButton>[];
  actionNumber?: number;
}

export const useTableColumns = <T extends { id: string | number }>({
  columns,
  onEdit,
  onDelete,
  renderRowActions,
  actionNumber = 0,
}: UseTableColumnsProps<T>): ColumnDef<T>[] => {
  const columnsWithDefaults = useMemo<ColumnDef<T>[]>(() => {
    return columns.map((col: ColumnDef<T>) => {
      const type = col.meta?.type || 'text';
      const { minSize, size } = COLUMN_SIZES[type] ?? COLUMN_SIZES.text;
      return {
        minSize,
        size,
        maxSize: 500,
        ...col,
      };
    });
  }, [columns]);

  const columnsWithRowSelection = useMemo<ColumnDef<T>[]>(() => {
    const getActionSize = () => {
      let size = 0;
      if (onEdit) size += 56;
      if (onDelete) size += 56;
      if (renderRowActions) size += 40 * actionNumber;
      return size;
    };

    const selectColumn: ColumnDef<T> = {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          indeterminate={
            table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      enableResizing: false,
      size: 58,
    };

    const actionColumn: ColumnDef<T> = {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }: { row: Row<T> }) => (
        <Box>
          {onEdit && (
            <IconButton onClick={() => onEdit(row.original)}>
              <Edit />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={() => onDelete([String(row.original.id)])}>
              <Delete />
            </IconButton>
          )}
          {renderRowActions && renderRowActions(row)}
        </Box>
      ),
      enableSorting: false,
      enableResizing: false,
      size: getActionSize(),
    };

    const result: ColumnDef<T>[] = [selectColumn, ...columnsWithDefaults];

    if (onEdit || onDelete || renderRowActions) {
      result.push(actionColumn);
    }

    return result;
  }, [columnsWithDefaults, onEdit, onDelete, renderRowActions, actionNumber]);

  return columnsWithRowSelection;
};
