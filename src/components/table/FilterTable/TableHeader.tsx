'use no memo';

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
  Typography,
} from '@mui/material';
import { flexRender, type Header, type Table } from '@tanstack/react-table';

import { ResizeBox, getColumnPinningStyles } from './FilterTable.style';
import Filter from '../Filter/Filter';

interface TableHeaderProps<TData extends object> {
  table: Table<TData>;
  allowSorting?: boolean;
  allowPinning?: boolean;
  allowFiltering?: boolean;
  isFilter: boolean;
}

export const TableHeader = <TData extends object>({
  table,
  allowSorting,
  allowPinning,
  allowFiltering,
  isFilter,
}: TableHeaderProps<TData>) => {
  const theme = useTheme();
  const [hoveredColumnId, setHoveredColumnId] = useState<string | null>(null);
  const handleAutoResize = (header: Header<TData, unknown>) => {
    const columnId = header.column.id;
    const size = header.column.columnDef.size || 100;

    table.setColumnSizing((prev) => ({
      ...prev,
      [columnId]: size,
    }));
  };

  return (
    <TableHead>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow
          key={headerGroup.id}
          sx={{ verticalAlign: allowFiltering ? 'center' : 'top' }}
        >
          {headerGroup.headers.map((header) => (
            <TableCell
              key={header.id}
              onMouseEnter={() => setHoveredColumnId(header.id)}
              onMouseLeave={() => setHoveredColumnId(null)}
              sx={{
                ...getColumnPinningStyles(theme, header.column),
                width: `calc(var(--header-${header?.id}-size) * 1px)`,
                py: 1.5,
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
                    <Typography
                      noWrap={true}
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: `calc(var(--header-${header?.id}-size) * 1px - 80px )`,
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Typography>
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
                        hoveredColumnId === header.column.id &&
                        header.column.getIsPinned() != 'right'
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

              {header.column.getCanResize() && (
                <ResizeBox
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  onDoubleClick={() => handleAutoResize(header)}
                  isResizing={header.column.getIsResizing()}
                  isHoverHeader={
                    hoveredColumnId === header.id &&
                    !header.column.getIsResizing()
                  }
                />
              )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
};
