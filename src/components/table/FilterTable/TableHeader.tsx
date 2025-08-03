import { useState } from 'react';

import { PushPin as PushPinIcon } from '@mui/icons-material';
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  useTheme,
} from '@mui/material';
import { flexRender, type Table } from '@tanstack/react-table';

import { getColumnPinningStyles } from './FilterTable.style';
import Filter from '../Filter/Filter';

interface TableHeaderProps<TData extends object> {
  table: Table<TData>;
  allowSorting?: boolean;
  allowPinning?: boolean;
  allowFiltering?: boolean;
  isFilter: boolean;
  density: 'compact' | 'standard' | 'comfortable';
}

export const TableHeader = <TData extends object>({
  table,
  allowSorting,
  allowPinning,
  allowFiltering,
  isFilter,
  density,
}: TableHeaderProps<TData>) => {
  const theme = useTheme();
  const [hoveredColumnId, setHoveredColumnId] = useState<string | null>(null);

  const getPadding = () => {
    switch (density) {
      case 'compact':
        return '8px';
      case 'comfortable':
        return '24px';
      case 'standard':
      default:
        return '16px';
    }
  };

  return (
    <TableHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableCell
              key={header.id}
              onMouseEnter={() => setHoveredColumnId(header.id)}
              onMouseLeave={() => setHoveredColumnId(null)}
              sx={{
                ...getColumnPinningStyles(theme, header.column),
                width: `calc(var(--header-${header?.id}-size) * 1px)`,
                padding: getPadding(),
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontWeight: 'bold',
                }}
              >
                {allowSorting && header.column.getCanSort() ? (
                  <TableSortLabel
                    active={header.column.getIsSorted() !== false}
                    direction={
                      header.column.getIsSorted() === 'asc' ? 'asc' : 'desc'
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
                    sx={{
                      visibility:
                        hoveredColumnId === header.column.id ||
                        header.column.getIsPinned()
                          ? 'visible'
                          : 'hidden',
                    }}
                    size="small"
                  >
                    <PushPinIcon
                      fontSize="inherit"
                      color={
                        header.column.getIsPinned() ? 'primary' : 'disabled'
                      }
                    />
                  </IconButton>
                )}
              </Box>
              {allowFiltering && isFilter && header.column.getCanFilter() ? (
                <div>
                  <Filter column={header.column} table={table} />
                </div>
              ) : null}
              <Box
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                sx={(theme) => ({
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  width: '5px',
                  cursor: 'col-resize',
                  userSelect: 'none',
                  touchAction: 'none',
                  backgroundColor: header.column.getIsResizing()
                    ? theme.palette.primary.main
                    : hoveredColumnId === header.id
                      ? theme.palette.action.hover
                      : 'transparent',
                })}
              />
            </TableCell>
          ))}
          <TableCell>Actions</TableCell>
        </TableRow>
      ))}
    </TableHead>
  );
};
