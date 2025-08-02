import { styled, type CSSProperties, type Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import type { Column } from '@tanstack/react-table';

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

export const getColumnPinningStyles = <T>(
  theme: Theme,
  column: Column<T, unknown>
): CSSProperties => {
  const isPinned = column.getIsPinned();
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
    backgroundColor: isPinned ? theme.palette.background.paper : undefined,
  };
};

// Toolbar Components
export const ToolbarTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  flex: '1 1 100%',
}));

// Header Components
export const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontWeight: theme.typography.fontWeightBold,
}));

export const HeaderIconButton = styled('div')({
  visibility: 'hidden',
  '&.visible': {
    visibility: 'visible',
  },
});
