import {
  Box,
  Checkbox,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  ViewColumn as ViewColumnIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  PushPin as PushPinIcon,
} from '@mui/icons-material';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  ColumnSizingState,
  ColumnPinningState,
} from '@tanstack/react-table';
import React from 'react';
import { TableWrapper } from './FilterTable.style';
import Filter from '../Filter/Filter';
import { showConfirmAlert } from '../../alert/common/ConfirmAlert';

import SearchIcon from '@mui/icons-material/Search';

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  title: string;
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  onAdd?: () => void;
  onDelete?: (ids: string[]) => void;
  onEdit?: (row: T) => void;
  allowPinning?: boolean;
  allowFiltering?: boolean;
  allowFullscreen?: boolean;
  allowSorting?: boolean;
}

const FilterTable = <T,>({
  data,
  columns,
  setData,
  onAdd,
  onDelete,
  onEdit,
  title,
  allowPinning = true,
  allowFiltering = true,
  allowFullscreen = true,
  allowSorting = true,
}: TableProps<T>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    {}
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [isFilter, setisFilter] = React.useState(true);
  const [editedRow, setEditedRow] = React.useState<number | null>(null);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [columnOrder, setColumnOrder] = React.useState<string[]>([]);

  React.useEffect(() => {
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
              setEditedRow(null);
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
  }, [editedRow, isAlertOpen]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const toggleFilter = () => {
    setisFilter((prev) => !prev);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnFilters,
      columnVisibility,
      columnSizing,
      columnPinning,
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    onColumnPinningChange: setColumnPinning,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    columnResizeMode: 'onChange',
    meta: {
      updateFilter: (columnId: string, value: any) => {
        setColumnFilters((prev) =>
          prev.filter((f) => f.id !== columnId).concat({ id: columnId, value })
        );
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  React.useEffect(() => {
    setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
  }, [table]);

  const getTotalLeft = (table: any, columnId: string) => {
    const leftColumns = table.getLeftLeafColumns();
    const columnIndex = leftColumns.findIndex(
      (col: { id: string }) => col.id === columnId
    );
    return leftColumns
      .slice(0, columnIndex)
      .reduce(
        (acc: number, col: { getSize: () => number }) => acc + col.getSize(),
        0
      );
  };

  return (
    <TableWrapper isFullScreen={isFullScreen}>
      <Toolbar>
        <Typography
          variant="h5"
          fontWeight={700}
          component="div"
          sx={{ flex: '1 1 100%' }}
        >
          {title}
          {isFilter && (
            <IconButton aria-label="search">
              <SearchIcon color="primary" />
            </IconButton>
          )}
        </Typography>

        <TextField
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          variant="standard"
          placeholder="Search"
        />
        <Tooltip title="Toggle Column Visibility">
          <IconButton onClick={handleMenuOpen} color="primary">
            <ViewColumnIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {table.getAllLeafColumns().map((column) => (
            <MenuItem key={column.id}>
              <Checkbox
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {column.id}
            </MenuItem>
          ))}
        </Menu>
        {allowFullscreen && (
          <Tooltip title="Toggle Fullscreen">
            <IconButton onClick={toggleFullScreen} color="primary">
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
        )}
        {allowFiltering && (
          <Tooltip title="Filter" color="primary">
            <IconButton onClick={toggleFilter}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
        {onAdd && (
          <Tooltip title="Add">
            <IconButton onClick={onAdd}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip title="Remove Selected">
            <IconButton
              onClick={() => {
                const selectedIds = table
                  .getSelectedRowModel()
                  .rows.map((row) => (row.original as any).id);
                onDelete(selectedIds);
              }}
              disabled={table.getSelectedRowModel().rows.length === 0}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>

      <Paper
        elevation={3}
        sx={{
          overflow: 'auto',
        }}
      >
        <TableContainer>
          <MuiTable
            sx={{
              tableLayout: 'fixed',
            }}
          >
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <TableCell
                    padding="checkbox"
                    sx={{
                      position: 'sticky',
                      left: 0,
                      zIndex: 1,
                      backgroundColor: 'white',
                    }}
                  >
                    <Checkbox
                      indeterminate={
                        table.getIsSomeRowsSelected() &&
                        !table.getIsAllRowsSelected()
                      }
                      checked={table.getIsAllRowsSelected()}
                      onChange={table.getToggleAllRowsSelectedHandler()}
                    />
                  </TableCell>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{
                        fontWeight: 'bold',
                        width: header.getSize(),
                        minWidth: header.getSize(),
                        position: header.column.getIsPinned()
                          ? 'sticky'
                          : 'relative',
                        left: header.column.getIsPinned()
                          ? `${getTotalLeft(table, header.column.id) + 44}px`
                          : 'auto',
                        zIndex: header.column.getIsPinned() ? 1 : 0,
                        backgroundColor: header.column.getIsPinned()
                          ? '#f0f0f0'
                          : 'white',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        {allowSorting ? (
                          <TableSortLabel
                            active={header.column.getIsSorted() !== false}
                            direction={
                              header.column.getIsSorted() === 'asc'
                                ? 'asc'
                                : 'desc'
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </TableSortLabel>
                        ) : (
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        )}
                        {allowPinning && header.column.id !== 'select' && (
                          <IconButton
                            onClick={() =>
                              header.column.pin(
                                header.column.getIsPinned() ? false : 'left'
                              )
                            }
                            size="small"
                          >
                            <PushPinIcon
                              fontSize="small"
                              color={
                                header.column.getIsPinned()
                                  ? 'primary'
                                  : 'disabled'
                              }
                            />
                          </IconButton>
                        )}
                      </Box>
                      {allowFiltering &&
                      isFilter &&
                      header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                      <Box
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        sx={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          height: '100%',
                          width: '5px',
                          cursor: 'col-resize',
                          userSelect: 'none',
                          touchAction: 'none',
                          backgroundColor: header.column.getIsResizing()
                            ? 'blue'
                            : 'transparent',
                          '&:hover': {
                            backgroundColor: 'lightblue',
                          },
                        }}
                      />
                    </TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-row-index={index}
                  onDoubleClick={() => setEditedRow(index)}
                  sx={{
                    cursor: 'pointer',
                    ':hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <TableCell
                    padding="checkbox"
                    sx={{
                      position: 'sticky',
                      left: 0,
                      zIndex: 1,
                      backgroundColor: 'white',
                    }}
                  >
                    <Checkbox
                      checked={row.getIsSelected()}
                      onChange={row.getToggleSelectedHandler()}
                    />
                  </TableCell>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{
                        position: cell.column.getIsPinned()
                          ? 'sticky'
                          : 'relative',
                        left: cell.column.getIsPinned()
                          ? `${getTotalLeft(table, cell.column.id) + 44}px`
                          : 'auto',
                        zIndex: cell.column.getIsPinned() ? 1 : 0,
                        backgroundColor: cell.column.getIsPinned()
                          ? '#f0f0f0'
                          : 'white',
                      }}
                    >
                      {editedRow === index
                        ? flexRender(cell.column.columnDef.cell, {
                            ...cell.getContext(),
                            isEditing: true,
                          })
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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
            </TableBody>
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
