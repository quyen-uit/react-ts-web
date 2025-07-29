import { Box, styled } from '@mui/material';

export const SelectWrapper = styled(Box)(({ theme }) => ({
  minWidth: 120,
  fontSize: theme.typography.fontSize,
  '& .MuiSelect-select': {
    fontSize: theme.typography.fontSize,
  },
  '& .MuiTypography-root': {
    fontSize: theme.typography.fontSize,
  },
}));
