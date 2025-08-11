import React from 'react';

import { Box } from '@mui/material';
import type { DatePickerSlotProps } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';

import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';

interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface CustomDateRangePickerProps {
  value: DateRange;
  onChange: (newValue: DateRange) => void;
  slotProps?: DatePickerSlotProps<true>;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  value,
  onChange,
  slotProps,
}) => {
  const handleStartDateChange = (startDate: Dayjs | null) => {
    onChange({ ...value, startDate });
  };

  const handleEndDateChange = (endDate: Dayjs | null) => {
    onChange({ ...value, endDate });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        width: '100%',
        '& .MuiFormControl-root': {
          flex: 1,
          minWidth: 120,
        },
      }}
    >
      <CustomDatePicker
        value={value.startDate}
        onChange={handleStartDateChange}
        maxDate={value.endDate ?? undefined}
        slotProps={slotProps}
      />
      <CustomDatePicker
        value={value.endDate}
        onChange={handleEndDateChange}
        minDate={value.startDate ?? undefined}
        slotProps={slotProps}
      />
    </Box>
  );
};

export default CustomDateRangePicker;
