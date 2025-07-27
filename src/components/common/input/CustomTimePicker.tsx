import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  TimePicker,
  type TimePickerSlots,
} from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { type Dayjs } from 'dayjs';

import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import { useTranslation } from 'react-i18next';

// Using a simplified interface with `any` for slotProps to bypass a persistent TypeScript error.
interface CustomTimePickerProps {
  value: Dayjs | string | null;
  onChange: (newValue: Dayjs | null) => void;
  onAccept?: (newValue: Dayjs | null) => void;
  label?: string;
  variant?: 'auto' | 'mobile' | 'desktop';
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  format?: string;
  fullWidth?: boolean;
  required?: boolean;
  placeholder?: string;
  sx?: any;
  ampm?: boolean;
  slots?: TimePickerSlots;
  slotProps?: any; // Using `any` as a last resort to solve the typing issue.
  shouldDisableTime?: (
    timeValue: Dayjs,
    clockType: 'hours' | 'minutes' | 'seconds'
  ) => boolean;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value: propValue,
  onChange,
  onAccept,
  label,
  variant,
  error,
  helperText,
  required,
  fullWidth,
  placeholder,
  sx,
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
    ...rest,
    slotProps: {
      ...rest.slotProps,
      textField: {
        label,
        error,
        helperText,
        required,
        fullWidth,
        placeholder,
        sx,
        ...rest.slotProps?.textField,
      },
    },
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
