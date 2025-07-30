import React, { useState, useEffect } from 'react';
import {
  useMediaQuery,
  useTheme,
  type SxProps,
  type Theme,
} from '@mui/material';
import {
  DatePicker,
  type DatePickerSlotProps,
  type DatePickerSlots,
} from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';

import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import { useTranslation } from 'react-i18next';

// Using a simplified interface with `any` for slotProps to bypass a persistent TypeScript error.
interface CustomDatePickerProps {
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
  slots?: DatePickerSlots;
  slotProps?: DatePickerSlotProps<true>;
  shouldDisableDate?: (date: Dayjs) => boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
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
    slots: {
      ...slots,
      toolbar: () => null,
    },
    ...rest,
  };

  const renderPicker = () => {
    switch (pickerVariant) {
      case 'mobile':
        return <MobileDatePicker {...commonProps} />;
      case 'desktop':
        return <DesktopDatePicker {...commonProps} />;
      default:
        return <DatePicker {...commonProps} />;
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

export default CustomDatePicker;
