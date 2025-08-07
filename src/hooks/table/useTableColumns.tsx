import { useMemo, type ReactElement } from 'react';

import { Delete, Edit, Save } from '@mui/icons-material';
import { Box, Checkbox, IconButton } from '@mui/material';
import { type ColumnDef, type Row } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { COLUMN_SIZES } from '@/shared/constants/table.constants';

interface UseTableColumnsProps<T extends { id: string | number }> {
  columns: ColumnDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (ids: string[]) => void;
  renderRowActions?: (row: Row<T>) => ReactElement<typeof IconButton>[];
  rowActionNumber?: number;
  editedRow?: number | null;
  setEditedRow?: (index: number | null) => void;
}

export const useTableColumns = <T extends { id: string | number }>({
  columns,
  onEdit,
  onDelete,
  renderRowActions,
  rowActionNumber = 0,
  editedRow,
  setEditedRow,
}: UseTableColumnsProps<T>): ColumnDef<T>[] => {
  const { t } = useTranslation();
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
      let size = onEdit ? 56 : 0;
      size += onDelete ? 56 : 0;
      size += rowActionNumber * 40;
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
      cell: ({ row, cell }) => {
        const isEditing =
          cell.getContext().table.options.meta?.isEditing &&
          editedRow === row.index;
        return isEditing ? (
          <IconButton
            onClick={() => {
              onEdit?.(row.original);
              setEditedRow?.(null);
            }}
          >
            <Save />
          </IconButton>
        ) : (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={editedRow !== null}
            onChange={() => {
              if (editedRow === null) {
                row.getToggleSelectedHandler()?.(!row.getIsSelected());
              }
            }}
          />
        );
      },
      enableSorting: false,
      enableResizing: false,
      size: 58,
    };

    const actionColumn: ColumnDef<T> = {
      id: 'actions',
      header: t('table_columns.actions'),
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
  }, [
    columnsWithDefaults,
    onEdit,
    onDelete,
    renderRowActions,
    rowActionNumber,
    t,
  ]);

  return columnsWithRowSelection;
};
