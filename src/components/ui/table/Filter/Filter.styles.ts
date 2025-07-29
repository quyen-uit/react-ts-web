import { Box, TextField, styled } from '@mui/material';

export const datePickerSlotProps = {
  textField: {
    variant: 'standard' as const,
    sx: {
      width: 160,
      '& .MuiPickersInputBase-root': {
        fontSize: (theme: any) => theme.typography.fontSize,
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
      width: 96,
      '& .MuiPickersInputBase-root': {
        fontSize: (theme: any) => theme.typography.fontSize,
      },
    },
  },
};

export const dateTimePickerTextFieldStyles = {
  variant: 'standard' as const,
  sx: {
    width: 200,
    '& .MuiPickersInputBase-root': {
      fontSize: (theme: any) => theme.typography.fontSize,
    },
  },
};

export const dateTimePickerSlotProps = {
  textField: {
    variant: 'standard' as const,
    sx: {
      width: 200,
      '& .MuiPickersInputBase-root': {
        fontSize: (theme: any) => theme.typography.fontSize,
      },
    },
  },
};

export const FilterContainer = styled(Box)(() => ({
  display: 'flex',
  gap: 4,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: 120,
  '& .MuiInputBase-root': {
    fontSize: theme.typography.fontSize,
  },
}));

export const NumberTextField = styled(StyledTextField)({
  width: 64,
});
