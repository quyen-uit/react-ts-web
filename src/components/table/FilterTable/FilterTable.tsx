'use no memo';
import { useMemo, type ReactElement } from 'react';

import {
  IconButton,
  Table as MuiTable,
  TableContainer,
  TablePagination,
  Paper,
} from '@mui/material';
import { type ColumnDef, type Row } from '@tanstack/react-table';

import { useFilterTable, useTableColumns, useTableUIState } from '@/hooks';

import { TableWrapper } from './FilterTable.style';
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
  renderRowActions?: (row: Row<T>) => ReactElement<typeof IconButton>[];
  actionNumber?: number;
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
  actionNumber = 0,
}: TableProps<T>) => {
  const {
    isFullScreen,
    toggleFullScreen,
    isFilter,
    toggleFilter,
    density,
    handleDensityChange,
  } = useTableUIState();

  const tableColumns = useTableColumns({
    columns,
    onEdit,
    onDelete,
    renderRowActions,
    actionNumber,
  });

  const {
    table,
    globalFilter,
    setGlobalFilter,
    editedRow,
    setEditedRow,
    columnSizing,
    originalRowData,
    setOriginalRowData,
  } = useFilterTable({
    data,
    columns: tableColumns,
    setData,
    allowRowSelection,
    allowResize,
  });

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
            size={'small'}
            sx={{
              tableLayout: 'fixed',
              '& .MuiTableCell-sizeSmall': {
                '&:first-of-type': {
                  pl: 1,
                },
              },
              '& td.MuiTableCell-sizeSmall': {
                py: density,
                px: 2,
              },
            }}
          >
            <TableHeader
              table={table}
              allowSorting={allowSorting}
              allowPinning={allowPinning}
              allowFiltering={allowFiltering}
              isFilter={isFilter}
            />
            <TableBody
              table={table}
              editedRow={editedRow}
              setEditedRow={setEditedRow}
              onEdit={onEdit}
              originalRowData={originalRowData}
              setOriginalRowData={setOriginalRowData}
              setData={setData}
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
