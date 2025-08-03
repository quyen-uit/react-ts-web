import { Box, styled, type Theme } from '@mui/material';

import { ClearableTextField } from '../../input';

export const datePickerSlotProps = {
  textField: {
    variant: 'standard' as const,
    sx: {
      width: '100%',
      '& .MuiPickersInputBase-root': {
        fontSize: (theme: Theme) => theme.typography.fontSize,
      },
    },
  },
  field: {
    clearable: true,
  },
};

export const timePickerSlotProps = {
  textField: {
    variant: 'standard' as const,
    sx: {
      width: '100%',
      '& .MuiPickersInputBase-root': {
        fontSize: (theme: Theme) => theme.typography.fontSize,
      },
    },
  },
  field: {
    clearable: true,
  },
};

export const dateTimePickerSlotProps = {
  textField: {
    variant: 'standard' as const,
    sx: {
      width: '100%',
      '& .MuiPickersInputBase-root': {
        fontSize: (theme: Theme) => theme.typography.fontSize,
      },
    },
  },
  field: {
    clearable: true,
  },
};

export const FilterContainer = styled(Box)(() => ({
  display: 'flex',
  gap: 4,
}));

export const StyledTextField = styled(ClearableTextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    fontSize: theme.typography.fontSize,
  },
}));

export const NumberTextField = styled(StyledTextField)({});
