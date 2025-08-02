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
import { useEffect, useState } from 'react';
import { showConfirmAlert } from '../../../alert/common/ConfirmAlert';

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
    right: ['action'],
  });
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [editedRow, setEditedRow] = useState<number | null>(null);
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
  };
};
