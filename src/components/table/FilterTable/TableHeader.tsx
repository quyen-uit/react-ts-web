'use no memo';
import { useState } from 'react';

import { PushPin as PushPinIcon } from '@mui/icons-material';
import {
  Box,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import { flexRender, type Header, type Table } from '@tanstack/react-table';

import { ResizeBox, StyledTableCell } from './FilterTable.style';
import Filter from '../Filter/Filter';

interface TableHeaderProps<TData extends object> {
  table: Table<TData>;
  allowSorting?: boolean;
  allowPinning?: boolean;
  isFilter: boolean;
}

export const TableHeader = <TData extends object>({
  table,
  allowSorting,
  allowPinning,
  isFilter,
}: TableHeaderProps<TData>) => {
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
        <TableRow key={headerGroup.id} sx={{ display: 'flex' }}>
          {headerGroup.headers.map((header) => (
            <StyledTableCell
              key={header.id}
              onMouseEnter={() => setHoveredColumnId(header.id)}
              onMouseLeave={() => setHoveredColumnId(null)}
              column={header.column}
              isFilter={isFilter}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TableSortLabel
                  active={header.column.getIsSorted() !== false}
                  disabled={
                    !(allowSorting && header.column.getCanSort()) &&
                    header.column.id !== 'select'
                  }
                  hideSortIcon={header.column.id === 'select'}
                  direction={
                    header.column.getIsSorted() === 'asc' ? 'asc' : 'desc'
                  }
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.column.columnDef.id !== 'select' ? (
                    <Tooltip
                      title={flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      arrow
                      placement="top-start"
                    >
                      <Typography
                        noWrap={true}
                        variant="subtitle2"
                        fontWeight={'bold'}
                        sx={{
                          width: `calc(var(--header-${header?.id}-size) * 1px - 80px )`,
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Typography>
                    </Tooltip>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </TableSortLabel>
                {allowPinning &&
                  header.column.getCanPin() &&
                  !['select', 'actions'].includes(header.column.id) && (
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
              {isFilter && header.column.getCanFilter() ? (
                <Filter column={header.column} table={table} />
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
            </StyledTableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
};
