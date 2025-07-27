import React, { useState, useEffect, useMemo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  DateTimePicker,
  type DateTimePickerSlotProps,
  type DateTimePickerSlots,
} from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import { useTranslation } from 'react-i18next';

interface CustomDateTimePickerProps {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  label?: string;
  variant?: 'auto' | 'mobile' | 'desktop';
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  format?: string;
  fullWidth?: boolean;
  required?: boolean;
  placeholder?: string;
  sx?: any;
  disableFuture?: boolean;
  disablePast?: boolean;
  ampm?: boolean;
  slots?: DateTimePickerSlots;
  slotProps?: DateTimePickerSlotProps<boolean>;
  shouldDisableDate?: (date: Dayjs) => boolean;
  shouldDisableTime?: (
    timeValue: Dayjs,
    clockType: 'hours' | 'minutes' | 'seconds'
  ) => boolean;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  value,
  onChange,
  ampm = false,
  ...otherProps // This contains the rest of the props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { i18n } = useTranslation();
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [cleared, setCleared] = React.useState<boolean>(false);

  useEffect(() => {
    setPickerOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  const getPickerVariant = () => {
    if (otherProps.variant === 'mobile') return 'mobile';
    if (otherProps.variant === 'desktop') return 'desktop';
    return isMobile ? 'mobile' : 'desktop';
  };

  const pickerVariant = getPickerVariant();

  const commonProps = {
    value,
    onChange,
    ampm,
    open: isPickerOpen,
    onOpen: () => setPickerOpen(true),
    onClose: () => setPickerOpen(false),
    ...otherProps,
    slotProps: {
      textField: {
        label: otherProps.label,
        error: otherProps.error,
        helperText: otherProps.helperText,
        required: otherProps.required,
        fullWidth: otherProps.fullWidth,
        placeholder: otherProps.placeholder,
        sx: otherProps.sx,
      },
    },
  };

  const renderPicker = () => {
    switch (pickerVariant) {
      case 'mobile':
        return <MobileDateTimePicker {...commonProps} />;
      case 'desktop':
        return <DesktopDateTimePicker />;
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
