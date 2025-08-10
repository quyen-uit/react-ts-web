import { useMemo, useState } from 'react';

import {
  getCoreRowModel,
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
  editedRow?: number | null;
  setEditedRow?: (index: number | null) => void;
  onSearch?: (filters: ColumnFiltersState, sorting: SortingState) => void;
}

export const useFilterTable = <T>({
  data,
  columns,
  setData,
  allowRowSelection = false,
  allowResize = false,
  editedRow,
  onSearch,
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
  // const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [originalRowData, setOriginalRowData] = useState<T | null>(null);

  const meta = useMemo(
    () => ({
      isEditing: editedRow !== null,
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
    [setData, editedRow]
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
      // columnOrder,
    },
    // onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    onColumnPinningChange: setColumnPinning,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
    enableRowSelection: allowRowSelection,
    enableColumnResizing: allowResize,
    meta,
  });

  // useEffect(() => {
  //   setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
  // }, [table]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(columnFilters, sorting);
    }
  };

  return {
    table,
    globalFilter,
    setGlobalFilter,
    originalRowData,
    setOriginalRowData,
    handleSearch,
  };
};
