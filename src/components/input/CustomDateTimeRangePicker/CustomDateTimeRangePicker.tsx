import React from 'react';

import { Box } from '@mui/material';
import type { DateTimePickerSlotProps } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';

import CustomDateTimePicker from '../CustomDateTimePicker/CustomDateTimePicker';

interface DateTimeRange {
  startDateTime: Dayjs | null;
  endDateTime: Dayjs | null;
}

interface CustomDateTimeRangePickerProps {
  value: DateTimeRange;
  onChange: (newValue: DateTimeRange) => void;
  slotProps?: DateTimePickerSlotProps<true>;
}

const CustomDateTimeRangePicker: React.FC<CustomDateTimeRangePickerProps> = ({
  value,
  onChange,
  slotProps,
}) => {
  const handleStartDateTimeChange = (startDateTime: Dayjs | null) => {
    onChange({ ...value, startDateTime });
  };

  const handleEndDateTimeChange = (endDateTime: Dayjs | null) => {
    onChange({ ...value, endDateTime });
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
      <CustomDateTimePicker
        value={value.startDateTime}
        onChange={handleStartDateTimeChange}
        maxDate={value.endDateTime ?? undefined}
        slotProps={slotProps}
      />
      <CustomDateTimePicker
        value={value.endDateTime}
        onChange={handleEndDateTimeChange}
        minDate={value.startDateTime ?? undefined}
        slotProps={slotProps}
      />
    </Box>
  );
};

export default CustomDateTimeRangePicker;
