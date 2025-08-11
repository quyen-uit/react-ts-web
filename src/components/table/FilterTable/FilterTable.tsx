import { useMemo, useState, type ReactElement } from 'react';

import {
  IconButton,
  TableContainer,
  TablePagination,
  Paper,
  Table,
} from '@mui/material';
import {
  type ColumnDef,
  type Row,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table';

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
  onSearch?: (filters: ColumnFiltersState, sorting: SortingState) => void;
  renderRowActions?: (row: Row<T>) => ReactElement<typeof IconButton>[];
  rowActionNumber?: number;
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
  onSearch,
  renderRowActions,
  title,
  allowPinning = true,
  allowFiltering = true,
  allowFullscreen = true,
  allowSorting = true,
  allowRowSelection = true,
  allowResize = true,
  extraActions,
  rowActionNumber = 0,
}: TableProps<T>) => {
  const {
    isFullScreen,
    toggleFullScreen,
    isFilter,
    toggleFilter,
    density,
    handleDensityChange,
  } = useTableUIState({ allowFiltering });
  const [editedRow, setEditedRow] = useState<number | null>(null);

  const tableColumns = useTableColumns({
    columns,
    onEdit,
    onDelete,
    renderRowActions,
    rowActionNumber,
    editedRow,
    setEditedRow,
  });

  const {
    table,
    globalFilter,
    setGlobalFilter,
    originalRowData,
    setOriginalRowData,
    handleSearch,
  } = useFilterTable({
    data,
    columns: tableColumns,
    setData,
    allowRowSelection,
    allowResize,
    editedRow,
    onSearch,
  });

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }

    return colSizes;
    // eslint-disable-next-line react-hooks/react-compiler, react-hooks/exhaustive-deps
  }, [table.getState().columnSizing, table.getState().columnVisibility]);

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
        onSearch={handleSearch}
      />

      <Paper
        elevation={3}
        sx={{
          overflow: 'auto',
        }}
      >
        <TableContainer sx={{ ...columnSizeVars }}>
          <Table size={'small'}>
            <TableHeader
              table={table}
              allowSorting={allowSorting}
              allowPinning={allowPinning}
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
              density={density}
            />
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={table.getCoreRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
      />
    </TableWrapper>
  );
};

export default FilterTable;
