import React, { useState, useEffect } from 'react';

import {
  useMediaQuery,
  useTheme,
  type SxProps,
  type Theme,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import {
  TimePicker,
  type TimePickerSlotProps,
  type TimePickerSlots,
} from '@mui/x-date-pickers/TimePicker';
import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import { useTranslation } from 'react-i18next';
interface CustomTimePickerProps {
  value: Dayjs | string | null;
  onChange: (newValue: Dayjs | null) => void;
  onAccept?: (newValue: Dayjs | null) => void;
  variant?: 'auto' | 'mobile' | 'desktop';
  disabled?: boolean;
  readOnly?: boolean;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  format?: string;
  sx?: SxProps<Theme>;
  disableFuture?: boolean;
  disablePast?: boolean;
  slots?: TimePickerSlots;
  slotProps?: TimePickerSlotProps<true>;
  shouldDisableTime?: (
    time: Dayjs,
    clockType: 'hours' | 'minutes' | 'seconds'
  ) => boolean;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value: propValue,
  onChange,
  onAccept,
  variant,
  slots,
  ...rest
}) => {
  const [value, setValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (propValue) {
      const time = dayjs(propValue);
      setValue(time.isValid() ? time : null);
    } else {
      setValue(null);
    }
  }, [propValue]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { i18n } = useTranslation();

  const getPickerVariant = () => {
    if (variant === 'mobile') return 'mobile';
    if (variant === 'desktop') return 'desktop';
    return isMobile ? 'mobile' : 'desktop';
  };

  const pickerVariant = getPickerVariant();

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    onChange(newValue);
  };

  const handleAccept = (newValue: Dayjs | null) => {
    if (onAccept) {
      onAccept(newValue);
    }
  };

  const commonProps = {
    value,
    onChange: handleChange,
    onAccept: handleAccept,
    slots: {
      ...slots,
      toolbar: () => null,
    },
    ...rest,
  };

  const renderPicker = () => {
    switch (pickerVariant) {
      case 'mobile':
        return <MobileTimePicker {...commonProps} />;
      case 'desktop':
        return <DesktopTimePicker {...commonProps} />;
      default:
        return <TimePicker {...commonProps} />;
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={i18n.language}
    >
      {renderPicker()}
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
