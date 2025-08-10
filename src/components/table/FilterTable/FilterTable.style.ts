import { darken, TableCell, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import { styled, type CSSProperties, type Theme } from '@mui/material/styles';
import type { Column } from '@tanstack/react-table';

export const getColumnPinningStyles = <T>(
  theme: Theme,
  column: Column<T, unknown>
): CSSProperties => {
  const isPinned = column.getIsPinned();
  if (isPinned === 'right') {
    // only actions pin to right
    return {
      boxShadow: '4px 0 4px -4px gray inset',
      right: 0,
      opacity: 0.95,
      position: 'sticky',
      zIndex: 1,
    };
  } else {
    const isLastLeftPinnedColumn =
      isPinned === 'left' && column.getIsLastColumn('left');

    return {
      boxShadow: isLastLeftPinnedColumn
        ? '-4px 0 4px -4px gray inset'
        : undefined,
      left: isPinned === 'left' ? column.getStart('left') : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? 'sticky' : 'relative',
      zIndex: isPinned ? 1 : 0,
      backgroundColor: isPinned
        ? theme.palette.background.paper + ' !important'
        : undefined,
    };
  }
};

interface TableWrapperProps {
  isFullScreen?: boolean;
}

export const TableWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFullScreen',
})<TableWrapperProps>(({ theme, isFullScreen }) => ({
  ...(isFullScreen && {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.background.paper,
    zIndex: 1300,
    overflow: 'auto',
  }),
}));

// Toolbar Components
export const ToolbarTitle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flex: '1 1 100%',
}));

// Header Components
export const ResizeBox = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'isResizing' && prop !== 'isHoverHeader',
})<{ isResizing: boolean; isHoverHeader: boolean }>(
  ({ theme, isResizing, isHoverHeader }) => ({
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: '5px',
    cursor: 'col-resize',
    userSelect: 'none',
    touchAction: 'none',
    backgroundColor: isResizing
      ? theme.palette.primary.main
      : isHoverHeader
        ? theme.palette.action.hover
        : 'transparent',
  })
);

// Body Components
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  '&:hover  td.MuiTableCell-root': {
    backgroundColor: darken(theme.palette.background.paper, 0.05),
  },
}));

interface StyledTableCellProps {
  column: Column<any, unknown>;
}

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'column',
})<StyledTableCellProps>(({ theme, column }) => ({
  width: `calc(var(--col-${column.id}-size) * 1px)`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  backgroundColor: 'inherit',
  '&:first-of-type': {
    paddingLeft: 8,
    backgroundColor: theme.palette.background.paper,
  },
  '&:last-child': {
    backgroundColor: theme.palette.background.paper,
  },
  flex: column.id === 'end' ? '1 1 auto' : undefined,
  ...getColumnPinningStyles(theme, column),
}));
