import { useEffect, useMemo, useState } from 'react';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type ColumnSizingState,
  type ColumnPinningState,
} from '@tanstack/react-table';

interface UseFilterTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  allowRowSelection?: boolean;
  allowResize?: boolean;
}

export const useFilterTable = <T>({
  data,
  columns,
  setData,
  allowRowSelection = true,
  allowResize = true,
}: UseFilterTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ['select'],
    right: ['actions'],
  });
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [editedRow, setEditedRow] = useState<number | null>(null);
  const [originalRowData, setOriginalRowData] = useState<T | null>(null);

  const meta = useMemo(
    () => ({
      updateFilter: (columnId: string, value: unknown) => {
        setColumnFilters((prev) =>
          prev.filter((f) => f.id !== columnId).concat({ id: columnId, value })
        );
      },
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
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
    }),
    [setData]
  );

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
    enableRowSelection: allowRowSelection,
    enableColumnResizing: allowResize,
    meta,
  });

  useEffect(() => {
    setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
  }, [table]);

  return {
    table,
    globalFilter,
    setGlobalFilter,
    editedRow,
    setEditedRow,
    columnOrder,
    columnSizing,
    originalRowData,
    setOriginalRowData,
  };
};
