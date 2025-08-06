import React from 'react';

import { MenuItem, Select, Typography } from '@mui/material';
import { t } from 'i18next';

import { ClearIconButton } from '../../icon';
import { SelectWrapper } from '../../table/FacetedFilter/FacetedFilter.style';

export interface Option {
  value: string;
  label: string;
  count?: number;
}

interface SingleSelectProps {
  value: string;
  onChange: (value?: string) => void;
  options: Option[];
  placeholder?: string;
  variant?: 'standard' | 'outlined' | 'filled';
  color?: string;
  width?: string | number;
}

export const SingleSelect: React.FC<SingleSelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  variant = 'standard',
  color = 'text.secondary',
  width = '100%',
}) => {
  return (
    <SelectWrapper>
      <Select
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        variant={variant}
        sx={{ color, width }}
        renderValue={(selected) => {
          if (!selected) {
            return <Typography color={color}>{placeholder}</Typography>;
          }
          return selected;
        }}
        endAdornment={
          <ClearIconButton
            visible={!!value}
            onClick={() => onChange(undefined)}
            marginRight={2.5}
          />
        }
      >
        <MenuItem value="">{t('All')}</MenuItem>
        {options &&
          options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={(theme) => ({ fontSize: theme.typography.fontSize })}
            >
              {option.label} {option.count && `(${option.count})`}
            </MenuItem>
          ))}
      </Select>
    </SelectWrapper>
  );
};
