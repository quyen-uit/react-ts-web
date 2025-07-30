import React, { useState, useEffect } from 'react';
import {
  useMediaQuery,
  useTheme,
  type SxProps,
  type Theme,
} from '@mui/material';
import {
  DateTimePicker,
  type DateTimePickerSlotProps,
  type DateTimePickerSlots,
} from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';

import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import { useTranslation } from 'react-i18next';

// Using a simplified interface with `any` for slotProps to bypass the persistent and unusual TypeScript error.
interface CustomDateTimePickerProps {
  value: Dayjs | string | null;
  onChange: (newValue: Dayjs | null) => void;
  onAccept?: (newValue: Dayjs | null) => void;
  variant?: 'auto' | 'mobile' | 'desktop';
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  format?: string;
  sx?: SxProps<Theme>;
  disableFuture?: boolean;
  disablePast?: boolean;
  ampm?: boolean;
  slots?: DateTimePickerSlots;
  slotProps?: DateTimePickerSlotProps<true>;
  shouldDisableDate?: (date: Dayjs) => boolean;
  shouldDisableTime?: (
    timeValue: Dayjs,
    clockType: 'hours' | 'minutes' | 'seconds'
  ) => boolean;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  value: propValue,
  onChange,
  onAccept,
  variant,
  slots,
  ampm = false,
  ...rest
}) => {
  const [value, setValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (propValue) {
      const date = dayjs(propValue);
      setValue(date.isValid() ? date : null);
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
    ampm,
    slots: {
      ...slots,
      toolbar: () => null,
    },
    ...rest,
  };

  const renderPicker = () => {
    switch (pickerVariant) {
      case 'mobile':
        return <MobileDateTimePicker {...commonProps} />;
      case 'desktop':
        return <DesktopDateTimePicker {...commonProps} />;
      default:
        return <DateTimePicker {...commonProps} />;
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

export default CustomDateTimePicker;
