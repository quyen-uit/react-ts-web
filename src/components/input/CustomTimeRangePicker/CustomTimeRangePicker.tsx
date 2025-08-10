import React from 'react';

import { Box } from '@mui/material';
import type { TimePickerSlotProps } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';

import CustomTimePicker from '../CustomTimePicker/CustomTimePicker';

interface TimeRange {
  startTime: Dayjs | null;
  endTime: Dayjs | null;
}

interface CustomTimeRangePickerProps {
  value: TimeRange;
  onChange: (newValue: TimeRange) => void;
  slotProps?: TimePickerSlotProps<true>;
}

const CustomTimeRangePicker: React.FC<CustomTimeRangePickerProps> = ({
  value,
  onChange,
  slotProps,
}) => {
  const handleStartTimeChange = (startTime: Dayjs | null) => {
    onChange({ ...value, startTime });
  };

  const handleEndTimeChange = (endTime: Dayjs | null) => {
    onChange({ ...value, endTime });
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
      <CustomTimePicker
        value={value.startTime}
        onChange={handleStartTimeChange}
        maxTime={value.endTime ?? undefined}
        slotProps={slotProps}
      />
      <CustomTimePicker
        value={value.endTime}
        onChange={handleEndTimeChange}
        minTime={value.startTime ?? undefined}
        slotProps={slotProps}
      />
    </Box>
  );
};

export default CustomTimeRangePicker;
