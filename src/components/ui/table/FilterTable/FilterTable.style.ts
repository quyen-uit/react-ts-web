import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

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
