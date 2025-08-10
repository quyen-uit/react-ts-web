import { styled } from '@mui/material/styles';

export const SelectWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: 8,
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    paddingBottom: '3px',
    paddingRight: '8px !important',
    fontSize: theme.typography.fontSize,
    '& .MuiTypography-root': {
      fontSize: theme.typography.fontSize,
    },
  },
  '& .MuiIconButton-root': {
    visibility: 'hidden',
  },
  '&:hover .MuiIconButton-root': {
    visibility: 'visible',
  },
}));
