import { useMemo, useState } from 'react';

import { Edit, Delete } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  IconButton,
  Table as MuiTable,
  TableContainer,
  TablePagination,
  Paper,
} from '@mui/material';
import { type ColumnDef, type Row } from '@tanstack/react-table';

import { TableWrapper } from './FilterTable.style';
import { useFilterTable } from './hooks/useFilterTable';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TableToolbar, type ExtraAction } from './TableToolbar';
interface TableProps<T extends { id: string | number }> {
  columns: ColumnDef<T>[];
  data: T[];
  title: string;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  onAdd?: () => void;
  onDelete?: (ids: string[]) => void;
  onEdit?: (row: T) => void;
  renderRowActions?: (row: Row<T>) => React.ReactNode;
  allowPinning?: boolean;
  allowFiltering?: boolean;
  allowFullscreen?: boolean;
  allowSorting?: boolean;
  allowRowSelection?: boolean;
  allowResize?: boolean;
  extraActions?: ExtraAction[];
}

const FilterTable = <T extends { id: string | number }>({
  data,
  columns,
  setData,
  onAdd,
  onDelete,
  onEdit,
  renderRowActions,
  title,
  allowPinning = true,
  allowFiltering = true,
  allowFullscreen = true,
  allowSorting = true,
  allowRowSelection = true,
  allowResize = true,
  extraActions,
}: TableProps<T>) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFilter, setisFilter] = useState(true);
  const [density, setDensity] = useState<
    'compact' | 'standard' | 'comfortable'
  >('standard');

  // Column size calculation function
  const getMinSizeForColumn = (type: string) => {
    switch (type) {
      case 'boolean':
        return 80;
      case 'date':
        return 180;
      case 'time':
        return 150;
      case 'datetime':
        return 220;
      case 'option':
        return 200;
      case 'multiple':
        return 250;
      default:
        return 150;
    }
  };

  // Column mapping with default values (auto-memoized by React 19)
  const columnsWithDefaults = columns.map((col: ColumnDef<T>) => ({
    minSize: getMinSizeForColumn(col.meta?.type || 'text'),
    ...col,
  }));

  // Memoize columns with row selection
  const columnsWithRowSelection = useMemo<ColumnDef<T>[]>(() => {
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
      size: 72,
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
    };

    const result: ColumnDef<T>[] = [selectColumn, ...columnsWithDefaults];

    if (onEdit || onDelete || renderRowActions) {
      result.push(actionColumn);
    }

    return result;
  }, [columnsWithDefaults, onEdit, onDelete, renderRowActions]);

  const {
    table,
    globalFilter,
    setGlobalFilter,
    editedRow,
    setEditedRow,
    columnSizing,
  } = useFilterTable({
    data,
    columns: columnsWithRowSelection,
    setData,
    allowRowSelection,
    allowResize,
  });

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const toggleFilter = () => {
    setisFilter((prev) => !prev);
  };

  const handleDensityChange = (
    newDensity: 'compact' | 'standard' | 'comfortable'
  ) => {
    setDensity(newDensity);
  };

  // Memoize column size variables to prevent unnecessary re-renders
  const columnSizeVars = useMemo(() => {
    if (columnSizing) {
      const headers = table.getFlatHeaders();
      const colSizes: { [key: string]: number } = {};
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i]!;
        colSizes[`--header-${header.id}-size`] = header.getSize();
        colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
      }
      return colSizes;
    }
  }, [columnSizing, table]);

  return (
    <TableWrapper isFullScreen={isFullScreen}>
      <TableToolbar
        table={table}
        title={title}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        onAdd={onAdd}
        onDelete={onDelete}
        allowFullscreen={allowFullscreen}
        isFullScreen={isFullScreen}
        toggleFullScreen={toggleFullScreen}
        allowFiltering={allowFiltering}
        isFilter={isFilter}
        toggleFilter={toggleFilter}
        extraActions={extraActions}
        density={density}
        onDensityChange={handleDensityChange}
      />

      <Paper
        elevation={3}
        sx={{
          overflow: 'auto',
        }}
      >
        <TableContainer sx={{ ...columnSizeVars }}>
          <MuiTable
            sx={{
              tableLayout: 'fixed',
            }}
          >
            <TableHeader
              table={table}
              allowSorting={allowSorting}
              allowPinning={allowPinning}
              allowFiltering={allowFiltering}
              isFilter={isFilter}
              density={density}
            />
            <TableBody
              table={table}
              editedRow={editedRow}
              setEditedRow={setEditedRow}
              onEdit={onEdit}
              density={density}
            />
          </MuiTable>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
      />
    </TableWrapper>
  );
};

export default FilterTable;
