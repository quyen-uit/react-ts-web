import { Checkbox, Chip, MenuItem, Select, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react';
import { SelectWrapper } from '../../table/FacetedFilter/FacetedFilter.style';
import { ClearIconButton } from '../../icon';

interface Option {
  value: any;
  label: string;
  count?: number;
}

interface MultipleSelectProps {
  selectedValues: string[];
  onChange: (values: string[]) => void;
  options: Option[];
  placeholder?: string;
}

export const MultipleSelect: React.FC<MultipleSelectProps> = ({
  selectedValues,
  onChange,
  options,
  placeholder,
}) => {
  const handleRemoveChip = (valueToRemove: string) => {
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    onChange(newValues);
  };

  return (
    <SelectWrapper>
      <Select
        multiple
        value={selectedValues}
        onChange={(e) => onChange(e.target.value as string[])}
        displayEmpty
        variant="standard"
        endAdornment={
          <ClearIconButton
            visible={!!selectedValues.length}
            onClick={() => onChange([])}
            marginRight={2.5}
          />
        }
        renderValue={(selected) => {
          const values = selected as string[];
          if (values.length === 0) {
            return (
              <Typography color="text.secondary">{placeholder}</Typography>
            );
          }
          return (
            <>
              {values.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  size="small"
                  onMouseDown={(e) => e.stopPropagation()} //  Prevent Select opening
                  onDelete={(e) => {
                    e.stopPropagation(); //   Important
                    e.preventDefault();
                    handleRemoveChip(value);
                  }}
                  deleteIcon={<CancelIcon />}
                />
              ))}
            </>
          );
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={(theme) => ({ fontSize: theme.typography.fontSize })}
          >
            <Checkbox checked={selectedValues.includes(option.value)} />
            {option.label} {option.count && `(${option.count})`}
          </MenuItem>
        ))}
      </Select>
    </SelectWrapper>
  );
};
